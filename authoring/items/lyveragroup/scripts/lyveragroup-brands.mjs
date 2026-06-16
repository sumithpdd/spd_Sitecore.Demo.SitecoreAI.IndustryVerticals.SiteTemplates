/**
 * Lyvera Group brand portfolio — sites, personas, and customer journeys.
 * Pattern: PepsiCo multi-site under one tenant + one rendering host (`lyvera`).
 */

export const RENDERING_HOST = 'lyvera';

export const TENANT_PATH = '/sitecore/content/lyveragroup';

/** @typedef {'corporate' | 'brand'} SiteKind */

/**
 * @typedef {Object} BrandPersona
 * @property {string} name
 * @property {string} jobTitle
 * @property {string} objective
 */

/**
 * @typedef {Object} BrandDefinition
 * @property {string} slug Sitecore site name / folder (e.g. events-international)
 * @property {string} displayName
 * @property {string} website
 * @property {SiteKind} kind
 * @property {string} summary What they do
 * @property {string} primaryCustomer
 * @property {string} primaryGoal
 * @property {BrandPersona} persona
 * @property {string[]} journey Discover → Expand stages (6 steps)
 * @property {boolean} [enabled] Generate serialization when true
 */

export const LYVERA_GROUP_BRANDS = [
  {
    slug: 'lyvera',
    displayName: 'Lyvera',
    website: 'https://www.lyveragroup.com/',
    kind: 'corporate',
    summary: 'Umbrella brand uniting Levy sports and entertainment businesses.',
    primaryCustomer: 'Corporate and agency buyers across the portfolio',
    primaryGoal: 'Understand the group and explore specialist brands.',
    persona: {
      name: 'Corporate buyer',
      jobTitle: 'Marketing / procurement lead',
      objective: 'Find the right specialist brand for an experience brief.',
    },
    journey: [
      'Discover group positioning',
      'Explore brand portfolio',
      'Compare capabilities',
      'Contact group or brand',
      'Book experiences',
      'Cross-sell sister brands',
    ],
    enabled: true,
  },
  {
    slug: 'events-international',
    displayName: 'Events International',
    website: 'https://eventsinternational.co.uk/',
    kind: 'brand',
    summary:
      'Official hospitality and event experiences for major sporting and entertainment events.',
    primaryCustomer: 'Corporate buyers, agencies, VIP guests',
    primaryGoal: 'Book premium hospitality packages and corporate entertainment.',
    persona: {
      name: 'Emma Wilson',
      jobTitle: 'Corporate Events Manager',
      objective: 'Impress clients through premium hospitality experiences.',
    },
    journey: [
      'Search for event hospitality',
      'Compare packages',
      'Download brochure',
      'Book hospitality',
      'Future event offers',
      'Cross-sell other events',
    ],
    enabled: true,
  },
  {
    slug: 'gullivers-sports-travel',
    displayName: 'Gullivers Sports Travel',
    website: 'https://www.gulliverssportstravel.co.uk/',
    kind: 'brand',
    summary: 'Sports travel specialist offering tickets, accommodation and travel packages.',
    primaryCustomer: 'Sports fans, supporter groups, corporate groups',
    primaryGoal: 'Book complete sports travel experiences.',
    persona: {
      name: 'David Harris',
      jobTitle: 'Rugby Fan & Traveller',
      objective: 'Book a hassle-free sports travel package.',
    },
    journey: [
      'Search for Six Nations travel',
      'Review itineraries',
      'Check availability',
      'Book package',
      'Future tournaments',
      'Cross-sell hospitality',
    ],
    enabled: false,
  },
  {
    slug: 'keithprowse',
    displayName: 'Keith Prowse',
    website: 'https://www.keithprowse.co.uk/',
    kind: 'brand',
    summary:
      "Premium hospitality provider for Wimbledon, Twickenham, Lord's and other major events.",
    primaryCustomer: 'Corporate hospitality buyers, affluent consumers',
    primaryGoal: 'Purchase VIP hospitality experiences.',
    persona: {
      name: 'Sarah Bennett',
      jobTitle: 'Head of Client Entertainment',
      objective: 'Secure premium hospitality for key customers.',
    },
    journey: [
      'Search Wimbledon hospitality',
      'Compare hospitality options',
      'Review pricing',
      'Purchase hospitality',
      'Future hospitality events',
      'Cross-sell travel',
    ],
    enabled: true,
  },
  {
    slug: 'theexperiencegolf',
    displayName: 'The Experience Golf',
    website: 'https://www.theexperiencegolf.com/',
    kind: 'brand',
    summary: 'Luxury golf travel and golf tournament experiences worldwide.',
    primaryCustomer: 'Golf enthusiasts, golf societies, affluent travellers',
    primaryGoal: 'Enquire and book premium golf trips.',
    persona: {
      name: 'James Thornton',
      jobTitle: 'Golf Society Captain',
      objective: 'Organise a luxury golf trip for members.',
    },
    journey: [
      'Search golf holidays',
      'Browse destinations',
      'Request itinerary',
      'Submit enquiry',
      'New golf experiences',
      'Cross-sell tournaments',
    ],
    enabled: false,
  },
  {
    slug: 'thevenuescollection',
    displayName: 'The Venues Collection',
    website: 'https://www.thevenuescollection.co.uk/',
    kind: 'brand',
    summary: 'Collection of conference venues, hotels and meeting spaces across the UK.',
    primaryCustomer: 'Event planners, conference organisers, procurement teams',
    primaryGoal: 'Find and book venues.',
    persona: {
      name: 'Rachel Cooper',
      jobTitle: 'Conference Manager',
      objective: 'Find the right venue for an event.',
    },
    journey: [
      'Search conference venues',
      'Browse venues',
      'Shortlist venues',
      'Request proposal',
      'Repeat bookings',
      'Cross-sell event services',
    ],
    enabled: false,
  },
  {
    slug: 'limevenueportfolio',
    displayName: 'Lime Venue Portfolio',
    website: 'https://www.limevenueportfolio.com/',
    kind: 'brand',
    summary: 'Venue sourcing service representing unique venues across the UK.',
    primaryCustomer: 'Event agencies, corporate event planners',
    primaryGoal: 'Match clients to suitable venues.',
    persona: {
      name: 'Michael Jones',
      jobTitle: 'Event Planner',
      objective: 'Source venues quickly and efficiently.',
    },
    journey: [
      'Search unique venues',
      'Browse portfolio',
      'Shortlist venues',
      'Request proposal',
      'Repeat bookings',
      'Cross-sell event services',
    ],
    enabled: false,
  },
  {
    slug: 'iluka-collective',
    displayName: 'The iLUKA Collective',
    website: 'https://www.ilukacollective.com/',
    kind: 'brand',
    summary:
      'Experiential marketing, sponsorship activation and brand experience agency.',
    primaryCustomer: 'Global brands, sponsors, marketing teams',
    primaryGoal: 'Deliver immersive brand activations and experiences.',
    persona: {
      name: 'Sophie Adams',
      jobTitle: 'Brand Partnerships Director',
      objective: 'Deliver memorable experiential campaigns.',
    },
    journey: [
      'Discover agency capabilities',
      'Review case studies',
      'Brief agency',
      'Launch activation',
      'Measure impact',
      'Expand partnership',
    ],
    enabled: false,
  },
];

export function getBrand(slug) {
  const brand = LYVERA_GROUP_BRANDS.find((b) => b.slug === slug);
  if (!brand) throw new Error(`Unknown Lyvera Group brand slug: ${slug}`);
  return brand;
}

export function enabledBrands() {
  return LYVERA_GROUP_BRANDS.filter((b) => b.enabled);
}

/** Module include name — prefix with lyveragroup- for global uniqueness where needed */
export function moduleIncludeName(slug) {
  return slug === 'lyvera' ? 'lyvera' : slug;
}

/** Serialization folder under authoring/items/lyveragroup/ (matches module include name) */
export function serialRootFolder(slug) {
  return slug;
}
