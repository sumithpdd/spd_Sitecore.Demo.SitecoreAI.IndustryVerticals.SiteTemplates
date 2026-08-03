'use client';

/**
 * Engagement side panel — Sitecore CDP visitor context via Cloud SDK + local session tracking.
 * @see https://doc.sitecore.com/sdk/en/developers/006/cloud-sdk/cloud-sdk-cookies.html
 */

import { useState, useEffect, useCallback, type JSX, type ReactNode } from 'react';
import { useRouter } from 'next/router';
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
  RotateCcw,
  Loader2,
} from 'lucide-react';
import { CdpSubscribeButton } from '@/components/cdp-profile-panel/CdpSubscribeButton';
import { DEMO_EMAIL } from '@/lib/demo-auth';
import { loadCdpGuestProfile, type CdpGuestProfile } from '@/lib/cdp/cdp-cloud-context';
import { resetSitecoreVisitorSession } from '@/lib/cdp/sitecore-cookie-reset';

async function copyTextToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Permissions policy or non-secure context — fall through to legacy copy.
    }
  }

  if (typeof document === 'undefined') {
    return false;
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(textarea);
    return copied;
  } catch {
    return false;
  }
}

function PanelSection({
  title,
  id,
  isExpanded,
  onToggle,
  children,
  icon,
}: {
  title: string;
  id: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="cdp-panel-section" id={id}>
      <button
        type="button"
        onClick={onToggle}
        className="cdp-panel-section__trigger"
        aria-expanded={isExpanded}
        aria-controls={`${id}-content`}
      >
        <div className="flex items-center gap-3">
          {icon ? <div>{icon}</div> : null}
          <h3 className="font-semibold">{title}</h3>
        </div>
        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      {isExpanded ? (
        <div id={`${id}-content`} className="cdp-panel-section__body">
          {children}
        </div>
      ) : null}
    </div>
  );
}

