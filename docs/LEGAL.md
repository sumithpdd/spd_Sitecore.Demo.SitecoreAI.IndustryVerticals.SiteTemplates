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
| `/` | Home — “Trusted for expertise, chosen for outcomes” |
| `/people` | People listing + search |
| `/people/dawn-allen` | Dawn Allen partner profile |
| `/people/bill-ryan` | Related partner (also viewed) |
| `/people/barry-mccaig` | Related partner |
| `/people/bryn-reynolds` | Related partner |
| `/people/ben-mckinley` | Related partner |
| `/out-law/guides/when-uk-suppliers-must-continue-to-supply-insolvent-companies` | Out-Law guide |
| `/expertise` `/thinking` `/offices` `/careers` `/about-us` | Primary nav destinations |

## Brand

Maroon primary (`#7C0A2E`) for logo, pill CTAs and borders. Dark teal (`#005955` / `#0d3d3c`) for section bands. Charcoal type on white/grey. Do not use yellow.

## Components

| Rendering | Role |
|-----------|------|
| `Header` | Logo + Expertise / People / Thinking / Offices / Careers / About us |
| `HeroBanner` | Home photography + charcoal headline + maroon CTA |
| `Promo` | Expertise and Out-Law / Thinking bands |
| `PeopleSearch` | Intro copy + name/specialism search over the people catalog |
| `PersonProfile` | Photo, contacts, biography, credentials, specialisms, related people |
| `ArticleDetails` | Out-Law article body |
| `Footer` | Legal links, offices CTA, copyright |

People content is authorable on `PersonPage` items. `src/lib/people-catalog.ts` supplies search/listing fallbacks.

## Content Hub

Download reference images, then upload to Brand **PinsentMason**:

```powershell
cd authoring/items/legal/scripts
node download-legal-images.mjs
. '{local}/set-ch-env.ps1'   # never commit
.\Upload-LegalContentHub.ps1
.\Set-LegalContentHubMetadata.ps1
node patch-legal-dam-images.mjs
```

Never hotlink `pinsentmasons.com` in Image fields.

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

To list or update deployed values via CLI, see [Deployment Guide — Check and update environment variables](./DEPLOYMENT-GUIDE.md#7-check-and-update-environment-variables-deploy-cli). Resolve the editing host **environment id** from `dotnet sitecore cloud environment list` by matching the host name `legal`.
