/** Aspire recruitment demo. Page copy is also serialized so Pages can edit it. */

export const BRAND = {
  name: 'Aspire',
  phones: [
    { label: 'UK', value: '+44 (0)203 807 3709' },
    { label: 'US', value: '+1 646 980 3714' },
    { label: 'Singapore', value: '+65 8286 0434' },
    { label: 'UAE', value: '+971 5 8567 7873' },
  ],
};

export const NAV = [
  { label: 'Jobs', href: '/jobs' },
  { label: 'Candidates', href: '/candidates' },
  { label: 'Employers', href: '/employers' },
  { label: 'Insights', href: '/insights' },
  { label: 'Blog', href: '/blog' },
  { label: 'Consultants', href: '/consultants' },
];

export const SECTORS = [
  'Content',
  'Data',
  'Digital & Media',
  'Events',
  'Go-to-Market',
  'Marketing',
  'Research & Insight',
  'Sales',
  'SaaS Sales',
  'Technology',
];

export const HERO_WORDS = ['Global.', 'Human.', 'Experts.', 'Trusted.', 'Aspire.'];

export type Job = {
  slug: string;
  title: string;
  type: string;
  salary: string;
  location: string;
  sector: string;
  posted: string;
  reference: string;
  summary: string;
  body: string;
  consultant: string;
  image: string;
};

export type Consultant = {
  slug: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  location: string;
  bio: string;
  image: string;
};

export type Article = {
  slug: string;
  title: string;
  kicker: string;
  author: string;
  date: string;
  summary: string;
  body: string;
  image: string;
};

export type Branch = {
  slug: string;
  city: string;
  phone: string;
  address: string;
  body: string;
  image: string;
};

