<script setup lang="ts">
import type { TablerIconComponent } from 'vue-tabler-icons'

type PropTypes = { icon: TablerIconComponent }

defineProps<PropTypes>()
</script>

<template>
  <component
    :is="icon"
    size="20"
  />
</template>
