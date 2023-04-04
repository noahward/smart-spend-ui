<script setup lang="ts">
import { ref } from 'vue'
import { Form } from 'vee-validate'
import { camelizeKeys } from 'humps'
import { object, string, number } from 'yup'
import { useAccountStore } from '@/stores/account'
import ValidatedInputField from '../shared/ValidatedInputField.vue'
import ValidatedSelectField from '../shared/ValidatedSelectField.vue'
import type { AccountAPIErrors } from '@/types/account'

const emit = defineEmits(['inFocus', 'closeDialog'])

const accountSchema = object({
  name: string().required('Add a name for your account'),
  kind: string().required('Select an account type'),
  balance: number().required('Enter the account starting balance')
})

const accountStore = useAccountStore()
const createErrors = ref<AccountAPIErrors>()

function onSubmit (values: object) {
  accountStore.createAccount(values)
    .then(() => {
      emit('closeDialog')
    })
    .catch((error) => {
      createErrors.value = camelizeKeys(error.response.data)
    })
}
</script>

<template>
  <div class="flex-column">
    <Form
      :validation-schema="accountSchema"
      @submit="onSubmit"
    >
      <div class="my-2">
        <ValidatedInputField
          name="name"
          kind="text"
          label="Name"
          :errors="createErrors?.name"
        />
      </div>
      <div class="my-2">
        <ValidatedSelectField
          name="kind"
          label="Type"
          :errors="createErrors?.kind"
        />
      </div>
      <div class="my-2">
        <ValidatedInputField
          name="balance"
          kind="number"
          label="Initial Balance"
          :errors="createErrors?.balance"
        />
      </div>
      <div class="my-2">
        <v-btn
          flat
          type="submit"
          color="primary"
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
    </Form>
  </div>
</template>
