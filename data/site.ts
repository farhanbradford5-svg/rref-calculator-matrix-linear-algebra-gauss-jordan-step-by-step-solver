// Site owner and "last updated" details, shared by the pages that show them.

export const SITE_URL = 'https://rrefmatrixcalc.com';

export const OWNER = {
  name: 'Muhammad Farhan',
  role: 'Founder & Owner',
  credentials: 'Software Engineer',
  photo: '/authors/muhammad-farhan.webp',
  linkedin: 'https://www.linkedin.com/in/digitalfarhan/',
  profilePath: '/about/#muhammad-farhan',
  profileUrl: `${SITE_URL}/about/#muhammad-farhan`,
  bio: 'Muhammad Farhan is a software engineer and the founder and owner of RREF Calculator (rrefmatrixcalc.com). Farhan is responsible for the site’s code and calculators, including the exact-fraction arithmetic engine, and has the final say on everything published here.',
  vision:
    'I want every linear algebra student to be able to check a row reduction in seconds, for free, and see exactly which row operation produced each number.',
};

export const LAST_UPDATED = {
  iso: '2026-11-16',
  long: 'November 16, 2026',
  month: 'November 2026',
};

export const ownerSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': OWNER.profileUrl,
  name: OWNER.name,
  jobTitle: 'Founder & Owner, Software Engineer',
  url: OWNER.profileUrl,
  image: `${SITE_URL}${OWNER.photo}`,
  sameAs: [OWNER.linkedin],
  worksFor: {
    '@type': 'Organization',
    name: 'RREF Calculator',
    url: SITE_URL,
  },
};

/** Author / publisher fields for Article schema on guides. */
export const articleAuthor = {
  '@type': 'Person',
  '@id': OWNER.profileUrl,
  name: OWNER.name,
  url: OWNER.profileUrl,
};
