# Capco maps (Content Hub ↔ Sitecore ↔ host)

Brand entity **108095** on [starter-verticals-2](https://starter-verticals-2.sitecoresandbox.cloud/en-us/brands/branddetail/108095). Image / Video fields use DAM `src` + `dam-id`. Never hotlink `capco.com`.

**Do not commit secrets.** Credentials stay in a local `set-ch-env.ps1` (never this folder or `docs/`).

Narrative index: [`docs/CAPCO.md`](../../../../../docs/CAPCO.md). Host README: [`industry-verticals/capco/README.md`](../../../../../industry-verticals/capco/README.md).

## Map files

| File | Trail |
|------|--------|
| [`capco-page-map.csv`](capco-page-map.csv) | **Page map** — route → Sitecore path, template, nav, workflow, primary renderings |
| [`capco-sitecore-data-map.csv`](capco-sitecore-data-map.csv) | **Content map** — page / partial / rendering → datasource or context item + fields |
| [`capco-component-map.csv`](capco-component-map.csv) | **Component map** — React file → JSON rendering id → `headless-main` / partial / leftover |
| [`capco-sitecore-image-field-map.csv`](capco-sitecore-image-field-map.csv) | **Media field map** — Sitecore item + field → DAM `src` + `dam-id` (includes Video + whitepaper) |
| [`content-hub-asset-registry.csv`](content-hub-asset-registry.csv) | Uploaded assets + public URLs + brand 108095 |
| [`capco-image-xml.json`](capco-image-xml.json) | Local filename → Sitecore Image / Video / link XML |

Runtime component registration is generated: `industry-verticals/capco` → `npm run sitecore-tools:generate-map` (writes `.sitecore/component-map.ts` from `src/components/`). Helpers stay in `src/lib/`.

Catalog fallbacks (same DAM URLs): `home-catalog.ts` (hero video), `people-catalog.ts`, `events-catalog.ts`, `taxonomy.ts`, `search-catalog.ts` (atrium hero + listing thumbs), `industry-catalog.ts`. Live harvest: agentic atrium / JN_7809 graphic / JN_7741 related / search landings — never hotlink `capco.com`.

## Pipeline

```text
1) node download-capco-images.mjs
     harvest stills into media-staging/ (gitignored)

2) Upload-CapcoContentHub.ps1
     jpg / png / pdf / mp4 → Brand 108095 public links
     → content-hub-asset-registry + capco-image-xml.json

3) Set-CapcoContentHubMetadata.ps1
     PCMBrandToAsset = 108095

4) node patch-capco-dam-images.mjs
     write Image XML onto Header / Footer / Hero / Promos / people / Perspectives
     Home Hero Video is stamped by hand (do not re-run generate-capco-site.mjs)
```

```powershell
. '{OneDrive}/Work/Brother/_content-ready/set-ch-env.ps1'
cd authoring/items/capco/scripts
node download-capco-images.mjs
.\Upload-CapcoContentHub.ps1
.\Set-CapcoContentHubMetadata.ps1
node patch-capco-dam-images.mjs
```

## Uploaded (brand 108095)

| LocalFile | DamId | Sitecore |
|-----------|-------|----------|
| `capco-horizontal.png` | `CtKAg1nzQgOr2VUVqoLumQ` | Header **Logo** |
| `capco-secondary-awc.png` | `mMpfO52nRWmYkdvjJnqlmA` | Footer **Logo** |
| `capco-hero.jpg` | `X7W7jpNxQxSA6BRAP6JQRw` | Home Hero **Image** (video poster) |
| `home-hero.mp4` | `q4btSe0oToWFU_M7iirKJQ` | Home Hero **Video** (looping banner; asset `108374`) |
| `expertise.jpg` | `SHZpbtI4RPmzJCEVs1yEaw` | Promo Expertise |
| `thinking.jpg` | `lrOHEmFiSQWwYr-_KqMhXA` | Promo Thinking |
| `banking-hero.jpg` | `B-1V7fMDRZa6HlyGlIgNVQ` | Banking landing + AI assistants article |
| `tplus1.jpg` | `nvutOHc9Q5GrNpM02QK72g` | Capital Markets landing + T+1 Perspective |
| `energy-trading.jpg` | `JLq3YOXvSs-DS5WyPmsTUg` | Energy landing + Emma Perspective |
| `energy-sovereignty.jpg` | `l35KWOhHSW2CCoen_ZK8nQ` | Energy sovereignty Perspective |
| `weather-driven.jpg` | `N3y-Z3HaS8KJAdPMOTEkMw` | Weather-driven Perspective |
| `fraud.jpg` | `w1ZMSpavTZaqG1HP6V3vWg` | Canada payment fraud Perspective |
| `onboarding.jpg` | `c9vW1MCJTy2QaUZRE8sCyQ` | Wealth landing + onboarding Perspective |
| `regulation-glass.jpg` | `m7iKeQThTByYrbGY8zM7tQ` | Insurance landing + heatmap / horizon / analytics |
| `elisabeth-plakinger.jpg` | `5gn-5THARViBZMJYA9R5zg` | Elisabeth **Photo** |
| `charlotte-byrne.jpg` | `tO4WUbR3RKefk-GF_Vjt3Q` | Charlotte **Photo** |
| `anne-marie-rowland.jpg` | `aFivqClIRYKWJoYoLYmitQ` | Anne-Marie **Photo** |
| `marina-costa.jpg` | `VBK1oilTQNCxLpV1hp7MLA` | Marina **Photo** |
| `agentic-ai-energy-trading-whitepaper.pdf` | `EAKzqY1IRCi2w3wDVosC7g` | Emma article **WhitepaperUrl** |
| `payments-cards.jpg` | `n5pjwFtySe-q8tryzS-Umw` | Uploaded — not stamped on an item yet |
| `capco-logo.png` | `W78mPJG-TF2p9AJohIv0Dg` | Early mark — superseded by `capco-horizontal.png` |
| `capco-secondary-awc-retry.png` | `dgEU4EpNST-5H5FSaxbWEw` | Retry upload — footer uses `capco-secondary-awc.png` |

`home-hero.mp4` stays in gitignored `media-staging/photos/`. Public URL is on Home Hero and in `HOME_HERO.video` (`src/lib/home-catalog.ts`).
