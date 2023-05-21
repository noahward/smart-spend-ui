<script setup lang="ts">
import { onMounted } from 'vue'
import Footer from '@/components/landing/Footer.vue'
import Navbar from '@/components/landing/Navbar.vue'
import MainBanner from '@/components/landing/MainBanner.vue'

import 'aos/dist/aos.css'
import AOS from 'aos'

onMounted(() => {
  AOS.init()
})
</script>

<template>
  <div class="h-100 landing-page">
    <Navbar />
    <MainBanner />
    <Footer />
  </div>
</template>
