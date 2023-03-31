<script setup lang="ts">
import { ref } from 'vue'
import { Form } from 'vee-validate'
import { object, string } from 'yup'

import google from '@/assets/images/svgs/google-icon.svg'
import facebook from '@/assets/images/svgs/facebook-icon.svg'

const userSchema = object({
  email: string().required('Email is required').email('Enter a valid email address'),
  password: string().required('Password is required')
})

const rememberMe = ref(false)
const email = ref('info@wrappixel.com')
const password = ref('admin123')

function onSubmit (values: object) {
  console.log('Login Info:', values)
}
</script>

<template>
  <v-row class="d-flex mb-3">
    <v-col
      cols="6"
      sm="6"
      class="pr-2"
    >
      <v-btn
        variant="outlined"
        size="large"
        class="border text-subtitle-1"
        block
      >
        <span class="d-sm-flex d-none mr-2">Continue with</span>
        <img
          :src="google"
          height="16"
          class="mr-2"
          alt="google"
        >
      </v-btn>
    </v-col>
    <v-col
      cols="6"
      sm="6"
      class="pl-2"
    >
      <v-btn
        variant="outlined"
        size="large"
        class="border text-subtitle-1"
        block
      >
        <span class="d-sm-flex d-none mr-2">Continue with</span>
        <img
          :src="facebook"
          width="25"
          height="25"
          class="mr-1"
          alt="facebook"
        >
      </v-btn>
    </v-col>
  </v-row>
  <div class="d-flex align-center text-center mb-6">
    <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
      <span class="bg-surface px-5 py-3 position-relative">or</span>
    </div>
  </div>
  <Form
    class="mt-5"
    :validation-schema="userSchema"
    @submit="onSubmit"
  >
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">
      Email
    </v-label>
    <VTextField
      v-model="email"
      class="mb-5"
      required
      hide-details="auto"
    />
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">
      Password
    </v-label>
    <VTextField
      v-model="password"
      required
      hide-details="auto"
      type="password"
      class="pwdInput"
    />
    <div class="mt-3 mb-6">
      <RouterLink
        to=""
        class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"
      >
        Forgot password?
      </RouterLink>
    </div>
    <v-btn
      size="large"
      color="primary"
      block
      type="submit"
      flat
    >
      Sign In
    </v-btn>
  </Form>
</template>
