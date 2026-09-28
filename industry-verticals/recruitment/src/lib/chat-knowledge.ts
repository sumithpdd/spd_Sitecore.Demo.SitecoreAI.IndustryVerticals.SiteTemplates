export type ChatSource = { title: string; href: string };

type Rule = { match: RegExp; text: string; sources?: ChatSource[] };

const RULES: Rule[] = [
  {
    match: /job|role|edtech|sales|hiring/i,
    text: 'Open jobs are on /jobs. The Account Executive - EdTech brief is in London, permanent, £50,000–£55,000 plus uncapped commission. Ian Payne is the consultant.',
    sources: [
      { title: 'Search jobs', href: '/jobs' },
      { title: 'Account Executive - EdTech', href: '/job/account-executive-edtech-6039269' },
    ],
  },
  {
    match: /ian|consultant|payne/i,
    text: 'Ian Payne is a talent consultant in London. Call 0208 158 0757 or email ianp@weareaspire.com. His live roles sit on his profile.',
    sources: [{ title: 'Ian Payne', href: '/consultants/ian-payne' }],
  },
  {
    match: /london|office|branch|bishopsgate/i,
    text: 'The London office is 22 Bishopsgate, 7th Floor, XCHG Spaces, EC2N 4AJ. Phone +44 (0)203 807 3709. Exeter, New York, Singapore, and Dubai are on the same branch list.',
    sources: [{ title: 'London', href: '/branches/London' }],
  },
  {
    match: /candidate|cv|career/i,
    text: 'Candidates can send a CV and a consultant will match it to roles that are not all on the public board. Start on the candidates page.',
    sources: [{ title: 'Candidates', href: '/candidates' }],
  },
  {
    match: /employ|hire|counter-offer|brief/i,
    text: 'Employers can brief a search as contingency, retained, contract, or managed services. The counter-offer note on the journal is the current hiring advice.',
    sources: [
      { title: 'Employers', href: '/employers' },
      {
        title: 'The counter-offer crisis',
        href: '/blog/2026/07/the-counter-offer-crisis-how-to-secure-your-ideal-candidate',
      },
    ],
  },
];

export const CHAT_PROMPTS = ['London jobs', 'Ian Payne', 'Brief a hire'];

export function answerChat(question: string): { text: string; sources: ChatSource[] } {
  const rule = RULES.find((item) => item.match.test(question));
  if (rule) return { text: rule.text, sources: rule.sources || [] };
  return {
    text: 'I can point you to jobs, consultants, offices, or the journal. Try “EdTech role” or “London office”.',
    sources: [{ title: 'Jobs', href: '/jobs' }],
  };
}
