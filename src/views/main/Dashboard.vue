<script setup lang="ts">
import { onMounted } from 'vue'
import { useTransactionStore } from '@/stores/transaction'
import TopCardContainer from '@/components/dashboard/TopCardContainer.vue'
import ChartSavingsByMonth from '@/components/dashboard/charts/ChartSavingsByMonth.vue'

const transactionStore = useTransactionStore()

onMounted(() => {
  transactionStore.getTransactions()
    .catch((error) => {
      console.error(error)
    })
})
</script>

<template>
  <div class="dashboard">
    <TopCardContainer />
    <v-row>
      <v-col cols="12">
        <ChartSavingsByMonth />
      </v-col>
    </v-row>
  </div>
</template>
