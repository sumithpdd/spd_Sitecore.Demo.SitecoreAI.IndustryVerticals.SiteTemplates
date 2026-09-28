'use client';

import { FormEvent, JSX, ReactNode, useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Eye, Megaphone, RefreshCw, Target, User, X } from 'lucide-react';
import { useRouter } from 'next/router';
import { readProfile, type FitProfile } from '@/lib/asos-profile';
import { STORY } from '@/lib/asos-journey';
import { useShopper } from '@/lib/cdp/session-affinity';
import {
  getGuestEmail,
  getGuestName,
  getReferral,
  getSessionEvents,
  getSessionRef,
  getVisitCount,
  identifyGuest,
  resetCdpSession,
  subscribeGuest,
  type CdpReferral,
  type CdpTrackedEvent,
} from '@/lib/cdp/cdp-session-tracker';

type AffinityScore = {
  name: string;
  value: string;
  views: number;
  points: number;
  score: number;
  lastViewAt: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function weightFor(type: string): number {
  if (type === 'ADD_TO_BAG') return 3;
  if (type === 'SAVE') return 2;
  if (type === 'VIEW') return 1;
  return 0;
}

function affinityScores(events: CdpTrackedEvent[]): AffinityScore[] {
  const rows = new Map<string, Omit<AffinityScore, 'score'>>();
  events.forEach((event) => {
    const weight = weightFor(event.type);
    if (!weight) return;
    const raw = event.arbitraryData?.affinities;
    const pairs = Array.isArray(raw)
      ? raw.flatMap((row) => {
          if (!row || typeof row !== 'object') return [];
          const name = String((row as { name?: string }).name || '');
          const value = String((row as { value?: string }).value || '');
          return name && value ? [{ name, value }] : [];
        })
      : [];
    pairs.forEach((pair) => {
      const key = `${pair.name}|${pair.value}`;
      const current = rows.get(key) || {
        name: pair.name,
        value: pair.value,
        views: 0,
        points: 0,
        lastViewAt: event.createdAt,
      };
      current.views += 1;
      current.points += weight;
      current.lastViewAt = event.createdAt;
      rows.set(key, current);
    });
  });
  const maxByName = new Map<string, number>();
  rows.forEach((row) => {
    maxByName.set(row.name, Math.max(maxByName.get(row.name) || 0, row.points));
  });
  return [...rows.values()]
    .map((row) => ({
      ...row,
      score: Math.round((row.points / (maxByName.get(row.name) || 1)) * 100) / 100,
    }))
    .sort((a, b) => b.score - a.score || b.points - a.points || a.name.localeCompare(b.name));
}

function signalRows(
  map: Record<string, number>
): { value: string; points: number; score: number }[] {
  const max = Math.max(1, ...Object.values(map));
  return Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .map(([value, points]) => ({
      value,
      points,
      score: Math.round((points / max) * 100) / 100,
    }));
}

function Section({
  id,
  title,
  icon,
  open,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  icon: ReactNode;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}): JSX.Element {
  return (
    <section className="asos-cdp__section" id={id}>
      <button type="button" aria-expanded={open} onClick={onToggle}>
        <span>
          {icon}
          {title}
        </span>
        {open ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
      </button>
      {open ? <div className="asos-cdp__section-body">{children}</div> : null}
    </section>
  );
}

export function CdpProfilePanel(): JSX.Element {
  const router = useRouter();
  const shopper = useShopper();
  const [open, setOpen] = useState(false);
  const [guest, setGuest] = useState('Guest');
  const [email, setEmail] = useState('');
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');
  const [events, setEvents] = useState<CdpTrackedEvent[]>([]);
  const [visits, setVisits] = useState(0);
  const [session, setSession] = useState('');
  const [referral, setReferral] = useState<CdpReferral>({
    referrer: 'Direct',
    channel: 'direct',
    source: 'direct',
    campaign: 'none',
  });
  const [fitProfile, setFitProfile] = useState<FitProfile | null>(null);
  const [sections, setSections] = useState<Set<string>>(
    () => new Set(['visits', 'affinity', 'data', 'referral', 'account'])
  );

  useEffect(() => {
    if (router.asPath.includes('cdp=1')) setOpen(true);
  }, [router.asPath]);

  useEffect(() => {
    const refresh = () => {
      setGuest(getGuestName());
      setEmail(getGuestEmail());
      setEvents(getSessionEvents());
      setVisits(getVisitCount());
      setSession(getSessionRef());
      setReferral(getReferral());
      setFitProfile(readProfile());
    };
    refresh();
    window.addEventListener('asos-cdp', refresh);
    return () => window.removeEventListener('asos-cdp', refresh);
  }, [open, router.asPath]);

  const toggle = (id: string) => {
    setSections((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const page = router.asPath.split('?')[0] || '/';
  const views = events.filter((event) => event.type === 'VIEW');
  const scores = affinityScores(events);
  const profile = fitProfile;

  const subscribe = (event: FormEvent) => {
    event.preventDefault();
    const value = draft.trim();
    if (!EMAIL.test(value)) {
      setError('Enter a valid email address.');
      return;
    }
    setError('');
    subscribeGuest(value);
    setDraft('');
  };

  return (
    <div className="asos-cdp">
      {open ? (
        <>
          <button
            type="button"
            className="asos-cdp__backdrop"
            aria-label="Close CDP profile"
            onClick={() => setOpen(false)}
          />
          <aside className="asos-cdp__drawer" aria-label="CDP profile">
            <header className="asos-cdp__drawer-head">
              <div>
                <p>Sitecore CDP</p>
                <h2>Customer profile</h2>
              </div>
              <div className="asos-cdp__stats">
                <span title="Page views saved on this browser">
                  <Eye className="size-4" />
                  {views.length}
                </span>
                <span title="Visits to the site">
                  <RefreshCw className="size-4" />
                  {visits}
                </span>
                <button type="button" aria-label="Close profile" onClick={() => setOpen(false)}>
                  <X className="size-4" />
                </button>
              </div>
            </header>
            <div className="asos-cdp__drawer-body">
              <div className="asos-cdp__card">
                <p>
                  <span>Guest</span> {guest}
                </p>
                <p>
                  <span>Email</span> {email || 'Anonymous'}
                </p>
                <p>
                  <span>Session</span> {session}
                </p>
                <p>
                  <span>Page</span> {page}
                </p>
                <p>
                  <span>Status</span> {email || profile?.signedIn ? 'Identified' : 'Anonymous'}
                </p>
              </div>

              <Section
                id="visits"
                title="Visits"
                icon={<Eye className="size-4" />}
                open={sections.has('visits')}
                onToggle={() => toggle('visits')}
              >
                <p>Pages seen this visit: {views.length}</p>
                <p>Visits to the site: {visits}</p>
                <p>Intent: {shopper.intent}</p>
                <p>
                  {visits <= 1
                    ? 'This is the first visit in this browser.'
                    : `This browser has visited ${visits} times.`}
                </p>
              </Section>

              <Section
                id="affinity"
                title="Affinities and scores"
                icon={<Target className="size-4" />}
                open={sections.has('affinity')}
                onToggle={() => toggle('affinity')}
              >
                <p className="asos-cdp__hint">
                  Score is this value’s points divided by the top value in the same affinity name.
                  Add to bag counts as 3, save as 2, a page view as 1.
                </p>
                {scores.length === 0 ? (
                  <p>No page affinities yet. Open a product, category, or article.</p>
                ) : (
                  <table className="asos-cdp__table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Value</th>
                        <th>Views</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scores.map((row) => (
                        <tr key={`${row.name}-${row.value}`}>
                          <td>{row.name}</td>
                          <td>{row.value}</td>
                          <td>{row.views}</td>
                          <td>
                            <span
                              className="asos-cdp__bar"
                              style={{ width: `${Math.max(8, row.score * 100)}%` }}
                            />
                            {row.score.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                <p className="asos-cdp__hint">Signals the product rails use</p>
                {(
                  [
                    ['brand', shopper.brands],
                    ['category', shopper.categories],
                    ['fit', shopper.fits],
                    ['colour', shopper.colours],
                  ] as const
                ).map(([name, map]) => (
                  <div key={name}>
                    <p className="asos-cdp__group">{name}</p>
                    {signalRows(map).length === 0 ? (
                      <p className="asos-cdp__muted">No score yet</p>
                    ) : (
                      signalRows(map).map((row) => (
                        <p key={row.value} className="asos-cdp__score-line">
                          <span>{row.value}</span>
                          <span>
                            {row.points} pts · {row.score.toFixed(2)}
                          </span>
                        </p>
                      ))
                    )}
                  </div>
                ))}
              </Section>

              <Section
                id="data"
                title="Data sent"
                icon={<RefreshCw className="size-4" />}
                open={sections.has('data')}
                onToggle={() => toggle('data')}
              >
                {events.length === 0 ? (
                  <p>No events in this session.</p>
                ) : (
                  <ol className="asos-cdp__events">
                    {[...events].reverse().map((event) => (
                      <li key={`${event.type}-${event.createdAt}`}>
                        <strong>{event.type}</strong>
                        <time>{new Date(event.createdAt).toLocaleString()}</time>
                        {event.arbitraryData?.page ? (
                          <p>{String(event.arbitraryData.page)}</p>
                        ) : null}
                        {event.arbitraryData ? (
                          <details>
                            <summary>Payload</summary>
                            <pre>{JSON.stringify(event.arbitraryData, null, 2)}</pre>
                          </details>
                        ) : null}
                      </li>
                    ))}
                  </ol>
                )}
              </Section>

              <Section
                id="referral"
                title="Referral"
                icon={<Megaphone className="size-4" />}
                open={sections.has('referral')}
                onToggle={() => toggle('referral')}
              >
                <p>
                  <span>Referrer</span> {referral.referrer}
                </p>
                <p>
                  <span>Channel</span> {referral.channel}
                </p>
                <p>
                  <span>Source</span> {referral.source}
                </p>
                <p>
                  <span>Campaign</span> {referral.campaign}
                </p>
                <p className="asos-cdp__hint">
                  Set on the first page of the session from the referrer or utm_source, utm_medium,
                  and utm_campaign.
                </p>
              </Section>

              <Section
                id="account"
                title="Sign in and subscribe"
                icon={<User className="size-4" />}
                open={sections.has('account')}
                onToggle={() => toggle('account')}
              >
                {profile?.signedIn ? (
                  <p>
                    Signed in as {profile.name}. Fit {profile.bodyFit}, size UK {profile.size}.
                  </p>
                ) : (
                  <p>Not signed in. Account stores body fit for this session.</p>
                )}
                {email ? (
                  <p>Subscribed as {email}. An IDENTITY event is in Data sent.</p>
                ) : (
                  <form onSubmit={subscribe}>
                    <label>
                      Email
                      <input
                        type="email"
                        value={draft}
                        autoComplete="email"
                        placeholder="maya@asos.demo"
                        onChange={(event) => setDraft(event.target.value)}
                      />
                    </label>
                    {error ? <p className="asos-cdp__error">{error}</p> : null}
                    <button type="submit">Subscribe</button>
                  </form>
                )}
                <button
                  type="button"
                  className="asos-cdp__ghost"
                  onClick={() => identifyGuest(STORY.persona, 'maya@asos.demo')}
                >
                  Identify {STORY.persona}
                </button>
                <button type="button" className="asos-cdp__ghost" onClick={() => resetCdpSession()}>
                  Reset browsing profile
                </button>
              </Section>
            </div>
          </aside>
        </>
      ) : null}
      <button
        type="button"
        className="asos-cdp__toggle"
        aria-label={open ? 'Close CDP profile' : 'Open CDP profile'}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="size-5" /> : <User className="size-5" />}
      </button>
    </div>
  );
}

export const Default = CdpProfilePanel;
