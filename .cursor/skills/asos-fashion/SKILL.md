---
name: asos-fashion
description: >-
  ASOS isolated collection — wide-leg jeans under £50, Berlin October edit,
  Content Hub brand 108526. Use when editing industry-verticals/asos,
  authoring/items/asos, or docs/ASOS.md.
---

# ASOS

Full notes: [`docs/ASOS.md`](../../../docs/ASOS.md). Playbook: [`isolated-collection-site`](../sitecore-serialization-skills/isolated-collection-site/SKILL.md).

| | Value |
|--|--|
| Host | `industry-verticals/asos` (Pages Router) |
| Module | `asos-scs` |
| Paths | `/sitecore/content/asos` → `/sitecore/content/asos/asos` |
| GUID prefix | Journey pages `a50c` |
| CH brand | **108526** Asos on starter-verticals-2 |

## Hard rules

- Do **not** invent extra people profiles. Emma is story-only.
- Never hotlink asos.com. DAM `src` + `dam-id` on Image fields after upload.
- Never commit Content Hub env.
- Keep helpers in `src/lib/`. Every `.tsx` under `src/components/` is registered by `sitecore-tools:generate-map`.
- URL shapes stay `/women`, `/{edit}/cat/?cid=`, `/{brand}/{slug}/prd/{id}`.
- Do not re-run collection/site generators after journey pages exist.

## Journey

Arrive `/` → `/women` → denim edit (`cid=88011`, wide-leg jeans under £50) → mid-wash PDP `8805001` → Style Feed → My Edit **Berlin, October** (jean, knit, boot).

## Maps

- Component map: `industry-verticals/asos/.sitecore/component-map.ts`
- Page map: `authoring/items/asos/scripts/media-maps/asos-page-map.csv`
- DAM stills and wordmarks: `content-hub-asset-registry.csv`, `Asos-image-xml.json`, `src/lib/dam-registry.ts` (brand **108526**)
- Content Hub env: copy `authoring/items/brother/scripts/set-ch-env.example.ps1` to OneDrive. Never commit secrets.
- Header wordmark: `DAM['asos-logo-white.png']` (asset 109876). Local fallback `public/asos/logo-white.png`
- Page designs: Default, Product, ProductPage, ProductListing — each chains Header + Footer. Listing pages use template ProductListing; PDP items use ProductPage.
- Search: `HeaderSearch` (`src/lib`) and `SiteSearch` on `/search`. `q=denim` lists denim product cards. `AiChatbot` and `CdpProfileShell` mount from `_app.tsx`.
- Women's denim trend: `/women/trends/denim/cat/?cid=17014` (`STORY.trendsDenimCid`). Live asos.com product JSON was not reachable from this network; the page uses catalogue denim stills already on brand 108526.
- Weekday product YAML: `serialized-content/asos/8F63B6D47EFD2BB1/211674477.yml`
