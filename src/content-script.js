const { processOnce } = require('./wip-limiter.js');

setInterval(() => {
  processOnce();
}, 1000);
