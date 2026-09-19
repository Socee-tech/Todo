import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:5000/api/todos" : "/api/todos"),
  headers: { "Content-Type": "application/json" }
})

export default API;


// Keep backend-specific field names in one place.
const FIELD_NAMES = { title: "title", description: "description", status: "status" };

const toPayload = ({ title, description, status }) => ({
  [FIELD_NAMES.title]: title,
  [FIELD_NAMES.description]: description,
  [FIELD_NAMES.status]: status,
});

export const todoApi = {
  getAll: () => API.get("/"),
  create: (todo) => API.post("/", toPayload(todo)),
  update: (id, todo) => API.put(`/${id}`, toPayload(todo)),
  remove: (id) => API.delete(`/${id}`),
};