# 01 - Core CMS Functionality

## Overview

Core content management capabilities including user access, security, content editing, and backup/recovery.

---

## 1.1 User Access & Security

| Requirement                            | Sitecore Solution                         | Status      |
| -------------------------------------- | ----------------------------------------- | ----------- |
| Ability to log in and change passwords | Sitecore Cloud Portal + XM Cloud Identity | ✅ Built-in |
| User roles and permissions management  | XM Cloud Security Roles & Workflow        | ✅ Built-in |

### Implementation

**Sitecore Cloud Portal Authentication**

- SSO via Sitecore Cloud Portal
- Role-based access control (RBAC)
- Integration with enterprise identity providers (Azure AD, Okta)

**Available Roles**

```
- Sitecore Admin
- Content Author
- Content Editor
- Content Approver
- Developer
- Custom roles
```

### Documentation

- [XM Cloud Security Overview](https://doc.sitecore.com/xmc/en/developers/xm-cloud/security-in-xm-cloud.html)
- [User Management](https://doc.sitecore.com/xmc/en/users/xm-cloud/manage-users-and-roles.html)
- [Sitecore Accelerate: Security](https://developers.sitecore.com/learn/accelerate/xm-cloud/pre-development/security)

### Demo Tasks

- [ ] Show Cloud Portal login
- [ ] Demonstrate role assignment
- [ ] Show content workflow with approval stages
- [ ] Demonstrate permission restrictions

---

## 1.2 Content Management

| Requirement              | Sitecore Solution             | Status      |
| ------------------------ | ----------------------------- | ----------- |
| Create content           | Pages Editor / Content Editor | ✅ Built-in |
| Edit content             | Inline editing / Form-based   | ✅ Built-in |
| Save content             | Auto-save / Manual save       | ✅ Built-in |
| Publish content          | Publishing workflow           | ✅ Built-in |
| Unpublish content        | Unpublish action              | ✅ Built-in |
| Language versions        | Multi-language content tree   | ✅ Built-in |
| Localisation from master | Shared content with fallback  | ✅ Built-in |

### Pages Editor (WYSIWYG)

```
Features:
- Drag-and-drop component placement
- Inline editing
- Real-time preview
- Device preview (mobile/tablet/desktop)
- Version history
- Compare versions
```

### Content Editor (Advanced)

```
Features:
- Full content tree access
- Bulk operations
- Workflow management
- Media library access
- Raw field editing
- Item versioning
```

### Publishing Options

```
- Publish item
- Publish item and subitems
- Publish related items
- Smart publish (changed items only)
- Scheduled publishing
```

### Documentation

- [Pages Editor](https://doc.sitecore.com/xmc/en/users/xm-cloud/the-pages-editor.html)
- [Content Editing](https://doc.sitecore.com/xmc/en/users/xm-cloud/edit-content.html)
- [Publishing Content](https://doc.sitecore.com/xmc/en/users/xm-cloud/publish-content.html)
- [Version Management](https://doc.sitecore.com/xmc/en/users/xm-cloud/version-management.html)
- [Sitecore Accelerate: Content Authoring](https://developers.sitecore.com/learn/accelerate/xm-cloud/implementation/content-authoring)

### Demo Tasks

- [ ] Create a new page in Pages Editor
- [ ] Add components via drag-and-drop
- [ ] Edit content inline
- [ ] Save and preview changes
- [ ] Publish content
- [ ] View version history
- [ ] Compare versions

---

## 1.3 Backup & Recovery

| Requirement       | Sitecore Solution                | Status      |
| ----------------- | -------------------------------- | ----------- |
| Regular backups   | XM Cloud managed backups         | ✅ Built-in |
| Restore content   | Content serialization + rollback | ✅ Built-in |
| Disaster recovery | XM Cloud infrastructure          | ✅ Built-in |

### XM Cloud Backup Strategy

```
Automated features:
- Daily automated backups
- Point-in-time recovery
- Geo-redundant storage
- 30-day retention
```

### Sitecore Content Serialization (SCS)

```powershell
# Serialize content to source control
dotnet sitecore ser pull

# Push content from source control
dotnet sitecore ser push

# Validate serialization
dotnet sitecore ser validate
```

### Version Control Integration

```yaml
# Content stored as YAML files
# Example: authoring/items/industry-verticals/sites/brother/
---
ID: "{GUID}"
Template: "Page Template"
Path: "/sitecore/content/brother/Home"
Fields:
  - Title: "Welcome to Brother"
```

### Documentation

- [Backup and Recovery](https://doc.sitecore.com/xmc/en/developers/xm-cloud/backup-and-recovery.html)
- [Content Serialization](https://doc.sitecore.com/xmc/en/developers/xm-cloud/serialization-in-sitecore.html)
- [Sitecore CLI](https://doc.sitecore.com/xmc/en/developers/xm-cloud/sitecore-command-line-interface.html)
- [Sitecore Accelerate: DevOps](https://developers.sitecore.com/learn/accelerate/xm-cloud/pre-development/developer-experience/devops)

### Demo Tasks

- [ ] Show serialization folder structure
- [ ] Run `sitecore ser pull`
- [ ] Show YAML content files
- [ ] Demonstrate version rollback

---

## Brother Site Implementation

### Content Tree Structure

```
/sitecore/content/industry-verticals/brother/
├── Home
├── Products
│   ├── Printers
│   ├── Scanners
│   └── Labelling
├── Business Solutions
├── Support
├── About
├── Data
├── Dictionary
└── Settings
```

### Workflow Configuration

```
Draft → Review → Approved → Published
  ↓        ↓         ↓
Reject  Reject   Unpublish
```

---

## Next Steps

→ Continue to [02-multilingual.md](./02-multilingual.md)
