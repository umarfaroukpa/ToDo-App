import CustomLocalStorage from './localstorage.js';

class TodoList {
  constructor(container) {
    this.container = document.querySelector(container);
    this.todos = [];
    this.localStorage = new CustomLocalStorage();
    this.filteredTodos = null;
    this.loadTodosFromLocalStorage();
    
    // Listen for theme changes
    document.addEventListener('themeChange', (e) => {
      this.applyThemeToTodos(e.detail.isDarkMode);
    });
  }

  loadTodosFromLocalStorage() {
    this.todos = this.localStorage.getTodos();
  }

  addTodoItem(title, description, date = null) {
    const currentDate = date ? new Date(date) : new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);
    const newTodo = { 
      id: Date.now(), // Add unique ID
      title, 
      description, 
      completed: false, 
      createdAt: formattedDate 
    };

    this.todos.push(newTodo);
    this.localStorage.saveTodos(this.todos);
    this.resetFilter();
    this.render();
    
    return newTodo; // Return the created todo for use elsewhere if needed
  }

  removeTodoItem(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.localStorage.saveTodos(this.todos);
    this.resetFilter();
    this.render();
  }
  
  editTodoItem(id, updatedData) {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      this.todos[index] = { ...this.todos[index], ...updatedData };
      this.localStorage.saveTodos(this.todos);
      this.resetFilter();
      this.render();
    }
  }
  
  toggleCompleted(id) {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      this.todos[index].completed = !this.todos[index].completed;
      this.localStorage.saveTodos(this.todos);
      this.render();
    }
  }
  
  // Filter todos for today
  filterTodosForToday() {
    const today = new Date().toISOString().slice(0, 10);
    this.filteredTodos = this.todos.filter(todo => todo.createdAt === today);
    
    if (this.filteredTodos.length === 0) {
      alert('No todos for today!');
      this.resetFilter();
    } else {
      this.render();
    }
  }
  
  // Filter todos for last 7 days
  filterTodosForLastSevenDays() {
    const currentDate = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDate.getDate() - 7);
    
    this.filteredTodos = this.todos.filter(todo => {
      const todoDate = new Date(todo.createdAt);
      return todoDate >= sevenDaysAgo && todoDate <= currentDate;
    });
    
    if (this.filteredTodos.length === 0) {
      alert('No todos for the last seven days!');
      this.resetFilter();
    } else {
      this.render();
    }
  }
  
  // Reset filter
  resetFilter() {
    this.filteredTodos = null;
  }
  
  // Apply theme to todos
  applyThemeToTodos(isDarkMode) {
    const todoItems = this.container.querySelectorAll('li');
    todoItems.forEach(item => {
      if (isDarkMode) {
        item.classList.add('dark-mode-item');
      } else {
        item.classList.remove('dark-mode-item');
      }
    });
  }

  render() {
    this.container.innerHTML = '';
    const ul = document.createElement('ul');
    ul.classList.add('todo-list');
    
    // Determine which todos to display
    const todosToDisplay = this.filteredTodos || this.todos;
    
    // Display a message if there are no todos
    if (todosToDisplay.length === 0) {
      const emptyMessage = document.createElement('div');
      emptyMessage.classList.add('empty-list-message');
      emptyMessage.textContent = this.filteredTodos ? 'No todos match the current filter' : 'No todos yet! Add your first one.';
      this.container.appendChild(emptyMessage);
      return;
    }

    todosToDisplay.forEach(todo => {
      const li = document.createElement('li');
      li.classList.add('todo-item');
      if (todo.completed) {
        li.classList.add('completed');
      }
      
      // Apply current theme
      if (document.body.classList.contains('dark-mode')) {
        li.classList.add('dark-mode-item');
      }
      
      // Create checkbox for completion status
      const checkBox = document.createElement('input');
      checkBox.setAttribute('type', 'checkbox');
      checkBox.classList.add('btn-check');
      checkBox.checked = todo.completed;
      
      // Create title and description elements
      const contentDiv = document.createElement('div');
      contentDiv.classList.add('todo-content');
      
      const titleSpan = document.createElement('span');
      titleSpan.classList.add('todo-title');
      titleSpan.textContent = todo.title;
      
      const descriptionSpan = document.createElement('span');
      descriptionSpan.classList.add('todo-description');
      descriptionSpan.textContent = todo.description;
      
      // Create date element
      const dateDiv = document.createElement('div');
      dateDiv.classList.add('todo-date-container');
      
      const createdDateSpan = document.createElement('span');
      createdDateSpan.textContent = todo.createdAt;
      createdDateSpan.classList.add('todo-date');
      dateDiv.appendChild(createdDateSpan);
      
      // Create actions div for buttons
      const actionsDiv = document.createElement('div');
      actionsDiv.classList.add('todo-actions');
      
      // Create edit and delete buttons
      const editButton = document.createElement('button');
      editButton.textContent = '✏️';
      editButton.title = 'Edit';
      editButton.classList.add('btn-edit');
      
      const deleteButton = document.createElement('button');
      deleteButton.textContent = '🗑️';
      deleteButton.title = 'Delete';
      deleteButton.classList.add('dlt-btn');
      
      // Assemble the todo item
      contentDiv.appendChild(titleSpan);
      contentDiv.appendChild(document.createElement('br'));
      contentDiv.appendChild(descriptionSpan);
      
      actionsDiv.appendChild(editButton);
      actionsDiv.appendChild(deleteButton);
      
      li.appendChild(checkBox);
      li.appendChild(contentDiv);
      li.appendChild(dateDiv);
      li.appendChild(actionsDiv);
      
      ul.appendChild(li);
      
      // Event listeners for todo interactions
      deleteButton.addEventListener('click', () => {
        this.removeTodoItem(todo.id);
      });
      
      checkBox.addEventListener('change', () => {
        this.toggleCompleted(todo.id);
      });
      
      editButton.addEventListener('click', () => {
        this.createEditDialog(todo);
      });
    });

    this.container.appendChild(ul);
    
    // Add filter indicator if filtering is active
    if (this.filteredTodos) {
      const filterIndicator = document.createElement('div');
      filterIndicator.classList.add('filter-indicator');
      
      const filterText = document.createElement('span');
      filterText.textContent = 'Filtered view';
      
      const clearFilterButton = document.createElement('button');
      clearFilterButton.textContent = 'Clear Filter';
      clearFilterButton.classList.add('clear-filter-btn');
      clearFilterButton.addEventListener('click', () => {
        this.resetFilter();
        this.render();
      });
      
      filterIndicator.appendChild(filterText);
      filterIndicator.appendChild(clearFilterButton);
      this.container.prepend(filterIndicator);
    }
  }
  
  createEditDialog(todo) {
    // Remove any existing dialogs
    const existingDialog = document.querySelector('.dialog');
    if (existingDialog) {
      existingDialog.remove();
    }
    
    // Create dialog
    const editDialog = document.createElement('div');
    editDialog.classList.add('dialog', 'edit-dialog');
    
    // Create form elements
    const titleLabel = document.createElement('label');
    titleLabel.textContent = 'Title:';
    titleLabel.setAttribute('for', 'edit-title');
    
    const titleInput = document.createElement('input');
    titleInput.id = 'edit-title';
    titleInput.value = todo.title;
    
    const descLabel = document.createElement('label');
    descLabel.textContent = 'Description:';
    descLabel.setAttribute('for', 'edit-desc');
    
    const descInput = document.createElement('textarea');
    descInput.id = 'edit-desc';
    descInput.value = todo.description;
    
    const dateLabel = document.createElement('label');
    dateLabel.textContent = 'Date:';
    dateLabel.setAttribute('for', 'edit-date');
    
    const dateInput = document.createElement('input');
    dateInput.id = 'edit-date';
    dateInput.setAttribute('type', 'date');
    dateInput.value = todo.createdAt;
    
    // Create buttons
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('dialog-buttons');
    
    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Save';
    confirmButton.classList.add('confirm-btn');
    
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.classList.add('cancel-btn');
    
    // Assemble dialog
    editDialog.appendChild(titleLabel);
    editDialog.appendChild(titleInput);
    editDialog.appendChild(descLabel);
    editDialog.appendChild(descInput);
    editDialog.appendChild(dateLabel);
    editDialog.appendChild(dateInput);
    buttonsDiv.appendChild(confirmButton);
    buttonsDiv.appendChild(cancelButton);
    editDialog.appendChild(buttonsDiv);
    
    // Add dialog to container
    this.container.appendChild(editDialog);
    
    // Focus on title input
    titleInput.focus();
    
    // Add event listeners
    confirmButton.addEventListener('click', () => {
      const updatedData = {
        title: titleInput.value.trim(),
        description: descInput.value.trim(),
        createdAt: dateInput.value
      };
      
      if (updatedData.title && updatedData.description && updatedData.createdAt) {
        this.editTodoItem(todo.id, updatedData);
        this.container.removeChild(editDialog);
      } else {
        alert('Please fill all fields');
      }
    });
    
    cancelButton.addEventListener('click', () => {
      this.container.removeChild(editDialog);
    });
  }
}

export default TodoList;