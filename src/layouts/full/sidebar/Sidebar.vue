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
    <div class="pa-5">
      <v-img
        v-if="preferenceStore.miniSidebar"
        src="src/assets/images/logos/logo-symbol.png"
        class="logo"
        width="40"
      />
      <Logo v-else />
    </div>
  </v-navigation-drawer>
</template>