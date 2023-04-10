<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watch, onMounted, computed } from 'vue'
import { useAccountStore } from '@/stores/account'
import { useTransactionStore } from '@/stores/transaction'

import CardBase from '@/components/shared/CardBase.vue'
import PageBanner from '@/components/shared/PageBanner.vue'
import TransactionTable from '@/components/shared/TransactionTable.vue'

const route = useRoute()
const accountStore = useAccountStore()
const transactionStore = useTransactionStore()

const accountId = ref(Number(route.params.id))

const selectedAccount = computed(() => {
  return accountStore.accounts.find(obj => obj.id === accountId.value)
})

onMounted(() => {
  transactionStore.getTransactions()
    .catch((error) => {
      console.error(error)
    })
})

watch(
  () => route.params.id,
  async newId => {
    accountId.value = Number(newId)
  }
)

const filteredTransaction = computed(() => {
  return transactionStore.transactions.filter(obj => obj.account === accountId.value)
})
</script>

<template>
  <div>
    <PageBanner
      v-if="selectedAccount"
      :title="selectedAccount.name"
    />
    <v-row>
      <v-col cols="12">
        <CardBase variant="outlined">
          <template #header>
            <v-card-title
              v-if="selectedAccount"
              class="text-h5"
              :class="selectedAccount.balance >= 0 ? 'text-success' : 'text-error'"
            >
              {{ selectedAccount.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
            </v-card-title>
            <v-card-subtitle
              v-if="selectedAccount"
              class="mt-1"
            >
              {{ selectedAccount.name }}
            </v-card-subtitle>
          </template>
          <template #content>
            <TransactionTable
              all-accounts
              :transactions="filteredTransaction"
            />
          </template>
        </CardBase>
      </v-col>
    </v-row>
  </div>
</template>
