<script setup lang="ts">
import { useTheme, useDisplay } from 'vuetify'
import { SunFilledIcon, MoonFilledIcon } from 'vue-tabler-icons'
import Logo from '@/layouts/full/logo/Logo.vue'

const theme = useTheme()
const { name } = useDisplay()

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'CustomLightTheme' : 'CustomDarkTheme'
}
</script>

<template>
  <v-app-bar
    height="80"
    flat
  >
    <v-container class="max-width-override py-sm-4 py-0">
      <v-toolbar class="d-flex align-center bg-surface">
        <Logo
          inline
          class="mt-1"
        />
        <v-spacer />
        <div>
          <v-btn
            class="nav-theme-btn mr-5"
            :class="{ 'theme-btn' : ['xs', 'sm'].includes(name) }"
            size="small"
            icon
            variant="flat"
            plain
            @click="toggleTheme"
          >
            <SunFilledIcon v-if="theme.global.current.value.dark" />
            <MoonFilledIcon
              v-else
              size="18"
            />
          </v-btn>
          <v-btn
            class="text-textPrimary"
            to="/login"
          >
            Sign In
          </v-btn>
          <v-btn
            class="bg-primary ml-2"
            to="/register"
          >
            Register
          </v-btn>
        </div>
      </v-toolbar>
    </v-container>
  </v-app-bar>
</template>
