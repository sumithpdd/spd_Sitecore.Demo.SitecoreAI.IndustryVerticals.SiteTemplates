# 12 - User Stories & Demo Scenarios

## Overview

User stories and demo scenarios for the Brother UK workshop, demonstrating cross-device tracking, personalization, and Sitecore CDP capabilities.

---

## User Roles

| Role                  | Description                           | Tasks                                   |
| --------------------- | ------------------------------------- | --------------------------------------- |
| **Content Author**    | Creates and edits content             | Create pages, add components, edit text |
| **Content Editor**    | Reviews and approves content          | Review submissions, approve/reject      |
| **Marketing Manager** | Manages campaigns and personalization | Set up A/B tests, view analytics        |
| **Developer**         | Builds components and integrations    | Deploy code, configure SDK              |
| **Site Visitor**      | Anonymous website user                | Browse, search, add to cart             |
| **Registered User**   | Logged-in customer                    | View history, manage account            |
| **Business User**     | B2B customer                          | Request quotes, bulk orders             |

---

## Demo Story: "The Business Label Printer Journey"

### Characters

| Character | Role              | Context                                         |
| --------- | ----------------- | ----------------------------------------------- |
| **James** | Office Manager    | Looking for name badge printers for his company |
| **Sarah** | Content Author    | Creates product pages for Brother               |
| **Mike**  | Marketing Manager | Sets up personalization rules                   |

---

## Scene 1: The Commute Discovery

> **Context:** James is an Office Manager planning a corporate conference. He sees a Brother advertisement on the train during his morning commute about event badge printing. He pulls out his phone to browse.

### User Actions (Mobile)

```
1. James opens browser on his phone
2. Searches: "badge" on brother.co.uk
3. Sees search results including:
   - QL-820NWBcVM Visitor Badge Printer
   - QL-810Wc Wireless Label Printer
   - "What is the Best Printer for Badges?" article
   - "Complete Guide to Event Badge Printing" article
4. Clicks on: "What is the Best Printer for Badges?" article
5. Reads article, learns about QL-820NWBcVM for events
6. Clicks through to: QL-820NWBcVM product page
7. Notes the price (£299.99), closes browser for his stop
```

### What Sitecore Captures

```javascript
// Engage SDK Events
{
  event: "SEARCH",
  term: "badge",
  resultsCount: 9,
  page: "/search-results?term=badge"
}

{
  event: "ARTICLE_VIEW",
  article: {
    title: "What is the Best Printer for Badges?",
    path: "/What-is-the-Best-Printer-for-Badges",
    category: "Support"
  }
}

{
  event: "PRODUCT_VIEW",
  product: {
    sku: "QL-820NWBcVM",
    name: "QL-820NWBcVM Visitor Badge Printer",
    category: "Labelling & Receipts",
    subcategory: "Name Badge Printers",
    price: 299.99,
    features: ["USB", "Ethernet", "Wi-Fi", "Bluetooth"]
  }
}
```

### CDP Guest Profile (After Scene 1)

```json
{
  "guestId": "guest_abc123",
  "sessions": 1,
  "firstSeen": "2025-12-27T08:15:00Z",
  "devices": ["mobile-safari"],
  "intents": ["event-badge-printer", "visitor-management"],
  "interests": [
    { "category": "Labelling & Receipts", "score": 0.85 },
    { "product": "QL-820NWBcVM", "score": 0.95 },
    { "content": "badge-printing-guide", "score": 0.7 }
  ],
  "searchTerms": ["badge"],
  "segments": ["business-prospect", "event-organiser", "high-intent-visitor"],
  "lastPageViewed": "/Products/Labelling-and-Receipts/Name-Badge-Printers/QL-820NWBcVM"
}
```

---

## Scene 2: The Evening Research

> **Context:** That evening, James opens his home laptop to continue researching. He types "brother" in the browser.

### User Actions (Desktop)

```
1. James opens laptop browser
2. Types: brother.co.uk
3. Lands on homepage
4. Sees personalized hero banner: "Welcome back - Continue exploring Label Printers"
5. Clicks through to QL-810Wc product page
6. Views specifications tab
7. Adds product to comparison
8. Signs up for newsletter
```

### Identity Resolution

```javascript
// Cross-device identity merge
{
  originalGuest: "guest_abc123",  // Mobile session
  newSession: "guest_xyz789",     // Desktop session

  // Identity signals:
  identitySignals: {
    browserFingerprint: "partial-match",
    ipAddress: "same-household",
    behaviorPattern: "continued-journey",
    newsletterEmail: "james@company.com"  // Confirmed identity
  },

  mergedProfile: {
    guestId: "guest_abc123",
    email: "james@company.com",
    devices: ["mobile-safari", "desktop-chrome"],
    sessions: 2
  }
}
```

