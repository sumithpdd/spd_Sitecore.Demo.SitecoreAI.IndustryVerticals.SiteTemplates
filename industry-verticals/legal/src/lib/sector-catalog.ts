import { GUIDE_PATH, RESTRUCTURING } from '@/lib/legal-story';
import { OUTLAW_NEWS } from '@/lib/home-catalog';

export type SectorJump = { label: string; href: string };

export type SectorHighlight = { title: string; text: string };

export type SectorThinkingCard = {
  kicker: string;
  title: string;
  date: string;
  href: string;
};

export type SectorWorkItem = {
  title: string;
  year: string;
  region: string;
  sector: string;
  service: string;
  value?: string;
};

export type SectorContact = {
  name: string;
  role: string;
  phone: string;
};

export type SectorPageData = {
  slug: string;
  breadcrumbParent: { label: string; href: string };
  title: string;
  intro: string;
  followLabel: string;
  helpLabel: string;
  jumpLabel: string;
  jumps: SectorJump[];
  highlights: SectorHighlight[];
  body: string;
  subsections: { id: string; title: string; text: string }[];
  thinkingHeading: string;
  thinking: SectorThinkingCard[];
  experienceHeading: string;
  experienceIntro: string;
  work: SectorWorkItem[];
  peopleHeading: string;
  peopleIntro: string;
  peopleSlugs: string[];
  contact: SectorContact | null;
  heroSrc: string;
  heroAlt: string;
};

export const SECTOR_HERO_SRC =
  'https://starter-verticals-2.sitecoresandbox.cloud/api/public/content/bc3ab4586dd340b6b6fe7703e1fca5c8';

const PPS_THINKING: SectorThinkingCard[] = [
  {
    kicker: 'OUT-LAW GUIDE',
    title: 'When UK suppliers must continue to supply insolvent companies',
    date: 'Guide',
    href: GUIDE_PATH,
  },
  {
    kicker: OUTLAW_NEWS[0]?.kicker || 'OUT-LAW NEWS',
    title: OUTLAW_NEWS[0]?.title || 'Out-Law news',
    date: OUTLAW_NEWS[0]?.meta || '',
    href: OUTLAW_NEWS[0]?.href || '/out-law',
  },
  {
    kicker: OUTLAW_NEWS[3]?.kicker || 'OUT-LAW ANALYSIS',
    title: OUTLAW_NEWS[3]?.title || 'Out-Law analysis',
    date: OUTLAW_NEWS[3]?.meta || '',
    href: OUTLAW_NEWS[3]?.href || '/out-law',
  },
];

