import type { Metadata } from 'next';
import Breadcrumb from '@/components/calculator/Breadcrumb';
import AdSlot from '@/components/calculator/AdSlot';

export const metadata: Metadata = {
  title: 'About RREF Calculator — Why We Built an Exact Fraction Linear Algebra Tool',
  description: 'RREF Calculator was built to fix floating-point rounding errors in online matrix tools. Learn our BigInt exact arithmetic approach, accuracy commitment, and who reviews our math content.',
  alternates: { canonical: 'https://rrefmatrixcalc.com/about' },
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">About RREF Calculator</h1>
      <p className="text-slate-500 mb-8">Updated May 2026</p>

      <article className="prose-content space-y-8">
        <section>
          <h2>Why We Built This</h2>
          <p>
            The original frustration was simple: every RREF calculator we tested in 2023 used JavaScript's built-in floating-point numbers, which cannot represent most fractions exactly. A student who enters the matrix [[1/3, 1/3], [1/3, 1/3]] and expects RREF to produce the identity gets back something like [[1, 1], [0, 5.55e-17]] — a near-zero that looks like a rounding artifact but isn't zero. They can't tell if they made an arithmetic mistake or the calculator did.
          </p>
          <p>
            We built this calculator around one design constraint: <strong>every number must remain a fraction throughout every computation</strong>. Not a decimal approximation of a fraction — an exact fraction, stored as two integers. That constraint forced us to write our own rational arithmetic library on top of JavaScript's BigInt type, which turned out to be a 200-line library that made everything else straightforward.
          </p>
        </section>

        <section>
          <h2>How the Calculator Works</h2>
          <p>
            Each matrix entry is stored as a JavaScript object <code>{'{'}numerator: BigInt, denominator: BigInt{'}'}</code> in lowest terms (gcd = 1, denominator always positive). All four arithmetic operations — addition, subtraction, multiplication, division — operate on these rational number objects and return another rational in lowest terms. No floating-point number is ever used in any computation.
          </p>
          <p>
            The Gauss-Jordan elimination algorithm operates on a matrix of these rational objects. At each step, it records the exact row operation (e.g., R₂ → R₂ − (3/4)R₁) and the full matrix state after that operation. Both the operation description and the matrix state are stored for display. This means the step-by-step output you see matches exactly what you would write on paper — same fractions, same operations, same order — because both are produced by the same exact arithmetic.
          </p>
        </section>

        <section>
          <h2>Our Mission</h2>
          <p>
            RREF Calculator exists because most online matrix calculators have a fundamental flaw: they use floating-point arithmetic, which introduces rounding errors that cascade through row reduction. When a student gets 0.9999999 instead of 1, or 1.4e−16 instead of 0, the educational value collapses. They cannot check their work, compare steps, or trust the result.
          </p>
          <p>
            We built a different kind of calculator — one that uses exact rational arithmetic throughout. Every number is stored as a fraction with BigInt numerator and denominator. No rounding, ever. The answer to a row reduction with fractions is still a fraction, not a decimal approximation.
          </p>
          <p>
            Beyond accuracy, we believe step-by-step explanations are essential. Showing only the final RREF gives a student an answer but not understanding. We show every elementary row operation, name it precisely (R₂ → R₂ − (3/2)R₁), and display the full matrix state after each step.
          </p>
        </section>

        <section>
          <h2>What We Build</h2>
          <p>
            This site is a <strong>math calculator hub</strong> focused on linear algebra and related topics. The RREF calculator is our flagship, but we have expanded to cover the full matrix algebra toolkit: matrix inverse, determinant, multiplication, transpose, and vector operations including the cross product and dot product.
          </p>
          <p>
            Each calculator shares the same exact arithmetic engine built on BigInt rational numbers. This means every calculator on this site handles fractions in the input, carries exact fractions through all operations, and reports exact fractions in the output. The simplify radicals calculator uses a prime factorization algorithm with the same commitment to exact results.
          </p>
          <p>
            We also publish educational guides on linear algebra topics — from introductory primers to detailed comparisons of methods (Gauss-Jordan vs. Gaussian elimination). These guides are written to supplement, not replace, a linear algebra textbook.
          </p>
        </section>

        <section>
          <h2>Our Team</h2>
          <p>
            RREF Calculator is built and maintained by a small team of math writers, software developers, and educators who are passionate about making linear algebra accessible to students at all levels.
          </p>
          <p>
            Our math editorial team reviews every calculator and guide for mathematical accuracy before publication. Content is checked against standard references — primarily Gilbert Strang's <em>Introduction to Linear Algebra</em> (MIT 18.06) and David Lay's <em>Linear Algebra and Its Applications</em>. We update our content when we find errors or when notation conventions shift.
          </p>
          <p>
            We do not fabricate credentials. Our team's expertise comes from working with linear algebra in software, education, and applied mathematics — not from institutional affiliations we don't have.
          </p>
        </section>

        <section>
          <h2>Technical Architecture</h2>
          <p>
            The site is built with Next.js 15 and deployed as a static export, which means all pages are pre-rendered HTML. This gives fast load times and allows search engines to crawl full content.
          </p>
          <p>
            The calculator logic runs entirely in your browser — no matrix data is ever sent to a server. The <strong>BigInt rational arithmetic library</strong> is a custom implementation: each rational number is stored as {'{'}numerator: BigInt, denominator: BigInt{'}'} in lowest terms. All arithmetic operations (add, subtract, multiply, divide) produce exact results. This is the core innovation that makes our answers different from other calculators.
          </p>
          <p>
            The Gauss-Jordan elimination algorithm operates on a matrix of these rational numbers. At each step, it records the row operation applied, computes the resulting matrix state, and stores both for display. The RREF uniqueness theorem guarantees our output is the unique correct RREF regardless of the specific operation sequence chosen.
          </p>
          <p>
            KaTeX handles all math rendering, loaded lazily to keep initial page weight low. The UI is built with React 18, TypeScript, and Tailwind CSS v3.
          </p>
        </section>

        <section>
          <h2>Accuracy and Limitations</h2>
          <p>
            For <strong>rational inputs</strong> (integers and fractions), this calculator is perfectly accurate — results are mathematically exact. There is no floating-point error, no accumulated rounding, and no lost precision.
          </p>
          <p>
            Current limitations: the UI supports matrices up to 6×6. Complex number entries are not supported in this version. Irrational inputs (like √2) would need to be approximated as fractions; we may add symbolic support in a future version.
          </p>
          <p>
            We describe our methodology in detail on the <a href="/methodology">Methodology page</a>.
          </p>
        </section>

        <AdSlot id="about-bottom" size="banner" />

        <section>
          <h2>Accuracy Commitment</h2>
          <p>
            For any matrix with rational entries (integers or fractions), the output of every calculator on this site is mathematically exact. We do not round, truncate, or approximate at any stage of the computation. A result that should be 0 is stored as BigInt 0/1 — not 1.2e−16. A result that should be 7/12 is stored as exactly 7/12 — not 0.583333.
          </p>
          <p>
            We test each calculator against known results from NumPy, MATLAB, and Wolfram Alpha before release. If you find a case where our output disagrees with the mathematically correct answer, please report it via the contact page. We will investigate and correct it within 48 hours. See our <a href="/methodology">Methodology page</a> for the full technical description of how accuracy is verified.
          </p>
          <p className="text-sm text-slate-400">Site last updated: May 2026.</p>
        </section>

        <section>
          <h2>Contact and Corrections</h2>
          <p>
            Found a bug? Noticed a mathematical error in one of our guides? Have a suggestion for a calculator we should add? We want to hear about it. See our <a href="/contact">contact page</a> to reach us.
          </p>
          <p>
            We take corrections seriously. If a guide contains an error, we will correct it and note the correction with a date on the page. See our <a href="/editorial-policy">editorial policy</a> for our full correction process.
          </p>
        </section>
      </article>
    </main>
  );
}
