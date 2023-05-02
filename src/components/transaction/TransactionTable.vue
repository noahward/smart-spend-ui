<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue'
import { PlusIcon, UploadIcon, EditIcon, TrashXIcon, DeviceFloppyIcon, XIcon } from 'vue-tabler-icons'
import { formatDate } from '@/helpers/formatDate'
import { formatCurrency } from '@/helpers/formatCurrency'
import { useCategoryStore } from '@/stores/category'
import { useTransactionStore } from '@/stores/transaction'
import CardBase from '@/components/shared/CardBase.vue'
import AddTransaction from '@/components/transaction/AddTransaction.vue'
import EditTransaction from '@/components/transaction/EditTransaction.vue'
import UploadTransactionsContainer from '@/components/transaction/UploadTransactionsContainer.vue'
import type { Transaction } from '@/types/transaction'

type PropTypes = {
  transactions: Transaction[],
  allAccounts?: boolean,
  accountName?: string
}

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.getCategories()
    .catch((error) => {
      console.error(error)
    })
})

const componentProps = withDefaults(defineProps<PropTypes>(), {
  allAccounts: false,
  accountName: undefined
})
const transactionStore = useTransactionStore()

const orderedTransactions = computed(() => {
  const transactionsCopy = componentProps.transactions.map(itm => { return { ...itm } })
  return transactionsCopy.sort((a, b) => {
    return new Date(b.date).valueOf() - new Date(a.date).valueOf()
  })
})

const headers = ref([
  { title: 'Date', key: 'date', width: '15%' },
  { title: 'Description', key: 'description' },
  { title: 'Amount', key: 'amount', width: '15%' },
  { title: 'Category', key: 'categoryName', width: '23%' },
  ...componentProps.allAccounts ? [{ title: 'Account', key: 'accountName' }] : [],
  { title: 'Actions', key: 'actions', sortable: false, width: '10%' }
])

const search = ref('')

interface DefaultEditCategory {
  id: number | null | undefined;
  originalCategory: string | null | undefined;
  newCategory: string | null | undefined;
}

const defaultEditCategory: DefaultEditCategory = {
  id: null,
  originalCategory: null,
  newCategory: null
}

const editCategory = ref(defaultEditCategory)

const dialogCreate = ref(false)
const dialogUpload = ref(false)
const dialogDelete = ref(false)
const dialogEdit = ref(false)

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

function selectCategory (item: any, newCategory: string) {
  const originalCategory = componentProps.transactions.find((obj) => obj.id === item.raw.id)?.categoryName
  editCategory.value = {
    id: item.raw.id,
    newCategory,
    originalCategory
  }
}

async function confirmUpdateCategory (item: any) {
  const catId = categoryStore.categories.find((cat) => cat.name === item.raw.categoryName)?.id
  if (catId) {
    item.raw.category = catId
  }
  return transactionStore.updateTransaction(item.raw)
    .then(() => {
      editCategory.value = defaultEditCategory
    })
    .catch((error) => {
      console.error(error)
    })
}

function closeCategorySelect (item: any) {
  item.raw.categoryName = editCategory.value.originalCategory
  editCategory.value = defaultEditCategory
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
      <div class="pa-2 d-flex align-center justify-end">
        <div class="file-upload">
          <UploadIcon
            size="22"
            class="pointer text-primary"
            @click="dialogUpload = true"
          />
        </div>
        <div>
          <PlusIcon
            size="22"
            class="pointer ml-4 text-primary"
            @click="dialogCreate = true"
          />
        </div>
      </div>
    </v-col>
  </v-row>
  <v-data-table
    :headers="headers"
    :items="orderedTransactions"
    :search="search"
    item-value="name"
  >
    <template #no-data>
      <tr class="bg-primary">
        <td
          colspan="100%"
          class="text-center text-textPrimary"
        >
          No transactions to display!
        </td>
      </tr>
    </template>
    <template #item="{ item }">
      <tr>
        <td>{{ formatDate(item.columns.date) }}</td>
        <td>{{ item.columns.description }}</td>
        <td>{{ formatCurrency(item.columns.amount, item.raw.currencyCode) }}</td>
        <td>
          <div class="d-flex align-center">
            <v-select
              v-model="item.raw.categoryName"
              :items="categoryStore.categorySelectOptions"
              density="compact"
              hide-details
              @update:model-value="selectCategory(item, $event)"
            />
            <div
              v-if="editCategory.id === item.raw.id"
              class="d-flex align-center"
            >
              <DeviceFloppyIcon
                size="17"
                class="ml-2 text-success pointer"
                @click="confirmUpdateCategory(item)"
              />
              <XIcon
                size="17"
                class="ml-1 text-error pointer"
                @click="closeCategorySelect(item)"
              />
            </div>
          </div>
        </td>
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
    v-model="dialogUpload"
    width="375"
    persistent
  >
    <CardBase>
      <template #header>
        <v-card-title class="text-h5 d-flex justify-space-between align-center">
          <span>Upload Transactions</span>
          <XIcon
            class="pointer"
            size="22"
            @click="dialogUpload = false"
          />
        </v-card-title>
      </template>
      <template #content>
        <UploadTransactionsContainer />
      </template>
    </CardBase>
  </v-dialog>

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
          <AddTransaction
            :account-name="accountName"
            @close-dialog="dialogCreate = false"
          />
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
        <EditTransaction
          v-if="dialogEdit"
          :initial-values="modifiedItem"
          @close-dialog="closeEditDialog"
        />
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

<style scoped lang="scss">
.small-btn {
  padding: 2px 4px !important;
  min-width: 35px !important;
}

.file-upload>input {
  display: none;
}
</style>
