# ASOS

SitecoreAI demo host mimicking [asos.com](https://www.asos.com/). Collection and site system name: `asos`. Maya (story-only) shops petite denim and the Topshop Belle Paris cami; saves close the loop in Curation insight.

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

Arrive `/` → `/women` → Women's New In (`/women/new-in/cat/?cid=27108`) → The denim drop (`/the-denim-drop/cat/?cid=88011`) → petite denim facets (`/petite-denim/cat/?cid=88016`) → PDP `/topshop/topshop-belle-paris-camisole-in-blue/prd/200415553` (complete vs `?pdp=thin`) → Topshop brand listing → Style Feed → Saved / My Edit → Curation insight. The Weekday pyjama PDP (`211674477`) is the same complete layout. Markets `/us` `/au` `/de` change currency, size system, and Topshop copy.

A complete PDP adds **Buy the look** (“Shop the model's full 'fit”) and **People also bought**. `?pdp=thin` keeps size and price only.

## Pages (live URL shapes)

| Route | Beat |
|-------|------|
| `/` | ASOS homepage (Women / Men tiles) |
| `/women` | Women department |
| `/women/new-in/cat/?cid=27108` | Women's New In |
| `/the-denim-drop/cat/?cid=88011` | Campaign / edit |
| `/petite-denim/cat/?cid=88016` | Category + body-fit facets |
| `/topshop/topshop-belle-paris-camisole-in-blue/prd/200415553` | Story PDP — Buy the look + People also bought |
| `/weekday/weekday-flannel-pyjama-bottoms-in-black-check/prd/211674477` | Weekday PDP — same complete layout |
| `/women/a-to-z-of-brands/topshop/cat/?cid=29299` | Brand listing |
| `/style-feed` | Style Feed + shop the look |
| `/saved-items` · `/my-edit` | Save / return |
| `/curation-insight` | Editor feedback |
| `/bag` · `/account` | P1 light checkout / known customer |
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

**Default** page design `a50c0001-5555-4000-8000-000000000001` chains Header + Footer partials. Palette: `Presentation/Available Renderings/ASOS`.

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

Maps: `authoring/items/asos/scripts/media-maps/` (`asos-page-map.csv`, `content-hub-asset-registry.csv`, `Asos-image-xml.json`).

Wordmark assets on brand **108526**: `asos-logo-white.png` (header, asset 109876) and `asos-logo.png` (asset 109883). The header uses the DAM public URL from `dam-registry.ts`, with `public/asos/logo-white.png` only if that entry is missing. Product stills use the same registry (`src` + `dam-id`).

The Weekday product item path is longer than the SCS relative-path limit. Its YAML lives at `authoring/items/asos/serialized-content/asos/8F63B6D47EFD2BB1/211674477.yml`.

## Run locally

```powershell
cd industry-verticals\asos
copy .env.remote.site .env.local
npm install
npm run sitecore-tools:generate-map
npm run dev
```

Open `http://localhost:3000/`, then `/women` and `/women/new-in/cat/?cid=27108`.
