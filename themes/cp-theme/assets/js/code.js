// Function to switch code syntax between solarized light and dark based on theme
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

    // Set the initial theme based on body class
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
});

// Add copy buttons to code blocks

document.addEventListener('DOMContentLoaded', initializeCodeBlockCopyButtons);

function initializeCodeBlockCopyButtons() {
    // Find all pre-elements that contain code blocks
    const codeBlocks = document.querySelectorAll('pre');
    codeBlocks.forEach(createCopyButtonForCodeBlock);
}

function createCopyButtonForCodeBlock(codeBlock) {
    // Create a container, button, and add structure
    const container = createCodeContainer();
    const copyButton = createCopyButton();
    const clonedCode = codeBlock.cloneNode(true);

    // Replace the original code block with our container
    codeBlock.parentNode.replaceChild(container, codeBlock);

    // Build the new structure
    container.appendChild(copyButton);
    container.appendChild(clonedCode);

    // Set up the copy functionality
    copyButton.addEventListener('click', () => handleCopyButtonClick(clonedCode, copyButton));
}

function createCodeContainer() {
    const container = document.createElement('div');
    container.className = 'code-container';
    return container;
}

function createCopyButton() {
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
    copyButton.title = 'Copy to clipboard';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');
    return copyButton;
}

function handleCopyButtonClick(codeElement, buttonElement) {
    const codeText = codeElement.textContent;
    copyToClipboard(codeText)
        .then(() => updateButtonToShowSuccess(buttonElement))
        .catch(err => console.error('Failed to copy text: ', err));
}

function copyToClipboard(text) {
    return navigator.clipboard.writeText(text);
}

function updateButtonToShowSuccess(button) {
    button.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-copy"></i>';
    }, 2000);
}
