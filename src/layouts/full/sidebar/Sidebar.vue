<script setup lang="ts">
import { shallowRef } from 'vue'
import { usePreferenceStore } from '@/stores/preferences'
import Logo from '../logo/Logo.vue'
import Profile from './profile/Profile.vue'
import NavItem from './item/NavItem.vue'
import NavGroup from './item/NavGroup.vue'
import baseMenuItems from './item/MenuItems'

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
        <template
          v-for="item in menuItems"
          :key="item.title"
        >
          <NavItem
            v-if="item.title !== 'Accounts'"
            :item="item"
            class="left-padding"
          />
          <NavGroup
            v-else
            :level="0"
            :item="item"
          />
        </template>
      </v-list>
      <div class="pa-6 user-bottom">
        <Profile />
      </div>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>
