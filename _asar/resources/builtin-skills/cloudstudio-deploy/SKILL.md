---
name: cloudstudio-deploy
description: Deploy static sites to CloudStudio sandbox workspaces. This skill should be used when users want to deploy a local build directory (e.g. dist/, build/, out/) to a CloudStudio workspace, preview a web application in a cloud sandbox, or publish a static site with a shareable URL.
license: Internal
allowed-tools:
disable: false
---

# CloudStudio Deploy

Deploy local static sites to CloudStudio sandbox workspaces via the built-in `workbuddy_cloudstudio_deploy` tool.

## When to Use

- User asks to **deploy**, **preview**, or **publish** a static site / web application
- User has a build output directory (e.g. `dist/`, `build/`, `out/`) and wants a live URL
- User mentions **CloudStudio**, **sandbox**, or **cloud preview**

## Limitations

- Only **pure front-end static sites** are supported (HTML/CSS/JS/assets).
- Server-side rendering (SSR), backend APIs, databases, or runtime dependencies (e.g. Node.js server apps) are NOT supported.
- If the project requires a backend or SSR, inform the user that only static site deployment is currently supported.

## How to Deploy

Use the built-in tool `workbuddy_cloudstudio_deploy`. It accepts:

- `directory` (required) — absolute path to the build output directory
- `port` (optional) — port for the static file server, defaults to 3000

## Workflow

When a user asks to deploy a site, follow this workflow in order. Be **conservative** — only proceed with build/deploy when you have high confidence in the result.

### Step 1: Identify the deploy target

Check if the user specified a directory. If yes, verify it looks deployable (has `index.html`). If it does, skip to Step 4.

If no directory is specified, or the specified directory does not contain `index.html`, proceed to Step 2.

### Step 2: Scan for existing build output

Look in the project root for common front-end build output directories. **Only check these whitelisted directories** (do NOT recursively scan the entire project):

- `dist/`
- `build/`
- `out/`
- `output/`
- `public/`
- `.next/out/` (Next.js static export)
- `.output/public/` (Nuxt static)
- `_site/` (Jekyll/11ty)
- `www/`
- `docs/`

For each found directory, check if it contains `index.html`. If exactly one candidate is found, use it. If multiple candidates exist, ask the user to choose.

### Step 3: Attempt to build (conservative strategy)

If no existing build output is found, check if the project has a buildable front-end:

1. **Check for `package.json`** in the project root. If missing, skip to Step 3c.

2. **Look for a build script.** Check `package.json` for these script names (in order of priority):
   - `build`
   - `build:prod`
   - `build:production`
   - `generate` (Nuxt)
   - `export` (Next.js)

   If a build script exists:
   - Check if `node_modules/` exists. If not, inform the user that dependencies need to be installed first and ask for confirmation before running `npm install` (or the appropriate package manager based on lock files).
   - Run the build script (e.g. `npm run build`).
   - After build completes, re-scan the whitelisted directories from Step 2 for `index.html`.
   - If a deployable directory is found, proceed to Step 4.
   - If the build fails or produces no static output, report the error to the user and stop.

3. **No package.json or no build script:**
   - Check if the project root itself contains `index.html` (simple static site with no build step).
   - If yes, use the project root as the deploy directory.
   - If no, inform the user: "No deployable static site found. This project may require a build step or may not be a static front-end project."
   - **Do NOT attempt to guess or construct build commands.** Stop and ask the user for guidance.

### Step 4: Deploy

Call the `workbuddy_cloudstudio_deploy` tool with the identified directory:

```json
{ "directory": "/absolute/path/to/deployable/dir" }
```

### Step 5: Report result

The tool returns a JSON with `shareLink` and `verified` fields.

- Present the `shareLink` as the **分享链接** to the user.
- Do NOT mention expiration, spaceKey, data plane URL, webIDE URL, or any other internal details.
- If `verified` is `false`, suggest the user wait a few seconds and try the link again.

## Important Rules

- Only show the `shareLink` to the user, referred to as **分享链接**.
- Do NOT mention expiration, validity period, spaceKey, data plane URL, webIDE URL, or any other internal details to the user.
- Be **conservative** in build attempts — only run build commands when there is a clear, standard build script present. Never fabricate or guess build commands.
- If analysis becomes too complex (e.g. monorepo with unclear structure, unconventional build setup), stop and ask the user for clarification rather than guessing.
- The tool handles everything internally: workspace creation, file upload, static server setup, and link generation.
