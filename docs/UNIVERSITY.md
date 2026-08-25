# University (higher education vertical)

Reusable university demo host, told as **University of Essex** — [essex.ac.uk](https://www.essex.ac.uk/) Clearing Fast Track and We Are Essex (Sitecore demo storyboard, 24 Aug 2026). The **site and folder stay `university`** so other institutions can reuse the host.

| | Value |
|--|--|
| **Reference design** | [essex.ac.uk](https://www.essex.ac.uk/) |
| **Story PDF** | `sitecore-demo-essex-2026-08-24.pdf` |
| **Rendering host** | `university` → `industry-verticals/university` |
| **Build key** | `university` in `xmcloud.build.json` |
| **Site name** | `university` |
| **Collection path** | `/sitecore/content/university` |
| **Site content path** | `/sitecore/content/university/university` |
| **Module** | `authoring/items/university/university.module.json` (`university-scs`) |
| **Component list** | [COMPONENTS.md — University](./COMPONENTS.md#university-university-of-essex) |

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
URLs: https://www.essex.ac.uk/ (design + story reference)
Site path: /sitecore/content/university/university
Collection system name: university
Site system name: university
SCS namespace: university-scs
Editing host: university
App path: industry-verticals/university/
Module path: authoring/items/university/
```

---

## Story pages (in scope)

| Route | Persona / step | Reference |
|-------|----------------|-----------|
| `/` | Home — Clearing Fast Track hero | https://www.essex.ac.uk/ |
| `/?utm_campaign=we-are-essex` | Alumni / manifesto hero | same + UTM |
| `/clearing` | Clearing Fast Track hub | https://www.essex.ac.uk/clearing |
| `/clearing?utm_source=chatgpt&utm_campaign=clearing-fast-track` | AI discovery → Fast Track | Clearing + UTM |
| `/clearing/how-to-apply` | Get Clearing ready (Dynamics stub) | clearing enquiry |
| `/courses/computer-science-and-ai` | Governed course truth | CS & AI |
| `/courses/business-and-management` | Essex Business School hub | Business UG |
| `/study-and-life` | Colchester / Loughton campus life | Study and life |
| `/accommodation` | Guaranteed halls | Accommodation |
| `/about/manifesto` | We Are Essex manifesto | https://www.essex.ac.uk/about/manifesto |
| `/search` | Search stub | Site search |

### Demo intent (URL params)

| Params | Effect |
|--------|--------|
| `utm_campaign=we-are-essex` | Home hero → We Are Essex manifesto |
| `utm_campaign=clearing-2026` or path `/clearing` | Fast Track CTAs |
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

Push authoring YAML (do **not** re-run `Complete-UniversityAuthoring.mjs` to rewrite `uni-data-*`):

```bash
dotnet sitecore serialization validate --fix -i university-scs
dotnet sitecore serialization push -n <your-env> -i university-scs
```

Local images: `industry-verticals/university/public/images/` (wordmark `logo.svg`; campus photos are demo assets).

### Components

Sitecore renderings (`componentName` matches the map generated from `src/components/`):

| Component | Role |
|-----------|------|
| `Header` / `Navigation` / `Footer` | Chrome with **own templates + datasources**. Pick **Logo** (and promo images) in Pages from DAM/media — fields use `query:$siteMedia`. Live falls back to `public/images/` until an image is chosen. |
| `HeroBanner` | Clearing Fast Track / We Are Essex full-bleed hero (UTM) — datasource `Home Hero` |
| `Manifesto` | We Are Essex manifesto page (`/about/manifesto`) |
| `Promo` / `PromoTileGrid` | Promo cards + “Are you ready?” grid — own templates + datasources |
| `StatsGlance` | At-a-glance stats (Guardian 2026, research, graduate outcomes) |
| `ClearingHub` / `ClearingApply` | Clearing Fast Track hub + apply stub |
| `CourseListing` | Subject hub (hero, why study, course list) — used on Course pages |
| `CourseNextSteps` | Related subjects + Ready for more — **Course chrome** partial |
| `CourseCsAi` / `StudyLife` / `Accommodation` | Story pages |
| `SiteSearch` | Results page; header preview search uses the same dummy index. For **Sitecore Search in the new Content SDK**, scaffold with `npx create-content-sdk-app nextjs` and use `@sitecore-content-sdk/nextjs/search` — see [docs/README.md](./README.md#new-content-sdk-app-search). |

App shell (every page, not page datasources):

| Component | Role |
|-----------|------|
| `AiChatbot` | Pull-up “Chat with University” tab (bottom-left; dummy Sitecore Search) |
| `CdpProfilePanel` | Floating student-journey engagement panel |
| `HeaderSearch` | Header Everything / Courses preview search |

### CDP student journey and search chatbot

| Tool | Where | Demo |
|------|--------|------|
| **Chat with University** (Essex scarlet/violet tab, bottom-left) | Every page | Suggested prompts; answers from a knowledge base plus the dummy Sitecore Search index, with source links. Opens automatically when `utm_source=chatgpt`. |
| **Student journey** (red, bottom-right) | Every page | Sitecore CDP panel: guest/browser IDs, journey stages (Discover → Explore → Clearing → Apply → Stay), affinities, identify `alex.applicant@sitecore.net`, session VIEW/SEARCH events. |

Suggested chatbot prompts: Clearing Fast Track, Computer Science and AI, how to apply, accommodation, Business and Management, We Are Essex.

### Page templates and designs (demo)

Show these in Pages / Presentation:

| Sitecore item | Path | What it proves |
|---------------|------|----------------|
| **Page** template | `/sitecore/templates/Project/university/Page` | Default pages (home, Clearing, CS & AI, manifesto) |
| **Course** template | `/sitecore/templates/Project/university/Course` | Subject / course hub pages |
| **Default** page design | `Presentation/Page Designs/Default` | Header + Footer partials |
| **Course** page design | `Presentation/Page Designs/Course` | Header + **Course chrome** + Footer |
| **Course chrome** partial | `Presentation/Partial Designs/Course chrome` | Related subjects and next-step CTAs on every Course page |

TemplatesMapping on **Page Designs** maps Page → Default and Course → Course. Sample page: `/courses/business-and-management` (Essex Business School).

### Future universities

Add another site under the same collection (e.g. `/sitecore/content/university/{other-uni}`) and either share this rendering host or clone `industry-verticals/university` with a new host key. Keep `university-scs` for shared templates/renderings where possible.

---

## Legal / demo note

SitecoreAI industry demo patterned after public University of Essex marketing pages ([essex.ac.uk](https://www.essex.ac.uk/)). Brand assets are for local/demo authoring only.
