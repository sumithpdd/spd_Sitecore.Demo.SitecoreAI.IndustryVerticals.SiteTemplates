# Legal — Pinsent Masons

SitecoreAI demo host mimicking [pinsentmasons.com](https://www.pinsentmasons.com/). Collection and site system name: `legal`.

| | Value |
|--|--|
| **Reference design** | [pinsentmasons.com](https://www.pinsentmasons.com/) |
| **Rendering host** | `legal` → `industry-verticals/legal` |
| **Editing host** | `legal` on **SitecoreSilver** / **SitecoreSilverProd** |
| **Build key** | `legal` in `xmcloud.build.json` (`enabled: true`) |
| **Site name** | `legal` |
| **Collection path** | `/sitecore/content/legal` |
| **Site content path** | `/sitecore/content/legal/legal` |
| **Module** | `authoring/items/legal/legal.module.json` (`legal-scs`) |
| **Design captures** | `design-screenshots/pinsentmasons-com/` |
| **Component review** | `design-screenshots/pinsentmasons-com/component-review.json` |
| **GUID prefix** | `a1e9` |

### Isolation layout

| Sitecore area | Path |
|---------------|------|
| Collection | `/sitecore/content/legal` |
| Site | `/sitecore/content/legal/legal` |
| Templates | `/sitecore/templates/Project/legal` |
| Renderings | `/sitecore/layout/Renderings/Project/legal` |
| Media | Content Hub Brand **PinsentMason** (DAM `src` + `dam-id`) |

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Home — hero, Expertise, Out-Law carousel, Newsletter, awards, Careers, press cards, **Related work** (Select Related Work treelist) |
| `/people` | People listing from CMS PersonPage children (Nova Medical doctors pattern) |
| `/out-law/news` | Article listing from CMS ArticlePage children, filter by tags/categories |
| `/people/dawn-allen` | Dawn Allen — Person page design (Header + Person + Footer partials): breadcrumb, profile, quote, experience timeline, credentials, specialisms, Out-Law carousel, also-viewed, newsletter CTA |
| `/people/bill-ryan` | Bill Ryan (Melbourne) — construction advisory & disputes |
| `/people/hammad-akhtar` | Hammad Akhtar (London) — insurance M&A / Part VII |
| `/people/desiree-fields` | Désirée Fields — Legal Director, trade marks |
| `/people/dinesh-banani` | Dinesh Banani — Head of US Securities |
| `/people/david-barker` | David Barker — Global Sector Head, Technology |
| `/people/david-doogan` | David Doogan — finance / lending |
| `/people/barry-mccaig` | Barry McCaig — Glasgow office head |
| `/people/bryn-reynolds` | Bryn Reynolds — indirect tax |
| `/people/ben-mckinley` | Ben McKinley — employment |
| `/out-law/guides/when-uk-suppliers-must-continue-to-supply-insolvent-companies` | CIGA essential-supplier guide — full article, **Select Authors** (Sally Williamson + Dawn Allen), tags, related work, newsletter |
| `/out-law/news/lawmakers-seek-ban-on-superintelligent-ai-as-toolkit-developed-to-support-ai-projects` | Scraped Out-Law news article (editable Title + Content) |
| `/about-us/announcements` | Press-release search listing (Explore all from home) |
| `/about-us/announcements/pinsent-masons-strengthens-restructuring-practice-with-new-partner-mark-wilson` | Mark Wilson appointment |
| `/expertise` `/thinking` `/offices` `/careers` `/about-us` | Primary nav destinations |
| `/expertise/restructuring` | Practice page — credentials tagged once, appear here |

### Story pages (presenter URLs — not in primary nav)

Confirm names with Thomas before putting colleagues on screen. Emma and the BD/marketing cast are story personas, not `/people` profiles.

| Route | Purpose |
|-------|---------|
| `/what-we-heard` | RFP pain table, personas (Thomas, Vince, Priya, David, Emma), content-operations lifecycle |
| `/story` | Three-act storyboard — 19 beats linking to Dawn, the guide, restructuring, Out-Law |

## Brand

Maroon primary (`#7C0A2E`) for logo, pill CTAs and borders. Dark teal (`#005955` / `#0d3d3c`) for section bands. Charcoal type on white/grey. Do not use yellow.

Token table: [`industry-verticals/legal/docs/PINSENT-MASONS-BRAND.md`](../industry-verticals/legal/docs/PINSENT-MASONS-BRAND.md).

## Components

Registered in `industry-verticals/legal/.sitecore/component-map.ts` (editing-host build).

| Rendering | component-map | Role |
|-----------|---------------|------|
| `Header` | client | Sticky white bar — logo left, Expertise / People / Thinking / Offices / Careers / About us centred, search |
| `HeroBanner` | default | Home photography + charcoal headline + maroon CTA |
| `HomeExpertise` | client | Datasource tabs — Sectors / Services / Locations, treelist links + tab image |
| `OutLawHome` | default | Teal Out-Law carousel from `OutLawPanel` datasource (newsletter is separate) |
| `ReachStrength` | default | Awards from `ReachPanel` datasource — each award editable |
| `Promo` | default, ImageRight, Newsletter, WithBackground | Newsletter is its own promo; Careers uses WithBackground |
| `PressReleases` | default | Card grid from `PressPanel` treelist; Explore all → `/about-us/announcements` |
| `AnnouncementSearch` | client | Announcements listing from CMS children of `/about-us/announcements` |
| `NewsArticle` | default | ArticlePage context: Title, Content, Kicker, date, tags, categories, **Select Authors** |
| `ArticleListing` | client | Out-Law news listing from CMS children, multi-select tag/category filters |
| `PeopleSearch` | client | People listing from CMS children of `/Home/people` |
| `PersonRelated` | default | Select related people treelist on PersonPage |
| `RelatedWork` | default | Select Related Work treelist (Nova reviews pattern) — Home, guide, restructuring |
| `PersonBreadcrumb` | default | Home / People / name |
| `PersonProfile` | default | Photo, name, job title, contacts |
| `PersonQuote` | default | Biography band under the profile |
| `PersonExperience` | client | Timeline with sector/service/region filters, credentials, specialisms — page treelists |
| `PersonInsights` | client | Out-Law / Insight carousel from page treelist |
| `PracticePage` | default | `/expertise/restructuring` practice landing |
| `StoryHeard` | default | `/what-we-heard` — pain, personas, lifecycle |
| `StoryBoard` | default | `/story` — 19-beat talk track |
| `Footer` | default | Legal links, offices CTA, copyright |

Demo **Sign in** (header), **Chat with Pinsent** (bottom-left, Brother-style story Q&A), and the **CDP engagement panel** (bottom-right) follow the Bristan/Brother pattern: `DemoAuthShell` + `AiChatbot` + `CdpProfileShell` in `_app.tsx`. Identify uses Cloud SDK `identity()` on email. Chat opens on `?utm_source=chatgpt` (Priya’s discovery beat) and answers from `src/lib/chat-knowledge.ts`.

**Pages editor — `/people/dawn-allen`:** Body components are on the **Person** partial, not on the page item. Keep **Shared layout** on. If the middle is blank, the `legal` editing host is still on an old build (no `Person*` components) — commit/push and rebuild the host. Placeholder settings `sxa-person` / `person` / `headless-person` must exist under Presentation.

People content is authorable on `PersonPage` items. The **Person** page design applies Header, Person, and Footer partials automatically. Experience, credentials, insights and related people are treelists on the page pointing at `/sitecore/content/legal/legal/Data/People`. `src/lib/people-catalog.ts` supplies search/listing fallbacks. Profile copy for Dawn, Bill, Hammad, Désirée, Dinesh, David Barker and David Doogan follows the live pinsentmasons.com people pages. Sync YAML with `authoring/items/legal/scripts/sync-people-from-live.mjs`.

Regenerate the map after adding React components:

```bash
cd industry-verticals/legal
npm run sitecore-tools:generate-map
```

## Data map

Page / partial / rendering → datasource or context item: [`authoring/items/legal/scripts/media-maps/legal-sitecore-data-map.csv`](../authoring/items/legal/scripts/media-maps/legal-sitecore-data-map.csv).

| Page design | Partials | Used on |
|-------------|---------|---------|
| **Default** | Header, Footer | Home, listing, story, Out-Law, practice |
| **Person** | Header, **Person**, Footer | `/people/*` PersonPage items |

**Person** partial (`headless-main`): PersonBreadcrumb → PersonProfile → PersonQuote → PersonExperience → PersonInsights → PersonRelated → Promo Newsletter (same `/Data/Promos/Newsletter` datasource as Home).

Context fields on each PersonPage: `Title`, `JobTitle`, `Phone`, `Email`, `Office`, `LinkedIn`, `Photo`, `Biography`, `Specialisms`, plus treelists `ExperienceItems`, `CredentialItems`, `InsightItems`, `RelatedPeople` (**Select related people**) under `/sitecore/content/legal/legal/Data/People/{slug}/`.

## CMS listings (Gridwell / Nova Medical patterns)

| Surface | Pattern | Sitecore |
|---------|---------|----------|
| `/out-law/news` | Gridwell Article Listing — **Context Item Children** resolver | Child **ArticlePage** items |
| `/about-us/announcements` | Same children resolver on AnnouncementSearch | Child **ArticlePage** items |
| `/people` | Nova Doctors Listing — children of the people folder | Child **PersonPage** items |
| Home / guide / restructuring **Related work** | Nova Reviews **Select Reviews** Treelist | `Data/RelatedWork/Related Work` → `Data/RelatedWorkItems` |
| Article tags + categories | Multi-select Treelists on ArticlePage | `Data/Tags`, `Data/Categories` |

`ArticlePage` fields: Title, Content, ShortDescription, Image, PublishedDate, ReadTime, Kicker, **Select Tags**, **Select Categories**, **Select Authors**. Export lives in `authoring/items/legal/serialized-content/`. Listings: `node authoring/items/legal/scripts/generate-cms-listings.mjs`. CIGA guide: `node authoring/items/legal/scripts/generate-guide-article.mjs`.

`src/lib/people-catalog.ts` supplies search/listing fallbacks if Edge has not published children yet.

## Content Hub

Tenant [starter-verticals-2](https://starter-verticals-2.sitecoresandbox.cloud). Brand **PinsentMason** (id `107233`). Maps: [`authoring/items/legal/scripts/media-maps/`](../authoring/items/legal/scripts/media-maps/README.md).

| File | Purpose |
|------|---------|
| `content-hub-asset-registry.csv` | LocalFile → Content Hub asset / `dam-id` / public URL |
| `legal-sitecore-image-field-map.csv` | Sitecore Image field → DAM `src` + `dam-id` |
| `legal-sitecore-data-map.csv` | Page / partial / rendering → datasource or context fields |
| `download-manifest.csv` | pinsentmasons.com harvest URL → local file (do not hotlink) |

Never hotlink `pinsentmasons.com` in Image fields — always DAM `src` + `dam-id`.

### Asset registry (Applied)

| LocalFile | DamId | Public content id | Sitecore field |
|-----------|-------|-------------------|----------------|
| `pm-logo.png` | `zERKocmyRYWZzEKMO-Qmyg` | `6f90694292a94601ad4fc05eb82ac516` | Header + Footer **Logo** |
| `pm-hero-slide-1.jpg` | `h8SATCkoQnGIDHEzBe9Kzw` | `615fe3f4a597485eafda2dfbd44565eb` | Home Hero **Image** |
| `pm-expertise.png` | `PAvvLjH0TFG-lDNfu2nvbQ` | `9d681ff287d346a894e5f5a6d4e240c1` | Expertise **PromoImageOne** |
| `pm-sectors.jpg` | `LhH0hyAbSA2S58sbfTQx2A` | `bc3ab4586dd340b6b6fe7703e1fca5c8` | Thinking **PromoImageOne** + Expertise **SectorsImage** |
| `dawn-allen.png` | `mAg0RiGGSfO2ePXMddiOLg` | `fc4540fa91034385b4f8b29267943322` | Dawn Allen **Photo** (PersonProfile on Person partial) |
| `bill-ryan.png` | `B-jK26X7RruYEdXyWbJtBA` | `9e82f560583e4332af039f6d4a08cf42` | Bill Ryan **Photo** (PersonProfile + PersonRelated) |
| `barry-mccaig.png` | `_9WcMeFbSzGAuMHwg914VQ` | `2b5b1d830fcc46be8f8f44ded1677f4b` | Barry McCaig **Photo** (PersonProfile + PersonRelated) |
| `bryn-reynolds.png` | `R4BXI91GTjmAXcWH0Ppxpw` | `d6cbefd639a7455ebe6fa012f47e883a` | Bryn Reynolds **Photo** (PersonProfile + PersonRelated) |
| `ben-mckinley.png` | `buf5WozESKGyzMsA9FN3ag` | `cf022e4a49494f40a0eea03d94f56c74` | Ben McKinley **Photo** (PersonProfile + PersonRelated) |
| `hammad-akhtar.png` | `S6DYtVtSSPyorvX1c3WezA` | `6357bbf7f34246e4b7aad215a603362a` | Hammad Akhtar **Photo** |
| `desiree-fields.png` | `SAr7LXiBQe2v1pP8tIshYw` | `e9feed2e48664d5682bb7de5040eb744` | Désirée Fields **Photo** |
| `dinesh-banani.png` | `xnmMYbtSQhGqeTbLVYgCzg` | `4a2f5cc3cabd467eb75c03c5ac7e0b48` | Dinesh Banani **Photo** |
| `david-barker.png` | `e3UpEq4qSViY3WzcLfy8lQ` | `872630383a624f9d94f17245454de16f` | David Barker **Photo** |
| `david-doogan.png` | `QoaVOsYdRWq0W_oY5rvjeQ` | `d9910e93814441a283e68606abb6c7f5` | David Doogan **Photo** |
| `sally-williamson.png` | `lzDDVKATQxyVxD6y5yAPrw` | `11166c8ef6d245c7bef0d4356193c9d7` | Sally Williamson **Photo** (CIGA guide author) |
| `pm-careers.jpg` | `3cugQ5XmSS6J-v6uLgei9g` | `a3f0831c9cd6400d956dfeab65f4c5d2` | Careers **PromoImageOne** (WithBackground) |
| `pm-services.jpg` | `H8THBvxEREaKZhvC7Cnc8g` | `4a245977b62b4cfd88280461582d87dc` | Expertise **ServicesImage** |
| `pm-locations.jpg` | `y3G7tfxaS7SXh4iLRiUVsQ` | `25992a233faf40be9cb23e2f6b7843ef` | Expertise **LocationsImage** |
| `pm-newsletter.jpg` | `y_MzwVA3TFuEQV7v0QNy0g` | `a72908ec4b9f4a67a1854207837c0322` | Newsletter **PromoImageOne** (Home + Person partial CTA) |

```powershell
cd authoring/items/legal/scripts
node download-legal-images.mjs
. '{local}/set-ch-env.ps1'   # never commit
.\Upload-LegalContentHub.ps1
.\Set-LegalContentHubMetadata.ps1
node patch-legal-dam-images.mjs
```

### Push to CM

The collection and site were created with the **XM Cloud wizard** (keep those item IDs). Pinsent pages, people, Out-Law, Header/Footer/Hero, and Content Hub image fields were remapped onto that tree and pushed.

`legal.module.json` currently serializes **collection + site content + renderings + Home Templates + Person Templates + PersonPage**. Other project templates and media-library stay off the module while CM still has leftover items from the first generated site at the same paths:

| Path | Keep (wizard) | Delete in Content Editor (old) |
|------|----------------|--------------------------------|
| `/sitecore/templates/Project/legal/Headless Site` | `2375aedf-…` | `b815f3ae-20d4-4117-abcb-c701ae48de85` |
| `/sitecore/templates/Project/legal/Headless Tenant` | `72e7aaa0-…` | `1cdafb1b-8a60-48ac-823d-4fd44e7dc879` |
| `/sitecore/media library/Project/legal/shared` | `75047b54-…` | `03fc6d79-ad5b-4e89-a3e9-0389e889527f` |

After those old items are deleted, restore the `templates`, `branches`, `media-library`, `placeholder-settings`, and `project-settings` includes.

```powershell
dotnet sitecore cloud login
dotnet sitecore serialization validate --fix -i legal-scs
dotnet sitecore serialization push -n sitecoreSilverProd -i legal-scs
dotnet sitecore publish item -n sitecoreSilverProd -p "/sitecore/content/legal" -sub -rel -l en
```

Do **not** pull `legal-scs` until the duplicate-path items above are gone. Pull of a missing `/sitecore/templates/Project/legal` does not create the site — **push** does.

## Editing host (SitecoreSilverProd)

The **`legal`** editing host is required for Pages, Experience Editor, and XM Cloud Deploy builds. It was added in **XM Cloud Deploy** (split deployment) with:

| Setting | Value |
|---------|--------|
| **Editing host name** | `legal` (must match `xmcloud.build.json` and Site Grouping — case-sensitive) |
| **Authoring environment** | SitecoreSilver / SitecoreSilverProd |
| **Source control** | GitHub |
| **Repository** | `spd_Sitecore.Demo.SitecoreAI.IndustryVerticals.SiteTemplates` |
| **Branch** | `main` |
| **Auto deploy on push** | Enabled |

After **Save**, run **Build and deploy** on the host (`…` menu) so the Next.js app is built from `industry-verticals/legal`.

### Assign the host to the site

In Content Editor, **Settings → Site Grouping → legal**:

1. **Predefined application editing host** = `legal` (not `Default`)
2. **RenderingHost** = `legal` (same value as the Deploy host name)

In SitecoreAI **Channels** → site **Settings** → **Site hosts**, set **Editing host** to `legal`.

Until this host exists and is assigned, Pages will not list the Pinsent Masons site under a usable editing host, even when `/sitecore/content/legal` is in master.

### Environment variables

Set on the **`legal`** editing host and in `industry-verticals/legal/.env.local`:

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_DEFAULT_SITE_NAME` | `legal` |
| `SITECORE_EDGE_CONTEXT_ID` | from Developer Settings |
| `NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID` | same as edge context id |
| `SITECORE_EDITING_SECRET` | from Developer Settings |

Optional Sitecore Search (same shared CEC credentials as Forma Lux / Bristan). After changing `NEXT_PUBLIC_*` values, rebuild the host — they are inlined at compile time.

| Variable | Value |
|----------|--------|
| `NEXT_PUBLIC_SEARCH_ENV` | `prod` |
| `NEXT_PUBLIC_SEARCH_CUSTOMER_KEY` | shared CEC customer key |
| `NEXT_PUBLIC_SEARCH_API_KEY` | shared CEC API key |
| `NEXT_PUBLIC_SEARCH_SOURCE` | `1193018` |
| `SITECORE_AppSettings_damEnabled__define` | `yes` |

`src/pages/_app.tsx` skips `WidgetsProvider` when the customer/API keys are empty so `/404` and `/500` SSG does not fail with `{discoverDomainId}`. People listing still uses `src/lib/people-catalog.ts`. Leftover Energy search widgets now read `NEXT_PUBLIC_SEARCH_SOURCE` (not `NEXT_PUBLIC_GRIDWELL_SEARCH_SOURCE`).

To list or update deployed values via CLI, see [Deployment Guide — Check and update environment variables](./DEPLOYMENT-GUIDE.md#7-check-and-update-environment-variables-deploy-cli). Resolve the editing host **environment id** from `dotnet sitecore cloud environment list` by matching the host name `legal`.
