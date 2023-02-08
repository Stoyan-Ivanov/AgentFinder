<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, sameAs } from "@vuelidate/validators";
import { computed, reactive } from "vue";
import router from "@/router";
import { useNewInquiryStore } from "@/stores/newInquiry";
import { useCountriesStore } from "@/stores/countries";
import CountriesComboBox from "@/components/CountriesCombobox.vue";
import PrimaryButton from "@/components/kit/PrimaryButton.vue";

/**
 * 🗻 Mock avatars used to represent the available agents
 */
const agentImageUrls: string[] = [
  "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
];

/**
 * 🗃 Local storage for handling available countries
 */
const countriesStore = useCountriesStore();

/**
 * 🗃 Local storage for handling a new inquiry
 */
const newInquiryStore = useNewInquiryStore();

/**
 * 📦 Holds all the parameters related to the page form
 */
const state = reactive({
  country: newInquiryStore.inquiryBuilder?.country?.name
    ? newInquiryStore.inquiryBuilder.country.name
    : "",
});

/**
 * 👮‍♂️ Validation rules for the form fields
 */
const rules = {
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
  newInquiryStore.inquiryBuilder.addCountry(state.country);
  router.push("/new");
}
</script>

<template>
  <container class="container w-full">
    <img
      class="absolute h-full w-full contrast-50"
      src="@/assets/images/dutch-city.jpeg"
      alt="Dutch city"
      style="object-fit: cover"
    />

    <div class="relative flex h-full w-full flex-row items-center justify-center">
      <div
        class="flex w-5/6 flex-col rounded-lg bg-white px-5 pt-8 pb-6 text-center shadow-2xl md:px-10 lg:w-5/12"
      >
        <h1 class="text-xl lg:text-2xl font-semibold">
          Find real estate brokers in your area
        </h1>

        <p class="text-md lg:text-base text-paragraph">
          Compare quotes before you decide and save up to <b>40%</b>!
        </p>

        <form class="mt-6" @submit.prevent="handleSubmit()">
          <CountriesComboBox
            class="w-full"
            v-model="state.country"
            :options="countriesStore.countriesAsMap"
            :error="v$.country?.$errors[0]?.$message"
          />

          <PrimaryButton class="mt-5 w-full" type="submit">
            Start
          </PrimaryButton>
        </form>

        <div class="mt-6 flex justify-center -space-x-2 overflow-hidden">
          <img
            v-for="url in agentImageUrls"
            :key="url"
            :src="url"
            alt="Agent avatar"
            class="inline-block h-9 w-9 rounded-full ring-2 ring-white"
          />
        </div>

        <div class="mt-2 flex flex-row items-center justify-center">
          <span class="relative flex h-2 w-2">
            <span
              class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"
            />
            <span
              class="relative inline-flex h-2 w-2 rounded-full bg-green-500"
            />
          </span>
          <span class="ml-1.5 text-sm text-slate-500">
            Connect with {{ state.country.length }}+ agents in your country
          </span>
        </div>
      </div>
    </div>
  </container>
</template>
