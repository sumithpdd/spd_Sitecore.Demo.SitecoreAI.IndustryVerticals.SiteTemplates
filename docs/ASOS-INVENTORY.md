# ASOS CMS inventory

What you open in Pages, which component paints it, and where the picture comes from. Recount with `node authoring/items/asos/scripts/inventory-asos.mjs`.

Serialization is valid (`dotnet sitecore serialization validate --fix -i asos-scs` reported no errors). Push when you are ready: `dotnet sitecore serialization push -n sitecoreSilverProd -i asos-scs`. Push moves items. It does not delete anything that is no longer in the module. The old folders are still in the module, under `Data/Retired`.

## Where to edit

| You want to change | Open this item |
|--------------------|----------------|
| Offer bar | `Data/HomeComponents/GlobalBanner` |
| Women / Men tiles | `Data/HomeComponents/HomeBanner` |
| Three edit tiles | `Data/HomeComponents/Edit` |
| New-in product row | `Data/HomeComponents/NewIn` |
| Footer subscribe bar | `Data/HomeComponents/Subscribe` |
| A product | `Home/Products/{product-slug}` |
| A category | The page itself, for example `Home/women/new-season-edit` |
| A campaign | `Home/edits/the-denim-drop` (and the other edit names) |

The curve jean is `Home/Products/asos-design-curve-comfort-stretch-straight-leg-jean-in-authentic-mid-blue`. That item is the page. The brand folder, the long name folder, and `prd` are not in the product tree anymore.

`curated-category-13/cat` is now `Home/women/new-season-edit` (CategoryId `52558`).

## Home `/`

Each rendering on Home has a datasource. Header and Footer still come from the partial designs.

| Order | Component | Datasource | What you edit | Picture |
|------:|-----------|------------|---------------|---------|
| 1 | GlobalBanner | `Data/HomeComponents/GlobalBanner` | Message, Women label and link, Men label and link | No image. Message is the Berlin line. Clear Message and the visit variant (new here, sale, welcome back) supplies the line again |
| 2 | HomeBanner | `Data/HomeComponents/HomeBanner` | Title, labels, links, Women image, Men image | Content Hub `hero-women.jpg` and `hero-men.jpg` on the image fields |
| 3 | Edit | `Data/HomeComponents/Edit` | Heading plus three tiles (kicker, title, body, link, image) | Content Hub `trend-3.jpg`, `trend-1.jpg`, `trend-2.jpg` |
| 4 | NewIn | `Data/HomeComponents/NewIn` | Heading, shop label, shop link, ProductIds | Product cards for those ids. Images are the product Image fields |

ProductIds on New In is `210425806|208718129|211556430|208718219|210943347|210659183|210030290|209095454`. Those are ProductPage items (wide-leg, £50 or under). Change the list to change the row.

## Pages under Home

| Item | URL | Component |
|------|-----|-----------|
| Home | `/` | GlobalBanner, HomeBanner, Edit, NewIn |
| women | `/women` | GenderLanding |
| women/new-in | `/women/new-in` | CategoryListing, CategoryId 27108 |
| women/denim | `/women/denim` | CategoryListing, CategoryId 17014 |
| women/new-season-edit | `/women/new-season-edit` | CategoryListing, CategoryId 52558 |
| women/selling-fast | `/women/selling-fast` | CategoryListing, CategoryId 51126 |
| women/new-season-colours | `/women/new-season-colours` | CategoryListing, CategoryId 52649 |
| women/september-shift | `/women/september-shift` | CategoryListing, CategoryId 52393 |
| women/sale-under-10 | `/women/sale-under-10` | CategoryListing, CategoryId 51237 |
| women/topshop | `/women/topshop` | CategoryListing, CategoryId 29299 |
| men | `/men` | GenderLanding |
| Products | `/products` | CategoryListing. Children are the products |
| petite-denim | `/petite-denim` | CategoryListing, CategoryId 88016 |
| edits/the-denim-drop | `/edits/the-denim-drop` | CategoryListing, CategoryId 88011 |
| edits/festival-2-0 | `/edits/festival-2-0` | CategoryListing, CategoryId 88012 |
| edits/your-new-uniform | `/edits/your-new-uniform` | CategoryListing, CategoryId 88013 |
| edits/chocolate | `/edits/chocolate` | CategoryListing, CategoryId 91001 |
| edits/polka-dot | `/edits/polka-dot` | CategoryListing, CategoryId 91002 |
| edits/rugby-tops | `/edits/rugby-tops` | CategoryListing, CategoryId 91003 |
| edits/topshop-catwalk | `/edits/topshop-catwalk` | CategoryListing, CategoryId 88014 |
| account, my-edit, saved-items, shared-board, search, style-feed, bag, curation-insight | same URL as the item name | One component each, same as before |

The product grid on a listing still comes from the catalogue in `product-catalog.ts`, chosen by the CategoryId on the page. The page title and category id are what you edit. The cards are not child items of the listing.

## Products

192 ProductPage items, each a direct child of `Home/Products`. URL `/products/{slug}`.

On the item: Title, Brand, Price, Colour, Image, Video, ProductId, Categories. Image is Content Hub (`src` + `dam-id`) on 190 of them. Rails on the PDP (you might also like, buy the look, people also bought, recently viewed, your style) are still ranked in code.

A few slugs were already used, so those item names end with the product id (for example `…-211792860`). The URL uses that full name.

## Retired

The old brand, slug, `prd`, and `/cat` folders are on the Content Management server under `Data/Retired`. They are folders, not pages. Serialization no longer includes those items. Delete the Retired children in Content Editor when the new pages look right. Push does not delete them.

## Media

| On screen | Where it is stored |
|-----------|--------------------|
| Home women / men tiles | Image fields on `Data/HomeComponents/HomeBanner` |
| Home edit tiles | Image fields on `Data/HomeComponents/Edit` |
| Home new-in cards | Image field on each ProductPage listed in NewIn ProductIds |
| PDP gallery | Image field on that ProductPage |
| PDP video | Video field, or `public/asos/videos/{id}.mp4` when the field is empty (gitignored) |
| Listing tiles | Same product images as the catalogue for that CategoryId |