### Personalized Experience

```javascript
// Personalization Decision
{
  experience: "returning-visitor-hero",
  variant: "label-printer-interest",

  content: {
    headline: "Welcome back",
    subheadline: "Continue exploring Label Printers",
    cta: "View QL-810Wc",
    ctaLink: "/labelling-and-receipts/name-badge-printers/ql-810wc",

    // Show recently viewed
    recentlyViewed: [
      { sku: "QL-810Wc", name: "QL-810Wc wireless label printer" }
    ],

    // Related products
    recommendations: [
      { sku: "QL-820NWB", name: "QL-820NWB Network Label Printer" },
      { sku: "QL-800", name: "QL-800 Address Label Printer" }
    ]
  }
}
```

### CDP Guest Profile (After Scene 2)

```json
{
  "guestId": "guest_abc123",
  "email": "james@company.com",
  "firstName": "James",
  "sessions": 2,
  "firstSeen": "2025-12-27T08:15:00Z",
  "lastSeen": "2025-12-27T19:30:00Z",
  "devices": ["mobile-safari", "desktop-chrome"],
  "intents": ["name-badge-printer", "business-labelling"],
  "interests": [
    { "category": "Labelling & Receipts", "score": 0.95 },
    { "product": "QL-810Wc", "score": 0.95 },
    { "product": "QL-820NWB", "score": 0.4 }
  ],
  "segments": [
    "business-prospect",
    "label-printer-interest",
    "high-intent",
    "newsletter-subscriber",
    "multi-device-user"
  ],
  "lifecycle": "engaged",
  "predictedConversion": 0.72,
  "subscriptions": {
    "newsletter": true,
    "marketingEmail": true
  },
  "productViews": [
    { "sku": "QL-810Wc", "views": 2, "lastViewed": "2025-12-27T19:35:00Z" }
  ]
}
```

---

## Scene 3: The Business Enquiry

> **Context:** James returns to the site a few days later, now ready to request a quote for multiple units.

### User Actions

```
1. James visits brother.co.uk/business-solutions
2. Sees personalized banner: "Labelling Solutions for Your Business"
3. Clicks "Request a Quote"
4. Fills in business details
5. Submits quote request for 5x QL-810Wc printers
```

### Personalization Rules Applied

| Rule             | Condition                     | Action                   |
| ---------------- | ----------------------------- | ------------------------ |
| Business Content | segment = "business-prospect" | Show B2B hero            |
| Product Affinity | interest.product = "QL-810Wc" | Highlight QL-800 series  |
| High Intent      | predictedConversion > 0.6     | Show "Request Quote" CTA |
| Multi-Visit      | sessions > 1                  | Hide intro content       |

### Goal Completion

```javascript
// Goal: Quote Request
{
  event: "GOAL",
  goal: "quote_request",
  value: 960.00,  // 5 x £192
  metadata: {
    products: [{ sku: "QL-810Wc", quantity: 5 }],
    companySize: "SMB",
    industry: "Professional Services"
  }
}
```

---

## Implementation Requirements

### 1. Search Tracking

| Feature                 | Status             | Implementation        |
| ----------------------- | ------------------ | --------------------- |
| Search term capture     | 📋 Configure       | Engage SDK event      |
| Search results tracking | 📋 Configure       | Custom event          |
| No results handling     | ✅ Component ready | SearchResults variant |

### 2. Product View Tracking

| Feature               | Status       | Implementation   |
| --------------------- | ------------ | ---------------- |
| Product page view     | 📋 Configure | Engage SDK event |
| Product category view | 📋 Configure | Engage SDK event |
| Specification views   | 📋 Configure | Custom event     |

### 3. Cross-Device Identity

| Feature                | Status             | Implementation    |
| ---------------------- | ------------------ | ----------------- |
| Guest profile creation | ⚙️ CDP integration | Engage SDK auto   |
| Identity resolution    | ⚙️ CDP integration | CDP config        |
| Email identification   | 📋 Configure       | Newsletter signup |

### 4. Personalization Rules

| Feature                  | Status    | Implementation         |
| ------------------------ | --------- | ---------------------- |
| Returning visitor banner | 📋 Create | Personalize experience |
| Product affinity display | 📋 Create | Personalize decision   |
| Recently viewed          | 📋 Create | Edge personalization   |
| Business segment banner  | 📋 Create | Segment-based rule     |

