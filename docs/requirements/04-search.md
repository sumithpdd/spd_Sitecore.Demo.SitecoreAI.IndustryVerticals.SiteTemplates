# 04 - Search & Indexing

## Overview

Global search functionality, search results with filters, sitemap generation, and search ranking management.

---

## Requirements

| Requirement | Sitecore Solution | Status |
|-------------|-------------------|--------|
| Global search for pages/products | Sitecore Search / Edge Search | ✅ Components ready |
| Search results with filters/sort | SearchResults component | ✅ Implemented |
| Handle no-results scenarios | No results state | ✅ Implemented |
| XML sitemap generation | Automatic sitemap | ✅ Built-in |
| Cross-site search | Sitecore Search | ⚙️ Configurable |
| Manage search rankings | Sitecore Search Admin | ⚙️ Sitecore Search |

---

## 4.1 Search Bar Component

### Brother Implementation

```typescript
// Location: src/components/search-bar/SearchBar.tsx

Variants:
├── Default - Full search with suggestions
├── Inline - Minimal for header
└── Hero - Large centered for hero sections

Features:
├── Recent searches (localStorage)
├── Trending searches
├── Auto-submit on enter
└── Search icon button
```

### Configuration

```typescript
// Fields
interface SearchBarFields {
  Placeholder: TextField;           // "What are you looking for?"
  RecentSearchesTitle: TextField;   // "Recent Searches"
  TrendingSearchesTitle: TextField; // "Trending"
  TrendingSearches: Array<{ term: TextField }>;
}
```

### Integration Points

```
SearchBar → /search-results?term={query}
  ↓
SearchResults component
  ↓
Sitecore Search API / GraphQL
```

---

## 4.2 Search Results Component

### Brother Implementation

```typescript
// Location: src/components/search-results/SearchResults.tsx

Features:
├── Search term display
├── Result count
├── Category filter
├── Sort options
│   ├── Relevance
│   ├── Name A-Z / Z-A
│   └── Price Low-High / High-Low
├── View toggle (Grid / List)
├── Result cards
└── Pagination
```

### No Results State

```typescript
// When no results found
<NoResults
  searchTerm={searchTerm}
  title="No results found"
  description="Try adjusting your search terms"
>
  <Link href="/products">Browse Products</Link>
  <Link href="/support">Contact Support</Link>
</NoResults>
```

### Result Card

```typescript
// Grid view
<ResultCard>
  <Image />
  <Title />
  <Category />
  <Price />
</ResultCard>

// List view
<ResultCard layout="horizontal">
  <Image />
  <div>
    <Title />
    <Category />
    <Description />
    <Price />
  </div>
</ResultCard>
```

---

## 4.3 Sitecore Search Integration

### Overview

```
Sitecore Search provides:
- Full-text search
- Faceted filtering
- AI-powered relevance
- Search analytics
- Merchandising rules
```

### Setup Steps

```
1. Create Sitecore Search account
2. Configure search source (XM Cloud)
3. Define indexable content types
4. Create search widgets
5. Integrate with Next.js
```

### Search Widget Integration

```typescript
import { SearchWidget } from '@sitecore-search/react';

<SearchWidget
  rfkId="brother-search"
  source="brother-content"
  facets={['category', 'productType']}
/>
```

### Documentation

- [Sitecore Search](https://doc.sitecore.com/search/en/developers/sitecore-search/index-en.html)
- [Search React SDK](https://doc.sitecore.com/search/en/developers/sitecore-search/react-sdk.html)
- [Sitecore Accelerate: Search](https://developers.sitecore.com/learn/accelerate/xm-cloud/implementation/search)

---

## 4.4 XML Sitemap

### Automatic Generation

```
XM Cloud generates sitemaps automatically:
/sitemap.xml - Main sitemap index
/sitemap-0.xml - Page sitemap
/sitemap-1.xml - Additional pages
```

### Configuration

```typescript
// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap'
      }
    ];
  }
};
```

### Sitemap Content

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.brother.co.uk/</loc>
    <lastmod>2025-12-27</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.brother.co.uk/products/printers</loc>
    <lastmod>2025-12-27</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### Documentation

- [XML Sitemap](https://doc.sitecore.com/xmc/en/developers/xm-cloud/xml-sitemap.html)
- [SEO Best Practices](https://doc.sitecore.com/xmc/en/developers/xm-cloud/seo-best-practices.html)

---

## 4.5 Search Ranking Management

### Sitecore Search Admin

```
Features:
├── Boost/bury rules
├── Synonyms management
├── Query suggestions
├── Redirect rules
└── Analytics dashboard
```

### Ranking Rules

```
Rule examples:
- Boost "EcoPro" products in search
- Bury discontinued products
- Promote new arrivals
- Seasonal promotions
```

### Query Suggestions

```
Configure autocomplete:
- "prin" → "printers"
- "scan" → "scanners"
- "ink" → "ink cartridges"
```

---

## Demo Tasks

- [ ] Show SearchBar on Brother site
- [ ] Perform a search query
- [ ] Demonstrate search suggestions
- [ ] Filter results by category
- [ ] Sort results by price
- [ ] Toggle grid/list view
- [ ] Show no results handling
- [ ] View XML sitemap

---

## Brother Site Implementation

### Search Pages

```
/search-results?term={query}
  ↓
SearchResults component
  ↓
Displays: Products, Pages, Articles
```

### Searchable Content Types

| Content Type | Fields Indexed |
|--------------|----------------|
| Products | Title, Description, Category, SKU |
| Pages | Title, Body, Meta |
| Articles | Title, Body, Tags, Date |
| Support | Title, Content, Category |

### Filter Categories

```
- Products
  - Printers
  - Scanners
  - Labelling
  - Supplies
- Support
- News
```

---

## Next Steps

→ Continue to [05-components.md](./05-components.md)


