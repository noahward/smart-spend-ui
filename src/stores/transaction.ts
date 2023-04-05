import { defineStore } from 'pinia'
import { camelizeKeys } from 'humps'
import { api } from '@/api'
import type { Transaction } from '@/types/transaction'

export const useTransactionStore = defineStore('transaction', {
  state: () => {
    return {
      transactions: [] as Transaction[]
    }
  },
  actions: {
    async getTransactions () {
      return api.get('/transactions')
        .then((response) => {
          this.transactions = camelizeKeys(response.data) as Transaction[]
        })
        .catch((error) => {
          throw error
        })
    }
  }
})
