<script setup lang="ts">
import { formatCurrency } from '@/helpers/formatCurrency'
import type { TablerIconComponent } from 'vue-tabler-icons'

type PropTypes = {
  icon: TablerIconComponent;
  title: string;
  value: number;
  loading: boolean;
  number?: boolean;
  percent?: boolean;
}

withDefaults(defineProps<PropTypes>(), {
  number: false,
  percent: false,
  loading: false
})
</script>

<template>
  <div class="d-flex flex-column align-center justify-center text-center rounded-md pa-6 bg-lightSecondary h-100">
    <component
      :is="icon"
      size="40"
      class="text-textMedium"
    />
    <div class="text-h6 text-capitalize font-weight-bold text-textMedium mt-3">
      {{ title }}
    </div>
    <div
      class="text-h4 mt-4"
      :class="value >= 0 ? 'text-success' : 'text-error'"
    >
      <v-progress-circular
        v-if="loading"
        indeterminate
        color="secondary"
      />
      <div v-else>
        <span v-if="number">{{ formatCurrency(value) }}</span>
        <span v-else-if="percent">{{ (value * 100).toFixed(0) }}%</span>
        <span v-else>{{ value }}</span>
      </div>
    </div>
  </div>
</template>
