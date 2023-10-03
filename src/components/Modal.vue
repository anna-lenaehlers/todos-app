<script lang="ts" setup>
import { Todo } from "../types/todo";
import Input from "./Input.vue";
import PrioritySelect from "./PrioritySelect.vue";
import updateTodo from "../api/updateTodo";
import { Ref, ref } from "vue";

const props = defineProps<{
  todo: any;
}>();

const emit = defineEmits(["toggle-modal", "update-todos"]);

const currentTodo: Ref<Todo> = ref(props.todo);

function toggleIsOpen() {
  emit("toggle-modal");
}

async function editTodo() {
  console.log("editTodo");
  console.log(currentTodo.value);
  try {
    await updateTodo(currentTodo.value);
    emit("update-todos");
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div
    id="app"
    class="absolute w-full h-full z-50 flex justify-center content-center flex-wrap"
  >
    <div class="w-full">
      <div
        @click="toggleIsOpen"
        class="absolute bg-black opacity-70 inset-0 z-0"
      ></div>

      <section
        class="w-1/3 p-5 relative mx-auto my-auto rounded-xl shadow-lg bg-white"
      >
        <form
          @keyup.enter="editTodo"
          class="grid grid-cols-1 w-3/5 mx-auto my-8 h-3/5 items-center gap-y-12"
        >
          <section class="grid">
            <Input
              v-model="currentTodo.title"
              @update:model-value="(t: string) => (currentTodo.title = t)"
              type="text"
              id="title"
              placeholder="Test"
              label="Titel"
              :inputValue="currentTodo.title"
              :required="true"
            />
            <!-- Fälligkeitsdatum -->
            <Input
              v-model="currentTodo.due as number"
              @update:model-value="(f) => (currentTodo.due = f)"
              type="date"
              id="fällig"
              placeholder="Fälligkeitsdatum (optional)"
              label="Fälligkeitsdatum"
              :inputValue="props.todo.due!"
              :required="false"
            />

            <PrioritySelect
              v-model="currentTodo.priority"
              @update:model-value="(p) => (currentTodo.priority = p)"
              id="prio"
              label="Priorität"
              :inputValue="currentTodo.priority"
              :required="true"
            />
          </section>

          <a
            @click="editTodo"
            href="#_"
            class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium transition duration-300 ease-out border-2 border-[#BBD8B3] rounded-full shadow-md group"
          >
            <span
              class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#BBD8B3] group-hover:translate-x-0 ease"
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
              class="absolute flex items-center justify-center w-full h-full text-[#BBD8B3] transition-all duration-300 transform group-hover:translate-x-full ease font-ptsans-caption"
              >Hinzufügen</span
            >
            <span class="relative invisible font-ptsans-caption"
              >Hinzufügen</span
            >
          </a>
        </form>
      </section>
    </div>
  </div>
</template>
