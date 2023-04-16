<script setup lang="ts">
import { onMounted } from 'vue'
import { useTransactionStore } from '@/stores/transaction'
import TopCardContainer from '@/components/dashboard/TopCardContainer.vue'
import ChartSavingsByMonth from '@/components/dashboard/charts/ChartSavingsByMonth.vue'
import ChartTransactionCategories from '@/components/dashboard/charts/ChartTransactionCategories.vue'

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
