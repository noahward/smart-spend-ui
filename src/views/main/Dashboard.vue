<script setup lang="ts">
import { onMounted } from 'vue'
import { useTransactionStore } from '@/stores/transaction'
import PageBanner from '@/components/shared/PageBanner.vue'

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
    <PageBanner title="Dashboard" />
    <v-row>
      <v-col cols="12">
        <v-card variant="outlined">
          <v-card-item />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
