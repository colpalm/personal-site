document.addEventListener('DOMContentLoaded', () => {
    const lightLink = document.getElementById('syntax-light-css');
    const darkLink  = document.getElementById('syntax-dark-css');

    // Flip on/off
    function setDark(on) {
        lightLink.disabled = on;
        darkLink.disabled  = !on;
    }

    // Function to check if the site is in dark mode
    function isDarkMode() {
        // Check if body has dark-theme class (from main.js)
        return document.body.classList.contains('dark-theme');
    }

    // Set initial theme based on body class
    setDark(isDarkMode());

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                setDark(isDarkMode());
            }
        });
    });

    // Start observing the body for class changes
    observer.observe(document.body, { attributes: true });

    // 3) Manual toggle button (keep for backward compatibility)
    const btn = document.getElementById('theme-toggle');
    if (btn) {
        btn.addEventListener('click', () => {
            // This will be handled by the observer above
            // as main.js will toggle the dark-theme class
        });
    }
});

// Function to add copy buttons to code blocks
document.addEventListener('DOMContentLoaded', function() {
    // Find all pre elements that contain code blocks
    const codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach((codeBlock, index) => {
        // Create a div to contain both the copy button and the code
        const container = document.createElement('div');
        container.className = 'code-container';

        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.title = 'Copy to clipboard';
        copyButton.setAttribute('aria-label', 'Copy code to clipboard');

        // Clone the code block to keep its content
        const code = codeBlock.cloneNode(true);

        // Replace the code block with our container
        codeBlock.parentNode.replaceChild(container, codeBlock);

        // Add the copy button and code to our container
        container.appendChild(copyButton);
        container.appendChild(code);

        // Add click event to copy button
        copyButton.addEventListener('click', function() {
            // Get the text content from the code block
            const codeText = code.textContent;

            // Create a temporary textarea to copy from
            const textArea = document.createElement('textarea');
            textArea.value = codeText;
            textArea.style.position = 'fixed';  // Avoid scrolling to bottom
            document.body.appendChild(textArea);
            textArea.select();

            try {
                // Execute copy command
                const successful = document.execCommand('copy');

                // Visual feedback - temporarily change button state
                if (successful) {
                    copyButton.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(function() {
                        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                    }, 2000);
                }
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }

            // Remove the temporary textarea
            document.body.removeChild(textArea);
        });
    });
});
