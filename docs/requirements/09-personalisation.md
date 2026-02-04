# 09 - Personalisation & A/B Testing

## Overview

Content personalisation, A/B testing, AI-powered recommendations, and user journey optimization.

---

## Requirements

| Requirement | Sitecore Solution | Status |
|-------------|-------------------|--------|
| Personalisation rules | Sitecore Personalize | ⚙️ Integration |
| A/B testing | Sitecore Personalize | ⚙️ Integration |
| User journeys | Flow Designer | ⚙️ Integration |
| AI recommendations | AI Auto-Personalization | ⚙️ Integration |
| Audience segmentation | CDP | ⚙️ Integration |
| Real-time personalization | Personalize Widgets | ⚙️ Integration |

---

## 9.1 Sitecore Personalize

### Overview

```
Sitecore Personalize provides:
├── Real-time personalization
├── A/B/n testing
├── Decision models
├── Web experiences
├── Interactive experiences
└── Triggered experiences
```

### Integration Architecture

```
Website → Engage SDK → Sitecore CDP
    ↓                      ↓
User Events           User Profile
    ↓                      ↓
Personalize → Decisions → Personalized Content
```

### SDK Integration

```typescript
// Install Engage SDK
npm install @sitecore/engage

// Initialize
import { Engage } from '@sitecore/engage';

const engage = new Engage({
  clientKey: process.env.PERSONALIZE_CLIENT_KEY,
  targetURL: process.env.PERSONALIZE_TARGET_URL,
  cookieDomain: 'brother.co.uk',
  pointOfSale: 'brother-uk'
});
```

### Documentation

