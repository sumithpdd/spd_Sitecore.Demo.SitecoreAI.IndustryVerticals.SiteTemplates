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

Arrive `/women` → The denim drop (`/the-denim-drop/cat/?cid=88011`) → petite denim facets (`/petite-denim/cat/?cid=27108`) → PDP `/topshop/topshop-belle-paris-camisole-in-blue/prd/200415553` (complete vs `?pdp=thin`) → Topshop brand listing → Style Feed → Saved / My Edit → Curation insight. Markets `/us` `/au` `/de` change currency, size system, and Topshop copy.

## Pages (live URL shapes)

| Route | Beat |
|-------|------|
| `/women` | Gender landing |
| `/the-denim-drop/cat/?cid=88011` | Campaign / edit |
| `/petite-denim/cat/?cid=27108` | Category + body-fit facets |
| `/topshop/topshop-belle-paris-camisole-in-blue/prd/200415553` | PDP (returns block) |
| `/women/a-to-z-of-brands/topshop/cat/?cid=29299` | Brand listing |
| `/style-feed` | Style Feed + shop the look |
| `/saved-items` · `/my-edit` | Save / return |
| `/curation-insight` | Editor feedback |
| `/bag` · `/account` | P1 light checkout / known customer |
| `/us/…` `/au/…` `/de/…` | Market variants |

## Components

Product page (complete/thin), product card + merch states, category facets, edit hero, edit carousel, trending chips, Style Feed, personalised rail, market switcher, heart/save, My Edit, curation insight, bag, account. App frame is Header + Footer on every page.

## Media

```powershell
. '{OneDrive}/…/_content-ready/set-ch-env.ps1'
cd authoring/items/asos/scripts
node download-asos-images.mjs
.\Upload-AsosContentHub.ps1
.\Set-AsosContentHubMetadata.ps1
node generate-asos-pages.mjs
```

Maps: `authoring/items/asos/scripts/media-maps/`.

## Run locally

```powershell
cd industry-verticals\asos
copy .env.remote.site .env.local
npm install
npm run sitecore-tools:generate-map
npm run dev
```

Open `http://localhost:3000/women`.
