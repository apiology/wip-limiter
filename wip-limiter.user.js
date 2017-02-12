// ==UserScript==
// @name WIP Limiter
// @namespace http://github.com/apiology/
// @description Add Kanban-style visual WIP limit indicators
// @match https://app.asana.com/*
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

Array.prototype.flatMap = function flatMap(lambda) {
  return Array.prototype.concat.apply([], this.map(lambda));
};

((css) => {
  const head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
})(`
  .wip-limit-under { }
  .wip-limit-over {
    background-color: rgb(214, 65, 65) !important;
  }
  .wip-limit-on-edge {
    background-color: rgb(239, 190, 67) !important;
  }
`);

class Section {
  constructor(header) {
    this.header = header;
  }

  title() {
    const textareas =
      this.header.getElementsByClassName(this.textAreaClassName());
    if (textareas.length !== 1) {
      return null;
    }

    return textareas[0].value;
  }

  wipLimit() {
    const headerTitle = this.title();
    const wipFinder = /.*\[(\d*)\]:$/;
    const results = wipFinder.exec(headerTitle);
    if (results !== null) {
      return parseInt(results[1], 10);
    }
    return null;
  }

  countChildren() {
    const count = this.children().length;
    return count;
  }

  headerAndChildren() {
    // shallow copy
    const all = this.children().slice();
    all.unshift(this.header);
    return all;
  }

  markBackgroundColor() {
    const wipLimit = this.wipLimit();
    if (wipLimit === null) {
      this.markAsUnderLimit();
    } else {
      const childCount = this.countChildren();
      if (wipLimit === childCount) {
        this.markAsOnEdge();
      } else if (wipLimit < childCount) {
        this.markAsOverLimit();
      } else {
        this.markAsUnderLimit();
      }
    }
  }

  elementsToMark() {
    const all = this.headerAndChildren();
    let subElements = [];
    for (const task of all) {
      const overlays = task.getElementsByClassName('task-row-overlay');
      if (overlays !== null) {
        subElements = subElements.concat(Array.from(overlays));
      }
    }
    return all.concat(subElements);
  }

  markAsOnEdge() {
    for (const child of this.elementsToMark()) {
      child.classList.remove('wip-limit-under');
      child.classList.remove('wip-limit-over');
      child.classList.add('wip-limit-on-edge');
    }
  }

  markAsOverLimit() {
    for (const child of this.elementsToMark()) {
      child.classList.remove('wip-limit-under');
      child.classList.add('wip-limit-over');
      child.classList.remove('wip-limit-on-edge');
    }
  }

  markAsUnderLimit() {
    for (const child of this.elementsToMark()) {
      child.classList.add('wip-limit-under');
      child.classList.remove('wip-limit-over');
      child.classList.remove('wip-limit-on-edge');
    }
  }

  children() {
    let curNode = this.nextTaskSibling(this.header);
    const childList = [];
    while (curNode != null) {
      if (this.isHeader(curNode)) {
        curNode = null;
      } else {
        childList.push(curNode);
        curNode = this.nextTaskSibling(curNode);
      }
    }
    return childList;
  }
}

class MyTasksSection extends Section {
  isHeader(element) {
    return element.classList.contains('bar-row');
  }

  nextTaskSibling(row) {
    return row.nextSibling;
  }

  textAreaClassName() {
    return 'task-row-text-input';
  }

  static findTaskListElements() {
    return Array.of(document.getElementsByClassName('grid'))
      .filter(e => e.tagName === 'table')
      .flatMap(e => Array.of(e.getElementsByTagName('tbody')));
  }
}

class ProjectSection extends Section {
  isHeader(element) {
    return element.classList.contains('sectionRow');
  }

  nextTaskSibling(row) {
    const uncle = row.parentNode.nextSibling;
    if (uncle === null) {
      return null;
    }
    return uncle.firstChild;
  }

  textAreaClassName() {
    return 'taskName-input';
  }
}

// create an observer instance
const observer = new MutationObserver((mutations, observer) => {
  mutations.forEach((mutation) => {
    console.log('Mutation!');
    console.log(mutation.type);
    console.log(mutation.target);
  });
});

// configuration of the observer:
const config = { attributes: true, childList: true, characterData: true };

const subscribeToTaskListChanges = () => {
  // TODO: Better name than 'container'
  console.log('Looking for task list elements...');
  for (const taskListElement of MyTasksSection.findTaskListElements()) {
    // pass in the target node, as well as the observer options
    console.log('registering observer on:');
    console.log(taskListElement);
    // observer.observe(taskListElement, config);
  }
  console.log('Done looking for task list elements.');
};

if (document.body) {
  console.log('already loaded; running now');
  subscribeToTaskListChanges();
  console.log('ran!');
} else {
  console.log('registering listener');
  document.addEventListener('DOMContentLoaded',
                            subscribeToTaskListChanges,
                            false);
  console.log('registered listener');
}


setInterval(() => {
  //
  // The DOM/CSS for tasks in the 'my task' screen differs between the
  // 'My Tasks' screen and the project screens:
  //
  const myTasksSectionHeaders = document.getElementsByClassName('bar-row');
  for (const headerElement of myTasksSectionHeaders) {
    const header = new MyTasksSection(headerElement);
    header.markBackgroundColor();
  }
  const projectSectionHeaders = document.getElementsByClassName('sectionRow');
  for (const headerElement of projectSectionHeaders) {
    const header = new ProjectSection(headerElement);
    header.markBackgroundColor();
  }
}, 1000);
