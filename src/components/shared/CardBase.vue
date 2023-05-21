<script setup lang="ts">
type PropTypes = {
  variant?: 'text' | 'flat' | 'elevated' | 'tonal' | 'outlined' | 'plain'
}

withDefaults(defineProps<PropTypes>(), { variant: 'elevated' })
</script>

<template>
  <v-card :variant="variant">
    <v-card-item class="py-4 px-6">
      <div class="align-center">
        <slot name="header" />
      </div>
    </v-card-item>
    <v-divider />
    <v-card-text>
      <slot name="content" />
    </v-card-text>
  </v-card>
</template>
