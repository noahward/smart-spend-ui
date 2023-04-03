<script setup lang="ts">
import { PlusIcon } from 'vue-tabler-icons'
import Icon from './ItemIcon.vue'
</script>

<template>
  <v-list-item
    rounded
    class="add-account mb-1"
  >
    <template #prepend>
      <Icon
        :icon="PlusIcon"
      />
    </template>
    <v-list-item-title>Add Account</v-list-item-title>
  </v-list-item>
</template>

<style scoped lang="scss">
.add-account {
  background-color: rgb(var(--v-theme-hoverColor));
  cursor: pointer;
}
</style>
