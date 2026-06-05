'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Info,
  X,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Eye,
  RefreshCw,
  User,
  Target,
  Megaphone,
  ShoppingCart,
  UserPlus,
} from 'lucide-react';

interface GuestData {
  ref?: string;
  identifiers?: Array<{ provider: string; id: string }>;
  email?: string;
  firstName?: string;
  lastName?: string;
  sessions?: Array<{
    ref: string;
    channel: string;
    status: string;
    events?: Array<{
      type: string;
      createdAt: string;
      arbitraryData?: Record<string, unknown>;
    }>;
  }>;
  ext?: Record<string, unknown>;
}

interface CdpProfilePanelProps {
  clientKey?: string;
  apiTarget?: string;
  apiAuth?: string;
}

// Helper function to create mock guest data
const createMockGuestData = (browserId: string | null): GuestData => ({
  ref: browserId || 'demo_guest',
  identifiers: [{ provider: 'SITECORE_ID', id: browserId || 'demo_id' }],
  email: 'demo@example.com',
  firstName: 'Demo',
  lastName: 'User',
  sessions: [
    {
      ref: 'session_1',
      channel: 'WEB',
      status: 'OPEN',
      events: [
        {
          type: 'VIEW',
          createdAt: new Date().toISOString(),
          arbitraryData: {
            page:
              typeof window !== 'undefined'
                ? window.location.pathname
                : '/Products/Labelling-and-Receipts/QL-810Wc',
            product: 'QL-810Wc',
            productName: 'QL-810Wc Wireless Label Printer',
            category: 'Labelling and Receipts',
          },
        },
      ],
    },
  ],
  ext: {
    brand: {
      SitecoreSilver: '1.000',
    },
    category_names: {
      'Labelling and Receipts': '1.000',
    },
    product_type: {
      'Wireless Label Printer': '1.000',
    },
    product_sku: {
      'QL-810Wc': '1.000',
    },
    features: {
      WiFi: '1.000',
      'Professional Printing': '0.800',
      'Name Badges': '0.750',
      'Shipping Labels': '0.700',
      'Two-colour Printing': '0.650',
    },
    use_cases: {
      Events: '0.800',
      'Visitor Management': '0.750',
      Retail: '0.700',
      'Conference Badges': '0.750',
      'Asset Labelling': '0.650',
    },
    connectivity: {
      WiFi: '1.000',
      USB: '0.900',
      AirPrint: '0.850',
    },
  },
});

/**
 * CDP Profile Panel Component
 *
 * Displays Sitecore CDP guest information, events, and affinity data in a side panel.
 * This is a demo tool for workshops to visualize visitor data.
 *
 * @see https://doc.sitecore.com/sdk/en/developers/005/cloud-sdk/sitecore-cloud-sdk-for-javascript.html
 */
