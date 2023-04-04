<script setup lang="ts">
type PropTypes = { title: string }

defineProps<PropTypes>()
</script>

<template>
  <v-card elevation="10">
    <v-card-item class="py-4 px-6">
      <div class="d-sm-flex align-center justify-space-between">
        <v-card-title class="text-h5">
          {{ title }}
        </v-card-title>
      </div>
    </v-card-item>
    <v-divider />
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>
