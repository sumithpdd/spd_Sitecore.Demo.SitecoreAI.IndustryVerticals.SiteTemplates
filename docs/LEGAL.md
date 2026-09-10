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
| `/` | Home — hero, Expertise tabs, Out-Law + newsletter, awards, Careers, press releases |
| `/people` | People listing + search |
| `/people/dawn-allen` | Dawn Allen — Experience (incl. 2006 Barclays secondment + 2024 credential), Insights, affinity related people |
| `/people/bill-ryan` | Related partner |
| `/people/barry-mccaig` | Related partner |
| `/people/bryn-reynolds` | Related partner (Financial Services overlap with Dawn) |
| `/people/ben-mckinley` | Related partner |
| `/out-law/guides/when-uk-suppliers-must-continue-to-supply-insolvent-companies` | Out-Law guide + related work (CIGA / pre-pack / Dawn — not share plans) |
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
| `HomeExpertise` | client | Home Expertise tabs — Sectors / Services / Locations |
| `OutLawHome` | default | Out-Law kicker, heading, news CTAs, newsletter Sign-up |
| `ReachStrength` | default | Three-column awards — Our reach and strength |
| `Promo` | default, ImageRight | Careers ImageRight on home; other promo bands |
| `PressReleases` | default | Latest press release list |
| `PeopleSearch` | client | Intro copy + name/specialism search over the people catalog |
| `PersonProfile` | default | Photo, contacts, biography, Experience, Insights, affinity related people |
| `ArticleDetails` | default | Out-Law article body |
| `RelatedWork` | default | Taxonomy-aware related work on the guide and restructuring |
| `PracticePage` | default | `/expertise/restructuring` practice landing |
| `StoryHeard` | default | `/what-we-heard` — pain, personas, lifecycle |
| `StoryBoard` | default | `/story` — 19-beat talk track |
| `Footer` | default | Legal links, offices CTA, copyright |

People content is authorable on `PersonPage` items. `src/lib/people-catalog.ts` supplies search/listing fallbacks. Full inventory: [COMPONENTS.md — Legal](./COMPONENTS.md#legal-pinsent-masons). Manifest: `design-screenshots/pinsentmasons-com/component-review.json`.

## Content Hub

Tenant [starter-verticals-2](https://starter-verticals-2.sitecoresandbox.cloud). Brand **PinsentMason** (id `107233`). Maps: [`authoring/items/legal/scripts/media-maps/`](../authoring/items/legal/scripts/media-maps/README.md).

Never hotlink `pinsentmasons.com` in Image fields — always DAM `src` + `dam-id`.

### Asset registry (Applied)

| LocalFile | DamId | Public content id | Sitecore field |
|-----------|-------|-------------------|----------------|
| `pm-logo.png` | `zERKocmyRYWZzEKMO-Qmyg` | `6f90694292a94601ad4fc05eb82ac516` | Header + Footer **Logo** |
| `pm-hero-slide-1.jpg` | `h8SATCkoQnGIDHEzBe9Kzw` | `615fe3f4a597485eafda2dfbd44565eb` | Home Hero **Image** |
| `pm-expertise.png` | `PAvvLjH0TFG-lDNfu2nvbQ` | `9d681ff287d346a894e5f5a6d4e240c1` | Expertise **PromoImageOne** |
| `pm-sectors.jpg` | `LhH0hyAbSA2S58sbfTQx2A` | `bc3ab4586dd340b6b6fe7703e1fca5c8` | Thinking **PromoImageOne** |
| `dawn-allen.png` | `mAg0RiGGSfO2ePXMddiOLg` | `fc4540fa91034385b4f8b29267943322` | Dawn Allen **Photo** |

### Pending upload (people photos)

Harvest URLs are in `media-maps/download-manifest.csv`. After upload, patch YAML and push the person items.

| LocalFile | Source (do not hotlink) | Sitecore Photo field |
|-----------|-------------------------|----------------------|
| `bill-ryan.png` | `…/profile/r/ryan-bill.png` | `/people/bill-ryan` |
| `barry-mccaig.png` | `…/profile/b/barry-mccaig.png` | `/people/barry-mccaig` |
| `bryn-reynolds.png` | `…/profile/b/bryn-reynolds.png` | `/people/bryn-reynolds` |
| `ben-mckinley.png` | `…/profile/b/ben-mckinley.png` | `/people/ben-mckinley` |

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

`legal.module.json` currently serializes **collection + site content + renderings only**. A full-module pull/push of `templates` or `media-library` fails while CM still has leftover items from the first generated site at the same paths:

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
