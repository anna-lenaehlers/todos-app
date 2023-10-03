<script setup lang="ts">
import { Ref, onMounted, ref } from "vue";
import Input from "./components/Input.vue";
import TodoItem from "./components/TodoItem.vue";
import { Todo, Priority } from "./types/todo";
import PrioritySelect from "./components/PrioritySelect.vue";
import { sortByPrio, sortByDue, sortByCreated } from "./helpers/sortHelpers";
import Modal from "./components/Modal.vue";
import createTodo from "./api/createTodo";
import getAllTodos from "./api/getAllTodos";
import deleteTodo from "./api/deleteTodo";

let todos: Ref<any> = ref([]);
let currentTodo: any = ref({});

let title: Ref<string> = ref("");
let due: Ref<number> = ref(0);
let priority: Ref<Priority> = ref(Priority.Niedrig);
let modalIsOpen: Ref<boolean> = ref(false);

let sortCatgories: Ref<{
  prio: boolean;
  due: boolean;
  created: boolean;
}> = ref({
  prio: false,
  due: false,
  created: false,
});

async function addTodo() {
  try {
    const newTodo = new Todo(title.value, priority.value, due.value);
    await createTodo(newTodo);
    todos.value = await getAllTodos();
  } catch (error: any) {
    console.log(error.message);
  }
}

async function removeTodoFromList(id: string) {
  await deleteTodo(id);
  todos.value = await getAllTodos();
}

async function toggleModal(todo: Partial<Todo>) {
  modalIsOpen.value = !modalIsOpen.value;
  currentTodo = todo;
  todos.value = await getAllTodos();
}

async function updateTodos() {
  modalIsOpen.value = !modalIsOpen.value;
  todos.value = await getAllTodos();
}

function toggleSort(newSortCat: string) {
  try {
    if (newSortCat === "prio") {
      sortByPrio(todos.value);
    } else if (newSortCat === "due") {
      sortByDue(todos.value);
    } else if (newSortCat === "created") {
      sortByCreated(todos.value);
    }
  } catch (e: any) {
    console.log(e);
  }
  sortCatgories.value.prio = false;
  sortCatgories.value.due = false;
  sortCatgories.value.created = false;

  (sortCatgories.value as any)[newSortCat] = true;
}

onMounted(async () => {
  todos.value = await getAllTodos();
});
</script>
<!-- GREEN AND ORANGE 
  from-[#BBD8B3] to-[#EA8C55] -->
<template>
  <Modal
    v-if="modalIsOpen"
    @toggle-modal="toggleModal"
    @update-todos="updateTodos"
    :todo="currentTodo"
  />
  <div
    class="font-ptsans w-full h-screen bg-gradient-to-t from-[#BBD8B3] to-[#EA8C55]"
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
        <form
          @keyup.enter="addTodo"
          class="grid grid-cols-1 w-1/2 m-auto h-fit items-center gap-y-12"
        >
          <section>
            <!-- Titel -->
            <Input
              v-model="title"
              @update:model-value="(t: string) => (title = t)"
              type="text"
              id="title"
              placeholder="Test"
              label="Titel"
              :required="true"
            />
            <!-- Fälligkeitsdatum -->
            <Input
              v-model="due"
              @update:model-value="(f) => (due = f)"
              type="date"
              id="fällig"
              placeholder="Fälligkeitsdatum (optional)"
              label="Fälligkeitsdatum"
              :required="false"
            />

            <PrioritySelect
              v-model="priority"
              @update:model-value="(p) => (priority = p)"
              id="prio"
              label="Priorität"
              :required="true"
            />
          </section>

          <a
            @click="addTodo"
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
      <section class="m-auto scale-150 rounded-full bg-[#f9f4f4]">
        <img
          src="./assets/images/logos/Logo_200x200_dark.svg"
          class="w-20 self-center p-2"
          alt=""
        />
      </section>
      <section
        class="shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-tl-2xl rounded-bl-2xl h-1/2 m-auto w-3/4 bg-offwhite p-5 overflow-y-scroll"
      >
        <div class="flex gap-3 pb-5">
          <label>Sortieren nach:</label>
          <p
            @click="toggleSort('prio')"
            :class="{ 'font-bold': sortCatgories.prio }"
            class="cursor-pointer"
          >
            Priorität
          </p>
          <p
            @click="toggleSort('due')"
            :class="{ 'font-bold': sortCatgories.due }"
            class="cursor-pointer"
          >
            Fälligkeit
          </p>
          <p
            @click="toggleSort('created')"
            :class="{ 'font-bold': sortCatgories.created }"
            class="cursor-pointer"
          >
            Erstellungsdatum
          </p>
        </div>
        <section class="grid auto-rows-[50px] gap-y-[16px] h-fit">
          <TodoItem
            v-for="todo in todos"
            :todo="todo"
            :key="todo['_id']"
            @toggle-modal="toggleModal"
            @delete-todo="removeTodoFromList"
          />
        </section>
      </section>
    </section>
  </div>
</template>
