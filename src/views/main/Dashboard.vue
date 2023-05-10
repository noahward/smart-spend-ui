<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useExchRateStore } from '@/stores/exchange-rate'
import { useTransactionStore } from '@/stores/transaction'
import TopCardContainer from '@/components/dashboard/TopCardContainer.vue'
import ChartSavingsByMonth from '@/components/dashboard/charts/ChartSavingsByMonth.vue'
import ChartTransactionCategories from '@/components/dashboard/charts/ChartTransactionCategories.vue'
import type { Transaction } from '@/types/transaction'
import type { ExchangeRate } from '@/types/exchange-rate'

const transactionStore = useTransactionStore()
const exchangeRateStore = useExchRateStore()
const baseCurrency = ref('USD')
const loading = ref(false)
const convertedTransactions = ref<Transaction[]>([])

onMounted(() => {
  loading.value = true
  transactionStore.getTransactions()
    .then(async () => {
      await updateExchangeRates(transactionStore.transactions)
      convertedTransactions.value = normalizeTransactionCurrencies(transactionStore.transactions, exchangeRateStore.exchangeRates)
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      loading.value = false
    })
})

function updateExchangeRates (transactions: Transaction[]) {
  const distinctCurrencyCodes = [...new Set(transactions.map(obj => obj.currencyCode))]
  const promises: Promise<any>[] = []
  distinctCurrencyCodes.forEach(code => {
    promises.push(exchangeRateStore.getExchangeRate(code, baseCurrency.value))
  })
  return Promise.all(promises)
}

function normalizeTransactionCurrencies (transactions: Transaction[], exchangeRates: ExchangeRate[]) {
  return transactions.map((transaction) => {
    const exchangeObj = exchangeRates.find((rate) => rate.from === transaction.currencyCode)
    if (exchangeObj) {
      transaction.amount = transaction.amount * exchangeObj.exchangeRate
      transaction.currencyCode = exchangeObj.to
    }
    return transaction
  })
}
</script>

<template>
  <div class="dashboard">
    <TopCardContainer class="hidden-sm-and-down" />
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <ChartTransactionCategories kind="inflow" />
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <ChartTransactionCategories kind="outflow" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <ChartSavingsByMonth />
      </v-col>
    </v-row>
  </div>
</template>
