
import ThemeHelper from './theme-helper.js';

document.addEventListener('DOMContentLoaded', function() {
    // Expose ThemeHelper globally for use by shortcodes
    window.ThemeHelper = ThemeHelper;

    // Set up Chart.js global defaults using CSS variables
    configureChartDefaults();

    // Helper functions that may be needed by inline scripts
    window.applyChartColors = function(datasets, chartType) {
        if (window.ThemeHelper && datasets && datasets.length > 0) {
            return window.ThemeHelper.applyChartDatasetColors(datasets, chartType || 'line', true);
        }
        return datasets;
    };

    window.applyChartOptions = function(options) {
        if (window.ThemeHelper && options) {
            return window.ThemeHelper.applyChartOptionsColors(options);
        }
        return options;
    };

    // Initialize charts with data attributes
    initializeDataAttributeCharts();

    // Listen for theme changes
    document.addEventListener('themeChanged', function(event) {
        const isDark = event.detail.isDark;

        // Update global defaults when the theme changes
        configureChartDefaults();

        // Update existing charts
        updateChartsForTheme(isDark);
    });
});

/**
 * Configure Chart.js global defaults using CSS variables
 */
function configureChartDefaults() {
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded');
        return;
    }

    const style = getComputedStyle(document.body);
    const chartText = style.getPropertyValue('--chart-text').trim();
    const chartGrid = style.getPropertyValue('--chart-grid').trim();
    const chartTitle = style.getPropertyValue('--chart-title').trim();
    const chartTicks = style.getPropertyValue('--chart-ticks').trim();
    const chartTooltipBg = style.getPropertyValue('--chart-tooltip-bg').trim();
    const chartTooltipTitle = style.getPropertyValue('--chart-tooltip-title').trim();
    const chartTooltipBody = style.getPropertyValue('--chart-tooltip-body').trim();

    // Set global defaults
    Chart.defaults.color = chartText;
    Chart.defaults.borderColor = chartGrid;
    Chart.defaults.font.family = style.fontFamily;

    // Scale defaults
    Chart.defaults.scales.x = Chart.defaults.scales.x || {};
    Chart.defaults.scales.x.grid = {
        color: chartGrid,
        borderColor: chartGrid
    };
    Chart.defaults.scales.x.ticks = {
        color: chartTicks
    };

    Chart.defaults.scales.y = Chart.defaults.scales.y || {};
    Chart.defaults.scales.y.grid = {
        color: chartGrid,
        borderColor: chartGrid
    };
    Chart.defaults.scales.y.ticks = {
        color: chartTicks
    };

    // Plugin defaults
    Chart.defaults.plugins.title = Chart.defaults.plugins.title || {};
    Chart.defaults.plugins.title.color = chartTitle;

    Chart.defaults.plugins.tooltip = Chart.defaults.plugins.tooltip || {};
    Chart.defaults.plugins.tooltip.backgroundColor = chartTooltipBg;
    Chart.defaults.plugins.tooltip.titleColor = chartTooltipTitle;
    Chart.defaults.plugins.tooltip.bodyColor = chartTooltipBody;
    Chart.defaults.plugins.tooltip.borderColor = chartGrid;
    Chart.defaults.plugins.tooltip.borderWidth = 1;

    Chart.defaults.plugins.legend = Chart.defaults.plugins.legend || {};
    Chart.defaults.plugins.legend.labels = Chart.defaults.plugins.legend.labels || {};
    Chart.defaults.plugins.legend.labels.color = chartText;
}

/**
 * Initialize charts that use data attributes
 */
function initializeDataAttributeCharts() {
    document.querySelectorAll('canvas[data-chart-type]').forEach(canvas => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const chartId = canvas.id;
        const chartType = canvas.dataset.chartType;
        const chartTitle = canvas.dataset.chartTitle || '';
        const chartXTitle = canvas.dataset.chartXtitle || '';
        const chartYTitle = canvas.dataset.chartYtitle || '';
        const rawDataString = canvas.dataset.chartRawdata;

        let chartData;
        try {
            chartData = JSON.parse(rawDataString);
        } catch (e) {
            console.error('Failed to parse chart data for chart ID:', chartId, e);
            return;
        }

        // Only specify what we need, let defaults handle the rest
        const options = {
            responsive: true,
            maintainAspectRatio: false
        };

        // Only add what's necessary
        if (chartTitle) {
            options.plugins = options.plugins || {};
            options.plugins.title = {
                display: true,
                text: chartTitle
            };
        }

        // Only configure axes if we have titles
        if (chartXTitle || chartYTitle) {
            options.scales = {};

            if (chartXTitle) {
                options.scales.x = {
                    title: {
                        display: true,
                        text: chartXTitle
                    },
                    ticks: {
                        callback: function(value) {
                            if (typeof value === 'string' && !isNaN(parseInt(value))) {
                                return parseInt(value).toLocaleString();
                            }
                            return value;
                        }
                    }
                };
            }

            if (chartYTitle) {
                options.scales.y = {
                    title: {
                        display: true,
                        text: chartYTitle
                    },
                    beginAtZero: true
                };
            }
        }

        // Apply theme colors to datasets
        if (chartData.datasets) {
            window.applyChartColors(chartData.datasets, chartType);
        }

        // Create the chart
        new Chart(ctx, {
            type: chartType,
            data: chartData,
            options: options
        });
    });
}

/**
 * Update existing charts for theme changes
 */
function updateChartsForTheme(isDark) {
    const chartCanvases = document.querySelectorAll('canvas[id]');
    if (chartCanvases.length === 0) return;

    chartCanvases.forEach(canvas => {
        const chartInstance = Chart.getChart(canvas.id);
        if (!chartInstance) return;

        if (chartInstance.data && chartInstance.data.datasets) {
            ThemeHelper.applyChartDatasetColors(
                chartInstance.data.datasets,
                chartInstance.config.type,
                true
            );
        }

        chartInstance.update();
    });
}