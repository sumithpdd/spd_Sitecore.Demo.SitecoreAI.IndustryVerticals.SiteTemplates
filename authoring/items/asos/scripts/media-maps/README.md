# ASOS media maps

Content Hub brand **95911** (ASOS DESIGN) on [spd-asos](https://spd-asos.sitecoresandbox.cloud/en-us/brands/branddetail/95911).

| Map | File |
|-----|------|
| Page map | `asos-page-map.csv` — public route, Sitecore path, title, YAML file under `serialized-content/` |
| Item index | `asos-item-index.csv` — every serialized item, including hash-folder product YAML |
| Asset registry | `content-hub-asset-registry.csv` — file, asset id, public link, `dam-id`, public URL, Image XML |
| Migration track | `asos-media-migration.csv` — previous starter-verticals-2 public link for each file |
| Image XML | `Asos-image-xml.json` — same DAM Image XML keyed by still filename |

Product stills, promos, banners, and the wordmark are brand **95911**. Registry keys `asos-logo-white.png` (header) and `asos-logo.png`. Load Content Hub from a copy of `authoring/items/brother/scripts/set-ch-env.example.ps1` and point `CONTENTHUB_URI` at `https://spd-asos.sitecoresandbox.cloud` (never commit secrets). `public/asos/logo-white.png` is only the header fallback when the DAM entry is missing.

`211674477` and the long denim product paths are stored in hash folders (`serialized-content/asos/{HASH}/…`). `Path:` inside the YAML is still the Sitecore path. Look up the disk file in `asos-item-index.csv` or the `YamlFile` column. Refresh both maps with `node authoring/items/asos/scripts/write-asos-maps.mjs` after `validate --fix`.

Denim stills and catwalk videos downloaded for upload live in `public/asos/products/live/` and `public/asos/videos/`. Those folders are gitignored. Do not hotlink `images.asos-media.com`.

Never hotlink asos.com.
