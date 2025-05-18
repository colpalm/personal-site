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

        // Set the initial theme
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

        // Get all theme colors from CSS variables
        return {
            // Base theme colors
            text: style.getPropertyValue('--color-text').trim(),
            textSecondary: style.getPropertyValue('--color-text-secondary').trim(),
            background: style.getPropertyValue('--color-background').trim(),
            primary: style.getPropertyValue('--color-primary').trim(),
            secondary: style.getPropertyValue('--color-secondary').trim(),
            accent: style.getPropertyValue('--color-accent').trim(),
            sectionBackground: style.getPropertyValue('--color-section-background').trim(),
            border: style.getPropertyValue('--color-border').trim(),

            // Chart-specific colors
            chartGrid: style.getPropertyValue('--chart-grid').trim(),
            chartText: style.getPropertyValue('--chart-text').trim(),
            chartTitle: style.getPropertyValue('--chart-title').trim(),
            chartTicks: style.getPropertyValue('--chart-ticks').trim(),
            chartTooltipBg: style.getPropertyValue('--chart-tooltip-bg').trim(),
            chartTooltipTitle: style.getPropertyValue('--chart-tooltip-title').trim(),
            chartTooltipBody: style.getPropertyValue('--chart-tooltip-body').trim(),
            chartBgOpacity: parseFloat(style.getPropertyValue('--chart-bg-opacity').trim())
        };
    },

    /**
     * Helper function to convert hex to rgba
     * @param {string} hex - Hex color code
     * @param {number} alpha - Alpha transparency value
     * @returns {string} RGBA color string
     */
    hexToRgba: function(hex, alpha = 1) {
        hex = hex.replace('#', '');

        // Handle shorthand hex format (e.g., #FFF)
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }

        // Parse the hex values
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        // Return rgba format
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    },

    /**
     * Generate chart color palette based on current theme
     * @returns {Array} Array of color objects for chart datasets
     */
    getChartColorPalette: function() {
        const colors = this.getThemeColors();
        const bgOpacity = colors.chartBgOpacity || 0.7; // Fallback if CSS variable not available

        return [
            {
                backgroundColor: this.hexToRgba(colors.primary, bgOpacity),
                borderColor: this.hexToRgba(colors.primary, 1)
            },
            {
                backgroundColor: this.hexToRgba(colors.accent, bgOpacity),
                borderColor: this.hexToRgba(colors.accent, 1)
            },
            {
                backgroundColor: this.hexToRgba(colors.secondary, bgOpacity),
                borderColor: this.hexToRgba(colors.secondary, 1)
            },
            {
                backgroundColor: this.hexToRgba(colors.textSecondary, bgOpacity),
                borderColor: this.hexToRgba(colors.textSecondary, 1)
            },
            // Create a fifth color by mixing primary and accent
            {
                backgroundColor: this.hexToRgba(colors.primary, bgOpacity - 0.1),
                borderColor: this.hexToRgba(colors.accent, 0.9)
            }
        ];
    },

    /**
     * Apply theme colors to chart datasets based on chart type
     * @param {Array} datasets - Chart datasets array
     * @param {string} chartType - Type of chart (bar, line, pie, etc.)
     * @param {boolean} useDefaultColors - Whether to apply default theme colors
     */
    applyChartDatasetColors: function(datasets, chartType, useDefaultColors = true) {
        if (!useDefaultColors || !datasets || !datasets.length) return;

        // Get chart color palette
        const palette = this.getChartColorPalette();

        datasets.forEach((dataset, index) => {
            const paletteIndex = index % palette.length;
            const paletteColor = palette[paletteIndex];

            // Handle different chart types
            switch (chartType) {
                case 'line':
                    this._applyLineChartColors(dataset, paletteColor);
                    break;
                case 'pie':
                case 'doughnut':
                    this._applyPieChartColors(dataset, paletteColor);
                    break;
                default:
                    this._applyDefaultChartColors(dataset, paletteColor, chartType);
            }
        });

        return datasets;
    },

    /**
     * Apply colors for line charts
     * @private
     * @param {Object} dataset - Chart dataset
     * @param {Object} paletteColor - Color from palette
     */
    _applyLineChartColors: function(dataset, paletteColor) {
        // Line charts typically use borderColor for the line
        if (!dataset.borderColor) dataset.borderColor = paletteColor.borderColor;
        if (!dataset.backgroundColor && !dataset.fill) dataset.backgroundColor = 'transparent';

        // Set point colors if not already set
        if (!dataset.pointBackgroundColor) dataset.pointBackgroundColor = paletteColor.borderColor;
        if (!dataset.pointBorderColor) dataset.pointBorderColor = paletteColor.borderColor;
    },

    /**
     * Apply colors for pie/doughnut charts
     * @private
     * @param {Object} dataset - Chart dataset
     * @param {Array} palette - Full color palette
     */
    _applyPieChartColors: function(dataset, palette) {
        // Pie/doughnut charts use arrays of colors for segments
        if (!dataset.backgroundColor) {
            dataset.backgroundColor = palette.map(color => color.backgroundColor);
        }
        if (!dataset.borderColor) {
            dataset.borderColor = palette.map(color => color.borderColor);
        }
    },

    /**
     * Apply colors for bar and other chart types
     * @private
     * @param {Object} dataset - Chart dataset
     * @param {string} chartType - Type of chart
     * @param {Object} paletteColor - Color from palette
     */
    _applyDefaultChartColors: function(dataset, paletteColor, chartType) {
        const isArrayOfData = Array.isArray(dataset.data);

        // Handle background color
        if (!dataset.backgroundColor) {
            if (isArrayOfData && chartType === 'bar') {
                // If it's a bar chart with multiple data points, repeat the same color
                dataset.backgroundColor = Array(dataset.data.length).fill(paletteColor.backgroundColor);
            } else {
                // Single color for the whole dataset
                dataset.backgroundColor = paletteColor.backgroundColor;
            }
        }

        // Handle border color (applied even if backgroundColor was already set)
        if (!dataset.borderColor) {
            if (isArrayOfData && chartType === 'bar') {
                dataset.borderColor = Array(dataset.data.length).fill(paletteColor.borderColor);
            } else {
                dataset.borderColor = paletteColor.borderColor;
            }
        }
    },

    /**
     * Apply theme colors to chart axis and other options
     * @param {Object} options - Chart options object
     */
    applyChartOptionsColors: function(options) {
        if (!options) return options;

        const colors = this.getThemeColors();

        // Apply theme-based colors to scales
        if (options.scales) {
            this._applyScaleColors(options.scales, colors);
        }

        // Apply plugin colors (title, legend, tooltip)
        if (options.plugins) {
            this._applyPluginColors(options.plugins, colors);
        }

        return options;
    },

    /**
     * Apply colors to chart scales (axes)
     * @private
     * @param {Object} scales - Chart scales object
     * @param {Object} colors - Theme colors
     */
    _applyScaleColors: function(scales, colors) {
        // Handle common scale types
        const axisTypes = ['x', 'y', 'r'];

        axisTypes.forEach(axisType => {
            if (scales[axisType]) {
                let axis = scales[axisType];
                // Apply tick colors
                if (!axis.ticks) axis.ticks = {};
                axis.ticks.color = colors.chartTicks;

                // Apply grid colors
                if (!axis.grid) axis.grid = {};
                axis.grid.color = colors.chartGrid;

                // Apply title colors if present
                if (axis.title) {
                    axis.title.color = colors.chartText;
                }

                // Special handling for radar charts
                if (axisType === 'r' && axis.pointLabels) {
                    axis.pointLabels.color = colors.chartText;
                }
            }
        });
    },

    /**
     * Apply colors to chart plugins (title, legend, tooltip)
     * @private
     * @param {Object} plugins - Chart plugins object
     * @param {Object} colors - Theme colors
     */
    _applyPluginColors: function(plugins, colors) {
        // Title plugin
        if (plugins.title) {
            plugins.title.color = colors.chartTitle;
        }

        // Legend plugin
        if (plugins.legend) {
            if (!plugins.legend.labels) plugins.legend.labels = {};
            plugins.legend.labels.color = colors.chartText;
        }

        // Tooltip plugin
        if (plugins.tooltip) {
            if (!plugins.tooltip.backgroundColor) {
                plugins.tooltip.backgroundColor = colors.chartTooltipBg;
            }

            if (!plugins.tooltip.titleColor) {
                plugins.tooltip.titleColor = colors.chartTooltipTitle;
            }

            if (!plugins.tooltip.bodyColor) {
                plugins.tooltip.bodyColor = colors.chartTooltipBody;
            }
        }
    },
};

// Export the helper for use in other modules
export default ThemeHelper;