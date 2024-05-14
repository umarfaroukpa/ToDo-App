import _ from 'lodash';
import './style.css';
import TodoList from './todoList';
import AddTodo from './addTodo';
import CustomLocalStorage from './localstorage';
import DarkMode from './darkMode';

// Initialize components
const todoList = new TodoList('#todo-list-container'); // Create an instance of TodoList
const addTodo = new AddTodo('#sidebar-container', todoList.addTodoItem.bind(todoList), todoList.todos);

const darkModeComponent = new DarkMode('#mode-toggle');

// Toggle dark/light mode when the page loads
darkModeComponent.toggleMode();

// Render components
todoList.render(); // Render TodoList first
addTodo.render(); // Render AddTodo after creating the instance
