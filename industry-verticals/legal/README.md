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

Person detail pages (`/people/dawn-allen`, `/people/bill-ryan`, `/people/hammad-akhtar`, `/people/sally-williamson`, and related profiles) use the **Person** page design: Header, Person (breadcrumb, profile, quote, experience, insights, related, newsletter CTA), and Footer partials. Profile photos sit on the **right**.

The **Promo** component matches the **retail (FormaLux)** variants where applicable, plus the Legal **Stacked** variant:

- **Default:** Two-column grid with `PromoImageOne` (or three images when the “show multiple images” style is enabled), eyebrow, title with optional accent line, rich text, and `arrow-btn` link.
- **WithFullImage:** Full-width image from **`PromoImageTwo`**, then subtitle, title, and description in a two-column row.
- **WithQuote:** Large decorative quote icon, `PromoContent` block, and **`PromoImageOne`** with optional reversed layout.
- **Stacked:** Image with **subtitle** as an overlay banner strip (brand teal `accent`, white text); below, title and CTA (`src/assets/components/header-footer-legal.css`).
- **ImageRight:** Copy left, image right (legacy Careers layout).
- **Newsletter:** Separate teal band (not nested in Out-Law) with heading, body and Sign-up CTA.
- **WithBackground:** `PromoImageOne` as a full-bleed background (Careers on the homepage).

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

**Component map:** `.sitecore/component-map.ts` — `PeopleSearch` (client), `PersonBreadcrumb`, `PersonProfile`, `PersonQuote`, `PersonExperience` (client), `PersonInsights` (client), `PersonRelated`, `HomeExpertise` (client), `OutLawHome`, `ReachStrength`, `PressReleases`, `AnnouncementSearch` (client), `NewsArticle`, `LatestNews`, `StoryHeard`, `StoryBoard`, `RelatedWork`, `PracticePage`, `Header` (client), `Footer`, `HeroBanner`, `Promo` (Newsletter, SidebarSignup, WithBackground), `ArticleDetails`. Regenerated with `npm run sitecore-tools:generate-map`.

**Data / DAM maps:** [`authoring/items/legal/scripts/media-maps/`](../../authoring/items/legal/scripts/media-maps/README.md) — `legal-sitecore-data-map.csv`, `legal-sitecore-image-field-map.csv`, `content-hub-asset-registry.csv`.

Person pages (`/people/dawn-allen`, `/people/hammad-akhtar`, `/people/sally-williamson`, and related profiles) use the **Person** page design. Photos sit on the **right** of the listing and profile. Specialisms is a multi-select Tag treelist.

Out-Law articles (CIGA guide and news) use `NewsArticle` with nested placeholder **`article-sidebar-{*}`** for **LatestNews** and **Promo SidebarSignup** (add or remove in Pages).

Story presenter URLs (not in primary nav): `/what-we-heard`, `/story`. Live conversion surfaces: `/people/dawn-allen`, `/sectors/professional-public-services`, `/expertise/restructuring`, Out-Law essential-supplier guide.

**Content Hub:** Brand **PinsentMason** — [`docs/LEGAL.md`](../../docs/LEGAL.md#content-hub) and [`authoring/items/legal/scripts/media-maps/`](../../authoring/items/legal/scripts/media-maps/README.md).

**Brand tokens:** [`docs/PINSENT-MASONS-BRAND.md`](./docs/PINSENT-MASONS-BRAND.md).

## Demo login and CDP engagement panel

Same pattern as Bristan / Brother:

- **Chat with Pinsent** (bottom-left) — story Q&A (Priya → CIGA guide → Dawn; Thomas, Emma, Vince). Opens on `?utm_source=chatgpt`
- **Sign in** in the header — demo account (`spd@sitecore.net`) plus email identify via Cloud SDK `identity()`
- **Engagement panel** — maroon floating button (bottom-right) with session events and guest profile

Wired in `src/pages/_app.tsx` (`DemoAuthShell`, `AiChatbot`, `CdpProfileShell`).
