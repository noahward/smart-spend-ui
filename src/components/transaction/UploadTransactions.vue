<script setup lang="ts">
import { ref, computed } from 'vue'
import { ExclamationCircleIcon, HelpIcon } from 'vue-tabler-icons'
import { useAccountStore } from '@/stores/account'
import PreviewTable from '@/components/transaction/PreviewTable.vue'
import type { AccountTransactionsPreview } from '@/types/file-preview'

type PropTypes = {
  previewData: AccountTransactionsPreview[],
  accountName?: string
}

type AccountMapData = {
  targetAccountId: number,
  exchangeDate: 'today' | 'transaction'
}

type AccountMap = {
  [key: string]: AccountMapData
}

const emit = defineEmits(['closeDialog', 'submitMap'])

const props = defineProps<PropTypes>()
const { accountSelectOptions, accounts } = useAccountStore()

const step = ref(0)
const accountMap = ref<AccountMap>({})
const accountError = ref<string | null>()
const selectedAccount = ref<string | null>(props.accountName || null)
const handleExchangeRate = ref<'today' | 'transaction'>('today')

const forexNeeded = computed(() => {
  const currencyArr: string[] = []

  props.previewData[step.value].transactions.forEach((transaction) => {
    if (!currencyArr.includes(transaction.currencyCode)) {
      currencyArr.push(transaction.currencyCode)
    }
  })

  const targetAcc = accounts.find(acc => acc.name === selectedAccount.value)
  if (!targetAcc) {
    return true
  }

  if (currencyArr.length === 1) {
    if (currencyArr[0].toUpperCase() === targetAcc.currencyCode.toUpperCase()) {
      return false
    }
  }
  return true
})

const isMultistep = computed(() => {
  return props.previewData.length > 1
})

const fileAccountKind = computed(() => {
  return props.previewData[step.value].kind || 'UNKNOWN'
})

function nextStep () {
  if (selectedAccount.value === null) {
    accountError.value = 'Select the destination account'
    return
  }

  const targetAcc = accounts.find(acc => acc.name === selectedAccount.value)
  if (!targetAcc) {
    return
  }

  accountMap.value[props.previewData[step.value].id] = {
    targetAccountId: targetAcc.id,
    exchangeDate: handleExchangeRate.value
  }

  accountError.value = null
  selectedAccount.value = null
  handleExchangeRate.value = 'today'
  step.value += 1
}

function previousStep () {
  step.value -= 1
  const targetAcc = accounts.find(acc => acc.id === accountMap.value[props.previewData[step.value].id].targetAccountId)
  selectedAccount.value = targetAcc ? targetAcc.name : null
  handleExchangeRate.value = accountMap.value[props.previewData[step.value].id].exchangeDate
  accountError.value = null
}

function onSubmit () {
  if (selectedAccount.value === null) {
    accountError.value = 'Select the destination account'
    return
  }

  const targetAcc = accounts.find(acc => acc.name === selectedAccount.value)
  if (!targetAcc) {
    return
  }

  accountMap.value[props.previewData[step.value].id] = {
    targetAccountId: targetAcc.id,
    exchangeDate: handleExchangeRate.value
  }
  accountError.value = null
  selectedAccount.value = null
  handleExchangeRate.value = 'today'
  emit('submitMap', accountMap.value)
}
</script>

<template>
  <div class="flex-column">
    <span
      v-if="isMultistep"
      class="text-13 d-block mb-4"
    >
      It looks like your file contains transactions from multiple accounts. Let's step through them one at a time.
    </span>

    <span class="text-13 mb-2 d-block text-textMedium">
      {{ previewData[step].transactions.length }} transactions will be imported from
      <b>{{ fileAccountKind }}</b>
      into:
    </span>

    <div>
      <v-select
        v-model="selectedAccount"
        name="account"
        label="Account"
        :items="accountSelectOptions"
      />
      <div
        v-if="accountError"
        class="d-flex align-center text-error mt-n4 mb-4"
      >
        <exclamation-circle-icon
          size="16"
          class="mr-1"
        />
        <span class="text-caption">{{ accountError }}</span>
      </div>
    </div>

    <div v-if="forexNeeded">
      <div class="d-flex align-center exch-container">
        <span class="text-13 text-textMedium text-weight-bold mr-2">What date would you like to use for exchange rates?</span>
        <v-btn flat>
          <help-icon
            size="16"
            class="text-primary pointer"
          />
          <v-tooltip
            max-width="300"
            activator="parent"
            location="top"
          >
            The transaction currencies contained in your uploaded file do not
            match the selected account's base currency. Transactions will be
            exchanged to the selected account's base currency.
          </v-tooltip>
        </v-btn>
      </div>
      <v-radio-group
        v-model="handleExchangeRate"
        class="text-textPrimary"
      >
        <v-radio
          label="Today's date"
          value="today"
          color="primary"
        />
        <v-radio
          label="Transaction date"
          value="transaction"
          color="primary"
          class="my-n2"
        />
      </v-radio-group>
    </div>

    <div class="my-2">
      <v-card
        variant="outlined"
        class="mb-4"
      >
        <v-card-text>
          <PreviewTable :preview-data="previewData[step]" />
        </v-card-text>
      </v-card>
      <v-btn
        v-if="isMultistep && step !== previewData.length - 1"
        flat
        color="primary"
        @click="nextStep"
      >
        Next
      </v-btn>
      <v-btn
        v-else
        flat
        type="submit"
        color="primary"
        @click="onSubmit"
      >
        Upload
      </v-btn>
      <v-btn
        v-if="isMultistep && step > 0"
        flat
        class="ml-4"
        @click="previousStep"
      >
        Back
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

<style scoped lang="scss">
.exch-container > .v-btn {
  border-radius: 25px !important;
  height: 16px !important;
  min-width: 0px !important;
  padding: 0px !important
}
</style>
