<script setup lang="ts">
import { computed } from 'vue'
import { useAccountStore } from '@/stores/account'
import CardBase from '@/components/shared/CardBase.vue'
import PageBanner from '@/components/shared/PageBanner.vue'
import TransactionTable from '@/components/shared/TransactionTable.vue'

const accountStore = useAccountStore()

const totalBalance = computed(() => {
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
            <TransactionTable />
          </template>
        </CardBase>
      </v-col>
    </v-row>
  </div>
</template>
