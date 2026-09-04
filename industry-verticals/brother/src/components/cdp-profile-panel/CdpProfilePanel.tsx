'use client';

/**
 * Engagement side panel — Sitecore CDP visitor context + Brother affinities.
 * Plain CSS (Brother host has no Tailwind).
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
  RotateCcw,
  Loader2,
  ShoppingBag,
} from 'lucide-react';
import { CdpSubscribeButton } from 'components/cdp-profile-panel/CdpSubscribeButton';
import { DEMO_CUSTOMER_EMAIL } from 'lib/cdp/cdp-identity';
import { loadCdpGuestProfile, type CdpGuestProfile } from 'lib/cdp/cdp-cloud-context';
import { resetSitecoreVisitorSession } from 'lib/cdp/sitecore-cookie-reset';
import { JOURNEY_STAGES } from 'lib/cdp/cdp-session-tracker';

async function copyTextToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      /* fall through */
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
        <span className="cdp-panel-section__title">
          {icon}
          <strong>{title}</strong>
        </span>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
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
    <div className="cdp-panel-prop">
      <div className="cdp-panel-prop__text">
        <span className="cdp-panel-prop__label">{label}:</span>
        <div className="cdp-panel-prop__value">{displayValue}</div>
      </div>
      {hasValue ? (
        <button
          type="button"
          onClick={() => onCopy(displayValue, fieldId)}
          className="cdp-panel-icon-btn"
          aria-label={`Copy ${label}`}
          title={isCopied ? 'Copied!' : 'Copy to clipboard'}
        >
          {isCopied ? <Check size={16} className="cdp-ok" /> : <Copy size={16} />}
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
    () => new Set(['journey', 'events'])
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
    if (!copied) return;
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
  const affinityData = profile?.ext ?? {};
  const journey = profile?.journey ?? [];
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
        aria-label={isOpen ? 'Close CDP profile panel' : 'Open CDP profile panel'}
        title="Customer profile"
      >
        {isOpen ? (
          <X size={20} />
        ) : (
          <span className="cdp-profile-toggle__icon-wrap">
            <Info size={20} />
          </span>
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
              <div className="cdp-profile-drawer__header-row">
                <div>
                  <p className="cdp-profile-drawer__eyebrow">Sitecore CDP</p>
                  <h2 className="cdp-profile-drawer__title">Customer profile</h2>
                </div>
                <div className="cdp-profile-drawer__stats">
                  <span className="cdp-profile-drawer__stat" title="Page views this session">
                    <Eye size={18} />
                    {pagesSeen}
                  </span>
                  <span className="cdp-profile-drawer__stat" title="Visits to site">
                    <RefreshCw size={18} />
                    {visitCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => void refreshProfile()}
                    className="cdp-panel-icon-btn cdp-panel-icon-btn--light"
                    aria-label="Refresh profile"
                    title="Refresh"
                  >
                    <RefreshCw size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="cdp-panel-icon-btn cdp-panel-icon-btn--light"
                    aria-label="Close panel"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="cdp-profile-drawer__body">
              {isLoading && !profile ? (
                <div className="cdp-panel-loading">
                  <div className="cdp-panel-spinner" />
                  <p>Loading visitor context…</p>
                </div>
              ) : null}

              {profile ? (
                <div className="cdp-panel-stack">
                  <div className="cdp-panel-card">
                    <label className="cdp-panel-field-label">CDP Guest ID:</label>
                    <div className="cdp-panel-guest-row">
                      <input
                        type="text"
                        readOnly
                        value={profile.guestId ?? 'Waiting for Cloud SDK…'}
                        className="cdp-panel-guest-input"
                      />
                      {profile.guestId ? (
                        <button
                          type="button"
                          onClick={() => void copyToClipboard(profile.guestId!, 'field-guest-id')}
                          className="cdp-panel-icon-btn"
                          aria-label="Copy guest ID"
                        >
                          {copiedField === 'field-guest-id' ? (
                            <Check size={16} className="cdp-ok" />
                          ) : (
                            <Copy size={16} />
                          )}
                        </button>
                      ) : null}
                    </div>

                    <PanelProperty
                      label="Browser ID (sc_* cookie)"
                      value={profile.browserId}
                      onCopy={copyToClipboard}
                      copiedFieldId={copiedField}
                    />
                    <PanelProperty
                      label="Identified"
                      value={profile.isIdentified ? 'Yes' : 'Anonymous'}
                      onCopy={copyToClipboard}
                      copiedFieldId={copiedField}
                    />
                    <PanelProperty
                      label="Current page"
                      value={currentPageLabel}
                      onCopy={copyToClipboard}
                      copiedFieldId={copiedField}
                    />

                    {Object.keys(affinityData).length > 0 ? (
                      <div className="cdp-panel-affinity">
                        <label className="cdp-panel-field-label">Affinity:</label>
                        {Object.entries(affinityData).map(([key, value]) => (
                          <div key={key} className="cdp-panel-affinity__group">
                            <div className="cdp-panel-affinity__heading">{key}:</div>
                            <ul className="cdp-panel-affinity__list">
                              {Object.entries(value).map(([subKey, subValue]) => (
                                <li key={subKey}>
                                  <span>{subKey}</span>
                                  <strong>{subValue}</strong>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : null}

                    <div className="cdp-panel-divider">
                      <label className="cdp-panel-field-label">Identify customer (Jack):</label>
                      <CdpSubscribeButton
                        defaultEmail={DEMO_CUSTOMER_EMAIL}
                        onSubscribed={() => void refreshProfile()}
                        className="cdp-panel-identify-wrap"
                      />
                    </div>

                    <div className="cdp-panel-divider">
                      <button
                        type="button"
                        onClick={handleReset}
                        disabled={resetting}
                        className="cdp-panel-reset"
                      >
                        {resetting ? (
                          <Loader2 size={16} className="cdp-spin" />
                        ) : (
                          <RotateCcw size={16} />
                        )}
                        Restart as anonymous
                      </button>
                    </div>
                  </div>

                  <PanelSection
                    title="Customer journey"
                    id="journey"
                    icon={<ShoppingBag size={18} />}
                    isExpanded={expandedSections.has('journey')}
                    onToggle={() => toggleSection('journey')}
                  >
                    <ol className="cdp-panel-journey">
                      {JOURNEY_STAGES.map((stage, index) => {
                        const reached = journey.includes(stage);
                        return (
                          <li
                            key={stage}
                            className={
                              reached
                                ? 'cdp-panel-journey__item is-reached'
                                : 'cdp-panel-journey__item'
                            }
                          >
                            <span className="cdp-panel-journey__num">{index + 1}</span>
                            {stage}
                          </li>
                        );
                      })}
                    </ol>
                    <p className="cdp-panel-hint">
                      Browse Home → printers / labelling → a PDP → campaign → supplies. Affinities
                      update from each page view.
                    </p>
                  </PanelSection>

                  <PanelSection
                    title="Personal information"
                    id="user"
                    icon={<User size={18} />}
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
                  </PanelSection>

                  {recentEvents.length > 0 ? (
                    <PanelSection
                      title="Onsite behaviour"
                      id="events"
                      icon={<Target size={18} />}
                      isExpanded={expandedSections.has('events')}
                      onToggle={() => toggleSection('events')}
                    >
                      <div className="cdp-panel-events">
                        {recentEvents.map((event, idx) => (
                          <div
                            key={`${event.type}-${event.createdAt}-${idx}`}
                            className="cdp-panel-event"
                          >
                            <div className="cdp-panel-event__type">{event.type}</div>
                            <div className="cdp-panel-event__time">
                              {new Date(event.createdAt).toLocaleString()}
                            </div>
                            {event.arbitraryData && Object.keys(event.arbitraryData).length > 0 ? (
                              <details className="cdp-panel-event__details">
                                <summary>View data</summary>
                                <pre>{JSON.stringify(event.arbitraryData, null, 2)}</pre>
                              </details>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </PanelSection>
                  ) : null}
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
