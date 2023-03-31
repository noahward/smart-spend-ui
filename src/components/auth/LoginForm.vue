<script setup lang="ts">
import { Form } from 'vee-validate'
import { object, string } from 'yup'
import ValidatedInputField from '@/components/shared/ValidatedInputField.vue'

import google from '@/assets/images/svgs/google-icon.svg'

const userSchema = object({
  email: string().required('Email is required').email('Enter a valid email address'),
  password: string().required('Password is required')
})

function onSubmit (values: object) {
  console.log('Login Info:', values)
}
</script>

<template>
  <Form
    class="mt-3"
    :validation-schema="userSchema"
    @submit="onSubmit"
  >
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">
      Email
    </v-label>
    <ValidatedInputField
      name="email"
      kind="email"
    />
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">
      Password
    </v-label>
    <ValidatedInputField
      name="password"
      kind="password"
    />
    <div class="mt-n4 mb-6">
      <RouterLink
        to=""
        class="text-primary text-decoration-none text-13 opacity-1 font-weight-medium"
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
  <div class="d-flex mt-3">
    <v-btn
      variant="outlined"
      size="large"
      class="border"
      block
    >
      <img
        :src="google"
        height="16"
        class="mr-2"
        alt="google"
      >
      <span class="d-sm-flex d-none ml-2 text-subtitle-1">Sign in with Google</span>
    </v-btn>
  </div>
</template>
