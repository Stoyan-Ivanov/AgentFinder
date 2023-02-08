<script setup lang="ts">
import { useCreateInquiryStepManager } from "@/composables/useCreateInquiryStepManager";

/**
 * 📦 Step manager that controls the currently shown page and progress during the process
 */
const stepManager = useCreateInquiryStepManager();
</script>

<template>
  <container class="container h-full">
    <img
      class="absolute h-full w-full contrast-50"
      src="@/assets/images/dutch-city.jpeg"
      alt="dutch city"
      style="object-fit: cover"
    />

    <div
      class="relative flex h-full w-full flex-row items-center justify-center"
    >
      <div
        class="flex w-5/6 flex-col rounded-lg bg-white px-5 pt-8 pb-6 text-center shadow-2xl lg:w-5/12 md:px-10"
      >
        <div class="flex flex-row justify-center">
          <div class="flex w-1/2 flex-row space-x-2">
            <span
              v-for="i in stepManager.stepperProgress.value.completed"
              :key="i"
              class="h-1.5 w-full rounded-lg border border-primary bg-primary"
            />

            <span
              v-for="i in stepManager.stepperProgress.value.pending"
              :key="i"
              class="border-gray-4s00 h-1.5 w-full rounded-lg border"
            />
          </div>
        </div>

        <div v-if="$route.path !== '/new/success'" class="mt-5">
          <button
            class="flex flex-row items-center text-paragraph hover:text-primary"
            @click="stepManager.previousStep()"
          >
            <ChevronLeftIcon class="w-4" />
            <span class="ml-1">Back</span>
          </button>
        </div>

        <div class="mt-4 text-start">
          <router-view />
        </div>
      </div>
    </div>
  </container>
</template>