export const JOBS: Job[] = [
  {
    slug: 'account-executive-edtech-6039269',
    title: 'Account Executive - EdTech',
    type: 'Permanent',
    salary: '£50,000 - £55,000 per annum + uncapped commission',
    location: 'London',
    sector: 'Sales',
    posted: '3 days ago',
    reference: 'PR/087962',
    summary:
      'B2B sales role with a growing EdTech business. £50,000–£55,000 basic, uncapped commission, and hybrid working in London.',
    body: 'You will open new business with schools, education groups, and multi-academy trusts. The brief is consultative: discovery meetings, product demonstrations, and a pipeline you own through to close. Two years of B2B sales is the baseline. EdTech experience helps, and it is not required. OTE sits around £100,000–£110,000, with room to grow as the business expands beyond the UK.',
    consultant: 'ian-payne',
    image: 'job-edtech.jpg',
  },
  {
    slug: 'producer-singapore',
    title: 'Producer',
    type: 'Permanent',
    salary: 'Competitive, Singapore',
    location: 'Singapore',
    sector: 'Events',
    posted: '3 days ago',
    reference: 'PR/088104',
    summary:
      'Producer or assistant producer for a global engagement agency delivering live, virtual, and hybrid events.',
    body: 'You will run projects from brief to show day across international markets. The team wants someone who can hold a timeline, a budget, and a client conversation at the same time.',
    consultant: 'tommy-styles',
    image: 'job-events.jpg',
  },
  {
    slug: 'amazon-marketplace-manager',
    title: 'Amazon Marketplace Manager',
    type: 'Permanent',
    salary: '£50,000 - £65,000 per annum',
    location: 'City of London',
    sector: 'Digital & Media',
    posted: '4 days ago',
    reference: 'PR/088220',
    summary:
      'Shape how a premium beauty portfolio is sold on Amazon UK and Europe. Hybrid, four days a week near Euston.',
    body: 'This is a marketplace leadership role, not a listing tidy-up. You will protect brand presentation and grow the European account with a bonus on top of the base.',
    consultant: 'amy-kirby',
    image: 'job-marketplace.jpg',
  },
  {
    slug: 'account-director-saas',
    title: 'Account Director',
    type: 'Permanent',
    salary: '£70,000 - £90,000 per annum + bonus',
    location: 'London',
    sector: 'SaaS Sales',
    posted: '4 days ago',
    reference: 'PR/088301',
    summary:
      'Own a portfolio of enterprise clients for a hyper-growth technology company working with operations leaders.',
    body: 'You will grow existing relationships and open the next tier of accounts. The hiring manager wants a hunter who is comfortable with C-level conversations.',
    consultant: 'ian-payne',
    image: 'job-saas.jpg',
  },
  {
    slug: 'business-development-manager-education',
    title: 'Business Development Manager - International Education',
    type: 'Permanent',
    salary: '£50,000 - £70,000 + 10-20% bonus',
    location: 'London',
    sector: 'Sales',
    posted: '1 hour ago',
    reference: 'PR/088401',
    summary:
      'Remote UK new-business role selling international education to large organisations. Occasional travel.',
    body: 'Open doors with senior buyers and run a short two-stage process. Lauren James is the consultant.',
    consultant: 'lauren-james',
    image: 'job-saas.jpg',
  },
  {
    slug: 'account-manager-singapore',
    title: 'Account Manager',
    type: 'Permanent',
    salary: 'Competitive, Singapore',
    location: 'Singapore',
    sector: 'Events',
    posted: '3 days ago',
    reference: 'PR/088402',
    summary: 'Regional account role for a global events agency covering Singapore and wider APAC.',
    body: 'Build the annual plan for key accounts and grow the work across live and hybrid programmes. Tommy Styles is the consultant.',
    consultant: 'tommy-styles',
    image: 'job-events.jpg',
  },
  {
    slug: 'business-development-manager-ai',
    title: 'Business Development Manager - AI Scale-Up',
    type: 'Permanent',
    salary: '£70,000 - £75,000 + commission',
    location: 'City of London',
    sector: 'SaaS Sales',
    posted: '4 days ago',
    reference: 'PR/088403',
    summary:
      'Field-based commercial role for a technology consultancy building its London presence.',
    body: 'Spend the week with enterprise buyers and turn introductions into a pipeline. Rachel Trevillion is the consultant.',
    consultant: 'rachel-trevillion',
    image: 'job-saas.jpg',
  },
  {
    slug: 'commercial-manager-field-sales',
    title: 'Commercial Manager (field sales)',
    type: 'Permanent',
    salary: '£50,000 - £60,000 + uncapped commission',
    location: 'London',
    sector: 'Sales',
    posted: '5 days ago',
    reference: 'PR/088404',
    summary: 'Customer-facing sales across several London sites, five days a week.',
    body: 'Own the patch, report to a senior commercial manager, and earn monthly commission on top of the base. Lauren James is the consultant.',
    consultant: 'lauren-james',
    image: 'job-edtech.jpg',
  },
  {
    slug: 'central-sales-manager-london',
    title: 'Central Sales Manager',
    type: 'Permanent',
    salary: '£50,000 - £55,000, OTE £60,000 - £65,000',
    location: 'London',
    sector: 'Sales',
    posted: '5 days ago',
    reference: 'PR/088405',
    summary: 'Office-based sales lead near Aldgate, with two sales administrators.',
    body: 'Run the central team for a premium brand and report to the commercial director. Ian Payne is the consultant.',
    consultant: 'ian-payne',
    image: 'job-marketplace.jpg',
  },
  {
    slug: 'account-executive-newbury',
    title: 'Account Executive',
    type: 'Permanent',
    salary: 'Up to £35,000 + 8% bonus',
    location: 'Newbury',
    sector: 'Marketing',
    posted: '6 days ago',
    reference: 'PR/088406',
    summary: 'Support the sales desk of an independent marketing agency. Two days from home.',
    body: 'Coordinate the team around live opportunities rather than carrying a full new-business number. Becca Kitchen is the consultant.',
    consultant: 'becca-kitchen',
    image: 'job-edtech.jpg',
  },
  {
    slug: 'research-insight-lead',
    title: 'Research and Insight Lead',
    type: 'Permanent',
    salary: '£65,000 - £70,000',
    location: 'City of London',
    sector: 'Research & Insight',
    posted: '6 days ago',
    reference: 'PR/088407',
    summary: 'Client-side research lead. Mixed methods, three days in the City.',
    body: 'Set the insight agenda and sit with the commercial team, not only the research desk. Amy Kirby is the consultant.',
    consultant: 'amy-kirby',
    image: 'job-marketplace.jpg',
  },
  {
    slug: 'senior-research-manager-healthcare',
    title: 'Senior Research Manager (Healthcare)',
    type: 'Permanent',
    salary: '£41,000 - £51,000',
    location: 'London',
    sector: 'Research & Insight',
    posted: '6 days ago',
    reference: 'PR/088408',
    summary: 'Mid-level healthcare research on strategic studies. Two or three days in the office.',
    body: 'Run projects for a life-sciences consultancy and brief stakeholders in plain language. Mat Law is the consultant.',
    consultant: 'mat-law',
    image: 'job-saas.jpg',
  },

  {
    slug: 'senior-designer-6042762',
    title: 'Senior Designer',
    type: 'Permanent',
    salary: '£45000 - £50000 per annum',
    location: 'London',
    sector: 'Marketing',
    posted: 'Listed on Aspire',
    reference: 'PR/087964',
    summary:
      "Senior Designer £45,000-£50,000 per annum London | Hybrid We're looking for a talented, hands-on Senior Designer to join an established and growing B2B technology business, taking ownership of design and creative output…",
    body: "Senior Designer £45,000-£50,000 per annum London | Hybrid We're looking for a talented, hands-on Senior Designer to join an established and growing B2B technology business, taking ownership of design and creative output across the organisation. This is an exciting opportunity for a proactive designer who loves variety and wants genuine ownership. Working within the Brand team…",
    consultant: 'becca-kitchen',
    image: 'job-senior-designer-6042762.png',
  },
  {
    slug: 'senior-manager-demand-generation-6042692',
    title: 'Senior Manager, Demand Generation',
    type: 'Contract',
    salary: '£65000 - £70000 per annum',
    location: 'London',
    sector: 'Marketing',
    posted: 'Listed on Aspire',
    reference: 'PR/087963',
    summary:
      'Senior Manager, Demand Generation (12-Month Maternity Cover) London | Hybrid (3 days in office) | £65,000-£70,000 | Fixed-term contract The company Our client is a fast-growing B2B SaaS business in the media…',
    body: 'Senior Manager, Demand Generation (12-Month Maternity Cover) London | Hybrid (3 days in office) | £65,000-£70,000 | Fixed-term contract The company Our client is a fast-growing B2B SaaS business in the media intelligence space. Its platform helps comms and PR professionals find the right journalists, track their coverage and understand their impact. Clients range from leading…',
    consultant: 'becca-kitchen',
    image: 'job-marketplace.jpg',
  },
  {
    slug: 'account-executive-6042661',
    title: 'Account Executive',
    type: 'Permanent',
    salary: '£55000 - £60000 per annum + Commission',
    location: 'City of London',
    sector: 'Sales',
    posted: 'Listed on Aspire',
    reference: 'PR/087778',
    summary:
      'Account Executive - EdTech Location: Hybrid (London Office) Salary: £50,000 - £55,000 base + uncapped commission (OTE: £100,000 - £110,000) Are you a driven B2B sales professional looking to make a genuine impact in the…',
    body: 'Account Executive - EdTech Location: Hybrid (London Office) Salary: £50,000 - £55,000 base + uncapped commission (OTE: £100,000 - £110,000) Are you a driven B2B sales professional looking to make a genuine impact in the education sector? We are partnering with a high-growth EdTech business that is transforming how schools and education groups operate through one connected…',
    consultant: 'ian-payne',
    image: 'job-senior-designer-6042762.png',
  },
  {
    slug: 'consultant-healthcare-6041568',
    title: 'Consultant - Healthcare',
    type: 'Permanent',
    salary: '£35000 - £55000 per annum',
    location: 'London',
    sector: 'Research & Insight',
    posted: 'Listed on Aspire',
    reference: 'PR/087942',
    summary:
      'Are you a Consultant looking to work on a strategic projects? Then you could be the perfect fit for this role! JOB TITLE: Consultant - Healthcare SALARY: £35k - £55k LOCATION: London - 2 days in the office THE COMPANY…',
    body: 'Are you a Consultant looking to work on a strategic projects? Then you could be the perfect fit for this role! JOB TITLE: Consultant - Healthcare SALARY: £35k - £55k LOCATION: London - 2 days in the office THE COMPANY We are a representing a consultancy helping life-sciences and healthcare clients understand patients, professionals, and markets across the brand lifecycle,…',
    consultant: 'amy-kirby',
    image: 'job-edtech.jpg',
  },
  {
    slug: 'project-manager-mixed-methods-6041567',
    title: 'Project Manager (Mixed-Methods)',
    type: 'Permanent',
    salary: '£35000 - £45000 per annum',
    location: 'London',
    sector: 'Research & Insight',
    posted: 'Listed on Aspire',
    reference: 'PR/087920',
    summary:
      'Are you a mid-level project manager looking to work across both quantitative and qualitative researcher projects? Then you could be the perfect fit for the research company we are representing in this Project Manager…',
    body: 'Are you a mid-level project manager looking to work across both quantitative and qualitative researcher projects? Then you could be the perfect fit for the research company we are representing in this Project Manager role! JOB TITLE: Project Manager (Mixed-Methods) SALARY: £35k - £45k DOE LOCATION: London - 3 days a week in the office THE COMPANY We are representing a…',
    consultant: 'amy-kirby',
    image: 'job-edtech.jpg',
  },
  {
    slug: 'business-development-manager-6041265',
    title: 'Business Development Manager',
    type: 'Permanent',
    salary: '£45000 - £55000 per annum',
    location: 'City of London',
    sector: 'Research & Insight',
    posted: 'Listed on Aspire',
    reference: 'PR/087714',
    summary:
      'Are you a sales candidate looking to work in an international organisation? Then you could be the perfect fit for this business development orientated role. JOB TITLE: Business Development Manager SALARY: Up to £50k DOE…',
    body: 'Are you a sales candidate looking to work in an international organisation? Then you could be the perfect fit for this business development orientated role. JOB TITLE: Business Development Manager SALARY: Up to £50k DOE + commission (OTE circa £80k) LOCATION: London (Remote first - with travel) THE COMPANY We are representing an agency who help organisations better understand…',
    consultant: 'amy-kirby',
    image: 'job-edtech.jpg',
  },
  {
    slug: 'senior-research-executive-healthcare-6041264',
    title: 'Senior Research Executive (Healthcare)',
    type: 'Permanent',
    salary: '£35000 - £41000 per annum',
    location: 'City of London',
    sector: 'Research & Insight',
    posted: 'Listed on Aspire',
    reference: 'PR/087893',
    summary:
      'Are you a healthcare researcher looking to work on a strategic projects? Then you could be the perfect fit for this role! JOB TITLE: Senior Research Executive (Healthcare) SALARY Up to £41k LOCATION: London - 2/3 days…',
    body: 'Are you a healthcare researcher looking to work on a strategic projects? Then you could be the perfect fit for this role! JOB TITLE: Senior Research Executive (Healthcare) SALARY Up to £41k LOCATION: London - 2/3 days in the office THE COMPANY We are a representing a consultancy helping life-sciences and healthcare clients understand patients, professionals, and markets across…',
    consultant: 'amy-kirby',
    image: 'job-edtech.jpg',
  },
  {
    slug: 'data-engineer-6041263',
    title: 'Data Engineer',
    type: 'Permanent',
    salary: '£45000 - £60000 per annum',
    location: 'City of London',
    sector: 'Research & Insight',
    posted: 'Listed on Aspire',
    reference: 'PR/087834',
    summary:
      "Are you a senior data candidate looking to work for an award-winning organisation which is recognised for it's cutting-edge approach? Then this Data Scientist position could be the one for you JOB TITLE: Data Engineer…",
    body: "Are you a senior data candidate looking to work for an award-winning organisation which is recognised for it's cutting-edge approach? Then this Data Scientist position could be the one for you JOB TITLE: Data Engineer SALARY: Up to £60k DOE LOCATION: London (4 days in the office) THE COMPANY This independent agency is renowned for its trailblazing approach to media planning,…",
    consultant: 'amy-kirby',
    image: 'job-edtech.jpg',
  },
  {
    slug: 'research-and-insight-lead-client-side-6041261',
    title: 'Research and Insight Lead (Client-side)',
    type: 'Permanent',
    salary: '£65000 - £70000 per annum',
    location: 'City of London',
    sector: 'Research & Insight',
    posted: 'Listed on Aspire',
    reference: 'PR/087697',
    summary:
      'Are you a mixed-methods and analytics expert looking to join a client-side organisation? Then you could be the perfect fit for this empathetic and insightful organisation in this Director level role! JOB TITLE: Research…',
    body: 'Are you a mixed-methods and analytics expert looking to join a client-side organisation? Then you could be the perfect fit for this empathetic and insightful organisation in this Director level role! JOB TITLE: Research & Insight Lead (Client-side) SALARY: Up to £70k DOE LOCATION: London - 3 days a week in the office THE COMPANY We are representing a global…',
    consultant: 'amy-kirby',
    image: 'job-edtech.jpg',
  },
  {
    slug: 'commercial-account-manager-6041252',
    title: 'Commercial Account Manager',
    type: 'Permanent',
    salary: '£40000 - £50000 per annum',
    location: 'Newbury',
    sector: 'Research & Insight',
    posted: 'Listed on Aspire',
    reference: 'PR/087933',
    summary:
      'Do you get excited about growing existing and bringing on new clients? Then you could be the perfect fit for this agency in this Commercial Account Manager role! JOB TITLE: Commercial Account Manager SALARY Up to £50k +…',
    body: 'Do you get excited about growing existing and bringing on new clients? Then you could be the perfect fit for this agency in this Commercial Account Manager role! JOB TITLE: Commercial Account Manager SALARY Up to £50k + 20% bonus LOCATION: Newbury (2 days WFH) THE COMPANY A leading independent market research agency, they work with top industry names to deliver high-quality…',
    consultant: 'amy-kirby',
    image: 'job-edtech.jpg',
  },
  {
    slug: 'research-director-higher-education-6041251',
    title: 'Research Director (Higher Education)',
    type: 'Permanent',
    salary: 'Negotiable',
    location: 'London',
    sector: 'Research & Insight',
    posted: 'Listed on Aspire',
    reference: 'PR/087903',
    summary:
      'Are you a senior researcher with a background within the social and public sectors? Then you could be the perfect fit for this market research agency in this flexible role! JOB TITLE: Research Director (Higher…',
    body: 'Are you a senior researcher with a background within the social and public sectors? Then you could be the perfect fit for this market research agency in this flexible role! JOB TITLE: Research Director (Higher Education) SALARY: Depending on Experience LOCATION: London (Hybrid) THE COMPANY We are representing an independent social and market research agency, founded to help…',
    consultant: 'amy-kirby',
    image: 'job-edtech.jpg',
  },
  {
    slug: 'research-manager-quantitative-6041228',
    title: 'Research Manager (Quantitative)',
    type: 'Permanent',
    salary: '£40000 - £46000 per annum',
    location: 'London',
    sector: 'Research & Insight',
    posted: 'Listed on Aspire',
    reference: 'PR/008272',
    summary:
      'Are you a detail orientated Research Manager used to producing impactful solutions for your clients? Then you could be the perfect fit for this agency in this flexible Research Manager role! JOB TITLE: Research Manager…',
    body: 'Are you a detail orientated Research Manager used to producing impactful solutions for your clients? Then you could be the perfect fit for this agency in this flexible Research Manager role! JOB TITLE: Research Manager (Quantitative) SALARY: £40k - £46k DOE LOCATION: London THE COMPANY We are representing an agency who specialises in utilising innovative techniques to produce…',
    consultant: 'amy-kirby',
    image: 'job-edtech.jpg',
  },
  {
    slug: 'account-executive-6041216',
    title: 'Account Executive',
    type: 'Permanent',
    salary: '£28000 - £35000 per annum',
    location: 'Newbury',
    sector: 'Research & Insight',
    posted: 'Listed on Aspire',
    reference: 'PR/087932',
    summary:
      'Do you enjoy working collaberatively across a company and supporting the sales function? Then you could be the perfect fit for this agency in this Account Executive role! JOB TITLE: Account Executive SALARY Up to £35k +…',
    body: 'Do you enjoy working collaberatively across a company and supporting the sales function? Then you could be the perfect fit for this agency in this Account Executive role! JOB TITLE: Account Executive SALARY Up to £35k + 8% bonus LOCATION: Newbury (2 days WFH) THE COMPANY A leading independent market research agency, they work with top industry names to deliver high-quality…',
    consultant: 'amy-kirby',
    image: 'job-edtech.jpg',
  },
  {
    slug: 'research-executive-healthcare-quantitative-6041212',
    title: 'Research Executive (Healthcare - Quantitative)',
    type: 'Permanent',
    salary: '£28000 - £33000 per annum',
    location: 'City of London',
    sector: 'Research & Insight',
    posted: 'Listed on Aspire',
    reference: 'PR/087823',
    summary:
      'Are you a passionate junior researcher used to producing creative and authentic solutions for your clients? Then you could be the perfect fit for this agency in this flexible research role! JOB TITLE: Research Executive…',
    body: 'Are you a passionate junior researcher used to producing creative and authentic solutions for your clients? Then you could be the perfect fit for this agency in this flexible research role! JOB TITLE: Research Executive (Healthcare - Quantitative) SALARY: Up to £33k plus bonus LOCATION: London (Hybrid) THE COMPANY We are representing a privately owned specialist market…',
    consultant: 'amy-kirby',
    image: 'job-edtech.jpg',
  },
  {
    slug: 'senior-research-manager-healthcare-6041209',
    title: 'Senior Research Manager (Healthcare)',
    type: 'Permanent',
    salary: '£41000 - £51000 per annum',
    location: 'London',
    sector: 'Research & Insight',
    posted: 'Listed on Aspire',
    reference: 'PR/087894',
    summary:
      'Are you a mid-level healthcare researcher looking to work on a strategic projects? Then you could be the perfect fit for this role! JOB TITLE: Senior Research Manager (Healthcare) SALARY Up to £51k LOCATION: London -…',
    body: 'Are you a mid-level healthcare researcher looking to work on a strategic projects? Then you could be the perfect fit for this role! JOB TITLE: Senior Research Manager (Healthcare) SALARY Up to £51k LOCATION: London - 2/3 days in the office THE COMPANY We are a representing a consultancy helping life-sciences and healthcare clients understand patients, professionals, and…',
    consultant: 'amy-kirby',
    image: 'job-edtech.jpg',
  },
  {
    slug: 'research-director-quantitative-6041203',
    title: 'Research Director (Quantitative)',
    type: 'Permanent',
    salary: '£65000 - £70000 per annum',
    location: 'London',
    sector: 'Research & Insight',
    posted: 'Listed on Aspire',
    reference: 'PR/087882',
    summary:
      'Are you a detail orientated senior researcher used to producing impactful solutions for your clients? Then you could be the perfect fit for this agency in this flexible senior research role! JOB TITLE: Research Director…',
    body: 'Are you a detail orientated senior researcher used to producing impactful solutions for your clients? Then you could be the perfect fit for this agency in this flexible senior research role! JOB TITLE: Research Director (Quantitative) SALARY: Up to £70k LOCATION: London (Hybrid) THE COMPANY We are representing an agency who specialises in utilising quantitative techniques to…',
    consultant: 'amy-kirby',
    image: 'job-edtech.jpg',
  },
  {
    slug: 'senior-consultant-healthcare-6041194',
    title: 'Senior Consultant - Healthcare',
    type: 'Permanent',
    salary: '£55000 - £75000 per annum',
    location: 'London',
    sector: 'Research & Insight',
    posted: 'Listed on Aspire',
    reference: 'PR/087943',
    summary:
      'Are you a Senior Consultant looking to work on a strategic projects? Then you could be the perfect fit for this role! JOB TITLE: Senior Consultant - Healthcare SALARY: £55k - £75k LOCATION: London - 2 days in the office…',
    body: 'Are you a Senior Consultant looking to work on a strategic projects? Then you could be the perfect fit for this role! JOB TITLE: Senior Consultant - Healthcare SALARY: £55k - £75k LOCATION: London - 2 days in the office THE COMPANY We are a representing a consultancy helping life-sciences and healthcare clients understand patients, professionals, and markets across the brand…',
    consultant: 'amy-kirby',
    image: 'job-edtech.jpg',
  },
  {
    slug: 'data-automation-manager-6041188',
    title: 'Data Automation Manager',
    type: 'Permanent',
    salary: '£45000 - £60000 per annum',
    location: 'London',
    sector: 'Research & Insight',
    posted: 'Listed on Aspire',
    reference: 'PR/087040-6',
    summary:
      'Are you a candidate that loves automating process and driving offerings forward? Then you could be the perfect fit for this employee-centric company in this role. JOB TITLE: Data Automation Manager SALARY: £45k - £60k…',
    body: 'Are you a candidate that loves automating process and driving offerings forward? Then you could be the perfect fit for this employee-centric company in this role. JOB TITLE: Data Automation Manager SALARY: £45k - £60k DOE LOCATION: London (2 days a week in the office) THE COMPANY We are representing a research agency helping organisations better understand consumers,…',
    consultant: 'amy-kirby',
    image: 'job-edtech.jpg',
  },
  {
    slug: 'research-and-impact-manager-6041175',
    title: 'Research & Impact Manager',
    type: 'Contract',
    salary: '£50000 - £60000 per annum',
    location: 'London',
    sector: 'Research & Insight',
    posted: 'Listed on Aspire',
    reference: 'PR/087973',
    summary:
      'Are you passionate about delivering key insights to inform decisions? Then you could be the perfect fit for this agency in this flexible Research & Impact Manager role JOB TITLE: Research & Impact Manager SALARY Up to…',
    body: 'Are you passionate about delivering key insights to inform decisions? Then you could be the perfect fit for this agency in this flexible Research & Impact Manager role JOB TITLE: Research & Impact Manager SALARY Up to £60k LOCATION: London - 1 day a week in the office Duration: FTC - 4 months THE COMPANY We are representing a leading client-side organisation, helping…',
    consultant: 'amy-kirby',
    image: 'job-edtech.jpg',
  },
  {
    slug: 'data-analyst-digital-analytics-6041147',
    title: 'Data Analyst (Digital Analytics)',
    type: 'Permanent',
    salary: '£45000 - £55000 per annum',
    location: 'City of London',
    sector: 'Research & Insight',
    posted: 'Listed on Aspire',
    reference: 'PR/087975',
    summary:
      'Are you a mid-level data candidate looking to work in an innovative agency? Then you could be the perfect fit for this cutting age company in this role. JOB TITLE: Data Analyst (Digital Analytics) SALARY: £45k - £55k…',
    body: 'Are you a mid-level data candidate looking to work in an innovative agency? Then you could be the perfect fit for this cutting age company in this role. JOB TITLE: Data Analyst (Digital Analytics) SALARY: £45k - £55k LOCATION: London (Hybrid) THE COMPANY We are representing a brand transformation consultancy dedicated to helping organizations unlock and accelerate their future…',
    consultant: 'amy-kirby',
    image: 'job-edtech.jpg',
  },
];

