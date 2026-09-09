# Legal — Pinsent Masons

## Overview

The **Legal** site is a Pinsent Masons demo vertical mimicking [pinsentmasons.com](https://www.pinsentmasons.com/). Isolated Sitecore collection `/sitecore/content/legal`, site `/sitecore/content/legal/legal`, rendering host `industry-verticals/legal`.

Editing host **`legal`** is registered on XM Cloud project **SitecoreSilver** / **SitecoreSilverProd**. See **[docs/LEGAL.md](../../docs/LEGAL.md)** for pages, serialization, Content Hub Brand PinsentMason, and host assignment.

Brand: maroon `#7C0A2E`, dark teal `#005955` / `#0d3d3c`. Tokens live in `src/assets/base/variables.css`.

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

## Add editing host to XM Cloud

On **SitecoreSilver** / **SitecoreSilverProd** the editing host is named **`legal`**. If it is missing (split deployment), add it in XM Cloud Deploy:

1. Sitecore Cloud Portal → XM Cloud Deploy → **SitecoreSilver**
2. **Editing Hosts** → **Add editing host**
3. **Editing host name:** `legal` (must match `xmcloud.build.json`)
4. **Link to authoring environment:** SitecoreSilver / SitecoreSilverProd
5. GitHub account, repository `spd_Sitecore.Demo.SitecoreAI.IndustryVerticals.SiteTemplates`, branch `main`
6. Enable **Auto deploy on push to repository**
7. **Save**, then **Build and deploy**

Then set **Settings → Site Grouping → legal** → **Predefined application editing host** and **RenderingHost** to `legal` (not `Default`). Full steps: [docs/LEGAL.md — Editing host](../../docs/LEGAL.md#editing-host-sitecoresilverprod).

## Header / footer / promo styling (Legal vertical)

The Legal site uses shared layout classes for header, footer, and promos (see `src/assets/components/header-footer-legal.css`). Brand colors map to Pinsent Masons tokens in `src/assets/base/variables.css`.

The **Promo** component matches the **retail (FormaLux)** variants where applicable, plus the Legal **Stacked** variant:

- **Default:** Two-column grid with `PromoImageOne` (or three images when the “show multiple images” style is enabled), eyebrow, title with optional accent line, rich text, and `arrow-btn` link.
- **WithFullImage:** Full-width image from **`PromoImageTwo`**, then subtitle, title, and description in a two-column row.
- **WithQuote:** Large decorative quote icon, `PromoContent` block, and **`PromoImageOne`** with optional reversed layout.
- **Stacked:** Image with **subtitle** as an overlay banner strip (brand teal `accent`, white text); below, title and CTA (`src/assets/components/header-footer-legal.css`).

SXA style hooks (e.g. `reversed`, `show-multiple-images`, `hide-promo-shapes`) are defined in `src/types/styleFlags.ts` (same pattern as retail).

Example of the Promo Stacked variant (subtitle as banner strip):

![Promo Stacked variant – subtitle as banner strip](../../docs/promo-stacked-banner.png)

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
