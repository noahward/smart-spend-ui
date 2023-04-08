<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAccountStore } from '@/stores/account'
import { useTransactionStore } from '@/stores/transaction'
import PageBanner from '@/components/shared/PageBanner.vue'
import type { Transaction } from '@/types/transaction'

const accountStore = useAccountStore()
const transactionStore = useTransactionStore()

onMounted(() => {
  transactionStore.getTransactions()
    .catch((error) => {
      console.error(error)
    })
})

const chartOptions = computed(() => {
  return {
    chart: {
      type: 'area',
      height: 400,
      fontFamily: 'inherit',
      foreColor: '#a1aab2',
      toolbar: { show: false },
      sparkline: { enabled: true },
      group: 'sparklines'
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'solid',
      opacity: 0.05
    },
    markers: { size: 0 },
    xaxis: {
      type: 'datetime',
      tickAmount: 6
    },
    tooltip: {
      theme: 'dark',
      x: { format: 'MMM dd, yyyy' }
    }
  }
})

interface AccountSeries {
  name: string;
  data: number[][]
}

const computeSeries = computed(() => {
  const series: AccountSeries[] = []
  accountStore.accounts.forEach((account) => {
    const transactions = transactionStore.getTransactionsByAccount(account.id)
    const accountSeries = calculateSeries(transactions, account.initialBalance)
    series.push({
      name: account.name,
      data: accountSeries
    })
  })
  return series
})

function calculateSeries (transactions: Transaction[], startBalance: number) {
  const accountSeries: number[][] = []

  let balance = startBalance
  transactions.forEach((transaction) => {
    balance += transaction.amount
    accountSeries.push([
      new Date(transaction.date).getTime(),
      balance
    ])
  })
  return accountSeries
}
</script>

<template>
  <div>
    <PageBanner title="Dashboard" />
    <v-row>
      <v-col cols="12">
        <v-card variant="outlined">
          <v-card-item>
            <apexchart
              type="area"
              height="400"
              :options="chartOptions"
              :series="computeSeries"
            />
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
