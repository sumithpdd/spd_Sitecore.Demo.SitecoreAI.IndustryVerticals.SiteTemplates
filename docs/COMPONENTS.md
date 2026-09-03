# Sitecore XM Cloud Industry Verticals - Component Reference

This document provides a comprehensive list of all components available across the industry verticals in this Sitecore Headless JSS project.

---

## Project Overview

| Vertical          | Site Name        | Rendering Host  | Path                                 |
| ----------------- | ---------------- | --------------- | ------------------------------------ |
| **Healthcare**    | Nova Medical     | `healthcare`    | `./industry-verticals/healthcare`    |
| **Luxury Retail** | Essential Living | `luxury-retail` | `./industry-verticals/luxury-retail` |
| **Bristan**       | Bristan          | `bristan`       | `./industry-verticals/bristan`       |
| **Retail**        | Forma Lux        | `nextjsstarter` | `./industry-verticals/retail`        |
| **Travel**        | Visit London     | `visitlondon`   | `./industry-verticals/visitlondon`   |
| **Energy**        | GridWell         | `energy`        | `./industry-verticals/energy`        |
| **Legal**         | Legal            | `legal`         | `./industry-verticals/legal`         |
| **Aston Martin**  | Aston Martin     | `astonmartin`   | `./industry-verticals/astonmartin`   |
| **University**    | University of Essex | `university` | `./industry-verticals/university` |
| **Brother**       | Brother UK       | `brother`       | `./industry-verticals/brother`       |

---

## Component Inventory by Vertical

### 🏥 Healthcare (Nova Medical)

**Path:** `industry-verticals/healthcare/src/components/`

| Component                         | Description                                |
| --------------------------------- | ------------------------------------------ |
| `ColumnSplitter`                  | Layout component for multi-column content  |
| `Container`                       | Wrapper component for content sections     |
| `ContentBlock`                    | Rich content display block                 |
| `ContentSection`                  | Structured content section with styling    |
| `DoctorDetails`                   | Doctor profile and information display     |
| `DoctorsListing`                  | Grid/list of doctors                       |
| `Features`                        | Feature highlights component               |
| `Footer`                          | Site footer                                |
| `HeaderExtended`                  | Extended header with additional navigation |
| `HeroBanner`                      | Hero section with banner imagery           |
| `Image`                           | Image display component                    |
| `LinkList`                        | List of navigational links                 |
| `Navigation`                      | Main navigation menu                       |
| `PageContent`                     | Page content wrapper                       |
| `PartialDesignDynamicPlaceholder` | Dynamic placeholder for partial designs    |
| `Promo`                           | Promotional content block                  |
| `Reviews`                         | Customer/patient reviews                   |
| `RichText`                        | Rich text content display                  |
| `RowSplitter`                     | Layout component for row-based content     |
| `SocialFollow`                    | Social media follow links                  |
| `ThemeSwitcher`                   | Theme toggle functionality                 |
| `Title`                           | Title/heading component                    |

**Non-Sitecore Components:**

- `BlobAccent` - Decorative blob shapes
- `CurvedClip` - Curved clipping mask
- `HamburgerIcon` - Mobile menu icon
- `HeroClip` - Hero section clipping mask

---

### 🛋️ Luxury Retail (Essential Living)

**Path:** `industry-verticals/luxury-retail/src/components/`

| Component                         | Description                               |
| --------------------------------- | ----------------------------------------- |
| `ColumnSplitter`                  | Layout component for multi-column content |
| `Container`                       | Wrapper component for content sections    |
| `ContentBlock`                    | Rich content display block                |
| `Features`                        | Feature highlights component              |
| `Footer`                          | Site footer                               |
| `Header`                          | Site header                               |
| `HeroBanner`                      | Hero section with banner imagery          |
| `Image`                           | Image display component                   |
| `LanguageSwitcher`                | Language selection component              |
| `LinkList`                        | List of navigational links                |
| `Navigation`                      | Main navigation menu                      |
| `NavigationIcons`                 | Icon-based navigation elements            |
| `Offers`                          | Special offers display                    |
| `PageContent`                     | Page content wrapper                      |
| `PageHeader`                      | Page-level header component               |
| `PartialDesignDynamicPlaceholder` | Dynamic placeholder for partial designs   |
| `ProductDetails`                  | Product detail page component             |
| `ProductListing`                  | Product grid/list display                 |
| `Promo`                           | Promotional content block                 |
| `RichText`                        | Rich text content display                 |
| `RowSplitter`                     | Layout component for row-based content    |
| `SectionWrapper`                  | Section wrapper with styling              |
| `SelectedProducts`                | Curated product selection display         |
| `SocialFeed`                      | Social media feed integration             |
| `SocialFollow`                    | Social media follow links                 |
| `Title`                           | Title/heading component                   |

**Non-Sitecore Components:**

