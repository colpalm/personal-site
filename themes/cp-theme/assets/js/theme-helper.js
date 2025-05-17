/**
 * Theme helper module to centralize theme management
 */
const ThemeHelper = {
    /**
     * Initialize theme system
     * @returns {boolean} Whether dark theme is active
     */
    initialize: function() {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const currentTheme = localStorage.getItem('theme') ||
            (prefersDarkScheme.matches ? 'dark' : 'light');

        // Set initial theme
        const isDark = currentTheme === 'dark';
        if (isDark) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }

        return isDark;
    },

    /**
     * Toggle theme between light and dark
     * @returns {boolean} Whether dark theme is now active
     */
    toggleTheme: function() {
        const isDark = document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        // Dispatch a custom event that any component can listen for
        document.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { isDark }
        }));

        return isDark;
    },

    /**
     * Check if dark theme is active
     * @returns {boolean} Whether dark theme is active
     */
    isDarkTheme: function() {
        return document.body.classList.contains('dark-theme');
    },

    /**
     * Get theme colors based on current theme
     * @returns {Object} Theme colors object
     */
    getThemeColors: function() {
        // Get colors directly from CSS variables for consistency
        const style = getComputedStyle(document.body);
        return {
            text: style.getPropertyValue('--color-text').trim(),
            textSecondary: style.getPropertyValue('--color-text-secondary').trim(),
            background: style.getPropertyValue('--color-background').trim(),
            primary: style.getPropertyValue('--color-primary').trim(),
            secondary: style.getPropertyValue('--color-secondary').trim(),
            accent: style.getPropertyValue('--color-accent').trim(),
            light: style.getPropertyValue('--color-light').trim(),
            border: style.getPropertyValue('--color-border').trim(),
            grid: style.getPropertyValue('--color-border').trim()
        };
    }
};

// Export the helper for use in other modules
export default ThemeHelper;