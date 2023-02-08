<script setup lang="ts">
import { ref, type Ref, watchEffect, toRefs } from "vue";
import ComboBox from "@/components/kit/Combobox.vue";

const props = defineProps<{
  modelValue: string;
  options: Map<string, any>;
  showLabel?: boolean;
  error?: string | Ref<string>;
}>();
const { modelValue, options, error } = toRefs(props);
const emit = defineEmits(["update:modelValue"]);

/**
 * 📦 The currently selected / inputted string
 */
const localModel: Ref<string> = ref(modelValue.value);

/**
 * 👀 Watcher for changes related to the inputted string / selected option
 */
watchEffect(() => emit("update:modelValue", localModel.value));
</script>

<template>
  <ComboBox
    :label="showLabel ? 'Country' : undefined"
    :options="options"
    v-model.trim="localModel"
    :error="error"
    placeholder="Enter your country"
  >
    <template #prepend="{ props }">
      <img
        v-if="props"
        :src="props.flagUrl"
        :alt="props.name"
        class="h-4 w-5"
      />
    </template>

    <template #option="{ props }">
      <div class="flex flex-row items-center">
        <img :src="props.flagUrl" :alt="props.name" class="h-4 w-5" />
        <span class="ml-4">{{ props.name }}</span>
      </div>
    </template>
  </ComboBox>
</template>
