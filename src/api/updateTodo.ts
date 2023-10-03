import axios from "axios";

const db_conn_str = import.meta.env.VITE_DB_CONNECTION;

async function updateTodo(todo: any) {
  console.log(todo["_id"]);
  return await axios.patch(`${db_conn_str}/updateTodo/${todo["_id"]}`, {
    ...todo,
  });
}

export default updateTodo;
