import _ from 'lodash';
import './style.css';
import TodoList from './todoList';
import AddTodo from './addTodo';
import CustomLocalStorage from './localstorage';
import DarkMode from './darkMode';

document.addEventListener('DOMContentLoaded', () => {
  // Create app structure
  const appContainer = document.createElement('div');
  appContainer.classList.add('app-container');
  document.body.appendChild(appContainer);
  
  // Create header
  const header = document.createElement('header');
  const appTitle = document.createElement('h1');
  appTitle.textContent = 'Todo List App';
  header.appendChild(appTitle);
  
  // Create mode toggle container
  const modeToggleContainer = document.createElement('div');
  modeToggleContainer.id = 'mode-toggle';
  header.appendChild(modeToggleContainer);
  
  document.body.prepend(header);
  
  // Create sidebar container
  const sidebarContainer = document.createElement('div');
  sidebarContainer.id = 'sidebar-container';
  appContainer.appendChild(sidebarContainer);
  
  // Create todo list container
  const todoListContainer = document.createElement('div');
  todoListContainer.id = 'todo-list-container';
  appContainer.appendChild(todoListContainer);
  
  // Initialize dark mode
  const darkModeComponent = new DarkMode('#mode-toggle');
  
  // Initialize todo list component
  const todoList = new TodoList('#todo-list-container');
  
  // Initialize add todo component
  const addTodo = new AddTodo('#sidebar-container', todoList.addTodoItem.bind(todoList), todoList.todos);
  
  // Render components
  todoList.render();
  addTodo.render();
  
  // Set up event listeners for filter actions
  document.addEventListener('filterTodos', (e) => {
    const { filter } = e.detail;
    
    switch (filter) {
      case 'today':
        todoList.filterTodosForToday();
        break;
      case 'sevenDays':
        todoList.filterTodosForLastSevenDays();
        break;
      case 'completed':
        todoList.filteredTodos = todoList.todos.filter(todo => todo.completed);
        todoList.render();
        break;
      case 'active':
        todoList.filteredTodos = todoList.todos.filter(todo => !todo.completed);
        todoList.render();
        break;
      case 'all':
        todoList.resetFilter();
        todoList.render();
        break;
      default:
        break;
    }
  });
});