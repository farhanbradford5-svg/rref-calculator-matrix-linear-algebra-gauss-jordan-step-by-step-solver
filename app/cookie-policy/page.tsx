import type { Metadata } from 'next';
import Breadcrumb from '@/components/calculator/Breadcrumb';

export const metadata: Metadata = {
  title: 'Cookie Policy — RREF Calculator',
  description: 'Cookie policy for RREF Calculator. What cookies we use and how to manage them.',
};

export default function CookiePolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Cookie Policy' }]} />
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Cookie Policy</h1>
      <p className="text-slate-500 mb-8">Last updated: May 2026</p>

      <article className="prose-content space-y-6">
        <section>
          <h2>What Are Cookies?</h2>
          <p>Cookies are small text files stored in your browser when you visit a website. They serve various purposes: keeping you logged in, remembering preferences, tracking usage patterns, and delivering personalized advertising.</p>
        </section>

        <section>
          <h2>Cookies We Use</h2>
          <div className="space-y-3">
            {[
              { type: 'Essential', desc: 'Required for the site to function. These cannot be disabled. They include session identifiers set by the hosting infrastructure for security and CDN performance. No personal data.' },
              { type: 'Functional (localStorage)', desc: 'We use browser localStorage (not technically a cookie, but similar in purpose) to store your calculation history and saved problems locally. This never leaves your browser. You can clear it via browser settings.' },
              { type: 'Advertising (Google AdSense)', desc: 'Google AdSense may set cookies to serve personalized ads. These cookies collect browsing data across sites. You can opt out via Google\'s ad settings at adssettings.google.com.' },
              { type: 'Analytics', desc: 'We may use aggregated analytics to count page visits and understand which calculators are most used. If analytics cookies are used, they collect no personally identifiable information.' },
            ].map(({ type, desc }) => (
              <div key={type} className="card p-4">
                <h3 className="font-semibold text-slate-800 text-sm mb-1">{type}</h3>
                <p className="text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Managing Cookies</h2>
          <p>You can control cookies through your browser settings. Most browsers allow you to view, delete, and block cookies. Note that blocking essential cookies may affect site functionality.</p>
          <p>To opt out of Google advertising cookies specifically: visit <a href="https://adssettings.google.com" rel="noopener noreferrer" target="_blank">adssettings.google.com</a>. To opt out of all Google Analytics tracking: use the <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener noreferrer" target="_blank">Google Analytics opt-out browser add-on</a>.</p>
        </section>
      </article>
    </main>
  );
}
