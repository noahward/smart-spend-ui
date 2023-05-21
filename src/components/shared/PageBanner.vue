<script setup lang="ts">
type PropTypes = { title: string }

defineProps<PropTypes>()
</script>

<template>
  <v-card class="bg-lightPrimary elevation-0 rounded-md mb-8 px-8">
    <h3 class="text-h3 py-5">
      {{ title }}
    </h3>
  </v-card>
</template>
