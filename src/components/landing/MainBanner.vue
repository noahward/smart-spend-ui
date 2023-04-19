<script setup lang="ts">
</script>

<template>
  <v-container class="py-16 h-100 d-flex align-center">
    <v-row class="justify-center">
      <v-col
        cols="12"
        md="5"
        class="d-flex align-center justify-center"
      >
        <div class="mt-8 mt-lg-0">
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
        class="landing-img pa-8"
      >
        <img
          src="@/assets/images/backgrounds/landing-bg.svg"
          alt="landing-background"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
      </v-col>
    </v-row>
  </v-container>
</template>
