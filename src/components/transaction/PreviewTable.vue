<script setup lang="ts">
import { ref, computed } from 'vue'
import { formatDate } from '@/helpers/formatDate'
import { formatCurrency } from '@/helpers/formatCurrency'
import type { AccountTransactionsPreview } from '@/types/file-preview'

type PropTypes = { previewData: AccountTransactionsPreview }

const props = defineProps<PropTypes>()

const orderedTransactions = computed(() => {
  const transactionsCopy = props.previewData.transactions.map(itm => { return { ...itm } })
  return transactionsCopy.sort((a, b) => {
    return new Date(b.date).valueOf() - new Date(a.date).valueOf()
  })
})

const headers = ref([
  { title: 'Date', key: 'date', width: '25%' },
  { title: 'Description', key: 'description', width: '50%' },
  { title: 'Amount', key: 'amount', width: '25%' }
])
</script>

<template>
  <v-data-table
    density="compact"
    :headers="headers"
    :items="orderedTransactions"
    :items-per-page="5"
  >
    <template #item="{ item }">
      <tr>
        <td>{{ formatDate(item.columns.date) }}</td>
        <td>{{ item.columns.description }}</td>
        <td>
          {{ formatCurrency(item.columns.amount, item.raw.currencyCode) }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
