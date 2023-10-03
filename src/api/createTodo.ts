// import { Todo } from "../types/todo";
import axios from "axios";

const db_conn_str = import.meta.env.VITE_DB_CONNECTION;

async function createTodo(todo: any) {
  return await axios.post(`${db_conn_str}/createTodo`, {
    todo: todo,
  });
}

export default createTodo;
