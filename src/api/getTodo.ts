import axios from "axios";

const db_conn_str = import.meta.env.VITE_DB_CONNECTION;

async function getTodo(id: string) {
  return await axios.get(`${db_conn_str}/getTodo/${id}`);
}

export default getTodo;
