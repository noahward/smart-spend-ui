<script setup lang="ts">
import { ref } from 'vue'
import { useTransactionStore } from '@/stores/transaction'

const emit = defineEmits(['changeWidth'])

const transactionStore = useTransactionStore()
const selectedFile = ref(null)
const loadingOfx = ref(false)
const loadingCsv = ref(false)

function previewFile (event: any, fileType: string) {
  fileType === 'ofx' ? loadingOfx.value = true : loadingCsv.value = true
  selectedFile.value = event.target.files[0]
  transactionStore.previewTransactionFile(event.target.files[0])
    .then(() => {
      emit('changeWidth', 600)
      loadingOfx.value = false
      loadingCsv.value = false
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<template>
  <div class="d-flex flex-column">
    <label>
      <v-card
        v-ripple.center
        flat
        :disabled="loadingCsv"
        class="upload-card"
      >
        <input
          type="file"
          accept=".ofx"
          hidden
          :disabled="loadingCsv"
          @change="previewFile($event, 'ofx')"
        >
        <v-progress-circular
          v-if="loadingOfx"
          indeterminate
          :size="25"
          :width="3"
          color="primary"
        />
        <div
          v-else
          class="d-flex flex-column"
        >
          <span class="text-h5 font-weight-bold">OFX</span>
          <span class="text-13 mt-2">
            The best and most accurate way to import transactions.
          </span>
        </div>
      </v-card>
    </label>
    <div class="d-flex align-center text-center">
      <div class="w-100 font-weight-regular auth-divider position-relative">
        <span class="bg-surface px-5 position-relative text-13">or</span>
      </div>
    </div>
    <label>
      <v-card
        v-ripple.center
        flat
        disabled
        class="upload-card"
      >
        <input
          type="file"
          accept=".csv"
          hidden
          disabled
          @change="previewFile($event, 'csv')"
        >
        <v-progress-circular
          v-if="loadingCsv"
          indeterminate
          :size="25"
          :width="3"
          color="primary"
        />
        <div
          v-else
          class="d-flex flex-column"
        >
          <span class="text-h5 font-weight-bold">CSV</span>
          <span class="text-13 mt-2">
            This guy still does the trick, though.
          </span>
        </div>
      </v-card>
    </label>
  </div>
</template>
