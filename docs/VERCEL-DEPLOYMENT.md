# Vercel Deployment Guide

Deploy Industry Verticals sites to Vercel for production hosting.

---

## Pre-requisite

> **Important:** The site must be published at least once using the **Publish** button in the Page Builder. This ensures the site is accessible via the Vercel deployment.

---

## Deployment Steps

### Step 1: Log in to Vercel Dashboard

Go to [vercel.com](https://vercel.com) and log in to your account.

### Step 2: Create New Project

1. Click **Add New**
2. Select **Project**

### Step 3: Import Git Repository

Import the git repository containing your forked Industry Verticals codebase.

### Step 4: Configure Deployment

1. Click **Edit** to select the **Root Directory**
2. Choose the industry vertical you want to deploy from the list of `industry-verticals`

Configure the following:

- **Project name:** Your preferred project name
- **Framework Preset:** `Next.js`
- **Root Directory:** Select which industry vertical you want to deploy (e.g., `industry-verticals/retail`)

### Step 5: Add Environment Variables

Set the following XM Cloud related variables before deployment.

#### Mandatory Variables (All Sites)

The following three variables are mandatory for all sites and can be found in the Deploy Portal:

1. Go to **Project** → **Environment** → **Developer Settings** tab
2. Select the correct site from the dropdown menu
3. **Important:** Make sure to switch the Context to **Live**
4. Add the following variables:

| Variable Name | Description |
|--------------|-------------|
| `SITECORE_EDGE_CONTEXT_ID` | Edge context ID from Developer Settings |
| `NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID` | Same as above (for client-side) |
| `NEXT_PUBLIC_DEFAULT_SITE_NAME` | Site name as it appears in the dropdown |

> **Note:** `NEXT_PUBLIC_DEFAULT_SITE_NAME` may not be populated immediately if the site has not fully completed deployment. Even if the status shows "Deployment Complete", post actions may still be in progress. This can only be confirmed by reviewing the deployment logs. Please wait until all post-deployment steps have finished before retrieving this value from the Developer Settings tab.

#### Search Variables (If Search is Implemented)

The following variables are mandatory only if search is implemented on the site.

> **Note:** Only one site can be deployed on Vercel per deployment. Select only the variables for your site from the table below.

**Crucial:** Add the following environment variables exactly as shown:

##### Forma Lux

| Environment Variable Name | Environment Variable Value |
|---------------------------|---------------------------|
| `NEXT_PUBLIC_SEARCH_ENV` | `prod` |
| `NEXT_PUBLIC_SEARCH_CUSTOMER_KEY` | `202092313-225191452` |
| `NEXT_PUBLIC_SEARCH_API_KEY` | `01-8fa0d33b-6fefe6b976b8efc209b6d71333d76141d2f549be` |
| `NEXT_PUBLIC_SEARCH_SOURCE` | `1193018` |

##### SkyWings

| Environment Variable Name | Environment Variable Value |
|---------------------------|---------------------------|
| `NEXT_PUBLIC_SEARCH_ENV` | `prod` |
| `NEXT_PUBLIC_SEARCH_CUSTOMER_KEY` | `202092313-225191452` |
| `NEXT_PUBLIC_SEARCH_API_KEY` | `01-8fa0d33b-6fefe6b976b8efc209b6d71333d76141d2f549be` |
| `NEXT_PUBLIC_SKYWINGS_SEARCH_SOURCE` | `1197636` |

##### GridWell

| Environment Variable Name | Environment Variable Value |
|---------------------------|---------------------------|
| `NEXT_PUBLIC_SEARCH_ENV` | `prod` |
| `NEXT_PUBLIC_SEARCH_CUSTOMER_KEY` | `202092313-225191452` |
| `NEXT_PUBLIC_SEARCH_API_KEY` | `01-8fa0d33b-6fefe6b976b8efc209b6d71333d76141d2f549be` |
| `NEXT_PUBLIC_GRIDWELL_SEARCH_SOURCE` | `1202901` |

### Step 6: Deploy

Once the environment variables are set, click **Deploy**.

After the deployment is successful, you can access the site from **Domains** in the **Overview** tab.

---

## Quick Reference

### Environment Variables by Site

| Site | Root Directory | Mandatory Search Variables |
|------|----------------|---------------------------|
| Forma Lux | `industry-verticals/retail` | `NEXT_PUBLIC_SEARCH_SOURCE` |
| SkyWings | `industry-verticals/travel` | `NEXT_PUBLIC_SKYWINGS_SEARCH_SOURCE` |
| GridWell | `industry-verticals/energy` | `NEXT_PUBLIC_GRIDWELL_SEARCH_SOURCE` |
| Nova Medical | `industry-verticals/healthcare` | _(none)_ |
| Essential Living | `industry-verticals/luxury-retail` | _(none)_ |
| Bristan (+ heritage) | `industry-verticals/bristan` | `NEXT_PUBLIC_SEARCH_SOURCE`; optional `SITECORE_STATIC_BUILD_SITES=bristan,heritage`; `SITECORE_AUTH_CLIENT_*` for deploy build |
| Visit London | `industry-verticals/visitlondon` | _(none)_ |
| Brother UK | `industry-verticals/brother` | `NEXT_PUBLIC_SEARCH_SOURCE` (site search); see [Brother project settings](#brother-uk-project-settings) |
| Pinsent Masons | `industry-verticals/legal` | `NEXT_PUBLIC_SEARCH_SOURCE`; see [Pinsent Masons project settings](#pinsent-masons-legal-project-settings) |
| Capco | `industry-verticals/capco` | optional (site search is the local catalog); see [Capco project settings](#capco-project-settings) |

### Common Variables Checklist

All deployments require:

- [ ] `SITECORE_EDGE_CONTEXT_ID`
- [ ] `NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID`
- [ ] `NEXT_PUBLIC_DEFAULT_SITE_NAME`

Sites with search also require:

- [ ] `NEXT_PUBLIC_SEARCH_ENV`
- [ ] `NEXT_PUBLIC_SEARCH_CUSTOMER_KEY`
- [ ] `NEXT_PUBLIC_SEARCH_API_KEY`
- [ ] Site-specific search source variable

---

## Brother UK project settings

Reference configuration for the Brother vertical, from **Settings → Build and Deployment**:

| Setting | Value | Why |
|---------|-------|-----|
| Root Directory | `industry-verticals/brother` | The app is one folder in a multi-site repo |
| Include files outside the root directory in the Build Step | **Enabled** | The build needs repo-level files (shared config, `authoring/` assets referenced by tooling) |
| Skip deployments when there are no changes to the root directory | Disabled | Keeps redeploys available after repo-wide changes |
| Ignored Build Step | Automatic | Default |
| Framework Preset | Next.js | Detected automatically |
| Node.js Version | **24.x** | Content SDK build (`sitecore-tools project build`) — 22.11.0 is the floor, 24.x is what this project runs |

### Environment variables

Set these under **Settings → Environment Variables** for **Production and Preview**:

| Variable | Value | Type |
|----------|-------|------|
| `SITECORE_EDGE_CONTEXT_ID` | From XM Cloud Developer Settings (Edge context = **Live**) | Secret |
| `NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID` | Same value as above | Plain |
| `NEXT_PUBLIC_DEFAULT_SITE_NAME` | `brother` | Plain |
| `SITECORE_SITE_NAME` | `brother` | Secret or plain |
| `SITECORE_EDITING_SECRET` · `JSS_EDITING_SECRET` | Matches the editing secret configured on the rendering host | Secret |
| `NEXT_PUBLIC_SEARCH_ENV` · `NEXT_PUBLIC_SEARCH_CUSTOMER_KEY` · `NEXT_PUBLIC_SEARCH_API_KEY` · `NEXT_PUBLIC_SEARCH_SOURCE` | Sitecore Search credentials | Secret |
| `NEXT_PUBLIC_SITECORE_CDP_CLIENT_KEY` · `NEXT_PUBLIC_SITECORE_CDP_API_TARGET` · `NEXT_PUBLIC_SITECORE_CDP_API_AUTH` | CDP / personalization demo | Secret |
| `NEXT_PUBLIC_DEFAULT_LANGUAGE` | `en` | Plain |

`NEXT_PUBLIC_*` values are inlined into the client bundle at build time — marking them Secret hides them in the
Vercel UI but does **not** keep them out of the browser. Changing any of them requires a redeploy, not just a restart.
Both site-name variables are needed: `NEXT_PUBLIC_DEFAULT_SITE_NAME` drives client-side site resolution while
`SITECORE_SITE_NAME` is read during the server build.

Local development mirrors this list in `industry-verticals/brother/.env.local` (copy from `.env.remote.example`).

---

## Pinsent Masons (legal) project settings

If Vercel shows **Brother chrome + orange “Content SDK component is missing React implementation”** (`HomeExpertise`, `OutLawHome`, `ReachStrength`, …), the project **Root Directory is still `industry-verticals/brother`** while Edge env is `legal`. Sitecore returns Pinsent layout; Brother’s component map has no those React files.

**Do not** “fix” this by only changing `NEXT_PUBLIC_DEFAULT_SITE_NAME`. Change the host folder, then redeploy.

| Setting | Value | Why |
|---------|-------|-----|
| Root Directory | `industry-verticals/legal` | Pinsent Next.js app (`xmcloud.build.json` host `legal`) |
| Include files outside the root directory in the Build Step | **Enabled** | Repo-level files used by the build |
| Skip deployments when there are no changes to the root directory | Disabled | Redeploy after repo-wide YAML/docs |
| Framework Preset | Next.js | |
| Node.js Version | **22.x** | Legal host is Node 22.11.0 (Brother used 24.x) |

Need Brother **and** Pinsent public? Two Vercel projects, two Root Directories. One project cannot build both apps.

### Environment variables

**Production** = SitecoreAI Developer Settings **Live**. **Preview** = **Preview**. Both need `NEXT_PUBLIC_DEFAULT_SITE_NAME=legal` and `SITECORE_SITE_NAME=legal`.

| Variable | Where to copy |
|----------|----------------|
| `SITECORE_EDGE_CONTEXT_ID` | Live (Production) / Preview (Preview) |
| `NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID` | Same as above |
| `NEXT_PUBLIC_DEFAULT_SITE_NAME` | `legal` |
| `SITECORE_SITE_NAME` | `legal` |
| `SITECORE_EDITING_SECRET` | Preview / editing host |
| `NEXT_PUBLIC_SEARCH_ENV` · `NEXT_PUBLIC_SEARCH_CUSTOMER_KEY` · `NEXT_PUBLIC_SEARCH_API_KEY` · `NEXT_PUBLIC_SEARCH_SOURCE` | Same shared CEC values as Forma Lux (`1193018`) |
| `NEXT_PUBLIC_DEFAULT_LANGUAGE` | `en` |
| `SITECORE_AppSettings_damEnabled__define` | `yes` |

Local secrets (context IDs, GraphQL tokens) live in gitignored `docs/LEGAL-VERCEL.local.md`. Committed guide: [LEGAL.md](./LEGAL.md#vercel-public-delivery).

---

## Capco project settings

Use a **dedicated** Vercel project for Capco. Do not point the existing Brother or Legal project at this folder — one Root Directory can only build one host.

**Do not** only change `NEXT_PUBLIC_DEFAULT_SITE_NAME`. If Root Directory stays `industry-verticals/legal` or `industry-verticals/brother` while Edge env is `capco`, Sitecore returns Capco layout and the other host’s component map is missing those React files.

Publish the Capco site once in Pages (Live) before the first Vercel Production build. Narrative: [CAPCO.md](./CAPCO.md).

| Setting | Value | Why |
|---------|-------|-----|
| Root Directory | `industry-verticals/capco` | Capco Next.js app (`xmcloud.build.json` host `capco`) |
| Include files outside the root directory in the Build Step | **Enabled** | Repo-level files used by the build |
| Skip deployments when there are no changes to the root directory | Disabled | Redeploy after repo-wide YAML/docs |
| Framework Preset | Next.js | |
| Node.js Version | **22.x** | Matches `xmcloud.build.json` `nodeVersion` `22.11.0` |
| Build Command | `npm run build` | `sitecore-tools:generate-map` → `sitecore-tools:build` → `next build` |
| Output / Install | leave Vercel defaults | |

Need Legal **and** Capco public? Two Vercel projects, two Root Directories.

### Environment variables

**Production** = SitecoreAI Developer Settings **Live**. **Preview** = **Preview** (a different Context ID). Both environments need `NEXT_PUBLIC_DEFAULT_SITE_NAME=capco` and `SITECORE_SITE_NAME=capco`.

| Variable | Production value | Type |
|----------|------------------|------|
| `SITECORE_EDGE_CONTEXT_ID` | `1rg8MP5uWzSuF0B3ER1Pww` | Secret |
| `NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID` | `1rg8MP5uWzSuF0B3ER1Pww` | Plain |
| `NEXT_PUBLIC_DEFAULT_SITE_NAME` | `capco` | Plain |
| `SITECORE_SITE_NAME` | `capco` | Plain |
| `NEXT_PUBLIC_DEFAULT_LANGUAGE` | `en` | Plain |
| `SITECORE_EDITING_SECRET` | From Developer Settings (editing host `capco`) | Secret |

`NEXT_PUBLIC_*` values are inlined into the client bundle at build time. Changing the Context ID requires a **Redeploy**, not just a restart.

Capco `/search` uses `src/lib/search-catalog.ts`. Do **not** require `NEXT_PUBLIC_SEARCH_*` unless you later wire Sitecore Search.

Optional: `SITECORE_AppSettings_damEnabled__define=yes` if Pages DAM pickers fail on the Vercel host.

### Create the project (click path)

1. [vercel.com](https://vercel.com) → **Add New** → **Project**.
2. Import this git repo (same fork/remote you already use for Legal/Brother).
3. **Edit** Root Directory → `industry-verticals/capco`.
4. Enable **Include files outside the root directory in the Build Step**.
5. **Environment Variables** → paste the table above for **Production** and **Preview** (Preview Context ID from Deploy portal if you have it; otherwise the Live id still builds).
6. **Deploy**. After success, copy the `*.vercel.app` URL.
7. In SitecoreAI Deploy / Site Grouping, you can leave the **editing** host on XM Cloud (`capco` on SitecoreSilverProd). Vercel is the **public delivery** host, not a replacement for Pages editing unless you also set `SITECORE_EDITING_SECRET` and point a rendering host at the Vercel URL.

---

## Troubleshooting

### Site Not Loading

- Verify the site has been published at least once in Page Builder
- Check that all environment variables are set correctly
- Ensure the Edge Context is set to **Live** when copying values for **Production**
- **Mixed brands / missing React implementations:** Root Directory does not match `NEXT_PUBLIC_DEFAULT_SITE_NAME` (e.g. Brother folder + `legal` Edge, or Legal folder + `capco` Edge). See [Pinsent Masons](#pinsent-masons-legal-project-settings) or [Capco](#capco-project-settings).

### Search Not Working

- Verify all search-related environment variables are set
- Check that you're using the correct search source variable for your site
- Ensure the search source ID matches the configured source

### Build Failures

- Check the Vercel build logs for specific errors
- Verify the root directory is set correctly
- Ensure Node.js version compatibility (22.11.0+; Brother runs 24.x)
- If the build fails resolving files above the app folder, enable **Include files outside the root directory in the Build Step**

---

_Document Version: 1.0_  
_Last Updated: February 2026_
