<script setup lang="ts">
import Logo from '@/layouts/full/logo/Logo.vue'
</script>

<template>
  <v-app-bar
    height="80"
    flat
  >
    <v-container class="max-width-override py-sm-4 py-0">
      <v-toolbar class="d-flex align-center bg-surface">
        <Logo
          inline
          class="mt-1"
        />
        <v-spacer />
        <div>
          <v-btn
            class="text-textPrimary"
            to="/login"
          >
            Sign In
          </v-btn>
          <v-btn
            class="bg-primary ml-2"
            to="/register"
          >
            Register
          </v-btn>
        </div>
      </v-toolbar>
    </v-container>
  </v-app-bar>
</template>
