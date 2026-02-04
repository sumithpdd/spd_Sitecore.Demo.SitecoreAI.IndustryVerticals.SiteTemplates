# Deployment Guide - Industry Verticals

Follow these steps to set up your environment for custom demos using the Industry Verticals template.

---

## 1. GitHub Setup

First, you need a personal copy of the codebase to allow for customizations while keeping in sync with the main repository.

**Fork the Repository:** Create a fork of this codebase.

---

## 2. Deployment

Verify the beta features toggle in the Deploy Portal settings. If it is enabled, beta features are active; if not, enable it to continue with this guide. The scope and impact of this setting are described directly in the toggle.

### 2.1. Project Creation

1. Navigate to **Projects** and select **Create New Project**
2. Choose **"Use your own code"**
3. Give authoring environment name
4. Point your GitHub account, the repository you forked and the branch you want to use (`main`, if you haven't changed anything)

**Crucial:** Add the following environment variables exactly as shown:

| Variable name | Value |
|--------------|-------|
| `Sitecore_ConnectionStrings_DAM_dot_ContentHub` | `ClientId=LogicApp;ClientSecret=d54a8fb6-45f7-4404-a930-4bfc05ce6cb5;UserName=Sitecore;Password=Sitecore123!;URI=https://starter-verticals-2.sitecoresandbox.cloud/;` |
| `Sitecore_ConnectionStrings_DAM_dot_SearchPage` | `https://starter-verticals-2.sitecoresandbox.cloud/en-us/sitecore-dam-connect/approved-assets` |
| `Sitecore_ConnectionStrings_DAM_dot_ExternalRedirectKey` | `Sitecore` |
| `SITECORE_AppSettings_damEnabled__define` | `yes` |

### 2.2. Setup Editing Hosts

Give it the relevant name from the table below exactly as listed, point it to the same GitHub repository and branch, and add the environment variables according to the table.

> **Note:** `nextjsstarter` is used for the Forma Lux site.

> **Note:** You can only create 1 editing host through this wizard. You can go into your editing hosts screen later on to create additional editing hosts.

#### Forma Lux

| Editing Host Name | Environment Variable Name | Environment Variable Value |
|-------------------|---------------------------|---------------------------|
| `nextjsstarter` | `NEXT_PUBLIC_SEARCH_ENV` | `prod` |
| | `NEXT_PUBLIC_SEARCH_CUSTOMER_KEY` | `202092313-225191452` |
| | `NEXT_PUBLIC_SEARCH_API_KEY` | `01-8fa0d33b-6fefe6b976b8efc209b6d71333d76141d2f549be` |
| | `NEXT_PUBLIC_SEARCH_SOURCE` | `1193018` |

#### SkyWings

| Editing Host Name | Environment Variable Name | Environment Variable Value |
|-------------------|---------------------------|---------------------------|
| `travel` | `NEXT_PUBLIC_SEARCH_ENV` | `prod` |
| | `NEXT_PUBLIC_SEARCH_CUSTOMER_KEY` | `202092313-225191452` |
| | `NEXT_PUBLIC_SEARCH_API_KEY` | `01-8fa0d33b-6fefe6b976b8efc209b6d71333d76141d2f549be` |
| | `NEXT_PUBLIC_SKYWINGS_SEARCH_SOURCE` | `1197636` |

#### GridWell

| Editing Host Name | Environment Variable Name | Environment Variable Value |
|-------------------|---------------------------|---------------------------|
| `energy` | `NEXT_PUBLIC_SEARCH_ENV` | `prod` |
| | `NEXT_PUBLIC_SEARCH_CUSTOMER_KEY` | `202092313-225191452` |
| | `NEXT_PUBLIC_SEARCH_API_KEY` | `01-8fa0d33b-6fefe6b976b8efc209b6d71333d76141d2f549be` |
| | `NEXT_PUBLIC_GRIDWELL_SEARCH_SOURCE` | `1202901` |

#### Nova Medical

| Editing Host Name | Environment Variable Name | Environment Variable Value |
|-------------------|---------------------------|---------------------------|
| `healthcare` | _(No search variables required)_ | |

#### Essential Living

| Editing Host Name | Environment Variable Name | Environment Variable Value |
|-------------------|---------------------------|---------------------------|
| `luxury-retail` | _(No search variables required)_ | |

#### Visit London

| Editing Host Name | Environment Variable Name | Environment Variable Value |
|-------------------|---------------------------|---------------------------|
| `visitlondon` | _(No search variables required)_ | |

Next, you can review and deploy. When this is completed, you can now access your websites in SitecoreAI.

### 2.3. Assign Editing Hosts

Once the editing hosts have been deployed, you may need to assign the correct editing host to each site.

1. Navigate to **Channels** in SitecoreAI and go into site **Settings**
2. Go to the **Site hosts** edit
3. Set the **Editing host** field

> **Note:** The editing host name is case-sensitive. For example, if the editing host is named `travel`, using `Travel` will cause the configuration to fail.

---

## 3. Vercel Deployment

Follow the [Vercel Deployment Guide](./VERCEL-DEPLOYMENT.md) to deploy the site to Vercel.

---

## 4. Localization Support

### 4.1. Supported Languages

By default, the Forma Lux site supports the following locales, while other sites support English only:

- `en` (English)
- `fr-FR` (French)
- `es-ES` (Spanish)

### 4.2. Add Additional Languages (Optional)

1. Navigate to **Channels** → Click the three dots on the specific site → **Settings** → **Languages**
2. Add the required languages and provide translations for the newly added languages
3. After adding the new languages, update the `locales` array in the `next.config.js` file to include the new language codes

### 4.3. Other

To display languages in the language switcher on the Forma Lux site, go to `src/constants/localeOptions.ts` and update the `localeOptions` array with `code`, `label`, `currency` and `currencySymbol` for specific locale.

---

## 5. Create New Source in CEC Portal (Optional)

You can either use the Search Source which we have already configured, or you can create your own source.

- **To use the already configured Search Source:** Use the environment variables mentioned in the tables above
- **To create a new source:** Follow the documentation below to create a new source in CEC portal and link to your application. Make sure to use the search-related environment variables from the newly created source in your deployment configurations:
  - [CEC Source Creation Guide](https://sitecore.atlassian.net/wiki/x/ZwAengE)

---

## 6. Content Hub URL Migrator (Optional)

Say goodbye to manual updates: Content Hub URL Migrator for updating host names.

Follow these steps to perform a bulk update of Content Hub asset links within your site branch:

### Step 1: Locate the Target Item

In the Sitecore Content Editor, navigate to the specific site, folder, or page where you need to update links.

### Step 2: Launch the Migrator

Right-click on the item, then navigate to **Scripts** > **Custom Tools** > **Update Content Hub Host name**.

### Step 3: Enter Migration Details

A dialog window will appear. Enter the required information:

- **Current Hostname (Old):** The sandbox or old environment URL you wish to replace
- **New Hostname:** The destination Content Hub URL (e.g., your production host)

### Step 4: Execute the Update

Click **Run Migration**. The script will recursively scan all child items and replace the hostnames in all matching fields.

### Step 5: Review and Publish

Once the process finishes, an alert will show the total number of items updated. Perform a **Smart Publish** on the affected branch to push the new URLs to your live site.

### Step 6: Update Remote Patterns

Update remote patterns in `next.config` with your new hostname for the specific industry vertical site.

---

## Quick Reference

### Environment Variables Summary

| Site | Editing Host Name | Search Source Variable |
|------|-------------------|----------------------|
| Forma Lux | `nextjsstarter` | `NEXT_PUBLIC_SEARCH_SOURCE` |
| SkyWings | `travel` | `NEXT_PUBLIC_SKYWINGS_SEARCH_SOURCE` |
| GridWell | `energy` | `NEXT_PUBLIC_GRIDWELL_SEARCH_SOURCE` |
| Nova Medical | `healthcare` | _(none)_ |
| Essential Living | `luxury-retail` | _(none)_ |
| Visit London | `visitlondon` | _(none)_ |

### Common Search Environment Variables

All sites with search functionality use these common variables:

```
NEXT_PUBLIC_SEARCH_ENV=prod
NEXT_PUBLIC_SEARCH_CUSTOMER_KEY=202092313-225191452
NEXT_PUBLIC_SEARCH_API_KEY=01-8fa0d33b-6fefe6b976b8efc209b6d71333d76141d2f549be
```

---

_Document Version: 1.0_  
_Last Updated: February 2026_
