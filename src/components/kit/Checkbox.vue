<script setup lang="ts">
import { ref, toRefs, watch } from "vue";
import { CheckIcon } from "vue-tabler-icons";

const props = defineProps<{
  modelValue: boolean;
}>();
const { modelValue } = toRefs(props);
const emit = defineEmits(["update:modelValue"]);

/**
 * 🚩 Flag for whether the checkbox is active
 */
const isChecked = ref(modelValue.value);

/**
 * 👀 Watcher that emits changes in model value to parent
 */
watch(isChecked, (newVal: boolean, oldVal: boolean) => {
  emit("update:modelValue", newVal);
});
</script>

<template>
  <div
    class="flex h-12 cursor-pointer flex-row items-center rounded-lg border px-4"
    :class="{ 'border-primary': isChecked }"
    @click="isChecked = !isChecked"
  >
    <input type="checkbox" v-model="isChecked" class="hidden" />
    <div
      :class="{
        ' border': !isChecked,
        ' border-none bg-primary': isChecked,
      }"
      class="relative h-5 w-5 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-150"
    >
      <span
        :class="{
          'opacity-0': !isChecked,
          'opacity-100': isChecked,
        }"
        class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-150"
      >
        <CheckIcon class="h-4 w-4 text-white" />
      </span>
    </div>

    <span
      class="ml-4 text-sm font-medium transition-colors duration-150"
      :class="{
        'text-paragraph': !isChecked,
        'text-primary': isChecked,
      }"
    >
      <slot name="label"></slot>
    </span>
  </div>
</template>
