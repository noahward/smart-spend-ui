<script setup lang="ts">
import { ref, computed } from 'vue'
import { BuildingBankIcon, OnetwotreeIcon, CreditCardIcon, MoneybagIcon, CircleHalf2Icon } from 'vue-tabler-icons'
import currencies from 'iso4217'
import TopCard from './TopCard.vue'
import type { Transaction } from '@/types/transaction'

type propTypes = {
  transactions: Transaction[];
  loading: boolean;
}

defineEmits(['updateBaseCurrency'])
const props = defineProps<propTypes>()

const baseCurrency = ref('USD')

const currencyOptions = Object.keys(currencies)
  .map(key => currencies[key].Code)
  .filter(code => code && code.length === 3)
  .sort()

const lastMonthNetSpent = computed(() => {
  const today = new Date()
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
  const filteredTransactions = props.transactions.filter((transaction) =>
    new Date(transaction.date).getFullYear() === lastMonth.getFullYear() &&
    new Date(transaction.date).getMonth() === lastMonth.getMonth() &&
    transaction.amount < 0
  )
  return filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)
})

const lastMonthNetIncome = computed(() => {
  const today = new Date()
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
  const filteredTransactions = props.transactions.filter((transaction) =>
    new Date(transaction.date).getFullYear() === lastMonth.getFullYear() &&
    new Date(transaction.date).getMonth() === lastMonth.getMonth() &&
    transaction.amount > 0
  )
  return filteredTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)
})

const lastMonthTransactionCount = computed(() => {
  const today = new Date()
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)

  const filteredTransactions = props.transactions.filter((transaction) =>
    new Date(transaction.date).getFullYear() === lastMonth.getFullYear() &&
    new Date(transaction.date).getMonth() === lastMonth.getMonth()
  )

  return filteredTransactions.length
})

const ratioClassifiedTransactions = computed(() => {
  const numUnclassified = props.transactions
    .filter(transaction => transaction.categoryName === undefined)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .length

  const numClassified = props.transactions.length - numUnclassified

  if (props.transactions.length === 0) {
    return 0
  } else if (numUnclassified === 0) {
    return 1
  }
  return numClassified / numUnclassified
})

const sumTransactions = computed(() => {
  return props.transactions
    .map(transaction => transaction.amount)
    .reduce((sum, amount) => sum + amount, 0)
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
        :value="sumTransactions"
        :loading="loading"
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
        :icon="MoneybagIcon"
        :loading="loading"
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
        :loading="loading"
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
        :loading="loading"
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
        :loading="loading"
        :value="ratioClassifiedTransactions"
        title="Categorized Transactions"
      />
    </v-col>
    <v-col
      cols="12"
      lg="2"
      md="4"
      sm="4"
    >
      <div class="d-flex flex-column align-center justify-center text-center rounded-md pa-6 bg-lightSecondary h-100">
        <div class="text-h6 font-weight-bold text-textMedium mt-3">
          Display Currency:
        </div>
        <v-autocomplete
          v-model="baseCurrency"
          variant="outlined"
          density="compact"
          :items="currencyOptions"
          class="w-75 mt-4"
          @update:model-value="$emit('updateBaseCurrency', baseCurrency)"
        />
      </div>
    </v-col>
  </v-row>
</template>
