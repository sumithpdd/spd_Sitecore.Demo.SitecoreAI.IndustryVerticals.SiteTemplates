# Legal

## Overview

The **Legal** site is a demo vertical cloned from the Energy starter. It is intended to showcase how a legal or professional services brand can be implemented on XM Cloud using the shared Industry Verticals starter.

## Developer Expectations

- Tailwind-based styling (Shadcn)
- Modular components for reuse
- Alignment with shared Industry Verticals patterns (navigation, layout, search)

## Preconditions

1. You have deployed your XM Cloud environment already. If not, follow this guide: [Deploy a Project and Environment](https://doc.sitecore.com/xmc/en/developers/xm-cloud/deploy-a-project-and-environment.html).

## Run site locally

1. Clone the repository (if not yet done)  
   `git clone https://github.com/Sitecore/Sitecore.Demo.SitecoreAI.IndustryVerticals.SiteTemplates`
2. From the root of the repository navigate to the site app folder  
   `cd industry-verticals\legal`
3. Copy the environment file `.env.remote.example` (from your XM Cloud environment configuration)
4. Rename the copied file to `.env.local`
5. Edit `.env.local` and provide values for at least:
   - `SITECORE_EDGE_CONTEXT_ID`
   - `NEXT_PUBLIC_DEFAULT_SITE_NAME`
   - `NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID`
   - `SITECORE_EDITING_SECRET`
   - `NEXT_PUBLIC_BASE_URL`
6. Install dependencies:  
   From `industry-verticals\legal` run:
   - `npm install`
7. Run the site locally:
   - `npm run dev`
8. Access the site:
   - Visit `http://localhost:3000` in your browser.

## Add Editing host to XM Cloud

If you have not enabled the split deployment feature, your editing hosts are automatically created based on the `xmcloud.build.json` configuration when `enabled` is set to `true`. The following steps are only required if you **have** enabled the split deployment feature:

1. Go to Sitecore Cloud Portal `https://portal.sitecorecloud.io`
2. Open XM Cloud Deploy
3. Select the Project that has been deployed
4. Switch to the **Editing Hosts** tab
5. Click **Add editing host**
6. Provide Editing host name `legal` (matching `xmcloud.build.json`)
7. Verify the authoring environment, source code provider, GitHub account, repository, and branch are correctly set
8. Optionally enable **Auto deploy**
9. Click **Save**
10. On the new editing host, click the `...` menu and choose **Build and deploy**

Additional info: You do not need to create rendering host items manually; these are created automatically when you create an editing host based on the `xmcloud.build.json` entry for `legal`.

## Content SDK & Shared Components

The Legal site uses the shared Content SDK and component patterns from the Industry Verticals starter:

- `CdpPageView` – CDP (Customer Data Platform) page tracking
- `FEAASScripts` – FEAAS (Front-End as a Service) scripts
- `SitecoreStyles` – Sitecore styling integration

For the complete list of components and shared elements across all verticals, see:  
[`docs/COMPONENTS.md`](../../docs/COMPONENTS.md)

# Retail - Demo Site (NextJS) - nextjsstarter

## Overview

This template is built for easy scaffolding of new Vertical sites

## Developer Expectations

- Tailwind-based styling (Shadcn)
- Modular components for reuse

## Preconditions

1. You have deployed your XM Cloud environment already. If not follow this link: [Deploy a Project and Environment](https://doc.sitecore.com/xmc/en/developers/xm-cloud/deploy-a-project-and-environment.html)

## Build and run site locally

1. Clone the repository (if not yet done)
   `git clone https://github.com/Sitecore/Sitecore.Demo.XMCloud.IndustryVerticals.SiteTemplates`
2. Starting from the root of the repository navigate to site app folder
   `cd industry-verticals\$site`
3. Copy the environment file `.env.remote.example`
4. Rename the copied file to `.env.local`
5. Edit `.env.local` and provide a value for `SITECORE_EDGE_CONTEXT_ID`, `NEXT_PUBLIC_DEFAULT_SITE_NAME`, `NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID`, `SITECORE_EDITING_SECRET`. (More info: [Environment variables in XM Cloud](https://doc.sitecore.com/xmc/en/developers/xm-cloud/get-the-environment-variables-for-a-site.html))

6. Install dependencies:
   from `industry-verticals\$site` run `npm install`
7. Run the site locally:
   `npm run dev`
8. Access the site:
   Visit http://localhost:3000 in your browser.

## Add Editing host to XM Cloud

If you have not enabled the split deployment feature your edting hosts are automatically created based on the xmcloud.build.json if enabled is set to true. The following steps are not required. Only if you have enabled the split deployment feature, continue with the next steps.

1. Go to Sitecore Cloud Portal https://portal.sitecorecloud.io
2. Open XM Cloud Deploy
3. Select Project that has been deployed
4. Switch to tab "Editing Hosts"
5. Click "Add editing host"
6. Provide Editing host name `nextjsstarter` as per xmcloud.build.json
7. Check if the link to authoring environment is set correctly (should be by default)
8. Check if the source code provider is set correctly (should be by default)
9. Check if the GitHub Account is set correctly (should be by default)
10. Check if repository is set correctly (should be by default)
11. Check if Branch is set correctly (should be by default)
12. Set the Auto deploy option (recommended)
13. No custom environment variables are required
14. Click "Save"
15. On the new new editing host click the ... and hit "Build and deploy"

Additional Info: You do not have to create rendering host items in XM Cloud as those are created automatically for you when creating a rendering host. Mapping of sites using site templates to editing hosts is also done automatically.

[Documentation](https://doc.sitecore.com/xmc/en/developers/content-sdk/sitecore-content-sdk-for-xm-cloud.html)
