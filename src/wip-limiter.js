const doWork = (tab) => {
  // No tabs or host permissions needed!
  console.log(`Turning ${tab.url} red!`);
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"',
  });
};

module.exports = {
  doWork,
};
