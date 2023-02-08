<script setup lang="ts">
import {
  ref,
  type Ref,
  watch,
  type ComputedRef,
  computed,
  watchEffect,
  toRefs,
} from "vue";
import InputField from "./InputField.vue";

const props = defineProps<{
  modelValue: string;
  options: Map<string, any>;
  label? : string;
  error?: string | Ref<string>;
}>();
const { modelValue, options, error } = toRefs(props);
const emit = defineEmits(["update:modelValue"]);

/**
 * 📦 The currently selected / inputted string
 */
const localModel: Ref<string> = ref(modelValue.value);

/**
 * 🚩 Flag for whether the popup dropdown should be shown for autocompletion
 */
const showPopup: Ref<boolean> = ref(false);

/**
 * 🏗 Options filtered based on the inputted string
 */
const filteredOptions: ComputedRef<Map<string, any>> = computed(
  () =>
    new Map(
      [...options.value].filter(([key, value]) =>
        key.toLocaleLowerCase().startsWith(localModel.value.toLocaleLowerCase())
      )
    )
);

/**
 * 🏗 Options wrapper that determines whether filtered or all options should be shown
 */
const displayOptions: ComputedRef<Map<string, any>> = computed(() =>
  options.value.has(localModel.value) ? options.value : filteredOptions.value
);

/**
 * 👀 Watcher for changes related to the inputted string / selected option
 */
watchEffect(() => {
  // Emit model change event to parent
  emit("update:modelValue", localModel.value);

  // Show popup if entered string doesn't fully match with an option
  if (localModel.value !== "" && !options.value.has(localModel.value)) {
    showPopup.value = true;
  }
});

/**
 * 👀 Watcher aiming to trigger once after the load of the options in order to set the initial field value
 */
watch(
  () => options.value,
  (newValue, oldValue) => {
    if (localModel.value == "" && newValue && newValue.size > 0) {
      localModel.value = newValue.entries().next().value[0];
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="relative">
    <InputField
      class="w-full"
      :label="label"
      :placeholder="$attrs.placeholder"
      v-model.trim="localModel"
      :error="error"
      @click="showPopup = !showPopup"
    >
      <template #prepend>
        <slot name="prepend" :props="options.get(localModel)"></slot>
      </template>

      <template #append>
        <ChevronDownIcon
          class="text-gray-400 transition duration-150"
          :class="{ 'rotate-180': showPopup }"
        />
      </template>
    </InputField>

    <!-- Dropdown popup -->
    <div
      v-show="showPopup"
      class="absolute z-10 mt-2 flex max-h-52 w-full flex-col overflow-y-auto rounded-md bg-gray-50 py-2 shadow-md transition duration-150"
      v-click-away="() => (showPopup = false)"
    >
      <!-- Dropdown options -->
      <div
        v-if="displayOptions.size > 0"
        v-for="[key, value] in displayOptions"
        class="cursor-pointer rounded-sm px-4 py-1 hover:bg-blue-100"
        :class="{ 'bg-blue-200': localModel == key }"
        @click="
          localModel = key;
          showPopup = !showPopup;
        "
      >
        <slot name="option" :props="value"></slot>
      </div>

      <!-- Fallback -->
      <div v-else class="py-2 px-2 text-sm text-paragraph">
        No results found
      </div>
    </div>
  </div>
</template>
