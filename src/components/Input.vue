<script setup lang="ts">
import { Ref, ref } from "vue";

const props = defineProps<{
  modelValue: string | number;
  id: string;
  type: string;
  placeholder: string;
  label: string;
  required: boolean;
  inputValue?: string | number;
}>();

const emit = defineEmits(["update:modelValue"]);

const value: Ref<string | number> = ref(props.inputValue!);

let errorMsg: Ref<string> = ref("");

function updateInput() {
  if (props.type == "date") {
    emit("update:modelValue", Date.parse(value.value as string));
  } else {
    emit("update:modelValue", value.value);
  }
}

function validate(/* input: string */) {
  if (props.required && !value.value) {
    errorMsg.value = "Input is required ";
  } else {
    errorMsg.value = "";
  }
}
</script>

<template>
  <section class="relative mb-6">
    <input
      v-model="value"
      @input="updateInput"
      :type="type"
      :required="required"
      @focusout="validate()"
      class="peer m-0 block h-[58px] w-full rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-600 dark:text-neutral-200 dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem] invalid:text-red-800"
      :id="id"
      :placeholder="placeholder"
    />
    <label
      :for="id"
      class="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
      >{{ label }}</label
    >
    <p class="text-red-600">{{ errorMsg }}</p>
  </section>
</template>
