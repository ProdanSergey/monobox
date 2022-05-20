import { XHR } from "@utils/xhr";

export const api = {
  async createTodo(title) {
    return await XHR.post("https://jsonplaceholder.typicode.com/users/1/todos", {
      fakeId: new Date().valueOf(),
      title,
      completed: false,
    });
  },
  async removeTodo(id) {
    return await XHR.remove(`https://jsonplaceholder.typicode.com/todos/${id}`);
  },
  async getTodos() {
    return await XHR.get("https://jsonplaceholder.typicode.com/users/1/todos");
  },
  async getTodo(id) {
    return await XHR.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
  },
};
