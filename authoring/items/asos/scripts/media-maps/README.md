# ASOS media maps

Content Hub brand **108526** (Asos) on [starter-verticals-2](https://starter-verticals-2.sitecoresandbox.cloud/en-us/brands/branddetail/108526).

| Map | File |
|-----|------|
| Page map | `asos-page-map.csv` — route, Sitecore path, title |
| Asset registry | `content-hub-asset-registry.csv` — file, asset id, public link, `dam-id`, public URL, Image XML |
| Image XML | `Asos-image-xml.json` — same DAM Image XML keyed by still filename |

Product stills and the wordmark are brand **108526**. Registry keys `asos-logo-white.png` (asset 109876, header) and `asos-logo.png` (asset 109883). Load Content Hub from a copy of `authoring/items/brother/scripts/set-ch-env.example.ps1` (never commit secrets). `public/asos/logo-white.png` is only the header fallback when the DAM entry is missing.

`211674477` is serialized at `serialized-content/asos/8F63B6D47EFD2BB1/211674477.yml` (path length). The Sitecore path in the page map is unchanged.

Never hotlink asos.com.