export const CdpProfilePanel = ({
  clientKey,
  apiTarget = 'https://api.boxever.com/v2',
  apiAuth,
}: CdpProfilePanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [guestData, setGuestData] = useState<GuestData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Get browser ID from Sitecore Cloud SDK cookie
  const getBrowserId = useCallback((): string | null => {
    if (typeof window === 'undefined') return null;

    // Try to get from Sitecore Cloud SDK cookie
    const cookieMap = Object.fromEntries(
      document.cookie.split(';').map((c) => c.trim().split('='))
    );
    const cookieId = cookieMap['_boxever_browser_id'] || cookieMap['sitecore_cloud_sdk_browser_id'];
    if (cookieId) return cookieId;

    // Fallback: try to get from localStorage or generate
    const storedId = localStorage.getItem('sitecore_browser_id');
    if (storedId) return storedId;

    // Generate a new ID if none exists
    const newId = `browser_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    localStorage.setItem('sitecore_browser_id', newId);
    return newId;
  }, []);

  // Fetch guest context from Sitecore CDP
  const fetchGuestData = useCallback(async () => {
    const browserId = getBrowserId();

    if (!browserId) {
      setGuestData(createMockGuestData(null));
      setIsLoading(false);
      return;
    }

    // Check if we have proper API credentials configured (not undefined and not empty string)
    const hasApiCredentials =
      clientKey &&
      clientKey.trim() !== '' &&
      apiAuth &&
      apiAuth.trim() !== '' &&
      apiTarget &&
      apiTarget.trim() !== '';

    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[CDP Profile Panel] Credentials check:', {
        hasClientKey: !!clientKey && clientKey.trim() !== '',
        hasApiAuth: !!apiAuth && apiAuth.trim() !== '',
        hasApiTarget: !!apiTarget && apiTarget.trim() !== '',
        hasApiCredentials,
      });
    }

    if (!hasApiCredentials) {
      // Demo mode - show mock data silently
      setGuestData(createMockGuestData(browserId));
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const guestRef = localStorage.getItem('sitecore_guest_ref') || browserId;
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(apiAuth && { Authorization: apiAuth }),
      };

      const response = await fetch(
        `${apiTarget}/guestContexts/${guestRef}?expand=items.sessions(offset:0,limit:50)&source=all&timeout=30000`,
        { method: 'GET', headers }
      );

      if (!response.ok) {
        // 404 means guest doesn't exist yet, which is normal - use demo data
        if (response.status === 404) {
          setGuestData(createMockGuestData(browserId));
          setIsLoading(false);
          return;
        }
        // For other errors, throw to be caught below
        throw new Error(`Failed to fetch guest data: ${response.status} ${response.statusText}`);
      }

      setGuestData(await response.json());
    } catch (err) {
      // Only log unexpected errors (not network/CORS issues which are common in demo mode)
      if (err instanceof TypeError && err.message.includes('fetch')) {
        // Network/CORS error - silently fall back to demo data
        setGuestData(createMockGuestData(browserId));
      } else {
        // Other errors - log but still show demo data
        console.warn(
          'CDP API error (using demo data):',
          err instanceof Error ? err.message : 'Unknown error'
        );
        setError('CDP API unavailable - showing demo data');
        setGuestData(createMockGuestData(browserId));
      }
    } finally {
      setIsLoading(false);
    }
  }, [getBrowserId, clientKey, apiTarget, apiAuth]);

  // Load data when panel opens
  useEffect(() => {
    if (isOpen && !guestData && !isLoading) {
      fetchGuestData();
    }
  }, [isOpen, guestData, isLoading, fetchGuestData]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) {
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  };

  const copyToClipboard = async (text: string, fieldId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldId);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const currentSession = guestData?.sessions?.find(
    (s) => s.channel === 'WEB' && s.status === 'OPEN'
  );
  const recentEvents = currentSession?.events?.slice(0, 10) || [];

  // Calculate metrics
  const pagesSeen = recentEvents.filter((e) => e.type === 'VIEW').length || 1;
  const visitCount = guestData?.sessions?.length || 1;
  const isFirstVisit = visitCount === 1;
  const cdpId = guestData?.ref || getBrowserId() || 'N/A';

  // Extract affinity data from ext field
  const affinityData = guestData?.ext || {};

  // Simulate identity event
  const simulateIdentityEvent = useCallback(async () => {
    try {
      const browserId = getBrowserId();
      if (!browserId || !clientKey) {
        console.warn('Cannot simulate event: Missing credentials');
        return;
      }

      const eventData = {
        channel: 'WEB',
        type: 'IDENTITY',
        browserId: browserId,
        pos: window.location.href,
        language: navigator.language,
        currency: 'USD',
        page: window.location.pathname,
        referrer: document.referrer || '',
      };

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(apiAuth && { Authorization: apiAuth }),
      };

      const response = await fetch(`${apiTarget}/events/v2`, {
        method: 'POST',
        headers,
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        console.log('Identity event sent successfully');
        // Refresh guest data
        fetchGuestData();
      } else {
        console.warn('Failed to send identity event:', response.statusText);
      }
    } catch (err) {
      console.error('Error simulating identity event:', err);
    }
  }, [getBrowserId, clientKey, apiTarget, apiAuth, fetchGuestData]);

  // Simulate cart event
  const simulateCartEvent = useCallback(async () => {
    try {
      const browserId = getBrowserId();
      if (!browserId || !clientKey) {
        console.warn('Cannot simulate event: Missing credentials');
        return;
      }

      const eventData = {
        channel: 'WEB',
        type: 'ADD',
        browserId: browserId,
        pos: window.location.href,
        language: navigator.language,
        currency: 'USD',
        page: window.location.pathname,
        cart: {
          total: 99.99,
          currency: 'USD',
          items: [
            {
              productId: 'demo-product-123',
              sku: 'DEMO-SKU-123',
              quantity: 1,
              price: 99.99,
            },
          ],
        },
      };

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(apiAuth && { Authorization: apiAuth }),
      };

      const response = await fetch(`${apiTarget}/events/v2`, {
        method: 'POST',
        headers,
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        console.log('Cart event sent successfully');
        // Refresh guest data
        fetchGuestData();
      } else {
        console.warn('Failed to send cart event:', response.statusText);
      }
    } catch (err) {
      console.error('Error simulating cart event:', err);
    }
  }, [getBrowserId, clientKey, apiTarget, apiAuth, fetchGuestData]);

  return (
    <>
      {/* Toggle Button - Fixed position (Square teal button) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-6 bottom-6 z-50 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-500 text-white shadow-lg transition-all hover:scale-105 hover:bg-teal-600"
        aria-label={isOpen ? 'Close profile panel' : 'Open profile panel'}
        title="Engagement"
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
            <Info className="h-5 w-5 text-teal-500" />
          </div>
        )}
      </button>

      {/* Side Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Panel */}
          <div className="fixed top-0 right-0 z-50 h-full w-full max-w-2xl overflow-y-auto bg-white shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-teal-500 px-6 py-4 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Engagement</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Eye className="h-5 w-5" />
                    <span className="text-sm font-medium">{pagesSeen}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <RefreshCw className="h-5 w-5" />
                    <span className="text-sm font-medium">{visitCount}</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="ml-2 rounded p-1 transition-colors hover:bg-white/20"
                    aria-label="Close panel"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {isLoading && (
                <div className="py-12 text-center">
                  <div className="border-accent mx-auto h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
                  <p className="text-foreground-muted mt-4 text-sm">Loading guest data...</p>
                </div>
              )}

              {error && (
                <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800">
                  <p className="font-semibold">Error</p>
                  <p>{error}</p>
                  <p className="mt-2 text-xs text-red-600">
                    Using demo data. Configure CDP API credentials for live data.
                  </p>
                </div>
              )}

              {guestData && !isLoading && (
                <div className="space-y-4">
                  {/* CDP ID and Affinity */}
                  <div className="space-y-4 rounded-lg border bg-white p-6">
                    {/* CDP ID */}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        CDP ID:
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value={cdpId}
                          className="flex-1 rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm"
                        />
                        <button
                          onClick={() => copyToClipboard(cdpId, 'field-cdp-id')}
                          className="rounded p-2 transition-colors hover:bg-gray-100"
                          aria-label="Copy CDP ID"
                          title="Copy CDP ID"
                        >
                          {copiedField === 'field-cdp-id' ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Copy className="h-4 w-4 text-gray-600" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Affinity Data */}
                    {Object.keys(affinityData).length > 0 && (
                      <div>
                        <label className="mb-3 block text-sm font-medium text-gray-700">
                          Affinity:
                        </label>
                        <div className="space-y-3">
                          {Object.entries(affinityData).map(([key, value]) => (
                            <div key={key} className="rounded border border-gray-200">
                              <div className="border-b bg-gray-100 px-3 py-2 text-xs font-medium text-gray-700">
                                {key}:
                              </div>
                              <div className="p-3">
                                {typeof value === 'object' && value !== null ? (
                                  <div className="space-y-1">
                                    {Object.entries(value as Record<string, unknown>).map(
                                      ([subKey, subValue]) => (
                                        <div key={subKey} className="flex justify-between text-sm">
                                          <span className="text-gray-700">{subKey}:</span>
                                          <span className="font-medium text-gray-900">
                                            {String(subValue)}
                                          </span>
                                        </div>
                                      )
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-sm text-gray-900">{String(value)}</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="border-t pt-4">
                      <label className="mb-3 block text-sm font-medium text-gray-700">
                        Simulate Events:
                      </label>
                      <div className="flex gap-3">
                        <button
                          onClick={simulateIdentityEvent}
                          className="flex items-center gap-2 rounded bg-teal-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600"
                        >
                          <UserPlus className="h-4 w-4" />
                          Identity Event
                        </button>
                        <button
                          onClick={simulateCartEvent}
                          className="flex items-center gap-2 rounded bg-teal-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Cart Event
                        </button>
                      </div>
                    </div>

                    {/* Visit Info */}
                    <div className="space-y-2 border-t pt-4">
                      <div>
                        <span className="text-sm text-gray-600">Pages seen in this visit: </span>
                        <span className="text-sm font-semibold">{pagesSeen}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Current Page: </span>
                        <span className="text-sm font-semibold">
                          {typeof window !== 'undefined'
                            ? window.location.pathname.split('/').pop() || 'Home'
                            : 'Home'}{' '}
                          -
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Visits to the site:</span>
                      </div>
                      {isFirstVisit && (
                        <div className="rounded border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">
                          This is your first visit to the site.
                        </div>
                      )}
                      {!isFirstVisit && (
                        <div className="text-sm text-gray-700">
                          You have visited this site {visitCount} time{visitCount !== 1 ? 's' : ''}.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Personal Information */}
                  <Section
                    title="Personal Information"
                    id="user"
                    icon={<User className="h-5 w-5" />}
                    isExpanded={expandedSections.has('user')}
                    onToggle={() => toggleSection('user')}
                  >
                    <Property
                      label="Guest Reference"
                      value={guestData.ref}
                      onCopy={copyToClipboard}
                      copiedFieldId={copiedField}
                    />
                    <Property
                      label="Email"
                      value={guestData.email}
                      onCopy={copyToClipboard}
                      copiedFieldId={copiedField}
                    />
                    <Property
                      label="First Name"
                      value={guestData.firstName}
                      onCopy={copyToClipboard}
                      copiedFieldId={copiedField}
                    />
                    <Property
                      label="Last Name"
                      value={guestData.lastName}
                      onCopy={copyToClipboard}
                      copiedFieldId={copiedField}
                    />
                    {guestData.identifiers && guestData.identifiers.length > 0 && (
                      <div className="mt-2">
                        <label className="text-foreground-light text-sm font-medium">
                          Identifiers:
                        </label>
                        <div className="mt-1 space-y-1">
                          {(guestData.identifiers || []).map((id, idx) => (
                            <div
                              key={`${id.provider}-${id.id}-${idx}`}
                              className="bg-background-muted rounded p-2 text-xs"
                            >
                              <span className="font-medium">{id.provider}:</span> {id.id}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </Section>

                  {/* Onsite Behavior */}
                  {recentEvents.length > 0 && (
                    <Section
                      title="Onsite Behavior"
                      id="events"
                      icon={<Target className="h-5 w-5" />}
                      isExpanded={expandedSections.has('events')}
                      onToggle={() => toggleSection('events')}
                    >
                      <div className="space-y-2">
                        {recentEvents.map((event, idx) => (
                          <div
                            key={`${event.type}-${event.createdAt}-${idx}`}
                            className="bg-background-muted rounded border p-3"
                          >
                            <div className="flex-1">
                              <div className="text-foreground font-medium">{event.type}</div>
                              <div className="text-foreground-muted mt-1 text-xs">
                                {new Date(event.createdAt).toLocaleString()}
                              </div>
                              {event.arbitraryData &&
                                Object.keys(event.arbitraryData).length > 0 && (
                                  <details className="mt-2">
                                    <summary className="text-accent cursor-pointer text-xs">
                                      View data
                                    </summary>
                                    <pre className="bg-background mt-2 overflow-auto rounded p-2 text-xs">
                                      {JSON.stringify(event.arbitraryData, null, 2)}
                                    </pre>
                                  </details>
                                )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Section>
                  )}

                  {/* Referral */}
                  <Section
                    title="Referral"
                    id="referral"
                    icon={<Megaphone className="h-5 w-5" />}
                    isExpanded={expandedSections.has('referral')}
                    onToggle={() => toggleSection('referral')}
                  >
                    {currentSession && (
                      <>
                        <Property
                          label="Session Reference"
                          value={currentSession.ref}
                          onCopy={copyToClipboard}
                          copiedFieldId={copiedField}
                        />
                        <Property
                          label="Channel"
                          value={currentSession.channel}
                          onCopy={copyToClipboard}
                          copiedFieldId={copiedField}
                        />
                        <Property
                          label="Status"
                          value={currentSession.status}
                          onCopy={copyToClipboard}
                          copiedFieldId={copiedField}
                        />
                      </>
                    )}
                    {guestData.ext && Object.keys(guestData.ext).length > 0 && (
                      <div className="mt-4">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Data Extensions:
                        </label>
                        <pre className="overflow-auto rounded bg-gray-50 p-4 text-xs">
                          {JSON.stringify(guestData.ext, null, 2)}
                        </pre>
                      </div>
                    )}
                  </Section>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

// Section Component
interface SectionProps {
  title: string;
  id: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Section = ({ title, id, isExpanded, onToggle, children, icon }: SectionProps) => (
  <div className="rounded-lg bg-teal-500 text-white" id={id}>
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-teal-600"
      aria-expanded={isExpanded}
      aria-controls={`${id}-content`}
    >
      <div className="flex items-center gap-3">
        {icon && <div className="text-white">{icon}</div>}
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      {isExpanded ? (
        <ChevronUp className="h-5 w-5 text-white" />
      ) : (
        <ChevronDown className="h-5 w-5 text-white" />
      )}
    </button>
    {isExpanded && (
      <div id={`${id}-content`} className="border-t border-teal-600 bg-white p-4 text-gray-800">
        {children}
      </div>
    )}
  </div>
);

// Property Component
interface PropertyProps {
  label: string;
  value: string | number | null | undefined;
  onCopy: (value: string, fieldId: string) => void;
  copiedFieldId?: string | null;
}

const Property = ({ label, value, onCopy, copiedFieldId }: PropertyProps) => {
  const fieldId = `field-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const displayValue = value?.toString() || 'N/A';
  const hasValue = value != null && value !== '';
  const isCopied = copiedFieldId === fieldId;

  return (
    <div className="mb-3 flex items-start justify-between gap-2">
      <div className="flex-1">
        <label className="text-foreground-light text-sm font-medium">{label}:</label>
        <div className="text-foreground mt-1 text-sm break-words">{displayValue}</div>
      </div>
      {hasValue && (
        <button
          onClick={() => onCopy(displayValue, fieldId)}
          className="text-foreground-muted hover:bg-background-muted hover:text-accent mt-1 rounded p-1 transition-colors"
          aria-label={`Copy ${label}`}
          title={isCopied ? 'Copied!' : 'Copy to clipboard'}
        >
          {isCopied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
        </button>
      )}
    </div>
  );
};

export default CdpProfilePanel;
