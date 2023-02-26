/**
 * wip-limiter module.
 *
 * Chrome extension to get a visual hint when your Kanban-style WIP limit has been exceeded.
 */
import { platform } from './platform.js';

export const doWork = (tab: chrome.tabs.Tab) => {
  // No tabs or host permissions needed!
  const logger = platform().logger();
  logger.debug(`Turning ${tab.url} red!`);
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"',
  });
};
