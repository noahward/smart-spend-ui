<script setup lang="ts">
import { useTheme } from 'vuetify'
import { ref, computed } from 'vue'
import { useTransactionStore } from '@/stores/transaction'

const theme = useTheme()
const transactionStore = useTransactionStore()

const numMonths = ref(12)

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
      <div class="text-h5 text-textPrimary mb-5">
        Monthly Inflow and Outflow
      </div>
      <v-card-text>
        <apexchart
          type="bar"
          :options="chartOptions"
          :series="chartSeries"
          height="400"
        />
        <div class="d-flex justify-center mt-2">
          <span class="mx-2 text-textSecondary font-weight-bold text-13 pointer timeline-btn">1Y</span>
          <span class="mx-2 text-textSecondary font-weight-bold text-13 pointer">2Y</span>
          <span class="mx-2 text-textSecondary font-weight-bold text-13 pointer">3Y</span>
        </div>
      </v-card-text>
    </v-card-item>
  </v-card>
</template>
