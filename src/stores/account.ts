import { defineStore } from 'pinia'
import { decamelizeKeys, camelizeKeys } from 'humps'
import { smartSpendAPI } from '@/apis/smart-spend-api'
import type { Account, AccountUpdate } from '@/types/account'

export const useAccountStore = defineStore('account', {
  state: () => {
    return {
      accounts: [] as Account[]
    }
  },
  getters: {
    getTotalBalance (state) {
      return state.accounts.reduce((acc, account) => {
        const { currencyCode, balance } = account
        if (acc[currencyCode]) {
          acc[currencyCode] += balance
        } else {
          acc[currencyCode] = balance
        }
        return acc
      }, {} as Record<string, number>)
    },
    accountSelectOptions (state) {
      return state.accounts.map(account => account.name)
    }
  },
  actions: {
    async getAccounts () {
      return smartSpendAPI.get('/accounts/')
        .then((response) => {
          this.accounts = camelizeKeys(response.data) as Account[]
        })
        .catch((error) => {
          throw error
        })
    },
    async createAccount (accountInfo: object) {
      return smartSpendAPI.post('/accounts/', decamelizeKeys(accountInfo))
        .then((response) => {
          this.accounts.push(camelizeKeys(response.data) as Account)
        })
        .catch((error) => {
          throw error
        })
    },
    async deleteAccount (accountId: number) {
      return smartSpendAPI.delete(`/accounts/${accountId}/`)
        .then(() => {
          this.accounts = this.accounts.filter((acc) => acc.id !== accountId)
        })
        .catch((error) => {
          throw error
        })
    },
    async updateAccount (accountInfo: AccountUpdate) {
      return smartSpendAPI.patch(`/accounts/${accountInfo.id}/`, decamelizeKeys(accountInfo))
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
