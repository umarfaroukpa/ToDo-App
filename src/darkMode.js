class DarkMode {
    constructor(container) {
      this.container = document.querySelector(container);
      this.body = document.body;
      
      // Create the mode toggle button
      this.modeToggle = document.createElement('button');
      this.modeToggle.id = 'mode-toggle';
      this.modeToggle.textContent = '🌙'; // Moon icon for initial state
      
      // Check for saved preference in local storage
      const savedMode = localStorage.getItem('darkMode');
      const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // Apply dark mode if saved preference exists or user prefers dark mode
      if (savedMode === 'dark' || (savedMode === null && prefersDarkMode)) {
        this.body.classList.add('dark-mode');
        this.modeToggle.textContent = '☀️'; // Sun icon for dark mode
      } else {
        this.body.classList.add('light-mode');
        this.modeToggle.textContent = '🌙'; // Moon icon for light mode
      }
      
      // Add event listener for mode toggle
      this.modeToggle.addEventListener('click', () => {
        this.toggleMode();
      });
      
      // Append toggle button to container
      this.container.appendChild(this.modeToggle);
    }
  
    toggleMode() {
      if (this.body.classList.contains('dark-mode')) {
        this.body.classList.replace('dark-mode', 'light-mode');
        this.modeToggle.textContent = '🌙';
        localStorage.setItem('darkMode', 'light');
      } else {
        this.body.classList.replace('light-mode', 'dark-mode');
        this.modeToggle.textContent = '☀️';
        localStorage.setItem('darkMode', 'dark');
      }
      
      // Dispatch a custom event for other components to respond to theme change
      document.dispatchEvent(new CustomEvent('themeChange', {
        detail: { isDarkMode: this.body.classList.contains('dark-mode') }
      }));
    }
  }
  
  export default DarkMode;