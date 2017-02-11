// ==UserScript==
// @name WIP Limiter
// @namespace http://github.com/apiology/
// @description Add Kanban-style visual WIP limit indicators
// @match https://app.asana.com/*
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

console.log('starting script');

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
    console.log(`title is ${headerTitle}`);
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

  children() {
    let curNode = this.header.nextSibling;
    const childList = [];
    while (curNode != null) {
      childList.push(curNode);
      curNode = curNode.nextSibling;
    }
    return childList;
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

  markAsOnEdge() {
    console.log(`Marking ${this.title()} as on edge`);
  }

  markAsOverLimit() {
    console.log(`Marking ${this.title()} as over limit`);
  }

  markAsUnderLimit() {
    console.log(`Marking ${this.title()} as under limit`);
  }
}


setInterval(() => {
  console.log('starting to mark whole document');
  const headers = document.getElementsByClassName('bar-row');
  for (const headerElement of headers) {
    const header = new Header(headerElement);
    header.markBackgroundColor();
  }
}, 1000);
console.log('setInterval run');


// if (document.body) {
//   console.log('already loaded; running now');
//   markWholeDocument();
//   console.log('ran!');
// } else {
//   console.log('registering listener');
//   document.addEventListener('DOMContentLoaded', markWholeDocument, false);
//   console.log('registered listener');
// }

// // const textareas = header.getElementsByClassName('task-row-text-input');
// // let headerTitle = textareas[0].value;
