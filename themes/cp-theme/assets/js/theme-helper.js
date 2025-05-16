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
        const isDark = this.isDarkTheme();
        return {
            text: isDark ? '#F0F0F0' : '#2A2A2A',
            textSecondary: isDark ? '#AAA' : '#666',
            background: isDark ? '#222' : '#FCFCFC',
            primary: isDark ? '#9DB8AA' : '#86A397',
            secondary: isDark ? '#E8D7C3' : '#D9C8B4',
            accent: isDark ? '#F1C470' : '#E4B363',
            light: isDark ? '#333' : '#F5F1E9',
            border: isDark ? '#444' : '#E2DDD5',
            grid: isDark ? '#444' : '#E2DDD5'
        };
    }
};

// Export the helper for use in other modules
export default ThemeHelper;