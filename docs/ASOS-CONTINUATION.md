# ASOS demo — continuation handoff

Pick-up point for continuing the ASOS demo build. Written 2026-09-27 after a gap audit of `ASOS-REQUIRED-INVENTORY.md` (the checklist derived from the build-map v2 / workshop-plan v3) against this repo. Read `docs/ASOS.md` (story + CMS map) and `docs/ASOS-INVENTORY.md` (what's editable in Pages) first; this doc only covers **what changed and what's left**.

> **How to use in Cursor:** "Read `docs/ASOS-CONTINUATION.md`. Continue from the Remaining work section, top to bottom. After each item run `npx tsc --noEmit` and `npx eslint <files>` from `industry-verticals/asos`, and keep this doc's status table updated."

---

## Status

The **story runs end to end** — all 11 P0 journey pages exist with layouts + datasources, 192 ProductPage items, both brand kits (ASOS + Topshop), the curation-insight editor view. The work below is demo **instruments** and **realism polish**, not the core narrative.

| Area | Status |
|---|---|
| App/phone frame (C-14) | ✅ done |
| `audience=shop\|inspire` switch | ✅ done |
| `?broken=1` audit toggle — B-01, B-02 | ✅ done |
| 6-item "Berlin, October" board (A-07) | ✅ done |
| `?broken=1` — B-03, B-04, B-05 | ⬜ remaining |
| SEO link grid (C-05), SEO copy block (C-06) | ⬜ remaining |
| Breadcrumb (C-17), fit assistant / size guidance (C-16) | ⬜ remaining |
| Dated Style Feed folders (P0-08), accessibility page (P1-07) | ⬜ remaining |
| Live-URL-shape alignment (`/products/` vs `/prd/`, etc.) | ⬜ optional |

> ⚠️ Everything marked done is **type-checked (tsc) and lint-clean, but not yet visually confirmed in a running app.** First step for whoever continues: `npm run dev` and spot-check the demo params below.

---

## Demo control parameters (authoritative)

Read by helpers in `src/lib/asos-demo.ts` (and existing `asos-market.ts` / `asos-profile.ts`). Append to any URL.

| Param | Values | Effect | Status |
|---|---|---|---|
| `frame` | `phone` (default) · `off` | App/phone frame wrapper. Auto-off inside the Pages editor | ✅ |
| `audience` | `shop` (default) · `inspire` | Conversion-led vs inspiration-led `/women` layout | ✅ |
| `broken` | `1` | Audit states (B-01, B-02 live; B-03–B-05 pending) | 🟡 |
| `market` | `uk` · `us` · `au` · `de` | Copy, sizing, currency (4 markets — FR/IT deferred) | ✅ |
| `fit` | `petite` · `tall` · `curve` · `standard` | Fit-segment personalisation | ✅ |
| `known` | `0` · `1` | New vs returning customer | ✅ |
| `variant` | `a` · `b` | Experiment variant | ✅ |
| `pdp=thin` | — | Thin vs complete product page (the returns toggle) | ✅ |

Quick smoke test once `npm run dev` is up:
`/women` · `/women?frame=off` · `/women?audience=inspire` · `/women?broken=1` · `/shared-board/e5ebfcdb-7e61-473f-afc8-b0c973561d04` (expect 6 items).

---

## Files changed this session

| File | Change |
|---|---|
| `src/lib/asos-demo.ts` | **new** — `getAudience`, `isBroken`, `getFrame`/`frameEnabled`, `VIEWMODEL_LEAK`, `LEAKED_LOCALE_HREF` |
| `src/components/app-frame/AppFrame.tsx` | **new** — phone-frame wrapper, `disabled` prop for editor safety |
| `src/Layout.tsx` | wraps chrome in `<AppFrame disabled={mode.isEditing}>` |
| `src/lib/JourneyLayout.tsx` | wraps content in `<AppFrame>` |
| `src/lib/asos-journey.ts` | added `STORY.berlinSeedIds` (3 items) |
| `src/lib/asos-boards.ts` | "Berlin, October" board = seed + hearts = 6 |
| `src/components/gender-landing/GenderLanding.tsx` | `audience` reorder + B-01 label leak |
| `src/components/non-sitecore/AsosProductCard.tsx` | B-02 empty alt when broken |

No CMS/serialized items were changed this session; all changes are Next/React only.

---

## Remaining work

Do these top to bottom. Each lists the goal, files, the pattern to copy, and acceptance criteria.

### 1. Broken states B-03, B-04, B-05 (React-only, low risk)

Extend the `?broken=1` toggle. Pattern: import `isBroken` from `@/lib/asos-demo`; in client components read it on mount (`const [broken,setBroken]=useState(false); useEffect(()=>setBroken(isBroken()),[])`) to avoid hydration mismatch, or `isBroken(router.asPath)` where a router is already used (see `GenderLanding.tsx`).

- **B-03 single-dimension tag (no region).** Find where product tags / taxonomy chips render (e.g. category listing or PDP tag row). When broken, show a bare tag with no market/region qualifier.
- **B-04 hand-placed related content.** In the PDP rails (`src/lib/pdp-rails.tsx` / the `YouMightAlsoLike` etc. components), when broken, render a fixed hard-coded list instead of the ranked/affinity list — the "hand-placed rather than tag-resolved" defect.
- **B-05 leaked foreign-locale URL in nav.** Constant `LEAKED_LOCALE_HREF` is ready in `asos-demo.ts`. Inject one nav item pointing at it when broken. **Caution:** `src/components/navigation/Navigation.tsx` and `Header` are CMS-driven chrome used everywhere — verify visually in a running app before/after. Safest to add a single extra `<li>`/link guarded by `isBroken()`, not to rewrite the nav data.

**Accept:** `/women?broken=1` (and a PDP) visibly show each defect; `?broken` absent = clean. tsc + eslint clean. Update the B-03/B-04/B-05 rows in `ASOS-REQUIRED-INVENTORY.md` / gap analysis.

### 2. SEO link grid (C-05) + SEO copy block (C-06) — Sitecore renderings

These are two of the four real homepage modules and are almost always omitted. They must be **editable in Pages**, so each needs the full Sitecore rendering path, not just a React file:

1. React component under `src/components/seo-link-grid/` and `src/components/seo-copy/` (copy conventions from `src/components/trending-chips/TrendingChips.tsx`).
2. Register in the component map — add the import to `industry-verticals/asos/.sitecore/component-map.ts`, or just run `npm run sitecore-tools:generate-map`.
3. Create the **rendering item**, **template** (fields: SEO grid = 40 links in 4 columns; SEO copy = one rich-text brand-voice field), and **datasource** as serialized YAML under `authoring/items/asos/serialized-content/asos/asos/...`. **Copy an existing rendering item exactly** (e.g. the `StyleFeed`/`Edit` rendering) for the GUID structure — the ProductPage item shape is documented in `docs/ASOS.md` (Components + Media sections). Allocate fresh GUIDs in the `a50c0001-1111-…` (renderings) / `a50c0003-…` (templates) ranges; **check for collisions across the whole `authoring/items/asos/serialized-content` tree, including hash folders like `09F655C04A8E26BC/`** (product items live in two places on disk — see `docs/ASOS-INVENTORY.md`).
4. Add to the homepage `headless-main` (Order 6/7 in `docs/ASOS.md` "Homepage, top to bottom") and to Emma's `/women` per the module sequence in `ASOS-CONTEXT.md`.
5. Populate SEO copy from ASOS's real brand voice (see `ASOS-CONTEXT.md` §4.11) — this is the brand-kit demo target.

**Accept:** both modules render on `/` and `/women`, are editable in Pages, and survive `dotnet sitecore serialization validate --fix -i asos-scs`. Follow the publish flow in `docs/ASOS-INVENTORY.md`.

### 3. Breadcrumb (C-17)

`src/components/breadcrumb/` exists but is **empty**. Build a small breadcrumb (Home › Women › {category}) driven by the route path (`useRouter().asPath` + `parseMarketPath`). Can be a journey/React component rendered by the listing/PDP layouts, or a full Sitecore rendering if it must be editable. Small, but its absence makes the replica feel fake.

**Accept:** breadcrumb shows on listing + PDP pages, respects market prefix. tsc + eslint clean.

### 4. Fit assistant / size guidance (C-16) — returns-relevant

A size-guidance component on the PDP: "you kept a UK 8 in this brand", size table, true-to-size. Data from `src/lib/asos-profile.ts` (fit profile + keep history). This is a returns lever (ASOS-CONTEXT §7). Start React-only on the PDP; promote to a Sitecore rendering only if it must be editable.

**Accept:** appears on the story PDP, reads keep/fit history, changes with `?fit=`/`?known=`.

### 5. Lower priority

- **Dated Style Feed folders (P0-08).** Live shape is `/women/fashion-feed/YYYY_MM_DD-ddd/<slug>/`; current is flat `/style-feed/{slug}`. Model the drop date (see `StyleFeedArticle` template in ASOS-CONTEXT §8). Routing + article item `dropDate` field.
- **Accessibility statement page (P1-07)** — `/accessibility/`, ties to the alt-text thread.
- **Live-URL-shape alignment** — optional realism: PDP `/<brand>/<slug>/prd/<id>`, brand listing `/women/a-to-z-of-brands/topshop`, saved `/saved-lists/`. The build map warns wrong URL shapes "make a replica feel fake." Only do this if the room will inspect URLs.

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
