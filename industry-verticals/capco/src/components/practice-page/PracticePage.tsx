'use client';

import { FormEvent, JSX, useMemo, useState } from 'react';
import {
  Image as ContentSdkImage,
  Link as ContentSdkLink,
  RichText,
  RichTextField,
  Text,
  TextField,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { ComponentProps } from '@/lib/component-props';
import {
  asImageField,
  asItems,
  asLinkField,
  asTextField,
  fieldString,
  itemLabel,
  linkHref,
} from '@/lib/sitecore-fields';
import { getPersonBySlug } from '@/lib/people-catalog';
import { getSectorBySlug, SECTOR_HERO_SRC, SectorPageData } from '@/lib/sector-catalog';

type Tab = 'thinking' | 'experience' | 'people';

type Fields = {
  Title?: unknown;
  Intro?: unknown;
  FollowLabel?: unknown;
  FollowLink?: unknown;
  HelpLabel?: unknown;
  JumpLabel?: unknown;
  Body?: unknown;
  HeroImage?: unknown;
  ThinkingHeading?: unknown;
  ExperienceHeading?: unknown;
  ExperienceIntro?: unknown;
  PeopleHeading?: unknown;
  PeopleIntro?: unknown;
  ContactName?: unknown;
  ContactRole?: unknown;
  ContactPhone?: unknown;
  Jumps?: unknown;
  Highlights?: unknown;
  Thinking?: unknown;
  Work?: unknown;
  People?: unknown;
};

type Props = ComponentProps & { fields?: Fields };

type WorkRow = {
  id: string;
  title: string;
  year: string;
  region: string;
  sector: string;
  service: string;
  value: string;
  fields?: Record<string, unknown>;
};

type PersonRow = {
  id: string;
  href: string;
  name: string;
  jobTitle: string;
  office: string;
  phone: string;
  bio: string;
};

const PAGE_SIZE = 5;

const unique = (values: string[]): string[] =>
  [...new Set(values.map((value) => value.trim()).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b)
  );

const routeSlug = (asPath: string, routeName: string): string => {
  const fromPath = asPath.split('?')[0].split('/').filter(Boolean).pop() || '';
  return (fromPath || routeName || '').toLowerCase();
};

const personSlugFromUrl = (url?: string, name?: string): string => {
  if (url) {
    const last = url.split('?')[0].split('/').filter(Boolean).pop();
    if (last) {
      return last.toLowerCase();
    }
  }
  return (name || '').toLowerCase().replace(/\s+/g, '-');
};

export const Default = (props: Props): JSX.Element => {
  const { page } = useSitecore();
  const router = useRouter();
  const isEditing = Boolean(page?.mode?.isEditing);
  const fields = props.fields || {};
  const id = props.params?.RenderingIdentifier;
  const styles = `${props.params?.styles || ''}`.trim();
  const slug = routeSlug(router.asPath || '', String(page?.layout?.sitecore?.route?.name || ''));
  const catalog: SectorPageData = getSectorBySlug(slug);

  const [tab, setTab] = useState<Tab>('thinking');
  const [helpQuery, setHelpQuery] = useState('');
  const [peopleQuery, setPeopleQuery] = useState('');
  const [sector, setSector] = useState('');
  const [service, setService] = useState('');
  const [region, setRegion] = useState('');
  const [applied, setApplied] = useState({ sector: '', service: '', region: '' });
  const [visible, setVisible] = useState(PAGE_SIZE);

  const titleField = asTextField(fields.Title);
  const introField = asTextField(fields.Intro);
  const followField = asTextField(fields.FollowLabel);
  const followLink = asLinkField(fields.FollowLink);
  const helpField = asTextField(fields.HelpLabel);
  const jumpField = asTextField(fields.JumpLabel);
  const bodyField = fields.Body as RichTextField | undefined;
  const heroImage = asImageField(fields.HeroImage);
  const thinkingHeading = asTextField(fields.ThinkingHeading);
  const experienceHeading = asTextField(fields.ExperienceHeading);
  const experienceIntro = asTextField(fields.ExperienceIntro);
  const peopleHeading = asTextField(fields.PeopleHeading);
  const peopleIntro = asTextField(fields.PeopleIntro);
  const contactName = asTextField(fields.ContactName);
  const contactRole = asTextField(fields.ContactRole);
  const contactPhone = asTextField(fields.ContactPhone);

  const jumps = asItems(fields.Jumps);
  const highlights = asItems(fields.Highlights);
  const thinkingItems = asItems(fields.Thinking);
  const workItems = asItems(fields.Work);
  const peopleItems = asItems(fields.People);

  const work: WorkRow[] = useMemo(() => {
    if (workItems.length > 0) {
      return workItems.map((item, index) => ({
        id: item.id || String(index),
        title: fieldString(item.fields?.Title),
        year: fieldString(item.fields?.Year),
        region: fieldString(item.fields?.Region),
        sector: fieldString(item.fields?.Sector),
        service: fieldString(item.fields?.Service),
        value: fieldString(item.fields?.Value),
        fields: item.fields,
      }));
    }
    return catalog.work.map((item, index) => ({
      id: `${item.year}-${index}`,
      title: item.title,
      year: item.year,
      region: item.region,
      sector: item.sector,
      service: item.service,
      value: item.value || '',
    }));
  }, [catalog.work, workItems]);

  const people: PersonRow[] = useMemo(() => {
    if (peopleItems.length > 0) {
      return peopleItems.map((item, index) => {
        const name = fieldString(item.fields?.Title) || itemLabel(item);
        const slugFromItem = personSlugFromUrl(item.url, name);
        const fallback = getPersonBySlug(slugFromItem);
        return {
          id: item.id || String(index),
          href: item.url || `/people/${slugFromItem}`,
          name: name || fallback?.name || '',
          jobTitle: fieldString(item.fields?.JobTitle) || fallback?.jobTitle || '',
          office: fieldString(item.fields?.Office) || fallback?.office || '',
          phone: fieldString(item.fields?.Phone) || fallback?.phone || '',
          bio: fieldString(item.fields?.Biography) || fallback?.bio || '',
        };
      });
    }
    return catalog.peopleSlugs
      .map((personSlug) => getPersonBySlug(personSlug))
      .filter((person): person is NonNullable<typeof person> => Boolean(person))
      .map((person) => ({
        id: person.slug,
        href: `/people/${person.slug}`,
        name: person.name,
        jobTitle: person.jobTitle,
        office: person.office,
        phone: person.phone,
        bio: person.bio,
      }));
  }, [catalog.peopleSlugs, peopleItems]);

  const sectors = unique(work.map((item) => item.sector));
  const services = unique(work.map((item) => item.service));
  const regions = unique(work.map((item) => item.region));

  const filteredWork = work.filter((item) => {
    if (applied.sector && item.sector !== applied.sector) return false;
    if (applied.service && item.service !== applied.service) return false;
    if (applied.region && item.region !== applied.region) return false;
    return true;
  });
  const shownWork = filteredWork.slice(0, visible);

  const peopleResults = useMemo(() => {
    const term = peopleQuery.trim().toLowerCase();
    if (!term) {
      return people;
    }
    return people.filter((person) =>
      [person.name, person.jobTitle, person.office, person.bio]
        .join(' ')
        .toLowerCase()
        .includes(term)
    );
  }, [people, peopleQuery]);

  const contactNameValue = fieldString(fields.ContactName) || catalog.contact?.name || '';
  const contactRoleValue = fieldString(fields.ContactRole) || catalog.contact?.role || '';
  const contactPhoneValue = fieldString(fields.ContactPhone) || catalog.contact?.phone || '';
  const showContact = Boolean(contactNameValue) || isEditing;

  const heroSrc = heroImage?.value?.src || catalog.heroSrc || SECTOR_HERO_SRC;
  const followHref = linkHref(fields.FollowLink, '#newsletter');

  const onHelp = (event: FormEvent) => {
    event.preventDefault();
    setPeopleQuery(helpQuery);
    setTab('people');
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: 'thinking', label: 'Thinking' },
    { key: 'experience', label: 'Experience' },
    { key: 'people', label: 'People' },
  ];

  return (
    <section className={`pm-sector w-full ${styles}`.trim()} id={id}>
      <div className="pm-sector__hero">
        {(heroSrc || isEditing) && (
          <div className="pm-sector__hero-media">
            {heroImage ? (
              <ContentSdkImage field={heroImage} className="pm-sector__hero-image" />
            ) : (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element -- DAM fallback when no CMS Image field */}
                <img className="pm-sector__hero-image" src={heroSrc} alt={catalog.heroAlt} />
              </>
            )}
          </div>
        )}
        <div className="pm-wrap pm-sector__hero-copy">
          <nav className="pm-sector__crumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href={catalog.breadcrumbParent.href}>{catalog.breadcrumbParent.label}</Link>
            <span aria-hidden="true">/</span>
            <span>{fieldString(fields.Title) || catalog.title}</span>
          </nav>
          <h1 className="pm-sector__title">
            <Text field={titleField} />
            {!fieldString(fields.Title) && catalog.title}
          </h1>
          <p className="pm-sector__intro">
            <Text field={introField} />
            {!fieldString(fields.Intro) && catalog.intro}
          </p>
          {followLink ? (
            <ContentSdkLink field={followLink} className="pm-btn-outline">
              <Text field={followField} />
              {!fieldString(fields.FollowLabel) && catalog.followLabel}
            </ContentSdkLink>
          ) : (
            <Link className="pm-btn-outline" href={followHref}>
              {fieldString(fields.FollowLabel) || catalog.followLabel}
            </Link>
          )}

          <form className="pm-sector__help" onSubmit={onHelp} role="search">
            <p>
              <Text field={helpField} />
              {!fieldString(fields.HelpLabel) && catalog.helpLabel}
            </p>
            <div className="pm-people__search">
              <label htmlFor="sector-help" className="sr-only">
                Search for
              </label>
              <Search className="pm-people__search-icon" aria-hidden="true" />
              <input
                id="sector-help"
                type="search"
                value={helpQuery}
                onChange={(event) => setHelpQuery(event.target.value)}
                placeholder="Search for a person or specialism"
              />
              <button className="pm-btn" type="submit">
                Show me
              </button>
            </div>
          </form>

          <div className="pm-sector__jumps">
            <p>
              <Text field={jumpField} />
              {!fieldString(fields.JumpLabel) && catalog.jumpLabel}
            </p>
            <ul>
              {jumps.length > 0
                ? jumps.map((item, index) => {
                    const href = linkHref(item.fields?.Link, '#');
                    const link = asLinkField(item.fields?.Link);
                    const label = itemLabel(item);
                    return (
                      <li key={item.id || index}>
                        {link ? (
                          <ContentSdkLink field={link} className="pm-sector__chip">
                            {label}
                          </ContentSdkLink>
                        ) : (
                          <Link className="pm-sector__chip" href={href}>
                            {label}
                          </Link>
                        )}
                      </li>
                    );
                  })
                : catalog.jumps.map((item) => (
                    <li key={item.href}>
                      <Link className="pm-sector__chip" href={item.href}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="pm-wrap">
        <ul className="pm-sector__highlights">
          {highlights.length > 0
            ? highlights.map((item, index) => (
                <li key={item.id || index}>
                  <h2>
                    <Text field={asTextField(item.fields?.Title)} />
                    {!fieldString(item.fields?.Title) && itemLabel(item)}
                  </h2>
                  <p>
                    <Text field={asTextField(item.fields?.Source)} />
                  </p>
                </li>
              ))
            : catalog.highlights.map((item) => (
                <li key={item.title}>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </li>
              ))}
        </ul>

        <div className="pm-sector__body">
          {bodyField?.value || isEditing ? <RichText field={bodyField} /> : <p>{catalog.body}</p>}
          {!bodyField?.value
            ? catalog.subsections.map((section) => (
                <section key={section.id} id={section.id}>
                  <h2>{section.title}</h2>
                  <p>{section.text}</p>
                </section>
              ))
            : null}
        </div>

        <div className="pm-sector__tabs" role="tablist">
          {tabs.map((item) => (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={tab === item.key}
              className={tab === item.key ? 'is-active' : undefined}
              onClick={() => setTab(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {tab === 'thinking' && (
          <div className="pm-sector__panel" role="tabpanel">
            <h2 className="pm-sector__panel-title">
              <Text field={thinkingHeading} />
              {!fieldString(fields.ThinkingHeading) && catalog.thinkingHeading}
            </h2>
            <div className="pm-outlaw__carousel">
              {thinkingItems.length > 0
                ? thinkingItems.map((item, index) => {
                    const href = linkHref(item.fields?.Link, '/out-law');
                    const link = asLinkField(item.fields?.Link);
                    const card = (
                      <>
                        <span className="pm-outlaw__kicker">
                          <Text field={asTextField(item.fields?.Kicker)} />
                        </span>
                        <span className="pm-outlaw__title">
                          <Text field={asTextField(item.fields?.Title)} />
                        </span>
                        <span className="pm-outlaw__meta">
                          <Text field={asTextField(item.fields?.Date)} />
                        </span>
                      </>
                    );
                    return (
                      <div className="pm-outlaw__card" key={item.id || index}>
                        {link ? (
                          <ContentSdkLink field={link} className="pm-outlaw__card-link">
                            {card}
                          </ContentSdkLink>
                        ) : (
                          <Link className="pm-outlaw__card-link" href={href}>
                            {card}
                          </Link>
                        )}
                      </div>
                    );
                  })
                : catalog.thinking.map((item) => (
                    <div className="pm-outlaw__card" key={item.href + item.title}>
                      <Link className="pm-outlaw__card-link" href={item.href}>
                        <span className="pm-outlaw__kicker">{item.kicker}</span>
                        <span className="pm-outlaw__title">{item.title}</span>
                        <span className="pm-outlaw__meta">{item.date}</span>
                      </Link>
                    </div>
                  ))}
            </div>
          </div>
        )}

        {tab === 'experience' && (
          <div className="pm-sector__panel" role="tabpanel">
            <h2 className="pm-sector__panel-title">
              <Text field={experienceHeading} />
              {!fieldString(fields.ExperienceHeading) && catalog.experienceHeading}
            </h2>
            <p className="pm-sector__lede">
              <Text field={experienceIntro} />
              {!fieldString(fields.ExperienceIntro) && catalog.experienceIntro}
            </p>
            {work.length > 0 && (
              <form
                className="pm-experience__filters"
                onSubmit={(event) => {
                  event.preventDefault();
                  setApplied({ sector, service, region });
                  setVisible(PAGE_SIZE);
                }}
              >
                <label>
                  <span>Sectors</span>
                  <select value={sector} onChange={(event) => setSector(event.target.value)}>
                    <option value="">All sectors</option>
                    {sectors.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Services</span>
                  <select value={service} onChange={(event) => setService(event.target.value)}>
                    <option value="">All services</option>
                    {services.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Region</span>
                  <select value={region} onChange={(event) => setRegion(event.target.value)}>
                    <option value="">All regions</option>
                    {regions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                <button className="pm-btn" type="submit">
                  Apply
                </button>
              </form>
            )}
            {shownWork.length > 0 ? (
              <ol className="pm-timeline">
                {shownWork.map((item) => (
                  <li key={item.id}>
                    <h3>
                      {item.fields?.Title ? (
                        <Text field={item.fields.Title as TextField} />
                      ) : (
                        item.title
                      )}
                    </h3>
                    <ul className="pm-timeline__meta">
                      {item.year ? <li>{item.year}</li> : null}
                      {item.value ? <li>{item.value}</li> : null}
                      {item.region ? <li>{item.region}</li> : null}
                      {item.sector ? <li className="pm-pill">{item.sector}</li> : null}
                      {item.service ? <li>{item.service}</li> : null}
                    </ul>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="pm-experience__empty">No experience matches those filters.</p>
            )}
            {filteredWork.length > visible ? (
              <button
                className="pm-btn-outline"
                type="button"
                onClick={() => setVisible((count) => count + PAGE_SIZE)}
              >
                Load more
              </button>
            ) : null}
          </div>
        )}

        {tab === 'people' && (
          <div className="pm-sector__panel" role="tabpanel">
            <h2 className="pm-sector__panel-title">
              <Text field={peopleHeading} />
              {!fieldString(fields.PeopleHeading) && catalog.peopleHeading}
            </h2>
            <p className="pm-sector__lede">
              <Text field={peopleIntro} />
              {!fieldString(fields.PeopleIntro) && catalog.peopleIntro}
            </p>
            <form
              className="pm-people__search"
              onSubmit={(event) => event.preventDefault()}
              role="search"
            >
              <label htmlFor="sector-people-search" className="sr-only">
                Search for
              </label>
              <Search className="pm-people__search-icon" aria-hidden="true" />
              <input
                id="sector-people-search"
                type="search"
                value={peopleQuery}
                onChange={(event) => setPeopleQuery(event.target.value)}
                placeholder="Search for a person or specialism"
              />
              <button className="pm-btn" type="submit">
                Search
              </button>
            </form>
            <p className="pm-people__count">
              {peopleResults.length} {peopleResults.length === 1 ? 'result' : 'results'}
            </p>
            <ul className="pm-people__list">
              {peopleResults.map((person) => (
                <li key={person.id}>
                  <a className="pm-people__card" href={person.href}>
                    <div>
                      <h3>{person.name}</h3>
                      <p className="pm-people__role">{person.jobTitle}</p>
                      <p className="pm-people__meta">
                        {person.office}
                        {person.phone ? ` · ${person.phone}` : ''}
                      </p>
                      <p className="pm-people__bio">{person.bio}</p>
                    </div>
                    <span className="pm-people__cta">View Profile</span>
                  </a>
                </li>
              ))}
            </ul>
            {peopleResults.length === 0 && (
              <p className="pm-people__empty">Please enter a search term that matches our team.</p>
            )}
          </div>
        )}

        {showContact ? (
          <aside className="pm-sector__contact">
            <p className="pm-sector__contact-name">
              <Text field={contactName} />
              {!fieldString(fields.ContactName) && contactNameValue}
            </p>
            <p className="pm-sector__contact-role">
              <Text field={contactRole} />
              {!fieldString(fields.ContactRole) && contactRoleValue}
            </p>
            {contactPhoneValue ? (
              <p>
                <a href={`tel:${contactPhoneValue.replace(/\s/g, '')}`}>
                  <Text field={contactPhone} />
                  {!fieldString(fields.ContactPhone) && contactPhoneValue}
                </a>
              </p>
            ) : null}
          </aside>
        ) : null}
      </div>
    </section>
  );
};

export default Default;
