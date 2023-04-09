<script setup lang="ts">
import { ref, computed } from 'vue'
import { ExclamationCircleIcon } from 'vue-tabler-icons'
import { useAccountStore } from '@/stores/account'
import PreviewTable from '@/components/shared/PreviewTable.vue'
import type { AccountTransactionsPreview } from '@/types/file-preview'

type PropTypes = { previewData: AccountTransactionsPreview[] }
type AccountMap = {
  [key: string]: number
}

const emit = defineEmits(['closeDialog', 'submitMap'])

const props = defineProps<PropTypes>()
const { accountSelectOptions, accounts } = useAccountStore()

const step = ref(0)
const accountMap = ref<AccountMap>({})
const accountError = ref<string | null>()
const selectedAccount = ref<string | null>(null)

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

  accountMap.value[props.previewData[step.value].id] = targetAcc.id
  accountError.value = null
  selectedAccount.value = null
  step.value += 1
}

function previousStep () {
  step.value -= 1
  const targetAcc = accounts.find(acc => acc.id === accountMap.value[props.previewData[step.value].id])
  selectedAccount.value = targetAcc ? targetAcc.name : null
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

  accountMap.value[props.previewData[step.value].id] = targetAcc.id
  accountError.value = null
  selectedAccount.value = null
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
        color="textMedium"
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
