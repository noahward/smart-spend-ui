<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PlusIcon, UploadIcon } from 'vue-tabler-icons'
import { useExchRateStore } from '@/stores/exchange-rate'
import { useAccountStore } from '@/stores/account'
import { useTransactionStore } from '@/stores/transaction'
import CardBase from '@/components/shared/CardBase.vue'
import AddAccount from '@/components/account/AddAccount.vue'
import TopCardContainer from '@/components/dashboard/TopCardContainer.vue'
import ChartSavingsByMonth from '@/components/dashboard/charts/ChartSavingsByMonth.vue'
import ChartTransactionCategories from '@/components/dashboard/charts/ChartTransactionCategories.vue'
import type { Transaction } from '@/types/transaction'

const accountStore = useAccountStore()
const transactionStore = useTransactionStore()
const exchangeRateStore = useExchRateStore()

const loading = ref(false)
const baseCurrency = ref('USD')
const dialogAccount = ref(false)
const convertedTransactions = ref<Transaction[]>([])

function updateBaseCurrency (newBaseCurrency: string) {
  loading.value = true
  baseCurrency.value = newBaseCurrency
  convertTransactionCurrencies(transactionStore.transactions, baseCurrency.value)
  loading.value = false
}

onMounted(() => {
  loading.value = true
  transactionStore.getTransactions()
    .then(async () => {
      convertedTransactions.value = convertTransactionCurrencies(transactionStore.transactions, baseCurrency.value)
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      loading.value = false
    })
})

function convertTransactionCurrencies (transactions: Transaction[], baseCurrency: string) {
  refreshExchangeRates(transactions, baseCurrency)

  return transactions.map((transaction) => {
    const exchangeObj = exchangeRateStore.exchangeRates.find((rate) => rate.from === transaction.currencyCode)
    if (exchangeObj) {
      transaction.amount = transaction.amount * exchangeObj.exchangeRate
      transaction.currencyCode = exchangeObj.to
    }
    return transaction
  })
}

function refreshExchangeRates (transactions: Transaction[], baseCurrency: string) {
  const distinctCurrencyCodes = [...new Set(transactions.map(obj => obj.currencyCode))]
  const promises: Promise<any>[] = []
  distinctCurrencyCodes.forEach(code => {
    promises.push(exchangeRateStore.getExchangeRate(code, baseCurrency))
  })
  return Promise.all(promises)
}

</script>

<template>
  <div class="dashboard">
    <TopCardContainer
      :transactions="convertedTransactions"
      :loading="loading"
      class="hidden-sm-and-down"
      @update-base-currency="updateBaseCurrency"
    />
    <div
      v-if="transactionStore.transactions.length === 0"
      class="d-flex justify-center align-center flex-column my-10"
    >
      <span class="text-textPrimary text-h5">No insights to display!</span>
      <span class="text-textPrimary text-14">Come back once you've added a few transactions.</span>
      <div class="mt-5">
        <v-btn
          v-if="accountStore.accounts.length === 0"
          flat
          color="primary"
          @click="dialogAccount = true"
        >
          <template #prepend>
            <PlusIcon
              size="18"
              class="text-textPrimary"
            />
          </template>
          Add Account
        </v-btn>
        <div v-else>
          <v-btn
            flat
            color="primary"
            class="mr-2"
            to="/dashboard"
          >
            <template #prepend>
              <PlusIcon
                size="18"
                class="text-textPrimary"
              />
            </template>
            Add Transaction
          </v-btn>
          <v-btn
            flat
            color="primary"
            class="ml-2"
            to="/dashboard"
          >
            <template #prepend>
              <UploadIcon
                size="18"
                class="text-textPrimary"
              />
            </template>
            Upload Transactions
          </v-btn>
        </div>
      </div>
    </div>
    <div v-else>
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

    <v-dialog
      v-model="dialogAccount"
      width="375"
      persistent
    >
      <CardBase>
        <template #header>
          <v-card-title class="text-h5">
            Add Account
          </v-card-title>
        </template>
        <template #content>
          <AddAccount @close-dialog="dialogAccount = false" />
        </template>
      </CardBase>
    </v-dialog>
  </div>
</template>
