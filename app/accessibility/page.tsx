import type { Metadata } from 'next';
import Breadcrumb from '@/components/calculator/Breadcrumb';

export const metadata: Metadata = {
  title: 'Accessibility Statement — RREF Calculator',
  description: 'RREF Calculator accessibility statement. WCAG 2.1 AA conformance, keyboard navigation, and known limitations.',
};

export default function AccessibilityPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Accessibility' }]} />
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Accessibility Statement</h1>
      <p className="text-slate-500 mb-8">Last updated: May 2026</p>

      <article className="prose-content space-y-6">
        <section>
          <h2>Our Commitment</h2>
          <p>RREF Calculator is committed to making our calculators and educational content accessible to all users, including those using assistive technologies. We aim for conformance with WCAG 2.1 Level AA guidelines.</p>
        </section>

        <section>
          <h2>Current Accessibility Features</h2>
          <ul>
            <li><strong>Keyboard navigation:</strong> All calculator inputs support Tab, arrow keys, and Enter for navigation. No mouse required for core functionality.</li>
            <li><strong>ARIA labels:</strong> Matrix cells have ARIA labels identifying their row and column position (e.g., "Row 2, Column 3").</li>
            <li><strong>Color contrast:</strong> Text and interactive elements meet WCAG AA contrast ratios. No information is conveyed through color alone.</li>
            <li><strong>Semantic HTML:</strong> Headings follow a logical hierarchy (h1 → h2 → h3). Lists use proper list markup. Tables use appropriate table markup.</li>
            <li><strong>Focus indicators:</strong> All interactive elements have visible focus rings with sufficient contrast.</li>
            <li><strong>Responsive design:</strong> The site is fully functional on mobile devices and adapts to zoom up to 200% without horizontal scrolling.</li>
          </ul>
        </section>

        <section>
          <h2>Known Limitations</h2>
          <ul>
            <li><strong>Math rendering (KaTeX):</strong> Mathematical formulas rendered by KaTeX have limited screen reader support. The underlying LaTeX source is not always exposed to assistive technologies. We are working on providing alternative text for key formulas.</li>
            <li><strong>Step-by-step display:</strong> Complex matrix states in the step-by-step panel may be difficult to navigate with a screen reader. Each matrix cell has ARIA labels, but the spatial layout is not conveyed audibly.</li>
          </ul>
        </section>

        <section>
          <h2>Feedback</h2>
          <p>If you encounter an accessibility barrier on this site, please contact us via the <a href="/contact">contact page</a>. Describe the barrier and include the URL of the page where you encountered it. We aim to resolve accessibility issues within 5 business days.</p>
        </section>

        <section>
          <h2>Technical Specification</h2>
          <p>This site is built with Next.js 15 (React 18), Tailwind CSS, and standard HTML5. It is tested with keyboard-only navigation. Screen reader testing is ongoing.</p>
        </section>
      </article>
    </main>
  );
}
