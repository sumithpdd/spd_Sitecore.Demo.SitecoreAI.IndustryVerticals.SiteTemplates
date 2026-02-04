# 07 - Content Types (Blog, News, Articles)

## Overview

Blog pages, news articles, article listings, tags, categories, and rich media content.

---

## Requirements

| Requirement | Sitecore Solution | Status |
|-------------|-------------------|--------|
| Standalone blog pages | Article template | ✅ Available |
| Add articles with CTAs | ArticleDetails component | ✅ Available |
| Article listing pages | ArticleListing component | ✅ Available |
| Tags & categories | Taxonomy | ✅ Available |
| Related articles | Automated recommendations | ⚙️ Configurable |
| Author profiles | Author template | ⚙️ To add |
| Rich media support | Images, videos, embeds | ✅ Available |

---

## 7.1 Article Template

### Template Structure

```
Article Page Template
├── Content
│   ├── Title (Single-line text)
│   ├── Summary (Multi-line text)
│   ├── Body (Rich text)
│   ├── FeaturedImage (Image)
│   └── FeaturedVideo (Link)
├── Metadata
│   ├── Author (Reference)
│   ├── PublishDate (DateTime)
│   ├── Categories (Multi-select)
│   └── Tags (Multi-select)
├── SEO
│   ├── MetaTitle (Single-line text)
│   ├── MetaDescription (Multi-line text)
│   └── OpenGraphImage (Image)
└── Related
    └── RelatedArticles (Multi-select)
```

### Content Tree

```
/sitecore/content/brother/
├── Articles/
│   ├── News/
│   │   ├── Brother launches new EcoPro...
│   │   └── Sustainability report 2024
│   ├── Blog/
│   │   ├── Top 5 printer features for WFH
│   │   └── How to choose a scanner
│   └── Press Releases/
│       └── Q4 2024 results
└── Data/
    ├── Authors/
    │   ├── John Smith
    │   └── Jane Doe
    ├── Categories/
    │   ├── Printers
    │   ├── Sustainability
    │   └── Technology
    └── Tags/
        ├── EcoPro
        ├── Home Office
        └── Business
```

---

## 7.2 Article Details Component

### Brother Implementation

```typescript
// Location: src/components/article-details/ArticleDetails.tsx

Layout:
├── Featured Image (full-width)
├── Article Header
│   ├── Category label
│   ├── Title
│   ├── Summary
│   └── Author + Date
├── Article Body (rich text)
├── Tags
├── Social Share
└── Related Articles
```

### Fields

| Field | Type | Purpose |
|-------|------|---------|
| Title | Text | Article title |
| Summary | Text | Article excerpt |
| Body | RichText | Main content |
| FeaturedImage | Image | Hero image |
| PublishDate | Date | Publication date |
| Author | Reference | Author profile |
| Categories | Multi-list | Categories |
| Tags | Multi-list | Tags |

---

## 7.3 Article Listing Component

### Brother Implementation

```typescript
// Location: src/components/article-listing/ArticleListing.tsx

Features:
├── Filter by category
├── Search articles
├── Sort by date
├── Grid/list view
├── Pagination
└── Load more
```

### Listing Display

```typescript
// Grid layout
<ArticleCard>
  <Image />
  <Category />
  <Title />
  <Summary />
  <AuthorDate />
  <ReadMore />
</ArticleCard>
```

### GraphQL Query

```graphql
query ArticleList($language: String!, $first: Int) {
  search(
    where: {
      AND: [
        { name: "_templates", value: "{ARTICLE-TEMPLATE-ID}" }
        { name: "_language", value: $language }
      ]
    }
    first: $first
    orderBy: { name: "PublishDate", direction: DESC }
  ) {
    results {
      ... on Article {
        title { value }
        summary { value }
        featuredImage { src alt }
        publishDate { value }
        url { path }
      }
    }
  }
}
```

---

## 7.4 Article Carousel Component

### Brother Implementation

```typescript
// Location: src/components/article-carousel/ArticleCarousel.tsx

Features:
├── Slide navigation
├── Auto-play (optional)
├── Touch/swipe support
├── Featured articles
└── Configurable count
```

---

## 7.5 Categories & Tags

### Category Management

```
Categories (hierarchical):
├── Products
│   ├── Printers
│   ├── Scanners
│   └── Labelling
├── Business
│   ├── SMB
│   └── Enterprise
└── Support
    ├── Troubleshooting
    └── How-to
```

### Tag Cloud

```typescript
// Display popular tags
<TagCloud>
  <Tag href="/articles?tag=ecopro" count={15}>EcoPro</Tag>
  <Tag href="/articles?tag=printing" count={12}>Printing</Tag>
  <Tag href="/articles?tag=wfh" count={10}>Work From Home</Tag>
</TagCloud>
```

### Filtering

```typescript
// URL: /articles?category=printers&tag=ecopro
const { category, tag } = router.query;

// Filter articles
const filtered = articles.filter(a => 
  (!category || a.category === category) &&
  (!tag || a.tags.includes(tag))
);
```

---

## 7.6 Author Profiles

### Author Template

```
Author Template
├── Display
│   ├── Name (Single-line text)
│   ├── JobTitle (Single-line text)
│   ├── Photo (Image)
│   └── Bio (Multi-line text)
├── Social
│   ├── LinkedIn (Link)
│   ├── Twitter (Link)
│   └── Email (Email)
└── Content
    └── Articles (auto-computed)
```

### Author Component

```typescript
// In article
<AuthorBox>
  <Avatar src={author.photo} />
  <Name>{author.name}</Name>
  <Title>{author.jobTitle}</Title>
  <SocialLinks links={author.social} />
</AuthorBox>
```

---

## 7.7 Related Articles

### Manual Selection

```
In Sitecore:
1. Edit article
2. Navigate to Related section
3. Select related articles
4. Save
```

### Automatic Recommendations

```typescript
// Based on shared tags/categories
const getRelatedArticles = (article, allArticles, limit = 3) => {
  return allArticles
    .filter(a => a.id !== article.id)
    .map(a => ({
      ...a,
      score: calculateSimilarity(article, a)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};
```

---

## Demo Tasks

- [ ] Create new article
- [ ] Add featured image
- [ ] Write rich text content
- [ ] Assign categories and tags
- [ ] Set publication date
- [ ] Add author
- [ ] Configure related articles
- [ ] View on article listing page
- [ ] Filter by category
- [ ] View article detail page

---

## Brother Articles Implementation

### Content Structure

```
/brother/Articles/
├── News/
│   └── (Company news, announcements)
├── Blog/
│   └── (How-to guides, tips)
├── Press/
│   └── (Press releases)
└── Case Studies/
    └── (Customer stories)
```

### Article Pages

| Page | Template | Components |
|------|----------|------------|
| /news | Listing | ArticleListing, Filter |
| /news/{slug} | Detail | ArticleDetails, Related |
| /blog | Listing | ArticleListing, Search |
| /blog/{slug} | Detail | ArticleDetails, Author |

---

## Next Steps

→ Continue to [08-commerce.md](./08-commerce.md)


