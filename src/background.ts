/**
 * background module.
 *
 * Initialized when browser extension is loaded.
 */

import { doWork } from './wip-limiter';

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(doWork);
