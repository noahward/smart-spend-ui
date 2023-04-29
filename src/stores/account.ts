import { defineStore } from 'pinia'
import { decamelizeKeys, camelizeKeys } from 'humps'
import { api } from '@/api'
import type { Account, AccountUpdate } from '@/types/account'

export const useAccountStore = defineStore('account', {
  state: () => {
    return {
      accounts: [] as Account[]
    }
  },
  getters: {
    getTotalBalance (state) {
      return state.accounts
        .map(acc => acc.balance)
        .reduce((sum, balance) => sum + balance, 0)
    },
    accountSelectOptions (state) {
      return state.accounts.map(account => account.name)
    }
  },
  actions: {
    async getAccounts () {
      return api.get('/accounts/')
        .then((response) => {
          this.accounts = camelizeKeys(response.data) as Account[]
        })
        .catch((error) => {
          throw error
        })
    },
    async createAccount (accountInfo: object) {
      return api.post('/accounts/', decamelizeKeys(accountInfo))
        .then((response) => {
          this.accounts.push(camelizeKeys(response.data) as Account)
        })
        .catch((error) => {
          throw error
        })
    },
    async deleteAccount (accountId: number) {
      return api.delete(`/accounts/${accountId}/`)
        .then(() => {
          this.accounts = this.accounts.filter((acc) => acc.id !== accountId)
        })
        .catch((error) => {
          throw error
        })
    },
    async updateAccount (accountInfo: AccountUpdate) {
      return api.patch(`/accounts/${accountInfo.id}/`, decamelizeKeys(accountInfo))
        .then((response) => {
          const updAccount = camelizeKeys(response.data) as Account
          const target = this.accounts.find((account) => account.id === updAccount.id)
          if (target) {
            Object.assign(target, updAccount)
          }
        })
        .catch((error) => {
          throw error
        })
    },
    updateAccountBalance (accountId: number, amount: number, action: 'add' | 'remove') {
      const target = this.accounts.find((obj) => obj.id === accountId)
      if (target) {
        if (action === 'add') {
          target.balance = target.balance + amount
        } else {
          target.balance = target.balance - amount
        }
      }
    }
  }
})
