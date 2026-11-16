import type { Metadata } from 'next';
import Breadcrumb from '@/components/calculator/Breadcrumb';
import UpdatedNote from '@/components/UpdatedNote';

export const metadata: Metadata = {
  title: 'Editorial Policy — RREF Calculator',
  description: 'How RREF Calculator creates, reviews, and corrects content. Our math accuracy standards, source citations, and correction policy.',
  alternates: { canonical: 'https://rrefmatrixcalc.com/editorial-policy/' },
};

export default function EditorialPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Editorial Policy' }]} />
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Editorial Policy</h1>
      <p className="text-slate-500 mb-8">Last updated: November 2026</p>

      <article className="prose-content space-y-8">
        <section>
          <h2>Content Standards</h2>
          <p>
            Every page on RREF Calculator is written with two commitments: mathematical accuracy and honest communication about uncertainty. We do not simplify to the point of inaccuracy. When a concept has important edge cases (singular matrices, inconsistent systems, free variables), we address them.
          </p>
          <p>
            All content is checked against standard references before publication. The primary references are Gilbert Strang's <em>Introduction to Linear Algebra</em>, David Lay's <em>Linear Algebra and Its Applications</em>, and MIT OpenCourseWare 18.06. Where notation varies between sources, we state the convention we use.
          </p>
        </section>

        <section>
          <h2>Math Accuracy Verification</h2>
          <p>
            All worked examples in guides and calculator pages are computed using the same exact rational arithmetic engine that powers the calculators. We do not use approximations in worked examples. Every matrix example has been verified by running it through the calculator itself.
          </p>
          <p>
            For formulas and theorems, we verify against at least two independent references before publishing. When we state a result (e.g., "RREF is unique for every matrix"), we can cite the specific theorem in Strang or Lay if needed.
          </p>
        </section>

        <section>
          <h2>Authorship and Review</h2>
          <p>
            The calculators and guides on this site are built and maintained by Muhammad Farhan, a software engineer and the site&apos;s owner. Explanations are written to agree with the textbooks listed on the Sources page, and each page carries a last-updated date so you can see when it was last revised.
          </p>
          <p>
            We do not fabricate academic credentials. Farhan&apos;s background is software engineering, not a university mathematics post, and the site does not claim affiliations it does not have. Its accuracy rests on exact arithmetic that you can verify step by step and on the cited sources.
          </p>
        </section>

        <section>
          <h2>Correction Policy</h2>
          <p>
            We correct errors promptly. If you find a mathematical error, a broken calculator, or misleading content, please <a href="/contact/">contact us</a>.
          </p>
          <p>
            For significant corrections (wrong formula, incorrect worked example, misleading claim), we:
          </p>
          <ol>
            <li>Correct the error immediately after verification</li>
            <li>Add a note at the bottom of the page: "Correction [Date]: [Description of what was changed and why]"</li>
            <li>Update the "Last modified" date in the page metadata and sitemap</li>
          </ol>
          <p>
            For minor corrections (typos, formatting issues, clarifications that don't change the meaning), we make the fix without a formal correction notice.
          </p>
        </section>

        <section>
          <h2>Source Citations</h2>
          <p>
            When we reference specific theorems, formulas, or results, we cite the source. Our primary references:
          </p>
          <ul>
            <li>Strang, Gilbert. <em>Introduction to Linear Algebra</em>, 5th ed. Wellesley-Cambridge Press, 2016.</li>
            <li>Lay, David C. <em>Linear Algebra and Its Applications</em>, 5th ed. Pearson, 2016.</li>
            <li>MIT OpenCourseWare, 18.06 Linear Algebra, Gilbert Strang. (ocw.mit.edu)</li>
          </ul>
          <p>We do not reproduce copyrighted text. We reference theorems by name and number, and direct readers to the original sources for proofs.</p>
        </section>

        <section>
          <h2>Advertising Disclosure</h2>
          <p>
            This site displays advertising through Google AdSense to support ongoing development and hosting. Advertising does not influence our editorial content. Ad placement is determined by standard ad network logic, not by advertisers. We do not accept sponsored content or paid placements in our guides or calculator pages.
          </p>
        </section>

        <section>
          <h2>Updates and Versioning</h2>
          <p>
            Every page shows a "Updated [Month Year]" date. This reflects the most recent significant content update, not the most recent trivial edit. We review and update pages when: the mathematical standards change, we find content that needs improvement, or significant new related tools are added.
          </p>
        </section>
        <section>
          <h2>Site Ownership</h2>
          <p>
            RREF Calculator is owned and maintained by <a href="/about/#muhammad-farhan">Muhammad Farhan</a>, a software engineer, who is responsible for the calculators and has the final say on everything published here. To report a correction, use the <a href="/contact/">contact page</a> or message him on <a href="https://www.linkedin.com/in/digitalfarhan/" target="_blank" rel="noopener noreferrer me">LinkedIn</a>.
          </p>
        </section>
        <UpdatedNote className="mt-6" />
      </article>
    </main>
  );
}
