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
| `/about-us/announcements` | Newsroom (PressReleasePage listing) |

### Story pages (presenter URLs — not in primary nav)

The uploaded storyboard file was not in the workspace; this site uses the Legal 3-act demo adapted to Capco (consultants as product, Perspectives AEO). Marketplace apps, Send/HubSpot, and slides cover AEO analyser, Mini CMS, email, campaigns, and integrations — those are not Capco host pages.

| Route | Purpose |
|-------|---------|
| `/what-we-heard` | RFP pain table, personas (Thomas, Emma, Priya, Vince, David) |
| `/story` | Three-act storyboard — 19 beats linking to Elisabeth, T+1, industries |

Conversion path: **Priya Raman (CDO) → ChatGPT → T+1 Perspective → Elisabeth Plakinger**.

## Brand

Black `#111111` bands, lime accent `#C8D400`, charcoal type on white. Token table: `industry-verticals/capco/src/assets/base/variables.css`. CSS class names stay `pm-*` from the Legal clone.

## Components

Pages drag-and-drop uses **project** `headless-main` Allowed Controls. OOTB Page Content / Structure / Media / Navigation / Forms / FEaaS come first. Capco layout JSON renderings are listed next. **Do not** put `Header`, `Footer`, `PersonProfile`, or `ArticleDetails` on that palette — they broke Add component last time. They stay on partials and serialized page layout.

Full inventory (including host-only leftovers): [`industry-verticals/capco/README.md`](../industry-verticals/capco/README.md).

| Rendering | Role | On `headless-main`? |
|-----------|------|:-------------------:|
| `Title` / `RichText` / `Image` / `PageContent` | OOTB copy and media | yes |
| `Container` / `ColumnSplitter` / `RowSplitter` | OOTB layout, width/height | yes |
| `Navigation` / `LinkList` | OOTB nav | yes |
| `HeroBanner` | Expert Advantage | yes |
| `Promo` | Industry and Perspectives bands | yes |
| `PageHeading` | Title + intro | yes |
| `ArticleListing` | Perspectives / newsroom | yes |
| `PeopleSearch` | `/people` listing | yes |
| `SiteSearch` | `/search` | yes |
| `InfographicBlock` / `MediaEmbed` | Campaign visual, video, podcast | yes |
| `Header` / `Footer` | Partials | no |
| `PersonProfile` | Consultant page | no (on Person pages) |
| `ArticleDetails` | Perspective / press body | no (on article pages) |
| `StoryHeard` / `StoryBoard` | Presenter URLs | no (on those pages) |

Catalog fallbacks: `src/lib/people-catalog.ts`, `home-catalog.ts`, `search-catalog.ts`, `capco-story.ts`, `taxonomy.ts`.

## Content approval workflow

Capco uses two workflows in `capco-scs` (same split as [Sitecore Accelerate](https://developers.sitecore.com/learn/accelerate/xm-cloud/implementation/information-architecture/workflow) / [SITECOREAI-WORKFLOW.md](SITECOREAI-WORKFLOW.md)):

| | Workflow A — pages | Workflow B — datasources |
|--|--|--|
| Name | **Capco Content Approval Workflow** `{C4C00040-…000001}` | **Capco Content Datasource Workflow** `{C4C00040-…000011}` |
| Path | `/sitecore/system/Workflows/Capco Content Approval Workflow` | `/sitecore/system/Workflows/Capco Content Datasource Workflow` |
| Assign on | `ArticlePage`, `PersonPage`, `PressReleasePage`, `Page` `__Standard Values` | Capco `HeroBanner`, `Header`, `Footer` `__Standard Values`. Existing OOTB Promo items are stamped on the item (do not change the global Promo template). |
| Live demo items | People, Perspectives, press — **Approved** | Home Hero, Header, Footer, Expertise / Thinking Promos — **Approved** |

### Workflow A (pages)

| State | Command | Next |
|-------|---------|------|
| **Draft** (initial) | Submit | Editorial Review |
| **Editorial Review** | Submit to Principal / Return to Draft | Principal Approval / Draft |
| **Principal Approval** | Approve / Reject | Approved / Draft |
| **Approved** (Final) | Auto Publish (`deep=1&smart=1`) | Live |

Edit an Approved page → new version starts in **Draft**. Administrators bypass workflow — use a content-author role in the demo. Emma’s story is Editorial Review; principal sign-off is Principal Approval.

Index pages (`/`, `/industries`, `/perspectives` listing) stay on OOTB App Route and do **not** inherit these standard values.

```powershell
cd authoring/items/capco
node scripts/generate-capco-workflow.mjs
```

Do **not** invent Datasource Workflow Action YAML. After push, insert those actions in CM under page Submit / Approve / Reject if datasources should move with the page, then pull.

## Article and press templates

`ArticlePage` (`c4c00010-…000050`) bases on App Route. `PressReleasePage` bases on ArticlePage. Multi-select Treelists: Tags, Categories, Sectors, Services, Regions, RelatedContent, Authors. Also Summary, Kicker, VideoUrl, PodcastUrl, Transcript, Infographic, SuggestedTags, AeoNotes, SeoTitle, HubSpotFormId.

Taxonomy items live under `/sitecore/content/capco/capco/Data/Taxonomy`. Header region selector + signed-in industry prefs filter listings.

OOTB (demo in Pages, no extra template work): AI translations, flexible layout, component width/height (grid), analytics/CDP, search, personalisation.

```powershell
cd authoring/items/capco
node scripts/generate-capco-content-ops.mjs
```

Do **not** re-run `generate-capco-site.mjs` after DAM stamps.

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

PlaceholdersPath already points at `/sitecore/layout/Placeholder Settings/Project/capco`. Both site and project `headless-main` trees list OOTB groups (Page Content, Page Structure, Media, Navigation, Forms, FEaaS) plus Capco layout JSON renderings. Detail components stay off that list.

Home include is **CreateAndUpdate**. If `/capabilities`, `/cms`, `/aeo`, `/email`, `/campaigns`, or `/integrations` were already pushed, delete those items in CM — YAML deletion will not remove them.
