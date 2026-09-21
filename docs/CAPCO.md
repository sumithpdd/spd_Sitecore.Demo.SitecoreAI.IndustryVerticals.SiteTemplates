# Capco

SitecoreAI demo host mimicking [capco.com](https://www.capco.com/). Collection and site system name: `capco`. Consultants are the product; Perspectives are the AEO surface.

| | Value |
|--|--|
| **Reference design** | [capco.com](https://www.capco.com/) |
| **Rendering host** | `capco` → `industry-verticals/capco` |
| **Editing host** | `capco` on **SitecoreSilver** / **SitecoreSilverProd** (must match Site Grouping **RenderingHost**) |
| **Build key** | `capco` in `xmcloud.build.json` (`enabled: true`) |
| **Site name** | `capco` |
| **Collection path** | `/sitecore/content/capco` |
| **Site content path** | `/sitecore/content/capco/capco` |
| **Module** | `authoring/items/capco/capco.module.json` (`capco-scs`) |
| **GUID prefix** | `c4c0` — never reuse `a1e9` / `b40e` / `b803` / `0e0a` |
| **Push env** | `sitecoreSilverProd` |
| **Content Hub brand** | entity **108095** on [starter-verticals-2](https://starter-verticals-2.sitecoresandbox.cloud/en-us/brands/branddetail/108095) |

### Isolation layout

| Sitecore area | Path |
|---------------|------|
| Collection | `/sitecore/content/capco` |
| Site | `/sitecore/content/capco/capco` |
| Templates | `/sitecore/templates/Project/capco` |
| Renderings | `/sitecore/layout/Renderings/Project/capco` |
| Placeholders | `/sitecore/layout/Placeholder Settings/Project/capco` |
| Media | Content Hub Brand **108095** (DAM `src` + `dam-id`). Never hotlink `capco.com`. |

## Pages

Live IA from [capco.com](https://www.capco.com/) (Our Story, Expertise industries, Perspectives, Join Us) plus the demo storyboard.

| Route | Purpose |
|-------|---------|
| `/` | Home — The Expert Advantage hero, industry promo, Perspectives promo |
| `/about-us` | Our Story — expert-led, AI-infused, impact-focused |
| `/industries` | Expertise index |
| `/industries/banking-and-payments` | Banking & Payments |
| `/industries/capital-markets` | Capital Markets (T+1 story) |
| `/industries/insurance` | Insurance |
| `/industries/wealth-and-asset-management` | Wealth and Asset Management |
| `/industries/energy` | Energy |
| `/perspectives` | Insights listing |
| `/perspectives/europes-t-plus-1-market-must-prove-readiness` | Named conversion Perspective — Elisabeth Plakinger |
| `/people` | Consultants listing |
| `/people/elisabeth-plakinger` | Principal Consultant, Capital Markets / T+1 |
| `/people/charlotte-byrne` | Principal Consultant, Banking & Payments / AI |
| `/people/anne-marie-rowland` | Chief Executive Officer |
| `/people/marina-costa` | Senior Consultant, Brazil — Meet our people |
| `/careers` | Join Us |
| `/search` | Site search |

### Story pages (presenter URLs — not in primary nav)

The uploaded storyboard file was not in the workspace; this site uses the Legal 3-act demo adapted to Capco (consultants as product, Perspectives AEO, Mini CMS, Scrunch on FS + Energy).

| Route | Purpose |
|-------|---------|
| `/what-we-heard` | RFP pain table, personas (Thomas, Emma, Priya, Vince, David) |
| `/story` | Three-act storyboard — 19 beats linking to Elisabeth, T+1, industries |

Conversion path: **Priya Raman (CDO) → ChatGPT → T+1 Perspective → Elisabeth Plakinger**.

## Brand

Black `#111111` bands, lime accent `#C8D400`, charcoal type on white. Token table: `industry-verticals/capco/src/assets/base/variables.css`. CSS class names stay `pm-*` from the Legal clone.

## Components

Registered in `industry-verticals/capco/.sitecore/component-map.ts`.

| Rendering | Role |
|-----------|------|
| `Header` | Sticky bar — Our Story / Expertise / Perspectives / Meet our people / Join Us |
| `HeroBanner` | Home photography + Expert Advantage |
| `Promo` | Industry and Perspectives bands |
| `PeopleSearch` | `/people` listing |
| `PersonProfile` | Consultant profile |
| `ArticleListing` / `ArticleDetails` | Perspectives |
| `PageHeading` | Title + intro |
| `SiteSearch` | `/search` |
| `StoryHeard` | `/what-we-heard` |
| `StoryBoard` | `/story` |
| `Footer` | Legal links + copyright |

Catalog fallbacks: `src/lib/people-catalog.ts`, `home-catalog.ts`, `search-catalog.ts`, `capco-story.ts`.

Regenerate the map after adding React components:

```bash
cd industry-verticals/capco
npm run sitecore-tools:generate-map
```

## Media

```powershell
. 'C:\Users\spd\OneDrive - Sitecore\Work\Brother\_content-ready\set-ch-env.ps1'  # never commit
cd authoring/items/capco/scripts
node download-capco-images.mjs
.\Upload-CapcoContentHub.ps1
.\Set-CapcoContentHubMetadata.ps1
node patch-capco-dam-images.mjs
```

Image fields must use DAM `src` + `dam-id`. Maps: `authoring/items/capco/scripts/media-maps/`.

## Scripts

```powershell
cd authoring/items/capco
node scripts/generate-capco-site.mjs
dotnet sitecore serialization validate --fix -i capco-scs
dotnet sitecore serialization push -n sitecoreSilverProd -i capco-scs
```

Do **not** re-run `generate-capco-site.mjs` after hand-editing Home.yml / DAM stamps unless you intend to regenerate.

PlaceholdersPath already points at `/sitecore/layout/Placeholder Settings/Project/capco`. Both site and project trees have `headless-main` Allowed Controls.
