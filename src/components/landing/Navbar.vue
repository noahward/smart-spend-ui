<script setup lang="ts">
import Logo from '@/layouts/full/logo/Logo.vue'
</script>

<template>
  <div class="lp-wraper">
    <div>
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
                <span>Sign In</span>
              </v-btn>
              <v-btn
                class="bg-primary ml-2 font-weight-bold"
                to="/register"
              >
                <span class="font-weight-bold">Register</span>
              </v-btn>
            </div>
          </v-toolbar>
        </v-container>
      </v-app-bar>
    </div>
  </div>
</template>
