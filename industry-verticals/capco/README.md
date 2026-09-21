# Capco

SitecoreAI demo host mimicking [capco.com](https://www.capco.com/). Isolated collection `/sitecore/content/capco`, site `/sitecore/content/capco/capco`, rendering host `industry-verticals/capco`.

Editing host **`capco`** is on XM Cloud **SitecoreSilver** / **SitecoreSilverProd**. Full notes: **[docs/CAPCO.md](../../docs/CAPCO.md)**.

Brand: black `#111111`, lime `#C8D400`. Tokens: `src/assets/base/variables.css`. CSS class names stay `pm-*`.

## Developer expectations

- Tailwind + Shadcn
- Content SDK Pages Router
- Isolated collection GUID prefix **`c4c0`** (never `a1e9` / `b40e` / `b803` / `0e0a`)
- Images from Content Hub brand **108095** only — never hotlink `capco.com`

## Run locally

```powershell
cd industry-verticals\capco
copy .env.remote.site .env.local
# Set SITECORE_EDGE_CONTEXT_ID, NEXT_PUBLIC_DEFAULT_SITE_NAME=capco,
# SITECORE_EDITING_SECRET, NEXT_PUBLIC_BASE_URL
npm install
npm run sitecore-tools:generate-map
npm run dev
```

Open `http://localhost:3000`.

## Pages authoring — `headless-main`

Pages “Add component” reads **project** placeholder settings (`/sitecore/layout/Placeholder Settings/Project/capco/headless-main`), not only the site Presentation copy. Both trees must list the **same Allowed Controls**.

**Do not** put page-detail renderings (`PersonProfile`, `ArticleDetails`, `Header`, `Footer`) as the main Allowed Controls. Those live on page designs / partials / serialized page layout. Last time they were the only items on `headless-main`, the Add component panel did not work.

Allowed on `headless-main` (drag and drop):

### OOTB (wizard Page Content / Structure / Media / Navigation / Forms / FEaaS)

| Component | Role |
|-----------|------|
| `Title` | Heading |
| `Promo` | Promotional band (SXA) |
| `RichText` | Body copy |
| `PageContent` | Route title/body |
| `Container` | Width / background wrapper |
| `ColumnSplitter` | Column layout (editor-controlled widths) |
| `RowSplitter` | Row layout (editor-controlled heights) |
| `Image` | DAM image |
| `Navigation` | Nav |
| `LinkList` | Link list |
| Sitecore Forms | Form wrapper |
| FEaaS | BYOC / FEAAS |

### Capco layout (JSON renderings)

| Rendering | Role |
|-----------|------|
| `HeroBanner` | Expert Advantage hero |
| `Promo` | Industry / Perspectives promo (Capco datasource) |
| `PageHeading` | Title + intro |
| `ArticleListing` | Perspectives / newsroom list |
| `PeopleSearch` | Consultant listing |
| `SiteSearch` | `/search` |
| `InfographicBlock` | Campaign infographic |
| `MediaEmbed` | Video / podcast / transcript |

AEO analyser, Mini CMS, email studio, campaign flows, and integrations are **not** Capco pages — demo those with a marketplace app, Send/HubSpot, or slides.

### Bound to a page (not on the Add palette)

| Rendering | Where it is used |
|-----------|------------------|
| `Header` / `Footer` | Partial designs |
| `PersonProfile` | Person pages (`/people/*`) |
| `ArticleDetails` | Perspective / press pages |
| `StoryHeard` / `StoryBoard` | `/what-we-heard`, `/story` |

After changing Allowed Controls:

```powershell
cd authoring/items/capco
dotnet sitecore serialization validate --fix -i capco-scs
dotnet sitecore serialization push -n sitecoreSilverProd -i capco-scs
```

Do **not** re-run `generate-capco-site.mjs` after DAM / Home edits.

## Full component list (host)

Registered by `npm run sitecore-tools:generate-map` from `src/components/`. Helpers stay in `src/lib/` so they are not mapped.

| Component | Sitecore JSON rendering | Notes |
|-----------|:-----------------------:|-------|
| `Header` | yes | Partial `headless-header` |
| `Footer` | yes | Partial `headless-footer` |
| `HeroBanner` | yes | Home |
| `Promo` | yes | Home / industries |
| `PageHeading` | yes | Generic pages |
| `ArticleListing` | yes | Perspectives, newsroom |
| `ArticleDetails` | yes | Re-exports Capco `NewsArticle` |
| `PeopleSearch` | yes | `/people` |
| `PersonProfile` | yes | `/people/*` |
| `SiteSearch` | yes | `/search` |
| `InfographicBlock` | yes | Campaign visual |
| `MediaEmbed` | yes | Video / podcast |
| `StoryHeard` | yes | `/what-we-heard` |
| `StoryBoard` | yes | `/story` |
| `Title` / `RichText` / `Image` / `PageContent` | OOTB | Page Content group |
| `Container` / `ColumnSplitter` / `RowSplitter` | OOTB | Page Structure group |
| `Navigation` / `LinkList` | OOTB | Navigation group |
| `HomeExpertise` | host only | Fallback expertise tabs |
| `OutLawHome` | host only | Perspectives cards |
| `PressReleases` | host only | Newsroom cards |
| `NewsArticle` | via `ArticleDetails` | Taxonomy, related, AEO fields |
| `PersonBreadcrumb` / `PersonQuote` / `PersonExperience` / `PersonInsights` / `PersonRelated` | host | Legal clone leftovers; not on Capco page design |
| `HeaderSearch` | `src/lib/` | Header overlay, not a rendering |
| `RegionSelector` | `src/lib/` | Header region filter |
| Demo auth / CDP / chatbot | `src/components/demo`, `cdp-profile-panel`, `ai-chatbot` | Wired in `_app.tsx`, not Pages |

People catalog (only these four): Elisabeth Plakinger, Charlotte Byrne, Anne-Marie Rowland, Marina Costa.

## Content SDK & shared scripts

- `CdpPageView` — CDP page tracking
- `FEAASScripts` — FEAAS
- `SitecoreStyles` — XM Cloud styles

Shared inventory: [`docs/COMPONENTS.md`](../../docs/COMPONENTS.md).

## Demo login

Header **Sign in** (`spd@sitecore.net`) plus **region selector**. Signed-in users can set industry preferences and a demo role (visitor / client / editor / admin). Region + taxonomy filter Perspectives, press, and expertise fallbacks.

People, Perspectives, and press use **Capco Content Approval Workflow** (Draft → Editorial Review → Principal Approval → Approved). Hero / Header / Footer / Promo datasources use **Capco Content Datasource Workflow**. Existing items are **Approved**. Demo as a content author — administrators bypass workflow. See [docs/CAPCO.md](../../docs/CAPCO.md#content-approval-workflow).

## Content Hub

Brand entity **108095** on [starter-verticals-2](https://starter-verticals-2.sitecoresandbox.cloud/en-us/brands/branddetail/108095). Maps: `authoring/items/capco/scripts/media-maps/`.
