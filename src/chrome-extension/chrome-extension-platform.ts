import ChromeExtensionCache from './chrome-extension-cache.js';
import ChromeExtensionLogger from './chrome-extension-logger.js';
import ChromeExtensionFormatter from './chrome-extension-formatter.js';

export default class ChromeExtensionPlatform {
  cache = () => new ChromeExtensionCache();

  logger = () => new ChromeExtensionLogger();

  formatter = () => new ChromeExtensionFormatter();
}
