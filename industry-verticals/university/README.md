# University (higher education)

## Overview

The **University** site is a demo vertical based on the **Legal** app (same components and Content SDK patterns). It is aimed at higher-education brands—currently themed as an **[Anglia Ruskin University (ARU)](https://www.aru.ac.uk/)–inspired** experience, with sector context from sites such as [LJMU](https://www.ljmu.ac.uk/).

See **[docs/ARU-BRAND.md](./docs/ARU-BRAND.md)** for tokens, typography, and layout notes.

## Developer expectations

- Tailwind-based styling (Shadcn)
- Modular components shared with the Legal vertical (Promo variants, Breadcrumb, search, etc.)
- Alignment with Industry Verticals conventions (navigation, layout, localization)

## Preconditions

1. You have deployed your XM Cloud environment. If not: [Deploy a Project and Environment](https://doc.sitecore.com/xmc/en/developers/xm-cloud/deploy-a-project-and-environment.html).

## Run site locally

1. From the repository root, open the app folder:  
   `cd industry-verticals\university`
2. Copy `.env.remote.example` to `.env.local` and set at least:
   - `SITECORE_EDGE_CONTEXT_ID`
   - `NEXT_PUBLIC_DEFAULT_SITE_NAME`
   - `NEXT_PUBLIC_SITECORE_EDGE_CONTEXT_ID`
   - `SITECORE_EDITING_SECRET`
   - `NEXT_PUBLIC_BASE_URL`
3. `npm install`
4. `npm run dev`
5. Open `http://localhost:3000`

## Editing host (XM Cloud)

The `university` rendering host is defined in **`xmcloud.build.json`** at the repo root (`enabled` is `false` by default—set to `true` when you want automated editing-host creation). When using split deployment, add an editing host named **`university`** to match that key.

## Header / footer / promo

Layout classes live in `src/assets/components/header-footer-university.css`. Brand colours are driven by `src/assets/base/variables.css`.

**Promo** supports the same variants as Legal / retail where applicable: **Default**, **WithFullImage**, **WithQuote**, and **Stacked** (subtitle banner strip). Style flags are in `src/types/styleFlags.ts`.

## Content SDK components

Shared patterns match the Legal vertical; see [`docs/COMPONENTS.md`](../../docs/COMPONENTS.md) for the full Industry Verticals list.

[Content SDK documentation](https://doc.sitecore.com/xmc/en/developers/content-sdk/sitecore-content-sdk-for-xm-cloud.html)
