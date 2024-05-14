class CustomLocalStorage {
  constructor() {
    this.localStorageKey = 'todos';
  }

  saveTodos(todos) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(todos));
  }

  getTodos() {
    const todosString = localStorage.getItem(this.localStorageKey);
    return JSON.parse(todosString) || [];
  }
}

export default CustomLocalStorage;