import type { Metadata } from 'next';
import Breadcrumb from '@/components/calculator/Breadcrumb';

export const metadata: Metadata = {
  title: 'Terms of Service — RREF Calculator',
  description: 'Terms of service for RREF Calculator. Free for personal and educational use.',
};

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]} />
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Terms of Service</h1>
      <p className="text-slate-500 mb-8">Last updated: May 2026</p>

      <article className="prose-content space-y-6">
        <section>
          <h2>Use of the Service</h2>
          <p>RREF Calculator provides free online mathematical calculators and educational content. By using this site, you agree to use it only for lawful purposes and in ways that do not infringe the rights of others.</p>
          <p>The calculators are provided for <strong>personal, educational, and non-commercial use</strong>. Commercial use (embedding the calculators in a commercial product, reselling access, etc.) requires prior written permission.</p>
        </section>

        <section>
          <h2>Accuracy Disclaimer</h2>
          <p>While we strive for mathematical accuracy and use exact rational arithmetic to eliminate rounding errors, we make no warranty that the calculators are free from all errors. For academic, professional, or high-stakes computations, always verify results independently.</p>
          <p>The educational guides and worked examples are intended to supplement — not replace — formal instruction. Mathematical education requires engaging with primary sources, textbooks, and qualified instructors.</p>
        </section>

        <section>
          <h2>Intellectual Property</h2>
          <p>The content on this site — text, code, calculator logic, and design — is protected by copyright. You may not reproduce, distribute, or create derivative works from our content without permission, except for personal study and non-commercial educational use (e.g., sharing a link, quoting a short passage with attribution).</p>
        </section>

        <section>
          <h2>Limitation of Liability</h2>
          <p>This site is provided "as is" without warranties of any kind. We are not liable for any damages arising from use of or inability to use the calculators or content, including errors in mathematical results.</p>
        </section>

        <section>
          <h2>Changes to Terms</h2>
          <p>We may update these terms at any time. Continued use of the site after changes constitutes acceptance of the updated terms.</p>
        </section>
      </article>
    </main>
  );
}
