class AddTodo {
  constructor(container, onAddTodo, todos) {
    this.container = document.querySelector(container);
    this.onAddTodo = onAddTodo;
    this.todos = todos;
  }

  render() {
    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');

    const addButton = document.createElement('button');
    addButton.classList.add('btnAdd')
    addButton.textContent = 'Add Todo';
    sidebar.appendChild(addButton);

    // Today's Project button
    const todayProjectButton = document.createElement('button');
    todayProjectButton.textContent = "Today";
    todayProjectButton.classList.add('today')
    sidebar.appendChild(todayProjectButton);

    // Last Seven Days button
    const lastSevenDaysButton = document.createElement('button');
    lastSevenDaysButton.textContent = '7 Days';
    lastSevenDaysButton.classList.add('seven')
    sidebar.appendChild(lastSevenDaysButton);

    // Event listener for add button
    addButton.addEventListener('click', () => {
      // Create dialog box
      const dialog = document.createElement('div');
      dialog.classList.add('dialog');

      // Title input
      const titleLabel = document.createElement('label');
      titleLabel.textContent = 'Title:';
      const titleInput = document.createElement('input');
      titleInput.setAttribute('type', 'text');
      dialog.appendChild(titleLabel);
      dialog.appendChild(titleInput);

      // Description input
      const descriptionLabel = document.createElement('label');
      descriptionLabel.textContent = 'Description:';
      const descriptionInput = document.createElement('textarea');
      descriptionInput.setAttribute('type', 'textArea');
      dialog.appendChild(descriptionLabel);
      dialog.appendChild(descriptionInput);

      // Date input
      const dateLabel = document.createElement('label');
      dateLabel.textContent = 'Date:';
      const dateInput = document.createElement('input');
      dateInput.setAttribute('type', 'date');
      dialog.appendChild(dateLabel);
      dialog.appendChild(dateInput);

      // Add button
      const addButton = document.createElement('button');
      addButton.textContent = 'Add';
      dialog.appendChild(addButton);

      // Cancel button
      const cancelButton = document.createElement('button');
      cancelButton.textContent = 'Cancel';
      dialog.appendChild(cancelButton);

      // Append dialog to container
      this.container.appendChild(dialog);

      // Event listener for add button
      addButton.addEventListener('click', () => {
        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        const date = dateInput.value;

        if (title && description && date) {
          // Corrected: Pass an object containing todo details to the onAddTodo function
          this.onAddTodo(title, description, date);
          this.container.removeChild(dialog);
        }
      });

      // Event listener for cancel button
      cancelButton.addEventListener('click', () => {
        this.container.removeChild(dialog);
      });
    });

    // Event listener for today's project button
    todayProjectButton.addEventListener('click', () => {
      const today = new Date();
      const formattedToday = today.toISOString().slice(0, 10);
      const todayTasks = this.todos.filter(todo => todo.createdAt === formattedToday);
      console.log(todayTasks);
    });

    lastSevenDaysButton.addEventListener('click', () => {
      // Get the current date
      const currentDate = new Date();
  
      // Calculate the date seven days ago
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(currentDate.getDate() - 7);
  
      // Check if there are any todos created within the last seven days
      const lastSevenDaysTasksExist = this.todos.some(todo => {
          const todoDate = new Date(todo.createdAt);
          return todoDate >= sevenDaysAgo && todoDate <= currentDate;
      });
  
      // Display an alert if there are no records for the last seven days
      if (!lastSevenDaysTasksExist) {
          window.alert('No Todos Records For The Last Seven Days');
      } else {
          // Filter tasks created within the last seven days
          const lastSevenDaysTasks = this.todos.filter(todo => {
              const todoDate = new Date(todo.createdAt);
              return todoDate >= sevenDaysAgo && todoDate <= currentDate;
          });
  
          console.log(lastSevenDaysTasks);
      }
  });
  
  

    // Append sidebar to container
    this.container.appendChild(sidebar);
  }
}

export default AddTodo;
