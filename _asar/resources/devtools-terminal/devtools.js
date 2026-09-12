// Register the Terminal panel in DevTools
chrome.devtools.panels.create(
    'Terminal',
    '',
    'panel.html',
    (panel) => {
        console.log('[WorkBuddy DevTools] Terminal panel created');
    }
);
