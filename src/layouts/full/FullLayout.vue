<script setup lang="ts">
import { useTheme } from 'vuetify'
import { RouterView } from 'vue-router'
import { SunFilledIcon, MoonFilledIcon } from 'vue-tabler-icons'
import { usePreferenceStore } from '@/stores/preferences'
import Navbar from './navbar/Navbar.vue'
import Sidebar from './sidebar/Sidebar.vue'

const theme = useTheme()
const preferenceStore = usePreferenceStore()

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'CustomLightTheme' : 'CustomDarkTheme'
}
</script>

<template>
  <v-app :class="{ 'mini-sidebar': preferenceStore.miniSidebar }">
    <v-main>
      <Sidebar />
      <Navbar />
      <v-container
        fluid
        class="page-wrapper pb-sm-15 pb-10"
      >
        <div class="max-width-override">
          <RouterView />
          <v-btn
            class="theme-btn"
            size="small"
            icon
            variant="flat"
            color="primary"
            @click="toggleTheme"
          >
            <SunFilledIcon v-if="theme.global.current.value.dark" />
            <MoonFilledIcon
              v-else
              size="18"
            />
          </v-btn>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>
