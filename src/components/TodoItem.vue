<script setup lang="ts">
import { Ref, computed, ref } from "vue";
import { Todo } from "../types/todo";

const props = defineProps<{
  todo: Partial<Todo>;
}>();

const emit = defineEmits(["deleteTodo"]);

let checked: Ref<boolean> = ref(false);

const prio: Ref<string> = computed(() => {
  if (props.todo.priority === "Niedrig") return "!";
  else if (props.todo.priority === "Mittel") return "!!";
  else return "!!!";
});

const checkedIcon: Ref<string> = computed(() =>
  checked.value ? "fa-regular fa-circle-check" : "fa-regular  fa-circle"
);

function toggleCheck() {
  checked.value = !checked.value;
}

function deleteTodo() {
  emit("deleteTodo", props.todo.id);
}
</script>

<template>
  <article
    class="p-3 bg-[#ffafbd] rounded-xl grid grid-cols-1-1-8-2 items-center"
  >
    <font-awesome-icon
      :icon="checkedIcon"
      @click="toggleCheck"
      class="hover:cursor-pointer scale-125"
    />
    <p>{{ prio }} </p>
    <p class="justify-self-start">{{ todo.title }}</p>
    <section class="grid grid-cols-2 gap-x-4 justify-self-end">
      <font-awesome-icon
        icon="fa-regular fa-pen-to-square"
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
