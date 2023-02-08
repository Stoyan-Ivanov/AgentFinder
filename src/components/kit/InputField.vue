<script setup lang="ts">
import type { Ref } from "vue";

defineProps<{
  modelValue: string | number;
  type?: string;
  label?: string;
  error?: string | Ref<string>;
}>();
defineEmits: ["update:modelValue"];
</script>

<template>
  <label
    v-if="label"
    class="flex py-2 text-sm text-paragraph"
    :for="$attrs.name ? $attrs.name as string : undefined"
  >
    {{ label }}
  </label>

  <div
    v-bind="$attrs"
    class="flex h-12 rounded-lg border px-4"
    :class="error ? ' border-error' : 'border-gray-300 active:border-primary '"
  >
    <span class="flex h-full flex-row items-center rounded-lg">
      <slot name="prepend"></slot>
    </span>

    <input
      class="flex h-full flex-grow pl-2 outline-none outline-1"
      :type="type"
      :value="modelValue"
      :placeholder="$attrs.placeholder ? $attrs.placeholder as string : undefined"
      :name="$attrs.name ? $attrs.name as string : undefined"
      :autofocus="$attrs.autofocus != undefined ? $attrs.autofocus as boolean : false"
      @input="(event: any) => $emit('update:modelValue', event.target.value)"
    />

    <span class="flex h-full flex-row items-center rounded-lg">
      <slot name="append"></slot>
    </span>
  </div>

  <div v-if="error" class="mt-1 ml-2 text-start text-sm font-medium text-error">
    {{ error }}
  </div>
</template>
