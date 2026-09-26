# ASOS media maps

Content Hub brand **108526** (Asos) on [starter-verticals-2](https://starter-verticals-2.sitecoresandbox.cloud/en-us/brands/branddetail/108526).

| Map | File |
|-----|------|
| Page map | `asos-page-map.csv` — public route, Sitecore path, title, YAML file under `serialized-content/` |
| Item index | `asos-item-index.csv` — every serialized item, including hash-folder product YAML |
| Asset registry | `content-hub-asset-registry.csv` — file, asset id, public link, `dam-id`, public URL, Image XML |
| Image XML | `Asos-image-xml.json` — same DAM Image XML keyed by still filename |

Product stills and the wordmark are brand **108526**. Registry keys `asos-logo-white.png` (asset 109876, header) and `asos-logo.png` (asset 109883). Load Content Hub from a copy of `authoring/items/brother/scripts/set-ch-env.example.ps1` (never commit secrets). `public/asos/logo-white.png` is only the header fallback when the DAM entry is missing.

`211674477` and the long denim product paths are stored in hash folders (`serialized-content/asos/{HASH}/…`). `Path:` inside the YAML is still the Sitecore path. Look up the disk file in `asos-item-index.csv` or the `YamlFile` column. Refresh both maps with `node authoring/items/asos/scripts/write-asos-maps.mjs` after `validate --fix`.

Denim stills and catwalk videos are local only (`public/asos/products/live/`, `public/asos/videos/`). Those folders are gitignored. Product Image fields stay empty until the files are uploaded to brand **108526**. Do not hotlink `images.asos-media.com`.

Never hotlink asos.com.
