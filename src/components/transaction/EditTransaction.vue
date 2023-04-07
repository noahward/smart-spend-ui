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

type PropTypes = {
  initialValues: object
}

defineProps<PropTypes>()

const emit = defineEmits(['inFocus', 'closeDialog'])

const transactionSchema = object({
  date: date().typeError('Enter a date for the transaction'),
  description: string(),
  amount: number().typeError('Amount must be a number'),
  categoryName: mixed(),
  accountName: mixed()
})

const transactionStore = useTransactionStore()
const { categorySelectOptions, categories } = useCategoryStore()
const { accountSelectOptions, accounts } = useAccountStore()

const updateErrors = ref<TransactionAPIErrors>({})

const onSubmit = getSubmitFn(transactionSchema, (values: any) => {
  if (values.accountName) {
    const selectedAcc = accounts.find(acc => acc.name === values.accountName)
    if (selectedAcc) {
      delete values.accountName
      values.account = selectedAcc.id
    } else {
      updateErrors.value.account = ['Select an account']
      return
    }
  }

  if (values.categoryName) {
    const selectedCat = categories.find(cat => cat.name === values.categoryName)
    if (selectedCat) {
      delete values.categoryName
      values.category = selectedCat.id
    } else {
      updateErrors.value.account = ['Select a category']
      return
    }
  }

  transactionStore.updateTransaction(values)
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
      :validation-schema="transactionSchema"
      :initial-values="initialValues"
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
          :errors="updateErrors?.description"
        />
      </div>
      <div class="my-2">
        <ValidatedInputField
          name="amount"
          kind="number"
          label="Amount"
          :errors="updateErrors?.amount"
        />
      </div>
      <div class="my-2">
        <ValidatedSelectField
          name="categoryName"
          label="Category"
          :options="categorySelectOptions"
          :errors="updateErrors?.category"
        />
      </div>
      <div class="my-2">
        <ValidatedSelectField
          name="accountName"
          label="Account"
          :options="accountSelectOptions"
          :errors="updateErrors?.account"
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
