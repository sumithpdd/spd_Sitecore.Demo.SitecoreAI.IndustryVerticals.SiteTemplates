# Legal Content Hub ↔ Sitecore maps

Pinsent Masons demo assets in the sandbox Content Hub tenant [starter-verticals-2](https://starter-verticals-2.sitecoresandbox.cloud). Brand **PinsentMason** (entity id `107233`).

**Do not commit secrets.** Credentials stay in a local `set-ch-env.ps1` (never this folder or `docs/`). Never hotlink `pinsentmasons.com` in Sitecore Image fields.

## Map files

| File | Purpose |
|------|---------|
| `content-hub-asset-registry.csv` | One row per `LocalFile` — `ContentHubAssetId`, `DamId`, public URL, Brand / type / tag, Sitecore use |
| `content-hub-asset-metadata.csv` | Result of metadata apply (Brand PinsentMason) |
| `legal-sitecore-image-field-map.csv` | Sitecore item path + Image field → DAM `src` + `dam-id` XML |
| `download-manifest.csv` | Provenance: pinsentmasons.com URL → local file → Sitecore field |

## Pipeline

```text
1) node download-legal-images.mjs
     harvest into media-staging/ (gitignored)

2) Upload-LegalContentHub.ps1
     upload new LocalFiles to Brand PinsentMason
     create public links
     → content-hub-asset-registry + legal-sitecore-image-field-map

3) Set-LegalContentHubMetadata.ps1
     Brand = PinsentMason / Type = Social Media Asset / Tag = Used in CMS

4) node patch-legal-dam-images.mjs
     write Image field XML onto Header / Footer / Hero / Promos / Person pages
```

## Uploaded (Applied)

| LocalFile | DamId | Sitecore |
|-----------|-------|----------|
| `pm-logo.png` | `zERKocmyRYWZzEKMO-Qmyg` | Header + Footer Logo |
| `pm-hero-slide-1.jpg` | `h8SATCkoQnGIDHEzBe9Kzw` | Home Hero Image |
| `pm-expertise.png` | `PAvvLjH0TFG-lDNfu2nvbQ` | Expertise PromoImageOne |
| `pm-sectors.jpg` | `LhH0hyAbSA2S58sbfTQx2A` | Thinking PromoImageOne + Expertise SectorsImage |
| `dawn-allen.png` | `mAg0RiGGSfO2ePXMddiOLg` | Dawn Allen Photo |
| `pm-careers.jpg` | `3cugQ5XmSS6J-v6uLgei9g` | Careers PromoImageOne |
| `pm-services.jpg` | `H8THBvxEREaKZhvC7Cnc8g` | Expertise ServicesImage |
| `pm-locations.jpg` | `y3G7tfxaS7SXh4iLRiUVsQ` | Expertise LocationsImage |
| `pm-newsletter.jpg` | `y_MzwVA3TFuEQV7v0QNy0g` | Newsletter PromoImageOne |

## Pending upload

`bill-ryan.png`, `barry-mccaig.png`, `bryn-reynolds.png`, `ben-mckinley.png` — source URLs in `download-manifest.csv`. After upload, re-run metadata + `patch-legal-dam-images.mjs`.
