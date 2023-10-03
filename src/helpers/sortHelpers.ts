import { Todo } from "../types/todo";

function sortByPrio(todosArray: Array<Todo>) {
  todosArray.sort((a, b) => {
    if (a.priority < b.priority) return -1;
    if (b.priority < a.priority) return 1;
    return 0;
  });
}

function sortByDue(todosArray: Array<Todo>) {
  todosArray.sort((a, b) => {
    if (a.due < b.due) return -1;
    if (b.due < a.due) return 1;
    return 0;
  });
}

function sortByCreated(todosArray: Array<Todo>) {
  todosArray.sort((a, b) => {
    if (a.created < b.created) return -1;
    if (b.created < a.created) return 1;
    return 0;
  });
}

export { sortByPrio, sortByDue, sortByCreated };
