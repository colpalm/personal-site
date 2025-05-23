import ThemeHelper from './theme-helper.js';

// Make ThemeHelper available globally for use in inline scripts (e.g. chart shortcode)
window.ThemeHelper = ThemeHelper;

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.querySelector('.theme-toggle');

    // Initialize theme from ThemeHelper
    const isDark = ThemeHelper.initialize();
    updateThemeIcon(isDark);

    // Toggle theme when clicked
    themeToggle.addEventListener('click', function() {
        const isDark = ThemeHelper.toggleTheme();
        updateThemeIcon(isDark);
    });

    // Update the icon based on the current theme
    function updateThemeIcon(isDark) {
        if (isDark) {
            // When in dark mode, show the sun icon (indicating "click for light mode")
            themeToggle.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
            `;
        } else {
            // When in light mode, show the moon icon (indicating "click for dark mode")
            themeToggle.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            `;
        }
    }

    // Simple search icon click handler (placeholder for actual search functionality)
    const searchIcon = document.querySelector('.search-icon');
    searchIcon.addEventListener('click', function() {
        // This is a placeholder - TODO: add search functionality
        alert('Search functionality coming soon.');
    });

    // Initialize any pending charts
    if (window.initializePendingCharts) {
        window.initializePendingCharts();
    }
});