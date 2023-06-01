<script setup lang="ts">
import { useField } from 'vee-validate'
import { toRef, computed } from 'vue'
import { ExclamationCircleIcon, InfoCircleIcon } from 'vue-tabler-icons'

type PropTypes = {
  name: string;
  kind: 'email' | 'password' | 'number' | 'text' | 'date';
  label?: string | undefined;
  currencyInfo?: boolean;
  disable?: boolean;
  errors?: Array<string>;
}

const props = withDefaults(defineProps<PropTypes>(), {
  label: undefined,
  disable: false,
  currencyInfo: false,
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
    const keysAllowed = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '-']
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
    >
      <template
        v-if="currencyInfo"
        #append-inner
      >
        <div
          class="d-flex align-center exch-container"
        >
          <v-btn flat>
            <info-circle-icon
              size="16"
              class="text-primary pointer"
            />
            <v-tooltip
              max-width="250"
              activator="parent"
              location="top"
            >
              Transaction will use the currency of the chosen account.
            </v-tooltip>
          </v-btn>
        </div>
      </template>
    </v-text-field>
    <div
      v-if="errorMessage || errors.length !== 0"
      class="d-flex text-error mt-n4 mb-4 flex-column"
    >
      <div v-if="errorMessage">
        <exclamation-circle-icon
          size="16"
          class="mr-1"
        />
        <span class="text-caption">{{ errorMessage }}</span>
      </div>
      <div
        v-for="err in errors"
        :key="err"
        class="d-flex align-center"
      >
        <exclamation-circle-icon
          size="16"
          class="mr-1"
        />
        <span class="text-caption">{{ err }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.exch-container > .v-btn {
  border-radius: 25px !important;
  height: 16px !important;
  min-width: 0px !important;
  padding: 0px !important;
  margin-top: 2px !important;
}
</style>
