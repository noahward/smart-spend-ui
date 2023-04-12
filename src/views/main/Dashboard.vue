<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { BuildingBankIcon, OnetwotreeIcon, CreditCardIcon, MoneybagIcon, CalculatorIcon } from 'vue-tabler-icons'
import { useAccountStore } from '@/stores/account'
import { useTransactionStore } from '@/stores/transaction'
import TopCard from '@/components/dashboard/TopCard.vue'

const accountStore = useAccountStore()
const transactionStore = useTransactionStore()

onMounted(() => {
  transactionStore.getTransactions()
    .catch((error) => {
      console.error(error)
    })
})

const lastMonthNetAmount = computed(() => {
  const today = new Date()
  const currentMonth = today.getMonth()
  const lastMonth = new Date(today.getFullYear(), currentMonth - 1, 1)

  const sum = transactionStore.transactions.reduce((sum, curr) => {
    const date = new Date(curr.date)
    if (date >= lastMonth && date < today) {
      return sum + curr.amount
    } else {
      return sum
    }
  }, 0)

  return sum
})

const lastMonthNetSpent = computed(() => {
  const today = new Date()
  const currentMonth = today.getMonth()
  const lastMonth = new Date(today.getFullYear(), currentMonth - 1, 1)

  const sum = transactionStore.transactions.reduce((sum, curr) => {
    const date = new Date(curr.date)
    if (date >= lastMonth && date < today && curr.amount < 0) {
      return sum + curr.amount
    } else {
      return sum
    }
  }, 0)

  return sum
})

const lastMonthNetIncome = computed(() => {
  const today = new Date()
  const currentMonth = today.getMonth()
  const lastMonth = new Date(today.getFullYear(), currentMonth - 1, 1)

  const sum = transactionStore.transactions.reduce((sum, curr) => {
    const date = new Date(curr.date)
    if (date >= lastMonth && date < today && curr.amount > 0) {
      return sum + curr.amount
    } else {
      return sum
    }
  }, 0)

  return sum
})

const lastMonth = computed(() => {
  const date = new Date()
  date.setMonth(date.getMonth() - 1)
  return date.toLocaleString('default', { month: 'long' })
})
</script>

<template>
  <div>
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
          :value="transactionStore.transactions.length"
          :title="`${lastMonth} Transaction Count`"
        />
      </v-col>
    </v-row>
  </div>
</template>
