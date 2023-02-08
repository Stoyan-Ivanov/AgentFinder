<script setup lang="ts">
import { ref, type Ref } from "vue";
import { InquiryType } from "@/models/inquiry";
import VerticalRadioGroup from "@/components/kit/VerticalRadioGroup.vue";
import PrimaryButton from "@/components/kit/PrimaryButton.vue";
import { useNewInquiryStore } from "@/stores/newInquiry";
import { useCreateInquiryStepManager } from "@/composables/useCreateInquiryStepManager";

/**
 * 🗃 Local storage for handling a new inquiry
 */
const newInquiryStore = useNewInquiryStore();

/**
 * 📦 The possible inquiry types
 */
const inquiryTypes: Map<string, string> = new Map([
  [InquiryType.RENT, "I want to rent a property"],
  [InquiryType.BUY, "I want to buy a property"],
  [InquiryType.SELL, "I want to sell a property"],
]);

/**
 * 📦 The currently selected inquiry type
 */
let selectedInquiryType: Ref<InquiryType> = ref(
  newInquiryStore.inquiryBuilder.type
);

/**
 * 📤 Handles the form submission
 */
function handleSubmit() {
  const store = useNewInquiryStore();
  store.inquiryBuilder.addInquiryType(selectedInquiryType.value);
  useCreateInquiryStepManager().nextStep();
}
</script>

<template>
  <h1 class="text-xl lg:text-2xl font-semibold">Select Service</h1>

  <p class="mt-1 text-base text-paragraph">
    How can our partnering agents help you?
  </p>

  <VerticalRadioGroup
    class="mt-6"
    v-model="selectedInquiryType"
    :options="inquiryTypes"
  />

  <PrimaryButton class="mt-10 w-full" @click="handleSubmit">
    Next
  </PrimaryButton>
</template>
