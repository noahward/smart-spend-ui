<script setup lang="ts">
</script>

<template>
  <div class="d-flex flex-column">
    <v-card
      v-ripple.center
      flat
      class="upload-card"
    >
      <span class="text-h5 font-weight-bold">OFX</span>
      <span class="text-13 mt-2">
        The best and most accurate way to import transactions.
      </span>
    </v-card>
    <div class="d-flex align-center text-center">
      <div class="w-100 font-weight-regular auth-divider position-relative">
        <span class="bg-surface px-5 position-relative text-13">or</span>
      </div>
    </div>
    <v-card
      v-ripple.center
      flat
      class="upload-card"
    >
      <span class="text-h5 font-weight-bold">CSV</span>
      <span class="text-13 mt-2">
        This guy still does the trick, though.
      </span>
    </v-card>
  </div>
</template>
