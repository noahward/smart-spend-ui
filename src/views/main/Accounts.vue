<script setup lang="ts">
import CardBase from '@/components/shared/CardBase.vue'
import PageBanner from '@/components/shared/PageBanner.vue'
import TransactionTable from '@/components/shared/TransactionTable.vue'
</script>

<template>
  <div>
    <PageBanner title="All Accounts" />
    <v-row>
      <v-col cols="12">
        <CardBase
          title="All Accounts"
          variant="outlined"
        >
          <TransactionTable />
        </CardBase>
      </v-col>
    </v-row>
  </div>
</template>
