import { processOnce } from './wip-limiter';

setInterval(() => {
  processOnce();
}, 1000);
