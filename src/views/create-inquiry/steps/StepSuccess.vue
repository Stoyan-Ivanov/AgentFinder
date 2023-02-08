<script setup lang="ts">
import PrimaryButton from "@/components/kit/PrimaryButton.vue";
import { onMounted } from "vue";
import { useNewInquiryStore } from "@/stores/newInquiry";

onMounted(() => {
  useNewInquiryStore().saveInquiry();
})
</script>

<template>
  <h1 class="text-center text-xl lg:text-2xl font-semibold mt-3">
    Successfully Submitted
  </h1>

  <p class="mt-1 text-center text-base text-paragraph">
    Your inquiry has been successfully submitted! Our partnering agents will be
    in touch with you shortly
  </p>

  <div class="flex flex-row justify-center">
    <MailFastIcon class="h-52 w-1/2 text-primary" />
  </div>

  <PrimaryButton class=" w-full" @click="$router.replace('/')">
    Go to home
  </PrimaryButton>
</template>
