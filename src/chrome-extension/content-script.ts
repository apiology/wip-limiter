/**
 * Content script running in the context of the Asana website -
 * watches for appropriate markup to tweak, then tweaks it using code
 * from wip-limiter.js.
 */

import { /* platform, */setPlatform } from '../platform.js';
import { ChromeExtensionPlatform } from './chrome-extension-platform.js';
import { processOnce } from '../wip-limiter.js';

export function registerEventListeners() {
  setInterval(() => {
    processOnce();
  }, 1000);
}

/* istanbul ignore next */
if (typeof jest === 'undefined') {
  const p = new ChromeExtensionPlatform();
  setPlatform(p);
  registerEventListeners();
}
