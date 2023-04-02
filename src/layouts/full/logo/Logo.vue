<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
const dark = computed(() => {
  if (theme.global.current.value.dark) {
    return 'light'
  }
  return 'dark'
})
</script>

<template>
  <div class="logo">
    <RouterLink to="/">
      <v-img
        width="175"
        :src="`src/assets/images/logos/logo-main-${dark}.png`"
        alt="SmartSpend"
      />
    </RouterLink>
  </div>
</template>