export const CONSULTANTS: Consultant[] = [
  {
    slug: 'amy-kirby',
    name: 'Amy Kirby',
    role: 'Global Director - Research, Insight & Data',
    phone: '+44 (0)203 807 3709',
    email: 'amyk@weareaspire.com',
    location: 'London',
    bio: 'I started my career working in the market research industry, joining MORI in 1997 and then I moved to ORC International. I really enjoy engaging with people and when recruitment was suggested to me, I decided to pursue a career with RPCushing Recruitment (now Aspire). I have worked for Aspire since 2004 and progressed…',
    image: 'consultant-amy-kirby.jpg',
  },
  {
    slug: 'becca-kitchen',
    name: 'Becca Kitchen',
    role: 'Senior Executive Recruitment Consultant',
    phone: '+44 (0)203 807 3709',
    email: 'beccak@weareaspire.com',
    location: 'London',
    bio: "I have 4 years of creative recruitment experience, primarily across Production, Strategy, Client Services and Project Management. I've worked with agencies like Ogilvy, VCCP and AMV BBDO alongside boutiques like Something Studios, Chapel and Breaks. I've also had the privilege of partnering with brands including Estee…",
    image: 'consultant-becca-kitchen.png',
  },
  {
    slug: 'david-schofield',
    name: 'David Schofield',
    role: 'Talent Consultant',
    phone: '+44 (0)203 807 3709',
    email: 'davids@weareaspire.com',
    location: 'Birmingham',
    bio: 'Over my past five years’ in recruitment, I have got a passion for connecting talented professionals with opportunities that help them achieve their career goals. As a Talent Consultant at Aspire, I have a focus on Research and Insights where I work closely with candidates and take the time to get to know their…',
    image: 'consultant-david-schofield.png',
  },
  {
    slug: 'destiny-owoloko',
    name: 'Destiny Owoloko',
    role: 'Senior Recruitment Consultant',
    phone: '+44 (0)203 807 3709',
    email: 'destinyo@weareaspire.com',
    location: 'London',
    bio: 'At Aspire I specialise in digital media and creative roles – these include Paid Social, SEO and Digital Operations Media roles',
    image: 'consultant-destiny-owoloko.png',
  },
  {
    slug: 'ian-payne',
    name: 'Ian Payne',
    role: 'Talent Consultant',
    phone: '+44 (0)203 807 3709',
    email: 'ianp@weareaspire.com',
    location: 'London',
    bio: 'As a Talent Consultant at Aspire, I bring over two decades of experience in leadership, financial management, and operational coordination, honed through my career with HM Forces and various prestigious roles. I specialise in connecting ambitious graduates and aspiring professionals.At Aspire, I leverage my experience…',
    image: 'consultant-ian-payne.jpg',
  },
  {
    slug: 'katie-holmes',
    name: 'Katie Holmes',
    role: 'Senior Executive Director, US',
    phone: '+44 (0)203 807 3709',
    email: 'katieh@weareaspire.com',
    location: 'London',
    bio: 'With over 20 years of global recruitment experience across London, Hong Kong, and the US, Katie is a Senior Executive Director at Aspire, leading the US Sales and Marketing practice. She partners with high-growth SaaS, media, and technology businesses to identify and secure exceptional commercial leaders.Katie brings…',
    image: 'consultant-katie-holmes.jpg',
  },
  {
    slug: 'kayleigh-granger',
    name: 'Kayleigh Granger',
    role: 'Senior Talent Consultant',
    phone: '+44 (0)203 807 3709',
    email: 'Kayleighg@weareaspire.com',
    location: 'London',
    bio: 'Experienced Talent Recruitment Specialist with 16+ years delivering relationship‑led hiring strategies and high‑impact attraction campaigns across public and private sectors. Skilled in stakeholder engagement, compliance, and performance delivery, with a strong track record of driving results. I bring a people‑first,…',
    image: 'consultant-kayleigh-granger.jpg',
  },
  {
    slug: 'lauren-james',
    name: 'Lauren James',
    role: 'Senior Talent Specialist - Sales Division',
    phone: '+44 (0)203 807 3709',
    email: 'laurenj@weareaspire.com',
    location: 'London',
    bio: 'I am a senior talent specialist, and I have just over 5 years of experience in recruitment. I am recruiting for the sales industry with a focus on the marketing sector. I will be recruiting for a variety of roles, including head of sales, BDMs, account managers, and Campaign sales executives. This is my first time…',
    image: 'consultant-lauren-james.jpg',
  },
  {
    slug: 'mat-law',
    name: 'Mat Law',
    role: 'Associate Director',
    phone: '+44 (0)203 807 3709',
    email: 'matl@weareaspire.com',
    location: 'London',
    bio: 'After graduating from the University of Leicester with a business degree I decided to go into recruitment and have spent almost 10 years since then recruiting within the insight sector for a variety of cross-sector clients. I joined Aspire in September 2019 as a Senior Consultant in our London office. Since then, I’ve…',
    image: 'consultant-mat-law.png',
  },
  {
    slug: 'max-tullis-turner',
    name: 'Max Tullis-Turner',
    role: 'Senior Executive Recruitment Consultant',
    phone: '+44 (0)203 807 3709',
    email: 'maxt@weareaspire.com',
    location: 'London',
    bio: 'With over a decade in recruitment, I lead Aspire’s digital hiring, specialising in performance marketing, eCommerce, and digital content roles. I’ve built and scaled teams of 50+ as well as placed senior leaders, including CMOs, working with both FTSE 100 companies and high-growth startups. My focus is on delivering…',
    image: 'consultant-max-tullis-turner.png',
  },
  {
    slug: 'meg-rayner',
    name: 'Meg Rayner',
    role: 'Senior Executive Director',
    phone: '+1 646 980 3714',
    email: 'megr@weareaspire.com',
    location: 'New York',
    bio: 'I started my career as a Sales & Marketing executive at Ballantyne Edwards in 1998 before moving on to work as a Senior Branch Manager at The Adecco Group where I remained for 21 years, having multiple other roles including UK Operations Manager. During my time there I was responsible for a quarter of Adecco’s UK…',
    image: 'consultant-meg-rayner.jpg',
  },
  {
    slug: 'rachel-trevillion',
    name: 'Rachel Trevillion',
    role: 'Divisional Manager - Technology Sales',
    phone: '+44 (0)203 807 3709',
    email: 'rachelt@weareaspire.com',
    location: 'London',
    bio: 'Meet Rachel Trevillion. An experienced consultant specialising in Sales. Offering strategic guidance and hiring solutions to drive your business growth.',
    image: 'consultant-rachel-trevillion.jpg',
  },
  {
    slug: 'terry-payne',
    name: 'Terry Payne',
    role: 'Chief Executive Officer',
    phone: '+44 (0)203 807 3709',
    email: 'terryp@weareaspire.com',
    location: 'Exeter',
    bio: 'I am a very experienced and enthusiastic leader with an impressive 24 years working in staffing and recruitment sales. Having built an industrial temps desk from 0 to 120 in my first year, and previously Head of Adia UK, a staffing affiliate company of Adecco Group, I have proved to be a key player in success. I…',
    image: 'consultant-terry-payne.png',
  },
  {
    slug: 'andrea-robinson',
    name: 'Andrea Robinson',
    role: 'Global Operations Director',
    phone: '+44 (0)203 807 3709',
    email: 'andrear@weareaspire.com',
    location: 'Birmingham',
    bio: "I look after all things data and systems at Aspire. My key motivator is trying to make our consultants' jobs as simple as possible, providing them with ways to do their job as effectively as I can. This is achieved by providing MI reporting and extensive automation. I moved to the UK from South Africa in 2006,…",
    image: 'consultant-andrea-robinson.png',
  },
  {
    slug: 'charlotte-heard',
    name: 'Charlotte Heard',
    role: 'Global HR Director',
    phone: '+44 (0)203 807 3709',
    email: 'charlotteh@weareaspire.com',
    location: 'London',
    bio: 'In my role at Aspire, I look after all the people operations and initiatives at the company. This allows me to ensure all employees feel supported no matter what internal or external factors may be affecting them.Each employee has their own motivators and ambitions, and one aspect of my role that I love is being able…',
    image: 'consultant-charlotte-heard.png',
  },
  {
    slug: 'tommy-styles',
    name: 'Tommy Styles',
    role: 'Global Marketing Director',
    phone: '+44 (0)203 807 3709',
    email: 'tommys@weareaspire.com',
    location: 'London',
    bio: 'I joined Aspire in June 2020 with a background in recruitment marketing across businesses of different sizes, geographies, and sectors. Specialising initially in web design and digital marketing I have moved into a more general role focussed on turning marketing departments into revenue drivers for their business as…',
    image: 'consultant-tommy-styles.png',
  },
];

