// Function to switch code syntax between solarized light and dark based on theme
document.addEventListener('DOMContentLoaded', () => {
    const lightLink = document.getElementById('syntax-light-css');
    const darkLink = document.getElementById('syntax-dark-css');

    // Flip on/off
    function setDark(on) {
        lightLink.disabled = on;
        darkLink.disabled = !on;
    }

    // Function to check if the site is in dark mode
    function isDarkMode() {
        // Check if <html> has dark-theme class (set by the head script / ThemeHelper)
        return document.documentElement.classList.contains('dark-theme');
    }

    // Set the initial theme based on the root class
    setDark(isDarkMode());

    // Watch for theme changes
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.attributeName === 'class') {
                setDark(isDarkMode());
            }
        });
    });

    // Start observing <html> for class changes
    observer.observe(document.documentElement, { attributes: true });
});

// Add copy buttons to code blocks

// Hugo partials can't run in the browser, so these copy assets/icons/{copy,check}.svg in the markup partials/icon.html produces
const COPY_ICON =
    '<svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M272 0H396.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H272c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128H192v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z"/></svg>';
const CHECK_ICON =
    '<svg class="icon" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>';

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
    copyButton.innerHTML = COPY_ICON;
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
    button.innerHTML = CHECK_ICON;
    setTimeout(() => {
        button.innerHTML = COPY_ICON;
    }, 2000);
}