export const SECTOR_PAGES: Record<string, SectorPageData> = {
  'professional-public-services': {
    slug: 'professional-public-services',
    breadcrumbParent: { label: 'Sectors', href: '/sectors' },
    title: 'Professional & Public Services',
    intro: 'Connecting Professional and Public Services to our firmwide expertise.',
    followLabel: 'Follow Professional & Public Services',
    helpLabel: 'How can we help?',
    jumpLabel: 'Jump straight to:',
    jumps: [
      { label: 'Professional Services', href: '#professional-services' },
      { label: 'Public Sector', href: '#public-sector' },
    ],
    highlights: [
      {
        title: 'Multi-sector expertise',
        text: 'allows for us to seamlessly assist clients that work across sectors',
      },
      {
        title: 'A deep understanding of what drives government regimes',
        text: 'enables us to advise on the entire life-cycle of a project',
      },
      {
        title: 'Innovation is key',
        text: 'in how we approach advising our clients – ensuring we meet their evolving needs',
      },
    ],
    body: 'We help clients in Professional and Public Services by offering practical solutions shaped by our strong expertise in a range of specialisms including corporate and commercial contracts, funding, planning, and project management. With international experience and offices across the globe, we advise on commercial, regulatory, cross border and cultural challenges. This helps us reduce risks and create more opportunities for our clients.',
    subsections: [
      {
        id: 'professional-services',
        title: 'Professional Services',
        text: 'Accountants, administrators, consultants and professional practices — including the AIM listed law firm work on Dawn Allen’s experience tab.',
      },
      {
        id: 'public-sector',
        title: 'Public Sector',
        text: 'Government and public sector organisations, from planning and project life-cycle through to the regulatory regimes that sit around them.',
      },
    ],
    thinkingHeading: 'Out-Law / Your daily need to know in Professional & Public Services',
    thinking: PPS_THINKING,
    experienceHeading: 'Our latest work',
    experienceIntro:
      'Our advisers act on domestic and international projects of all shapes and sizes, working with many of the leading names across this diverse sector. Browse our experience below, or use the filters to look-up recent work in particular geographies and legal disciplines.',
    work: [
      {
        year: '2026',
        region: 'United Kingdom',
        sector: 'Professional & Public Services',
        service: 'Restructuring',
        title:
          'Advised Interpath Limited following their appointment over three complex property development and construction companies with advice covering planning, health and safety the sale of numerous residential developments.',
      },
      {
        year: '2026',
        region: 'United Kingdom',
        sector: 'Professional & Public Services',
        service: 'Restructuring',
        title:
          'Advised a board of directors of a distressed AIM listed law firm on the regulatory aspects of their declining business, while also acting for the proposed administrators to explore sale or other insolvent solutions for the entire legal practice.',
      },
      {
        year: '2024',
        region: 'United Kingdom',
        sector: 'Technology, Science & Industry',
        service: 'Restructuring',
        title:
          'Essential supplier obligations — technology supplier during customer administration (confidentiality cleared).',
      },
    ],
    peopleHeading: 'Our expertise, at your disposal',
    peopleIntro:
      'With over 490 partners and 3000 people around the world, we are well-placed to support you across a full range of legal and advisory services.',
    peopleSlugs: ['dawn-allen', 'sally-williamson', 'ben-mckinley', 'bill-ryan'],
    contact: {
      name: 'Simon Colvin',
      role: 'Partner, Head of Client Relationships, Professional and Public Services',
      phone: '+44 7787 002 648',
    },
    heroSrc: SECTOR_HERO_SRC,
    heroAlt: 'Professional & Public Services',
  },
  restructuring: {
    slug: 'restructuring',
    breadcrumbParent: { label: 'Expertise', href: '/expertise' },
    title: RESTRUCTURING.title,
    intro: RESTRUCTURING.intro,
    followLabel: 'Follow Restructuring',
    helpLabel: 'How can we help?',
    jumpLabel: 'Jump straight to:',
    jumps: RESTRUCTURING.tags.map((tag) => ({
      label: tag,
      href: `/people?q=${encodeURIComponent(tag)}`,
    })),
    highlights: [
      {
        title: 'Tagged once',
        text: 'The same items on Dawn, this practice, and the CIGA guide.',
      },
      {
        title: 'Service, sector, region',
        text: 'One taxonomy published once — not a separate copy for each surface.',
      },
      {
        title: 'Credentials that convert',
        text: 'Vince can take the Barclays 2006 secondment into the room.',
      },
    ],
    body: RESTRUCTURING.intro,
    subsections: [],
    thinkingHeading: 'Out-Law / Your daily need to know in Restructuring',
    thinking: PPS_THINKING,
    experienceHeading: 'Credentials',
    experienceIntro: 'Tagged once. Same items on Dawn, this practice, and the guide.',
    work: RESTRUCTURING.credentials.map((item) => ({
      year: item.year,
      title: item.title,
      region: 'United Kingdom',
      sector: 'Financial Services',
      service: 'Restructuring',
    })),
    peopleHeading: 'Our expertise, at your disposal',
    peopleIntro:
      'With over 490 partners and 3000 people around the world, we are well-placed to support you across a full range of legal and advisory services.',
    peopleSlugs: ['dawn-allen', 'sally-williamson'],
    contact: null,
    heroSrc: SECTOR_HERO_SRC,
    heroAlt: 'Restructuring',
  },
};

export function getSectorBySlug(slug: string): SectorPageData {
  const key = slug.toLowerCase();
  return SECTOR_PAGES[key] || SECTOR_PAGES['professional-public-services'];
}
