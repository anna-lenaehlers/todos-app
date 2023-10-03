<script setup lang="ts">
import { Ref, computed, ref } from "vue";
// import { Todo } from "../types/todo";
import { convertDate } from "../helpers/dateHelpers";

const props = defineProps<{
  todo: any;
}>();

const emit = defineEmits(["deleteTodo", "toggleModal"]);

let checked: Ref<boolean> = ref(false);

const prio: Ref<string> = computed(() => {
  if (props.todo.priority === "Niedrig") return "!";
  else if (props.todo.priority === "Mittel") return "!!";
  else return "!!!";
});

const checkedIcon: Ref<string> = computed(() =>
  checked.value ? "fa-regular fa-circle-check" : "fa-regular  fa-circle"
);

const germanDate: Ref<string> = computed(() =>
  props.todo.due ? convertDate(props.todo.due) : ""
);

function toggleCheck() {
  checked.value = !checked.value;
}

function deleteTodo() {
  emit("deleteTodo", props.todo["_id"]);
}

function toggleModal() {
  emit("toggleModal", props.todo);
}
</script>

<template>
  <article
    class="p-3 bg-[#BBD8B3] rounded-xl grid grid-cols-1-1-8-2 items-center h-fit"
  >
    <font-awesome-icon
      :icon="checkedIcon"
      @click="toggleCheck"
      class="hover:cursor-pointer scale-125"
    />
    <p>{{ prio }}</p>
    <p class="justify-self-start flex w-full justify-between items-center">
      {{ todo.title }}
      <span
        class="px-2 py-1 rounded-full bg-offwhite border-solid border-grey border-2"
        >bis {{ germanDate }}</span
      >
    </p>
    <section class="grid grid-cols-2 gap-x-4 justify-self-end">
      <font-awesome-icon
        icon="fa-regular fa-pen-to-square"
        @click="toggleModal"
        class="hover:cursor-pointer scale-125"
      />
      <font-awesome-icon
        icon="fa-regular fa-circle-xmark"
        @click="deleteTodo"
        class="hover:cursor-pointer scale-125"
      />
    </section>
  </article>
</template>
