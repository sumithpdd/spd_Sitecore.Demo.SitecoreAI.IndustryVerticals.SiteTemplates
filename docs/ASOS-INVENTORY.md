# ASOS CMS inventory

What you open in Pages, which component paints it, and where the picture comes from. Recount with `node authoring/items/asos/scripts/inventory-asos.mjs`.

Push when you are ready: `dotnet sitecore serialization push -n sitecoreSilverProd -i asos-scs`. Push updates items that are in the module. It does not delete items that left it. `Data/Retired` children are on the Content Management server only.

## Where to edit

| You want to change | Open this item |
|--------------------|----------------|
| Offer bar | `Data/HomeComponents/GlobalBanner` |
| Women / Men tiles | `Data/HomeComponents/HomeBanner` |
| Three edit tiles | `Data/HomeComponents/Edit` |
| New-in product row | `Data/HomeComponents/NewIn` |
| Footer subscribe bar | `Data/HomeComponents/Subscribe` |
| Style Feed row | `Data/HomeComponents/StyleFeed` |
| A Style Feed article | `Data/Articles/{slug}` |
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
| 5 | StyleFeed | `Data/HomeComponents/StyleFeed` | Heading, intro, Read now, four card titles, links, and images | Content Hub `trend-5.jpg`, `trend-3.jpg`, `trend-1.jpg`, `trend-2.jpg` |

ProductIds on New In is `210425806|208718129|211556430|208718219|210943347|210659183|210030290|209095454`. Those are ProductPage items (wide-leg, £50 or under). Change the list to change the row.

GlobalBanner is one row: WOMEN on the left, the message in the centre, MEN on the right.

Subscribe sits on the Footer partial, above the link columns. Datasource `Data/HomeComponents/Subscribe`: wordmark image, heading, email placeholder, button, preference label, terms, success message.

## Style Feed articles

| URL | Page item | Datasource |
|-----|-----------|------------|
| `/style-feed` | `Home/style-feed` | `Data/HomeComponents/StyleFeed` (the same row as Home) |
| `/style-feed/how-law-roach-styled-autumn` | `Home/style-feed/how-law-roach-styled-autumn` | `Data/Articles/how-law-roach-styled-autumn` |
| `/style-feed/what-to-wear-to-uni` | `Home/style-feed/what-to-wear-to-uni` | `Data/Articles/what-to-wear-to-uni` |
| `/style-feed/wide-leg-jeans-under-50` | `Home/style-feed/wide-leg-jeans-under-50` | `Data/Articles/wide-leg-jeans-under-50` |
| `/style-feed/chocolate-denim` | `Home/style-feed/chocolate-denim` | `Data/Articles/chocolate-denim` |

Article fields: Kicker, Title, Image, Body, ShopLabel, ShopHref. The uni, wide-leg, and chocolate stories are the denim pieces. Copy is original. Images are Content Hub stills.

## Pages under Home

| Item | URL | Component |
|------|-----|-----------|
| Home | `/` | GlobalBanner, HomeBanner, Edit, NewIn, StyleFeed |
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
| style-feed | `/style-feed` | StyleFeed, datasource `Data/HomeComponents/StyleFeed` |
| style-feed/how-law-roach-styled-autumn | `/style-feed/how-law-roach-styled-autumn` | Article |
| style-feed/what-to-wear-to-uni | `/style-feed/what-to-wear-to-uni` | Article |
| style-feed/wide-leg-jeans-under-50 | `/style-feed/wide-leg-jeans-under-50` | Article |
| style-feed/chocolate-denim | `/style-feed/chocolate-denim` | Article |
| search | `/search` | SiteSearch. `q=denim` is a product grid from the catalogue, not child items |
| account, my-edit, saved-items, shared-board, bag, curation-insight | same URL as the item name | One component each |

The product grid on a listing still comes from the catalogue in `product-catalog.ts`, chosen by the CategoryId on the page. The page title and category id are what you edit. The cards are not child items of the listing.

## Products

192 ProductPage items, each a child of `Home/Products` in the Sitecore tree. URL `/products/{slug}`. On disk, 148 are serialized directly under `Home/Products/`; the other 44 sit in the hash folder `serialized-content/asos/09F655C04A8E26BC/` because their item paths are long (Sitecore CLS stores long paths this way). Both sets are the same `Home/Products` children in Sitecore.

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
| Style Feed cards | Image fields on `Data/HomeComponents/StyleFeed` |
| Style Feed articles | Image field on each `Data/Articles` item |
| Subscribe wordmark | Image field on `Data/HomeComponents/Subscribe` |
