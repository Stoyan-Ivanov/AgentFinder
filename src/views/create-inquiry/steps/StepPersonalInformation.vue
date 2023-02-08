<script setup lang="ts">
import { computed, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers, sameAs } from "@vuelidate/validators";
import InputField from "@/components/kit/InputField.vue";
import PrimaryButton from "@/components/kit/PrimaryButton.vue";
import { useNewInquiryStore } from "@/stores/newInquiry";
import { useCreateInquiryStepManager } from "@/composables/useCreateInquiryStepManager";
import CountriesComboBox from "@/components/CountriesCombobox.vue";
import { useCountriesStore } from "@/stores/countries";

/**
 * 🗃 Local storage for handling a new inquiry
 */
const newInquiryStore = useNewInquiryStore();

/**
 * 🗃 Local storage for handling countries
 */
const countriesStore = useCountriesStore();

/**
 * 📦 Holds all the parameters related to the page form
 */
const state = reactive({
  name: newInquiryStore.inquiryBuilder.name,
  email: newInquiryStore.inquiryBuilder.email,
  country: newInquiryStore.inquiryBuilder.country
    ? newInquiryStore.inquiryBuilder.country.name
    : "",
  city: newInquiryStore.inquiryBuilder.city,
});

/**
 * 👮‍♂️ Validation rules for the form fields
 */
const rules = {
  name: { required },
  email: { required, email },
  country: {
    required,
    matches: helpers.withMessage(
      "This field must match one of the provided options",
      sameAs(
        computed(() => {
          return [...countriesStore.countriesAsMap.keys()].find(
            (countryName: string) =>
              countryName.toLowerCase() == state.country.toLowerCase()
          );
        })
      )
    ),
  },
  city: { required },
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
  newInquiryStore.inquiryBuilder.addName(state.name);
  newInquiryStore.inquiryBuilder.addEmail(state.email);
  newInquiryStore.inquiryBuilder.addCountry(state.country);
  newInquiryStore.inquiryBuilder.addCity(state.city);

  useCreateInquiryStepManager().nextStep();
}
</script>

<template>
  <h1 class="text-xl lg:text-2xl font-semibold">Contact Information</h1>

  <p class="mt-1 text-base text-paragraph">
    How can our partnering agents reach out to you?
  </p>

  <form class="mt-3" @submit.prevent="handleSubmit()">
    <InputField
      ref="name"
      class="w-full"
      placeholder="Enter your full name"
      name="name"
      type="text"
      :label="'Name'"
      v-model.trim="state.name"
      :error="v$.name?.$errors[0]?.$message"
    />

    <InputField
      class="w-full"
      placeholder="Enter your email"
      name="email"
      type="text"
      label="Email"
      v-model.trim="state.email"
      :error="v$.email?.$errors[0]?.$message"
    />

    <CountriesComboBox
      class="w-full"
      :showLabel="true"
      v-model="state.country"
      :options="countriesStore.countriesAsMap"
      :error="v$.country?.$errors[0]?.$message"
    />

    <InputField
      class="w-full"
      placeholder="Enter your city"
      name="city"
      type="text"
      label="City"
      v-model.trim="state.city"
      :error="v$.city?.$errors[0]?.$message"
    />

    <PrimaryButton type="submit" class="mt-10 w-full">Next</PrimaryButton>
  </form>
</template>