- [Sitecore Personalize](https://doc.sitecore.com/personalize/en/developers/api/index-en.html)
- [Engage SDK](https://doc.sitecore.com/xmc/en/developers/xm-cloud/sitecore-engage.html)
- [Sitecore AI](https://doc.sitecore.com/sai/en/developers/sitecoreai/)
- [Sitecore Accelerate: Personalization](https://developers.sitecore.com/learn/accelerate/xm-cloud/implementation/personalization)

---

## 9.2 Personalization Rules

### Component Personalization

```
In XM Cloud:
1. Select component in Pages Editor
2. Click "Personalize" button
3. Add variation
4. Configure audience
5. Set content for variation
```

### Built-in Conditions

| Condition | Description |
|-----------|-------------|
| Geolocation | Country, region, city |
| Device | Mobile, tablet, desktop |
| Traffic source | Referrer, campaign |
| Page visits | Viewed specific pages |
| Goals | Achieved goals |
| Time | Date, day of week |
| Segment | CDP segment membership |

### Example Rules

```typescript
// Show EcoPro banner to returning visitors
{
  name: "EcoPro Promotion",
  condition: {
    type: "and",
    rules: [
      { type: "visits", operator: "gt", value: 1 },
      { type: "segment", value: "eco-conscious" }
    ]
  },
  content: {
    component: "PromoBanner",
    variant: "EcoPro"
  }
}
```

---

## 9.3 A/B Testing

### XM Cloud Testing

```
A/B Test Setup:
1. Create content variants
2. Define test parameters
3. Set traffic allocation
4. Configure success metrics
5. Start test
6. Monitor results
7. Select winner
```

### Test Configuration

```typescript
// Test definition
{
  name: "Hero CTA Test",
  variants: [
    { id: "control", name: "Shop Now", traffic: 50 },
    { id: "variant-a", name: "Browse Products", traffic: 25 },
    { id: "variant-b", name: "Find Your Printer", traffic: 25 }
  ],
  metrics: {
    primary: "click-through-rate",
    secondary: ["time-on-page", "conversions"]
  },
  duration: "14 days",
  confidence: 95
}
```

### Personalize A/B Testing

```typescript
// Web Experience
import { personalize } from '@sitecore/engage';

const heroVariant = await personalize.runExperience({
  friendlyId: 'hero-cta-test'
});

return <HeroBanner variant={heroVariant.id} />;
```

---

## 9.4 AI Auto-Personalization

### Sitecore AI Features

```
Auto-Personalization:
├── Automatic content variants
├── Predictive targeting
├── Self-optimizing tests
├── Content recommendations
└── User intent prediction
```

### Content Assist

```
AI Content Generation:
├── Suggest headlines
├── Generate descriptions
├── Create variations
├── Optimize for SEO
└── Translate content
```

### Documentation

- [Sitecore AI Overview](https://doc.sitecore.com/sai/en/developers/sitecoreai/)
- [Auto-Personalization](https://doc.sitecore.com/sai/en/developers/sitecoreai/auto-personalization.html)
- [Content Assist](https://doc.sitecore.com/sai/en/developers/sitecoreai/content-assist.html)

---

## 9.5 User Journeys

### Flow Designer

```
Journey Example: New Visitor
├── Step 1: Homepage visit
│   └── Show welcome banner
├── Step 2: Browse products
│   └── Show product recommendations
├── Step 3: View product details
│   └── Show comparison CTA
├── Step 4: Exit intent
│   └── Show exit popup
└── Step 5: Return visit
    └── Show previously viewed
```

### Interactive Experiences

```typescript
// Exit intent popup
{
  trigger: "exit-intent",
  template: "modal",
  content: {
    title: "Don't leave yet!",
    body: "Get 10% off your first printer",
    cta: "Get Discount"
  },
  frequency: "once-per-session"
}
```

### Triggered Experiences

```typescript
// Cart abandonment email
{
  trigger: "cart-abandoned",
  delay: "1 hour",
  channel: "email",
  template: "cart-reminder",
  content: {
    subject: "You left something behind",
    products: "{{cart.items}}"
  }
}
```

---

## 9.6 Audience Segmentation

### Built-in Segments

| Segment | Definition |
|---------|------------|
| New visitors | First visit |
| Returning visitors | 2+ visits |
| High intent | Viewed 5+ products |
| Cart abandoners | Items in cart, no purchase |
| Loyal customers | 3+ purchases |

### Custom Segments

```typescript
// CDP Segment: Business Customers
{
  name: "Business Customers",
  condition: {
    type: "or",
    rules: [
      { type: "page-view", pattern: "/business/*" },
      { type: "form-submit", form: "business-enquiry" },
      { type: "custom-event", event: "b2b-pricing-view" }
    ]
  }
}
```

### Segment Usage

```typescript
// Use segment in component
const isBusinessCustomer = await cdp.checkSegment('business-customers');

if (isBusinessCustomer) {
  return <HeroBanner variant="business" />;
}
return <HeroBanner variant="consumer" />;
```

---

## Demo Tasks

### XM Cloud Personalization

- [ ] Show component personalization in Pages Editor
- [ ] Add personalization variant
- [ ] Configure audience condition
- [ ] Preview personalized content
- [ ] Show different content for conditions

### A/B Testing

- [ ] Create A/B test for hero CTA
- [ ] Configure test variants
- [ ] Set traffic allocation
- [ ] View test results
- [ ] Select winning variant

### AI Features

- [ ] Demonstrate Content Assist
- [ ] Generate AI content suggestions
- [ ] Show auto-personalization setup

---

## Brother Personalization Strategy

### Key Scenarios

| Scenario | Personalization |
|----------|-----------------|
| New visitor | Welcome offer, product guide |
| Returning visitor | Previously viewed, recommendations |
| Business visitor | B2B content, bulk pricing |
| EcoPro interest | Sustainability messaging |
| Support seeker | Help resources, FAQs |

### Component Personalization

```
HeroBanner
├── Default: General messaging
├── Business: B2B solutions focus
├── EcoPro: Sustainability messaging
└── Returning: "Welcome back" + recommendations

ProductListing
├── Default: All products
├── SMB: Business-focused products
└── Home: Consumer products
```

---

## Demo Scenario: Cross-Device Label Printer Journey

> See [12-user-stories.md](./12-user-stories.md) for complete demo script

### Scenario Overview

```
James (Office Manager) is looking for name badge printers:
1. 📱 Mobile: Sees ad on commute → browses QL-810Wc
2. 💻 Desktop: Returns home → sees personalized banner
3. 📧 Signs up for newsletter → identity resolved
4. 🏢 Requests B2B quote → goal completed
```

### Required Segments

| Segment | Condition | Status |
|---------|-----------|--------|
| `label-printer-interest` | Viewed 2+ label printer pages | 📋 Create in CDP |
| `business-prospect` | Viewed /business/* OR submitted enquiry | 📋 Create in CDP |
| `high-intent` | 3+ page views AND session > 5min | 📋 Create in CDP |
| `returning-visitor` | sessions > 1 | ⚙️ Built-in CDP |
| `multi-device-user` | devices.length > 1 | ⚙️ Built-in CDP |

### Required Experiences

| Experience | Trigger | Content | Status |
|------------|---------|---------|--------|
| Welcome Back Hero | returning-visitor | "Continue exploring Label Printers" | 📋 Create |
| Product Affinity | label-printer-interest | Show QL-800 series | 📋 Create |
| B2B Banner | business-prospect | "Labelling Solutions for Your Business" | 📋 Create |
| Recently Viewed | product-view history | Previously viewed products | 📋 Create |

### Identity Resolution

```
Cross-device journey:
1. Mobile visit → Guest profile created (anonymous)
2. Desktop visit → New session, fingerprint match
3. Newsletter signup → Email confirmed → Profiles merged
4. Quote request → Full business profile
```

### Validation Checklist

| Task | Owner | Status |
|------|-------|--------|
| Configure Engage SDK in Next.js | Developer | ⚙️ |
| Create CDP segments | Marketing | 📋 |
| Create Personalize experiences | Marketing | 📋 |
| Build hero banner variants | Content Author | 📋 |
| Configure identity resolution | Developer | ⚙️ |
| Set up goal tracking | Developer | ⚙️ |
| Test cross-device flow | QA | 📋 |

---

## Next Steps

→ Continue to [10-analytics.md](./10-analytics.md)  
→ See [12-user-stories.md](./12-user-stories.md) for complete demo scenario


