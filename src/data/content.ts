export const personal = {
  name: 'Harshraj Shrivastava',
  tagline: 'B2B Demand Generation & Market Research | MBA Candidate, Great Lakes Institute of Management',
  intro: 'Analytical problem-solver who turns customer and market insight into measurable business outcomes.',
  email: 'hrs091201@gmail.com',
  emailAlt: 'Harshraj.ft272017@greatlakes.edu.in',
  phone: '9981124293',
  linkedin: 'https://www.linkedin.com/in/harshraj-shrivastava/',
  city: 'Bangalore',
}

export const stats = [
  { label: 'Months Experience', value: 24, suffix: '+' },
  { label: 'Pipeline Generated', value: 80, prefix: '$', suffix: 'K+' },
  { label: 'Qualified Leads', value: 100, suffix: '+' },
  { label: 'Brands/Month Researched', value: 300, suffix: '+' },
]

export const experience = [
  {
    role: 'Sales Catalyst',
    company: 'Convertcart',
    period: 'Oct 2024 – Oct 2025',
    bullets: [
      'Profiled 300+ eCommerce brands/month through structured market research, analysing UX and engagement signals to identify high-potential accounts, improving segmentation accuracy by 25%.',
      'Tracked and analysed 20+ monthly campaigns on open, reply and conversion metrics, achieving a 19% uplift in response rates and a 42% increase in qualified client meetings.',
      'Supported the end-to-end demand generation cycle, facilitating 7–8 qualified demos/month at 90%+ KPI attainment and a 30–35% conversion rate, contributing to revenue pipeline growth.',
    ],
  },
  {
    role: 'Business Development Executive',
    company: 'Facile Infoserv',
    period: 'Oct 2023 – Sep 2024',
    bullets: [
      'Generated $80K+ in new business pipeline through account-based outreach and advising on vendor onboarding for an MNC; supported $25K engagement closure through structured stakeholder engagement.',
      'Built and managed a pipeline of 100+ qualified leads via C-suite stakeholder mapping and multi-touch engagement across 50+ enterprise accounts.',
    ],
  },
  {
    role: 'Business Development Intern',
    company: 'Drone Software Company (FlytBase)',
    period: 'Apr 2023 – Sep 2023',
    bullets: [
      'Supported a $100K deal by conducting market research across 25 international markets, shaping the go-to-market strategy.',
      'Secured 25 high-value client meetings at a leading global industry expo, gathering competitive and product feedback.',
    ],
  },
]

export const funnelData = [
  { stage: 'Brands Researched', value: 300, color: '#2E6BFF' },
  { stage: 'Accounts Targeted', value: 100, color: '#4D8BFF' },
  { stage: 'Campaigns Run', value: 20, color: '#FF6B4A' },
  { stage: 'Qualified Demos', value: 8, color: '#FF8566' },
  { stage: 'Conversions', value: 3, color: '#FFB399' },
]

export const campaignImpact = [
  {
    label: 'Response Rate Uplift',
    before: '3.2%',
    after: '3.8%',
    uplift: '+19%',
    description: '19% uplift in email reply rates through targeted campaign optimization',
  },
  {
    label: 'Qualified Meetings',
    before: '5/month',
    after: '7/month',
    uplift: '+42%',
    description: '42% increase in qualified client meetings per month',
  },
]

export const projects = [
  {
    title: 'Amazon MVP Case Study',
    subtitle: 'Product Strategy · PM School · Ranked 2nd / 50',
    description: 'Designed a fitness & health MVP using market and competitor research to define core features, user needs and success metrics.',
    result: 'Ranked 2nd out of 50 teams in the PM School case competition.',
    file: '/assets/amazon-mvp.pdf',
    status: 'completed' as const,
  },
  {
    title: 'Business Analytics Capstone',
    subtitle: 'Data & Dashboards · Great Lakes',
    description: 'Modelled data in Excel (VLOOKUP, Pivot Tables), queried via SQL, and built Tableau dashboards to benchmark performance and surface insights.',
    result: 'Comprehensive analytics dashboard with actionable business insights.',
    file: '/assets/capstone-dashboard.png',
    status: 'completed' as const,
  },
  {
    title: 'Consumer Trust in Quick Commerce',
    subtitle: 'Empirical Study · In Progress',
    description: 'Researching consumer trust and purchase intention for healthcare products on quick-commerce platforms in India.',
    result: null,
    file: null,
    status: 'in-progress' as const,
  },
]

export const skills = {
  core: [
    'Market Analysis', 'Strategic Analysis', 'Campaign Management',
    'Pipeline Generation', 'Account Planning', 'Stakeholder Engagement',
    'Client Management', 'Consultative Selling',
  ],
  emerging: ['Agentic AI'],
  tools: ['CRM (Apollo, HubSpot, Salesforce)', 'Tableau', 'SQL', 'MS Excel'],
}

export const education = [
  {
    degree: 'MBA (PGPM)',
    school: 'Great Lakes Institute of Management, Chennai',
    year: '2026–2027',
    detail: '',
  },
  {
    degree: 'BBA (IT)',
    school: 'Symbiosis Institute of Computer Studies & Research',
    year: '2023',
    detail: '7.24/10',
  },
  {
    degree: '12th (Commerce)',
    school: 'Delhi Public School',
    year: '2020',
    detail: '91.6%',
  },
  {
    degree: '10th',
    school: 'Delhi Public School',
    year: '2018',
    detail: '77.6%',
  },
]

export const achievements = [
  'Runner-up, PM School — Amazon MVP case competition (Ranked 2nd / 50), 2022',
  'Volunteer, Explore-It NGO, Q3 2022',
]

export const positionsOfResponsibility = [
  'Core Member, Healthcare SIG (founding team) — Great Lakes, 2026',
  'Sponsorship Team Member — The Climber, 2021',
]

export const extraCurriculars = [
  'Music Club, Symbiosis SICSR — performed at Annual College Fest (2021–23)',
  'Tennis · Guitarist',
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]
