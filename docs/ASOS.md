# ASOS

SitecoreAI demo host mimicking [asos.com](https://www.asos.com/). Emma (story-only) asks for wide-leg jeans under £50, filters the denim edit by body fit, and hearts three pieces into My Edit “Berlin, October”.

> **Continuing the build?** See [`ASOS-CONTINUATION.md`](ASOS-CONTINUATION.md) for current status, the demo control parameters (`?audience`, `?broken`, `?market`, `?fit`, `?known`, `?variant`, `?pdp=thin`), and the remaining work with file paths.

| | Value |
|--|--|
| **Reference design** | [asos.com](https://www.asos.com/) |
| **Rendering host** | `asos` → `industry-verticals/asos` |
| **Editing host** | `asos` on **SitecoreSilver** / **SitecoreSilverProd** (must match Site Grouping **RenderingHost**) |
| **Build key** | `asos` in `xmcloud.build.json` (`enabled: true`) |
| **Site name** | `asos` |
| **Collection path** | `/sitecore/content/asos` |
| **Site content path** | `/sitecore/content/asos/asos` |
| **Module** | `authoring/items/asos/asos.module.json` (`asos-scs`) |
| **GUID prefix** | Journey pages `a50c` — never reuse `a1e9` / `b40e` / `b803` / `0e0a` / `c4c0` |
| **Push env** | `sitecoreSilverProd` |
| **Content Hub brand** | entity **95911** ASOS DESIGN on [spd-asos](https://spd-asos.sitecoresandbox.cloud/en-us/brands/branddetail/95911) |

Never hotlink `asos.com` or `images.asos-media.com` in Image fields. DAM `src` + `dam-id` only after upload.

Page, component, and media inventory (what is editable in Pages, and what still comes from code): [`ASOS-INVENTORY.md`](ASOS-INVENTORY.md).

## Live URLs

Production host: [https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/](https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/). The same paths work on local `http://localhost:3010`. Market prefixes `/us`, `/au`, and `/de` sit in front of any path (`/us/women`). `?cdp=1` on any page opens the customer profile drawer.

### Home and markets

| Page | URL |
|------|-----|
| Home | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/ |
| United States | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/us |
| Australia | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/au |
| Germany | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/de |
| Women | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/women |
| Men | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/men |

### Personalization

| What it does | URL |
|--------------|-----|
| Shop layout on Women | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/women?audience=shop |
| Inspire layout on Women | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/women?audience=inspire |
| Broken-state audit | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/women?broken=1 |
| Customer profile drawer | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/?cdp=1 |

### Search

| What it does | URL |
|--------------|-----|
| Wide-leg jeans under £50 | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/search?q=wide+leg+jeans+under+50 |
| Denim | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/search?q=denim |
| Petite fit | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/search?q=denim&fit=petite |
| Price high to low | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/search?q=denim&sort=price-desc |
| £45–£95 | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/search?q=denim&pricerange=45-95 |
| Curated only | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/search?q=denim&iscurated=true |

### Categories and edits

| Page | URL |
|------|-----|
| New in | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/women/new-in |
| Denim | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/women/denim |
| New season edit | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/women/new-season-edit |
| Selling fast | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/women/selling-fast |
| New season colours | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/women/new-season-colours |
| September shift | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/women/september-shift |
| Sale under £10 | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/women/sale-under-10 |
| Topshop | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/women/topshop |
| Petite denim | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/petite-denim |
| The denim drop | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/edits/the-denim-drop |
| Festival 2.0 | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/edits/festival-2-0 |
| Your new uniform | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/edits/your-new-uniform |
| Chocolate | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/edits/chocolate |
| Polka dot | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/edits/polka-dot |
| Rugby tops | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/edits/rugby-tops |
| Topshop catwalk | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/edits/topshop-catwalk |
| All products | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/products |

### Articles

| Page | URL |
|------|-----|
| Style Feed | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/style-feed |
| How Law Roach styled autumn | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/style-feed/how-law-roach-styled-autumn |
| What to wear to uni | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/style-feed/what-to-wear-to-uni |
| Wide-leg jeans under £50 | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/style-feed/wide-leg-jeans-under-50 |
| Chocolate denim | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/style-feed/chocolate-denim |

### Products

| Page | URL |
|------|-----|
| Wide leg jeans in mid wash | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/products/wide-leg-jeans-in-mid-wash |
| First visit (size not known) | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/products/wide-leg-jeans-in-mid-wash?known=0 |
| Returning shopper | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/products/wide-leg-jeans-in-mid-wash?known=1 |
| Thin product page | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/products/wide-leg-jeans-in-mid-wash?pdp=thin |
| Oversized knit in chocolate | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/products/oversized-knit-in-chocolate |
| Chelsea boot in black | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/products/chelsea-boot-in-black |
| Topshop Belle Paris camisole | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/products/topshop-belle-paris-camisole-in-blue |
| Weekday flannel pyjama bottoms | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/products/weekday-flannel-pyjama-bottoms-in-black-check |

### Bag, saved, account

| Page | URL |
|------|-----|
| Saved items | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/saved-items |
| My Edit | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/my-edit |
| Shared board | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/shared-board/e5ebfcdb-7e61-473f-afc8-b0c973561d04 |
| Bag | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/bag |
| Account | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/account |
| Curation insight | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/curation-insight |
| Accessibility | https://spd-sitecore-demo-sitecore-ai-indus.vercel.app/accessibility |

## Story

Arrive `/` → `/women` → the denim edit (`/edits/the-denim-drop`, wide-leg jeans under £50, body-fit facets) → PDP `/products/wide-leg-jeans-in-mid-wash` (model height, size worn, fabric) → Style Feed → heart the jean, chocolate knit, and Chelsea boot into **Berlin, October** → Curation insight. Belle Paris (`200415553`) and the Weekday pyjama PDP (`211674477`) stay in the catalogue.

A complete PDP adds **Buy the look** (“Shop the model's full 'fit”) and **People also bought**. `?pdp=thin` keeps size and price only.

## Story map

Use this when checking whether the pages and CMS items still tell Emma’s story. Paths are under `/sitecore/content/asos/asos`. “CMS page” means a Sitecore item with a layout. “Code” means `industry-verticals/asos/src/lib/product-catalog.ts` or `asos-journey.ts`.

| Beat | URL | CMS item | What is in the CMS | What is still code |
|------|-----|----------|--------------------|--------------------|
| Arrive | `/` | `Home` | Five datasources under `Data/HomeComponents`: offer, women/men tiles, three edit tiles, new-in product ids, Style Feed cards | Variant offer copy if Message is cleared. New-in cards resolve those ids in the catalogue |
| Women | `/women` | `Home/women` | Page and GenderLanding | Trending chips and editorial from `asos-journey.ts` |
| Denim edit, wide-leg under £50 | `/edits/the-denim-drop` | `Home/edits/the-denim-drop` | Title, CategoryId `88011`, CategoryListing layout | The product grid for `88011` |
| Body-fit filter | same page | same item | Category id only | Facets petite, tall, plus, maternity, standard, and the signed-in fit from `/account` |
| Hero jean | `/products/wide-leg-jeans-in-mid-wash` | `Home/Products/wide-leg-jeans-in-mid-wash` | ProductPage fields, one Content Hub photo | Product `8805001`: ASOS DESIGN wide leg jeans in mid wash, £38, UK 8 |
| Style feed | `/style-feed` | `Home/style-feed` | Same datasource as the homepage row: `Data/HomeComponents/StyleFeed` | Card images fall back to Content Hub stills if an image field is empty |
| Heart three pieces | `/my-edit` | `Home/my-edit` | Page layout only | The board “Berlin, October” and the three ids `8805001` (jean), `8805013` (oversized knit in chocolate), `8805014` (Chelsea boot in black). Saved in the browser |
| Curation insight | `/curation-insight` | `Home/curation-insight` | Page layout | Insight copy |
| Search the ask | `/search?q=denim` | `Home/search` | SiteSearch layout. No product items on the page | The grid is the denim catalogue: brand, title, price. Sort, body fit, price, colour, and brand are query filters |
| Women’s denim catalogue | `/women/denim` | `Home/women/denim` | Title Denim, CategoryId `17014` | Grid is the downloaded denim products |
| New in | `/women/new-in` | `Home/women/new-in` | Title, CategoryId `27108` | Grid for `27108` |
| Petite | `/petite-denim` | `Home/petite-denim` | Title, CategoryId `88016` | Grid and fit facets |
| Topshop / Belle Paris | `/women/topshop` and `/products/topshop-belle-paris-camisole-in-blue` | Listing page only | CategoryId `29299` | Belle Paris `200415553` is a code product, not a ProductPage item |
| Weekday pyjama | `/products/weekday-flannel-pyjama-bottoms-in-black-check` | `Home/Products/weekday-flannel-pyjama-bottoms-in-black-check` | ProductPage fields, one Content Hub photo | Product `211674477` |
| Sale under £10 | `/women/sale-under-10` | `Home/women/sale-under-10` | CategoryId `51237` | Grid for that id |
| Men | `/men` | `Home/men` | GenderLanding | Same component as Women. No men’s catalogue |
| Bag / account | `/bag`, `/account` | those pages | Layout | Bag and fit profile are the browser session |

The three hearts are ProductPage items, each with one Content Hub photo:

| Piece | Id | Slug | CMS |
|-------|----|------|-----|
| Wide leg jeans in mid wash | `8805001` | `wide-leg-jeans-in-mid-wash` | `Home/Products/wide-leg-jeans-in-mid-wash` |
| Oversized knit in chocolate | `8805013` | `oversized-knit-in-chocolate` | `Home/Products/oversized-knit-in-chocolate` |
| Chelsea boot in black | `8805014` | `chelsea-boot-in-black` | `Home/Products/chelsea-boot-in-black` |

Homepage New In is a different set: `210425806`, `208718129`, `211556430`, `208718219`, `210943347`, `210659183`, `210030290`, `209095454`. Those are downloaded denim ProductPage items (wide-leg, £50 or under). `210425806` and `208718129` are stocked in UK 10–16, so a UK 8 shopper sees **Not in your size**. `211556430` and `208718219` still list UK 8, but that size is sold out. The story jean `8805001` is not in that row.

**As seen on you** sits on the homepage after New In. Datasource `Data/HomeComponents/AsSeenOnYou`. It is denim chosen for the shopper's fit and size. Sign in, or open `?known=1`, and the kept size is UK 8. Product pages pre-select UK 8 when it is in stock. `210645207` and `210943513` show **Not available in your size**, and that size button is struck through. Guests stay on UK 8 for the range badge and do not get a size pre-selected.

The downloaded denim catalogue is ProductPage items under `Home/Products`, plus the story jean, knit, and boot. Also in that folder: mandarin collar denim top `210949631`, Desigual jeans `211297163`, slash-neck denim midi `209875278`, tall straight wide-leg `210974638`, dark mid-wash straight wide-leg `210974160`, and Omnes Zola barrel jean `210558516`. The last four use existing Content Hub stills because the live ASOS photos could not be fetched. Title, brand, price, colour, image, video, product id, categories, pay copy, size and fit, details, composition, brand story, and delivery are editable. Each item has one photo. Listing pages do not contain those products as children. The category id selects them in code. (148 are serialized directly under `Home/Products/`; the other 44 live in the hash folder `serialized-content/asos/09F655C04A8E26BC/` because their paths are long — see the Media section.)

## Sitecore CMS pages

This is the page list to review. Item paths are under `/sitecore/content/asos/asos`. A page is an item with a layout. A datasource is the item Pages edits for that component. Chrome (header, subscribe, footer) comes from the partial designs, not from the page item.

### Every page that has a layout

| URL | Item | Component on `headless-main` | Datasource | Editable in Pages | Still from code |
|-----|------|------------------------------|------------|-------------------|-----------------|
| `/` | `Home` | GlobalBanner, HomeBanner, Edit, NewIn, StyleFeed, SeoLinkGrid, SeoCopy | `Data/HomeComponents/` of the same name | See homepage table below | New-in cards look up ProductIds in the catalogue. Offer variants if Message is empty |
| `/women` | `Home/women` | GenderLanding, SeoLinkGrid, SeoCopy | The page, plus the shared SEO datasources | Page title, SEO heading and copy | Trending chips and editorial |
| `/men` | `Home/men` | GenderLanding | The page | Page title | Same component. No men’s catalogue |
| `/women/new-in` | `Home/women/new-in` | CategoryListing | The page | Title, CategoryId `27108` | Product grid |
| `/women/denim` | `Home/women/denim` | CategoryListing | The page | Title, CategoryId `17014` | Downloaded denim grid |
| `/women/new-season-edit` | `Home/women/new-season-edit` | CategoryListing | The page | Title, CategoryId `52558` | Grid. Was `curated-category-13/cat` |
| `/women/selling-fast` | `Home/women/selling-fast` | CategoryListing | The page | Title, CategoryId `51126` | Grid |
| `/women/new-season-colours` | `Home/women/new-season-colours` | CategoryListing | The page | Title, CategoryId `52649` | Grid |
| `/women/september-shift` | `Home/women/september-shift` | CategoryListing | The page | Title, CategoryId `52393` | Grid |
| `/women/sale-under-10` | `Home/women/sale-under-10` | CategoryListing | The page | Title, CategoryId `51237` | Grid |
| `/women/topshop` | `Home/women/topshop` | CategoryListing | The page | Title, CategoryId `29299` | Grid. Belle Paris is not a ProductPage |
| `/petite-denim` | `Home/petite-denim` | CategoryListing | The page | Title, CategoryId `88016` | Grid and fit facets |
| `/edits/the-denim-drop` | `Home/edits/the-denim-drop` | CategoryListing | The page | Title, CategoryId `88011` | Wide-leg under £50 grid |
| `/edits/festival-2-0` | `Home/edits/festival-2-0` | CategoryListing | The page | Title, CategoryId `88012` | Grid |
| `/edits/your-new-uniform` | `Home/edits/your-new-uniform` | CategoryListing | The page | Title, CategoryId `88013` | Grid |
| `/edits/chocolate` | `Home/edits/chocolate` | CategoryListing | The page | Title, CategoryId `91001` | Grid |
| `/edits/polka-dot` | `Home/edits/polka-dot` | CategoryListing | The page | Title, CategoryId `91002` | Grid |
| `/edits/rugby-tops` | `Home/edits/rugby-tops` | CategoryListing | The page | Title, CategoryId `91003` | Grid |
| `/edits/topshop-catwalk` | `Home/edits/topshop-catwalk` | CategoryListing | The page | Title, CategoryId `88014` | Grid |
| `/products` | `Home/Products` | CategoryListing | The page | Title | Children are the 192 ProductPage items |
| `/products/{slug}` | `Home/Products/{slug}` | ProductPage | The product item | Title, Brand, Price, Colour, Size, Image, Video, ProductId, Categories, Affinities, PayCopy, SizeFit, Details, Composition, BrandStory, DeliveryCopy | ProductPage rendering on the item, datasource is the product. Size is UK 4–16, one per line. `210425806` and `208718129` omit UK 8. `?fields=1` opens the affinity, size, and colour editor. Story ids 8805001, 8805013, 8805014, 200415553, and 211674477 are ProductPage items. One photo each |
| `/search` | `Home/search` | SiteSearch | The page | Page title | `q=denim` lists denim product cards. Sort, fit, price, colour, brand |
| `/style-feed` | `Home/style-feed` | StyleFeed | `Data/HomeComponents/StyleFeed` | Heading, intro, read label, four cards | Same row as the homepage |
| `/style-feed/how-law-roach-styled-autumn` | `Home/style-feed/how-law-roach-styled-autumn` | Article, Buy the look, You might also like, People also bought, Recently viewed, Your style, Style Feed, SEO link grid, SEO copy | `Data/Articles/how-law-roach-styled-autumn` | Kicker, title, image, body, shop label, shop link. Look shops `8805001`, `8805013`, `8805014` | Original copy. Content Hub `trend-5.jpg` |
| `/style-feed/what-to-wear-to-uni` | `Home/style-feed/what-to-wear-to-uni` | Same styling stack as the Law Roach article | `Data/Articles/what-to-wear-to-uni` | Same fields. Look shops `8805001` and `8805002` | Denim uni piece. `trend-3.jpg`. Shop link `/edits/the-denim-drop` |
| `/style-feed/wide-leg-jeans-under-50` | `Home/style-feed/wide-leg-jeans-under-50` | Same styling stack | `Data/Articles/wide-leg-jeans-under-50` | Same fields. Look shops `8805001`, `8805013`, `8805014` | Berlin October jean. `trend-1.jpg` |
| `/style-feed/chocolate-denim` | `Home/style-feed/chocolate-denim` | Same styling stack | `Data/Articles/chocolate-denim` | Same fields. Look shops `8805013` | Chocolate wash. `trend-2.jpg`. Shop link `/edits/chocolate` |
| `/my-edit` | `Home/my-edit` | MyEdit | The page | Page title | Board “Berlin, October” is the browser |
| `/saved-items` | `Home/saved-items` | SavedItems | The page | Page title, Affinities | Saved products are the browser. Move to bag writes a `SAVE` affinity |
| `/shared-board/{uuid}` | `Home/shared-board` | SharedBoard is in the component map, rendered by the catch-all | The page | Page title | The board id is the URL |
| `/account` | `Home/account` | AccountSignIn | The page | Page title | Fit profile is the browser session |
| `/bag` | `Home/bag` | BagCheckout | The page | Page title, Affinities | Header My Bag reads the same bag. Add to bag writes an `ADD_TO_BAG` affinity |
| `/curation-insight` | `Home/curation-insight` | CurationInsight | The page | Page title | Insight copy |

### Chrome on every page

| Piece | Partial | Component | Datasource | Fields |
|-------|---------|-----------|------------|--------|
| Header | `Presentation/Partial Designs/Header` | Header | — | Promo, wordmark, search, market, saved, bag |
| Offer is not the header | Home `headless-main` | GlobalBanner | `Data/HomeComponents/GlobalBanner` | Message, terms, WOMEN and MEN labels and links. WOMEN sits left, the message is centred, MEN sits right |
| Subscribe | `Presentation/Partial Designs/Footer`, above the links | Subscribe | `Data/HomeComponents/Subscribe` | Image (wordmark), heading, placeholder, button, preference label, terms, success message |
| Footer links | same partial | Footer | — | Help, about, more from ASOS, market legal |

### Homepage, top to bottom

| Order | Component | Datasource | Fields |
|------:|-----------|------------|--------|
| 1 | GlobalBanner | `Data/HomeComponents/GlobalBanner` | Message is “Wide-leg jeans under £50 / Shop the Berlin, October edit”. Clear Message to restore visit variants |
| 2 | HomeBanner | `Data/HomeComponents/HomeBanner` | Title, labels, links, Women image, Men image (`hero-women.jpg`, `hero-men.jpg`) |
| 3 | EditHero | `Data/HomeComponents/EditHero` | Background promo. Kicker, title, body, button, link, image. Same datasource on `/women` |
| 4 | Edit | `Data/HomeComponents/Edit` | Heading and three tiles (`trend-3.jpg`, `trend-1.jpg`, `trend-2.jpg`) |
| 5 | NewIn | `Data/HomeComponents/NewIn` | Heading, shop label, shop link, ProductIds `210425806\|208718129\|211556430\|208718219\|210943347\|210659183\|210030290\|209095454` |
| 6 | StyleFeed | `Data/HomeComponents/StyleFeed` | Heading “The Style Feed”, intro, Read now, four cards linking to the articles above |

Push does not delete items that left the module. `Data/Retired` children are still on sitecoreSilverProd until deleted in Content Editor. The Subscribe, Style Feed, and Article items are in serialization; Pages shows them after `dotnet sitecore serialization push -n sitecoreSilverProd -i asos-scs`.

## Mismatches to review

These are the places the story and the CMS do not yet match. They are the decisions, not a build list.

1. The hero jean, the chocolate knit, the Chelsea boot, Belle Paris, and the Weekday pyjamas are ProductPage items. Each has one Content Hub photo.
2. Belle Paris and the Weekday pyjama are the same: URLs and code, no product item.
3. The homepage new-in row shows eight catalogue jeans, not the £38 mid-wash jean Emma keeps.
4. A listing page can be edited for title and category id. The cards on it still come from code.
5. PDP rails (you might also like, buy the look, people also bought, recently viewed, your style) are ranked in code.
6. My Edit, saved items, and the bag are the browser, not content items.
7. Emma is not a person item. That is intentional.
8. `Data/Retired` on the Content Management server still holds the old brand, slug, `prd`, and `/cat` folders. They are not pages. Delete them in Content Editor when the new tree looks right. The serialization no longer includes those folder items.
9. GlobalBanner Message is filled with the Berlin line, so the visit variants (new here, sale, welcome back) stay hidden until Message is cleared.

## Pages (live URL shapes)

| Route | Beat |
|-------|------|
| `/` | ASOS homepage (Women / Men tiles) |
| `/women` | Women department |
| `/women/new-in` | Women's New In. ProductListing, CategoryId 27108 |
| `/edits/the-denim-drop` | Campaign / edit. ProductListing, CategoryId 88011 |
| `/women/denim` | Women's denim. ProductListing, CategoryId 17014, plus the downloaded ProductPage items |
| `/search?q=denim` | Denim product grid: brand, title, price. Sort, body fit, price, colour, brand |
| `/search?q=wide-leg%20jeans` | Header and full-page search both autocomplete “wide-leg jeans” |
| `/women/selling-fast` | New In: Selling Fast (51126) |
| `/women/new-season-colours` | New season colours (52649) |
| `/women/new-season-edit` | New-season edit (52558) |
| `/women/september-shift` | September Shift (52393) |
| `/women/sale-under-10` | Sale under £10 (51237) |
| `/shared-board/{uuid}` | Shared board (`acquisitionsource=pasteboard` is ignored) |
| `/petite-denim` | Category + body-fit facets (88016) |
| `/products/topshop-belle-paris-camisole-in-blue` | Story PDP — Buy the look + People also bought |
| `/products/weekday-flannel-pyjama-bottoms-in-black-check` | Weekday PDP — same complete layout |
| `/women/topshop` | Brand listing (29299) |
| `/style-feed` | Style Feed row. Same datasource as the homepage |
| `/style-feed/how-law-roach-styled-autumn` | Article. Datasource `Data/Articles/how-law-roach-styled-autumn` |
| `/style-feed/what-to-wear-to-uni` | Article. Denim uni piece |
| `/style-feed/wide-leg-jeans-under-50` | Article. Berlin October jean |
| `/style-feed/chocolate-denim` | Article. Chocolate wash |
| `/saved-items` · `/my-edit` | Save / return |
| `/curation-insight` | Editor feedback |
| `/bag` · `/account` | P1 light checkout / known customer |
| `/search` | Catalogue search (`SiteSearch`) |
| `/men` | Men department |
| `/products` | Product catalogue. Each child is a ProductPage. |

## Components

Registered in `industry-verticals/asos/.sitecore/component-map.ts` (`npm run sitecore-tools:generate-map`). Journey renderings use GUID prefix `a50c0001`.

| Component | Rendering | Where it sits |
|-----------|-----------|----------------|
| `GlobalBanner` | `a50c0001-1111-4000-8000-000000000009` | Home `headless-main`, first. Datasource `Data/HomeComponents/GlobalBanner` |
| `Header` | `a50c0001-1111-4000-8000-000000000001` | Partial Design **Header** → `headless-header` |
| `Subscribe` | `a50c0001-1111-4000-8000-000000000024` | Partial Design **Footer**, above the link columns. Datasource `Data/HomeComponents/Subscribe` |
| `Footer` | `a50c0001-1111-4000-8000-000000000002` | Partial Design **Footer** → `headless-footer` |
| `HomeBanner` | `a50c0001-1111-4000-8000-000000000015` | Home `headless-main`. Datasource `Data/HomeComponents/HomeBanner` |
| `Edit` | `a50c0001-1111-4000-8000-000000000016` | Home `headless-main`. Datasource `Data/HomeComponents/Edit` |
| `NewIn` | `a50c0001-1111-4000-8000-000000000017` | Home `headless-main`. Datasource `Data/HomeComponents/NewIn` (ProductIds) |
| `StyleFeed` | `a50c0001-1111-4000-8000-000000000008` | Home and `/style-feed`. Datasource `Data/HomeComponents/StyleFeed` |
| `Article` | `a50c0001-1111-4000-8000-000000000025` | `/style-feed/{slug}`. Datasource under `Data/Articles` |
| `GenderLanding` | `a50c0001-1111-4000-8000-000000000004` | `/women` `headless-main` |
| `CategoryListing` | `a50c0001-1111-4000-8000-000000000005` | The listing item itself (`/women/denim`, `/edits/the-denim-drop`). Fields Title, Intro, CategoryId, Products. Empty Products keeps the category grid |
| `ProductPage` | `a50c0001-1111-4000-8000-000000000006` | `/products/{slug}` |
| `YouMightAlsoLike` | `a50c0001-1111-4000-8000-000000000010` | Composed on the PDP. Intent `similar`, ranked by CDP affinity |
| `BuyTheLook` | `a50c0001-1111-4000-8000-000000000011` | Composed on the PDP. Intent `outfit` |
| `PeopleAlsoBought` | `a50c0001-1111-4000-8000-000000000012` | Composed on the PDP. Intent `cobought` |
| `RecentlyViewed` | `a50c0001-1111-4000-8000-000000000013` | Composed on the PDP. Products this browser has opened |
| `YourStyle` | `a50c0001-1111-4000-8000-000000000014` | Composed on the PDP. CDP fit, brand, and category affinity |
| `SiteSearch` | `a50c0001-1111-4000-8000-000000000007` | `/search` `headless-main` |
| `SharedBoard` | component map only | `/shared-board/{uuid}` via the catch-all. Not a Pages rendering yet. |

**Default** page design `a50c0001-5555-4000-8000-000000000001` chains Header + Footer partials. The same chrome is on **Product** (`…000002`), **ProductPage** (`…000003`) and **ProductListing** (`…000004`). `TemplatesMapping` on `Presentation/Page Designs` binds Page, Product, ProductPage and ProductListing. Layout falls back to Header and Footer when those placeholders are empty. Palette: `Presentation/Available Renderings/ASOS`.

`AiChatbot` (bottom-left) and `CdpProfileShell` (bottom-right) mount from `_app.tsx` on every page. Header typeahead is `HeaderSearch` in `src/lib`.

Also on the host (not all wired as page renderings yet): product card + merch states, edit hero, edit carousel, trending chips, personalised rail, market switcher, heart/save. My Edit, curation insight, bag, and account are page renderings. Standalone Next routes use `JourneyLayout` until Edge layout is published.

## Media

```powershell
# Copy authoring/items/brother/scripts/set-ch-env.example.ps1 to OneDrive and fill secrets. Never commit it.
. '{OneDrive}/Work/Brother/_content-ready/set-ch-env.ps1'
cd authoring/items/asos/scripts
node download-asos-images.mjs
.\Upload-AsosContentHub.ps1
.\Set-AsosContentHubMetadata.ps1
node write-dam-registry.mjs
```

Maps: `authoring/items/asos/scripts/media-maps/` (`asos-page-map.csv` with `YamlFile`, `asos-item-index.csv`, `content-hub-asset-registry.csv`, `Asos-image-xml.json`). Refresh the two CSV indexes with `node authoring/items/asos/scripts/write-asos-maps.mjs`.

Wordmark assets on brand **95911**: `asos-logo-white.png` (header) and `asos-logo.png`. The header uses the DAM public URL from `dam-registry.ts`, with `public/asos/logo-white.png` only if that entry is missing. Story stills in the registry use `src` + `dam-id` on `spd-asos.sitecoresandbox.cloud`.

Long product paths are stored in hash folders under `authoring/items/asos/serialized-content/asos/{HASH}/`. The `Path:` field is still the Sitecore path. `asos-item-index.csv` is the lookup. After moving items, run `dotnet sitecore serialization validate --fix -i asos-scs` before push. Do not invent hash names. The one-shot page writers have been removed. Serialized YAML is the source of truth.

Denim and homepage stills are Content Hub assets (brand **95911**). Product Image fields store `src` + `dam-id`. The download folders `public/asos/products/live/` and `public/asos/editorial/` are only the upload source and stay gitignored. The old-to-new public link list is `authoring/items/asos/scripts/media-maps/asos-media-migration.csv`.

## Content tree

Same split as FormaLux. Pages, products, and taxonomy are not mixed.

**Home** holds pages that have a layout. Women, Men, account, my-edit, saved-items, shared-board, search, style-feed, bag, curation insight, and petite-denim are pages. Under `style-feed`, each story is one Article page. Under Women, each category is one ProductListing (`new-in`, `denim`, `new-season-edit`, and the other edits). Under `edits`, each campaign is one ProductListing (`the-denim-drop`, `festival-2-0`, and the rest). `Products` is the catalogue page. Each product under it is one ProductPage named with the product slug. Categories on that item still point at Data.

**Data** holds what is not a page. `HomeComponents` is the homepage offer, banner, edit row, new-in row, Style Feed, and the footer subscribe bar. `Articles` is the four Style Feed stories. `Categories` is the taxonomy. Catalogue, Sites, Shared, Signals, and the us/au/de language items sit here. Old brand, slug, `prd`, and `/cat` folders were moved to `Data/Retired` on the Content Management server. Those folder files are no longer in serialization. Delete the Retired items in Content Editor when the new pages look right.

Product URLs are `/products/{slug}`. Category URLs are the page (`/women/denim`, `/edits/the-denim-drop`). Search facets: `refine=attribute_10992:61379` (dresses), `attribute_1047:8387,8404` (jumpers and cardigans), `attribute_10159:63025` (adidas Samba), `base_colour:4` (black), `attribute_12017:63014` (stainless steel), `pricerange=45-95`, `iscurated=true`. Sign in on `/account` stores body fit and size for the session; listings, search, shared boards, and the product page use it.

Page and product items store SitecoreAI affinities on the `Affinities` field (`name|value` lines, at most 10, characters `a-z`, `0-9`, and underscore). Product pages use `content_type|product` plus brand, product type, category, and colour. Listings use `content_type|listing`. Bag is `content_type|bag` and `intent|purchase`. Saved items is `content_type|saved` and `intent|save`. Style articles use `content_type|article`. `POST /api/affinities` writes the same field through the Pages API (`PATCH /api/v1/pages/{pageId}`) when `SITECORE_PAGES_API_TOKEN` is set. The Performance affinities screen is the authoring UI for those pairs.

## Run locally

```powershell
cd industry-verticals\asos
copy .env.remote.site .env.local
npm install
npm run sitecore-tools:generate-map
npm run dev
```

Open `http://localhost:3000/`, then `/women` and `/women/new-in`.
