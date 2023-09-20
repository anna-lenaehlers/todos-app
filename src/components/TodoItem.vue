<script setup lang="ts">
import { ref } from "vue";
import { Todo } from "../types/todo";

defineProps<{
  todo: Partial<Todo>;
}>();

let checked = ref(false);
</script>

<template>
  <article
    class="p-3 bg-[#ffafbd] rounded-xl grid grid-cols-1-8-1 items-center"
  >
    <font-awesome-icon icon="fa-regular fa-circle-check" v-if="checked" />
    <font-awesome-icon icon="fa-regular fa-circle" v-else />
    <p class="justify-self-start">{{ todo.title }}</p>
    <section class="grid grid-cols-2 gap-x-4 justify-self-end">
      <font-awesome-icon icon="fa-regular fa-pen-to-square" />
      <font-awesome-icon icon="fa-regular fa-circle-xmark" />
    </section>
  </article>
</template>
