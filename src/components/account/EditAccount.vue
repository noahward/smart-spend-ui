<script setup lang="ts">
import { ref } from 'vue'
import { Form } from 'vee-validate'
import { camelizeKeys } from 'humps'
import { object, string, number, mixed } from 'yup'
import { getSubmitFn } from '@/helpers/validationHelper'
import { useAccountStore } from '@/stores/account'
import { useTransactionStore } from '@/stores/transaction'
import ValidatedInputField from '@/components/shared/validators/ValidatedInputField.vue'
import ValidatedSelectField from '@/components/shared/validators/ValidatedSelectField.vue'
import type { Account, AccountAPIErrors } from '@/types/account'

type PropTypes = {
  initialValues: Account
}

const props = defineProps<PropTypes>()

const emit = defineEmits(['closeDialog'])

const accountSchema = object({
  name: string(),
  kind: mixed(),
  balance: number()
})

const accountOptions = [
  { title: 'Spending', value: 'spending' },
  { title: 'Saving', value: 'saving' }
]

const accountStore = useAccountStore()
const transactionStore = useTransactionStore()

const updateErrors = ref<AccountAPIErrors>({})

const onSubmit = getSubmitFn(accountSchema, (values: any) => {
  if (props.initialValues.balance !== Number(values.balance)) {
    const transaction = {
      date: new Date().toISOString().slice(0, 10),
      description: 'Manual Balance Update',
      amount: values.balance - props.initialValues.balance,
      account: values.id
    }
    transactionStore.addSingleTransaction(transaction)
      .catch((error) => {
        updateErrors.value = camelizeKeys(error.response.data)
      })
  }
  accountStore.updateAccount(values)
    .then(() => {
      emit('closeDialog')
    })
    .catch((error) => {
      updateErrors.value = camelizeKeys(error.response.data)
    })
})
</script>

<template>
  <div class="flex-column">
    <Form
      :validation-schema="accountSchema"
      :initial-values="initialValues"
      @submit="onSubmit"
    >
      <div class="my-2">
        <ValidatedInputField
          name="name"
          kind="text"
          label="Name"
          :errors="updateErrors?.name"
        />
      </div>
      <div class="my-2">
        <ValidatedSelectField
          name="kind"
          label="Type"
          :options="accountOptions"
          :errors="updateErrors?.kind"
        />
      </div>
      <div class="my-2">
        <ValidatedInputField
          disable
          name="balance"
          kind="number"
          label="Balance"
          :errors="updateErrors?.balance"
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
