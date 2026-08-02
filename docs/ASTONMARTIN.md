# Aston Martin (Automobile collection)

Luxury British sports car demo inspired by [astonmartin.com/en-gb](https://www.astonmartin.com/en-gb). Isolated Sitecore collection + rendering host, following the Bristan pattern.

|                        | Value                                                              |
| ---------------------- | ------------------------------------------------------------------ |
| **Reference site**     | [astonmartin.com/en-gb](https://www.astonmartin.com/en-gb)         |
| **Models listing**     | [Models](https://www.astonmartin.com/en-gb/models)                 |
| **Rendering host**     | `astonmartin` → `industry-verticals/astonmartin`                   |
| **Build key**          | `astonmartin` in `xmcloud.build.json`                              |
| **Site name**          | `astonmartin`                                                      |
| **Collection path**    | `/sitecore/content/automobile`                                     |
| **Site content path**  | `/sitecore/content/automobile/astonmartin`                         |
| **Module**             | `authoring/items/automobile/automobile.module.json` (namespace `automobile-scs`) |
| **Design captures**    | `design-screenshots/astonmartin-com/`                              |
| **URL list**           | `design-screenshots/astonmartin-com/urls.txt`                      |

### Isolation layout

| Sitecore area        | Path                                                         |
| -------------------- | ------------------------------------------------------------ |
| Collection           | `/sitecore/content/automobile`                               |
| Site                 | `/sitecore/content/automobile/astonmartin`                   |
| Templates            | `/sitecore/templates/Project/automobile`                     |
| Branches             | `/sitecore/templates/Branches/Project/automobile`            |
| Renderings           | `/sitecore/layout/Renderings/Project/automobile`             |
| Placeholder settings | `/sitecore/layout/Placeholder Settings/Project/automobile`  |
| Project settings     | `/sitecore/system/Settings/Project/automobile`               |
| Media library        | `/sitecore/media library/Project/automobile`                 |

---

## Project brief (mimic-url Phase 0)

```
Project: Aston Martin Automobile
Project folder: automobile
URLs: see design-screenshots/astonmartin-com/urls.txt
Site path: /sitecore/content/automobile/astonmartin
Collection system name: automobile
Site system name: astonmartin
SCS namespace: automobile-scs
Editing host: astonmartin
App path: industry-verticals/astonmartin/
Module path: authoring/items/automobile/
Screenshot out: design-screenshots/astonmartin-com/
```

---

## Scope

### In scope (demo)

1. **Home** — hero carousel / model promos, stories, news teaser, chrome (header/footer)
2. **Models** — all-models landing with family sections (DB12, Vantage, Vanquish, DBX, Valhalla, Valkyrie, Valour, Valiant, AMR26)
3. **Model family / derivative pages** — Explore pages for each live model URL discovered from the reference site
4. **Configure / Enquire CTAs** — link stubs (or lightweight configurator landing), not a full 3D configurator rebuild
5. **Assets** — downloaded media into Sitecore media library (no hotlinking reference CDN in production datasources)
6. **Documentation** — this file + design capture manifests

### Out of scope / stubbed

- Full interactive vehicle **configurator** (complex third-party experience on the live site)
- Q by Aston Martin bespoke tooling beyond marketing page stubs
- Corporate / investor / F1 deep trees (unless added later from `site-content-tree.json`)
- Real dealer locator integrations

---

## Design reference

Captured with Playwright (`url-screenshots` skill). Full set under `design-screenshots/astonmartin-com/` (25 URLs × desktop/tablet/mobile).

### Home

![Aston Martin home — desktop](./images/astonmartin/home-desktop.png)

_Route: `/` — hero, model feature carousel, dual promos, Stories, News_

### Models

![Aston Martin models — desktop](./images/astonmartin/models-desktop.png)

_Route: `/models` — jump nav + family sections (DB12, Vantage, Vanquish, DBX, …)_

### Model detail (DB12 example)

![Aston Martin DB12 — desktop](./images/astonmartin/db12-desktop.png)

_Route: `/models/db12` — model hero, specs, feature carousels, quote, explore CTAs_

### Configurator (stub reference)

![Configurator landing — desktop](./images/astonmartin/configurator-desktop.png)

_External: [configurator.astonmartin.com](https://configurator.astonmartin.com/) — stub in demo_

### Primary routes

| Route (demo)           | Story role | Reference URL |
| ---------------------- | ---------- | ------------- |
| `/`                    | Crafted For You / ChatGPT personalisation (DB12 hero via UTM) | https://www.astonmartin.com/en-gb |
| `/models`              | Model families | https://www.astonmartin.com/en-gb/models |
| `/models/db12`         | Emma — GT comparison landing | https://www.astonmartin.com/en-gb/models/db12 |
| `/models/vantage-coupe`| James — existing owner | https://www.astonmartin.com/en-gb/models/vantage-coupe |
| `/models/valhalla`     | James — exclusive reveal | https://www.astonmartin.com/en-gb/models/valhalla |
| `/models/{slug}`       | Full model set (20) | `/en-gb/models/...` |
| `/configurator`        | Emma — configure & save | https://configurator.astonmartin.com/ (stub) |
| `/q-by-aston-martin`   | James — bespoke | https://www.astonmartin.com/en-gb/q-by-aston-martin |
| `/owners`              | James — owner portal / Goodwood | https://www.astonmartin.com/en-gb/owners |
| `/our-world`           | Sophia — stories & advocacy | https://www.astonmartin.com/en-gb/our-world |
| `/experiences`         | Michael & Oliver — Experience Day | https://www.astonmartin.com/en-gb/experiences |
| `/dealers`             | Emma nurture / Michael dashboard | https://www.astonmartin.com/en-gb/dealers |

**Demo story personalisation:** `/?utm_source=chatgpt&utm_campaign=db12-vs-bentley` (or `utm_campaign=crafted-for-you` / `?intent=db12`) swaps the home hero to DB12 + configurator CTAs.

**Model pages:** 20 pages under `Home/Models/{slug}.yml` (all capture URLs except `past-models`). Story pages: `q-by-aston-martin`, `owners`, `our-world`, `experiences`, `dealers`. Regenerate with `node authoring/items/automobile/scripts/Complete-AstonMartinAuthoring.mjs`.

**Images:** Local demo assets under `industry-verticals/astonmartin/public/images/` including story heroes (`q-by-hero.jpg`, `owners-hero.jpg`, `our-world-hero.jpg`, `experiences-hero.jpg`, `dealers-hero.jpg`, `crafted-for-you.jpg`). **Push + publish to Edge** required for CMS Image values; until then `ResolvedImage` / `demo-images` fallbacks apply.

**Out of scope for this rendering host:** separate storyboard app routes (`/storyboard`, `/cms`, `/instagram`, `/email`, `/ai-marketing-skills`, `/search`) and Scrunch / Content Hub — those are other demo surfaces referenced by the PDF.

---

## Components (approved)

Prefer **standard names with variants** over `Am*` prefixes for Hero/Promo:

| Component | Variants | Notes |
|-----------|----------|-------|
| `HeroBanner` | `Default`, `ModelFeature`, `ModelsLanding`, `ModelDetail` | Home hero, feature band, models landing, PDP hero |
| `Promo` | `Default`, `DualTile` | Single lifestyle tile; two-up Pre-Owned + Magazine |
| `Header` / `Footer` | `Default` | Site chrome |
| `StoriesGrid` / `NewsStrip` | `Default` | Home editorial |
| `ModelJumpNav` / `ModelFamilySection` | `Default` | Models listing |
| `ModelIntroSpecs` / `FeatureCarousel` / `QuoteBlock` / `ExploreCtaStrip` | `Default` | Model detail |

TSX: `industry-verticals/astonmartin/src/components/`  
YAML: `authoring/items/automobile/serialized-content/renderings/automobile/`  
Headless variants: `.../astonmartin/Presentation/Headless Variants/`

---

## Mimic workflow status

| Phase | Status | Notes |
| ----- | ------ | ----- |
| 0 Inputs | Done | `/sitecore/content/automobile/astonmartin`, host `astonmartin` |
| 1 Scaffold | Done | `industry-verticals/astonmartin` + `xmcloud.build.json` |
| 2 Collection + site YAML | Done on disk | Authoring + datasources for Home / Models / DB12 / Configurator |
| 3 Screenshots | Done | 25 URLs + section crops |
| 4 Components | Done | HeroBanner/Promo variants + supporting components; `npm run build` OK |
| 5 `.env.local` | Done | Edge Context ID + editing secret set; added `SITECORE_RENDERINGHOST_NAME` |
| Push to CM | Done | `sitecoreSilverProd` — Home layout + publish to Edge |

---

## Local development (after scaffold)

```bash
cd industry-verticals/astonmartin
cp .env.remote.example .env.local   # or .env.remote.site if present
# Set SITECORE_EDGE_CONTEXT_ID, NEXT_PUBLIC_DEFAULT_SITE_NAME=astonmartin, SITECORE_EDITING_SECRET
npm install
npm run dev
```

---

## Legal / demo note

This is a **SitecoreAI industry demo** patterned after public marketing pages for layout and IA. Brand assets are captured for local/demo authoring only; do not present as an official Aston Martin product or redistribute assets outside the demo environment without rights clearance.