export const ARTICLES: Article[] = [
  {
    slug: '2026/07/the-counter-offer-crisis-how-to-secure-your-ideal-candidate',
    title: 'The Counter-Offer Crisis: How to Secure Your Ideal Candidate',
    kicker: 'General',
    author: 'Tommy Styles',
    date: 'July 2026',
    summary:
      'Counter-offers are turning resignations into bidding wars. Close the conversation before the current employer does.',
    body: 'Replacing someone costs more than a pay rise, so current employers are matching offers late in the process. The way through is to talk about the counter-offer in the first interviews, not the week they resign. Culture, a clear first month, and an early introduction to the team outweigh a temporary bump in salary. Hold the original offer when the motivations were never about money. If they were, you will hear that early.',
    image: 'article-counter-offer.jpg',
  },
  {
    slug: '2026/07/beyond-seo-and-geo',
    title: 'Beyond SEO: Why Your Next Marketing Hire Needs to Understand GEO',
    kicker: 'General',
    author: 'Tommy Styles',
    date: 'July 2026',
    summary:
      'Search is splitting between classic rankings and answers written by generative engines. The next marketing hire has to brief both.',
    body: 'A strong SEO lead still matters. The briefs that win now also explain how a brand shows up inside generated answers. Hire for someone who can write the source material, not only the meta tags.',
    image: 'article-geo.jpg',
  },
  {
    slug: '2026/07/stop-hiring-for-pedigree',
    title: 'Stop Hiring for Pedigree, Start Hiring for Potential',
    kicker: 'General',
    author: 'Tommy Styles',
    date: 'July 2026',
    summary:
      'Scarce skills are being missed because CVs are still screened for a degree from the right place.',
    body: 'Test the work. Self-taught people and career-changers often solve the problem the pedigree CV only describes. Skills-based interviews also keep salary inflation in check.',
    image: 'article-counter-offer.jpg',
  },
  {
    slug: '2026/07/internal-ta-and-agencies',
    title: 'Why Internal TA and External Agencies Work Better Together',
    kicker: 'General',
    author: 'Tommy Styles',
    date: 'July 2026',
    summary:
      'In-house talent teams and specialist agencies cover different parts of the same search.',
    body: 'Internal TA knows the culture. An agency can map people who are not applying. Share salary signals and split the hardest roles so the in-house team can stay with the candidate experience.',
    image: 'article-geo.jpg',
  },
  {
    slug: '2026/06/employer-branding-on-a-budget',
    title: 'Employer Branding on a Budget',
    kicker: 'General',
    author: 'Tommy Styles',
    date: 'June 2026',
    summary:
      'Smaller firms can win candidates who want impact more than a corporate signing bonus.',
    body: 'Tell the truth about autonomy, pace, and how quickly someone can take on more. That story competes with a larger salary when the work itself is the offer.',
    image: 'article-counter-offer.jpg',
  },
  {
    slug: '2026/06/hiring-for-agility',
    title: 'Hiring for Agility',
    kicker: 'General',
    author: 'Tommy Styles',
    date: 'June 2026',
    summary:
      'Software skills date quickly. The hire who can unlearn is the one still useful next year.',
    body: 'Interview for curiosity and for people who stay useful when the tools change. A trainable operator often beats a certificate that will be out of date.',
    image: 'article-geo.jpg',
  },
];

