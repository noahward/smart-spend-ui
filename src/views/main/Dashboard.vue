<script setup lang="ts">
import { onMounted } from 'vue'
import { useTransactionStore } from '@/stores/transaction'
import TopCardContainer from '@/components/dashboard/TopCardContainer.vue'

const transactionStore = useTransactionStore()

onMounted(() => {
  transactionStore.getTransactions()
    .catch((error) => {
      console.error(error)
    })
})
</script>

<template>
  <div>
    <TopCardContainer />
  </div>
</template>
