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
  if (headers.length > 0) {
    const headerElement = headers[0];
    const header = new Header(headerElement);
    console.log(`title is ${header.title()}`);
  } else {
    console.log('no headers found');
  }
};


const watchChanges = () => {
  const divs = document.getElementsByClassName('item-list-groups');
  for (const div of divs) {
    // create an observer instance
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        console.log(mutation.type);
      });
    });

    // configuration of the observer:
    const config = { attributes: true, childList: true, characterData: true };

    // pass in the target node, as well as the observer options
    observer.observe(div, config);

    // later, you can stop observing
    // observer.disconnect();
  }
};

// watchChanges();


setInterval(markWholeDocument(), 1000);
console.log('setInterval run');


if (document.body) {
  console.log('already loaded; running now');
  markWholeDocument();
  console.log('ran!');
} else {
  console.log('registering listener');
  document.addEventListener('DOMContentLoaded', markWholeDocument, false);
  console.log('registered listener');
}

// // const textareas = header.getElementsByClassName('task-row-text-input');
// // let headerTitle = textareas[0].value;
// // let wipFinder = /.*\[(\d*)\]:$/;
// // let results = wipFinder.exec(headerTitle);
// // wipLimit = parseInt(results[1])
