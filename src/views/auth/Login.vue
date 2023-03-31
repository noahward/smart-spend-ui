<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue'
</script>

<template>
  <div class="pa-3">
    <v-row class="h-100vh mh-100 auth">
      <v-col
        cols="12"
        lg="7"
        xl="8"
        class="d-lg-flex align-center justify-center authentication position-relative"
      >
        <div class="">
          <img
            src="@/assets/images/backgrounds/login-bg.svg"
            class="position-relative d-none d-lg-flex"
            alt="login-background"
          >
        </div>
      </v-col>
      <v-col
        cols="12"
        lg="5"
        xl="4"
        class="d-flex align-center justify-center"
      >
        <div class="mt-xl-0 mt-5 mw-100">
          <h2 class="text-h3 font-weight-bold mb-5">
            Welcome to SmartSpend
          </h2>
          <LoginForm />
          <div class="d-flex justify-center">
            <div class="text-body-1 d-flex align-center mt-4 font-weight-medium">
              Don't have an account?
              <v-btn
                class="pl-0 text-primary text-body-1 opacity-1 pl-2 font-weight-medium"
                height="auto"
                to=""
                variant="plain"
              >
                Sign up
              </v-btn>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
