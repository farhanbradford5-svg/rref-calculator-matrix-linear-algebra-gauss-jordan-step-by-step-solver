import type { Metadata } from 'next';
import Breadcrumb from '@/components/calculator/Breadcrumb';

export const metadata: Metadata = {
  title: 'DMCA Policy — RREF Calculator',
  description: 'DMCA takedown policy and copyright notice for RREF Calculator.',
};

export default function DMCAPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'DMCA' }]} />
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">DMCA Policy</h1>
      <p className="text-slate-500 mb-8">Last updated: May 2026</p>

      <article className="prose-content space-y-6">
        <section>
          <h2>Copyright Notice</h2>
          <p>All content on RREF Calculator — including text, code, calculator implementations, and visual design — is © 2026 RREF Calculator. All rights reserved, except where noted.</p>
          <p>Mathematical facts, formulas, and theorems are in the public domain. Our original expression of those facts (prose explanations, worked examples, code implementations) is copyrighted.</p>
        </section>

        <section>
          <h2>Reporting Infringement</h2>
          <p>If you believe your copyrighted work has been reproduced on this site in a way that constitutes infringement, please submit a DMCA notice via the <a href="/contact">contact page</a> including:</p>
          <ol>
            <li>Identification of the copyrighted work you claim has been infringed</li>
            <li>Identification of the specific URL on our site where the infringing material appears</li>
            <li>Your contact information (name, address, phone, email)</li>
            <li>A statement that you have a good faith belief that the use is not authorized</li>
            <li>A statement that the information in the notice is accurate and, under penalty of perjury, that you are the copyright owner or authorized to act on their behalf</li>
            <li>Your physical or electronic signature</li>
          </ol>
          <p>We will respond to valid DMCA notices within 5 business days.</p>
        </section>

        <section>
          <h2>Counter-Notice</h2>
          <p>If your content was removed in response to a DMCA notice and you believe the removal was in error, you may submit a counter-notice via the contact page. Counter-notices must comply with 17 U.S.C. § 512(g)(3).</p>
        </section>
      </article>
    </main>
  );
}
