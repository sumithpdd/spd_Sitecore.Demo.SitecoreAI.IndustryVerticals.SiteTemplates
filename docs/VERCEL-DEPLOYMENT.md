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

## Troubleshooting

### Site Not Loading

- Verify the site has been published at least once in Page Builder
- Check that all environment variables are set correctly
- Ensure the Edge Context is set to **Live** when copying values

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
