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

Page, component, and media inventory (what is editable in Pages, and what still comes from code): [`ASOS-INVENTORY.md`](ASOS-INVENTORY.md).

## Story

Arrive `/` → `/women` → the denim edit (`/edits/the-denim-drop`, wide-leg jeans under £50, body-fit facets) → PDP `/products/wide-leg-jeans-in-mid-wash` (model height, size worn, fabric) → Style Feed → heart the jean, chocolate knit, and Chelsea boot into **Berlin, October** → Curation insight. Belle Paris (`200415553`) and the Weekday pyjama PDP (`211674477`) stay in the catalogue.

A complete PDP adds **Buy the look** (“Shop the model's full 'fit”) and **People also bought**. `?pdp=thin` keeps size and price only.

## Pages (live URL shapes)

| Route | Beat |
|-------|------|
| `/` | ASOS homepage (Women / Men tiles) |
| `/women` | Women department |
| `/women/new-in` | Women's New In. ProductListing, CategoryId 27108 |
| `/edits/the-denim-drop` | Campaign / edit. ProductListing, CategoryId 88011 |
| `/women/denim` | Women's denim. ProductListing, CategoryId 17014, plus the downloaded ProductPage items |
| `/search?q=denim` | Those downloaded denim products |
| `/search?q=wide-leg%20jeans` | Header and full-page search both autocomplete “wide-leg jeans” |
| `/women/selling-fast` | New In: Selling Fast (51126) |
| `/women/new-season-colours` | New season colours (52649) |
| `/women/new-season-edit` | New-season edit (52558) |
| `/women/september-shift` | September Shift (52393) |
| `/women/sale-under-10` | Sale under £10 (51237) |
| `/shared-board/{uuid}` | Shared board (`acquisitionsource=pasteboard` is ignored) |
| `/petite-denim` | Category + body-fit facets (88016) |
| `/products/topshop-belle-paris-camisole-in-blue` | Story PDP — Buy the look + People also bought |
| `/products/weekday-flannel-pyjama-bottoms-in-black-check` | Weekday PDP — same complete layout |
| `/women/topshop` | Brand listing (29299) |
| `/style-feed` | Style Feed + shop the look |
| `/saved-items` · `/my-edit` | Save / return |
| `/curation-insight` | Editor feedback |
| `/bag` · `/account` | P1 light checkout / known customer |
| `/search` | Catalogue search (`SiteSearch`) |
| `/men` | Men department |
| `/products` | Product catalogue. Each child is a ProductPage. |

## Components

Registered in `industry-verticals/asos/.sitecore/component-map.ts` (`npm run sitecore-tools:generate-map`). Journey renderings use GUID prefix `a50c0001`.

| Component | Rendering | Where it sits |
|-----------|-----------|----------------|
| `GlobalBanner` | `a50c0001-1111-4000-8000-000000000009` | Home `headless-main`, first. Datasource `Data/HomeComponents/GlobalBanner` |
| `Header` | `a50c0001-1111-4000-8000-000000000001` | Partial Design **Header** → `headless-header` |
| `Footer` | `a50c0001-1111-4000-8000-000000000002` | Partial Design **Footer** → `headless-footer` |
| `HomeLanding` | `a50c0001-1111-4000-8000-000000000003` | Composes HomeBanner, Edit, and NewIn until the home item is republished |
| `HomeBanner` | `a50c0001-1111-4000-8000-000000000015` | Home `headless-main`. Datasource `Data/HomeComponents/HomeBanner` |
| `Edit` | `a50c0001-1111-4000-8000-000000000016` | Home `headless-main`. Datasource `Data/HomeComponents/Edit` |
| `NewIn` | `a50c0001-1111-4000-8000-000000000017` | Home `headless-main`. Datasource `Data/HomeComponents/NewIn` (ProductIds) |
| `GenderLanding` | `a50c0001-1111-4000-8000-000000000004` | `/women` `headless-main` |
| `CategoryListing` | `a50c0001-1111-4000-8000-000000000005` | The listing item itself (`/women/denim`, `/edits/the-denim-drop`) |
| `ProductPage` | `a50c0001-1111-4000-8000-000000000006` | `/products/{slug}` |
| `YouMightAlsoLike` | `a50c0001-1111-4000-8000-000000000010` | Composed on the PDP. Intent `similar`, ranked by CDP affinity |
| `BuyTheLook` | `a50c0001-1111-4000-8000-000000000011` | Composed on the PDP. Intent `outfit` |
| `PeopleAlsoBought` | `a50c0001-1111-4000-8000-000000000012` | Composed on the PDP. Intent `cobought` |
| `RecentlyViewed` | `a50c0001-1111-4000-8000-000000000013` | Composed on the PDP. Products this browser has opened |
| `YourStyle` | `a50c0001-1111-4000-8000-000000000014` | Composed on the PDP. CDP fit, brand, and category affinity |
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

Denim and homepage stills are Content Hub assets (brand **108526**). Product Image fields store `src` + `dam-id`. The download folders `public/asos/products/live/` and `public/asos/editorial/` are only the upload source and stay gitignored.

## Content tree

Same split as FormaLux. Pages, products, and taxonomy are not mixed.

**Home** holds pages that have a layout. Women, Men, account, my-edit, saved-items, shared-board, search, style-feed, bag, curation insight, and petite-denim are pages. Under Women, each category is one ProductListing (`new-in`, `denim`, `new-season-edit`, and the other edits). Under `edits`, each campaign is one ProductListing (`the-denim-drop`, `festival-2-0`, and the rest). `Products` is the catalogue page. Each product under it is one ProductPage named with the product slug. Categories on that item still point at Data.

**Data** holds what is not a page. `HomeComponents` is the homepage offer, banner, edit row, and new-in row. `Categories` is the taxonomy. Catalogue, Sites, Shared, Signals, and the us/au/de language items sit here. `Retired` holds the old brand, slug, `prd`, and `/cat` path folders so they are out of the page tree.

Product URLs are `/products/{slug}`. Category URLs are the page (`/women/denim`, `/edits/the-denim-drop`). Search facets: `refine=attribute_10992:61379` (dresses), `attribute_1047:8387,8404` (jumpers and cardigans), `attribute_10159:63025` (adidas Samba), `base_colour:4` (black), `attribute_12017:63014` (stainless steel), `pricerange=45-95`, `iscurated=true`. Sign in on `/account` stores body fit and size for the session; listings, search, shared boards, and the product page use it.

## Run locally

```powershell
cd industry-verticals\asos
copy .env.remote.site .env.local
npm install
npm run sitecore-tools:generate-map
npm run dev
```

Open `http://localhost:3000/`, then `/women` and `/women/new-in`.
