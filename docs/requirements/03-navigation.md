# 03 - Site Navigation & Structure

## Overview

Header, footer, navigation menus, responsive design, and automated content tagging.

---

## Requirements

| Requirement | Sitecore Solution | Status |
|-------------|-------------------|--------|
| Editable top navigation | Header component with placeholders | ✅ Brother variant |
| Editable footer | Footer component with placeholders | ✅ Brother variant |
| Add links, images, social icons | Link List, Image, SocialFollow | ✅ Available |
| Responsive design | Tailwind CSS responsive | ✅ Implemented |
| Automated content tagging | XM Cloud taxonomy | ✅ Built-in |

---

## 3.1 Header Component

### Brother Header Variant

```typescript
// Location: src/components/header/Header.tsx
// Variant: Brother

Features:
├── EcoPro Banner (green bar)
│   └── Subscription promotion
├── Top Bar
│   └── Utility links (placeholder)
├── Main Header
│   ├── Logo
│   ├── Search Bar
│   ├── Sign In
│   └── Cart
└── Navigation Bar
    └── Mega menu (placeholder)
```

### Configuration in Sitecore

```
/sitecore/content/brother/
├── Data/
│   └── Navigation/
│       ├── Main Navigation
│       ├── Top Bar Links
│       └── Utility Links
└── Settings/
    └── Header Settings
        ├── Logo
        ├── EcoPro Text
        └── Search Placeholder
```

### Placeholders

| Placeholder | Purpose |
|-------------|---------|
| `header-top-bar-{id}` | Top utility links |
| `header-nav-{id}` | Main navigation |
| `header-right-{id}` | Cart, user actions |

---

## 3.2 Footer Component

### Brother Footer Variant

```typescript
// Location: src/components/footer/Footer.tsx
// Variant: Brother

Features:
├── Main Footer (dark theme)
│   ├── Column 1: Learn More About
│   ├── Column 2: Ways to Buy
│   ├── Column 3: Help and Support
│   ├── Column 4: About Brother
│   └── Column 5: Resources + Social Icons
└── Footer Bottom
    ├── Country/Region Selector
    ├── Legal Links
    └── Copyright
```

### Fields

| Field | Type | Purpose |
|-------|------|---------|
| TitleOne - TitleFive | Text | Column headings |
| CopyrightText | Text | Copyright notice |
| CompanyInfo | Text | Company address |
| Logo | Image | Footer logo |
| SocialLinks | Link fields | Facebook, Twitter, etc. |

### Placeholders

| Placeholder | Purpose |
|-------------|---------|
| `footer-list-first-{id}` | First column links |
| `footer-list-second-{id}` | Second column links |
| `footer-list-third-{id}` | Third column links |
| `footer-list-fourth-{id}` | Fourth column links |
| `footer-list-fifth-{id}` | Fifth column links |

---

## 3.3 Navigation Component

### Features

```typescript
// Location: src/components/navigation/Navigation.tsx

Features:
- Hierarchical menu structure
- Dropdown submenus
- Mobile hamburger menu
- Logo integration
- Active state highlighting
```

### Navigation Data Structure

```
Navigation Item
├── Title
├── Link
├── Children[]
│   ├── Title
│   ├── Link
│   └── Children[] (nested)
└── Styles
```

### Mega Menu (for Brother)

```
Products (hover)
└── Mega Menu Panel
    ├── Column: Printers
    │   ├── Business printers
    │   ├── Laser printers
    │   └── All-in-one printers
    ├── Column: Scanners
    │   ├── Portable scanners
    │   └── Desktop scanners
    └── Promo: EcoPro Banner
```

---

## 3.4 Breadcrumb Component

```typescript
// Location: src/components/breadcrumb/Breadcrumb.tsx

Features:
- Auto-generated from content tree
- Customizable separator
- Home link
- Current page (no link)
```

### Example

```
Home > Products > Printers > Laser Printers
```

---

## 3.5 Responsive Design

### Tailwind CSS Breakpoints

```css
/* Mobile first approach */
sm: 640px   /* Small devices */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

### Mobile Navigation

```typescript
// Header.tsx - Mobile menu
<nav className={clsx(
  'lg:hidden fixed inset-0 top-[140px] bg-white',
  mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
)}>
```

### Responsive Classes Used

```css
/* Examples from Brother components */
.container          /* Max-width container */
.hidden lg:block    /* Hide on mobile, show on desktop */
.lg:hidden          /* Show on mobile, hide on desktop */
.grid-cols-1 md:grid-cols-2 lg:grid-cols-3  /* Responsive grid */
```

---

## 3.6 Content Tagging

### Taxonomy Structure

```
/sitecore/content/brother/Data/Taxonomy/
├── Product Categories
│   ├── Printers
│   ├── Scanners
│   └── Labelling
├── Industries
│   ├── Healthcare
│   ├── Retail
│   └── Manufacturing
└── Content Types
    ├── News
    ├── Blog
    └── Support
```

### Tag Assignment

```
Content Item
└── Tags field (multilist)
    ├── Printers
    ├── Business
    └── News
```

### Documentation

- [SXA Navigation](https://doc.sitecore.com/xmc/en/developers/xm-cloud/navigation-in-sxa.html)
- [Partial Designs](https://doc.sitecore.com/xmc/en/developers/xm-cloud/partial-designs.html)
- [Taxonomy](https://doc.sitecore.com/xmc/en/developers/xm-cloud/taxonomy.html)
- [Sitecore Accelerate: Navigation](https://developers.sitecore.com/learn/accelerate/xm-cloud/implementation/navigation)

---

## Demo Tasks

- [ ] Show header with Brother variant
- [ ] Edit navigation in Pages Editor
- [ ] Add new menu item
- [ ] Update footer links
- [ ] Add social media icon
- [ ] Show responsive behavior (mobile/desktop)
- [ ] Demonstrate breadcrumb navigation

---

## Brother Site Implementation

### Header Configuration

```
Rendering: Header
Variant: Brother
Placeholders:
  - header-top-bar: LinkList (utility links)
  - header-nav: Navigation (main menu)
  - header-right: NavigationIcons (cart, user)
```

### Footer Configuration

```
Rendering: Footer
Variant: Brother
Fields:
  - TitleOne: "Learn More About"
  - TitleTwo: "Ways to Buy"
  - TitleThree: "Help and Support"
  - TitleFour: "About Brother"
  - TitleFive: "Resources"
  - CopyrightText: "© 1995-2025 Brother UK Ltd"
```

---

## Next Steps

→ Continue to [04-search.md](./04-search.md)


