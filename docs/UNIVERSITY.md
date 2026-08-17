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
| `/courses/business-and-management` | Subject hub (Course template + Course page design) | [Business and Management UG](https://www.reading.ac.uk/ready-to-study/study/2026/business-and-management-accounting-and-finance-ug) |
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
| `Header` / `Navigation` / `Footer` | Chrome with **own templates + datasources**. Pick **Logo** (and promo images) in Pages from DAM/media — fields use `query:$siteMedia`. Live falls back to `public/images/` until an image is chosen. |
| `HeroBanner` | Clearing / Centenary full-bleed hero (UTM) — datasource `Home Hero` |
| `Promo` / `PromoTileGrid` | Promo cards + “Are you ready?” grid — own templates + datasources |
| `StatsGlance` | At-a-glance stats |
| `ClearingHub` / `ClearingApply` | Clearing hub + apply stub |
| `CourseListing` | Subject hub (hero, why study, course list) — used on Course pages |
| `CourseNextSteps` | Related subjects + Ready for more — **Course chrome** partial |
| `CourseCsAi` / `StudyLife` / `Accommodation` | Story pages |
| `SiteSearch` | Results page; header preview search uses the same dummy index |
| `AiChatbot` | Pull-up “Chat with University” tab (bottom-left, every page; Sitecore Search) |
| `CdpProfilePanel` | Floating student-journey engagement panel (CDP guest, affinities, stages) |

### CDP student journey and search chatbot

| Tool | Where | Demo |
|------|--------|------|
| **Chat with University** (teal tab, bottom-left) | Every page | Small tab that pulls up a chat panel. Suggested prompts; answers from a knowledge base plus the dummy Sitecore Search index, with source links. Opens automatically when `utm_source=chatgpt`. |
| **Student journey** (red, bottom-right) | Every page | Sitecore CDP panel: guest/browser IDs, journey stages (Discover → Explore → Clearing → Apply → Stay), affinities, identify `alex.applicant@sitecore.net`, session VIEW/SEARCH events. |

Suggested chatbot prompts: Clearing courses, Computer Science and AI, how to apply, accommodation, Business and Management.

### Page templates and designs (demo)

Show these in Pages / Presentation:

| Sitecore item | Path | What it proves |
|---------------|------|----------------|
| **Page** template | `/sitecore/templates/Project/university/Page` | Default pages (home, Clearing, CS & AI) |
| **Course** template | `/sitecore/templates/Project/university/Course` | Subject / course hub pages |
| **Default** page design | `Presentation/Page Designs/Default` | Header + Footer partials |
| **Course** page design | `Presentation/Page Designs/Course` | Header + **Course chrome** + Footer |
| **Course chrome** partial | `Presentation/Partial Designs/Course chrome` | Related subjects and next-step CTAs on every Course page |

TemplatesMapping on **Page Designs** maps Page → Default and Course → Course. Sample page: `/courses/business-and-management` (inspired by [Reading Business and Management UG](https://www.reading.ac.uk/ready-to-study/study/2026/business-and-management-accounting-and-finance-ug)).

### Future universities

Add another site under the same collection (e.g. `/sitecore/content/university/{other-uni}`) and either share this rendering host or clone `industry-verticals/university` with a new host key. Keep `university-scs` for shared templates/renderings where possible.

---

## Legal / demo note

SitecoreAI industry demo patterned after public University of Reading marketing pages. Brand assets are for local/demo authoring only.
