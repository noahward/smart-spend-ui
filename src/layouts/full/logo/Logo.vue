<script setup lang="ts">
import { useTheme } from 'vuetify'
import LogoDark from './LogoDark.vue'
import LogoLight from './LogoLight.vue'

const theme = useTheme()
</script>

<template>
  <div>
    <LogoLight v-if="theme.global.current.value.dark" />
    <LogoDark v-else />
  </div>
</template>
