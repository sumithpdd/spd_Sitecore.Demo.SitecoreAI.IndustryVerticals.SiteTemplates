'use client';

import { JSX, useEffect, useState } from 'react';
import { User, X } from 'lucide-react';
import {
  affinitiesForPath,
  getGuestName,
  getSessionEvents,
  getSessionRef,
  getVisitCount,
  identifyGuest,
  type CdpTrackedEvent,
} from '@/lib/cdp/cdp-session-tracker';
import { useRouter } from 'next/router';
import { STORY } from '@/lib/asos-journey';

export function CdpProfilePanel(): JSX.Element {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [guest, setGuest] = useState('Guest');
  const [events, setEvents] = useState<CdpTrackedEvent[]>([]);
  const [visits, setVisits] = useState(0);
  const [session, setSession] = useState('');

  useEffect(() => {
    setGuest(getGuestName());
    setEvents(getSessionEvents());
    setVisits(getVisitCount());
    setSession(getSessionRef());
  }, [open, router.asPath]);

  const path = router.asPath.split('?')[0] || '/';
  const affinity = affinitiesForPath(path);

  return (
    <div className="asos-cdp">
      {open ? (
        <aside className="asos-cdp__panel" aria-label="CDP profile">
          <header>
            <strong>CDP profile</strong>
            <button type="button" aria-label="Close profile" onClick={() => setOpen(false)}>
              <X className="size-4" />
            </button>
          </header>
          <dl>
            <div>
              <dt>Guest</dt>
              <dd>{guest}</dd>
            </div>
            <div>
              <dt>Session</dt>
              <dd>{session}</dd>
            </div>
            <div>
              <dt>Visits</dt>
              <dd>{visits}</dd>
            </div>
            <div>
              <dt>Page</dt>
              <dd>{path}</dd>
            </div>
          </dl>
          <p className="asos-cdp__label">Affinities</p>
          <ul>
            {Object.entries(affinity).length ? (
              Object.entries(affinity).map(([key, value]) => (
                <li key={key}>
                  {key}: {value}
                </li>
              ))
            ) : (
              <li>Browse New In or a PDP to build fit and brand.</li>
            )}
          </ul>
          <p className="asos-cdp__label">Journey</p>
          <ol>
            {events.slice(-6).map((event) => (
              <li key={`${event.type}-${event.createdAt}`}>
                {event.type}
                {event.arbitraryData?.page ? ` ${String(event.arbitraryData.page)}` : ''}
                {event.arbitraryData?.query ? ` “${String(event.arbitraryData.query)}”` : ''}
              </li>
            ))}
          </ol>
          <button
            type="button"
            className="asos-btn"
            onClick={() => {
              identifyGuest(STORY.persona);
              setGuest(STORY.persona);
            }}
          >
            Identify {STORY.persona}
          </button>
        </aside>
      ) : null}
      <button
        type="button"
        className="asos-cdp__toggle"
        aria-label="Open CDP profile"
        onClick={() => setOpen((value) => !value)}
      >
        <User className="size-5" />
      </button>
    </div>
  );
}

export const Default = CdpProfilePanel;
