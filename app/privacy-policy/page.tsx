import type { Metadata } from 'next';
import Breadcrumb from '@/components/calculator/Breadcrumb';

export const metadata: Metadata = {
  title: 'Privacy Policy — RREF Calculator',
  description: 'RREF Calculator privacy policy. GDPR and CCPA compliant. No personal data collected. Matrix data stays in your browser.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Privacy Policy</h1>
      <p className="text-slate-500 mb-8">Last updated: May 2026. Effective: March 2026.</p>

      <article className="prose-content space-y-6">
        <section>
          <h2>Summary</h2>
          <div className="card p-4 bg-green-50 border-green-200">
            <p className="text-sm text-green-800 font-medium">
              We do not collect, store, or transmit any personal data. Your matrix inputs are computed entirely in your browser and never sent to any server. The only data stored is your calculation history, which stays in your own browser's localStorage.
            </p>
          </div>
        </section>

        <section>
          <h2>What Data We Collect</h2>
          <p><strong>Matrix and calculator data:</strong> None. All calculations run in your browser (client-side JavaScript). Your matrix entries, calculation history, and saved problems never leave your device. We have no servers that receive this data.</p>
          <p><strong>Personal information:</strong> We do not collect names, email addresses, birth dates, phone numbers, or any personally identifiable information through the calculator. If you use our contact form, we receive the information you voluntarily submit.</p>
          <p><strong>Usage analytics:</strong> We may use privacy-respecting analytics (such as aggregated page view counts) to understand which calculators and guides are most useful. This data is aggregated and cannot be used to identify individuals.</p>
        </section>

        <section>
          <h2>Cookies and Local Storage</h2>
          <p><strong>localStorage:</strong> We store your calculation history (last 10 calculations) and any saved problems in your browser's localStorage. This is local to your device — we cannot access it. You can clear it at any time in your browser settings.</p>
          <p><strong>Advertising cookies:</strong> This site displays ads through Google AdSense. Google may set cookies to serve personalized ads based on your browsing history. You can opt out at <a href="https://adssettings.google.com" rel="noopener noreferrer" target="_blank">adssettings.google.com</a>.</p>
          <p><strong>Session cookies:</strong> Standard session cookies may be set by our hosting infrastructure for security and performance. These do not contain personal information.</p>
        </section>

        <section>
          <h2>Third-Party Services</h2>
          <p><strong>Google AdSense:</strong> Serves ads and may collect browsing data per <a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">Google's privacy policy</a>.</p>
          <p><strong>Google Fonts / CDN:</strong> We load fonts and the KaTeX library from CDNs. These providers may log your IP address per their standard server access logs.</p>
        </section>

        <section>
          <h2>Your Rights (GDPR and CCPA)</h2>
          <p>Since we do not collect personal data, most GDPR/CCPA rights (access, deletion, portability) apply primarily to the contact form data you voluntarily submit. To request deletion of any contact form submission, email us via the <a href="/contact">contact page</a>.</p>
          <p>For advertising opt-out (California residents): You can opt out of the sale of personal information for advertising via the AdSense opt-out link above.</p>
        </section>

        <section>
          <h2>Children's Privacy</h2>
          <p>This site is not directed at children under 13. We do not knowingly collect personal data from children under 13. If you believe a child under 13 has submitted personal data through our contact form, please contact us for immediate deletion.</p>
        </section>

        <section>
          <h2>Changes to This Policy</h2>
          <p>We will update this policy when our data practices change. The "Last updated" date at the top reflects the most recent revision. Significant changes will be noted in the <a href="/changelog">changelog</a>.</p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>Questions about this privacy policy? Use the <a href="/contact">contact page</a>.</p>
        </section>
      </article>
    </main>
  );
}
