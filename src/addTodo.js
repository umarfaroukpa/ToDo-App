class AddTodo {
  constructor(container, onAddTodo, todos) {
    this.container = document.querySelector(container);
    this.onAddTodo = onAddTodo;
    this.todos = todos;
    this.dialog = null;
  }

  render() {
    // Create sidebar container
    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');

    // Create add todo button
    const addButton = document.createElement('button');
    addButton.classList.add('btnAdd');
    addButton.innerHTML = '<span>➕</span> Add Todo';
    sidebar.appendChild(addButton);

    // Create filter buttons with icons
    const todayButton = document.createElement('button');
    todayButton.innerHTML = '<span>📅</span> Today';
    todayButton.classList.add('today');
    sidebar.appendChild(todayButton);

    const sevenDaysButton = document.createElement('button');
    sevenDaysButton.innerHTML = '<span>📆</span> 7 Days';
    sevenDaysButton.classList.add('seven');
    sidebar.appendChild(sevenDaysButton);

    // Create a filter for completed todos
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<span>✓</span> Completed';
    completedButton.classList.add('filter-btn', 'completed-btn');
    sidebar.appendChild(completedButton);

    // Create a filter for active todos
    const activeButton = document.createElement('button');
    activeButton.innerHTML = '<span>⭐</span> Active';
    activeButton.classList.add('filter-btn', 'active-btn');
    sidebar.appendChild(activeButton);

    // Create a show all button
    const allButton = document.createElement('button');
    allButton.innerHTML = '<span>📋</span> All Todos';
    allButton.classList.add('filter-btn', 'all-btn');
    sidebar.appendChild(allButton);

    // Append sidebar to container
    this.container.appendChild(sidebar);

    // Add event listeners
    addButton.addEventListener('click', () => {
      this.openAddTodoDialog();
    });

    todayButton.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('filterTodos', { detail: { filter: 'today' } }));
    });

    sevenDaysButton.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('filterTodos', { detail: { filter: 'sevenDays' } }));
    });

    completedButton.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('filterTodos', { detail: { filter: 'completed' } }));
    });

    activeButton.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('filterTodos', { detail: { filter: 'active' } }));
    });

    allButton.addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('filterTodos', { detail: { filter: 'all' } }));
    });
  }

  openAddTodoDialog() {
    // Remove any existing dialog
    if (this.dialog) {
      this.container.removeChild(this.dialog);
      this.dialog = null;
    }

    // Create dialog
    this.dialog = document.createElement('div');
    this.dialog.classList.add('dialog', 'add-dialog');

    // Create dialog header
    const dialogHeader = document.createElement('div');
    dialogHeader.classList.add('dialog-header');
    dialogHeader.textContent = 'Add New Todo';
    this.dialog.appendChild(dialogHeader);

    // Create form
    const form = document.createElement('form');
    form.classList.add('add-todo-form');
    form.addEventListener('submit', (e) => e.preventDefault());

    // Create title input group
    const titleGroup = document.createElement('div');
    titleGroup.classList.add('form-group');
    
    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'todo-title');
    titleLabel.textContent = 'Title:';
    
    const titleInput = document.createElement('input');
    titleInput.id = 'todo-title';
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('placeholder', 'Enter todo title');
    titleInput.required = true;
    
    titleGroup.appendChild(titleLabel);
    titleGroup.appendChild(titleInput);
    form.appendChild(titleGroup);

    // Create description input group
    const descGroup = document.createElement('div');
    descGroup.classList.add('form-group');
    
    const descLabel = document.createElement('label');
    descLabel.setAttribute('for', 'todo-desc');
    descLabel.textContent = 'Description:';
    
    const descInput = document.createElement('textarea');
    descInput.id = 'todo-desc';
    descInput.setAttribute('placeholder', 'Enter todo description');
    descInput.required = true;
    
    descGroup.appendChild(descLabel);
    descGroup.appendChild(descInput);
    form.appendChild(descGroup);

    // Create date input group
    const dateGroup = document.createElement('div');
    dateGroup.classList.add('form-group');
    
    const dateLabel = document.createElement('label');
    dateLabel.setAttribute('for', 'todo-date');
    dateLabel.textContent = 'Date:';
    
    const dateInput = document.createElement('input');
    dateInput.id = 'todo-date';
    dateInput.setAttribute('type', 'date');
    dateInput.value = new Date().toISOString().slice(0, 10); // Set default to today
    dateInput.required = true;
    
    dateGroup.appendChild(dateLabel);
    dateGroup.appendChild(dateInput);
    form.appendChild(dateGroup);

    // Create buttons group
    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('button-group');
    
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Todo';
    addButton.classList.add('add-btn');
    addButton.setAttribute('type', 'submit');
    
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.classList.add('cancel-btn');
    cancelButton.setAttribute('type', 'button');
    
    buttonGroup.appendChild(addButton);
    buttonGroup.appendChild(cancelButton);
    form.appendChild(buttonGroup);

    // Add form to dialog
    this.dialog.appendChild(form);

    // Add dialog to container
    this.container.appendChild(this.dialog);

    // Focus on title input
    titleInput.focus();

    // Add event listeners
    addButton.addEventListener('click', () => {
      const title = titleInput.value.trim();
      const description = descInput.value.trim();
      const date = dateInput.value;

      if (title && description && date) {
        this.onAddTodo(title, description, date);
        this.closeDialog();
      } else {
        alert('Please fill in all fields');
      }
    });

    cancelButton.addEventListener('click', () => {
      this.closeDialog();
    });

    // Close dialog when clicking outside
    document.addEventListener('click', this.handleOutsideClick = (e) => {
      if (!this.dialog.contains(e.target) && !e.target.closest('.btnAdd')) {
        this.closeDialog();
      }
    });
  }

  closeDialog() {
    if (this.dialog && this.dialog.parentNode === this.container) {
      this.container.removeChild(this.dialog);
      this.dialog = null;
      document.removeEventListener('click', this.handleOutsideClick);
    }
  }
}

export default AddTodo;