<script setup lang="ts">
import { Ref, ref } from "vue";
import Input from "./components/Input.vue";
import TodoItem from "./components/TodoItem.vue";
import { Todo } from "./types/todo";

let todos: Ref<Array<Todo>> = ref([]);

let title: Ref<string> = ref("");
let due: Ref<string> = ref("");

function addTodo() {
  console.log(title.value);
  todos.value.push({ id: "123", title: title.value, checked: false });
  console.log(todos.value);
}
</script>
<!-- GREEN AND ORANGE 
  from-[#BBD8B3] to-[#EA8C55] -->
<template>
  <div
    class="font-ptsans w-full h-screen bg-gradient-to-t from-[#ffc3a0] to-[#ffafbd]"
  >
    <!-- <nav class="w-full flex text-grey absolute">
      <img
        src="./assets/images/logos/Logo_200x200_dark.svg"
        class="w-20 self-center p-2"
        alt=""
      />
    </nav> -->
    <section
      class="grid grid-cols-5-1-5 gap-x-6 w-3/4 my-0 mx-auto h-screen justify-self-center"
    >
      <section
        class="rounded-2xl h-1/2 w-3/4 m-auto bg-[#f9f4f4] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex justify-center"
      >
        <form class="grid grid-cols-1 w-1/2 m-auto h-fit items-center gap-y-12">
          <section>
            <!-- Titel -->
            <Input
              v-model="title"
              @update:model-value="(t: string) => (title = t)"
              type="text"
              id="title"
              placeholder="Test"
              label="Titel"
            />
            <!-- Fälligkeitsdatum -->
            <Input
              v-model="due"
              @update:model-value="(f) => (due = f)"
              :value="due"
              type="text"
              id="fällig"
              placeholder="Fälligkeitsdatum"
              label="Fälligkeitsdatum"
            />
          </section>

          <a
            @click="addTodo"
            href="#_"
            class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 border-[#ffafbd] rounded-full shadow-md group"
          >
            <span
              class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#ffafbd] group-hover:translate-x-0 ease"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span
              class="absolute flex items-center justify-center w-full h-full text-[#ffafbd] transition-all duration-300 transform group-hover:translate-x-full ease font-ptsans-caption"
              >Hinzufügen</span
            >
            <span class="relative invisible font-ptsans-caption"
              >Hinzufügen</span
            >
          </a>
        </form>
      </section>
      <section class="m-auto scale-150 rounded-full bg-[#f9f4f4]">
        <img
          src="./assets/images/logos/Logo_200x200_dark.svg"
          class="w-20 self-center p-2"
          alt=""
        />
      </section>
      <section
        class="grid auto-rows-[12%] gap-y-[3%] shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-tl-2xl rounded-bl-2xl h-1/2 m-auto w-3/4 bg-[#f9f4f4] p-5 overflow-y-scroll"
      >
        <TodoItem v-for="todo in todos" :todo="todo" :key="todo.id" />
      </section>
    </section>
  </div>
</template>
