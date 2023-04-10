<script setup lang="ts">
import { useRoute } from 'vue-router'
import { DotsIcon } from 'vue-tabler-icons'
import { ref, watch, onMounted, computed } from 'vue'
import { useAccountStore } from '@/stores/account'
import { useTransactionStore } from '@/stores/transaction'
import { router } from '@/router'
import CardBase from '@/components/shared/CardBase.vue'
import PageBanner from '@/components/shared/PageBanner.vue'
import EditAccount from '@/components/account/EditAccount.vue'
import TransactionTable from '@/components/transaction/TransactionTable.vue'

const route = useRoute()
const accountStore = useAccountStore()
const transactionStore = useTransactionStore()

const accountId = ref(Number(route.params.id))

const dialogDelete = ref(false)
const dialogEdit = ref(false)

const selectedAccount = computed(() => {
  return accountStore.accounts.find(obj => obj.id === accountId.value)
})

onMounted(() => {
  transactionStore.getTransactions()
    .catch((error) => {
      console.error(error)
    })
})

watch(
  () => route.params.id,
  async newId => {
    accountId.value = Number(newId)
  }
)

const filteredTransaction = computed(() => {
  return transactionStore.transactions.filter(obj => obj.account === accountId.value)
})

async function confirmDelete () {
  return accountStore.deleteAccount(accountId.value)
    .then(() => {
      dialogDelete.value = false
      router.push('/dashboard')
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<template>
  <div>
    <PageBanner
      v-if="selectedAccount"
      :title="selectedAccount.name"
    />
    <v-row>
      <v-col cols="12">
        <CardBase variant="outlined">
          <template #header>
            <div class="d-flex align-center justify-space-between">
              <div>
                <v-card-title
                  v-if="selectedAccount"
                  class="text-h5"
                  :class="selectedAccount.balance >= 0 ? 'text-success' : 'text-error'"
                >
                  {{ selectedAccount.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
                </v-card-title>
                <v-card-subtitle
                  v-if="selectedAccount"
                  class="mt-1"
                >
                  {{ selectedAccount.name }}
                </v-card-subtitle>
              </div>
              <div>
                <v-menu width="100">
                  <template #activator="{ props }">
                    <DotsIcon
                      v-bind="props"
                      size="21"
                      class="text-textSecondary pointer"
                    />
                  </template>
                  <v-list class="pointer">
                    <v-list-item>
                      <v-list-item-title @click="dialogEdit = true">
                        Edit
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title
                        class="text-error"
                        @click="dialogDelete = true"
                      >
                        Delete
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </div>
          </template>
          <template #content>
            <TransactionTable
              v-if="selectedAccount"
              all-accounts
              :transactions="filteredTransaction"
              :account-name="selectedAccount.name"
            />
          </template>
        </CardBase>
      </v-col>
    </v-row>
  </div>

  <v-dialog
    v-model="dialogDelete"
    width="375"
  >
    <CardBase>
      <template #header>
        <v-card-title class="text-h5">
          Delete Account?
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
            @click="dialogDelete = false"
          >
            Cancel
          </v-btn>
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
          Edit Account
        </v-card-title>
      </template>
      <template #content>
        <EditAccount
          v-if="selectedAccount"
          :initial-values="selectedAccount"
          @close-dialog="dialogEdit = false"
        />
      </template>
    </CardBase>
  </v-dialog>
</template>

<style scoped lang="scss">
.v-list-item {

  &:hover {
    background-color: rgb(var(--v-theme-primaryBorder));
  }
}
</style>
