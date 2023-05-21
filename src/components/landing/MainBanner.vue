<script setup lang="ts">
import { LockIcon, PigMoneyIcon, DeviceMobileIcon } from 'vue-tabler-icons'

const cardData = [
  {
    title: 'Data Security',
    subtitle: 'Rest easy knowing that my buddy Kevin is making sure your data is impenetrable.',
    icon: LockIcon
  },
  {
    title: 'Simple Saving',
    subtitle: 'Get personalized recommendations, track your progress, and watch your savings grow.',
    icon: PigMoneyIcon
  },
  {
    title: 'Conventient Budgeting',
    subtitle: 'Get insights and stay on top of your finances, no matter where you are.',
    icon: DeviceMobileIcon
  }
]
</script>

<template>
  <v-container class="h-100 d-flex align-center flex-column pt-lg-16">
    <v-row class="justify-center w-100 pt-lg-10">
      <v-col
        cols="12"
        md="5"
        class="d-flex align-center justify-sm-center"
      >
        <div class="mt-8 mt-lg-0 mobile-padding">
          <h1
            class="banner-title pt-5 font-weight-bold mobile-center text-textPrimary"
            data-aos="fade-up"
            data-aos-duration="500"
          >
            Your dad's favourite budgeting app
          </h1>
          <p
            class="pt-8 pb-6 text-h5 font-weight-regular text-textMedium mobile-center"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            Say goodbye to financial stress with our intelligent budgeting tool.
          </p>
          <div
            class="mt-6 d-sm-flex mobile-center"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <v-btn
              to="/register"
              color="primary"
              size="large"
              class="m-btn-full btn-custom-lg pointer"
              flat
            >
              Register for Free
            </v-btn>
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        md="7"
        class="landing-img pa-8 d-flex align-center"
      >
        <img
          src="@/assets/images/backgrounds/landing-bg.svg"
          alt="landing-background"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
      </v-col>
    </v-row>
    <v-row class="w-100 px-lg-10">
      <v-col
        v-for="card, i in cardData"
        :key="i"
        cols="12"
        md="4"
        class="pt-lg10 pb-n10"
        data-aos="fade-up"
        :data-aos-duration="1000 + (i * 1000)"
      >
        <div>
          <v-card-title>
            <component
              :is="card.icon"
              size="40"
              stroke-width="1.5"
              class="text-textPrimary"
            />
          </v-card-title>
          <v-card-title class="text-h5 text-weight-bold text-textPrimary">
            {{ card.title }}
          </v-card-title>
          <v-card-text class="text-subtitle-1 text-textMedium">
            {{ card.subtitle }}
          </v-card-text>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
