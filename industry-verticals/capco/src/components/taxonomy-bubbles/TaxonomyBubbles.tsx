'use client';

import { JSX, PointerEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import { asItems, asTextField, fieldString, itemLabel } from '@/lib/sitecore-fields';
import { taxonomyLabels } from '@/lib/cms-listing';
import { TaxonomyGraph, TaxonomyKind, taxonomyGraph } from '@/lib/taxonomy';

type Fields = {
  Title?: unknown;
  Intro?: unknown;
  Sectors?: unknown;
  Services?: unknown;
  Regions?: unknown;
  Tags?: unknown;
  Categories?: unknown;
  RelatedContent?: unknown;
};

type Props = Partial<ComponentProps> & {
  fields?: Fields;
  title?: string;
  slug?: string;
  href?: string;
  sectors?: string[];
  services?: string[];
  regions?: string[];
  topics?: string[];
  related?: { slug: string; title: string; href: string }[];
};

const KINDS: { id: TaxonomyKind | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'current', label: 'Current' },
  { id: 'sector', label: 'Sector' },
  { id: 'service', label: 'Service' },
  { id: 'region', label: 'Region' },
  { id: 'topic', label: 'Topic' },
  { id: 'related', label: 'Related' },
];

function spherePoint(index: number, total: number, radius: number) {
  if (total <= 1) {
    return { x: 0, y: 0, z: 0 };
  }
  const golden = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - (index / (total - 1)) * 2;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = golden * index;
  return {
    x: Math.cos(theta) * r * radius,
    y: y * radius * 0.82,
    z: Math.sin(theta) * r * radius,
  };
}

