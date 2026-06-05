# CDP Profile Panel Component

A React component that displays Sitecore CDP (Customer Data Platform) guest information, events, and affinity data in a side panel. This is a demo tool for workshops to visualize visitor data in real-time.

## Features

- **User Information**: Displays guest reference, email, name, and identifiers
- **Current Session**: Shows active web session details
- **Recent Events**: Lists recent visitor events (page views, interactions, etc.)
- **Data Extensions**: Displays custom data extensions and affinity data
- **Browser Information**: Shows browser ID and current page context

## Usage

The component is automatically included in the default footer. It appears as a floating button in the bottom-right corner.

### Environment Variables

Add these to your `.env.local` file to enable live CDP data:

```env
# Sitecore CDP Configuration
NEXT_PUBLIC_SITECORE_CDP_CLIENT_KEY=your-client-key
NEXT_PUBLIC_SITECORE_CDP_API_TARGET=https://api.boxever.com/v2
NEXT_PUBLIC_SITECORE_CDP_API_AUTH=Basic your-base64-auth-string
```

**Note:** If these variables are not set, the component will display demo/mock data for demonstration purposes.

### Manual Integration

To use the component elsewhere:

```tsx
import CdpProfilePanel from '@/components/cdp-profile-panel/CdpProfilePanel';

<CdpProfilePanel
  clientKey={process.env.NEXT_PUBLIC_SITECORE_CDP_CLIENT_KEY}
  apiTarget={process.env.NEXT_PUBLIC_SITECORE_CDP_API_TARGET}
  apiAuth={process.env.NEXT_PUBLIC_SITECORE_CDP_API_AUTH}
/>;
```

## How It Works

1. **Browser ID Detection**: The component retrieves the browser ID from Sitecore Cloud SDK cookies or generates one
2. **Guest Context Fetching**: Uses the Sitecore CDP REST API to fetch guest context data
3. **Data Display**: Shows information in collapsible sections with copy-to-clipboard functionality

## API Endpoints

The component uses the Sitecore CDP Interactive API:

- **Guest Context**: `GET /v2/guestContexts/{guestRef}?expand=items.sessions(offset:0,limit:50)`

## Browser Support

- Modern browsers with ES6+ support
- Requires `navigator.clipboard` API for copy functionality (fallback available)

## Related Documentation

- [Sitecore Cloud SDK for JavaScript](https://doc.sitecore.com/sdk/en/developers/005/cloud-sdk/sitecore-cloud-sdk-for-javascript.html)
- [Sitecore CDP API Documentation](https://doc.sitecore.com/cdp/en/developers/api/)

## Demo Mode

When CDP credentials are not configured, the component operates in demo mode with mock data, making it perfect for workshops and demonstrations.
