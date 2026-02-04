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
| Visit London | `industry-verticals/visitlondon` | _(none)_ |

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
- Ensure Node.js version compatibility (22.11.0+)

---

_Document Version: 1.0_  
_Last Updated: February 2026_