function cmsLabels(field: unknown): string[] {
  return taxonomyLabels(field).length
    ? taxonomyLabels(field)
    : asItems(field)
        .map((item) => itemLabel(item))
        .filter(Boolean);
}

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const router = useRouter();
  const isEditing = Boolean(page?.mode?.isEditing);
  const route = page?.layout?.sitecore?.route as
    | { name?: string; fields?: Record<string, unknown> }
    | undefined;
  const routeFields = (route?.fields || {}) as Record<string, unknown>;
  const fields = { ...routeFields, ...(props.fields || {}) };
  const slug = String(props.slug || route?.name || '').toLowerCase();
  const title =
    props.title ||
    fieldString(fields.Title) ||
    fieldString(asTextField(fields.Title)) ||
    slug.replace(/-/g, ' ');
  const href = props.href || router.asPath?.split('?')[0] || '';

  const graph: TaxonomyGraph = taxonomyGraph({
    slug,
    title,
    href,
    cms: {
      sectors: props.sectors || cmsLabels(fields.Sectors),
      services: props.services || cmsLabels(fields.Services),
      regions: props.regions || cmsLabels(fields.Regions),
      topics: props.topics || [...cmsLabels(fields.Tags), ...cmsLabels(fields.Categories)],
      related:
        props.related ||
        asItems(fields.RelatedContent).map((item) => ({
          slug: String(item.name || item.url || item.id || '').replace(/^.*\//, ''),
          title: itemLabel(item) || String(item.name || 'Related'),
          href: item.url || '#',
        })),
    },
  });

  const [active, setActive] = useState<TaxonomyKind | 'all'>('all');
  const [hover, setHover] = useState<string | null>(null);
  const rot = useRef({ x: -12, y: 18 });
  const drag = useRef<{ x: number; y: number; on: boolean }>({ x: 0, y: 0, on: false });
  const frame = useRef<number>(0);
  const [, setTick] = useState(0);

  const visible = graph.nodes.filter((node) => active === 'all' || node.kind === active);
  const visibleIds = new Set(visible.map((node) => node.id));
  const links = graph.links.filter((link) => visibleIds.has(link.from) && visibleIds.has(link.to));

  useEffect(() => {
    const step = () => {
      if (!drag.current.on) {
        rot.current.y += 0.28;
      }
      setTick((value) => (value + 1) % 100000);
      frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame.current);
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    drag.current = { x: event.clientX, y: event.clientY, on: true };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.on) {
      return;
    }
    rot.current.y += event.clientX - drag.current.x;
    rot.current.x = Math.max(
      -48,
      Math.min(48, rot.current.x + (event.clientY - drag.current.y) * 0.4)
    );
    drag.current.x = event.clientX;
    drag.current.y = event.clientY;
  };
  const onPointerUp = () => {
    drag.current.on = false;
  };

  const rx = (rot.current.x * Math.PI) / 180;
  const ry = (rot.current.y * Math.PI) / 180;
  const projected = visible.map((node, index) => {
    const point = spherePoint(index, visible.length, 168);
    const cosY = Math.cos(ry);
    const sinY = Math.sin(ry);
    const cosX = Math.cos(rx);
    const sinX = Math.sin(rx);
    const x1 = point.x * cosY - point.z * sinY;
    const z1 = point.x * sinY + point.z * cosY;
    const y1 = point.y * cosX - z1 * sinX;
    const z2 = point.y * sinX + z1 * cosX;
    return { node, x: x1, y: y1, z: z2 };
  });
  const byId = Object.fromEntries(projected.map((item) => [item.node.id, item]));

  const heading = asTextField(fields.Title);
  const intro = asTextField(fields.Intro);

  return (
    <section className="pm-taxbubbles" id={props.params?.RenderingIdentifier}>
      <div className="pm-wrap">
        <p className="pm-outlaw__kicker">Taxonomy relationship bubbles</p>
        <h2>
          {heading?.value || isEditing ? <Text field={heading} /> : 'How this item is tagged'}
        </h2>
        {(fieldString(intro) || isEditing) && (
          <p className="pm-taxbubbles__intro">
            <Text field={intro} />
          </p>
        )}
        {!fieldString(intro) && !isEditing ? (
          <p className="pm-taxbubbles__intro">
            3D view of this item linked to sectors, services, regions, topics and related insights.
            Drag to orbit.
          </p>
        ) : null}
        <div className="pm-taxbubbles__filters" role="tablist" aria-label="Taxonomy dimensions">
          {KINDS.map((kind) => (
            <button
              key={kind.id}
              type="button"
              className={`pm-taxbubbles__chip pm-taxbubbles__chip--${kind.id}${
                active === kind.id ? 'is-active' : ''
              }`}
              onClick={() => setActive(kind.id)}
            >
              {kind.label}
            </button>
          ))}
        </div>
        <div
          className="pm-taxbubbles__stage"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          role="img"
          aria-label={`${visible.length} taxonomy nodes`}
        >
          <svg className="pm-taxbubbles__links" viewBox="-220 -160 440 320" aria-hidden="true">
            {links.map((link) => {
              const from = byId[link.from];
              const to = byId[link.to];
              if (!from || !to) {
                return null;
              }
              return (
                <line
                  key={`${link.from}-${link.to}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  className="pm-taxbubbles__link"
                />
              );
            })}
          </svg>
          <div className="pm-taxbubbles__scene">
            {projected.map((item) => {
              const depth = (item.z + 180) / 360;
              const scale = 0.72 + depth * 0.55;
              const body = (
                <span
                  className={`pm-taxbubbles__node pm-taxbubbles__node--${item.node.kind}${
                    hover === item.node.id ? 'is-hot' : ''
                  }`}
                  style={{
                    transform: `translate(-50%, -50%) translate3d(${item.x}px, ${item.y}px, ${item.z}px) scale(${scale})`,
                    zIndex: Math.round(item.z + 200),
                    opacity: 0.55 + depth * 0.45,
                  }}
                  onMouseEnter={() => setHover(item.node.id)}
                  onMouseLeave={() => setHover(null)}
                >
                  <span className="pm-taxbubbles__dot" />
                  <span className="pm-taxbubbles__label">{item.node.label}</span>
                </span>
              );
              return item.node.href && item.node.kind !== 'current' ? (
                <Link key={item.node.id} href={item.node.href} className="pm-taxbubbles__anchor">
                  {body}
                </Link>
              ) : (
                <span key={item.node.id} className="pm-taxbubbles__anchor">
                  {body}
                </span>
              );
            })}
          </div>
        </div>
        <p className="pm-taxbubbles__meta">
          {visible.length} nodes · {links.length} links
        </p>
      </div>
    </section>
  );
};

export default Default;
