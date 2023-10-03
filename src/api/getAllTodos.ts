import axios from "axios";

const db_conn_str = import.meta.env.VITE_DB_CONNECTION;

async function getAllTodos() {
  console.log(db_conn_str);
  const todos = await axios.get(`${db_conn_str}/getAllTodos`);
  return todos.data;
}

export default getAllTodos;
