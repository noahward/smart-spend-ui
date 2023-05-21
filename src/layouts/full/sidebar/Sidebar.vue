<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { PointIcon, BuildingBankIcon } from 'vue-tabler-icons'
import { useAccountStore } from '@/stores/account'
import { usePreferenceStore } from '@/stores/preferences'
import Logo from '../logo/Logo.vue'
import Profile from './profile/Profile.vue'
import NavItem from './item/NavItem.vue'
import NavGroup from './item/NavGroup.vue'
import baseMenuItems from './item/MenuItems'
import type { Account } from '@/types/account'

const accountStore = useAccountStore()
const preferenceStore = usePreferenceStore()

onMounted(() => {
  accountStore.getAccounts()
    .catch((error) => {
      console.error(error)
    })
})

function formatMenuItem (account: Account) {
  return {
    title: account.name,
    icon: PointIcon,
    to: `/accounts/${account.id}`
  }
}

const computedMenuItems = computed(() => {
  const baseMenuItemsClone = baseMenuItems.map(a => ({ ...a }))
  const accountsItem = {
    title: 'Accounts',
    icon: BuildingBankIcon,
    to: '',
    children: [
      ...accountStore.accounts.length !== 0 ? [{
        title: 'All Accounts',
        icon: PointIcon,
        to: '/accounts'
      }] : []
    ]
  }
  accountsItem.children.push(...accountStore.accounts.map(obj => formatMenuItem(obj)))
  baseMenuItemsClone.push(accountsItem)
  return baseMenuItemsClone
})
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
          v-for="item in computedMenuItems"
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
