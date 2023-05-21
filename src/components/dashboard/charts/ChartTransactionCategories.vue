<script setup lang="ts">
import { useTheme } from 'vuetify'
import { computed } from 'vue'
import { useTransactionStore } from '@/stores/transaction'
import { formatCurrency } from '@/helpers/formatCurrency'
import type { Transaction } from '@/types/transaction'

const props = defineProps<{ kind: 'inflow' | 'outflow' }>()

const theme = useTheme()
const transactionStore = useTransactionStore()

const chartOptions = computed(() => {
  return {
    chart: {
      type: 'donut',
      fontFamily: 'inherit',
      foreColor: theme.global.current.value.dark ? '#7C8FAC' : '#2A3547'
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (value: number) {
          return formatCurrency(value)
        }
      }
    },
    theme: {
      monochrome: {
        enabled: true,
        color: '#5D87FF'
      }
    },
    states: {
      active: {
        filter: {
          type: 'none',
          value: 0
        }
      }
    },
    stroke: {
      colors: [theme.global.current.value.dark ? '#2a3447' : '#FFFFFF']
    },
    dataLabels: {
      enabled: true,
      formatter: function (value: number) {
        return value.toFixed(0) + '%'
      }
    },
    labels: categoryLabels(transactionStore.transactions)
  }
})

const chartSeries = computed(() => {
  const categories = categoryLabels(transactionStore.transactions)
  const series = categories.map(category => {
    const sum = transactionStore.transactions.reduce((acc, transaction) => {
      const isUnknown = category === 'Unknown' && transaction.dateClassified === null
      const isMatched = transaction.categoryName === category
      const isPositiveInflow = props.kind === 'inflow' && transaction.amount > 0
      const isNegativeOutflow = props.kind === 'outflow' && transaction.amount < 0
      if ((isUnknown || isMatched) && (isPositiveInflow || isNegativeOutflow)) {
        return acc + transaction.amount
      } else {
        return acc
      }
    }, 0)
    return Math.abs(sum)
  })
  return series
})

function categoryLabels (transactions: Transaction[]) {
  const categorySet = new Set<string>()

  transactions.forEach((transaction) => {
    if (transaction.categoryName) {
      if ((props.kind === 'inflow' && transaction.amount > 0) || (props.kind === 'outflow' && transaction.amount < 0)) {
        categorySet.add(transaction.categoryName)
      }
    }
  })

  const unknownTransactions = transactions.filter((transaction) => {
    const isUnknown = transaction.dateClassified === null
    const isPositiveInflow = props.kind === 'inflow' && transaction.amount > 0
    const isNegativeOutflow = props.kind === 'outflow' && transaction.amount < 0
    return isUnknown && (isPositiveInflow || isNegativeOutflow)
  })

  if (unknownTransactions.length > 0) {
    categorySet.add('Unknown')
  }

  return Array.from(categorySet)
}

function sumArray (array: number[]) {
  return array.reduce((a, b) => a + b, 0)
}
</script>

<template>
  <v-card
    variant="outlined"
    class="h-100"
  >
    <v-card-item>
      <div class="d-flex flex-column mb-5">
        <span class="text-h5 text-textPrimary">{{ kind.charAt(0).toUpperCase() + kind.slice(1) }} Transaction Categories</span>
        <span class="text-13 mt-2 text-textSecondary">Total {{ kind.charAt(0).toUpperCase() + kind.slice(1) }}</span>
        <span
          class="text-h4"
          :class="kind === 'inflow' ? 'text-success' : 'text-error'"
        >{{ formatCurrency(sumArray(chartSeries)) }}</span>
      </div>
      <v-card-text>
        <apexchart
          type="donut"
          :options="chartOptions"
          :series="chartSeries"
        />
      </v-card-text>
    </v-card-item>
  </v-card>
</template>
