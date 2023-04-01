<template>
  <div class="d-flex justify-center align-center text-center h-100">
    <div>
      <img
        src="@/assets/images/backgrounds/error-bg.svg"
        width="500"
        alt="404"
        class="mt-12"
      >
      <h1 class="text-h1 mt-3">
        Oops!
      </h1>
      <h4 class="text-h4 my-8">
        The page you are looking does not exist.
      </h4>
      <v-btn
        flat
        color="primary"
        class="mb-4"
        to="/login"
      >
        Go home
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
