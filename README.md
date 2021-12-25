# WIP Limiter

[![CircleCI](https://circleci.com/gh/apiology/wip-limiter.svg?style=svg)](https://circleci.com/gh/apiology/wip-limiter)

Chrome extension to get a visual hint when your Kanban-style WIP limit
has been exceeded.  Currently supports Asana.

Not created, maintained, reviewed, approved, or endorsed by Asana, Inc.

## Using

Add a number surrounded in square brackets at the end of your section
name (e.g, `My section name [5]`).

If you add five total tasks to that section, you'll see a yellow
warning stripe on the left.  If you add more than five, that stripe
will turn red.

## Installing

This isn't in the Chrome App Store, so welcome to the Chrome Extension
development experience!

1. Run 'make' to create the bundle with webpack, or 'make start' to
   start webpack in watch mode.
2. Go to [chrome://extensions/](chrome://extensions/)
3. Make sure 'Developer mode' is flipped on in the upper right.
4. Click the 'Load unpacked' button.
5. Choose this directory
