# Sitecore datasource fields — General Link, images, and `[object Object]`

Quick reference for authors and agents wiring **datasource items** (`Data/Hero Banners`, `Data/Promos`, etc.) to Content SDK components. Prevents the Bristan Home Hero class of bugs: broken CTA links, empty images, and **`[object Object]`** in the browser.

**Skill reference (YAML examples + GraphQL):**  
[`.cursor/skills/sitecore-serialization-skills/sitecore-new-rendering-yaml/references/datasource-field-values.md`](../.cursor/skills/sitecore-serialization-skills/sitecore-new-rendering-yaml/references/datasource-field-values.md)

---

## General Link fields (`CtaLink`, `PromoMoreInfo`, …)

Serialized **internal** links must include the **target item GUID** in the `id` attribute, not only `text` and `url`.

| Status | Example |
|--------|---------|
| **Bad** — Edge `jsonValue: null`, UI shows `[object Object]` | `<link linktype="internal" text="Find out more" url="/homeowners-home" />` |
| **Good** | `<link class="" querystring="" id="b8030001-0001-4000-8000-000000000003" anchor="" target="" title="" linktype="internal" text="Find a Product" url="/bathroom-taps" />` |

Copy the pattern from **Forma Lux → Data → Hero Banners → Home Banner** or **Bristan → Data → Hero Banners → Home Hero** (after pull from CM).

---

## Image fields

| Source | Edge / delivery |
|--------|-----------------|
| Reference website CDN (e.g. `bristan.com/.../banner-1.ashx`) | **Fails** — empty `value: {}` on Edge |
| **Content Hub DAM** (Pages media picker) | **Recommended** — includes `dam-id`, public `src`, `thumbnailsrc` |
| Rendering host `public/` path (e.g. `/images/hero/banner-1.jpg`) | OK for local dev / fallback |
| Your tenant XM Cloud public content URL | OK |

**Workflow:** Pick image in CM with CH DAM → publish → `dotnet sitecore serialization pull` → commit YAML.

---

## Hero Banner component (Bristan / retail pattern)

- **Datasource template:** `Project/industry-verticals/Components/Page Content/Hero Banner/Hero Banner`
- **React:** flat `fields` — `Title`, `Description`, `Image`, `CtaLink` passed to SDK `<Text>`, `<RichText>`, `<NextImage>`, `<Link>`
- **Bristan** adds `pickField()` / `getValidCtaLink()` and image fallback for legacy `.ashx` URLs — see `industry-verticals/bristan/src/components/hero-banner/HeroBanner.tsx`
- **Retail / Forma Lux** use the same field wiring; content must be valid on Edge (no extra guards required)

---

## Verify before debugging React

```graphql
# Replace path and site name
query {
  item(path: "/sitecore/content/bristan/bristan/Data/Hero Banners/Home Hero", language: "en") {
    field(name: "CtaLink") { jsonValue }
    field(name: "Image") { jsonValue }
  }
}
```

Then publish if fields are correct in CM but delivery is empty.

---

## Related docs

- [BRISTAN.md](./BRISTAN.md) — Bristan site map and hero checklist
- [JUNIOR-DEVELOPER-GUIDE.md](./JUNIOR-DEVELOPER-GUIDE.md) — component anatomy
- [SITECORE-SITE-SHELL.md](./SITECORE-SITE-SHELL.md) — site shell and Page Designs
