import { type Ref, ref, type ComputedRef, computed, onMounted } from "vue";
import { defineStore } from "pinia";
import type { Country } from "@/models/country";
import countriesRepository from "@/repositories/countriesRepository";

export const useCountriesStore = defineStore(
  "countries",
  () => {
    /**
     * 📦 The locally stored available countries (local storage)
     */
    const countries: Ref<Country[] | null> = ref(null);

    const countriesAsMap: ComputedRef<Map<string, Country>> = computed(
      () =>
        new Map(
          countries.value?.map((country: Country) => [country.name, country])
        )
    );

    async function fetchCountries() {
      countries.value = await countriesRepository.getCountries();
    }

    onMounted(fetchCountries);

    return { countries, countriesAsMap };
  },
  { persist: true }
);
