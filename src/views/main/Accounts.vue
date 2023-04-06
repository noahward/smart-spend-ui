<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useAccountStore } from '@/stores/account'
import { useTransactionStore } from '@/stores/transaction'
import CardBase from '@/components/shared/CardBase.vue'
import PageBanner from '@/components/shared/PageBanner.vue'
import TransactionTable from '@/components/shared/TransactionTable.vue'

const accountStore = useAccountStore()
const transactionStore = useTransactionStore()

onMounted(() => {
  transactionStore.getTransactions()
    .catch((error) => {
      console.error(error)
    })
})

const totalBalance = computed(() => {
  // TODO: Filter by currency, once currency is supported
  let total = 0

  accountStore.accounts.forEach(account => {
    total += account.balance
  })

  return total
})
</script>

<template>
  <div>
    <PageBanner title="All Accounts" />
    <v-row>
      <v-col cols="12">
        <CardBase variant="outlined">
          <template #header>
            <v-card-title
              class="text-h5"
              :class="totalBalance >= 0 ? 'text-success' : 'text-error'"
            >
              {{ totalBalance.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
            </v-card-title>
            <v-card-subtitle class="mt-1">
              All Accounts
            </v-card-subtitle>
          </template>
          <template #content>
            <TransactionTable
              all-accounts
              :transactions="transactionStore.transactions"
            />
          </template>
        </CardBase>
      </v-col>
    </v-row>
  </div>
</template>
