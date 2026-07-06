# Bristan

## Overview

Bristan is a demo site inspired by [bristan.com](https://www.bristan.com/) — UK's number one taps and showers brand. It uses shared **industry-verticals** React components with a dedicated rendering host and isolated Sitecore content module. See [docs/BRISTAN.md](../../docs/BRISTAN.md) for site connection, page map, and design screenshots.

## Design reference

Captured desktop screenshots from bristan.com — full gallery in [docs/BRISTAN.md](../../docs/BRISTAN.md#design-reference-captured-from-bristancom).

![Bristan.com home reference](../../docs/images/bristan/home-desktop.png)

Page composition map: `design-screenshots/bristan-com/component-review.json`

React component map: `.sitecore/component-map.ts` (see [Component map](#component-map) below)

## Site configuration

| Setting                         | Value                        |
| ------------------------------- | ---------------------------- |
| Site name                       | `bristan`                    |
| Shared site (same host)         | `heritage`                   |
| Rendering host                  | `bristan`                    |
| App folder                      | `industry-verticals/bristan` |
| `NEXT_PUBLIC_DEFAULT_SITE_NAME` | `bristan`                    |
| `SITECORE_STATIC_BUILD_SITES`   | `bristan,heritage` (optional override for SSG) |

In Sitecore **Settings → Site Grouping → bristan** (and **heritage**), set **Predefined application editing host** to **`bristan`**.

### Rendering host scope

This app builds and serves **bristan** and **heritage** only. Other tenant sites (Lyvera, Forma Lux, etc.) have separate rendering hosts under `industry-verticals/`. XM Cloud `sites.json` lists all tenant sites for middleware; SSG path discovery is filtered via `src/lib/rendering-host-sites.ts`. See [docs/BRISTAN.md — Rendering host scope](../../docs/BRISTAN.md#rendering-host-scope-and-static-build).

### Pages and components

Full route map, page designs, partial designs, and component variant reference: **[docs/BRISTAN.md — Pages and routes](../../docs/BRISTAN.md#pages-and-routes)** and **[Components](../../docs/BRISTAN.md#components)**.

| Area | Example routes |
| ---- | -------------- |
| Home / audiences | `/`, `/homeowners-home`, `/installers-home`, `/merchants-home`, `/specifiers-home` |
| Categories | `/showers`, `/bathroom-taps`, `/essentials` |
| Products | `/products/bathroom-taps`, `/products/bathroom-taps/{product}` |
| Blog | `/homeowners-home/homeowners-inspiration/blogs`, `.../blogs/{slug}` |
| Utility | `/search`, `/find-a-retailer`, `/order-a-brochure` |

Bristan-specific headless variants include **BristanMegaMenu**, **BristanUtility**, **TopBanner**, **BrowseRanges**, **BristanBlog**, **SpareParts**, **TrustpilotWidget**, **InspirationCarousel**.

### Fixing “missing React implementation” errors

If the homepage shows orange boxes for components, the site is usually bound to the wrong rendering host (for example `nextjsstarter`, `luxury-retail`, or `retail` instead of `bristan`).

1. In Content Editor, open **bristan → Settings → Site Grouping → bristan**.
2. Set **Predefined application editing host** to **`bristan`**.
3. Save and publish the site.
4. Redeploy the **bristan** editing host in XM Cloud Deploy if needed.

## Developer expectations

- Tailwind-based styling (Shadcn)
- Modular components for reuse (same component names as industry-verticals / Essential Living starters)
- Shared page infra aligned with `luxury-retail`; search and optional demo/CDP from `retail`
- Localization support (en, fr-FR, es-ES when configured)

## Component map

SXA components are registered in `.sitecore/component-map.ts`. Regenerate the baseline from `src/components`:

```bash
npm run sitecore-tools:generate-map
```

CLI config (`sitecore.cli.config.ts`) excludes `content-sdk`, `non-sitecore`, `demo`, and `cdp-profile-panel`. After generate, keep **search widget** entries in the map (copied from `non-sitecore/search/*`) — same pattern as `industry-verticals/retail`.

| Registered                                | Not in map (app shell)                         |
| ----------------------------------------- | ---------------------------------------------- |
| HeroBanner, Header, Footer, Navigation, … | DemoAuthShell, DemoLoginModal, CdpProfileShell |

Full list: [docs/COMPONENTS.md — Bristan](../../docs/COMPONENTS.md#-bristan-bristancom) and [docs/BRISTAN.md](../../docs/BRISTAN.md#react-component-map).

## Hero Banner troubleshooting

If the home hero shows **`[object Object]`**, empty CTA, or a missing image:

1. **CtaLink** — datasource must use full internal link XML with target page **`id`** (not minimal `linktype` + `url` only). See [SITECORE-DATASOURCE-FIELDS.md](../../docs/SITECORE-DATASOURCE-FIELDS.md).
2. **Image** — use **Content Hub DAM** in CM; pull serialization. External reference-site URLs (e.g. `bristan.com/.../banner-1.ashx`) return empty on Edge.
3. **Publish** — push module to CM, then publish Home + Home Hero datasource to Edge.
4. **Component** — `HeroBanner.tsx` guards malformed links via `getValidCtaLink()`; fix content first (retail pattern does not need guards when Edge fields are valid).

Verified working datasource: `authoring/items/bristan/.../Data/Hero Banners/Home Hero.yml` (CH DAM image + full CtaLink).

## Preconditions

You have deployed your XM Cloud environment. If not, see [Deploy a Project and Environment](https://doc.sitecore.com/xmc/en/developers/xm-cloud/deploy-a-project-and-environment.html).

## Run site locally

1. From the repository root, open the Bristan app:
   `cd industry-verticals/bristan`
2. Copy `.env.remote.example` to `.env.local`
3. Set at minimum:
   - `SITECORE_EDGE_CONTEXT_ID`
   - `NEXT_PUBLIC_DEFAULT_SITE_NAME=bristan`
   - `NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID`
   - `SITECORE_EDITING_SECRET`
   - `NEXT_PUBLIC_BASE_URL`
   - Optional: `SITECORE_STATIC_BUILD_SITES=bristan,heritage` (defaults match if omitted)
4. For search (optional), also set:
   - `NEXT_PUBLIC_SEARCH_ENV`
   - `NEXT_PUBLIC_SEARCH_CUSTOMER_KEY`
   - `NEXT_PUBLIC_SEARCH_API_KEY`
   - `NEXT_PUBLIC_SEARCH_SOURCE`
5. Install and run:
   ```bash
   npm install
   npm run dev
   ```
6. Open http://localhost:3000

## Add editing host to XM Cloud

If split deployment is **disabled**, editing hosts are created from `xmcloud.build.json` when `enabled` is true — manual steps below are usually not required.

1. Open [Sitecore Cloud Portal](https://portal.sitecorecloud.io) → XM Cloud Deploy → your project
2. **Editing Hosts** → **Add editing host** (if needed)
3. Name: **`bristan`** (matches `xmcloud.build.json`)
4. Include search environment variables if using search
5. Save, then **Build and deploy**

[Content SDK documentation](https://doc.sitecore.com/xmc/en/developers/content-sdk/sitecore-content-sdk-for-xm-cloud.html)

## Sitecore Search configuration

Bristan reuses the **shared retail / Forma Lux search source** and the same widget rfkIds (`formalux_preview_search`, `formalux_search_results`, `formalux_search_home_highlight_articles`) defined in `src/constants/search.ts`. No separate Bristan widgets are required in the CEC portal unless you create a dedicated search source.

Set on the **`bristan`** editing host and in `.env.local`:

```bash
NEXT_PUBLIC_SEARCH_ENV=prod
NEXT_PUBLIC_SEARCH_CUSTOMER_KEY=<from CEC portal>
NEXT_PUBLIC_SEARCH_API_KEY=<from CEC portal>
NEXT_PUBLIC_SEARCH_SOURCE=<source id, e.g. shared retail source>
NEXT_PUBLIC_BASE_URL=<your site URL>
```

See [docs/BRISTAN.md](../../docs/BRISTAN.md) and [docs/DEPLOYMENT-GUIDE.md](../../docs/DEPLOYMENT-GUIDE.md) for Deploy CLI variable updates.

To use a **dedicated Bristan search source**, create it in the [CEC portal](https://sitecore.atlassian.net/wiki/x/ZwAengE), point `NEXT_PUBLIC_SEARCH_SOURCE` at the new source id, and update widget rfkIds in `src/constants/search.ts` to match widgets you create for that source.

## Demo login and CDP engagement panel

Optional demo features (from the retail starter):

- **Account icon** in the header — demo sign-in popover and modal; CDP `identity()` on email
- **Engagement panel** — floating button (bottom-right) with session events and guest profile

Client-side only; standard Edge context env vars are sufficient.

## Localization

Default locales when configured in Sitecore and `next.config.js`:

- en (English)
- fr-FR (French)
- es-ES (Spanish)

Add languages in Sitecore **Channels → site → Settings → Languages**, then update `next.config.js` locales and `src/constants/localeOptions.ts`.

## Production build

```bash
npm run build
```

Expect roughly **98** static pages (bristan + heritage locales), not every site in the XM Cloud tenant. If the build fails on `_site_lyvera`, `_site_forma-lux`, or similar paths, the host is incorrectly pre-rendering other sites — see [Build troubleshooting](../../docs/BRISTAN.md#build-troubleshooting).

For XM Cloud deploy, also set on the **bristan** editing host:

| Variable | Purpose |
| -------- | ------- |
| `SITECORE_AUTH_CLIENT_ID` | Design Library / `sitecore-tools:build` code extraction |
| `SITECORE_AUTH_CLIENT_SECRET` | Same |
| `SITECORE_STATIC_BUILD_SITES` | Optional; default `bristan,heritage` |
