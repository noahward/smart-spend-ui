<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PlusIcon, XIcon, UploadIcon } from 'vue-tabler-icons'
import { useExchRateStore } from '@/stores/exchange-rate'
import { useAccountStore } from '@/stores/account'
import { useTransactionStore } from '@/stores/transaction'
import CardBase from '@/components/shared/CardBase.vue'
import AddAccount from '@/components/account/AddAccount.vue'
import AddTransaction from '@/components/transaction/AddTransaction.vue'
import TopCardContainer from '@/components/dashboard/TopCardContainer.vue'
import ChartSavingsByMonth from '@/components/dashboard/charts/ChartSavingsByMonth.vue'
import ChartTransactionCategories from '@/components/dashboard/charts/ChartTransactionCategories.vue'
import UploadTransactionsContainer from '@/components/transaction/UploadTransactionsContainer.vue'
import type { Transaction } from '@/types/transaction'

const accountStore = useAccountStore()
const transactionStore = useTransactionStore()
const { exchangeRates, refreshExchangeRates } = useExchRateStore()

const loading = ref(false)
const baseCurrency = ref('USD')
const dialogCreate = ref(false)
const dialogUpload = ref(false)
const dialogAccount = ref(false)
const dialogUploadWidth = ref(365)
const convertedTransactions = ref<Transaction[]>([])

async function updateBaseCurrency (newBaseCurrency: string) {
  loading.value = true
  baseCurrency.value = newBaseCurrency
  return convertTransactionCurrencies(transactionStore.transactions, transactionStore.uniqueCurrencies, baseCurrency.value)
    .then((response) => {
      convertedTransactions.value = response
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  loading.value = true
  transactionStore.getTransactions()
    .then(async () => {
      convertTransactionCurrencies(transactionStore.transactions, transactionStore.uniqueCurrencies, baseCurrency.value)
        .then((response) => {
          convertedTransactions.value = response
        })
    })
    .catch((error) => {
      console.error(error)
    })
    .finally(() => {
      loading.value = false
    })
})

async function convertTransactionCurrencies (transactions: Transaction[], uniqueCurrencies: string[], baseCurrency: string) {
  return refreshExchangeRates(uniqueCurrencies, baseCurrency)
    .then(() => {
      const transactionsClone = transactions.map(a => ({ ...a }))
      return transactionsClone.map((transaction) => {
        const exchangeObj = exchangeRates.find((rate) => rate.from === transaction.currencyCode && rate.to === baseCurrency)
        if (exchangeObj) {
          transaction.amount = transaction.amount * exchangeObj.exchangeRate
          transaction.currencyCode = exchangeObj.to
        }
        return transaction
      })
    })
}

function changeUploadDialogWidth (newWidth: number) {
  dialogUploadWidth.value = newWidth
}

function closeUploadDialog () {
  dialogUpload.value = false
  setTimeout(function () {
    dialogUploadWidth.value = 365
  }, 1000)
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
            @click="dialogCreate = true"
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
            @click="dialogUpload = true"
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

    <v-dialog
      v-model="dialogUpload"
      :width="dialogUploadWidth"
      persistent
    >
      <CardBase>
        <template #header>
          <v-card-title class="text-h5 d-flex justify-space-between align-center">
            <span>Upload Transactions</span>
            <XIcon
              class="pointer"
              size="22"
              @click="closeUploadDialog"
            />
          </v-card-title>
        </template>
        <template #content>
          <UploadTransactionsContainer
            @change-width="changeUploadDialogWidth"
            @close-dialog="closeUploadDialog"
          />
        </template>
      </CardBase>
    </v-dialog>

    <v-dialog
      v-model="dialogCreate"
      width="375"
    >
      <CardBase>
        <template #header>
          <v-card-title class="text-h5">
            Add Transaction
          </v-card-title>
        </template>
        <template #content>
          <div class="flex-column">
            <AddTransaction
              @close-dialog="dialogCreate = false"
            />
          </div>
        </template>
      </CardBase>
    </v-dialog>
  </div>
</template>
