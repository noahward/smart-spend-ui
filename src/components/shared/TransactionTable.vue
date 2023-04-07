<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { CreditCardIcon, EditIcon, TrashXIcon } from 'vue-tabler-icons'
import { useTransactionStore } from '@/stores/transaction'
import CardBase from '@/components/shared/CardBase.vue'
import AddTransaction from '@/components/transaction/AddTransaction.vue'
import type { Transaction, TransactionAPIErrors } from '@/types/transaction'

type PropTypes = {
  transactions: Transaction[],
  allAccounts?: boolean
}

const componentProps = withDefaults(defineProps<PropTypes>(), { allAccounts: false })
const transactionStore = useTransactionStore()

const orderedTransactions = computed(() => {
  return [...componentProps.transactions].sort((a, b) => {
    return new Date(b.date).valueOf() - new Date(a.date).valueOf()
  })
})

const headers = ref([
  { title: 'Date', key: 'date' },
  { title: 'Description', key: 'description' },
  { title: 'Amount', key: 'amount' },
  { title: 'Category', key: 'categoryName' },
  ...componentProps.allAccounts ? [{ title: 'Account', key: 'accountName' }] : [],
  { title: 'Actions', key: 'actions', sortable: false }
])

const search = ref('')

const dialogCreate = ref(false)
const dialogEdit = ref(false)
const dialogDelete = ref(false)

const modifiedItem = ref()

function editItem (item: Transaction) {
  modifiedItem.value = item
  dialogEdit.value = true
}

function deleteItem (item: Transaction) {
  modifiedItem.value = item
  dialogDelete.value = true
}

function closeEditDialog () {
  dialogEdit.value = false
  nextTick(() => {
    modifiedItem.value = null
  })
}

function closeDeleteDialog () {
  dialogDelete.value = false
  nextTick(() => {
    modifiedItem.value = -1
  })
}

async function confirmDelete () {
  return transactionStore.deleteTransaction(modifiedItem.value)
    .then(() => {
      closeDeleteDialog()
    })
    .catch((error) => {
      console.error(error)
    })
}

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
      <v-btn
        color="primary"
        flat
        class="ml-auto"
        @click="dialogCreate = true"
      >
        <CreditCardIcon
          class="mr-2"
          size="20"
        />
        Add Transaction
      </v-btn>
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
          {{ item.columns.accountName }}
        </td>
        <td>
          <EditIcon
            class="mr-2 pointer"
            size="17"
            @click="editItem(item.raw)"
          />
          <TrashXIcon
            class="pointer text-error"
            size="17"
            @click="deleteItem(item.raw)"
          />
        </td>
      </tr>
    </template>
  </v-data-table>

  <v-dialog
    v-model="dialogCreate"
    width="375"
  >
    <CardBase>
      <template #header>
        <v-card-title class="text-h5">
          Add Transaction
        </v-card-title>
      </template>
      <template #content>
        <div class="flex-column">
          <AddTransaction @close-dialog="dialogCreate = false" />
        </div>
      </template>
    </CardBase>
  </v-dialog>

  <v-dialog
    v-model="dialogEdit"
    width="375"
  >
    <CardBase>
      <template #header>
        <v-card-title class="text-h5">
          Edit Transaction
        </v-card-title>
      </template>
      <template #content>
        <div class="flex-column">
          Content
        </div>
      </template>
    </CardBase>
  </v-dialog>

  <v-dialog
    v-model="dialogDelete"
    width="375"
  >
    <CardBase>
      <template #header>
        <v-card-title class="text-h5">
          Delete Transaction?
        </v-card-title>
      </template>
      <template #content>
        <div class="mb-2">
          <v-btn
            flat
            type="submit"
            color="error"
            @click="confirmDelete"
          >
            Delete
          </v-btn>
          <v-btn
            color="surface"
            flat
            class="ml-2"
            @click="closeDeleteDialog"
          >
            Cancel
          </v-btn>
        </div>
      </template>
    </CardBase>
  </v-dialog>
</template>
