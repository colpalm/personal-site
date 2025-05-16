import ThemeHelper from './theme-helper.js';

document.addEventListener('DOMContentLoaded', function() {
    // Listen for theme changes
    document.addEventListener('themeChanged', function(event) {
        const isDark = event.detail.isDark;
        updateChartsForTheme(isDark);
    });

    // Function to update charts when theme changes
    function updateChartsForTheme(isDark) {
        // Get all chart canvases
        const chartCanvases = document.querySelectorAll('canvas[id^="chart-"]');
        if (chartCanvases.length === 0) return; // No charts on page

        // Get theme colors
        const colors = ThemeHelper.getThemeColors();

        // Update each chart with new theme colors
        chartCanvases.forEach(canvas => {
            const chartInstance = Chart.getChart(canvas.id);
            if (!chartInstance) return; // Skip if no chart instance found

            // Update options with new theme colors
            if (chartInstance.options.scales) {
                // X-axis
                if (chartInstance.options.scales.x) {
                    if (!chartInstance.options.scales.x.ticks) chartInstance.options.scales.x.ticks = {};
                    chartInstance.options.scales.x.ticks.color = colors.text;
                    if (!chartInstance.options.scales.x.grid) chartInstance.options.scales.x.grid = {};
                    chartInstance.options.scales.x.grid.color = colors.grid;
                }

                // Y-axis
                if (chartInstance.options.scales.y) {
                    if (!chartInstance.options.scales.y.ticks) chartInstance.options.scales.y.ticks = {};
                    chartInstance.options.scales.y.ticks.color = colors.text;
                    if (!chartInstance.options.scales.y.grid) chartInstance.options.scales.y.grid = {};
                    chartInstance.options.scales.y.grid.color = colors.grid;
                }

                // Radar charts have r scale
                if (chartInstance.options.scales.r) {
                    if (!chartInstance.options.scales.r.ticks) chartInstance.options.scales.r.ticks = {};
                    chartInstance.options.scales.r.ticks.color = colors.text;
                    if (!chartInstance.options.scales.r.grid) chartInstance.options.scales.r.grid = {};
                    chartInstance.options.scales.r.grid.color = colors.grid;
                }
            }

            // Update title color
            if (chartInstance.options.plugins && chartInstance.options.plugins.title) {
                chartInstance.options.plugins.title.color = colors.text;
            }

            // Update legend colors
            if (chartInstance.options.plugins && chartInstance.options.plugins.legend) {
                if (!chartInstance.options.plugins.legend.labels)
                    chartInstance.options.plugins.legend.labels = {};
                chartInstance.options.plugins.legend.labels.color = colors.text;
            }

            // Apply the updates
            chartInstance.update();
        });
    }
});