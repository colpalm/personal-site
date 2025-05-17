import ThemeHelper from './theme-helper.js';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts with the current theme
    updateChartsForTheme(ThemeHelper.isDarkTheme());

    // Listen for theme changes
    document.addEventListener('themeChanged', function(event) {
        const isDark = event.detail.isDark;
        updateChartsForTheme(isDark);
    });

    // Function to update charts when the theme changes
    function updateChartsForTheme(isDark) {
        // Get all chart canvases
        const chartCanvases = document.querySelectorAll('canvas[id^="chart-"]');
        if (chartCanvases.length === 0) return; // No charts on the page

        // Update each chart with new theme colors
        chartCanvases.forEach(canvas => {
            const chartInstance = Chart.getChart(canvas.id);
            if (!chartInstance) return; // Skip if no chart instance found

            // Update dataset colors based on chart type
            if (chartInstance.data && chartInstance.data.datasets) {
                ThemeHelper.applyChartDatasetColors(
                    chartInstance.data.datasets,
                    chartInstance.config.type,
                    true
                );
            }

            // Update chart options (axes, title, legend)
            if (chartInstance.options) {
                ThemeHelper.applyChartOptionsColors(chartInstance.options);
            }

            // Apply the updates
            chartInstance.update();
        });
    }
});