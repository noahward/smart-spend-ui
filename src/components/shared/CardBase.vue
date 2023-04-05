<script setup lang="ts">
type PropTypes = {
  title: string,
  variant: 'text' | 'flat' | 'elevated' | 'tonal' | 'outlined' | 'plain'
}

withDefaults(defineProps<PropTypes>(), { variant: 'elevated' })
</script>

<template>
  <v-card :variant="variant">
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
