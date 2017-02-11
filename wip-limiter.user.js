// ==UserScript==
// @name WIP Limiter
// @namespace http://github.com/apiology/
// @description Add Kanban-style visual WIP limit indicators
// @match https://app.asana.com/*
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

console.log('starting script');

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
    const textareas = this.header.getElementsByClassName('task-row-text-input');
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
    console.log(`Size of ${this.title()} is ${count}`);
    return count;
  }

  static isHeader(element) {
    return element.classList.contains('bar-row');
  }

  children() {
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
    console.log(`Marking ${this.title()} as on edge`);
    for (const child of this.elementsToMark()) {
      if (child.classList != null) {
        child.classList.remove('wip-limit-under');
        child.classList.remove('wip-limit-over');
        child.classList.add('wip-limit-on-edge');
      } else {
        console.log("Couldn't find classList on:");
        console.log(child);
      }
    }
  }

  markAsOverLimit() {
    console.log(`Marking ${this.title()} as over limit`);
    for (const child of this.elementsToMark()) {
      if (child.classList != null) {
        child.classList.remove('wip-limit-under');
        child.classList.add('wip-limit-over');
        child.classList.remove('wip-limit-on-edge');
      } else {
        console.log("Couldn't find classList on:");
        console.log(child);
      }
    }
  }

  markAsUnderLimit() {
    console.log(`Marking ${this.title()} as under limit`);
    for (const child of this.elementsToMark()) {
      if (child.classList != null) {
        child.classList.add('wip-limit-under');
        child.classList.remove('wip-limit-over');
        child.classList.remove('wip-limit-on-edge');
      } else {
        console.log("Couldn't find classList on:");
        console.log(child);
      }
    }
  }
}

setInterval(() => {
  const headers = document.getElementsByClassName('bar-row');
  for (const headerElement of headers) {
    const header = new Header(headerElement);
    header.markBackgroundColor();
  }
}, 1000);
