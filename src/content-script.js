const { processOnce } = require('./wip-limiter');

setInterval(() => {
  processOnce();
}, 1000);
