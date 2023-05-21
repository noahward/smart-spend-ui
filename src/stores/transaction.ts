import { defineStore } from 'pinia'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { smartSpendAPI } from '@/apis/smart-spend-api'
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
    },
    uniqueCurrencies (state) {
      return [...new Set(state.transactions.map(transaction => transaction.currencyCode))]
    }
  },
  actions: {
    async getTransactions () {
      return smartSpendAPI.get('/transactions/')
        .then((response) => {
          this.transactions = camelizeKeys(response.data) as Transaction[]
        })
        .catch((error) => {
          throw error
        })
    },
    async addSingleTransaction (payload: TransactionCreate) {
      return smartSpendAPI.post('/transactions/', decamelizeKeys(payload))
        .then((response) => {
          const accountStore = useAccountStore()
          const transaction = decamelizeKeys(response.data) as Transaction
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
      return smartSpendAPI.post('/transaction-file-preview/', formData, {
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
      formData.append('map', JSON.stringify(decamelizeKeys(map)))
      return smartSpendAPI.post('/transaction-file-upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
          const newTransactions = decamelizeKeys(response.data) as Transaction[]
          this.transactions.push(...newTransactions)

          const accountSums: { [key: string]: number } = {}
          newTransactions.forEach((transaction) => {
            const { account, amount } = transaction
            accountSums[account] = (accountSums[account] || 0) + amount
          })

          const { accounts } = useAccountStore()
          accounts.forEach((account) => {
            const sum = accountSums[account.id]
            if (sum !== undefined) {
              account.balance += sum
            }
          })
        })
        .catch((error) => {
          throw error
        })
    },
    async updateTransaction (transaction: TransactionUpdate) {
      return smartSpendAPI.patch(`/transactions/${transaction.id}/`, decamelizeKeys(transaction))
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
      return smartSpendAPI.delete(`/transactions/${transaction.id}/`)
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
