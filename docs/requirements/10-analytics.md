# 10 - Analytics & Reporting

## Overview

Analytics integration, reporting dashboards, CDP integration, and performance monitoring.

---

## Requirements

| Requirement | Sitecore Solution | Status |
|-------------|-------------------|--------|
| Analytics integration | Engage SDK / GTM | ⚙️ Integration |
| Google Analytics (GA4) | GTM integration | ⚙️ Configurable |
| Adobe Analytics | Direct / GTM | ⚙️ Configurable |
| CDP integration | Sitecore CDP | ⚙️ Integration |
| Custom dashboards | Analytics connectors | ⚙️ Configurable |
| Real-time tracking | Engage SDK | ⚙️ Integration |

---

## 10.1 Analytics Architecture

### Data Flow

```
Website Events
    ↓
Engage SDK → Sitecore CDP
    ↓           ↓
GTM → GA4    Analytics Dashboard
    ↓
Custom Reports
```

### Event Types

| Type | Description |
|------|-------------|
| Page View | Every page load |
| Identify | User identification |
| Goal | Conversion events |
| Custom Event | Application events |
| Form Submit | Form completions |

---

## 10.2 Sitecore Engage SDK

### Integration

```typescript
// _app.tsx
import { EngageProvider } from '@sitecore/engage';

function MyApp({ Component, pageProps }) {
  return (
    <EngageProvider
      clientKey={process.env.NEXT_PUBLIC_CDP_CLIENT_KEY}
      targetURL={process.env.NEXT_PUBLIC_CDP_TARGET_URL}
      cookieDomain="brother.co.uk"
      pointOfSale="brother-uk"
    >
      <Component {...pageProps} />
    </EngageProvider>
  );
}
```

### Page View Tracking

```typescript
// Automatic page view
import { usePageView } from '@sitecore/engage/hooks';

function ProductPage({ product }) {
  usePageView({
    channel: 'WEB',
    language: 'en-GB',
    page: product.url,
    pageTitle: product.name
  });
  
  return <ProductDetails product={product} />;
}
```

### Custom Events

```typescript
import { useEngage } from '@sitecore/engage';

function AddToCartButton({ product }) {
  const { event } = useEngage();
  
  const handleAddToCart = () => {
    addToCart(product);
    
    event({
      type: 'ADD_TO_CART',
      product: {
        name: product.name,
        productId: product.sku,
        price: product.price
      }
    });
  };
  
  return <Button onClick={handleAddToCart}>Add to Cart</Button>;
}
```

### Identity Events

```typescript
// Identify user on login
const identifyUser = (user) => {
  engage.identify({
    email: user.email,
    firstname: user.firstName,
    lastname: user.lastName,
    identifiers: [
      { id: user.id, provider: 'brother-crm' }
    ]
  });
};
```

### Documentation

