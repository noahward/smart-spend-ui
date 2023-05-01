<script setup lang="ts">
import { ref } from 'vue'
import { Form } from 'vee-validate'
import { camelizeKeys } from 'humps'
import { object, string, number, date, mixed } from 'yup'
import { getSubmitFn } from '@/helpers/validationHelper'
import { useAccountStore } from '@/stores/account'
import { useCategoryStore } from '@/stores/category'
import { useTransactionStore } from '@/stores/transaction'
import ValidatedInputField from '@/components/shared/validators/ValidatedInputField.vue'
import ValidatedSelectField from '@/components/shared/validators/ValidatedSelectField.vue'
import type { TransactionAPIErrors } from '@/types/transaction'

const emit = defineEmits(['inFocus', 'closeDialog'])

const transactionSchema = object({
  date: date().typeError('Enter a date for the transaction').required('Enter a date for the transaction'),
  description: string().required('Enter a payee description'),
  amount: number().typeError('Amount must be a number').required('Enter an amount for the transaction'),
  category: mixed(),
  account: mixed()
})

const transactionStore = useTransactionStore()
const { categorySelectOptions, categories } = useCategoryStore()
const { accountSelectOptions, accounts } = useAccountStore()

const createErrors = ref<TransactionAPIErrors>({})

const onSubmit = getSubmitFn(transactionSchema, (values: any) => {
  const selectedAcc = accounts.find(acc => acc.name === values.account)
  if (selectedAcc) {
    values.account = selectedAcc.id
  } else {
    createErrors.value.account = ['Select an account']
    return
  }

  const selectedCat = categories.find(cat => cat.name === values.category)
  if (selectedCat) {
    values.category = selectedCat.id
  }

  transactionStore.addSingleTransaction(values)
    .then(() => {
      emit('closeDialog')
    })
    .catch((error) => {
      createErrors.value = camelizeKeys(error.response.data)
    })
})
</script>

<template>
  <div class="flex-column">
    <Form
      :validation-schema="transactionSchema"
      :initial-values="{ date: new Date() }"
      @submit="onSubmit"
    >
      <div class="my-2">
        <ValidatedInputField
          name="date"
          kind="date"
          label="Date"
        />
      </div>
      <div class="my-2">
        <ValidatedInputField
          name="description"
          kind="text"
          label="Description"
          :errors="createErrors?.description"
        />
      </div>
      <div class="my-2">
        <ValidatedInputField
          currency-info
          name="amount"
          kind="number"
          label="Amount"
          :errors="createErrors?.amount"
        />
      </div>
      <div class="my-2">
        <ValidatedSelectField
          name="category"
          label="Category"
          :options="categorySelectOptions"
          :errors="createErrors?.category"
        />
      </div>
      <div class="my-2">
        <ValidatedSelectField
          name="account"
          label="Account"
          :options="accountSelectOptions"
          :errors="createErrors?.account"
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
