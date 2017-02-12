// ==UserScript==
// @name WIP Limiter
// @namespace http://github.com/apiology/
// @description Add Kanban-style visual WIP limit indicators
// @match https://app.asana.com/*
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

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

class Header {
  constructor(header) {
    this.header = header;
  }

  // header.classList.contains("bar-row")
  title() {
    let textareas = this.header.getElementsByClassName('task-row-text-input');
    if (textareas.length === 0) {
      textareas = this.header.getElementsByClassName('taskName-input');
    }
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

  static isHeader(element) {
    // TODO: Split this up via subclass
    return element.classList.contains('bar-row') ||
      element.classList.contains('sectionRow');
  }

  isMyTasks() {
    return this.header.classList.contains('bar-row');
  }

  children() {
    // TODO: Turn these into subclasses
    if (this.isMyTasks()) {
      return this.childrenMyTasks();
    }

    return this.childrenProject();
  }

  static nextProjectSibling(row) {
    const uncle = row.parentNode.nextSibling;
    if (uncle === null) {
      return null;
    }
    return uncle.firstChild;
  }

  childrenProject() {
    let curNode = Header.nextProjectSibling(this.header);
    const childList = [];
    while (curNode != null) {
      // TODO: Make isHeader() in a subclass
      if (Header.isHeader(curNode)) {
        curNode = null;
      } else {
        childList.push(curNode);
        curNode = Header.nextProjectSibling(curNode);
      }
    }
    return childList;
  }

  childrenMyTasks() {
    let curNode = this.header.nextSibling;
    const childList = [];
    while (curNode != null) {
      if (Header.isHeader(curNode)) {
        curNode = null;
      } else {
        childList.push(curNode);
        curNode = curNode.nextSibling;
      }
    }
    return childList;
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
}

setInterval(() => {
  let headers = document.getElementsByClassName('bar-row');
  if (headers.length === 0) {
    headers = document.getElementsByClassName('sectionRow');
  }
  for (const headerElement of headers) {
    const header = new Header(headerElement);
    header.markBackgroundColor();
  }
}, 1000);
