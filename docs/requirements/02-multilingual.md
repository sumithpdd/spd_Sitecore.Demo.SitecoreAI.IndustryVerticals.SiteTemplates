# 02 - Multilingual & Localisation Support

## Overview

Multi-language content management, localisation workflows, and multi-site content distribution.

---

## Requirements

| Requirement | Sitecore Solution | Status |
|-------------|-------------------|--------|
| Change site language | Language switcher component | ✅ Available |
| Load localised pages | Multi-language routing | ✅ Built-in |
| Create language versions centrally | Shared content with fallback | ✅ Built-in |
| Push content to multiple sites | Multi-site architecture | ✅ Built-in |

---

## 2.1 Language Configuration

### Site Languages

```typescript
// sitecore.config.ts
const config = {
  siteName: 'brother',
  defaultLanguage: 'en',
  // Supported languages for Brother UK
  supportedLanguages: [
    'en',      // English (default)
    'en-GB',   // British English
    'de',      // German
    'fr',      // French
    'es',      // Spanish
    'it',      // Italian
    'nl',      // Dutch
  ],
  languageFallback: true
};
```

### Language Fallback Chain

```
Request: /de/products/printers
  ↓
1. Check de version → Found? → Return
  ↓ Not found
2. Check en version (fallback) → Found? → Return
  ↓ Not found
3. Return 404
```

### Documentation

- [Multi-language Sites](https://doc.sitecore.com/xmc/en/developers/xm-cloud/multi-language-sites.html)
- [Language Fallback](https://doc.sitecore.com/xmc/en/developers/xm-cloud/language-fallback.html)
- [Sitecore Accelerate: Localization](https://developers.sitecore.com/learn/accelerate/xm-cloud/implementation/localization)

---

## 2.2 Language Switcher Component

### Brother Implementation

```typescript
// Component: LanguageSwitcher
// Location: src/components/language-switcher/LanguageSwitcher.tsx

Features:
- Dropdown or inline display
- Current language indicator
- Available languages from Sitecore
- URL preservation on switch
```

### Usage in Pages

```
Header → LanguageSwitcher component
- Displays country flag + language code
- Links to same page in different language
- Respects language availability
```

---

## 2.3 Creating Language Versions

### In Pages Editor

```
1. Open page in Pages Editor
2. Click language selector (top bar)
3. Select "Add language version"
4. Choose target language
5. Content copies from source
6. Edit and translate
7. Publish language version
```

### In Content Editor

```
1. Navigate to item
2. Versions tab → Add version
3. Select language
4. Edit fields
5. Save and publish
```

### Shared vs Unversioned Fields

```
Shared fields (same across all languages):
- Template structure
- Layout assignments
- Internal links

Versioned fields (different per language):
- Title
- Description
- Body content
- Images with text
```

---

## 2.4 Central Content Management

### Multi-Site Content Sharing

```
/sitecore/content/
├── Shared/                    # Shared across all sites
│   ├── Global Navigation
│   ├── Footer Links
│   └── Legal Content
├── industry-verticals/
│   ├── brother/              # Brother UK
│   ├── brother-de/           # Brother Germany (clone)
│   └── brother-fr/           # Brother France (clone)
```

### Content Cloning Strategy

```
Option 1: Clone entire site
- Use Sitecore AI Clone a Site
- Separate content trees
- Independent publishing

Option 2: Shared content with language versions
- Single content tree
- Multiple language versions
- Shared publishing
```

### Documentation

- [Multi-site Architecture](https://doc.sitecore.com/xmc/en/developers/xm-cloud/multi-site-architecture.html)
- [Clone a Site (Sitecore AI)](https://doc.sitecore.com/sai/en/developers/sitecoreai/clone-a-site.html)
- [Shared Content](https://doc.sitecore.com/xmc/en/developers/xm-cloud/shared-content.html)

---

## 2.5 Translation Workflows

### Manual Translation

```
1. Export content for translation
2. Send to translation agency
3. Import translated content
4. Review and approve
5. Publish
```

### Sitecore AI Translation

```
Features:
- AI-powered translation suggestions
- Translation memory
- Glossary management
- Inline translation in Pages Editor
```

### Translation Connectors

```
Supported providers:
- SDL Trados
- Lionbridge
- Smartling
- Memsource
- Custom API connectors
```

### Documentation

- [Sitecore AI Translation](https://doc.sitecore.com/sai/en/developers/sitecoreai/translation.html)
- [Translation Connectors](https://doc.sitecore.com/xmc/en/developers/xm-cloud/translation-connectors.html)

---

## Demo Tasks

- [ ] Show language switcher on Brother site
- [ ] Create content in English (master)
- [ ] Add German language version
- [ ] Use AI to generate translation
- [ ] Review and approve translation
- [ ] Test language fallback behavior
- [ ] Show multi-site content sharing

---

## Brother Site Implementation

### Current Languages

| Language | Code | Status |
|----------|------|--------|
| English | en | ✅ Default |
| British English | en-GB | ⚙️ To add |
| German | de | ⚙️ To add |
| French | fr | ⚙️ To add |

### Language Switcher Location

```
Header component (Brother variant)
└── Top bar
    └── Country/Language selector
        └── 🇬🇧 UK | 🇩🇪 DE | 🇫🇷 FR
```

---

## Next Steps

→ Continue to [03-navigation.md](./03-navigation.md)


