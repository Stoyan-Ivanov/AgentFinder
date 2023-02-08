<script setup lang="ts">
import { ref } from "vue";
import PrimaryButton from "@/components/kit/PrimaryButton.vue";
import { useNewInquiryStore } from "@/stores/newInquiry";
import { useCreateInquiryStepManager } from "@/composables/useCreateInquiryStepManager";
import Checkbox from "@/components/kit/Checkbox.vue";

/**
 * 🚩 Flag for whether the financing information/advisory is enabled
 */
const financingInformationChecked = ref(true);

/**
 * 📤 Handles the form submission
 */
function handleSubmit() {
  const store = useNewInquiryStore();
  store.inquiryBuilder.addFinancingAdvisory(financingInformationChecked.value);
  useCreateInquiryStepManager().nextStep();
}
</script>

<template>
  <h1 class="text-xl lg:text-2xl font-semibold">Financing Information</h1>

  <p class="mt-1 text-base text-paragraph">
    Would you like to receive valuable financing information from our expert
    team?
  </p>

  <Checkbox class="mt-6" v-model="financingInformationChecked">
    <template #label>
      I would like to be contacted with financing information
    </template>
  </Checkbox>

  <PrimaryButton class="mt-10 w-full" @click="handleSubmit">
    Complete
  </PrimaryButton>
</template>