### 5. Segment Creation

| Segment                | Condition                                   | Status      |
| ---------------------- | ------------------------------------------- | ----------- |
| business-prospect      | Viewed /business-solutions OR company field | 📋 Create   |
| label-printer-interest | Viewed 2+ label printer pages               | 📋 Create   |
| high-intent            | Session duration > 5min AND 3+ page views   | 📋 Create   |
| multi-device-user      | devices.length > 1                          | ⚙️ Auto CDP |

---

## Demo Script

### Setup (Before Demo)

- [ ] Clear browser cookies/cache
- [ ] Prepare mobile device (or emulator)
- [ ] Prepare desktop browser
- [ ] Have CDP dashboard open
- [ ] Have Personalize admin open

### Demo Flow

| Step | Action                          | What to Show                                    |
| ---- | ------------------------------- | ----------------------------------------------- |
| 1    | Open mobile browser             | Clean state, no cookies                         |
| 2    | Search "badge" on Brother site  | Search results: products + articles             |
| 3    | Click "Best Printer for Badges" | Article view event tracked                      |
| 4    | Click through to QL-820NWBcVM   | Product view event (visitor badge printer)      |
| 5    | Show CDP dashboard              | New guest profile with "event-organiser" intent |
| 6    | Switch to desktop browser       | Different session                               |
| 7    | Visit brother.co.uk             | Personalized: "Continue exploring badges"       |
| 8    | Search "badge" again            | Trending searches show badge terms              |
| 9    | Sign up for newsletter          | Identity merge                                  |
| 10   | Show CDP dashboard              | Merged profile, "business-prospect" segment     |
| 11   | Visit QL-820NWBcVM page         | "Request Quote" CTA (high-intent)               |
| 12   | Submit quote request            | Goal completion + conversion tracked            |

---

## Content Author Tasks (Sarah)

### Product Pages ✅ CREATED VIA MCP

| Page                 | Path                                                                | Status     |
| -------------------- | ------------------------------------------------------------------- | ---------- |
| Labelling & Receipts | `/Products/Labelling-and-Receipts`                                  | ✅ Created |
| Name Badge Printers  | `/Products/Labelling-and-Receipts/Name-Badge-Printers`              | ✅ Created |
| **QL-810Wc**         | `/Products/Labelling-and-Receipts/Name-Badge-Printers/QL-810Wc`     | ✅ Created |
| **QL-820NWBcVM** ⭐  | `/Products/Labelling-and-Receipts/Name-Badge-Printers/QL-820NWBcVM` | ✅ Created |

### Article Pages ✅ CREATED VIA MCP

| Page                                   | Path                                      | Status     |
| -------------------------------------- | ----------------------------------------- | ---------- |
| What is the Best Printer for Badges?   | `/What-is-the-Best-Printer-for-Badges`    | ✅ Created |
| Complete Guide to Event Badge Printing | `/Complete-Guide-to-Event-Badge-Printing` | ✅ Created |

**MCP Commands Used:**

```
mcp_sitecore-marketer_create_page (ProductPage template) - QL-820NWBcVM
mcp_sitecore-marketer_create_page (ArticlePage template) - Badge articles
```

- [x] Create QL-810Wc product page ✅
- [x] Create QL-820NWBcVM visitor badge printer page ✅ **NEW**
- [x] Create "Best Printer for Badges" article ✅ **NEW**
- [x] Create "Event Badge Printing Guide" article ✅ **NEW**
- [x] Add product specifications ✅
- [x] Configure product category taxonomy ✅
- [ ] Set up related products
- [x] Add to name badge printers listing ✅

### Printer Categories ✅ CREATED VIA MCP

| Category            | Path                                     | ID             |
| ------------------- | ---------------------------------------- | -------------- |
| Printers            | `/Products/Printers`                     | `752a58a4-...` |
| Laser Printers      | `/Products/Printers/Laser-Printers`      | `9890d7d1-...` |
| Inkjet Printers     | `/Products/Printers/Inkjet-Printers`     | `0daabe59-...` |
| Business Printers   | `/Products/Printers/Business-Printers`   | `24fcad4b-...` |
| Portable Printers   | `/Products/Printers/Portable-Printers`   | `667181f3-...` |
| All-in-One Printers | `/Products/Printers/All-in-One-Printers` | `b13819cf-...` |

### Sample Products ✅ CREATED VIA MCP

