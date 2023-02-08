<script setup lang="ts">
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";

defineProps<{
  modelValue: string | number;
  options: Map<string, string>;
}>();
defineEmits: ["update:modelValue"];
</script>

<template>
  <RadioGroup
    :defaultValue="modelValue"
    @update:model-value="(value: string | number) =>  $emit('update:modelValue', value)"
  >
    <div class="space-y-3">
      <RadioGroupOption
        as="template"
        v-for="[key, value] in options"
        :key="key"
        :value="key"
        v-slot="{ checked }"
      >
        <div
          :class="[
            checked ? 'border border-primary' : 'border hover:border-primary',
          ]"
          class="relative flex cursor-pointer rounded-md px-5 py-4 transition-colors duration-150 focus:outline-none"
        >
          <div class="flex w-full items-center">
            <div v-if="checked" class="shrink-0">
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="10" fill="#3b82f6" />
                <path
                  d="M6 11l2 3 7-7"
                  stroke="#fff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <svg v-else class="h-5 w-5" viewBox="0 0 20 20" fill="none">
              <circle
                cx="10"
                cy="10"
                r="10"
                stroke="#3b82f6"
                stroke-width="1"
                stroke-opacity="0.2"
              />
            </svg>

            <div class="ml-4 flex items-center">
              <div class="text-sm">
                <RadioGroupLabel
                  as="p"
                  :class="checked ? 'text-primary' : 'text-paragraph'"
                  class="font-medium"
                >
                  {{ value }}
                </RadioGroupLabel>
              </div>
            </div>
          </div>
        </div>
      </RadioGroupOption>
    </div>
  </RadioGroup>
</template>
