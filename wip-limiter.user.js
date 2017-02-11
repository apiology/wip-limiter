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
    // look for child td with class = barRow-contents
    // const td = header.getElementsByClassName('barRow-contents')
    // return 'dummy_title';
    const textareas = this.header.getElementsByClassName('task-row-text-input');
    if (textareas.length !== 1) {
      return null;
    }

    return textareas[0].value;
  }

// const wipLimit = header => {
//
// }
// const isOver = header => {
//    header
// }
}


// let header = new Header();
// console.log(header.title())

const markWholeDocument = () => {
  console.log('starting to mark whole document');
  const headers = document.getElementsByClassName('bar-row');
  console.log(headers);
  for (const headerElement of headers) {
    if (headers.length > 0) {
      const header = new Header(headerElement);
      const headerTitle = header.title();
      console.log(`title is ${headerTitle}`);
      const wipFinder = /.*\[(\d*)\]:$/;
      const results = wipFinder.exec(headerTitle);
      console.log(`results is ${results}`);
      if (results !== null) {
        const wipLimit = parseInt(results[1], 10);
        console.log(`wipLimit is ${wipLimit}`);
      } else {
        console.log(`No wipLimit on ${headerTitle}`);
      }
    } else {
      console.log('no headers found');
    }
  }
};


setInterval(markWholeDocument, 1000);
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