| Product             | SKU          | Price   | Path                                             |
| ------------------- | ------------ | ------- | ------------------------------------------------ |
| Brother HL-L2400DWE | HL-L2400DWE  | £154.80 | `/Products/Printers/Laser-Printers/HL-L2400DWE`  |
| Brother HL-L2445DW  | HL-L2445DW   | £190.80 | `/Products/Printers/Laser-Printers/HL-L2445DW`   |
| Brother MFC-L2860DW | MFC-L2860DW  | £310.80 | `/Products/Printers/Laser-Printers/MFC-L2860DW`  |
| **QL-810Wc**        | QL-810Wc     | £139.99 | `/Products/.../Name-Badge-Printers/QL-810Wc`     |
| **QL-820NWBcVM** ⭐ | QL-820NWBcVM | £299.99 | `/Products/.../Name-Badge-Printers/QL-820NWBcVM` |

> ⭐ **Featured Demo Product**: The QL-820NWBcVM is the primary product for the "Business User Event Badge" demo story.

### Personalization Content

- [ ] Create "Welcome back" hero variant
- [ ] Create "Label Printer Interest" banner
- [ ] Create "Business Solutions" targeted content
- [ ] Create "Recently Viewed" component content

---

## Marketing Manager Tasks (Mike)

### CDP Configuration

- [ ] Create "business-prospect" segment
- [ ] Create "label-printer-interest" segment
- [ ] Create "high-intent" segment
- [ ] Configure identity resolution rules

### Personalize Experiences

- [ ] Create returning visitor experience
- [ ] Create product affinity experience
- [ ] Create B2B content experience
- [ ] Set up A/B test for hero CTA

### Analytics

- [ ] Configure quote_request goal
- [ ] Set up conversion funnel
- [ ] Create segment performance report

---

## Products Featured in Demo

From [Brother Name Badge Printers](https://www.brother.co.uk/labelling-and-receipts/name-badge-printers):

| Product             | Price   | Key Features                                        |
| ------------------- | ------- | --------------------------------------------------- |
| **QL-820NWBcVM** ⭐ | £299.99 | USB, Ethernet, Wi-Fi, Bluetooth, visitor management |
| **QL-810Wc**        | £192.00 | USB, Wi-Fi, AirPrint, black & red printing          |
| **QL-820NWB**       | —       | USB, Ethernet, Wi-Fi, Bluetooth, LCD display        |
| **QL-800**          | £126.00 | USB, black & red printing, basic                    |

### Product Specifications (QL-820NWBcVM) ⭐ Primary Demo Product

From [Brother QL-820NWBcVM](https://store.brother.co.uk/devices/label-printer/ql/ql820nwbcvm):

```
Key Features:
- Professional visitor and event badge label printer
- USB, Ethernet, Wi-Fi and Bluetooth connectivity
- Design badges using Brother P-touch Editor (PC/Mac)
- Use iPrint&Label app on tablet for visitor passes
- Compatible with third-party visitor management apps
- Print speed: 110 labels per minute (176mm/sec)
- Resolution: 300 x 600 dpi (high resolution mode)
- Black and red printing capability (with DK-22251)
- Optional rechargeable Li-ion battery base

In the Box:
- Label Printer
- AC Adaptor & Power Cord
- USB Cable
- 3 x DK-N55224 non-adhesive card rolls (30.48m each, ~1000 badges)
- Quick Setup Guide

Dimensions: 125mm (W) x 234mm (D) x 145mm (H)
Weight: 1.16kg

Compatible Labels:
- DK-11234: Adhesive visitor badges (60x86mm, 260/roll) - £37.25
- DK-N55224: Non-adhesive card rolls (30.48m)
- DK-22251: Continuous roll with black/red printing
```

### Product Specifications (QL-810Wc)

```
- USB and Wi-Fi connectivity with AirPrint support
- Print labels up to 62mm wide from PC, smartphone or tablet
- Built-in label editing software
- Print in black and red without needing ink or toner
- Integrated cutter to create custom length labels
- Optional rechargeable Li-ion battery base
```

---

## Status Legend

| Symbol | Meaning                            |
| ------ | ---------------------------------- |
| ✅     | Built-in or Implemented            |
| ⚙️     | Requires integration/configuration |
| 📋     | Content or setup task to complete  |

---

## Next Steps

1. Review and validate all implementation requirements
2. Set up CDP connection and Engage SDK
3. Create segments in Sitecore CDP
4. Build personalization experiences
5. Create content variants
6. Run end-to-end demo test

---

_Document Version: 1.0_  
_Created: December 2025_  
_For: Brother UK Demo Workshop_
