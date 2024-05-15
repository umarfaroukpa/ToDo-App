import CustomLocalStorage from './localstorage';
class TodoList {
  constructor(container) {
    this.container = document.querySelector(container);
    this.todos = [];
    this.localStorage = new CustomLocalStorage();
    this.loadTodosFromLocalStorage();
  }

  loadTodosFromLocalStorage() {
    this.todos = this.localStorage.getTodos();
  }

  addTodoItem(title, description, date = null) {
    const currentDate = date ? new Date(date) : new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);
    const newTodo = { title, description, completed: false, createdAt: formattedDate };

    this.todos.push(newTodo);
    this.localStorage.saveTodos(this.todos);
    this.render();
  }

  removeTodoItem(index) {
    this.todos.splice(index, 1);
    this.localStorage.saveTodos(this.todos);
    this.render();
  }

  render() {
    this.container.innerHTML = '';
    const ul = document.createElement('ul');

    this.todos.forEach((todo, index) => {
      const li = document.createElement('li');
      const checkBox = document.createElement('input');
      checkBox.setAttribute('type', 'checkbox');
      checkBox.classList.add('btn-check')
      checkBox.checked = todo.completed;
      const titleSpan = document.createElement('span');
      titleSpan.classList.add('todo-title');
      const descriptionSpan = document.createElement('span');
      descriptionSpan.classList.add('todo-description');
      const deleteButton = document.createElement('button');
      const editButton = document.createElement('button');
      const createdDateSpan = document.createElement('span');
      createdDateSpan.textContent = `${todo.createdAt}`;
      createdDateSpan.classList.add('todo-date');
      editButton.textContent = 'Edit';
      editButton.classList.add('btn-edit')
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('dlt-btn')
      titleSpan.textContent = todo.title;
      descriptionSpan.textContent = todo.description; 

     // Apply completed status to the list item
    if (todo.completed) {
      li.style.textDecoration = 'line-through';
      checkBox.checked = true;
    }

      li.appendChild(checkBox);
      li.appendChild(titleSpan);
      li.appendChild(document.createElement('br'));
      li.appendChild(descriptionSpan);
      li.appendChild(createdDateSpan);
      li.appendChild(deleteButton);
      li.appendChild(editButton);
      ul.appendChild(li);

      deleteButton.addEventListener('click', () => {
        this.removeTodoItem(index);
      });

      // Event listener for edit button
      editButton.addEventListener('click', () => {
        // Create dialog box
        const editDialog = document.createElement('div');
        editDialog.classList.add('dialog');

        // Title input field prepopulated with current title
        const titleInput = document.createElement('input');
        titleInput.setAttribute('type', 'text');
        titleInput.value = todo.title;
        editDialog.appendChild(titleInput);

        // Description input field prepopulated with current description
        const descriptionInput = document.createElement('textarea');
        descriptionInput.setAttribute('type', 'text');
        descriptionInput.value = todo.description;
        editDialog.appendChild(descriptionInput);

        // Add confirm button
        const confirmButton = document.createElement('button');
        confirmButton.textContent = 'Confirm';
        editDialog.appendChild(confirmButton);

        // Add cancel button
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        editDialog.appendChild(cancelButton);

        // Append dialog to container
        this.container.appendChild(editDialog);

        // Function to handle removal of edit dialog
        const removeEditDialog = () => {
          // Check if editDialog exists and if it's a child of the container before removing it
          if (editDialog && editDialog.parentNode === this.container) {
            this.container.removeChild(editDialog); // Remove the edit dialog
          }
        };

        // Event listener for cancel button
        cancelButton.addEventListener('click', () => {
          removeEditDialog();
        });

        // Event listener for confirm button
        confirmButton.addEventListener('click', () => {
          // Your logic for handling the edited version
          // For example, updating the todo item with the new title and description
          const newTitle = titleInput.value;
          const newDescription = descriptionInput.value;
          this.todos[index].title = newTitle;
          this.todos[index].description = newDescription;
          // Render the updated todo list
          this.render();
          // Remove the edit dialog
          removeEditDialog();
        });
      });
      // Event listener for checkbox change
      checkBox.addEventListener('change', () => {
        // Toggle the completed status of the todo item
        this.todos[index].completed = checkBox.checked;

        this.localStorage.saveTodos(this.todos)
        // Re-render the todo list to reflect the changes
        this.render();
    });
    });

    this.container.appendChild(ul);
  }
}

export default TodoList;