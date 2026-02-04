# 08 - E-Commerce & Products

## Overview

Product pages, commerce integration, product listings, comparisons, reviews, and store finders.

---

## Requirements

| Requirement | Sitecore Solution | Status |
|-------------|-------------------|--------|
| E-commerce integration | Sitecore OrderCloud / Custom | ⚙️ Integration |
| PIM/DAM integration | Sitecore DAM / External | ⚙️ Configurable |
| Product landing pages | ProductDetails component | ✅ Available |
| Product category pages | CategoryListing component | ✅ Implemented |
| Product comparison | Custom component | ⚙️ To implement |
| Customer reviews | Reviews component | ✅ Available |
| Store finder | Custom component | ⚙️ To implement |
| Price display | Product template | ✅ Available |

---

## 8.1 Product Template

### Template Structure

```
Product Page Template
├── Basic Info
│   ├── ProductName (Single-line text)
│   ├── ProductCode (Single-line text)
│   ├── ShortDescription (Multi-line text)
│   └── LongDescription (Rich text)
├── Pricing
│   ├── Price (Number)
│   ├── SalePrice (Number)
│   ├── Currency (Dropdown)
│   └── PriceValidUntil (Date)
├── Media
│   ├── MainImage (Image)
│   ├── Gallery (Multi-select images)
│   └── Video (Link)
├── Categorization
│   ├── Category (Reference)
│   ├── SubCategory (Reference)
│   └── Tags (Multi-select)
├── Specifications
│   └── Specs (Name-Value list)
└── Related
    ├── RelatedProducts (Multi-select)
    └── Accessories (Multi-select)
```

### Content Tree

```
/sitecore/content/brother/Products/
├── Printers/
│   ├── Laser Printers/
│   │   ├── HL-L2350DW
│   │   └── HL-L3270CDW
│   ├── Inkjet Printers/
│   │   └── MFC-J4335DW
│   └── All-in-One/
│       └── MFC-L2750DW
├── Scanners/
│   ├── Desktop/
│   └── Portable/
└── Labelling/
    └── P-touch/
```

---

## 8.2 Product Details Component

### Brother Implementation

```typescript
// Location: src/components/product-details/ProductDetails.tsx

Layout:
├── Breadcrumb
├── Product Gallery
│   ├── Main image
│   └── Thumbnails
├── Product Info
│   ├── Category
│   ├── Product name
│   ├── Rating (stars)
│   ├── Price
│   ├── Short description
│   └── Add to Cart
├── Tabs
│   ├── Specifications
│   ├── Features
│   └── Reviews
└── Related Products
```

### Fields

| Field | Type | Purpose |
|-------|------|---------|
| Title | Text | Product name |
| ProductCode | Text | SKU |
| Price | Number | Price |
| Image | Image | Main image |
| Gallery | Images | Additional images |
| Description | RichText | Full description |
| Specifications | NameValue | Tech specs |

---

## 8.3 Category Listing Component

### Brother Implementation

```typescript
// Location: src/components/category-listing/CategoryListing.tsx

Variants:
├── Default - Grid of category cards
├── WithFilters - Filterable listing
└── Featured - Highlighted categories

Features:
├── Category image
├── Category name
├── Description
├── Product count
└── Hover effect
```

### Usage

```jsx
<CategoryListing
  params={{ variant: 'Featured' }}
  fields={{
    Heading: { value: 'Browse Our Products' },
    Description: { value: 'Find the right solution' }
  }}
/>
```

---

## 8.4 Product Listing Component

### Features

```typescript
// Location: src/components/product-listing/ProductListing.tsx

Features:
├── Grid/list toggle
├── Filter by:
│   ├── Category
│   ├── Price range
│   ├── Features
│   └── Rating
├── Sort by:
│   ├── Relevance
│   ├── Price
│   ├── Name
│   └── Rating
├── Pagination
└── Quick view
```

### Product Card

```typescript
<ProductCard>
  <Badge>New</Badge>
  <Image />
  <Rating stars={4.5} reviews={127} />
  <Title />
  <Price original={299} sale={249} />
  <QuickActions>
    <Compare />
    <AddToCart />
  </QuickActions>
</ProductCard>
```

---

## 8.5 OrderCloud Integration

### Overview

```
Sitecore OrderCloud provides:
├── Product catalog
├── Pricing & promotions
├── Cart & checkout
├── Order management
├── User management
└── Marketplace support
```

