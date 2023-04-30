<script setup lang="ts">
import { ref } from 'vue'
import currencies from 'iso4217'
import { Form } from 'vee-validate'
import { camelizeKeys } from 'humps'
import { object, string, number } from 'yup'
import { getSubmitFn } from '@/helpers/validationHelper'
import { useAccountStore } from '@/stores/account'
import ValidatedInputField from '@/components/shared/validators/ValidatedInputField.vue'
import ValidatedSelectField from '@/components/shared/validators/ValidatedSelectField.vue'
import ValidatedAutocompleteField from '@/components/shared/validators/ValidatedAutocompleteField.vue'
import type { AccountAPIErrors } from '@/types/account'

const emit = defineEmits(['inFocus', 'closeDialog'])

const accountSchema = object({
  name: string().required('Add a name for your account'),
  kind: string().required('Select an account type'),
  currencyCode: string().required('Select an account currency'),
  initialBalance: number().typeError('Balance must be a number').required('Enter the account starting balance')
})

const accountStore = useAccountStore()
const createErrors = ref<AccountAPIErrors>({})

const onSubmit = getSubmitFn(accountSchema, (values: any) => {
  if (currencyOptions.indexOf(values.currencyCode) === -1) {
    createErrors.value.currencyCode = ['Invalid currency code']
    return
  }
  accountStore.createAccount(values)
    .then(() => {
      emit('closeDialog')
    })
    .catch((error) => {
      createErrors.value = camelizeKeys(error.response.data)
    })
})

const accountOptions = [
  { title: 'Spending', value: 'spending' },
  { title: 'Saving', value: 'saving' }
]

const currencyOptions = Object.keys(currencies)
  .map(key => currencies[key].Code)
  .filter(code => code && code.length === 3)
  .sort()
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
          :options="accountOptions"
          :errors="createErrors?.kind"
        />
      </div>
      <div class="my-2">
        <ValidatedAutocompleteField
          name="currencyCode"
          label="Currency"
          :options="currencyOptions"
          :errors="createErrors?.currencyCode"
        />
      </div>
      <div class="my-2">
        <ValidatedInputField
          name="initialBalance"
          kind="number"
          label="Initial Balance"
          :errors="createErrors?.initialBalance"
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
