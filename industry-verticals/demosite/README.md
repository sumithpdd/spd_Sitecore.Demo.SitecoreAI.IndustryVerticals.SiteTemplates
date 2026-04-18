# DemoSite (Lewisham-inspired)

## Overview

**DemoSite** is a demo vertical cloned from the **University** app (same Content SDK components and patterns as **Legal**). It is themed to resemble the public [Lewisham Council](https://lewisham.gov.uk/) experience: dark blue structure, turquoise accents, Open Sans typography.

See **[docs/LEWISHAM-BRAND.md](./docs/LEWISHAM-BRAND.md)** for tokens, typography, and layout notes.

## Developer expectations

- Tailwind-based styling (Shadcn)
- Shared components with Legal / University (Promo variants, Breadcrumb, search, etc.)
- Industry Verticals conventions (navigation, layout, localization)

## Preconditions

1. You have deployed your XM Cloud environment. If not: [Deploy a Project and Environment](https://doc.sitecore.com/xmc/en/developers/xm-cloud/deploy-a-project-and-environment.html).

## Run site locally

1. From the repository root, open the app folder:  
   `cd industry-verticals\demosite`
2. Copy `.env.remote.example` to `.env.local` and set at least:
   - `SITECORE_EDGE_CONTEXT_ID`
   - `NEXT_PUBLIC_DEFAULT_SITE_NAME` (typically `demosite` for this vertical)
   - `NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID`
   - `SITECORE_EDITING_SECRET`
   - `NEXT_PUBLIC_BASE_URL`
3. `npm install`
4. `npm run dev`
5. Open `http://localhost:3000`

## Editing host (XM Cloud)

The `demosite` rendering host is defined in **`xmcloud.build.json`** at the repo root. When using split deployment, add an editing host named **`demosite`** to match that key (see [Site cloning guide](../../docs/SITE-CLONING-GUIDE.md)).

## Header / footer / promo

Layout classes live in `src/assets/components/header-footer-demosite.css`. Brand colours are driven by `src/assets/base/variables.css`.

**Promo** supports the same variants as Legal / retail where applicable: **Default**, **WithFullImage**, **WithQuote**, and **Stacked**. Style flags are in `src/types/styleFlags.ts`.

## Content SDK components

Shared patterns match the Legal vertical; see [`docs/COMPONENTS.md`](../../docs/COMPONENTS.md) for the full Industry Verticals list.

[Content SDK documentation](https://doc.sitecore.com/xmc/en/developers/content-sdk/sitecore-content-sdk-for-xm-cloud.html)
