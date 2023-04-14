<script setup lang="ts">
import { computed } from 'vue'
import { BuildingBankIcon, OnetwotreeIcon, CreditCardIcon, MoneybagIcon, CalculatorIcon, CircleHalf2Icon } from 'vue-tabler-icons'
import { useAccountStore } from '@/stores/account'
import { useTransactionStore } from '@/stores/transaction'
import TopCard from './TopCard.vue'

const accountStore = useAccountStore()
const transactionStore = useTransactionStore()

const lastMonthNetAmount = computed(() => {
  const today = new Date()
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
  const filteredTransactions = transactionStore.transactions.filter((transaction) =>
    new Date(transaction.date).getFullYear() === lastMonth.getFullYear() &&
    new Date(transaction.date).getMonth() === lastMonth.getMonth()
  )
  return filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)
})

const lastMonthNetSpent = computed(() => {
  const today = new Date()
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
  const filteredTransactions = transactionStore.transactions.filter((transaction) =>
    new Date(transaction.date).getFullYear() === lastMonth.getFullYear() &&
    new Date(transaction.date).getMonth() === lastMonth.getMonth() &&
    transaction.amount < 0
  )
  return filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)
})

const lastMonthNetIncome = computed(() => {
  const today = new Date()
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
  const filteredTransactions = transactionStore.transactions.filter((transaction) =>
    new Date(transaction.date).getFullYear() === lastMonth.getFullYear() &&
    new Date(transaction.date).getMonth() === lastMonth.getMonth() &&
    transaction.amount > 0
  )
  return filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)
})

const lastMonthTransactionCount = computed(() => {
  const today = new Date()
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)

  const filteredTransactions = transactionStore.transactions.filter((transaction) =>
    new Date(transaction.date).getFullYear() === lastMonth.getFullYear() &&
    new Date(transaction.date).getMonth() === lastMonth.getMonth()
  )

  return filteredTransactions.length
})

const ratioClassifiedTransactions = computed(() => {
  const numUnclassified = transactionStore.transactions
    .filter(transaction => transaction.categoryName === undefined)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .length

  const numClassified = transactionStore.transactions.length - numUnclassified

  return numClassified / numUnclassified
})

const lastMonth = computed(() => {
  const date = new Date()
  date.setMonth(date.getMonth() - 1)
  return date.toLocaleString('default', { month: 'long' })
})
</script>

<template>
  <v-row>
    <v-col
      cols="12"
      lg="2"
      md="4"
      sm="4"
    >
      <TopCard
        number
        :icon="BuildingBankIcon"
        :value="accountStore.getTotalBalance"
        title="Net Worth"
      />
    </v-col>
    <v-col
      cols="12"
      lg="2"
      md="4"
      sm="4"
    >
      <TopCard
        number
        :icon="CalculatorIcon"
        :value="lastMonthNetAmount"
        :title="`${lastMonth} Net`"
      />
    </v-col>
    <v-col
      cols="12"
      lg="2"
      md="4"
      sm="4"
    >
      <TopCard
        number
        :icon="MoneybagIcon"
        :value="lastMonthNetIncome"
        :title="`${lastMonth} Inflow `"
      />
    </v-col>
    <v-col
      cols="12"
      lg="2"
      md="4"
      sm="4"
    >
      <TopCard
        number
        :icon="CreditCardIcon"
        :value="lastMonthNetSpent"
        :title="`${lastMonth} Outflow`"
      />
    </v-col>
    <v-col
      cols="12"
      lg="2"
      md="4"
      sm="4"
    >
      <TopCard
        :icon="OnetwotreeIcon"
        :value="lastMonthTransactionCount"
        :title="`${lastMonth} Transactions`"
      />
    </v-col>
    <v-col
      cols="12"
      lg="2"
      md="4"
      sm="4"
    >
      <TopCard
        percent
        :icon="CircleHalf2Icon"
        :value="ratioClassifiedTransactions"
        title="Classified Transactions"
      />
    </v-col>
  </v-row>
</template>
