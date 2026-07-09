# Development

## fix.sh

If you want to use rbenv/pyenv/etc to manage versions of tools,
there's a `fix.sh` script which may be what you'd like to install
dependencies. It sets `git config core.hooksPath .githooks` so tracked
bootstrap hooks apply to this repo and all its worktrees.

## Git hooks and worktrees

Bootstrap hooks live in `.githooks/` (plain bash, not Overcommit) so
`post-checkout` can run `direnv exec . ./fix.sh` on clone or
`git worktree add` before Ruby and Bundler are ready. `fix.sh` uses
helpers under `bin/`; direnv (via `.envrc`) puts `bin/` on `PATH`.

For a fresh clone with automatic bootstrap on checkout:

```sh
git clone -c core.hooksPath=.githooks <url>
```

Otherwise run `direnv exec . ./fix.sh` once after clone (or `./fix.sh` if
you have no `.envrc`) — it sets `core.hooksPath` for future worktrees.

After `git worktree add`, `.githooks/post-checkout` runs
`direnv exec . ./fix.sh` automatically when the main checkout has already
run bootstrap at least once. It writes `.ruby-version` (gitignored) and
runs `bundle install`,
so the worktree's Ruby and bundler match the main checkout. Skipping
bootstrap can cause overcommit signature mismatches even after
re-signing — see
[.cursor/rules/overcommit-signing.mdc](.cursor/rules/overcommit-signing.mdc).

## Overcommit

This project uses [overcommit](https://github.com/sds/overcommit) for
quality checks on pre-commit, pre-push, and related hooks.
`.overcommit.yml` sets `gemfile: Gemfile` so those git hooks use the
same Bundler-managed gem as `bin/overcommit`.  `bundle exec overcommit --install`
will install hooks under `core.hooksPath`. Post-checkout bootstrap is
handled by `.githooks/post-checkout`, not Overcommit.

If a commit fails with overcommit **plugin signature** or **security**
messages, run both sign commands before retrying (see
`.cursor/rules/overcommit-signing.mdc`):

```sh
bin/overcommit --sign
bin/overcommit --sign pre-commit
```

## direnv

This project uses direnv to manage environment variables used during
development.  See the `.envrc` file for detail.

### Secrets: `config/env.1p` and 1Password

`config/env.1p` in git is the **template**: each variable points at a vault
item with an `op://` [secret
reference](https://developer.1password.com/docs/cli/secret-reference), not a
plaintext value.  Load order and fallbacks are in **`.envrc`**.  Mount
**resolved** values at **`config/env.local`** (below); use **`config/env.1p`**
in git when adding or syncing `op://` keys.

For local development, you can also store **resolved** values in a
[1Password Environment](https://developer.1password.com/docs/environments/) and mount
them as a [local `.env`
file](https://developer.1password.com/docs/environments/local-env-file/) at
**`config/env.local`** (macOS beta; fifo mount, gitignored).  Do **not**
mount at `config/env.1p` — that path is the tracked `op://` template and
conflicts with git.

#### Update the Environment from `config/env.1p` (`op inject`)

```sh
op inject -i config/env.1p -o /tmp/repo-env.import -f
grep 'op://' /tmp/repo-env.import && echo 'ERROR: unresolved references' || echo 'OK'
# Import /tmp/repo-env.import in 1Password → Environments, then:
rm /tmp/repo-env.import
```

If you use a local mount at `config/env.local`, confirm
`grep -c op:// config/env.local` is **0**, then `direnv allow`.  Do not
commit `config/env.local`.

## Run Chrome extension from local checkout

1. Run 'make' to create the bundle with webpack, or 'make start' to
   start webpack in watch mode.
2. Go to [chrome://extensions/](chrome://extensions/)
3. Make sure 'Developer mode' is flipped on in the upper right.
4. Click the 'Load unpacked' button.
5. Choose the [dist/chrome-extension](./dist/chrome-extension) directory

## Testing changes

1. `make`
2. Head to 'wip-limiter-example' project and verify each appears as
   described in section header.
3. Head to your 'My Tasks' page and set up WIP limits to test.
4. Go into a task and set up WIP limits to test.

## Releasing to Chrome Web Store

1. Update screenshots in `docs/` for any new features
1. Update [README.md](./README.md) with new screenshots
1. PR screenshot updates in
1. `git stash && git checkout main && git pull`
1. Bump the version in `static/chrome-extension/manifest.json` locally.
1. `git commit -m "Bump version" static/chrome-extension/manifest.json`
1. `git push && make clean && make`
1. Update [package.zip](./package.zip) in [developer dashboard](https://chrome.google.com/u/1/webstore/devconsole/d34ba2e8-8b5a-4417-889e-4047c35522d0) as `apiology-cws` user.
1. Upload any new screenshots
1. Update description to match current README.md - manually translate
   from markdown to text.
1. Save draft
1. ... | Preview
1. [Publish](https://developer.chrome.com/docs/webstore/update/)

## Installing local version

1. Run 'make' to create the bundle with webpack, or 'make start' to
   start webpack in watch mode.
2. Go to [chrome://extensions/](chrome://extensions/)
3. Make sure 'Developer mode' is flipped on in the upper right.
4. Click the 'Load unpacked' button.
5. Choose the [dist](./dist) directory
