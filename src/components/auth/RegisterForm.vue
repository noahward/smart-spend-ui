<script setup lang="ts">
import { ref } from 'vue'
import { Form } from 'vee-validate'
import { camelizeKeys } from 'humps'
import { object, string } from 'yup'
import { useAuthStore } from '@/stores/auth'
import ValidatedInputField from '@/components/shared/validators/ValidatedInputField.vue'
import type { UserAPIErrors } from '@/types/user'

import google from '@/assets/images/svgs/google-icon.svg'

const userSchema = object({
  email: string().required('Email is required').email('Enter a valid email address'),
  firstName: string().required('First name is required'),
  lastName: string().required('Last name is required'),
  password: string().required('Password is required')
})

const authStore = useAuthStore()
const registerErrors = ref<UserAPIErrors>()

function onSubmit (values: object) {
  authStore.register(values)
    .catch((error) => {
      registerErrors.value = camelizeKeys(error.response.data)
    })
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
      :errors="registerErrors?.email"
    />
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">
      First Name
    </v-label>
    <ValidatedInputField
      name="firstName"
      kind="text"
      :errors="registerErrors?.firstName"
    />
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">
      Last Name
    </v-label>
    <ValidatedInputField
      name="lastName"
      kind="text"
      :errors="registerErrors?.lastName"
    />
    <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">
      Password
    </v-label>
    <ValidatedInputField
      name="password"
      kind="password"
      :errors="registerErrors?.nonFieldErrors"
    />
    <v-btn
      size="large"
      color="primary"
      block
      type="submit"
      flat
      class="mt-2"
    >
      Sign Up
    </v-btn>
  </Form>
  <div class="d-flex align-center text-center my-5">
    <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
      <span class="bg-surface px-5 position-relative text-14">or</span>
    </div>
  </div>
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
      <span class="ml-2 text-subtitle-1">Continue with Google</span>
    </v-btn>
  </div>
</template>
