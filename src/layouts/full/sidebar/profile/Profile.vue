<script setup lang="ts">
import { PowerIcon } from 'vue-tabler-icons'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <v-sheet
    rounded="md"
    color="lightsecondary"
    class="px-4 py-3 extra-box"
  >
    <div class="d-flex align-center hide-menu">
      <!-- TODO: Replace this with store value -->
      <v-avatar size="40">
        <img
          src="@/assets/images/placeholders/user-1.jpg"
          alt="user"
          height="40"
        >
      </v-avatar>
      <h4
        v-if="authStore.isAuthenticated"
        class="text-h6 ml-4 textPrimary"
      >
        {{ authStore.user.profile.firstName }}
      </h4>
      <div class="ml-auto">
        <v-btn
          variant="text"
          icon
          rounded="md"
          color="primary"
          @click="authStore.logout()"
        >
          <PowerIcon />
          <v-tooltip
            activator="parent"
            location="top"
          >
            Sign out
          </v-tooltip>
        </v-btn>
      </div>
    </div>
  </v-sheet>
</template>

<style scoped lang="scss">
.extra-box {
  position: relative;
  overflow: hidden;
}
.line-height-none {
  line-height: normal;
}
</style>
