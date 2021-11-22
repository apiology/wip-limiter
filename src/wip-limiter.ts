/**
 * wip-limiter module.
 *
 * Chrome extension to get a visual hint when your Kanban-style WIP limit has been exceeded.
 */

export const doWork = (tab: chrome.tabs.Tab) => {
  // No tabs or host permissions needed!
  console.log(`Turning ${tab.url} red!`);
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"',
  });
};
export { doWork as default };
