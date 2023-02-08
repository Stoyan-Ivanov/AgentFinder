<script setup lang="ts">
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minValue } from "@vuelidate/validators";
import InputField from "@/components/kit/InputField.vue";
import PrimaryButton from "@/components/kit/PrimaryButton.vue";
import { useCreateInquiryStepManager } from "@/composables/useCreateInquiryStepManager";
import { useNewInquiryStore } from "@/stores/newInquiry";

/**
 * 🗃 Local storage for handling a new inquiry
 */
const newInquiryStore = useNewInquiryStore();

/**
 * 📦 Holds all the parameters related to the page form
 */
const state = reactive({
  propertyBudget: newInquiryStore.inquiryBuilder.homeBudget,
  currencySymbol: newInquiryStore.currencySymbol,
});

/**
 * 👮‍♂️ Validation rules for the form fields
 */
const rules = {
  propertyBudget: { required, minValue: minValue(1) },
};

/**
 * 📦 Vuevalidate instance used for validating the form fields
 */
const v$ = useVuelidate(rules, state);

/**
 * 📤 Handles submit functionality of the page form
 */
async function handleSubmit() {
  const result = await v$.value.$validate();
  if (!result) {
    return;
  }
  newInquiryStore.inquiryBuilder.addHomeBudget(state.propertyBudget);
  useCreateInquiryStepManager().nextStep();
}
</script>

<template>
  <h1 class="text-xl lg:text-2xl font-semibold">Estimated Budget</h1>

  <p class="mt-1 text-base text-paragraph">What is your home budget?</p>

  <form class="mt-6" @submit.prevent="handleSubmit()">
    <InputField
      class="w-full"
      placeholder="Enter an estimated property budget"
      name="propertyBudget"
      type="number"
      autofocus
      v-model.trim="state.propertyBudget"
      :error="v$.propertyBudget?.$errors[0]?.$message"
    >
      <template #prepend>{{ state.currencySymbol }}</template>
    </InputField>

    <PrimaryButton type="submit" class="mt-10 w-full">Next</PrimaryButton>
  </form>
</template>
