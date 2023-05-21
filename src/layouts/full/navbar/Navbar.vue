<script setup lang="ts">
import { Menu2Icon } from 'vue-tabler-icons'
import { usePreferenceStore } from '@/stores/preferences'

const preferenceStore = usePreferenceStore()
</script>

<template>
  <v-app-bar
    elevation="0"
    height="70"
  >
    <v-btn
      class="hidden-md-and-down"
      icon
      variant="flat"
      size="small"
      @click.stop="preferenceStore.toggleMiniSidebar"
    >
      <Menu2Icon size="20" />
    </v-btn>
    <v-btn
      class="hidden-lg-and-up ml-2"
      icon
      variant="flat"
      size="small"
      @click.stop="preferenceStore.toggleSidebarDrawer"
    >
      <Menu2Icon size="20" />
    </v-btn>
  </v-app-bar>
</template>