export const BRANCHES: Branch[] = [
  {
    slug: 'London',
    city: 'London',
    phone: '+44 (0)203 807 3709',
    address: '22 Bishopsgate, 7th Floor, XCHG Spaces, London EC2N 4AJ',
    body: 'Aspire London recruits across content, digital and media, events, marketing, sales, research and insight, and technology. Liverpool Street, Moorgate, and London Bridge are the nearest stations. Broadgate and Minories are the closest car parks.',
    image: 'london-office.jpg',
  },
  {
    slug: 'Exeter',
    city: 'Exeter',
    phone: '+44 (0)203 807 3709',
    address: 'Winslade Park, Manor Drive, Clyst St Mary, Exeter EX5 1FY',
    body: 'The Exeter office supports clients across the South West.',
    image: 'hero-office.jpg',
  },
  {
    slug: 'New-York',
    city: 'New York',
    phone: '+1 646 473 2549',
    address: '85 Broad St, WeWork 17th Floor, New York, NY 10004',
    body: 'The New York desk covers US sales, marketing, and technology searches.',
    image: 'promo-partnership.jpg',
  },
  {
    slug: 'Singapore',
    city: 'Singapore',
    phone: '+65 8286 0434',
    address: '10 Anson Road, #33-03, International Plaza, Singapore 079903',
    body: 'Singapore covers APAC briefs in events, marketing, and commercial leadership.',
    image: 'job-events.jpg',
  },
  {
    slug: 'Dubai',
    city: 'Dubai',
    phone: '+971 502 431 266',
    address: 'Level 5, One JLT Tower 1, Jumeirah Lakes Towers, Dubai',
    body: 'The Dubai office supports MENA hiring for sales and marketing teams.',
    image: 'job-saas.jpg',
  },
];

