class DarkMode {
    constructor(container) {
        this.container = document.querySelector(container);
        this.body = document.body;
        this.modeToggle = document.createElement('button');
        this.modeToggle.textContent = 'DarkMode';
        this.modeToggle.classList.add('toggle-button');
        this.modeToggle.addEventListener('click', () => {
            this.toggleMode();
        });
        this.container.appendChild(this.modeToggle);

        // Initially set the default mode to light mode
        this.body.classList.add('light-mode');
        
        // Toggle mode to ensure default mode is applied
        this.toggleMode();

        // Other elements to be affected by dark/light mode
        this.header = document.querySelector('header');
        this.sidebar = document.querySelector('#sidebar-container');
    }

    toggleMode() {
        // Toggle mode on body
        this.body.classList.toggle('dark-mode');
        this.body.classList.toggle('light-mode');

        // Toggle mode on header
        if (this.header) {
            this.header.classList.toggle('dark-mode');
            this.header.classList.toggle('light-mode');
        }

        // Toggle mode on sidebar
        if (this.sidebar) {
            this.sidebar.classList.toggle('dark-mode');
            this.sidebar.classList.toggle('light-mode');
        }
    }
}

export default DarkMode;

