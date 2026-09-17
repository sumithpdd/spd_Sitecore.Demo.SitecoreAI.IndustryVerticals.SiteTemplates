# Openhand Content Hub maps

Legal-style maps for components, pages, and events. Public `src` + `dam-id` only — never commit Content Hub secrets.

| File | Purpose |
|------|---------|
| `content-hub-asset-registry.csv` | Local files under `industry-verticals/nonprofit/public/openhand/` and DAM ids when uploaded |
| `nonprofit-sitecore-image-field-map.csv` | Sitecore item path + Image/Logo/PromoImageOne field → local file / DAM XML |
| `nonprofit-sitecore-data-map.csv` | Route → rendering → datasource → image fields (Home, advice, news, events, stories, appeals) |

`Upload-NonprofitContentHub.ps1` writes the asset registry after a CH run. It must not overwrite the field map. DamId is filled only when CH is available; until then YAML uses `/openhand/*.jpg`.

Logo DAM already live: `dam-id="1yr7T6coQJe8aBsKfRo5jw"`.