export function jobHref(job: Job): string {
  return `/job/${job.slug}`;
}

export function consultantHref(person: Consultant): string {
  return `/consultants/${person.slug}`;
}

export function articleHref(article: Article): string {
  return `/blog/${article.slug}`;
}

export function branchHref(branch: Branch): string {
  return `/branches/${branch.slug}`;
}

function cleanPath(asPath: string): string {
  return asPath.split('?')[0].replace(/\/$/, '') || '/';
}

export function jobFromPath(asPath: string): Job | undefined {
  const path = cleanPath(asPath);
  return JOBS.find((job) => path.endsWith(`/job/${job.slug}`));
}

export function consultantFromPath(asPath: string): Consultant | undefined {
  const path = cleanPath(asPath);
  return CONSULTANTS.find((person) => path.endsWith(`/consultants/${person.slug}`));
}

export function articleFromPath(asPath: string): Article | undefined {
  const path = cleanPath(asPath);
  return ARTICLES.find((article) => path.endsWith(`/blog/${article.slug}`));
}

export function branchFromPath(asPath: string): Branch | undefined {
  const path = cleanPath(asPath);
  const match = path.match(/\/branches\/([^/]+)$/i);
  if (!match) return undefined;
  const slug = decodeURIComponent(match[1]);
  return BRANCHES.find((branch) => branch.slug.toLowerCase() === slug.toLowerCase());
}

export function jobsForConsultant(slug: string): Job[] {
  return JOBS.filter((job) => job.consultant === slug);
}

export function textValue(field: { value?: unknown } | undefined, fallback: string): string {
  return typeof field?.value === 'string' && field.value.trim() ? field.value : fallback;
}
