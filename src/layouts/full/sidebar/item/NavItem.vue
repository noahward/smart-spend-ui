<script setup lang="ts">
import Icon from './ItemIcon.vue'
import type { MenuItem } from './MenuItems'

type PropTypes = { item: MenuItem }

defineProps<PropTypes>()
</script>

<template>
  <v-list-item
    rounded
    :to="item.to"
    :disabled="item.disabled"
    class="mb-1"
  >
    <template #prepend>
      <Icon
        v-if="item.icon"
        :icon="item.icon"
      />
    </template>
    <v-list-item-title>{{ item.title }}</v-list-item-title>
  </v-list-item>
</template>
