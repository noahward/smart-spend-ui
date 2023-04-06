<script setup lang="ts">
import { useField } from 'vee-validate'
import { toRef, computed } from 'vue'
import { ExclamationCircleIcon } from 'vue-tabler-icons'

type PropTypes = {
  name: string;
  kind: 'email' | 'password' | 'number' | 'text' | 'date';
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
      blur: (e: Event) => handleChange(e, false),
      change: (e: Event) => handleChange(e, false),
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

function isNumber (evt: KeyboardEvent) {
  if (props.kind === 'number') {
    const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.']
    const keyPressed = evt.key

    if (!keysAllowed.includes(keyPressed)) {
      evt.preventDefault()
    }
  }
}
</script>

<template>
  <div>
    <v-text-field
      v-model="value"
      :label="props.label"
      :type="props.kind"
      :disable="props.disable"
      v-on="validationListeners"
      @keypress="isNumber($event)"
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
