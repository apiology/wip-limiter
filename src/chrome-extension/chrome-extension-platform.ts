import ChromeExtensionCache from './chrome-extension-cache.js';
import ChromeExtensionLogger from './chrome-extension-logger.js';

export default class ChromeExtensionPlatform {
  cache = () => new ChromeExtensionCache();

  logger = () => new ChromeExtensionLogger();
}
