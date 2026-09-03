# Media from captured pages (mandatory)

When the user asks to **mimic a page or site**, do **not** hotlink the reference CDN in datasource Image fields. Download every component image and serialize it into the module media library, then **push** so items exist in Sitecore CM.

## Harvest

From `design-screenshots/{project}/**/section.html` and `page.html`:

- `<img src>` / `srcset`
- `<picture>` sources
- CSS `background-image: url(...)`
- SVG `<image href>`

Resolve relative / root-relative / protocol-relative URLs with capture `source-url.txt` (or the mimic URL) as `-BaseUrl`. Deduplicate by canonical URL.

## Create YAML

Use [`sitecore-media-from-url-yaml`](../../sitecore-serialization-skills/sitecore-media-from-url-yaml/SKILL.md) (`create-media-from-urls.ps1`). Preferred script path:

```txt
.cursor/skills/sitecore-serialization-skills/sitecore-media-from-url-yaml/scripts/create-media-from-urls.ps1
```

(The copy under `sitecore-yaml/generators/sitecore-media-from-url-yaml/` is the same generator.)

Wire each Image field as `<image mediaid="{MediaId}" />`. Never leave `{MEDIA:…}` placeholders or external `src` URLs in serialized YAML.

## Upload to Sitecore

```bash
dotnet sitecore serialization validate --fix -i {namespace}
dotnet sitecore serialization push -n {environment} -i {namespace}
```

Do **not** mark mimic complete if:

- images still point at the reference website;
- media YAML is missing;
- push of `media-library` was skipped.

Content Hub DAM is optional **after** CM has media items, not a substitute for this download.
