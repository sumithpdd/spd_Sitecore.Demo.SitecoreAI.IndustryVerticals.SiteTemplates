# University (higher education vertical)

Reusable university demo host, shown as **Sheffield Hallam University** — [shu.ac.uk](https://www.shu.ac.uk/). The **site and folder stay `university`**. Pages and components are the existing higher-education journey. Logo and photography are Content Hub brand **Sheffield Hallam** (entity **114500**).

| | Value |
|--|--|
| **Reference design** | [shu.ac.uk](https://www.shu.ac.uk/) |
| **Content Hub brand** | **Sheffield Hallam**, entity **114500** on [starter-verticals-2](https://starter-verticals-2.sitecoresandbox.cloud/en-us/brands/branddetail/114500) |
| **Rendering host** | `university` → `industry-verticals/university` |
| **Build key** | `university` in `xmcloud.build.json` |
| **Site name** | `university` |
| **Collection path** | `/sitecore/content/university` |
| **Site content path** | `/sitecore/content/university/university` |
| **Module** | `authoring/items/university/university.module.json` (`university-scs`) |
| **Component list** | [COMPONENTS.md — University](./COMPONENTS.md#university-sheffield-hallam) |

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
URLs: https://www.shu.ac.uk/ (logo and photography reference)
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
| `/` | Home | https://www.shu.ac.uk/ |
| `/?utm_campaign=we-are-essex` | Alumni / manifesto hero | same + UTM |
| `/clearing` | Clearing hub | https://www.shu.ac.uk/ |
| `/clearing?utm_source=chatgpt&utm_campaign=clearing-fast-track` | AI discovery | Clearing + UTM |
| `/clearing/how-to-apply` | Get ready to apply | enquiry |
| `/courses/computer-science-and-ai` | Governed course truth | CS & AI |
| `/courses/business-and-management` | Business subject hub | Business UG |
| `/study-and-life` | Campus life | https://www.shu.ac.uk/ |
| `/accommodation` | Halls | Accommodation |
| `/about/manifesto` | Manifesto | https://www.shu.ac.uk/about-us |
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

Logo and photography are Content Hub public links (brand **114500**). `src/lib/demo-images.ts` uses the same URLs when a Sitecore image field is empty. Do not hotlink shu.ac.uk.

| Still | Sitecore field | Public content id |
|-------|----------------|-------------------|
| Wordmark | Header **Logo**, Footer **Logo** | `738d6e15a1b34cf1a45ac1110078ebb6` |
| Campus hero | Home Hero **Image** | `7bafd358f0474055983dcb0d15ef0641` |
| Study | Promo tile one | `d10c776b2cc7481cb7c6f8764bd23921` |
| Students | Promo tile three | `8aacb40414b843bbbf19fbbb0e183b1a` |
| Accommodation | Promo tile four | `3daf55ae44fa416da4e5555f08704c0b` |
| City | Promo tile two | `b181e3a4d3b542c2b8bf67ae2371f3d9` |
| Lab | Course and listing fallbacks | `b5123a012cae4d9eb747725b22dae8af` |

### Components

Sitecore renderings (`componentName` matches the map generated from `src/components/`):

| Component | Role |
|-----------|------|
| `Header` / `Navigation` / `Footer` | Chrome with **own templates + datasources**. **Logo** is the Content Hub wordmark on brand 114500. |
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

SitecoreAI industry demo for [Sheffield Hallam University](https://www.shu.ac.uk/). Logo and photography are Content Hub brand **114500**. Page copy is the existing university journey.
