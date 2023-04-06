import { defineStore } from 'pinia'
import { decamelizeKeys, camelizeKeys } from 'humps'
import { api } from '@/api'
import type { Account } from '@/types/account'

export const useAccountStore = defineStore('account', {
  state: () => {
    return {
      accounts: [] as Account[]
    }
  },
  getters: {
    accountSelectOptions (state) {
      return state.accounts.map(account => account.name)
    }
  },
  actions: {
    async getAccounts () {
      return api.get('/accounts')
        .then((response) => {
          this.accounts = camelizeKeys(response.data) as Account[]
        })
        .catch((error) => {
          throw error
        })
    },
    async createAccount (accountInfo: object) {
      return api.post('/accounts', decamelizeKeys(accountInfo))
        .then((response) => {
          this.accounts.push(camelizeKeys(response.data) as Account)
        })
        .catch((error) => {
          throw error
        })
    },
    async deleteAccount (accountId: number) {
      return api.delete(`/accounts/${accountId}`)
        .then(() => {
          this.accounts = this.accounts.filter((acc) => acc.id !== accountId)
        })
        .catch((error) => {
          throw error
        })
    }
  }
})
