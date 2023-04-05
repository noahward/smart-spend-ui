<script setup lang="ts">
import { ref } from 'vue'
import { PlusIcon } from 'vue-tabler-icons'
import Icon from './ItemIcon.vue'
import CardBase from '@/components/shared/CardBase.vue'
import AddAccount from '@/components/account/AddAccount.vue'

const dialog = ref(false)
</script>

<template>
  <v-list-item
    rounded
    class="add-account mb-1"
    @click="dialog=true"
  >
    <template #prepend>
      <Icon
        :icon="PlusIcon"
      />
    </template>
    <v-list-item-title>Add Account</v-list-item-title>
  </v-list-item>
  <v-dialog
    v-model="dialog"
    width="375"
    persistent
  >
    <CardBase>
      <template #header>
        <v-card-title class="text-h5">
          All Accounts
        </v-card-title>
      </template>
      <template #content>
        <AddAccount @close-dialog="dialog = false" />
      </template>
    </CardBase>
  </v-dialog>
</template>

<style scoped lang="scss">
.add-account {
  background-color: rgb(var(--v-theme-primaryBorder));
  cursor: pointer;
}
</style>
