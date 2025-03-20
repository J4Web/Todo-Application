import { API } from "./utils";

const getTodosForUser = async (userId: string) => {
  try {
    const response = await API.get(`/todos/${userId}`);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const createTodo = async (params: unknown) => {
  try {
    const response = await API.post("/todos", params);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const updateTodo = async (params: unknown) => {
  try {
    const response = await API.put("/todo", params);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const deleteTodo = async (params: unknown) => {
  try {
    const response = await API.delete("/todo", params!);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const completeTodo = async (params: unknown) => {
  try {
    const response = await API.put("/todo/complete", params);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export { getTodosForUser, createTodo, updateTodo, deleteTodo, completeTodo };
