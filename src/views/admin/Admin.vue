<script setup lang="ts">
import PrimaryButton from "@/components/kit/PrimaryButton.vue";
import InquiriesTable from "@/views/admin/InquiriesTable.vue";
import { useInquiriesStore, addMockInquiries } from "@/stores/inquiries";
import { numberWithCommas } from "@/composables/useCurrencyFormatter";

/**
 * 🗃 Local storage for handling submitted inquiries
 */
const store = useInquiriesStore();
</script>

<template>
  <container class="container h-full w-full">
    <div
      class="flex min-h-screen flex-row justify-center"
      :class="{ 'py-10': store.inquiries.length > 0 }"
    >
      <div
        class="flex w-full flex-col items-center justify-center px-5 md:w-5/6 md:px-0 lg:w-4/5"
      >
        <div class="w-full text-start text-lg font-semibold text-paragraph">
          Welcome back 👋
        </div>
        <div
          class="mt-6 grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-4"
        >
          <div
            class="flex w-full flex-col rounded-lg border border-gray-100 px-6 py-3 shadow-sm lg:shadow-lg"
          >
            <div class="mb-1 flex flex-row items-center">
              <span class="relative flex h-2 w-2">
                <span
                  class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"
                />
                <span
                  class="relative inline-flex h-2 w-2 rounded-full bg-green-500"
                />
              </span>
              <span class="text-md ml-2 font-semibold">Top 3 Countries</span>
            </div>

            <!-- Top Countries-->
            <div
              v-for="index in [0, 1, 2]"
              :key="store.topThreeCountries[index]?.country.name"
              class="mt-2"
            >
              <div
                v-if="store.topThreeCountries[index]"
                class="flex flex-row items-center"
              >
                <img
                  class="h-5 w-6"
                  :src="store.topThreeCountries[index]?.country.flagUrl"
                  :alt="store.topThreeCountries[index]?.country.name"
                />
                <span class="text-md ml-2 font-medium text-gray-600">
                  {{
                    `${store.topThreeCountries[index]?.country.name} (${store.topThreeCountries[index]?.occurrenceCount})`
                  }}
                </span>
              </div>

              <!-- Top Countries - Fallback -->
              <div v-else class="flex flex-row items-center text-gray-400">
                <PhotoIcon />
                <span class="text-md ml-2 font-medium"> ####### (#) </span>
              </div>
            </div>
          </div>

          <!-- Market Prices -->
          <div
            class="md:shadow-lgg flex w-full flex-col rounded-lg border border-gray-100 px-6 py-3 shadow-sm lg:shadow-lg"
          >
            <div class="text-md font-semibold">Average Market Prices</div>

            <div
              class="text-md mt-2"
              v-for="[
                inquiryType,
                averagePrice,
              ] in store.averagePricePerType.entries()"
            >
              <span>
                {{
                  inquiryType.charAt(0).toUpperCase() +
                  inquiryType.toLowerCase().slice(1)
                }}:
              </span>
              <span class="ml-1 font-medium text-gray-600">
                ${{ numberWithCommas(Number(averagePrice.toFixed(2))) }}
              </span>
            </div>
          </div>

          <!-- Inquiries -->
          <div
            class="flex w-full flex-col rounded-lg border border-gray-100 px-6 py-3 shadow-sm lg:shadow-lg"
          >
            <div class="text-md font-semibold">
              Inquiries ({{ store.inquiries.length }})
            </div>

            <div class="mt-2 inline-flex flex-row justify-between">
              <div class="flex flex-col">
                <div
                  class="text-md"
                  v-for="[
                    inquiryType,
                    occurrenceCount,
                  ] in store.inquiriesPerType.entries()"
                >
                  <span>
                    {{
                      inquiryType.charAt(0).toUpperCase() +
                      inquiryType.toLowerCase().slice(1)
                    }}:
                  </span>
                  <span class="ml-1 font-medium text-gray-600">
                    {{ numberWithCommas(occurrenceCount) }}
                  </span>
                </div>
              </div>

              <div v-if="store.inquiries.length > 0" class="flex flex-col">
                <div class="text-md">
                  <span> Financing: </span>
                  <span class="ml-1 font-medium text-gray-600">
                    {{ numberWithCommas(store.optedForFinancingCount) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex w-full flex-col md:px-6 md:pt-3">
            <div class="text-md collapse font-medium md:visible">Actions</div>
            <PrimaryButton
              class="flex flex-row items-center justify-center md:mt-2"
              @click="addMockInquiries()"
            >
              <PlusIcon class="h-4 w-4" />
              <span class="ml-2">Add Mock Data</span>
            </PrimaryButton>

            <PrimaryButton
              class="mt-2 flex flex-row items-center justify-center bg-red-500 hover:bg-red-400"
              @click="store.deleteAllInquiries()"
            >
              <TrashIcon class="h-4 w-4" />
              <span class="ml-2">Delete Data</span>
            </PrimaryButton>
          </div>
        </div>

        <div
          class="mt-10 w-full rounded-lg border border-gray-100 shadow-sm lg:shadow-lg"
        >
          <InquiriesTable class="w-full" :inquiries="store.inquiries" />
        </div>
      </div>
    </div>
  </container>
</template>
