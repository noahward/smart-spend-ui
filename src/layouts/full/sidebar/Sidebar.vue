<script setup lang="ts">
import { usePreferenceStore } from '@/stores/preferences'
import Logo from '@/layouts/full/logo/Logo.vue'

const preferenceStore = usePreferenceStore()
</script>

<template>
  <v-navigation-drawer
    v-model="preferenceStore.sidebarDrawer"
    :rail="preferenceStore.miniSidebar"
    app
    left
    elevation="0"
    width="270"
    rail-width="75"
    mobile-breakpoint="960"
    expand-on-hover
    class="left-sidebar"
  >
    <div class="pa-5 mr-6">
      <Logo inline />
    </div>
  </v-navigation-drawer>
</template>
