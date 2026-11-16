import type { ReactNode } from 'react';
import { CheckCircle } from 'lucide-react';
import Breadcrumb from './Breadcrumb';
import RelatedCalculators from './RelatedCalculators';
import AdSlot from './AdSlot';
import UpdatedNote from '@/components/UpdatedNote';
import { SITE_URL, LAST_UPDATED, articleAuthor } from '@/data/site';

export interface Faq {
  q: string;
  a: string;
}

interface ToolPageProps {
  /** Path with leading and trailing slash, e.g. "/matrix/null-space/". */
  path: string;
  /** Name used in schema and the breadcrumb. */
  name: string;
  h1: string;
  intro: string;
  schemaDescription: string;
  section: string;
  badges: string[];
  faqs: Faq[];
  related: string[];
  calculator: ReactNode;
  children: ReactNode;
}

/** Shared shell for calculator pages: schema, breadcrumb, heading, tool, article, FAQ, related links. */
export default function ToolPage({
  path, name, h1, intro, schemaDescription, section, badges, faqs, related, calculator, children,
}: ToolPageProps) {
  const url = `${SITE_URL}${path}`;
  const solverSchema = {
    '@context': 'https://schema.org',
    '@type': 'MathSolver',
    name,
    description: schemaDescription,
    url,
    dateModified: LAST_UPDATED.iso,
    author: articleAuthor,
    potentialAction: { '@type': 'SolveMathAction', target: url },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'RREF Calculator', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name, item: url },
    ],
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(solverSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: section }, { label: name }]} />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">{h1}</h1>
        <p className="text-lg text-slate-500 mb-2">{intro}</p>
        <UpdatedNote className="mb-6" />
        {calculator}
        <AdSlot id={`${path.replace(/\W+/g, '-')}after-calc`} size="leaderboard" />
        <div className="flex flex-wrap gap-2 my-6">
          {badges.map(t => (
            <span key={t} className="badge"><CheckCircle size={12} className="inline mr-1" />{t}</span>
          ))}
        </div>

        <article className="prose-content mt-8 space-y-10">
          {children}

          <section>
            <h2>Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map(({ q, a }) => (
                <div key={q} className="card p-4">
                  <h3 className="font-semibold text-slate-800 mb-1">{q}</h3>
                  <p className="text-slate-600 text-sm">{a}</p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>
      <RelatedCalculators exclude={path.replace(/\/$/, '')} picks={related} />
    </>
  );
}
