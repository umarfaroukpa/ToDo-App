class CustomLocalStorage {
  constructor() {
    this.localStorageKey = 'todos_app_data';
    
    // Check if localStorage is available
    this.isAvailable = this.checkStorageAvailability();
  }
  
  // Check if localStorage is available
  checkStorageAvailability() {
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      console.warn('LocalStorage is not available. Todo data will not persist between sessions.');
      return false;
    }
  }

  // Save todos to localStorage
  saveTodos(todos) {
    if (!this.isAvailable) return;
    
    try {
      const todosJSON = JSON.stringify(todos);
      localStorage.setItem(this.localStorageKey, todosJSON);
      return true;
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
      return false;
    }
  }

  // Get todos from localStorage
  getTodos() {
    if (!this.isAvailable) return [];
    
    try {
      const todosJSON = localStorage.getItem(this.localStorageKey);
      if (!todosJSON) return [];
      
      const parsedTodos = JSON.parse(todosJSON);
      
      // Validate data structure
      if (!Array.isArray(parsedTodos)) {
        console.warn('Invalid data format in localStorage. Returning empty array.');
        return [];
      }
      
      // Add missing properties or fix data as needed
      return parsedTodos.map(todo => ({
        id: todo.id || Date.now() + Math.floor(Math.random() * 1000),
        title: todo.title || 'Untitled',
        description: todo.description || '',
        completed: typeof todo.completed === 'boolean' ? todo.completed : false,
        createdAt: todo.createdAt || new Date().toISOString().slice(0, 10)
      }));
      
    } catch (error) {
      console.error('Error retrieving todos from localStorage:', error);
      return [];
    }
  }
  
  // Clear all todos from localStorage
  clearTodos() {
    if (!this.isAvailable) return;
    
    try {
      localStorage.removeItem(this.localStorageKey);
      return true;
    } catch (error) {
      console.error('Error clearing todos from localStorage:', error);
      return false;
    }
  }
}

export default CustomLocalStorage;