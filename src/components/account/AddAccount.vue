<script setup lang="ts">
import ValidatedInputField from '../shared/ValidatedInputField.vue'
import ValidatedSelectField from '../shared/ValidatedSelectField.vue'

defineEmits(['inFocus', 'closeDialog'])
</script>

<template>
  <div class="flex-column">
    <div class="my-2">
      <ValidatedInputField
        name="name"
        kind="text"
        label="Name"
      />
    </div>
    <div class="my-2">
      <ValidatedSelectField
        name="kind"
        label="Type"
      />
    </div>
    <div class="my-2">
      <ValidatedInputField
        name="balance"
        kind="text"
        label="Name"
      />
    </div>
    <div class="my-2">
      <v-btn
        color="primary"
        flat
      >
        Submit
      </v-btn>
      <v-btn
        color="surface"
        flat
        class="ml-2"
        @click="$emit('closeDialog')"
      >
        Cancel
      </v-btn>
    </div>
  </div>
</template>
