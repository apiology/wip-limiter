/**
 * Content script running in the context of the Asana website -
 * watches for appropriate markup to tweak, then tweaks it using code
 * from wip-limiter.js.
 */

import { processOnce } from './wip-limiter';

setInterval(() => {
  processOnce();
}, 1000);
