# ASOS demo — continuation handoff

Pick-up point for continuing the ASOS demo build. Written 2026-09-27 after a gap audit of `ASOS-REQUIRED-INVENTORY.md` (the checklist derived from the build-map v2 / workshop-plan v3) against this repo. Read `docs/ASOS.md` (story + CMS map) and `docs/ASOS-INVENTORY.md` (what's editable in Pages) first; this doc only covers **what changed and what's left**.

> **How to use in Cursor:** "Read `docs/ASOS-CONTINUATION.md`. Continue from the Remaining work section, top to bottom. After each item run `npx tsc --noEmit` and `npx eslint <files>` from `industry-verticals/asos`, and keep this doc's status table updated."

---

## Status

The **story runs end to end** — all 11 P0 journey pages exist with layouts + datasources, 192 ProductPage items, both brand kits (ASOS + Topshop), the curation-insight editor view. The work below is demo **instruments** and **realism polish**, not the core narrative.

| Area | Status |
|---|---|
| App/phone frame (C-14) | removed — pages are full width |
| `audience=shop\|inspire` switch | ✅ done |
| `?broken=1` audit toggle — B-01, B-02 | ✅ done |
| 6-item "Berlin, October" board (A-07) | ✅ done |
| `?broken=1` — B-03, B-04, B-05 | done — bare Denim chip, hand-placed rails, Moda nav link |
| SEO link grid (C-05), SEO copy block (C-06) | done — renderings on Home and `/women` |
| Breadcrumb (C-17), fit assistant / size guidance (C-16) | done — listing crumb; PDP size guidance |
| Dated Style Feed folders (P0-08), accessibility page (P1-07) | dates on the four articles; `/accessibility` page. URLs stay `/style-feed/{slug}` |
| Live-URL-shape alignment (`/products/` vs `/prd/`, etc.) | skipped — canonical products stay `/products/{slug}` |
| Product copy + story ProductPage items | done — copy on the catalogue items; jean, knit, boot, Belle Paris, Weekday are ProductPage items. One photo each |

> ⚠️ Everything marked done is **type-checked (tsc) and lint-clean, but not yet visually confirmed in a running app.** First step for whoever continues: `npm run dev` and spot-check the demo params below.

---

## Demo control parameters (authoritative)

Read by helpers in `src/lib/asos-demo.ts` (and existing `asos-market.ts` / `asos-profile.ts`). Append to any URL.

| Param | Values | Effect | Status |
|---|---|---|---|
| `audience` | `shop` (default) · `inspire` | Conversion-led vs inspiration-led `/women` layout | ✅ |
| `broken` | `1` | Audit states B-01 through B-05 | done |
| `market` | `uk` · `us` · `au` · `de` | Copy, sizing, currency (4 markets — FR/IT deferred) | ✅ |
| `fit` | `petite` · `tall` · `curve` · `standard` | Fit-segment personalisation | ✅ |
| `known` | `0` · `1` | New vs returning customer | ✅ |
| `variant` | `a` · `b` | Experiment variant | ✅ |
| `pdp=thin` | — | Thin vs complete product page (the returns toggle) | ✅ |

Quick smoke test once `npm run dev` is up:
`/women` · `/women?audience=inspire` · `/women?broken=1` · `/shared-board/e5ebfcdb-7e61-473f-afc8-b0c973561d04` (expect 6 items).

---

## Files changed this session

| File | Change |
|---|---|
| `src/lib/asos-demo.ts` | `getAudience`, `isBroken`, `VIEWMODEL_LEAK`, `LEAKED_LOCALE_HREF`. Phone frame helpers were removed |
| `src/Layout.tsx` | full-width chrome. No phone frame |
| `src/lib/JourneyLayout.tsx` | full-width chrome. No phone frame |
| `src/lib/asos-journey.ts` | added `STORY.berlinSeedIds` (3 items) |
| `src/lib/asos-boards.ts` | "Berlin, October" board = seed + hearts = 6 |
| `src/components/gender-landing/GenderLanding.tsx` | `audience` reorder + B-01 label leak |
| `src/components/non-sitecore/AsosProductCard.tsx` | B-02 empty alt when broken |

Serialized items now include SEO renderings, product copy, and the story ProductPage items. Push `asos-scs` before Pages shows them.

---

## Remaining work

Canonical product URLs stay `/products/{slug}`. Do not switch them to `/prd/{id}`.

Each product still has one Content Hub photo. Do not invent a second angle. Where a product has a video, that is the second frame.

Product items already carry the ProductPage rendering. Leave the Product page design as header and footer only, or the product renders twice.

SEO link grid and SEO copy are on Home and `/women` in serialized layout. They also render from code until those items are pushed. Push `asos-scs` before they are editable in Pages.

---

## Verify (run from `industry-verticals/asos`)

```powershell
npx tsc --noEmit          # types
npx eslint src/**/*.ts src/**/*.tsx   # or lint just the files you touched
npx prettier --write <files>          # repo uses CRLF; run before eslint on new files
npm run dev               # visual check — needs .env.local (copy .env.remote.site)
```

For any CMS/serialized changes: `node authoring/items/asos/scripts/write-asos-maps.mjs` → `dotnet sitecore serialization validate --fix -i asos-scs` → `dotnet sitecore serialization push -n sitecoreSilverProd -i asos-scs` (see `docs/ASOS-INVENTORY.md`).

## Gotchas

- **Product items live in two places on disk:** 148 under `.../Home/Products/*.yml` and 44 in the hash folder `serialized-content/asos/09F655C04A8E26BC/`. Any "does X exist / count" check must include hash folders. Total is 192.
- **Never hotlink `asos.com` / `images.asos-media.com`** in image fields — Content Hub `src` + `dam-id` only (from `dam-registry.ts`).
- **New line-ending:** repo is CRLF; new files written as LF fail `prettier/prettier` lint — run `prettier --write` first.
- The full gap analysis (with per-item EXISTS/PARTIAL/MISSING) is in the author's working dir as `ASOS-GAP-ANALYSIS.md` (not in this repo).
