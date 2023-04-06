<script setup lang="ts">
import { ref, computed } from 'vue'
import { CreditCardIcon } from 'vue-tabler-icons'
import type { Transaction } from '@/types/transaction'

type PropTypes = {
  transactions: Transaction[],
  allAccounts?: boolean
}

const componentProps = withDefaults(defineProps<PropTypes>(), { allAccounts: false })

const search = ref('')
const dialog = ref(false)

const headers = ref([
  { title: 'Date', key: 'date' },
  { title: 'Description', key: 'description' },
  { title: 'Amount', key: 'amount' },
  { title: 'Category', key: 'categoryName' }
])

if (componentProps.allAccounts) {
  headers.value.push({ title: 'Account', key: 'account' })
}

const orderedTransactions = computed(() => {
  return [...componentProps.transactions].sort((a, b) => {
    return new Date(b.date).valueOf() - new Date(a.date).valueOf()
  })
})

function formatDate (date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  return new Date(date).toLocaleDateString('en-us', options)
}
</script>

<template>
  <v-row>
    <v-col
      cols="12"
      lg="4"
      sm="6"
      class="mb-sm-5 mb-n3"
    >
      <v-text-field
        v-model="search"
        hide-details
        density="compact"
        label="Search"
        variant="outlined"
      />
    </v-col>
    <v-col
      cols="12"
      lg="8"
      sm="6"
      class="text-right"
    >
      <v-dialog
        v-model="dialog"
        width="375"
        persistent
      >
        <template #activator="{ props }">
          <v-btn
            color="primary"
            v-bind="props"
            flat
            class="ml-auto"
          >
            <CreditCardIcon
              class="mr-2"
              size="20"
            />
            Add Transaction
          </v-btn>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
  <v-data-table
    :headers="headers"
    :items="orderedTransactions"
    :search="search"
    item-value="name"
  >
    <template #item="{ item }">
      <tr>
        <td>{{ formatDate(item.columns.date) }}</td>
        <td>{{ item.columns.description }}</td>
        <td>{{ item.columns.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</td>
        <td>{{ item.columns.categoryName }}</td>
        <td v-if="allAccounts">
          {{ item.columns.account }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
