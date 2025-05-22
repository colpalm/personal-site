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
        const xScale = canvas.dataset.chartXscale || 'category';
        const yScale = canvas.dataset.chartYscale || 'linear';
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

        // Add title if specified
        if (chartTitle) {
            options.plugins = options.plugins || {};
            options.plugins.title = {
                display: true,
                text: chartTitle
            };
        }

        // Add tooltip formatting for numeric x-axis labels
        if (chartData.labels && chartData.labels.every(label => !isNaN(Number(label)))) {
            options.plugins = options.plugins || {};
            options.plugins.tooltip = options.plugins.tooltip || {};

            // Capture labels for tooltip callback
            const labels = chartData.labels;

            options.plugins.tooltip.callbacks = {
                title: function(tooltipItems) {
                    if (tooltipItems.length > 0) {
                        const item = tooltipItems[0];
                        if (xScale === 'category') {
                            // For category scales, get the label from our data
                            const label = labels[item.dataIndex];
                            return label !== undefined ? Number(label).toLocaleString() : item.label;
                        } else {
                            // For linear/logarithmic scales, format the parsed value
                            return Number(item.parsed.x).toLocaleString();
                        }
                    }
                    return '';
                }
            };
        }

        // Configure scales
        options.scales = {};

        // X-axis configuration
        options.scales.x = {
            type: xScale,
            title: {
                display: !!chartXTitle,
                text: chartXTitle
            }
        };

        // Add number formatting for x-axis with numeric data (all scale types)
        if (chartData.labels && chartData.labels.every(label => !isNaN(Number(label)))) {
            // Capture labels in closure for category scale callback
            const labels = chartData.labels;

            options.scales.x.ticks = {
                callback: function(value, index, ticks) {

                    // For category scales, Chart.js passes the index, so we need to get the label
                    if (xScale === 'category') {
                        const label = labels[index];
                        return label !== undefined ? Number(label).toLocaleString() : value;
                    }
                    // For linear/logarithmic scales, use the value directly
                    return Number(value).toLocaleString();
                }
            };

            // Additional settings for linear scales with large numbers
            if (xScale === 'linear') {
                const numericLabels = chartData.labels.map(Number);
                const max = Math.max(...numericLabels);

                if (max >= 1000000) {
                    options.scales.x.ticks.maxTicksLimit = 5;
                    options.scales.x.ticks.stepSize = Math.ceil(max / 4);
                }
            }
        }
        // Fallback for logarithmic scales without labels (edge case)
        else if (xScale === 'logarithmic') {
            options.scales.x.ticks = {
                callback: function(value) {
                    return Number(value).toLocaleString();
                }
            };
        }

        // Y-axis configuration
        options.scales.y = {
            type: yScale,
            title: {
                display: !!chartYTitle,
                text: chartYTitle
            },
            beginAtZero: yScale === 'linear' // Only for linear scales
        };

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