function PanelProperty({
  label,
  value,
  onCopy,
  copiedFieldId,
}: {
  label: string;
  value: string | number | null | undefined;
  onCopy: (value: string, fieldId: string) => void;
  copiedFieldId?: string | null;
}) {
  const fieldId = `field-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const displayValue = value?.toString() || 'N/A';
  const hasValue = value != null && value !== '';
  const isCopied = copiedFieldId === fieldId;

  return (
    <div className="mb-3 flex items-start justify-between gap-2">
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-500">{label}:</label>
        <div className="mt-1 text-sm break-words text-gray-900">{displayValue}</div>
      </div>
      {hasValue ? (
        <button
          type="button"
          onClick={() => onCopy(displayValue, fieldId)}
          className="text-accent mt-1 rounded p-1 text-gray-500 transition-colors hover:bg-gray-100"
          aria-label={`Copy ${label}`}
          title={isCopied ? 'Copied!' : 'Copy to clipboard'}
        >
          {isCopied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
        </button>
      ) : null}
    </div>
  );
}

export function CdpProfilePanel(): JSX.Element {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<CdpGuestProfile | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    () => new Set(['user', 'events'])
  );
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [resetting, setResetting] = useState(false);

  const refreshProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await loadCdpGuestProfile();
      setProfile(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen && !profile && !isLoading) {
      void refreshProfile();
    }
  }, [isOpen, profile, isLoading, refreshProfile]);

  useEffect(() => {
    if (!isOpen || !router.isReady) return;
    void refreshProfile();
  }, [isOpen, router.isReady, router.asPath, refreshProfile]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  const copyToClipboard = async (text: string, fieldId: string) => {
    const copied = await copyTextToClipboard(text);
    if (!copied) {
      return;
    }
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleReset = () => {
    setResetting(true);
    resetSitecoreVisitorSession();
  };

  const currentSession = profile?.sessions?.[0];
  const recentEvents = currentSession?.events?.slice().reverse().slice(0, 12) ?? [];
  const pagesSeen = recentEvents.filter((e) => e.type === 'VIEW').length;
  const visitCount = profile?.visitCount ?? 0;
  const isFirstVisit = visitCount <= 1;
  const affinityData = profile?.ext ?? {};
  const currentPageLabel =
    typeof window !== 'undefined'
      ? window.location.pathname.split('/').filter(Boolean).pop() || 'Home'
      : 'Home';

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="cdp-profile-toggle"
        aria-label={isOpen ? 'Close engagement panel' : 'Open engagement panel'}
        title="Engagement"
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <div className="cdp-profile-toggle__icon-wrap">
            <Info className="h-5 w-5" />
          </div>
        )}
      </button>

      {isOpen ? (
        <>
          <div
            className="cdp-profile-backdrop"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="cdp-profile-drawer">
            <div className="cdp-profile-drawer__header">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-accent text-xs font-semibold tracking-[0.15em] uppercase">
                    Bristan
                  </p>
                  <h2 className="text-xl font-semibold">Engagement</h2>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1" title="Page views this session">
                    <Eye className="h-5 w-5" />
                    <span className="text-sm font-medium">{pagesSeen}</span>
                  </div>
                  <div className="flex items-center gap-1" title="Visits to site">
                    <RefreshCw className="h-5 w-5" />
                    <span className="text-sm font-medium">{visitCount}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => void refreshProfile()}
                    className="rounded p-1 transition-colors hover:bg-white/15"
                    aria-label="Refresh profile"
                    title="Refresh"
                  >
                    <RefreshCw className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded p-1 transition-colors hover:bg-white/15"
                    aria-label="Close panel"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              {isLoading && !profile ? (
                <div className="py-12 text-center">
                  <div className="cdp-panel-spinner" />
                  <p className="text-foreground-muted mt-4 text-sm">Loading visitor context…</p>
                </div>
              ) : null}

              {profile ? (
                <div className="space-y-4">
                  <div className="space-y-4 rounded-lg border border-[#e8e8e8] bg-white p-6 shadow-sm">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        CDP Guest ID:
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          readOnly
                          value={profile.guestId ?? 'Waiting for Cloud SDK…'}
                          className="flex-1 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm"
                        />
                        {profile.guestId ? (
                          <button
                            type="button"
                            onClick={() => void copyToClipboard(profile.guestId!, 'field-guest-id')}
                            className="rounded p-2 transition-colors hover:bg-gray-100"
                            aria-label="Copy guest ID"
                          >
                            {copiedField === 'field-guest-id' ? (
                              <Check className="h-4 w-4 text-green-600" />
                            ) : (
                              <Copy className="h-4 w-4 text-gray-600" />
                            )}
                          </button>
                        ) : null}
                      </div>
                    </div>

                    <PanelProperty
                      label="Browser ID (sc_* cookie)"
                      value={profile.browserId}
                      onCopy={copyToClipboard}
                      copiedFieldId={copiedField}
                    />
                    <PanelProperty
                      label="Personalize cookie"
                      value={profile.edgeCookieName}
                      onCopy={copyToClipboard}
                      copiedFieldId={copiedField}
                    />
                    <PanelProperty
                      label="Identified"
                      value={profile.isIdentified ? 'Yes' : 'Anonymous'}
                      onCopy={copyToClipboard}
                      copiedFieldId={copiedField}
                    />

                    {Object.keys(affinityData).length > 0 ? (
                      <div>
                        <label className="mb-3 block text-sm font-medium text-gray-700">
                          Affinity:
                        </label>
                        <div className="space-y-3">
                          {Object.entries(affinityData).map(([key, value]) => (
                            <div key={key} className="rounded-lg border border-gray-200">
                              <div className="border-b bg-[#faf3ea] px-3 py-2 text-xs font-medium text-gray-700">
                                {key}:
                              </div>
                              <div className="p-3">
                                <div className="space-y-1">
                                  {Object.entries(value).map(([subKey, subValue]) => (
                                    <div key={subKey} className="flex justify-between text-sm">
                                      <span className="text-gray-700">{subKey}:</span>
                                      <span className="text-accent font-medium">{subValue}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    <div className="border-t pt-4">
                      <label className="mb-3 block text-sm font-medium text-gray-700">
                        Subscribe / identify (identity event):
                      </label>
                      <CdpSubscribeButton
                        variant="forma"
                        defaultEmail={DEMO_EMAIL}
                        onSubscribed={() => void refreshProfile()}
                        className="rounded-lg bg-[#faf3ea] p-4"
                      />
                    </div>

                    <div className="border-t pt-4">
                      <button
                        type="button"
                        onClick={handleReset}
                        disabled={resetting}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-50"
                      >
                        {resetting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <RotateCcw className="h-4 w-4" />
                        )}
                        Restart as anonymous
                      </button>
                    </div>

                    <div className="space-y-2 border-t pt-4">
                      <div>
                        <span className="text-sm text-gray-600">Pages seen in this visit: </span>
                        <span className="text-sm font-semibold">{pagesSeen}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Current page: </span>
                        <span className="text-sm font-semibold">{currentPageLabel}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Visits to the site: </span>
                        <span className="text-sm font-semibold">{visitCount}</span>
                      </div>
                      {isFirstVisit ? (
                        <div className="rounded-lg border border-[#c1a25f]/30 bg-[#faf3ea] p-3 text-sm text-[#6b5a32]">
                          This is your first visit to Bristan (this browser).
                        </div>
                      ) : (
                        <div className="text-sm text-gray-700">
                          You have visited this site {visitCount} time{visitCount !== 1 ? 's' : ''}.
                        </div>
                      )}
                    </div>
                  </div>

                  <PanelSection
                    title="Personal Information"
                    id="user"
                    icon={<User className="h-5 w-5" />}
                    isExpanded={expandedSections.has('user')}
                    onToggle={() => toggleSection('user')}
                  >
                    <PanelProperty
                      label="Guest Reference"
                      value={profile.guestRef}
                      onCopy={copyToClipboard}
                      copiedFieldId={copiedField}
                    />
                    <PanelProperty
                      label="Guest ID"
                      value={profile.guestId}
                      onCopy={copyToClipboard}
                      copiedFieldId={copiedField}
                    />
                    <PanelProperty
                      label="Email"
                      value={profile.email}
                      onCopy={copyToClipboard}
                      copiedFieldId={copiedField}
                    />
                    <PanelProperty
                      label="First Name"
                      value={profile.firstName}
                      onCopy={copyToClipboard}
                      copiedFieldId={copiedField}
                    />
                    <PanelProperty
                      label="Last Name"
                      value={profile.lastName}
                      onCopy={copyToClipboard}
                      copiedFieldId={copiedField}
                    />
                    {profile.identifiers.length > 0 ? (
                      <div className="mt-2">
                        <label className="text-sm font-medium text-gray-500">Identifiers:</label>
                        <div className="mt-1 space-y-1">
                          {profile.identifiers.map((id, idx) => (
                            <div
                              key={`${id.provider}-${id.id}-${idx}`}
                              className="rounded bg-gray-50 p-2 text-xs"
                            >
                              <span className="font-medium">{id.provider}:</span> {id.id}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </PanelSection>

                  {recentEvents.length > 0 ? (
                    <PanelSection
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
                            className="rounded-lg border bg-gray-50 p-3"
                          >
                            <div className="font-medium text-gray-900">{event.type}</div>
                            <div className="mt-1 text-xs text-gray-500">
                              {new Date(event.createdAt).toLocaleString()}
                            </div>
                            {event.arbitraryData && Object.keys(event.arbitraryData).length > 0 ? (
                              <details className="mt-2">
                                <summary className="text-accent cursor-pointer text-xs">
                                  View data
                                </summary>
                                <pre className="mt-2 overflow-auto rounded bg-white p-2 text-xs">
                                  {JSON.stringify(event.arbitraryData, null, 2)}
                                </pre>
                              </details>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </PanelSection>
                  ) : null}

                  <PanelSection
                    title="Referral"
                    id="referral"
                    icon={<Megaphone className="h-5 w-5" />}
                    isExpanded={expandedSections.has('referral')}
                    onToggle={() => toggleSection('referral')}
                  >
                    {currentSession ? (
                      <>
                        <PanelProperty
                          label="Session Reference"
                          value={currentSession.ref}
                          onCopy={copyToClipboard}
                          copiedFieldId={copiedField}
                        />
                        <PanelProperty
                          label="Channel"
                          value={currentSession.channel}
                          onCopy={copyToClipboard}
                          copiedFieldId={copiedField}
                        />
                        <PanelProperty
                          label="Status"
                          value={currentSession.status}
                          onCopy={copyToClipboard}
                          copiedFieldId={copiedField}
                        />
                        <PanelProperty
                          label="Referrer"
                          value={currentSession.referrer || 'Direct / none'}
                          onCopy={copyToClipboard}
                          copiedFieldId={copiedField}
                        />
                      </>
                    ) : null}
                    {Object.keys(affinityData).length > 0 ? (
                      <div className="mt-4">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                          Data extensions:
                        </label>
                        <pre className="overflow-auto rounded bg-gray-50 p-4 text-xs">
                          {JSON.stringify(affinityData, null, 2)}
                        </pre>
                      </div>
                    ) : null}
                    <p className="mt-3 text-xs text-gray-500">
                      Full profile history and affinity scores are in Sitecore AI → Performance →
                      Profiles (search by Guest ID above).
                    </p>
                  </PanelSection>
                </div>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default CdpProfilePanel;
