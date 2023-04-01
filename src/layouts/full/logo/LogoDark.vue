<template>
  <div class="logo">
    <RouterLink to="/">
      <v-img
        width="200"
        src="src/assets/images/logos/logo-light-sm.png"
        alt="SmartSpend"
      />
    </RouterLink>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
const primary = ref('rgb(var(--v-theme-primary))')
const secondary = ref('rgb(var(--v-theme-secondary))')
</script>
