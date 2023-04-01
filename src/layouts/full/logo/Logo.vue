<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
const isDark = computed(() => {
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
        width="200"
        :src="`src/assets/images/logos/logo-${isDark}-sm.png`"
        alt="SmartSpend"
      />
    </RouterLink>
  </div>
</template>
