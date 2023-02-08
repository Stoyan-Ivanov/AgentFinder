<script setup lang="ts">
import type { Inquiry, BuyInquiry, SellInquiry } from "@/models/inquiry";
import { useInquiriesStore } from "@/stores/inquiries";
import { numberWithCommas } from "@/composables/useCurrencyFormatter";

defineProps<{
  inquiries: Inquiry[];
}>();

/**
 * 🗃 Local storage for handling submitted inquiries
 */
const store = useInquiriesStore();
</script>

<template>
  <div class="overflow-x-scroll md:overflow-x-auto">
    <table
      class="table w-full border-collapse overflow-y-auto overflow-x-scroll whitespace-nowrap rounded-lg bg-white text-left text-sm text-gray-500"
    >
      <thead class="w-full bg-gray-50">
        <tr>
          <th
            scope="col"
            class="px-3 py-2 font-medium md:px-6 md:py-4"
            v-for="header in ['Contact', 'Type', 'Location', 'Details', '']"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody
        class="w-full divide-y divide-gray-100 rounded-lg border-t border-gray-100"
      >
        <tr v-if="inquiries.length == 0" class="w-full text-center">
          <td colspan="12" class="py-5">No data yet</td>
        </tr>

        <tr
          v-else
          v-for="(inquiry, index) in inquiries"
          :key="inquiry.email"
          class="w-full hover:bg-blue-50"
        >
          <!-- Name + Email -->
          <th
            class="flex flex-row items-center gap-3 px-3 py-2 font-normal text-paragraph md:px-6 md:py-4"
          >
            <UserCircleIcon class="h-10 w-10 text-gray-300" />
            <div class="text-sm">
              <div class="font-medium text-gray-700">{{ inquiry.name }}</div>
              <a
                class="flex flex-row items-center text-gray-400 hover:text-primary hover:underline"
                :href="`mailto:${inquiry.email}`"
              >
                <span>{{ inquiry.email }}</span>

                <ArrowUpRightIcon class="h-3 w-3" />
              </a>
            </div>
          </th>

          <!-- Type -->
          <td class="px-3 py-2 md:px-6 md:py-4">
            <span
              class="rounded-md px-2 py-1 text-xs font-semibold"
              :class="{
                'bg-green-50 text-green-600': inquiry.type == 'BUY',
                'bg-red-50 text-red-500': inquiry.type == 'SELL',
                'bg-blue-50 text-primary': inquiry.type == 'RENT',
              }"
            >
              {{ inquiry.type }}
            </span>
          </td>

          <!-- City + Country -->
          <td class="px-3 py-2 md:px-6 md:py-4">
            <div class="flex flex-row items-center">
              <img class="h-4 w-5" :src="inquiry.country.flagUrl" :alt="inquiry.country.name" />
              <span class="ml-2 text-paragraph">{{
                `${inquiry.city}, ${inquiry.country.name}`
              }}</span>
            </div>
          </td>

          <!-- Details -->
          <td class="px-3 py-2 md:px-6 md:py-4">
            <div class="flex flex-col">
              <div v-if="(inquiry as BuyInquiry).homeBudget">
                <span>Home Budget:</span>
                <span class="ml-1 font-medium text-gray-700">
                  {{
                    `${inquiry.country.currencySymbol}  ${numberWithCommas(
                      (inquiry as BuyInquiry).homeBudget
                    )}`
                  }}
                </span>
              </div>

              <div v-if="(inquiry as SellInquiry).homeValue">
                <span>Home Value:</span>
                <span class="ml-1 font-medium text-gray-700">
                  {{
                    `${inquiry.country.currencySymbol}  ${numberWithCommas(
                      (inquiry as SellInquiry).homeValue
                    )}`
                  }}
                </span>
              </div>
              <div>
                <span
                  v-if="(inquiry as BuyInquiry).financingAdvisory"
                  class="mt-2 inline-flex flex-row flex-wrap items-center rounded-md border border-green-100 bg-green-50 py-0.5 pl-1 pr-2.5 font-medium text-green-600"
                >
                  <CheckIcon
                    v-if="(inquiry as BuyInquiry).financingAdvisory"
                    class="h-3 w-3"
                  />
                  <span class="ml-1 text-xs">Financing</span>
                </span>
              </div>
            </div>
          </td>

          <!-- Actions -->
          <td class="px-6 py-4">
            <div class="flex justify-end">
              <TrashIcon
                class="cursor-pointer text-red-500 hover:text-red-300"
                @click="store.deleteInquiry(index)"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
