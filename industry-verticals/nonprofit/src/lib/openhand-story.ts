export type StoryBeat = {
  id: string;
  act: 1 | 2 | 3;
  title: string;
  subtitle: string;
  talk: string;
  point: string;
  href: string;
  hrefLabel: string;
};

export const STORY_ACTS = [
  { act: 1 as const, title: 'The signal — emergency help + Scrunch', weight: '~25%' },
  {
    act: 2 as const,
    title: 'Northgate, Maria, winter appeal — content operations',
    weight: '~50%',
  },
  { act: 3 as const, title: 'Measure, A/B fundraise, AXP', weight: '~25%' },
];

export const STORY_BEATS: StoryBeat[] = [
  {
    id: '1',
    act: 1,
    title: 'ChatGPT cites the emergency-grant page',
    subtitle: 'AEO, not a blog',
    talk: 'Priya (supporter ops) watches ChatGPT answer “money has run out UK charity” with Openhand’s emergency-grant page — start with help, not a loan; freephone 0800 090 0000; no donate wall.',
    point:
      'This is the AEO citation page. Energy and rent sit one click down. Food and council tax are folded into those pages.',
    href: '/get-help/help-when-the-money-runs-out',
    hrefLabel: 'Open the AEO page',
  },
  {
    id: '2',
    act: 1,
    title: 'Scrunch topic gap',
    subtitle: 'Winter disconnection queries',
    talk: 'Scrunch shows competitors ranking for “cannot pay rent” while Openhand’s page is thin in citations. Fix is the article, not a homepage rewrite.',
    point: 'Monitor first, then the CMS.',
    href: '/scrunch',
    hrefLabel: 'Scrunch Monitor',
  },
  {
    id: '3',
    act: 2,
    title: 'Northgate is the named partner',
    subtitle: 'Dawn Allen equivalent',
    talk: 'Jordan Hale at Northgate Community Hub is the conversion asset — local, specific, same pattern as a named lawyer.',
    point: 'Partner pages carry photography. Advice still leads with steps.',
    href: '/partners/northgate-community-hub',
    hrefLabel: 'Northgate hub',
  },
  {
    id: '4',
    act: 2,
    title: 'Maria’s story',
    subtitle: 'Lived experience',
    talk: 'Walk Maria’s winter meter story. Eye-contact portrait. Then return to the energy advice page so the talk track shows both surfaces.',
    point: 'Stories recruit givers. Advice serves people in crisis.',
    href: '/stories/maria-winter-bills',
    hrefLabel: 'Maria’s story',
  },
  {
    id: '4b',
    act: 2,
    title: 'Leeds winter walk',
    subtitle: 'EventPage with speakers',
    talk: 'From Maria’s story, open the winter walk. Jordan Hale is the speaker — same person as Northgate. Register goes to donate because this is the fundraising event.',
    point: 'Events reuse people. Fundraise grid deep-links here.',
    href: '/events/leeds-winter-walk',
    hrefLabel: 'Winter walk',
  },
  {
    id: '4c',
    act: 2,
    title: 'Winter match news',
    subtitle: 'ArticlePage under /news',
    talk: 'The news article extends the match to 21 December. Same ArticlePage template as advice, Jordan as author, dummy photography.',
    point: 'News and advice share authors. Listing is /news.',
    href: '/news/winter-match-extended',
    hrefLabel: 'Match news',
  },
  {
    id: '5',
    act: 2,
    title: 'Mini CMS edit',
    subtitle: 'Update the grant line',
    talk: 'Emma (content) edits the Household Support Fund sentence in Mini CMS. Workflow is draft → approve, not a ticket to IT.',
    point: 'Authors own the AEO page.',
    href: '/cms',
    hrefLabel: 'Mini CMS',
  },
  {
    id: '6',
    act: 2,
    title: 'Winter appeal + match',
    subtitle: 'Countdown and total',
    talk: 'Switch ?appeal=winter. Header takeover, raised/target, match deadline. Photography belongs here.',
    point: 'Give audience vs help audience.',
    href: '/appeals/winter?audience=give&appeal=winter',
    hrefLabel: 'Winter appeal',
  },
  {
    id: '7',
    act: 2,
    title: 'Emergency takeover',
    subtitle: '?appeal=emergency',
    talk: 'Flip to emergency. Site chrome shifts. Donate CTA stays.',
    point: 'One IA, two intensities.',
    href: '/appeals/emergency?appeal=emergency',
    hrefLabel: 'Emergency appeal',
  },
  {
    id: '8',
    act: 3,
    title: 'Fundraise A/B',
    subtitle: '?promo=left|right',
    talk: 'Event grid is the A/B surface. Left vs right promo creative; cards deep-link to EventPages.',
    point: 'Personalize without a new page type.',
    href: '/fundraise?promo=right',
    hrefLabel: 'Fundraise (promo right)',
  },
  {
    id: '9',
    act: 3,
    title: 'Search toggle',
    subtitle: 'ChatGPT / Google',
    talk: 'Same catalog, two result skins — how the page is cited vs how Google lists it.',
    point: 'AEO and SEO share one index.',
    href: '/search?q=energy',
    hrefLabel: 'Search energy',
  },
  {
    id: '10',
    act: 3,
    title: 'AXP on',
    subtitle: '?axp=1',
    talk: 'Scrunch AXP pane: crawlers get the same facts as HTML, fewer tokens.',
    point: 'Same content, structured delivery.',
    href: '/scrunch?axp=1',
    hrefLabel: 'Scrunch AXP',
  },
  {
    id: '11',
    act: 3,
    title: 'Supporter email',
    subtitle: 'Winter match',
    talk: 'Preview the email that follows ?utm_source=email. Deep link preserves demo params.',
    point: 'Owned channel, same IA.',
    href: '/email?utm_source=email&appeal=winter',
    hrefLabel: 'Email preview',
  },
  {
    id: '12',
    act: 3,
    title: 'Help vs give home',
    subtitle: '?audience=',
    talk: 'Home hero swaps. Help leads to advice. Give leads to donate and winter appeal.',
    point: 'One homepage, two intents.',
    href: '/?audience=give',
    hrefLabel: 'Home (give)',
  },
];
