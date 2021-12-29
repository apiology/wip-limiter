# Development

## fix.sh

If you want to use rbenv/pyenv/etc to manage versions of tools,
there's a `fix.sh` script which may be what you'd like to install
dependencies.

## Overcommit

This project uses [overcommit](https://github.com/sds/overcommit) for
quality checks.  `bundle exec overcommit --install` will install it.

## direnv

This project uses direnv to manage environment variables used during
development.  See the `.envrc` file for detail.

## Initial release to Chrome Web Store

1. `make clean && make`
2. Upload to [developer dashboard](https://chrome.google.com/u/1/webstore/devconsole/d34ba2e8-8b5a-4417-889e-4047c35522d0) as `apiology-cws` user.
3. Finalize [promotional image](docs/wip-limiter.paint).
4. Stage the .paint file in git.
5. Save as png with filename `docs/wip-limiter-440x280.png`
6. Generate 1280x800 screenshots and save as
   `docs/screenshot-1-raw.png` and so on.
7. Stage the screenshot raw files in git.
8. Add any annotations and save `docs/screenshot-1.paint` and so on.
9. Stage the screenshot paint files in git.
10. Save as png with filename `docs/screenshot-1.png` and so on.
11. Publish
12. Wait for approval
13. Point to the published version in README.md
14. Update README.md with screenshots

## Releasing to Chrome Web Store

1. `make clean && make`
2. Update [package.zip](./package.zip) in [developer dashboard](https://chrome.google.com/u/1/webstore/devconsole/d34ba2e8-8b5a-4417-889e-4047c35522d0) as `apiology-cws` user.
3. Update description to match current README.md - manually translate
   from markdown to text.
4. [Publish](https://developer.chrome.com/docs/webstore/update/)
