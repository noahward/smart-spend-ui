<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTheme, useDisplay } from 'vuetify'
import { useAccountStore } from '@/stores/account'
import { useTransactionStore } from '@/stores/transaction'
import { formatCurrency } from '@/helpers/formatCurrency'

const theme = useTheme()
const { name } = useDisplay()
const accountStore = useAccountStore()
const transactionStore = useTransactionStore()

const numMonths = ref(['xs'].includes(name.value) ? 4 : 12)

const chartOptions = computed(() => {
  return {
    chart: {
      type: 'bar',
      height: 400,
      fontFamily: 'inherit',
      foreColor: theme.global.current.value.dark ? '#7C8FAC' : '#2A3547'
    },
    colors: ['#5D87FF', '#49BEFF'],
    grid: {
      show: true,
      position: 'back',
      borderColor: theme.global.current.value.dark ? '#333F55' : '#e5eaef',
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 1,
      colors: [theme.global.current.value.dark ? '#2a3447' : '#FFFFFF']
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: 'dark'
    },
    yaxis: {
      labels: {
        formatter: function (value: number) {
          return new Intl.NumberFormat().format(value)
        }
      }
    },
    xaxis: {
      categories: computeCategories(numMonths.value).reverse(),
      axisBorder: {
        show: false
      },
      labels: {
        formatter: function (timestamp: Date) {
          return timestamp.toLocaleDateString('en', { year: 'numeric', month: 'short' })
        }
      }
    }
  }
})

const chartSeries = computed(() => {
  const inflowData = []
  const outflowData = []
  const categories = computeCategories(numMonths.value)

  for (let i = 0; i < categories.length; i++) {
    const targetDate = new Date(categories[i] + '01')
    const inflowSum = transactionStore.transactions
      .filter((t) => t.amount > 0 && new Date(t.date).getMonth() === targetDate.getMonth() && new Date(t.date).getFullYear() === targetDate.getFullYear())
      .reduce((total, t) => total + t.amount, 0)

    const outflowSum = transactionStore.transactions
      .filter((t) => t.amount < 0 && new Date(t.date).getMonth() === targetDate.getMonth() && new Date(t.date).getFullYear() === targetDate.getFullYear())
      .reduce((total, t) => total + t.amount, 0)

    inflowData.push(inflowSum)
    outflowData.push(Math.abs(outflowSum))
  }

  categories.reverse()
  inflowData.reverse()
  outflowData.reverse()

  return [{
    name: 'Inflow',
    data: inflowData
  },
  {
    name: 'Outflow',
    data: outflowData
  }]
})

function computeCategories (numMonths: number) {
  const dateCategories: Date[] = []
  for (let i = 0; i < numMonths; i++) {
    const today = new Date()
    today.setMonth(today.getMonth() - i)
    dateCategories.push(today)
  }
  return dateCategories
}
</script>

<template>
  <v-card variant="outlined">
    <v-card-item>
      <div class="d-flex flex-column mb-5">
        <span class="text-h5 text-textPrimary">Monthly Inflow and Outflow</span>
        <span class="text-13 mt-2 text-textSecondary">Net Worth</span>
        <span
          class="text-h4"
          :class="accountStore.getTotalBalance >= 0 ? 'text-success' : 'text-error'"
        >{{ formatCurrency(accountStore.getTotalBalance) }}</span>
      </div>
      <v-card-text>
        <apexchart
          type="bar"
          :options="chartOptions"
          :series="chartSeries"
          height="400"
        />
      </v-card-text>
    </v-card-item>
  </v-card>
</template>
