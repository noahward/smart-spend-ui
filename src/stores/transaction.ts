import { defineStore } from 'pinia'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { api } from '@/api'
import { useAccountStore } from '@/stores/account'
import type { AccountTransactionsPreview } from '@/types/file-preview'
import type { Transaction, TransactionCreate, TransactionUpdate } from '@/types/transaction'

export const useTransactionStore = defineStore('transaction', {
  state: () => {
    return {
      transactions: [] as Transaction[],
      previewData: [] as AccountTransactionsPreview[]
    }
  },
  getters: {
    getTransactionsByAccount (state) {
      return (accountId: number) => {
        return state.transactions
          .filter(obj => obj.account === accountId)
          .sort((a, b) => {
            return new Date(a.date).valueOf() - new Date(b.date).valueOf()
          })
      }
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
    },
    async addSingleTransaction (payload: TransactionCreate) {
      return api.post('/transactions', decamelizeKeys(payload))
        .then((response) => {
          const accountStore = useAccountStore()
          const transaction = decamelizeKeys(response.data) as Transaction
          console.log(transaction)
          accountStore.updateAccountBalance(transaction.account, transaction.amount, 'add')
          this.transactions.push(transaction)
        })
        .catch((error) => {
          throw error
        })
    },
    async previewTransactionFile (file: File) {
      const formData = new FormData()
      formData.append('file', file)
      return api.post('transaction-file-preview', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
          this.previewData = camelizeKeys(response.data) as AccountTransactionsPreview[]
        })
    },
    async uploadTransactionFile (file: File, map: {[key: string]: string}) {
      const formData = new FormData()
      formData.append('file', file)
      const payload = { formData, map }

      return api.post('transaction-file-upload', decamelizeKeys(payload), {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(() => {
          console.log('Upload success')
        })
        .catch((error) => {
          throw error
        })
    },
    async updateTransaction (transaction: TransactionUpdate) {
      return api.patch(`/transactions/${transaction.id}`, decamelizeKeys(transaction))
        .then((response) => {
          const accountStore = useAccountStore()
          accountStore.getAccounts()

          const updTransaction = camelizeKeys(response.data) as Transaction
          const target = this.transactions.find((obj) => obj.id === updTransaction.id)
          if (target) {
            Object.assign(target, updTransaction)
          }
        })
        .catch((error) => {
          throw error
        })
    },
    async deleteTransaction (transaction: Transaction) {
      return api.delete(`/transactions/${transaction.id}`)
        .then(() => {
          const accountStore = useAccountStore()
          accountStore.updateAccountBalance(transaction.account, transaction.amount, 'remove')
          this.transactions = this.transactions.filter((item) => item.id !== transaction.id)
        })
        .catch((error) => {
          throw error
        })
    }
  }
})
