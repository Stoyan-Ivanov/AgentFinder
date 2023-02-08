import { computed, ref, type ComputedRef, type Ref } from "vue";
import { defineStore } from "pinia";
import { InquiryBuilder } from "@/models/inquiry";
import { useCountriesStore } from "@/stores/countries";
import type { Country } from "@/models/country";
import { useInquiriesStore } from "./inquiries";

export const useNewInquiryStore = defineStore(
  "newInquiry",
  () => {
    /**
     * 📦 The inquiry step-by-step builder
     */
    const inquiryBuilder: Ref<InquiryBuilder> = ref(new InquiryBuilder());

    /**
     * 🗃 The countries store
     */
    const countriesStore = useCountriesStore();

    /**
     * 🏗 
     */
    const currencySymbol: ComputedRef<string> = computed(() => {
      const country = countriesStore.countries?.find(
        (country: Country) => country.name == inquiryBuilder.value.country?.name
      );
      return country ? country.currencySymbol : "$";
    });

    /**
     * 💾 Builds and saves the new inquiry to the local state
     */
    function saveInquiry() {
      const store = useInquiriesStore();
      store.inquiries.push(inquiryBuilder.value.build());

      console.log("<====== Form Submission ======>");
      console.log(JSON.stringify(inquiryBuilder.value.build()));
      console.log("<============ End ============>");

      inquiryBuilder.value.reset();
    }

    return { inquiryBuilder, currencySymbol, saveInquiry };
  },
  { persist: true }
);
