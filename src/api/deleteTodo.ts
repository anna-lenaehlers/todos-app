import axios from "axios";

const db_conn_str = import.meta.env.VITE_DB_CONNECTION;

async function deleteTodo(id: string) {
  return await axios.delete(`${db_conn_str}/deleteTodo/${id}`);
}

export default deleteTodo;
