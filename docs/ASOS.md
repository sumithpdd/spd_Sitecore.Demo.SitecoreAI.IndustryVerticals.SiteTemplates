# ASOS

SitecoreAI demo host mimicking [asos.com](https://www.asos.com/). Emma (story-only) asks for wide-leg jeans under £50, filters the denim edit by body fit, and hearts three pieces into My Edit “Berlin, October”.

| | Value |
|--|--|
| **Reference design** | [asos.com](https://www.asos.com/) |
| **Rendering host** | `asos` → `industry-verticals/asos` |
| **Editing host** | `asos` on **SitecoreSilver** / **SitecoreSilverProd** (must match Site Grouping **RenderingHost**) |
| **Build key** | `asos` in `xmcloud.build.json` (`enabled: true`) |
| **Site name** | `asos` |
| **Collection path** | `/sitecore/content/asos` |
| **Site content path** | `/sitecore/content/asos/asos` |
| **Module** | `authoring/items/asos/asos.module.json` (`asos-scs`) |
| **GUID prefix** | Journey pages `a50c` — never reuse `a1e9` / `b40e` / `b803` / `0e0a` / `c4c0` |
| **Push env** | `sitecoreSilverProd` |
| **Content Hub brand** | entity **108526** on [starter-verticals-2](https://starter-verticals-2.sitecoresandbox.cloud/en-us/brands/branddetail/108526) |

Never hotlink `asos.com` or `images.asos-media.com` in Image fields. DAM `src` + `dam-id` only after upload.

## Story

Arrive `/` → `/women` → the denim edit (`/the-denim-drop/cat/?cid=88011`, wide-leg jeans under £50, body-fit facets) → PDP `/asos-design/wide-leg-jeans-in-mid-wash/prd/8805001` (model height, size worn, fabric) → Style Feed → heart the jean, chocolate knit, and Chelsea boot into **Berlin, October** → Curation insight. Belle Paris (`200415553`) and the Weekday pyjama PDP (`211674477`) stay in the catalogue.

A complete PDP adds **Buy the look** (“Shop the model's full 'fit”) and **People also bought**. `?pdp=thin` keeps size and price only.

## Pages (live URL shapes)

| Route | Beat |
|-------|------|
| `/` | ASOS homepage (Women / Men tiles) |
| `/women` | Women department |
| `/women/new-in/cat/?cid=27108` | Women's New In |
| `/the-denim-drop/cat/?cid=88011` | Campaign / edit |
| `/women/trends/denim/cat/?cid=17014` | Women's denim. ProductListing (`CategoryId` 17014) plus the downloaded ProductPage items (Title, Brand, Price, Colour, Image, Video). On **sitecoreSilverProd** master. |
| `/search?q=denim` | Those downloaded denim products |
| `/search?q=wide-leg%20jeans` | Header and full-page search both autocomplete “wide-leg jeans” |
| `/women/ctas/hub-edit-12/cat/?cid=51126` | New In: Selling Fast |
| `/women/ctas/social-edit-22/cat/?cid=52649` | New season colours |
| `/women/ctas/curated-category-13/cat/?cid=52558` | New-season edit |
| `/women/ctas/topshop-edit-9/cat/?cid=52393` | September Shift |
| `/women/sale/ctas/price-point-2/cat/?cid=51237` | Sale under £10 |
| `/shared-board/{uuid}` | Shared board (`acquisitionsource=pasteboard` is ignored) |
| `/petite-denim/cat/?cid=88016` | Category + body-fit facets |
| `/topshop/topshop-belle-paris-camisole-in-blue/prd/200415553` | Story PDP — Buy the look + People also bought |
| `/weekday/weekday-flannel-pyjama-bottoms-in-black-check/prd/211674477` | Weekday PDP — same complete layout |
| `/women/a-to-z-of-brands/topshop/cat/?cid=29299` | Brand listing |
| `/style-feed` | Style Feed + shop the look |
| `/saved-items` · `/my-edit` | Save / return |
| `/curation-insight` | Editor feedback |
| `/bag` · `/account` | P1 light checkout / known customer |
| `/search` | Catalogue search (`SiteSearch`) |
| `/us/…` `/au/…` `/de/…` | Market variants |

## Components

Registered in `industry-verticals/asos/.sitecore/component-map.ts` (`npm run sitecore-tools:generate-map`). Journey renderings use GUID prefix `a50c0001`.

| Component | Rendering | Where it sits |
|-----------|-----------|----------------|
| `Header` | `a50c0001-1111-4000-8000-000000000001` | Partial Design **Header** → `headless-header` |
| `Footer` | `a50c0001-1111-4000-8000-000000000002` | Partial Design **Footer** → `headless-footer` |
| `HomeLanding` | `a50c0001-1111-4000-8000-000000000003` | Home `headless-main` |
| `GenderLanding` | `a50c0001-1111-4000-8000-000000000004` | `/women` `headless-main` |
| `CategoryListing` | `a50c0001-1111-4000-8000-000000000005` | `…/cat` `headless-main` |
| `ProductPage` | `a50c0001-1111-4000-8000-000000000006` | `…/prd/{id}` `headless-main` |
| `SiteSearch` | `a50c0001-1111-4000-8000-000000000007` | `/search` `headless-main` |
| `SharedBoard` | component map only | `/shared-board/{uuid}` via the catch-all. Not a Pages rendering yet. |

**Default** page design `a50c0001-5555-4000-8000-000000000001` chains Header + Footer partials. The same chrome is on **Product** (`…000002`), **ProductPage** (`…000003`) and **ProductListing** (`…000004`). `TemplatesMapping` on `Presentation/Page Designs` binds Page, Product, ProductPage and ProductListing. Layout falls back to Header and Footer when those placeholders are empty. Palette: `Presentation/Available Renderings/ASOS`.

`AiChatbot` (bottom-left) and `CdpProfileShell` (bottom-right) mount from `_app.tsx` on every page. Header typeahead is `HeaderSearch` in `src/lib`.

Also on the host (not all wired as page renderings yet): product card + merch states, edit hero, edit carousel, trending chips, Style Feed, personalised rail, market switcher, heart/save, My Edit, curation insight, bag, account. Standalone Next routes use `JourneyLayout` until Edge layout is published.

## Media

```powershell
# Copy authoring/items/brother/scripts/set-ch-env.example.ps1 to OneDrive and fill secrets. Never commit it.
. '{OneDrive}/Work/Brother/_content-ready/set-ch-env.ps1'
cd authoring/items/asos/scripts
node download-asos-images.mjs
.\Upload-AsosContentHub.ps1
.\Set-AsosContentHubMetadata.ps1
node write-dam-registry.mjs
```

Maps: `authoring/items/asos/scripts/media-maps/` (`asos-page-map.csv` with `YamlFile`, `asos-item-index.csv`, `content-hub-asset-registry.csv`, `Asos-image-xml.json`). Refresh the two CSV indexes with `node authoring/items/asos/scripts/write-asos-maps.mjs`.

Wordmark assets on brand **108526**: `asos-logo-white.png` (header, asset 109876) and `asos-logo.png` (asset 109883). The header uses the DAM public URL from `dam-registry.ts`, with `public/asos/logo-white.png` only if that entry is missing. Story stills that are already in the registry use `src` + `dam-id`. The downloaded denim stills are not in that registry yet.

Long product paths (the Weekday PDP and the denim catalogue) are stored in hash folders under `authoring/items/asos/serialized-content/asos/{HASH}/`. The `Path:` field is still the Sitecore path. `asos-item-index.csv` is the lookup. After either serializer, run `dotnet sitecore serialization validate --fix -i asos-scs` before push. That move is what let the 723-item push apply on sitecoreSilverProd.

Denim stills and videos stay on disk under `industry-verticals/asos/public/asos/products/live/` and `public/asos/videos/`. Both are gitignored. Do not commit `authoring/items/asos/scripts/media-staging/`. Image fields on those products stay empty until Content Hub upload.

## Content tree

`node authoring/items/asos/scripts/serialize-asos-ia.mjs` writes GUID prefix `a50c0005` under `/sitecore/content/asos/asos` (the collection cannot own `/sitecore/content/Shared` beside other sites):

- **Shared** — Taxonomy (gender, product type, fit segment, occasion, trend, market, brand, material, attribute), BrandKits (ASOS, Topshop), Media (Product, Editorial, Crops).
- **Catalogue** — Categories (Women/Dresses/Midi) and Products/8805001 with Variants and FitData. Swap this branch for a federated PIM feed in production.
- **Sites** — ASOS and Topshop, each with Home, Women, Men, Listings, Edits, Campaigns, StyleFeed, Boards, Account.
- **Signals** — SaveEvents, BoardCompositions, ReturnReasons, ContentScores.

Public edit URLs stay under Home (`/women/ctas/…/cat`, `/women/sale/ctas/price-point-2/cat`) as ProductListing items. Search facets: `refine=attribute_10992:61379` (dresses), `attribute_1047:8387,8404` (jumpers and cardigans), `attribute_10159:63025` (adidas Samba), `base_colour:4` (black), `attribute_12017:63014` (stainless steel), `pricerange=45-95`, `iscurated=true`. Sign in on `/account` stores body fit and size for the session; listings, search, shared boards, and the product page use it.

## Run locally

```powershell
cd industry-verticals\asos
copy .env.remote.site .env.local
npm install
npm run sitecore-tools:generate-map
npm run dev
```

Open `http://localhost:3000/`, then `/women` and `/women/new-in/cat/?cid=27108`.
