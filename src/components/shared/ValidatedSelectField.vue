<script setup lang="ts">
import { useField } from 'vee-validate'
import { toRef, computed } from 'vue'
import { ExclamationCircleIcon } from 'vue-tabler-icons'

type PropTypes = {
  name: string;
  options: Array<object | string>;
  label?: string | undefined;
  disable?: boolean;
  errors?: Array<string>;
}

const props = withDefaults(defineProps<PropTypes>(), {
  label: undefined,
  disable: false,
  errors: () => []
})

const { errorMessage, value, handleChange } =
useField<string>(
  toRef(props, 'name'),
  undefined,
  { validateOnValueUpdate: false }
)

const validationListeners = computed(() => {
  // Lazy
  if (!errorMessage.value) {
    return {
      blur: handleChange,
      change: handleChange,
      input: (e: Event) => handleChange(e, false)
    }
  }
  // Aggressive
  return {
    blur: handleChange,
    change: handleChange,
    input: handleChange
  }
})
</script>

<template>
  <div>
    <v-select
      v-model="value"
      :items="options"
      :label="props.label"
      :disable="props.disable"
      v-on="validationListeners"
    />
    <div
      v-if="errorMessage || errors.length !== 0"
      class="d-flex align-center text-error mt-n4 mb-4"
    >
      <exclamation-circle-icon
        size="16"
        class="mr-1"
      />
      <span class="text-caption">{{ errorMessage }}</span>
      <span
        v-for="err in errors"
        :key="err"
        class="text-caption"
      >{{ err }}</span>
    </div>
  </div>
</template>