- [Engage SDK](https://doc.sitecore.com/xmc/en/developers/xm-cloud/sitecore-engage.html)
- [Event Tracking](https://doc.sitecore.com/personalize/en/developers/api/event-tracking.html)
- [CDP Integration](https://doc.sitecore.com/cdp/en/developers/sitecore-cdp/index-en.html)

---

## 10.3 Google Analytics 4

### GTM Integration

```typescript
// _document.tsx
<Script
  src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
  strategy="afterInteractive"
/>
```

### Event Mapping

| Engage Event | GA4 Event |
|--------------|-----------|
| PAGE_VIEW | page_view |
| ADD_TO_CART | add_to_cart |
| PURCHASE | purchase |
| FORM_SUBMIT | generate_lead |
| SEARCH | search |

### E-commerce Events

```typescript
// Product view
gtag('event', 'view_item', {
  currency: 'GBP',
  value: 299.99,
  items: [{
    item_id: 'HL-L2350DW',
    item_name: 'Brother HL-L2350DW',
    item_category: 'Printers',
    price: 299.99
  }]
});

// Purchase
gtag('event', 'purchase', {
  transaction_id: 'T12345',
  value: 299.99,
  currency: 'GBP',
  items: [/* ... */]
});
```

---

## 10.4 Sitecore CDP

### Overview

```
Sitecore CDP provides:
├── Unified customer profile
├── Real-time data collection
├── Identity resolution
├── Audience segmentation
├── Data exports
└── API access
```

### Customer Profile

```typescript
// CDP Guest Profile
{
  guestId: "abc123",
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
  sessions: 15,
  firstSeen: "2024-01-15",
  lastSeen: "2025-12-27",
  pageViews: 87,
  goals: ["newsletter_signup", "product_inquiry"],
  segments: ["returning-visitor", "business-customer"],
  customData: {
    companySize: "SMB",
    industry: "Retail"
  }
}
```

### Batch Data Export

```javascript
// Export to data warehouse
CDP.export({
  type: 'batch',
  destination: 'snowflake',
  schedule: 'daily',
  data: ['guests', 'events', 'segments']
});
```

### Documentation

- [Sitecore CDP](https://doc.sitecore.com/cdp/en/developers/sitecore-cdp/index-en.html)
- [CDP Data Model](https://doc.sitecore.com/cdp/en/developers/sitecore-cdp/data-model.html)
- [CDP Integrations](https://doc.sitecore.com/cdp/en/developers/sitecore-cdp/integrations.html)

---

## 10.5 Analytics Dashboards

### XM Cloud Analytics

```
Built-in analytics:
├── Page views
├── Top pages
├── Traffic sources
├── Device breakdown
├── Geographic distribution
└── Session metrics
```

### CDP Dashboards

```
CDP Analytics:
├── Visitor trends
├── Segment performance
├── Goal conversions
├── Experience results
├── Journey analytics
└── Custom reports
```

### Custom Reporting

```typescript
// CDP API for custom reports
const getSessionsBySegment = async (segmentId, dateRange) => {
  const response = await cdp.analytics.query({
    metrics: ['sessions', 'pageViews', 'goals'],
    dimensions: ['date', 'segment'],
    filters: {
      segment: segmentId,
      dateRange: dateRange
    }
  });
  return response.data;
};
```

---

## 10.6 Goals & Conversions

### Goal Definition

```
Key Goals:
├── Newsletter signup
├── Contact form submission
├── Quote request
├── Product comparison
├── Add to cart
├── Purchase
└── Support ticket created
```

### Goal Tracking

```typescript
// Track goal completion
const trackGoal = (goalName, value = 0) => {
  engage.goal({
    name: goalName,
    value: value
  });
};

// Example: Quote request
const handleQuoteSubmit = () => {
  submitQuote(formData);
  trackGoal('quote_request', 500);
};
```

### Conversion Funnels

```
Product Funnel:
Step 1: Category page view (100%)
Step 2: Product page view (60%)
Step 3: Add to cart (25%)
Step 4: Begin checkout (15%)
Step 5: Purchase (8%)
```

---

## Demo Tasks

### Analytics Setup

- [ ] Show Engage SDK integration
- [ ] View page tracking in action
- [ ] Track custom events
- [ ] Demonstrate identity resolution

### Google Analytics

- [ ] Show GTM container setup
- [ ] View GA4 real-time reports
- [ ] Review e-commerce tracking
- [ ] Analyze traffic sources

### CDP Features

- [ ] View customer profiles
- [ ] Explore segment analytics
- [ ] Review goal conversions
- [ ] Create custom report

---

## Brother Analytics Implementation

### Key Metrics

| Metric | Description |
|--------|-------------|
| Page views | Total page views |
| Sessions | Unique visits |
| Bounce rate | Single page exits |
| Time on site | Average session duration |
| Goal completions | Conversion events |
| Revenue | E-commerce value |

### Event Schema

```typescript
// Brother-specific events
{
  'product_view': { sku, category, price },
  'product_compare': { products: [] },
  'quote_request': { productType, companySize },
  'support_search': { query, resultsCount },
  'dealer_locator': { postcode, radius },
  'download_spec': { productSku, docType }
}
```

### Reports

| Report | Purpose |
|--------|---------|
| Product performance | Popular products, views, conversions |
| Search analytics | Search terms, no-results, click-through |
| Campaign performance | Traffic sources, ROI |
| Customer journey | Multi-touch attribution |
| Support metrics | FAQ views, ticket creation |

---

## Demo Scenario: Label Printer Journey Tracking

> See [12-user-stories.md](./12-user-stories.md) for complete demo script

### Events to Track

| Event | Page | Data | Status |
|-------|------|------|--------|
| `PAGE_VIEW` | All pages | page, referrer, device | ⚙️ Engage SDK |
| `SEARCH` | Search results | term, resultsCount | 📋 Configure |
| `PRODUCT_VIEW` | Product page | sku, name, price, category | 📋 Configure |
| `PRODUCT_COMPARE` | Comparison | products[] | 📋 Configure |
| `NEWSLETTER_SIGNUP` | Any | email | 📋 Configure |
| `QUOTE_REQUEST` | Quote form | products[], companySize | 📋 Configure |

### Demo Journey Events

```javascript
// Scene 1: Mobile - Search for "name badge printer"
{
  event: "SEARCH",
  term: "name badge printer",
  device: "mobile",
  timestamp: "2025-12-27T08:15:00Z"
}

// Scene 1: Mobile - View QL-810Wc product
{
  event: "PRODUCT_VIEW",
  product: {
    sku: "QL-810Wc",
    name: "QL-810Wc wireless label printer",
    category: "Labelling & Receipts > Name Badge Printers",
    price: 192.00
  },
  device: "mobile"
}

// Scene 2: Desktop - Return visit (identity merged)
{
  event: "PAGE_VIEW",
  page: "/",
  device: "desktop",
  isReturning: true,
  previousProducts: ["QL-810Wc"]
}

// Scene 2: Desktop - Newsletter signup (identity confirmed)
{
  event: "IDENTIFY",
  email: "james@company.com",
  firstName: "James"
}

// Scene 3: Quote request (goal)
{
  event: "GOAL",
  goal: "quote_request",
  value: 960.00,
  products: [{ sku: "QL-810Wc", quantity: 5 }]
}
```

### CDP Profile Evolution

| Stage | Profile State |
|-------|---------------|
| After mobile visit | Anonymous guest, 1 device, label-printer-interest segment |
| After desktop visit | Anonymous guest, 2 devices, returning-visitor segment |
| After newsletter | Identified user (james@company.com), profiles merged |
| After quote | business-prospect segment, high-intent, quote_request goal |

### Validation Checklist

| Task | Owner | Status |
|------|-------|--------|
| Install Engage SDK | Developer | ⚙️ |
| Configure PAGE_VIEW tracking | Developer | 📋 |
| Configure PRODUCT_VIEW tracking | Developer | 📋 |
| Configure SEARCH tracking | Developer | 📋 |
| Configure IDENTIFY events | Developer | 📋 |
| Configure GOAL tracking | Developer | 📋 |
| Test cross-device identity | QA | 📋 |
| View CDP guest profile | Marketing | 📋 |

---

## Next Steps

→ Continue to [11-operations.md](./11-operations.md)  
→ See [12-user-stories.md](./12-user-stories.md) for complete demo scenario


