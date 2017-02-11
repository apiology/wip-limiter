# WIP Limiter

Note - this WIP Limiter is a work in progress - don't bother to try to use it yet!

# WIP Limiter

This is a userscript you can install into your browser to get a visual
hint when your Kanban-style WIP limit has been exceeded.

Currently supports:

* [Asana](https://www.asana.com)

To use, change the titles of your sections or projects to include a
string like '[5]' at the end of the title.  The 5 represents your
maximum WIP limit; the background colors will now reflect whether you
are at or beyond the limit you set.

TODO: Add screenshot GIF if possible

## Installing

Install [Tampermonkey](https://tampermonkey.net/) into your browser.


Download the wip-limiter.user.js file from this Repo.  Go to Settings
| Extensions.  Drag the wip-limiter.user.js file onto your browser
window.

To install, double click on wip-limiter.user.js; this should launch
your browser's userscript loader.

## Contributions

PRs and issues welcome!

I use this in Chrome, but definitely file an issue if you have issues in other browsers!

Documentation for userscripts in Chrome
is
[here](https://www.chromium.org/developers/design-documents/user-scripts).

TODO: Extension: http://extensionizr.com/!#{"modules":["hidden-mode","with-persistent-bg","no-bg","no-options","no-override","inject-js","jquerymin"],"boolean_perms":[],"match_ptrns":[]}