- `AddToCartButton` - E-commerce add to cart
- `HamburgerIcon` - Mobile menu icon
- `MiniCart` - Cart preview widget
- `ParentPathLink` - Breadcrumb-style parent link
- `ProductCard` - Product card display
- `ProductColorControl` - Color variant selector
- `ProductGallery` - Product image gallery
- `ProductMetaDetails` - Product metadata display
- `ProductReviews` - Product review section
- `ProductSizeControl` - Size variant selector
- `QuantityControl` - Quantity input control
- `StarRating` - Star rating display

---

### 🚿 Bristan (bristan.com)

**Path:** `industry-verticals/bristan/src/components/`  
**Component map:** `industry-verticals/bristan/.sitecore/component-map.ts`  
**Setup guide:** [BRISTAN.md](./BRISTAN.md)

Bristan is a **dedicated rendering host** with an isolated Sitecore collection (`/sitecore/content/bristan`). It also serves **`heritage`** on the same Next.js app. React components follow **Essential Living (`luxury-retail`)** patterns for shared infra; **retail (Forma Lux)** patterns for search and optional demo/CDP. Sitecore renderings use unique IDs under **Project/bristan** with the same `componentName` values as industry-verticals.

SSG pre-renders **bristan + heritage only** (not other tenant sites). See [BRISTAN.md — Rendering host scope](./BRISTAN.md#rendering-host-scope-and-static-build).

**Page map and Bristan-specific variants:** [BRISTAN.md — Pages and routes](./BRISTAN.md#pages-and-routes) · [BRISTAN.md — Components](./BRISTAN.md#components)

| Component                         | Description                                          |
| --------------------------------- | ---------------------------------------------------- |
| `AllProductsCarousel`             | Carousel of all products                             |
| `ArticleDetails`                  | Article detail (`Default`, **BristanBlog**)          |
| `ArticleListing`                  | Article grid/list (**BristanBlog** = blog index)     |
| `Breadcrumb`                      | Navigation breadcrumb                                |
| `ColumnSplitter`                  | Multi-column layout                                  |
| `ContactForm`                     | Contact/inquiry form                                 |
| `Container`                       | Content section wrapper                              |
| `ContentBlock`                    | Basic rich content block                             |
| `Features`                        | Grids/tiles (**AudienceTiles**, **BrowseRanges**, **HelpCards**, …) |
| `Footer`                          | Site footer (SDK fields, Bristan CSS)                |
| `Header`                          | Header + audience bar + placeholders                 |
| `HeroBanner`                      | **Default**, **TopContent**                          |
| `Image`                           | Image display                                        |
| `InspirationCarousel`             | Home / inspiration image carousel                    |
| `LanguageSwitcher`                | Language selection                                   |
| `LinkList`                        | Navigational link lists                              |
| `Navigation`                      | **BristanMegaMenu** mega-nav                         |
| `NavigationIcons`                 | **BristanUtility** — wishlist, spares, sign-in       |
| `Offers`                          | Special offers                                       |
| `PageContent`                     | Page content wrapper                                 |
| `PageHeader`                      | Category/page title band                             |
| `PartialDesignDynamicPlaceholder` | Partial design placeholder                           |
| `ProductDetails`                  | PDP — gallery, **Bristan tabs**, spec download row, GBP, related placeholder |
| `ProductListing`                  | Product grid with filters                            |
| `Promo`                           | **TopBanner**, **CategoryTile**, **CenteredCta**, **RequestBrochure**, **Lifetime**, … |
| `Reviews`                         | Customer reviews                                     |
| `RichText`                        | Rich text content                                    |
| `RowSplitter`                     | Row-based layout                                     |
| `SearchResults`                   | Search results page (`/search`)                      |
| `SectionWrapper`                  | Section wrapper                                      |
| `SelectedArticles`                | Curated articles                                     |
| `SelectedProducts`                | Curated products                                     |
| `SocialFeed`                      | Social media feed                                    |
| `SocialFollow`                    | Social follow links                                  |
| `SpareParts`                      | Spare parts list on product detail pages             |
| `Subscribe`                       | Newsletter subscription                              |
| `ThemeEditor`                     | Theme editor (dev)                                   |
| `Title`                           | Title/heading                                        |
| `TrustpilotWidget`                | Trustpilot review carousel embed                     |

**Sitecore Search widgets** (registered in component map, implemented under `non-sitecore/search/`):

- `PreviewSearch`, `SearchResultsComponent`, `QuestionsAnswers`, `SearchFacets`, `SearchPagination`, `HomeHighlighted`, and related helpers

**App shell only** (not in component map — wired in `_app.tsx`):

- `demo/*` — demo sign-in modal and shell
- `cdp-profile-panel/*` — CDP engagement debug panel

**Non-Sitecore helpers** (not in component map): `MiniCart`, `ProductCard`, `HamburgerIcon`, **`ProductTabs`** (Bristan PDP tabs), **`ProductSpecDownloads`** (four-column spec download row), etc. See [BRISTAN.md — Product detail spec downloads](./BRISTAN.md#product-detail--spec-downloads-bristan-pdp).

---

### 🏎️ Aston Martin (Automobile)

**Path:** `industry-verticals/astonmartin/src/components/`  
**Component map:** `industry-verticals/astonmartin/.sitecore/component-map.ts`  
**Setup guide:** [ASTONMARTIN.md](./ASTONMARTIN.md) — full [component behaviour](./ASTONMARTIN.md#components) and [CDP / Owner login](./ASTONMARTIN.md#cdp-page-views-affinities-and-owner-login)

Isolated collection `/sitecore/content/automobile` + rendering host `astonmartin`. Content SDK events (`@sitecore-content-sdk/events`) for page views and identity.

| Component                         | Variants | Description |
| --------------------------------- | -------- | ----------- |
| `Header`                          | Default | Glass chrome + nav + **Owner login** |
| `Footer`                          | Default | Link columns / legal |
| `HeroBanner`                      | Default, ModelFeature, ModelsLanding, ModelDetail | Full-bleed heroes; Default supports Crafted For You UTM swap |
| `Promo`                           | Default, DualTile, ImageLeft, ImageRight | Lifestyle and Our World split bands |
| `StoriesGrid`                     | Default | Home editorial cards |
| `NewsStrip`                       | Default | Home news teaser |
| `ModelJumpNav`                    | Default | `/models` family jump anchors |
| `ModelFamilySection`              | Default | Model family band on listing |
| `ModelIntroSpecs`                 | Default | Model detail intro + specs |
| `FeatureCarousel`                 | Default | Model feature tiles |
| `QuoteBlock`                      | Default | Pull-quote |
| `ExploreCtaStrip`                 | Default | Three-tile explore CTAs |
| `EnquiryForm`                     | Default | Multi-step enquire (reason / model / contact) |
| `DealerFinder`                    | Default | Dealer search + list |
| `ConfiguratorStudio`              | Default | Visual configure stub (DB12) |
| `OwnersHub`                       | Default | Owners hub matching reference |
| `PartialDesignDynamicPlaceholder` | — | Partial design framework |

**App shell only** (excluded from component map — wired in `_app.tsx` / `Scripts.tsx`):

- `content-sdk/CdpPageView` — Edge `pageView` (brand Aston Martin, industry Automobile)
- `demo/*` — Owners Club mock login (`james.owner@sitecore.net`)
- `cdp-profile-panel/*` — engagement panel + local path affinities (models, Owners, Configure, …)

---

### 🎓 University (University of Essex)

**Path:** `industry-verticals/university/src/components/`  
**Setup guide:** [UNIVERSITY.md](./UNIVERSITY.md)

Isolated collection `/sitecore/content/university` + rendering host `university`. Story is Clearing Fast Track and We Are Essex ([essex.ac.uk](https://www.essex.ac.uk/)). `npm run dev` regenerates `.sitecore/component-map.ts` from these folders.

| Component | Variants | Description |
|-----------|----------|-------------|
| `Header` | Default | Wordmark, audience links, apply CTA, header search |
| `Navigation` | Default | Study / Clearing / campus / manifesto links + Fast Track hotline |
| `Footer` | Default | Wivenhoe Park address, explore links, copyright |
| `HeroBanner` | Default | Clearing Fast Track hero; `utm_campaign=we-are-essex` swaps to manifesto |
| `Manifesto` | Default | We Are Essex manifesto page (`/about/manifesto`) |
| `Promo` | Default | Home promo bands |
| `PromoTileGrid` | Default | “Are you ready?” tile grid |
| `StatsGlance` | Default | Guardian ranking, research, graduate outcomes |
| `ClearingHub` | Default | Fast Track hub; ChatGPT UTM emphasises CS & AI |
| `ClearingApply` | Default | Get Clearing ready / apply stub |
| `CourseListing` | Default | Subject hub (Essex Business School sample) |
| `CourseNextSteps` | Default | Course chrome: related subjects + next steps |
| `CourseCsAi` | Default | Computer Science and AI course page |
| `StudyLife` | Default | Colchester / Loughton campus life |
| `Accommodation` | Default | Guaranteed halls |
| `SiteSearch` | Default | Search results; same dummy index as header preview |
| `PartialDesignDynamicPlaceholder` | — | Partial design framework |

**App shell only** (Layout / `_app`, not Sitecore renderings):

- `ai-chatbot/AiChatbot` — bottom-left Chat with University
- `header/HeaderSearch` — Everything / Courses live preview
- `cdp-profile-panel/*` — student-journey CDP panel

---

### 🖨️ Brother (UK)

**Path:** `industry-verticals/brother/src/components/`  
**Setup guide:** [BROTHER.md](./BROTHER.md)

Isolated collection `/sitecore/content/brother` + rendering host `brother`. Labelling story plus **10-product catalogue** and `/search` demo index for Sitecore Search demos ([brother.co.uk](https://www.brother.co.uk/)). Media in `media-library` (push required).

| Component | Variants | Description |
|-----------|----------|-------------|
| `Header` | Default | Nav + `HeaderSearch` typeahead |
| `Footer` | Default | Explore links across catalogue |
| `HeroBanner` | Default | Home hero; `utm_campaign=label-printer` → VC-500W |
| `PromoStrip` | Default | Labelling CTA band |
| `ProductListing` | Default | Category / devices product grids |
| `ProductDetail` | Default | PDP from catalogue + related products |
| `SiteSearch` | Default | `/search` results (demo index) |
| `FeatureGrid` | Default | Vertical applications cards |
| `ArticleBody` | Default | Desk organisation article |
| `PartialDesignDynamicPlaceholder` | — | Partial design framework |

---

### 🛒 Retail (Forma Lux)

**Path:** `industry-verticals/retail/src/components/`

| Component                         | Description                               |
| --------------------------------- | ----------------------------------------- |
| `AllProductsCarousel`             | Carousel of all products                  |
| `ArticleCarousel`                 | Article/blog carousel                     |
| `ArticleDetails`                  | Article detail page component             |
| `ArticleListing`                  | Article grid/list display                 |
| `Breadcrumb`                      | Navigation breadcrumb                     |
| `ColumnSplitter`                  | Layout component for multi-column content |
| `ContactForm`                     | Contact/inquiry form                      |
| `Container`                       | Wrapper component for content sections    |
| `ContentBlock`                    | Rich content display block                |
| `Features`                        | Feature highlights component              |
| `Footer`                          | Site footer                               |
| `Header`                          | Site header                               |
| `HeroBanner`                      | Hero section with banner imagery          |
| `Image`                           | Image display component                   |
| `LanguageSwitcher`                | Language selection component              |
| `LinkList`                        | List of navigational links                |
| `Navigation`                      | Main navigation menu                      |
| `NavigationIcons`                 | Icon-based navigation elements            |
| `Offers`                          | Special offers display                    |
| `PageContent`                     | Page content wrapper                      |
| `PartialDesignDynamicPlaceholder` | Dynamic placeholder for partial designs   |
| `ProductDetails`                  | Product detail page component             |
| `ProductListing`                  | Product grid/list display                 |
| `Promo`                           | Promotional content block                 |
| `Reviews`                         | Customer reviews section                  |
| `RichText`                        | Rich text content display                 |
| `RowSplitter`                     | Layout component for row-based content    |
| `SectionWrapper`                  | Section wrapper with styling              |
| `SelectedProducts`                | Curated product selection display         |
| `SocialFeed`                      | Social media feed integration             |
| `SocialFollow`                    | Social media follow links                 |
| `Subscribe`                       | Newsletter subscription component         |
| `Title`                           | Title/heading component                   |

**Non-Sitecore Components:**

- `AddToCartButton` - E-commerce add to cart
- `CarouselButton` - Carousel navigation button
- `HamburgerIcon` - Mobile menu icon
- `MiniCart` - Cart preview widget
- `Pagination` - Pagination controls
- `ProductCard` - Product card display
- `ProductCarousel` - Product carousel component
- `ProductColorControl` - Color variant selector
- `ProductDescription` - Product description display
- `ProductGallery` - Product image gallery
- `ProductMetaDetails` - Product metadata display
- `ProductReviews` - Product review section
- `ProductSizeControl` - Size variant selector
- `ProductTabs` - Tabbed product information
- `QuantityControl` - Quantity input control
- `ReviewCard` - Individual review card
- `SocialShare` - Social sharing buttons
- `StarRating` - Star rating display

---

### 🗺️ Travel (Visit London)

**Path:** `industry-verticals/visitlondon/src/components/`

| Component                         | Description                                                   |
| --------------------------------- | ------------------------------------------------------------- |
| `AllProductsCarousel`             | Carousel of all products                                      |
| `ArticleDetails`                  | Article detail page component                                 |
| `ArticleListing`                  | Article grid/list display                                     |
| `BestSelling`                     | Bestselling mosaic list (Visit London-style, hardcoded price) |
| `Breadcrumb`                      | Navigation breadcrumb                                         |
| `ColumnSplitter`                  | Layout component for multi-column content                     |
| `ContactForm`                     | Contact/inquiry form                                          |
| `Container`                       | Wrapper component for content sections                        |
| `ContentBlock`                    | Rich content display block                                    |
| `Features`                        | Feature highlights component                                  |
| `Footer`                          | Site footer                                                   |
| `Header`                          | Site header                                                   |
| `HeroBanner`                      | Hero section with banner imagery                              |
| `Image`                           | Image display component                                       |
| `LanguageSwitcher`                | Language selection component                                  |
| `LinkList`                        | List of navigational links                                    |
| `Navigation`                      | Main navigation menu                                          |
| `NavigationIcons`                 | Icon-based navigation elements                                |
| `Offers`                          | Special offers display                                        |
| `PageContent`                     | Page content wrapper                                          |
| `PartialDesignDynamicPlaceholder` | Dynamic placeholder for partial designs                       |
| `ProductDetails`                  | Product detail page component                                 |
| `ProductListing`                  | Product grid/list display                                     |
| `Promo`                           | Promotional content block                                     |
| `Reviews`                         | Customer reviews section                                      |
| `RichText`                        | Rich text content display                                     |
| `RowSplitter`                     | Layout component for row-based content                        |
| `SearchResults`                   | Search results with filters                                   |
| `SectionWrapper`                  | Section wrapper with styling                                  |
| `SelectedArticles`                | Curated article selection display                             |
| `SelectedProducts`                | Curated product selection display                             |
| `SocialFeed`                      | Social media feed integration                                 |
| `SocialFollow`                    | Social media follow links                                     |
| `Subscribe`                       | Newsletter subscription component                             |
| `ThemeEditor`                     | Theme editing component                                       |
| `Title`                           | Title/heading component                                       |

**Non-Sitecore Components:**

- `AddToCartButton` - E-commerce add to cart
- `CarouselButton` - Carousel navigation button
- `HamburgerIcon` - Mobile menu icon
- `MiniCart` - Cart preview widget
- `Pagination` - Pagination controls
- `ProductCard` - Product card display
- `ProductCarousel` - Product carousel component
- `ProductColorControl` - Color variant selector
- `ProductDescription` - Product description display
- `ProductGallery` - Product image gallery
- `ProductMetaDetails` - Product metadata display
- `ProductReviews` - Product review section
- `ProductSizeControl` - Size variant selector
- `ProductTabs` - Tabbed product information
- `QuantityControl` - Quantity input control
- `ReviewCard` - Individual review card
- `SocialShare` - Social sharing buttons
- `StarRating` - Star rating display
- `VisitLondonHeroSearch` - Visit London hero search component
- `VisitLondonLanguageCurrency` - Language and currency switcher
- `VisitLondonLogo` - Visit London logo component
- `search/ArticleCard` - Article card for search results
- `search/ArticleHorizontalCard` - Horizontal article card layout
- `search/CardViewSwitcher` - Toggle between card views
- `search/HomeHighlighted` - Highlighted search results
- `search/PreviewSearch` - Search preview component
- `search/QueryResultsSummary` - Search results summary
- `search/QuestionsAnswers` - Q&A search results
- `search/ResultsPerPage` - Results per page selector
- `search/SearchFacets` - Search filtering facets
- `search/SearchPagination` - Search pagination controls
- `search/SearchResultsComponent` - Main search results component
- `search/SortOrder` - Search sort order selector
- `search/Spinner` - Loading spinner
- `search/SuggestionBlock` - Search suggestions display

---

### ⚖️ Legal

**Path:** `industry-verticals/legal/src/components/`

| Component                         | Description                                        |
| --------------------------------- | -------------------------------------------------- |
| `ArticleDetails`                  | Article detail page component                      |
| `ArticleListing`                  | Article grid/list display                          |
| `Breadcrumb`                      | Hierarchical navigation (ancestors + current page) |
| `ColumnSplitter`                  | Layout component for multi-column content          |
| `Container`                       | Wrapper component for content sections             |
| `ContentBlock`                    | Rich content display block                         |
| `Features`                        | Feature highlights component                       |
| `Footer`                          | Site footer                                        |
| `GridConditions`                  | Grid conditions visualization                      |
| `GridDemand`                      | Grid demand/chart component                        |
| `GridStatusGauge`                 | Grid status gauge indicator                        |
| `Header`                          | Site header                                        |
| `HeroBanner`                      | Hero section with banner imagery                   |
| `Image`                           | Image display component                            |
| `LinkList`                        | List of navigational links                         |
| `Navigation`                      | Main navigation menu                               |
| `PageContent`                     | Page content wrapper                               |
| `PartialDesignDynamicPlaceholder` | Dynamic placeholder for partial designs            |
| `Promo`                           | Promotional content block                          |
| `RichText`                        | Rich text content display                          |
| `RowSplitter`                     | Layout component for row-based content             |
| `SectionWrapper`                  | Section wrapper with styling                       |
| `SelectedArticles`                | Curated article selection display                  |
| `SocialFollow`                    | Social media follow links                          |
| `ThemeEditor`                     | Theme editing component                            |
| `Title`                           | Title/heading component                            |
| `SearchResults`                   | Search results with filters                        |
| `Subscribe`                       | Newsletter signup                                  |
| `SitecoreStyles`                  | Sitecore styling integration                       |
| `CdpPageView`                     | CDP (Customer Data Platform) page tracking         |
| `FEAASScripts`                    | FEAAS (Front-End as a Service) scripts             |

**Non-Sitecore Components:**

- `HamburgerIcon` - Mobile menu icon
- `Chart` - Reusable chart component
- `ParentPathLink` - Breadcrumb-style parent link
- `ArticleCard` - Article card for listings
- `SocialShare` - Social sharing buttons
- `search/ArticleCard` - Article card for search results
- `search/ArticleHorizontalCard` - Horizontal article card layout
- `search/CardViewSwitcher` - Toggle between card views
- `search/HomeHighlighted` - Highlighted search results
- `search/PreviewSearch` - Search preview component
- `search/QueryResultsSummary` - Search results summary
- `search/QuestionsAnswers` - Q&A search results
- `search/ResultsPerPage` - Results per page selector
- `search/SearchFacets` - Search filtering facets
- `search/SearchPagination` - Search pagination controls
- `search/SearchResultsComponent` - Main search results component
- `search/SortOrder` - Search sort order selector
- `search/Spinner` - Loading spinner
- `search/SuggestionBlock` - Search suggestions display

**Legal – Promo variants:** Aligned with the **retail (FormaLux)** Promo implementation: **Default** (two-column grid, optional multiple images, accent line, `arrow-btn` CTA), **WithFullImage** (wide image from `PromoImageTwo` + split title/description), **WithQuote** (decorative quote mark + `PromoImageOne`), and **Stacked** (DWF-style banner strip on the image + title/CTA). See `industry-verticals/legal/README.md` and [Control Risks brand tokens](../industry-verticals/legal/docs/CONTROL-RISKS-BRAND.md) for styling.

![Promo Stacked variant – subtitle as banner strip](./promo-stacked-banner.png)

---

## Shared/Common Components

These components appear across multiple verticals:

| Component                         | Healthcare | Luxury Retail | Retail | Visit London |
| --------------------------------- | :--------: | :-----------: | :----: | :----------: |
| `ColumnSplitter`                  |     ✅     |      ✅       |   ✅   |      ✅      |
| `Container`                       |     ✅     |      ✅       |   ✅   |      ✅      |
| `ContentBlock`                    |     ✅     |      ✅       |   ✅   |      ✅      |
| `Features`                        |     ✅     |      ✅       |   ✅   |      ✅      |
| `Footer`                          |     ✅     |      ✅       |   ✅   |      ✅      |
| `HeroBanner`                      |     ✅     |      ✅       |   ✅   |      ✅      |
| `Image`                           |     ✅     |      ✅       |   ✅   |      ✅      |
| `LinkList`                        |     ✅     |      ✅       |   ✅   |      ✅      |
| `Navigation`                      |     ✅     |      ✅       |   ✅   |      ✅      |
| `PageContent`                     |     ✅     |      ✅       |   ✅   |      ✅      |
| `PartialDesignDynamicPlaceholder` |     ✅     |      ✅       |   ✅   |      ✅      |
| `Promo`                           |     ✅     |      ✅       |   ✅   |      ✅      |
| `RichText`                        |     ✅     |      ✅       |   ✅   |      ✅      |
| `RowSplitter`                     |     ✅     |      ✅       |   ✅   |      ✅      |
| `SocialFollow`                    |     ✅     |      ✅       |   ✅   |      ✅      |
| `Title`                           |     ✅     |      ✅       |   ✅   |      ✅      |

---

## Visit London - Required styling + icon setup (implementation notes)

Visit London uses a **CSS background SVG icon** approach (data-URIs) for logos and UI icons.

- **Icons CSS**: `industry-verticals/visitlondon/src/assets/icons/icons.data.svg.css` (imported by `industry-verticals/visitlondon/src/assets/main.css`)
- **Base icon class**: `.svg` hides text via `text-indent` and shows background SVG (sprite-style)
- **Footer border graphic**: uses CDN URL (not local asset) to avoid Next/CSS-loader resolution errors:
  - `https://cdn.londonandpartners.com/webui/visit/images/footer-border-graphic.svg`

Visit London `Header`/`Navigation` use a hydration-safe pattern for the Sitecore `Link` `editable` prop (enable editing only after mount) to avoid SSR/client markup mismatches.

## Content SDK Components

Each vertical includes these core Sitecore Content SDK components:

| Component        | Purpose                                    |
| ---------------- | ------------------------------------------ |
| `CdpPageView`    | CDP (Customer Data Platform) page tracking |
| `FEAASScripts`   | FEAAS (Front-End as a Service) scripts     |
| `SitecoreStyles` | Sitecore styling integration               |

---

---

## Brother UK Enhancements

The Brother site extends existing components with new variants:

### Header Component

| Variant   | Description                                             |
| --------- | ------------------------------------------------------- |
| `Default` | Standard header layout                                  |
| `Brother` | Brother-style with EcoPro banner, mega menu, search bar |
| `Compact` | Minimal header for focused pages                        |

### Footer Component

**Rendering ID:** `02654ba0-74ae-42a4-b384-bca9b96adf4b`  
**Datasource Template:** `7e3a2360-40fa-456d-8061-307338dd39e0`

| Variant   | Description                               |
| --------- | ----------------------------------------- |
| `Default` | Standard footer with logo and links       |
| `Brother` | Dark theme, 5-column layout, social icons |
| `Minimal` | Simple footer with logo and copyright     |

**Datasource Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `Logo` | Image | Footer logo (light theme) |
| `LogoDark` | Image | Footer logo (dark theme) |
| `Description` | Rich Text | Footer description text |
| `CopyrightText` | Single-Line Text | Copyright notice |
| `TitleOne` - `TitleFive` | Single-Line Text | Column titles |
| `PolicyText` | General Link | Privacy policy link |
| `TermsText` | General Link | Terms of use link |

### HeroBanner Component

**Rendering ID:** `b49cf2d7-7cb2-4918-8f38-2607d956d995`  
**Datasource Template:** `ac18eef2-f134-4985-8b74-6ad16cca6577`

| Variant      | Description                                  |
| ------------ | -------------------------------------------- |
| `Default`    | Standard hero with side content              |
| `TopContent` | Centered content at top                      |
| `Brother`    | "More time for life" style with dark overlay |
| `Compact`    | Smaller hero for category pages              |
| `Split`      | Two-column layout (content + image)          |

**Datasource Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `Title` | Single-Line Text | Hero headline |
| `Description` | Rich Text | Hero body text |
| `Image` | Image | Hero background image |
| `Video` | File | Optional video background |
| `CtaLink` | General Link | Call-to-action button |

### RichText Component

**Rendering ID:** `9c6d53e3-fe57-4638-af7b-6d68304c7a94`  
**Datasource Template:** `0a7aa373-5ed1-4e9b-9678-22d3c5faf6df`

**Datasource Fields:**
| Field | Type | Description |
|-------|------|-------------|
| `Text` | Rich Text | HTML content |

### New Components (Brother Only)

| Component         | Description                                      |
| ----------------- | ------------------------------------------------ |
| `CategoryListing` | Product category grid with filter pills          |
| `SearchBar`       | Search with recent/trending suggestions          |
| `SearchResults`   | Results with grid/list view, filters, pagination |

---

## Page Templates

### ProductPage

**Template ID:** `f6e44a9e-074a-4865-987e-0c2dc00b7af5`

| Field                 | Type             | Description                   |
| --------------------- | ---------------- | ----------------------------- |
| `Title`               | single-line text | Product name                  |
| `SKU`                 | single-line text | Product SKU code              |
| `Price`               | number           | Product price (e.g., 299.99)  |
| `ShortDescription`    | multi-line text  | Brief product summary         |
| `LongDescription`     | rich text        | Full HTML product description |
| `Image1` - `Image5`   | image            | Product gallery images        |
| `ProductData`         | general link     | PDF — product data sheet (shared field; Bristan PDP) |
| `FittingInstructions` | general link     | PDF — fitting instructions (shared field) |
| `TechDrawing`         | image            | Technical drawing image (shared field) |
| `SparesDrawing`       | general link     | PDF — spares drawing (shared field) |
| `UsefulInformation`   | rich text        | Useful Information tab bullets (Bristan PDP) |
| `Width`, `Height`, `Depth`, `Weight`, `SeatHeight`, `LegHeight` | single-line text | Optional dimensions in Fitting & Specification tab |
| `Category`            | droplink         | Reference to category item    |
| `Color`               | treelist         | Available colours             |
| `Size`                | treelist         | Available sizes               |
| `Tags`                | treelist         | Product tags                  |
| `metadataTitle`       | single-line text | SEO page title                |
| `metadataDescription` | multi-line text  | SEO meta description          |
| `NavigationTitle`     | single-line text | Menu display name             |

### ProductCategoryPage

**Template ID:** `4d2b49e6-1130-444a-b22c-5c7e25d01b56`

| Field                 | Type             | Description                  |
| --------------------- | ---------------- | ---------------------------- |
| `Title`               | single-line text | Page title                   |
| `CategoryName`        | single-line text | Category name                |
| `Content`             | rich text        | Category description content |
| `metadataTitle`       | single-line text | SEO page title               |
| `metadataDescription` | multi-line text  | SEO meta description         |
| `NavigationTitle`     | single-line text | Menu display name            |

### ArticlePage

**Template ID:** `412bf445-b1a6-4aff-8054-0b21a1febc47`

| Field              | Type             | Description         |
| ------------------ | ---------------- | ------------------- |
| `Title`            | single-line text | Article title       |
| `ShortDescription` | multi-line text  | Article summary     |
| `Content`          | rich text        | Article body (HTML) |
| `Image`            | image            | Featured image      |
| `Author`           | droplink         | Reference to author |
| `Category`         | droplink         | Article category    |
| `PublishedDate`    | date             | Publication date    |
| `Tags`             | treelist         | Article tags        |

---

## Out-of-the-box Components in Sitecore AI Pages

There are several categories of components that can be used in multiple contexts or configurations across **XM Cloud Pages**. The out-of-the-box (OOTB) components included in Sitecore AI Pages are grouped into **Media**, **Navigation**, **Page Content**, and **Page Structure** categories.

Components can include elements such as:

- Text
- Images
- Forms
- Navigation menus
- Videos and more

These OOTB components map to the shared industry-verticals React implementations in this repo (for example `LinkList`, `Navigation`, `RichText`). Custom site components (such as SitecoreSilver’s `SitecoreSilver*` set) are added separately via serialization and the component map.

### OOTB component inventory

| Category           | #   | SitecoreAI component      | Repo component   | Description                                                                                                            |
| ------------------ | --- | ------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Media**          | 1   | Image Component           | `Image`          | Add images from the media library to a page.                                                                           |
| **Navigation**     | 2   | List Link Component       | `LinkList`       | Add a list of items that display a title, link, and text.                                                              |
| **Navigation**     | 3   | Navigation Component      | `Navigation`     | Creates a navigation menu for your site.                                                                               |
| **Page Content**   | 4   | Page Content Component    | `PageContent`    | Displays specific fields from a selected data source item on the page.                                                 |
| **Page Content**   | 5   | Promo Component           | `Promo`          | Consists of an image, text, and link field, all manually populated on the same content item assigned to the component. |
| **Page Content**   | 6   | Rich Text Component       | `RichText`       | Add formatted text to the page using HTML tags.                                                                        |
| **Page Content**   | 7   | Title Component           | `Title`          | Displays the title or subtitle of the current page.                                                                    |
| **Page Structure** | 8   | Column Splitter Component | `ColumnSplitter` | Divides the page into a number of specified columns.                                                                   |
| **Page Structure** | 9   | Container Component       | `Container`      | Adds extra CSS styling to other components using a wrapper.                                                            |
| **Page Structure** | 10  | Row Splitter Component    | `RowSplitter`    | Divides the page into a number of specified rows.                                                                      |

### Adding built-in components in Sitecore XM Cloud Pages

To add a component in XM Cloud, use the **Sitecore Pages** visual editor and its drag-and-drop functionality. Components are the building blocks for page layouts and hold content that authors can edit visually.

The exact placement of a component depends on the layout configuration of the page in Sitecore Pages, but it can be inserted:

- Inside a blank placeholder
- Before or after existing components on the page

**Typical workflow:**

1. Open the page in **Pages** (visual editor).
2. Select a placeholder (for example `headless-main`, `headless-header`, or `headless-footer`).
3. Drag a component from the toolbox into the placeholder, or use **Insert before/after** on an existing component.
4. Assign or create a **datasource** item when prompted (for content-driven components such as Promo or Rich Text).
5. Publish the page so changes appear on the live site.

For a full walkthrough of creating pages and adding components, see the [Junior Developer Guide — Placeholders](./JUNIOR-DEVELOPER-GUIDE.md#4-placeholders) and your site’s authoring checklist (for example [Copenhagen Silver — Authoring checklist](./COPENHAGEN-SILVER-SITE.md#authoring-checklist)).

---

## Extended component categories (industry verticals)

In addition to the OOTB Pages components above, this repo’s vertical sites include custom and demo components registered in each rendering host:

| Category            | Components                                          | Purpose                 |
| ------------------- | --------------------------------------------------- | ----------------------- |
| **Page Content**    | Hero Banner, Rich Text, Title, Promo, Features      | Main content components |
| **Navigation**      | Navigation, Breadcrumb, Link List, Social Follow    | Site navigation         |
| **Page Structure**  | Container, Column Splitter, Row Splitter            | Layout components       |
| **Global Elements** | Header, Footer, Header Extended                     | Site-wide elements      |
| **Products**        | Product Details, Product Listing, Selected Products | E-commerce components   |
| **Articles**        | Article Details, Article Listing, Article Carousel  | Blog/news components    |
| **Forms**           | Contact Form, Subscribe                             | User input components   |
| **Search**          | Search Box, Search Results, Filters                 | Search functionality    |
| **Media**           | Image, Video, Gallery                               | Media display           |
| **Composites**      | Accordion, Tabs, Carousel                           | Complex UI patterns     |

---

## Technology Stack

- **Framework:** Next.js
- **Styling:** Tailwind CSS + Shadcn UI
- **Node Version:** 22.11.0
- **Type:** SXA (Sitecore Experience Accelerator)

---

## For Junior Developers

See the [Junior Developer Guide](./JUNIOR-DEVELOPER-GUIDE.md) for:

- Detailed explanations of Sitecore concepts
- How to create and modify components
- Template and field type reference
- Common tasks and troubleshooting
