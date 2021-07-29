const { doWork } = require('./wip-limiter.js');

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(doWork);
