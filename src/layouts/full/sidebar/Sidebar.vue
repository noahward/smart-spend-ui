<script setup lang="ts">
import { shallowRef } from 'vue'
import { usePreferenceStore } from '@/stores/preferences'
import Logo from '@/layouts/full/logo/Logo.vue'
import baseMenuItems from './MenuItems'

const preferenceStore = usePreferenceStore()
const menuItems = shallowRef(baseMenuItems)
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

    <perfect-scrollbar class="scroll-navbar">
      <v-list class="pa-6">
        <template v-for="item in menuItems">
          {{ item.title }}
        </template>
      </v-list>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>
