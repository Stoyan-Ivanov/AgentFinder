import { computed, markRaw, ref, type ComputedRef, type Ref } from "vue";
import { defineStore } from "pinia";
import {
  BuyInquiry,
  Inquiry,
  InquiryBuilder,
  InquiryType,
  RentInquiry,
  SellInquiry,
} from "@/models/inquiry";
import { useCountriesStore } from "./countries";
import type PopularCountry from "@/models/popularCountry";
import type Pair from "@/models/pair";

export const useInquiriesStore = defineStore(
  "inquiries",
  () => {
    /**
     * 📦 The locally stored inquiries (local storage)
     */
    const inquiries: Ref<Inquiry[]> = markRaw(ref([]));

    /**
     * 🏗 Calculates the number of inquiries that have opted-in for financial information
     */
    const optedForFinancingCount: ComputedRef<number> = computed(() => {
      return inquiries.value.filter(
        (inquiry: Inquiry) =>
          inquiry.type === InquiryType.BUY &&
          (inquiry as BuyInquiry).financingAdvisory
      ).length;
    });

    /**
     * 🏗 Calculates the inquiries per inquiry type
     */
    const inquiriesPerType: ComputedRef<Map<InquiryType, number>> = computed(
      () => {
        const result: Map<InquiryType, number> = new Map<InquiryType, number>();

        for (const inquiryType of inquiries.value.map(
          (inquiry: Inquiry) => inquiry.type
        )) {
          const currentValue = result.get(inquiryType);
          result.set(inquiryType, currentValue ? currentValue + 1 : 1);
        }
        return result;
      }
    );

    /**
     * 🏗 Calculates the inquiry average price based on their type
     */
    const averagePricePerType: ComputedRef<Map<InquiryType, number>> = computed(
      () => {
        const builder: Map<InquiryType, Pair<number, number>> = new Map<
          InquiryType,
          Pair<number, number>
        >();

        // Iterate over all inquiries and create a data structure to calculate the average ({ "BUY" : { occurrences: 2; budgetSum: 12340 } })
        for (const inquiry of inquiries.value) {
          const currentValue = builder.get(inquiry.type);

          if (
            inquiry.type === InquiryType.BUY ||
            inquiry.type === InquiryType.RENT
          ) {
            if (!currentValue) {
              builder.set(inquiry.type, {
                first: 1,
                second: (inquiry as RentInquiry).homeBudget,
              });
              continue;
            }
            builder.set(inquiry.type, {
              first: currentValue.first + 1,
              second: currentValue.second + (inquiry as RentInquiry).homeBudget,
            });
            continue;
          }

          if (inquiry.type === InquiryType.SELL) {
            if (!currentValue) {
              builder.set(inquiry.type, {
                first: 1,
                second: (inquiry as SellInquiry).homeValue,
              });
              continue;
            }
            builder.set(inquiry.type, {
              first: currentValue.first + 1,
              second: currentValue.second + (inquiry as SellInquiry).homeValue,
            });
          }
        }

        // TODO: Add currency conversion to EUR/USD, etc. as now it is averaged no matter the currency
        return new Map<InquiryType, number>(
          Array.from(builder, ([inquiryType, values]) => [
            inquiryType,
            values.second / values.first,
          ])
        );
      }
    );

    /**
     * 🏗 Finds the top 3 countries based on the number of inquiries
     */
    const topThreeCountries: ComputedRef<(PopularCountry | null)[]> = computed(
      () => {
        const counter: Map<string, number> = new Map<string, number>();

        // Map all countries with their respective occurrence
        for (const item of inquiries.value.map(
          (inquiry: Inquiry) => inquiry.country.name
        )) {
          const currentValue = counter.get(item);
          counter.set(item, currentValue ? currentValue + 1 : 1);
        }

        // Sort them in descending order
        const sorted = [...counter.entries()].sort((a, b) => b[1] - a[1]);

        // Convert them to the required data format
        const countriesStore = useCountriesStore();

        return sorted.slice(0, 3).map(([country, count]) => {
          if (countriesStore.countriesAsMap.has(country)) {
            return {
              country: countriesStore.countriesAsMap.get(country)!,
              occurrenceCount: count,
            };
          }
          return null;
        });
      }
    );

    /**
     * 🔨 Adds a new inquiry to the state
     * @param inquiry - new Inquiry model that should be added
     */
    function addInquiry(inquiry: Inquiry) {
      inquiries.value.push(inquiry);
    }

    /**
     * 🔨 Removes an inquiry from the state by index
     * @param index - index of the inquiry that should be deleted
     */
    function deleteInquiry(index: number) {
      inquiries.value.splice(index, 1);
    }

    /**
     * 🔨 Removes all the currently available inquiries in the state
     */
    function deleteAllInquiries() {
      inquiries.value = [];
    }

    return {
      inquiries,
      topThreeCountries,
      inquiriesPerType,
      averagePricePerType,
      optedForFinancingCount,
      addInquiry,
      deleteInquiry,
      deleteAllInquiries,
    };
  },
  { persist: true }
);

/**
 * 🤡 Generates inquiry mock data and prefills the local storage
 */
export function addMockInquiries() {
  const inquiriesStore = useInquiriesStore();

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  function generateGuid() {
    return Math.random().toString(10).substring(3, 8);
  }

  const cities = ["Amsterdam", "Berlin", "Sofia", "Athens", "London"];
  const countries = [
    "Netherlands",
    "Germany",
    "Bulgaria",
    "Greece",
    "United Kingdom",
  ];

  for (let i = 0; i < 1; i++) {
    let builder = new InquiryBuilder();
    let guid = generateGuid();
    builder
      .addCountry(countries[getRandomInt(countries.length)])
      .addInquiryType(InquiryType.BUY)
      .addHomeBudget(getRandomInt(100000))
      .addEmail(`test+${guid}@email.com`)
      .addName(`Tester ${guid}`)
      .addCity(cities[getRandomInt(cities.length)])
      .addFinancingAdvisory(true);
    inquiriesStore.addInquiry(builder.build());

    builder.reset();
    guid = generateGuid();
    builder
      .addCountry(countries[getRandomInt(countries.length)])
      .addInquiryType(InquiryType.RENT)
      .addHomeBudget(getRandomInt(10000))
      .addEmail(`test+${guid}@email.com`)
      .addName(`Tester ${guid}`)
      .addCity(cities[getRandomInt(cities.length)]);
    inquiriesStore.addInquiry(builder.build());

    builder.reset();
    guid = generateGuid();
    builder
      .addCountry(countries[getRandomInt(countries.length)])
      .addInquiryType(InquiryType.SELL)
      .addHomeValue(getRandomInt(10000))
      .addEmail(`test+${guid}@email.com`)
      .addName(`Tester ${guid}`)
      .addCity(cities[getRandomInt(cities.length)]);
    inquiriesStore.addInquiry(builder.build());
  }
}
