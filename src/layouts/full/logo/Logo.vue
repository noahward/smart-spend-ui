<script setup lang="ts">
import { useTheme } from 'vuetify'
import LogoDark from './LogoDark.vue'
import LogoLight from './LogoLight.vue'
import LogoInlineDark from './LogoInlineDark.vue'
import LogoInlineLight from './LogoInlineLight.vue'

type PropTypes = { inline?: boolean; }
const props = withDefaults(defineProps<PropTypes>(), { inline: false })
const theme = useTheme()
</script>

<template>
  <div class="logo">
    <RouterLink to="/">
      <div v-if="props.inline">
        <LogoInlineLight v-if="theme.global.current.value.dark" />
        <LogoInlineDark v-else />
      </div>
      <div v-else>
        <LogoLight v-if="theme.global.current.value.dark" />
        <LogoDark v-else />
      </div>
    </RouterLink>
  </div>
</template>
