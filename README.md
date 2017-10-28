# WIP Limiter

This is a userscript you can install into your browser to get a visual
hint when your Kanban-style WIP limit has been exceeded.

Currently supports:

* [Asana](https://www.asana.com)

To use, change the titles of your sections or projects to include a
string like '[5]' at the end of the title.  The 5 represents your
maximum WIP limit; the background colors will now reflect whether you
are at or beyond the limit you set.

## Installing

1. Install [Tampermonkey](https://tampermonkey.net/) into your browser.
2. Click [here](https://github.com/apiology/wip-limiter/raw/master/wip-limiter.user.js)

## Developing

According
to
[this article](https://stackoverflow.com/questions/24542151/how-to-edit-tampermonkey-scripts-outside-of-the-browser#),
you can fork this project, modify the file `local-pointer.user.js` and
the link that follows to point to your local checkout, and then
click
[here](https://github.com/apiology/wip-limiter/raw/master/local-pointer.user.js)

## Contributions

PRs and issues welcome!

I use this in Chrome, but definitely file an issue if you have issues in other browsers!
