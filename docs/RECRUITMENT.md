# Recruitment — Aspire

SitecoreAI demo of [weareaspire.com](https://www.weareaspire.com/). Sales, marketing, and events recruitment. Jobs, articles, and consultants are page items an author can edit.

| | Value |
|--|--|
| **Rendering host** | `recruitment` → `industry-verticals/recruitment` |
| **Editing host** | `recruitment` (must match Site Grouping **RenderingHost**) |
| **Build key** | `recruitment` in `xmcloud.build.json` |
| **Site name** | `recruitment` |
| **Collection path** | `/sitecore/content/recruitment` |
| **Site content path** | `/sitecore/content/recruitment/recruitment` |
| **Module** | `authoring/items/Recruitment/recruitment.module.json` (`recruitment-scs`) |
| **GUID prefix** | Content and renderings `4ec1`. Shell IDs come from the collection generator. Never reuse `a1e9` / `b40e` / `b803` / `0e0a` / `c4c0` / `a50c` |
| **Content Hub brand** | **Recruitment**, entity **112600** on [starter-verticals-2](https://starter-verticals-2.sitecoresandbox.cloud/en-us/brands/branddetail/112600) |
| **Push** | `dotnet sitecore serialization push -n sitecoreSilverProd -i recruitment-scs` |

The host renders these routes from code until the collection is pushed and published. After publish, the same URLs come from the page items. Images are Content Hub public links (`src` + `dam-id`) on brand **112600**. Never hotlink weareaspire.com.

## Maps

| Map | File |
|-----|------|
| Page map | [`recruitment-page-map.csv`](../authoring/items/Recruitment/scripts/media-maps/recruitment-page-map.csv) |
| Component map | [`recruitment-component-map.csv`](../authoring/items/Recruitment/scripts/media-maps/recruitment-component-map.csv) |
| Media map | [`recruitment-sitecore-image-field-map.csv`](../authoring/items/Recruitment/scripts/media-maps/recruitment-sitecore-image-field-map.csv) and [`content-hub-asset-registry.csv`](../authoring/items/Recruitment/scripts/media-maps/content-hub-asset-registry.csv) |

Index: [`authoring/items/Recruitment/scripts/media-maps/README.md`](../authoring/items/Recruitment/scripts/media-maps/README.md). Host fallbacks: `industry-verticals/recruitment/src/lib/aspire-dam.ts`.

| Page | URL | CMS item |
|------|-----|----------|
| Home | `/` | `Home` — banner datasource `Data/HomeBanner`, promo `Data/Promo` |
| Candidates | `/candidates` | `Home/candidates` |
| Jobs | `/jobs` | `Home/jobs` |
| Job search | `/jobs?query=&selected_locations=` | same item; the query string filters the catalogue |
| Account Executive - EdTech | `/job/account-executive-edtech-6039269` | `Home/job/account-executive-edtech-6039269` (template **Job**) |
| Further live roles | `/jobs` | eight more **Job** items under `Home/job` from the public board: education BDM, Singapore account manager, AI BDM, field sales, central sales, Newbury account executive, research lead, healthcare research manager |
| Consultants | `/consultants` | `Home/consultants` |
| Ian Payne | `/consultants/ian-payne` | `Home/consultants/ian-payne` (template **Consultant**) |
| More consultants | `/consultants/{slug}` | Tommy Styles, Amy Kirby, Becca Kitchen, Destiny Owoloko, Lauren James, Mat Law, Rachel Trevillion, Meg Rayner |
| Employers | `/employers` | `Home/employers` |
| Insights | `/insights` | `Home/insights` |
| Blog | `/blog` | `Home/blog` |
| Counter-offer article | `/blog/2026/07/the-counter-offer-crisis-how-to-secure-your-ideal-candidate` | that path under `Home/blog` (template **Article**) |
| Further journal posts | `/blog/2026/07/stop-hiring-for-pedigree`, `/blog/2026/07/internal-ta-and-agencies`, `/blog/2026/07/beyond-seo-and-geo`, `/blog/2026/06/employer-branding-on-a-budget`, `/blog/2026/06/hiring-for-agility` | **Article** items. Copy is a short demo summary of the public Aspire posts, not the full articles |
| London | `/branches/London` | `Home/branches/London` (template **Branch**) |

Job fields: Title, Location, Salary, JobType, Summary, Body, Reference. Consultant fields: Title, Role, Phone, Email, Location, Bio. Article fields: Title, Kicker, Author, Date, Summary, Body. Branch fields: Title, Phone, Address, Body. Those fields render with Sitecore field components, so Pages can edit them on the page.

A new job, consultant, or blog post does not need a layout. `Presentation/Page Designs` maps the Job, Consultant, and Article templates to page designs that already include the header, the matching component, and the footer. Insert a **Job** under `Home/job`, a **Consultant** under `Home/consultants`, or an **Article** under `Home/blog` (or a year/month folder), then fill in the fields.

The latest 20 roles from the Aspire jobs feed, and the consultant team from [weareaspire.com/consultants](https://www.weareaspire.com/consultants/), are page items. Portraits and the Senior Designer logo are on Content Hub brand **112600**. Roles without their own logo reuse a sector still. Added consultants: David Schofield, Katie Holmes, Kayleigh Granger, Max Tullis-Turner, Terry Payne, Andrea Robinson, and Charlotte Heard.

The latest 20 roles from the Aspire jobs API, and the full consultant team from [weareaspire.com/consultants](https://www.weareaspire.com/consultants/), are page items. Portraits and the Senior Designer client logo are Content Hub brand **112600**. Jobs without their own logo reuse an existing sector still (`job-edtech.jpg`, `job-marketplace.jpg`, or `job-saas.jpg`). New consultants: David Schofield, Katie Holmes, Kayleigh Granger, Max Tullis-Turner, Terry Payne, Andrea Robinson, Charlotte Heard.

Header search posts to `/jobs`. The customer profile drawer and the chatbot mount on every page from `_app.tsx`.

Local:

```powershell
cd industry-verticals/recruitment
copy .env.remote.example .env.local
npm install
npx next dev -p 3011
```

`.env.remote.example` leaves the Edge context id empty. Copy `SITECORE_EDGE_CONTEXT_ID` and `NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID` from another host’s `.env.local` in this repo, or the app fails at startup.

After the items are in Sitecore, regenerate the component map so Pages can resolve the new renderings:

```powershell
npm run sitecore-tools:generate-map
```
