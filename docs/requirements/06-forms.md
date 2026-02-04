# 06 - Forms & Data Collection

## Overview

Form creation, data collection, integrations with external systems, and GDPR compliance.

---

## Requirements

| Requirement | Sitecore Solution | Status |
|-------------|-------------------|--------|
| Form creation | Sitecore Forms / Custom React forms | ✅ Available |
| CRM integration | Custom connectors | ⚙️ Configurable |
| Contact data capture | Form submissions | ✅ Available |
| GDPR compliance | Consent management | ⚙️ Configurable |
| Form validation | Client + server side | ✅ Built-in |
| Conditional logic | Multi-step forms | ⚙️ Custom dev |

---

## 6.1 Sitecore Forms

### Overview

```
Sitecore Forms provides:
├── Visual form designer
├── Field types library
├── Validation rules
├── Submit actions
├── Multi-page forms
└── Analytics integration
```

### Field Types

| Type | Description |
|------|-------------|
| Single-line text | Text input |
| Multi-line text | Textarea |
| Email | Email validation |
| Number | Numeric input |
| Date | Date picker |
| Dropdown list | Select options |
| Checkbox list | Multiple selection |
| Radio buttons | Single selection |
| File upload | Document upload |
| Hidden | Tracking fields |

### Submit Actions

| Action | Description |
|--------|-------------|
| Save Data | Store in Sitecore |
| Send Email | Email notification |
| Redirect | Navigate to page |
| Trigger Goal | Analytics event |
| Custom | API call |

### Documentation

- [Sitecore Forms](https://doc.sitecore.com/xmc/en/developers/xm-cloud/sitecore-forms.html)
- [Custom Submit Actions](https://doc.sitecore.com/xmc/en/developers/xm-cloud/custom-form-submit-actions.html)

---

## 6.2 Contact Form Component

### Brother Implementation

```typescript
// Location: src/components/contact-form/ContactForm.tsx

Fields:
├── First Name *
├── Last Name *
├── Email *
├── Phone
├── Company
├── Subject *
├── Message *
├── GDPR Consent *
└── Marketing Opt-in
```

### Usage

```jsx
<ContactForm
  fields={{
    Heading: { value: "Contact Us" },
    Description: { value: "We'd love to hear from you" },
    SubmitButtonText: { value: "Send Message" },
    SuccessMessage: { value: "Thank you for your enquiry" }
  }}
/>
```

### Validation

```typescript
const validationRules = {
  firstName: { required: true, minLength: 2 },
  lastName: { required: true, minLength: 2 },
  email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  subject: { required: true },
  message: { required: true, minLength: 10 },
  gdprConsent: { required: true }
};
```

---

## 6.3 Newsletter Subscription

### Subscribe Component

```typescript
// Location: src/components/subscribe/Subscribe.tsx

Features:
├── Email field
├── Consent checkbox
├── Submit button
├── Success/error states
└── Integration endpoint
```

### Integration

```typescript
// API endpoint
const handleSubscribe = async (email: string) => {
  await fetch('/api/subscribe', {
    method: 'POST',
    body: JSON.stringify({ 
      email, 
      source: 'brother-uk',
      lists: ['newsletter', 'promotions']
    })
  });
};
```

---

## 6.4 CRM Integration

### Salesforce

```typescript
// Submit action: Salesforce Lead
{
  type: 'salesforce',
  action: 'createLead',
  mapping: {
    firstName: 'FirstName',
    lastName: 'LastName',
    email: 'Email',
    company: 'Company',
    subject: 'Description'
  }
}
```

### Microsoft Dynamics

```typescript
// Submit action: Dynamics Contact
{
  type: 'dynamics365',
  action: 'createContact',
  mapping: {
    firstName: 'firstname',
    lastName: 'lastname',
    email: 'emailaddress1',
    phone: 'telephone1'
  }
}
```

### Generic Webhook

```typescript
// Submit action: Webhook
{
  type: 'webhook',
  url: 'https://api.brother.co.uk/crm/leads',
  method: 'POST',
  headers: {
    'Authorization': 'Bearer {token}',
    'Content-Type': 'application/json'
  }
}
```

---

## 6.5 GDPR Compliance

### Consent Management

```typescript
// Required fields
interface ConsentFields {
  gdprConsent: boolean;        // Required for processing
  marketingEmail: boolean;     // Optional
  marketingPhone: boolean;     // Optional
  marketingPost: boolean;      // Optional
  dataSharingThirdParty: boolean; // Optional
}
```

### Privacy Text

```
We use the information you submit here 
in line with our privacy policy. Please 
read our privacy policy for more details 
on how we process your data.

☑ I agree to the processing of my data 
  for the purposes described *

☐ I would like to receive marketing 
  communications via email

☐ I would like to receive marketing 
  communications via phone
```

### Data Retention

```
Form submission data retention:
- Contact enquiries: 2 years
- Newsletter signups: Until unsubscribe
- Marketing consents: Audit trail maintained
```

### Right to Erasure

```
Process for data deletion:
1. User submits request
2. Identify all data stores
3. Remove personal data
4. Confirm deletion
5. Maintain erasure record
```

---

## 6.6 Form Analytics

### Tracking Metrics

```
- Form views
- Form starts
- Form completions
- Abandonment rate
- Field completion times
- Error frequency
```

### Integration with Sitecore

```typescript
// Track form events
analytics.track('form_start', { formName: 'contact' });
analytics.track('form_complete', { formName: 'contact' });
analytics.track('form_error', { field: 'email', error: 'invalid' });
```

---

## Demo Tasks

- [ ] Show contact form on Brother site
- [ ] Complete form fields
- [ ] Demonstrate validation
- [ ] Submit form
- [ ] Show success message
- [ ] View form submissions (Sitecore)
- [ ] Demonstrate GDPR consent capture

---

## Brother Forms Implementation

### Contact Form Locations

| Page | Form | Purpose |
|------|------|---------|
| /contact | Contact Form | General enquiries |
| /support | Support Form | Technical help |
| /business | Quote Request | B2B leads |
| Footer | Subscribe | Newsletter |

### Form Endpoints

```
POST /api/forms/contact
POST /api/forms/support
POST /api/forms/quote
POST /api/forms/subscribe
```

---

## Next Steps

→ Continue to [07-content-types.md](./07-content-types.md)


