# 05 - Content Components & Layouts

## Overview

Content components, page layouts, drag-and-drop page building, and design system integration.

---

## Requirements

| Requirement | Sitecore Solution | Status |
|-------------|-------------------|--------|
| Full-width banners | HeroBanner (Brother variant) | ✅ Implemented |
| Rich text | RichText component | ✅ Available |
| Accordions | Custom component | ⚙️ To implement |
| Info tiles | Features component | ✅ Available |
| Conversion bars | Promo component | ✅ Available |
| YouTube playlists | Custom component | ⚙️ To implement |
| Country selectors | LanguageSwitcher | ✅ Available |
| Free text/HTML | RichText / ContentBlock | ✅ Available |
| Personalisation modules | Sitecore Personalize | ⚙️ Integration |
| Drag-and-drop | Pages Editor | ✅ Built-in |
| Design system integration | Storybook | ✅ Available |

---

## 5.1 Brother Component Library

### Layout Components

| Component | Variants | Description |
|-----------|----------|-------------|
| `Container` | Default | Content wrapper |
| `ColumnSplitter` | Default | Multi-column layout |
| `RowSplitter` | Default | Row-based layout |
| `SectionWrapper` | Default | Section with background |
| `PageContent` | Default | Main content area |

### Navigation Components

| Component | Variants | Description |
|-----------|----------|-------------|
| `Header` | Default, **Brother**, Compact | Site header |
| `Footer` | Default, **Brother**, Minimal | Site footer |
| `Navigation` | Default | Main menu |
| `Breadcrumb` | Default | Page path |
| `LanguageSwitcher` | Default | Language selector |

### Content Components

| Component | Variants | Description |
|-----------|----------|-------------|
| `HeroBanner` | Default, TopContent, **Brother**, **Compact**, **Split** | Hero section |
| `ContentBlock` | Default | Content area |
| `RichText` | Default | Rich text editor |
| `Title` | Default | Heading |
| `Image` | Default | Image display |
| `Promo` | Default | Promotional banner |
| `Features` | Default | Feature tiles |

### Product Components

| Component | Variants | Description |
|-----------|----------|-------------|
| `ProductListing` | Default | Product grid |
| `ProductDetails` | Default | Product page |
| `SelectedProducts` | Default | Curated products |
| `AllProductsCarousel` | Default | Product slider |
| `CategoryListing` | Default, WithFilters, Featured | Category cards |

### Article Components

| Component | Variants | Description |
|-----------|----------|-------------|
| `ArticleListing` | Default | Article grid |
| `ArticleDetails` | Default | Article page |
| `ArticleCarousel` | Default | Article slider |

### Engagement Components

| Component | Variants | Description |
|-----------|----------|-------------|
| `ContactForm` | Default | Contact form |
| `Subscribe` | Default | Newsletter signup |
| `Reviews` | Default | Customer reviews |
| `SocialFeed` | Default | Social media feed |
| `SocialFollow` | Default | Social links |
| `Offers` | Default | Special offers |

### Search Components

| Component | Variants | Description |
|-----------|----------|-------------|
| `SearchBar` | Default, Inline, Hero | Search input |
| `SearchResults` | Default | Results page |

---

## 5.2 HeroBanner Variants

### Default
```
Standard hero with content on side
- Background image/video
- Title with accent line
- Description
- CTA button
```

### Brother
```
"More time for life" style
- Dark gradient overlay
- Tagline (orange)
- Large title
- Description
- Primary + Secondary CTA
```

### Compact
```
Smaller hero for category pages
- Blue gradient overlay
- Title
- Description
- No CTA
```

### Split
```
Two-column layout
- Content on left
- Image on right
- Reversible
```

---

## 5.3 Drag-and-Drop Page Building

### Pages Editor

```
Features:
├── Component toolbox
├── Placeholder visualization
├── Drag-and-drop placement
├── Inline editing
├── Real-time preview
└── Device preview
```

### Component Toolbox

```
Available Components
├── Layout
│   ├── Container
│   ├── Column Splitter
│   └── Row Splitter
├── Content
│   ├── Rich Text
│   ├── Image
│   └── Title
├── Navigation
│   ├── Navigation
│   └── Link List
└── Custom
    ├── Hero Banner
    ├── Product Listing
    └── ...
```

### Documentation

- [Pages Editor](https://doc.sitecore.com/xmc/en/users/xm-cloud/the-pages-editor.html)
- [Component Development](https://doc.sitecore.com/xmc/en/developers/content-sdk/component-development.html)
- [Sitecore Accelerate: Components](https://developers.sitecore.com/learn/accelerate/xm-cloud/implementation/components)

---

## 5.4 Storybook Integration

### Running Storybook

```bash
cd industry-verticals/brother
npm run storybook
```

### Story Structure

```typescript
// src/stories/HeroBanner.stories.tsx
export default {
  title: 'Components/HeroBanner',
  component: HeroBanner
};

export const Default = {
  args: {
    fields: {
      Title: { value: 'Welcome' },
      Description: { value: 'Description text' }
    }
  }
};

export const Brother = {
  args: {
    params: { variant: 'Brother' },
    fields: {
      Tagline: { value: 'More time for life' },
      Title: { value: 'Intuitive printers' }
    }
  }
};
```

### Available Stories

```
industry-verticals/brother/src/stories/
├── HeroBanner.stories.tsx
├── Header.stories.tsx
├── Footer.stories.tsx
├── ProductListing.stories.tsx
├── ArticleListing.stories.tsx
└── ...
```

---

## 5.5 Component Variants (SXA)

### Configuring Variants

```
In Sitecore:
1. Navigate to rendering item
2. Add rendering variant
3. Define variant fields/layout
4. Select variant in Pages Editor
```

### Variant Selection

```typescript
// Component receives variant via params
export const Brother = ({ params, fields }: Props) => {
  // params.variant === 'Brother'
  return <BrotherLayout>{/* content */}</BrotherLayout>;
};
```

### Documentation

- [SXA Headless Variants](https://doc.sitecore.com/xmc/en/developers/xm-cloud/headless-variants.html)
- [Rendering Variants](https://doc.sitecore.com/xmc/en/developers/xm-cloud/rendering-variants.html)

---

## Demo Tasks

- [ ] Open Storybook
- [ ] Browse component library
- [ ] Show HeroBanner variants
- [ ] Add component to page in Pages Editor
- [ ] Configure component variant
- [ ] Demonstrate drag-and-drop
- [ ] Show inline editing

---

## Components to Add (Future)

| Component | Purpose | Priority |
|-----------|---------|----------|
| Accordion | FAQ sections | High |
| Tabs | Product specs | High |
| YouTube Embed | Video content | Medium |
| Image Gallery | Product images | Medium |
| Comparison Table | Product comparison | Medium |
| Timeline | Company history | Low |

---

## Next Steps

→ Continue to [06-forms.md](./06-forms.md)


