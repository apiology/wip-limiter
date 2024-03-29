# WIP Limiter

[![CircleCI](https://circleci.com/gh/apiology/wip-limiter.svg?style=svg)](https://circleci.com/gh/apiology/wip-limiter)

Get a visual hint when your Kanban-style WIP limit has been exceeded
in your task-tracking tool.  Currently supports Asana.

[![Available in the Chrome Web Store](https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/tbyBjqi7Zu733AAKA5n4.png)](https://chrome.google.com/webstore/detail/wip-limiter/ffneoeianbcmkdhmmiignglhghbhhcca)

## Using

Add a number surrounded in square brackets at the end of your section
name (e.g, `My section name [5]`).

If you add five total tasks to that section, you'll see a yellow
warning stripe on the left.  If you add more than five, that stripe
will turn red.

<img src="./docs/screenshot-1.png" alt="screenshot showing example task sections with color-based indicators" height="400"/>

## Legal

Not created, maintained, reviewed, approved, or endorsed by Asana, Inc.

## Contributions

This project, as with all others, rests on the shoulders of a broad
ecosystem supported by many volunteers doing thankless work, along
with specific contributors.

In particular I'd like to call out:

* [Audrey Roy Greenfeld](https://github.com/audreyfeldroy) for the
  cookiecutter tool and associated examples, which keep my many
  projects building with shared boilerplate with a minimum of fuss.
