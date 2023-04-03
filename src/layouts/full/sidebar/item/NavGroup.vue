<script setup lang="ts">
import Icon from './ItemIcon.vue'
import NavItem from './NavItem.vue'
import type { MenuItem } from './MenuItems'

type PropTypes = { item: MenuItem, level: number }

defineProps<PropTypes>()
</script>

<template>
  <v-list-group
    no-action
    value="true"
  >
    <template #activator="{ props }">
      <v-list-item
        v-bind="props"
        :value="item.title"
        rounded
        class="mb-1"
      >
        <template #prepend>
          <Icon
            v-if="item.icon"
            :icon="item.icon"
          />
        </template>
        <v-list-item-title class="mr-auto">
          {{ item.title }}
        </v-list-item-title>
      </v-list-item>
    </template>
    <template v-if="item.children">
      <div
        v-for="(subitem, i) in item.children"
        :key="i"
      >
        <NavItem
          :item="subitem"
          :level="level + 1"
        />
      </div>
    </template>
  </v-list-group>
</template>
