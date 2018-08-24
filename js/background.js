// background.js

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({"index":tab.index+1, "url": chrome.extension.getURL("newTab.html")});

    
});