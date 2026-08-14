# University (higher education vertical)

Reusable university demo host. Layout and story pages are inspired by [reading.ac.uk](https://www.reading.ac.uk/) (Clearing, Centenary, courses) but the **site and folder are named `university`** so you can rebrand for other institutions later.

| | Value |
|--|--|
| **Reference design** | [reading.ac.uk](https://www.reading.ac.uk/) |
| **Story PDF** | `sitecore-demo-reading-2026-08-13.pdf` |
| **Rendering host** | `university` → `industry-verticals/university` |
| **Build key** | `university` in `xmcloud.build.json` |
| **Site name** | `university` |
| **Collection path** | `/sitecore/content/university` |
| **Site content path** | `/sitecore/content/university/university` |
| **Module** | `authoring/items/university/university.module.json` (`university-scs`) |
| **Design captures** | `design-screenshots/reading-ac-uk/` |

### Isolation layout

| Sitecore area | Path |
|---------------|------|
| Collection | `/sitecore/content/university` |
| Site | `/sitecore/content/university/university` |
| Templates | `/sitecore/templates/Project/university` |
| Renderings | `/sitecore/layout/Renderings/Project/university` |
| Media | `/sitecore/media library/Project/university` |

---

## Project brief

```
Project: University
Project folder: university
URLs: https://www.reading.ac.uk/ (design reference)
Site path: /sitecore/content/university/university
Collection system name: university
Site system name: university
SCS namespace: university-scs
Editing host: university
App path: industry-verticals/university/
Module path: authoring/items/university/
Screenshot out: design-screenshots/reading-ac-uk/
```

---

## Story pages (in scope)

| Route | Persona / step | Reference |
|-------|----------------|-----------|
| `/` | Home — Centenary / Clearing hero | https://www.reading.ac.uk/ |
| `/?utm_campaign=centenary-2026` | Alumni / Centenary hero | same + UTM |
| `/clearing` | Clearing hub (personalised CS & AI) | https://www.reading.ac.uk/clearing/ |
| `/clearing?utm_source=chatgpt&utm_campaign=clearing-computer-science` | AI discovery → Clearing | Clearing + UTM |
| `/clearing/how-to-apply` | Make your application (Dynamics stub) | clearing how-to-apply |
| `/courses/computer-science-and-ai` | Governed course truth | CS & AI |
| `/study-and-life` | Campus life | Study and life |
| `/accommodation` | Accommodation CTA | Accommodation |
| `/search` | Search stub | Site search |

### Demo intent (URL params)

| Params | Effect |
|--------|--------|
| `utm_campaign=centenary-2026` | Home hero → Centenary 100 years |
| `utm_campaign=clearing-2026` or path `/clearing` | Clearing-focused CTAs |
| `utm_source=chatgpt` + clearing campaign | Clearing hub emphasises Computer Science & AI |

---

## Local setup

```bash
cd industry-verticals/university
cp .env.remote.example .env.local
# Set SITECORE_EDGE_CONTEXT_ID + SITECORE_EDITING_SECRET from Deploy portal
npm install
npm run dev
```

Authoring:

```bash
node authoring/items/university/scripts/Complete-UniversityAuthoring.mjs
dotnet sitecore serialization validate --fix -i university-scs
dotnet sitecore serialization push -n <your-env> -i university-scs
```

Design captures: `design-screenshots/reading-ac-uk/`  
Local images: `industry-verticals/university/public/images/`

### Components

| Component | Role |
|-----------|------|
| `SiteHeader` / `SiteFooter` | Chrome (Partial Designs) |
| `HomeHero` | Clearing / Centenary full-bleed hero (UTM) |
| `PromoTileGrid` / `StatsGlance` | Home tiles + at-a-glance |
| `ClearingHub` | Clearing hub (+ CS&AI from UTM) |
| `ClearingApply` | Dynamics-style apply stub |
| `CourseCsAi` | Course page |
| `StudyLife` / `Accommodation` / `SiteSearch` | Supporting pages |

### Future universities

Add another site under the same collection (e.g. `/sitecore/content/university/{other-uni}`) and either share this rendering host or clone `industry-verticals/university` with a new host key. Keep `university-scs` for shared templates/renderings where possible.

---

## Legal / demo note

SitecoreAI industry demo patterned after public University of Reading marketing pages. Brand assets are for local/demo authoring only.