### Integration Architecture

```
XM Cloud (Content)
    ↓
Product Content → GraphQL
    ↓
Rendering Host (Next.js)
    ↓
OrderCloud API ← Pricing, Cart, Orders
```

### API Integration

```typescript
// OrderCloud client
import { BuyerProducts, Me } from '@ordercloud/portal';

const getProduct = async (productId: string) => {
  const product = await BuyerProducts.Get(productId);
  return product;
};

const addToCart = async (productId: string, quantity: number) => {
  await Me.CreateLineItem({
    ProductID: productId,
    Quantity: quantity
  });
};
```

### Documentation

- [Sitecore OrderCloud](https://ordercloud.io/learn/getting-started/welcome)
- [OrderCloud Integration](https://developers.sitecore.com/learn/integrations/ordercloud-xm-cloud)

---

## 8.6 Product Comparison

### Comparison Component

```typescript
// Features
<ProductComparison>
  <CompareHeader>
    <Product>HL-L2350DW</Product>
    <Product>HL-L3270CDW</Product>
    <Product>MFC-L2750DW</Product>
  </CompareHeader>
  <CompareRow label="Print Speed">
    <Value>30 ppm</Value>
    <Value>25 ppm</Value>
    <Value>34 ppm</Value>
  </CompareRow>
  <CompareRow label="Duplex">
    <Value>Yes</Value>
    <Value>Yes</Value>
    <Value>Yes</Value>
  </CompareRow>
</ProductComparison>
```

### Compare Feature

```typescript
// Compare button on product card
const [compareList, setCompareList] = useState<string[]>([]);

const addToCompare = (productId: string) => {
  if (compareList.length < 4) {
    setCompareList([...compareList, productId]);
  }
};

// Floating compare bar
<CompareBar visible={compareList.length > 0}>
  {compareList.map(id => <CompareItem id={id} />)}
  <CompareButton href="/compare" />
</CompareBar>
```

---

## 8.7 Reviews Component

### Features

```typescript
// Location: src/components/reviews/Reviews.tsx

Display:
├── Overall rating
├── Rating breakdown (5 stars, 4 stars, etc.)
├── Review list
│   ├── Rating
│   ├── Title
│   ├── Author
│   ├── Date
│   ├── Content
│   └── Helpful count
├── Pagination
└── Sort (newest, highest, lowest)

Write:
├── Rating selector
├── Title input
├── Review content
├── Verify purchase
└── Submit
```

### Integration Options

```
- Sitecore XM Cloud (stored in content)
- Bazaarvoice
- Yotpo
- PowerReviews
- Custom API
```

---

## 8.8 Store Finder

### Features

```typescript
<StoreFinder>
  <SearchBox placeholder="Enter postcode" />
  <FilterBy>
    <Option>All stores</Option>
    <Option>Authorized dealers</Option>
    <Option>Service centers</Option>
  </FilterBy>
  <Map>
    <Markers stores={nearbyStores} />
  </Map>
  <StoreList>
    <StoreCard>
      <Name />
      <Address />
      <Distance />
      <Directions />
    </StoreCard>
  </StoreList>
</StoreFinder>
```

### Data Integration

```typescript
// Stores API
const findStores = async (postcode: string, radius: number) => {
  const coords = await geocode(postcode);
  const stores = await fetch(`/api/stores?lat=${coords.lat}&lng=${coords.lng}&radius=${radius}`);
  return stores.json();
};
```

---

## Demo Tasks

- [ ] Browse product categories
- [ ] View category listing page
- [ ] Filter products by type
- [ ] View product details
- [ ] See product specifications
- [ ] Read customer reviews
- [ ] Add product to comparison
- [ ] Compare selected products
- [ ] Use store finder

---

## Brother Product Implementation

### Product Categories

| Category | Template | Components |
|----------|----------|------------|
| /printers | Category | CategoryListing |
| /printers/laser-printers | Subcategory | ProductListing |
| /printers/laser-printers/hl-l2350dw | Product | ProductDetails |

### Product Attributes

```
Printers:
- Print speed (ppm)
- Paper size (A4, A3)
- Duplex (Yes/No)
- Connectivity (USB, WiFi, Ethernet)
- Display (LCD, Touchscreen)
- EcoPro compatible (Yes/No)
```

---

## Next Steps

→ Continue to [09-personalisation.md](./09-personalisation.md)


