const MEDIA = 'https://www.lyveragroup.com/-/media/lyvera';

export type LyveraBrandPage = {
  slug: string;
  path: string;
  title: string;
  heroImage: string;
  heroVideo?: string;
  visitUrl: string;
  logoSrc: string;
  introTitle: string;
  introBody: string;
  sectionTwoTitle: string;
  sectionTwoBody: string;
  sectionThreeTitle: string;
  sectionThreeBody: string;
  galleryImages: { src: string; alt: string }[];
  anchors: { label: string; href: string }[];
};

export const LYVERA_BRAND_PAGES: LyveraBrandPage[] = [
  {
    slug: 'keith-prowse',
    path: '/brands/keith-prowse',
    title: 'Keith Prowse - part of Lyvera Group',
    heroImage: `${MEDIA}/resized-approved-images-for-pages/kp-approved-images/kp-image-33-635x635.png`,
    visitUrl: 'https://www.keithprowse.co.uk/',
    logoSrc: '/images/brands/keith-prowse.png',
    introTitle: 'Over 200 years of hospitality experience',
    introBody:
      "Keith Prowse, part of Lyvera Group, is one of the UK's most established hospitality experience specialists, with a heritage spanning more than 200 years.",
    sectionTwoTitle: 'A trusted leader in premium live experiences',
    sectionTwoBody:
      'It is longevity, credibility and commitment to quality that has established Keith Prowse as a trusted name in premium live experiences.',
    sectionThreeTitle: 'Official access to iconic events',
    sectionThreeBody:
      'Built on longstanding partnerships with leading venues and event owners, Keith Prowse creates refined, seamless experiences in exceptional settings.',
    galleryImages: [
      {
        src: `${MEDIA}/resized-approved-images-for-pages/kp-approved-images/kp-image-25-635x635.png`,
        alt: 'Guests at Queens',
      },
      {
        src: `${MEDIA}/resized-approved-images-for-pages/extra-images/3.png`,
        alt: 'Wimbledon hospitality',
      },
      {
        src: `${MEDIA}/resized-approved-images-for-pages/teg-approved-images/teg-image-10-635x635.png`,
        alt: 'Horse racing',
      },
    ],
    anchors: [
      { label: 'Events', href: '#events' },
      { label: 'Hospitality', href: '#hospitality' },
      { label: 'FAQs', href: '#faqs' },
      { label: 'Visit Keith Prowse', href: 'https://www.keithprowse.co.uk/' },
    ],
  },
  {
    slug: 'gullivers-sports-travel',
    path: '/brands/gullivers-sports-travel',
    title: 'Gullivers Sports Travel – part of Lyvera Group',
    heroImage: `${MEDIA}/resized-approved-images-for-pages/ei-approved-images/ei-image-7-635x635.png`,
    visitUrl: 'https://www.gulliverssportstravel.co.uk/',
    logoSrc: '/images/brands/gullivers-sports-travel.png',
    introTitle: 'Over 50 years of sports travel expertise',
    introBody:
      "For over half a century, Gullivers Sports Travel has been igniting the passion of sports fans with extraordinary travel experiences to the world's greatest events.",
    sectionTwoTitle: "Official travel to the world's greatest events",
    sectionTwoBody:
      'From the Six Nations to Formula 1 and The Ashes, Gullivers Sports Travel has become synonymous with world-class sporting experiences.',
    sectionThreeTitle: 'Expertly guided, authentically delivered',
    sectionThreeBody:
      'With guaranteed tickets, insider knowledge and a loyal community of repeat travellers, Gullivers Sports Travel delivers unforgettable stories.',
    galleryImages: [
      {
        src: `${MEDIA}/resized-approved-images-for-pages/teg-approved-images/teg-image-7-635x635.png`,
        alt: 'Silverstone Grand Prix',
      },
      {
        src: `${MEDIA}/resized-approved-images-for-pages/ei-approved-images/ei-image-7-635x635.png`,
        alt: 'Rugby fans',
      },
      {
        src: `${MEDIA}/resized-approved-images-for-pages/kp-approved-images/kp-image-33-635x635.png`,
        alt: 'Stadium atmosphere',
      },
    ],
    anchors: [
      { label: 'Events', href: '#first' },
      { label: 'Why Gullivers', href: '#second' },
      { label: 'FAQs', href: '#third' },
      {
        label: 'Visit Gullivers Sports Travel',
        href: 'https://gulliverstravel.co.uk/content/introducing-gullivers-sports-travel/',
      },
    ],
  },
  {
    slug: 'events-international',
    path: '/brands/events-international',
    title: 'Events International – part of Lyvera Group',
    heroImage: `${MEDIA}/resized-approved-images-for-pages/ei-approved-images/ei-image-7-635x635.png`,
    visitUrl: 'https://www.eventsinternational.co.uk/',
    logoSrc: '/images/brands/events-international.png',
    introTitle: 'Premium hospitality, expertly delivered',
    introBody:
      "Events International delivers exceptional VIP hospitality at many of the UK's most iconic sporting and entertainment events.",
    sectionTwoTitle: 'Official supplier to major UK events',
    sectionTwoBody:
      'As an Official Hospitality Supplier to major events such as the Six Nations, Cheltenham Festival and Royal Ascot, Events International provides unrivalled access.',
    sectionThreeTitle: 'Exceptional experiences at iconic venues',
    sectionThreeBody:
      'From Centre Court to Wembley Stadium, every experience is designed to place guests at the heart of the action.',
    galleryImages: [
      {
        src: `${MEDIA}/resized-approved-images-for-pages/kp-approved-images/kp-image-25-635x635.png`,
        alt: 'Fans at Wales v France',
      },
      {
        src: `${MEDIA}/resized-approved-images-for-pages/lvp-approved-images/lvp-image-3-635x635.png`,
        alt: 'Hospitality venue',
      },
      { src: `${MEDIA}/resized-approved-images-for-pages/extra-images/3.png`, alt: 'Horseracing' },
    ],
    anchors: [
      { label: 'Venues', href: '#venues' },
      { label: 'Who we are', href: '#about' },
      { label: 'FAQs', href: '#faqs' },
      { label: 'Visit Events International', href: 'https://www.eventsinternational.co.uk/' },
    ],
  },
  {
    slug: 'lime-venue-portfolio',
    path: '/brands/lime-venue-portfolio',
    title: 'Lime Venue Portfolio - part of Lyvera Group',
    heroImage: `${MEDIA}/resized-approved-images-for-pages/lvp-approved-images/lvp-image-3-635x635.png`,
    visitUrl: 'https://www.limevenueportfolio.com/',
    logoSrc: '/images/brands/lime-venue-portfolio.png',
    introTitle: "The UK's leading event venue finder",
    introBody:
      'Lime Venue Portfolio offers the largest collection of venues in the UK & Ireland, helping organisers find spaces that inspire and elevate every type of event.',
    sectionTwoTitle: 'Powered by a team of experienced event experts',
    sectionTwoBody:
      'Behind Lime Venue Portfolio is a highly experienced team who make the entire venue-finding process smooth, fast and reliable.',
    sectionThreeTitle: 'Leaders in sustainable, responsible experiences',
    sectionThreeBody:
      'Sustainability is a core pillar of Lime Venue Portfolio, empowering organisers to host events that support their ESG goals.',
    galleryImages: [
      {
        src: `${MEDIA}/resized-approved-images-for-pages/lvp-approved-images/lvp-image-3-635x635.png`,
        alt: 'Allianz Twickenham',
      },
      {
        src: `${MEDIA}/resized-approved-images-for-pages/teg-approved-images/teg-image-10-635x635.png`,
        alt: 'Aintree',
      },
      {
        src: `${MEDIA}/resized-approved-images-for-pages/extra-images/3.png`,
        alt: 'Tottenham Hotspur Stadium',
      },
    ],
    anchors: [
      { label: 'Sustainability', href: '#sustainability' },
      { label: 'Contact Us', href: '#contact' },
      { label: 'FAQs', href: '#faqs' },
      { label: 'Visit Lime Venue Portfolio', href: 'https://www.limevenueportfolio.com/' },
    ],
  },
  {
    slug: 'the-experience-golf',
    path: '/brands/the-experience-golf',
    title: 'The Experience Golf - part of Lyvera Group',
    heroImage: `${MEDIA}/resized-approved-images-for-pages/teg-approved-images/teg-image-10-635x635.png`,
    heroVideo:
      'https://starter-verticals.sitecoresandbox.cloud/api/public/content/effd332550f342279531bf40d8c87377?v=2ceeb541',
    visitUrl: 'https://www.theexperiencegolf.com/',
    logoSrc: '/images/brands/the-experience-golf.png',
    introTitle: 'Exceptional golf journeys, crafted with care',
    introBody:
      'The Experience Golf, part of Lyvera Group, designs exceptional golf journeys for those who want to experience the game at its very finest across the UK and Ireland.',
    sectionTwoTitle: 'Guaranteed St Andrews tee times',
    sectionTwoBody:
      'We make stepping onto the Old Course possible through bespoke itineraries that secure Old Course tee times as part of a fully curated experience.',
    sectionThreeTitle: 'Tailor-made experiences beyond the fairway',
    sectionThreeBody:
      'Each journey is bespoke by design — from championship golf and luxury accommodation to private transfers and cultural experiences.',
    galleryImages: [
      {
        src: `${MEDIA}/resized-approved-images-for-pages/teg-approved-images/teg-image-7-635x635.png`,
        alt: 'Golf course aerial',
      },
      {
        src: `${MEDIA}/resized-approved-images-for-pages/extra-images/how-we-do-it-updated.png`,
        alt: 'Golfers on course',
      },
      {
        src: `${MEDIA}/resized-approved-images-for-pages/kp-approved-images/kp-image-33-635x635.png`,
        alt: 'Ryder Cup fans',
      },
    ],
    anchors: [
      { label: 'St Andrews', href: '#first' },
      { label: 'All Golf Experiences', href: '#second' },
      { label: 'Our Expertise', href: '#third' },
      { label: 'FAQs', href: '#fourth' },
      {
        label: 'Visit The Experience Golf',
        href: 'https://www.theexperiencegolf.com/uk/about-us/introducing-the-experience-golf/',
      },
    ],
  },
  {
    slug: 'the-iluka-collective',
    path: '/brands/the-iluka-collective',
    title: 'The iLUKA Collective - part of Lyvera Group',
    heroImage: `${MEDIA}/resized-approved-images-for-pages/iluka-approved-images/iluka-2-635x635.jpg`,
    visitUrl: 'https://www.ilukacollective.com/',
    logoSrc: '/images/brands/the-iluka-collective.png',
    introTitle: 'Putting the human experience at the heart of everything we do',
    introBody:
      "For more than 30 years, The iLUKA Collective has been placing the world's greatest brands at the heart of the world's greatest sporting events.",
    sectionTwoTitle: 'Elevating client brands through the power of global sport',
    sectionTwoBody:
      'iLUKA delivers expert, scalable and globally-local solutions that bring marketing stories and on-site delivery to life.',
    sectionThreeTitle: 'Bespoke brand experiences built around human connection',
    sectionThreeBody:
      'Renowned for curating bespoke events and programs, iLUKA delivers meaningful engagement and unforgettable moments for clients.',
    galleryImages: [
      {
        src: `${MEDIA}/resized-approved-images-for-pages/iluka-approved-images/iluka-2-635x635.jpg`,
        alt: 'Olympic expo space',
      },
      { src: `${MEDIA}/resized-approved-images-for-pages/extra-images/3.png`, alt: 'Fans at game' },
      {
        src: `${MEDIA}/resized-approved-images-for-pages/ei-approved-images/ei-image-7-635x635.png`,
        alt: 'Event reception',
      },
    ],
    anchors: [
      { label: 'Experiences', href: '#experiences' },
      { label: 'Global Reach', href: '#global' },
      { label: 'FAQs', href: '#faqs' },
      { label: 'Visit The iLUKA Collective', href: 'https://www.ilukacollective.com/' },
    ],
  },
  {
    slug: 'the-venues-collection',
    path: '/brands/the-venues-collection',
    title: 'The Venues Collection - part of Lyvera Group',
    heroImage: `${MEDIA}/resized-approved-images-for-pages/lvp-approved-images/lvp-image-3-635x635.png`,
    visitUrl: 'https://www.thevenuescollection.co.uk/',
    logoSrc: '/images/brands/the-venues-collection.png',
    introTitle: 'Residential venues for every business or leisure trip',
    introBody:
      'The Venues Collection offers hotel accommodation and event space across five UK properties, providing comfortable ensuite bedrooms and peaceful surroundings.',
    sectionTwoTitle: 'Smart stays for business travel',
    sectionTwoBody:
      'Our hotels are designed to keep you focused, productive and comfortable from the moment you arrive.',
    sectionThreeTitle: 'Make your getaway feel effortless',
    sectionThreeBody:
      'Enjoy comfy rooms, great food, and easy access to the best local attractions perfect for weekend breaks and family fun.',
    galleryImages: [
      {
        src: `${MEDIA}/resized-approved-images-for-pages/lvp-approved-images/lvp-image-3-635x635.png`,
        alt: 'Eastwood',
      },
      {
        src: `${MEDIA}/resized-approved-images-for-pages/extra-images/how-we-do-it-updated.png`,
        alt: 'Milton Hill',
      },
      {
        src: `${MEDIA}/resized-approved-images-for-pages/kp-approved-images/kp-image-25-635x635.png`,
        alt: 'Yarnfield Park',
      },
    ],
    anchors: [
      { label: 'Smart Stays', href: '#stays' },
      { label: 'Contact Us', href: '#contact' },
      { label: 'FAQs', href: '#faqs' },
      { label: 'Visit The Venues Collection', href: 'https://www.thevenuescollection.co.uk/' },
    ],
  },
];

export function findBrandPageByPath(pathname: string): LyveraBrandPage | undefined {
  const normalized = pathname.replace(/\/$/, '').toLowerCase();
  return LYVERA_BRAND_PAGES.find((brand) => brand.path.toLowerCase() === normalized);
}
