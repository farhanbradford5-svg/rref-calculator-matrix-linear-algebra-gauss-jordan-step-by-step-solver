import type { Metadata } from 'next';
import Link from 'next/link';
import RREFCalculator from '@/components/calculator/RREFCalculator';
import AdSlot from '@/components/calculator/AdSlot';
import { CheckCircle, Zap, BookOpen, Users, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'RREF Calculator — Reduced Row Echelon Form with Step-by-Step Solutions',
  description:
    'Free online RREF calculator. Solve any matrix up to 6×6, see every Gauss-Jordan elimination step with full explanations, get exact fraction answers. No sign-up. Updated May 2026.',
  alternates: {
    canonical: 'https://rrefmatrixcalc.com',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'RREF Calculator',
  url: 'https://rrefmatrixcalc.com',
  description: 'Free online math calculator hub specializing in linear algebra: RREF, matrix inverse, determinant, and more.',
  sameAs: [],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'RREF Calculator',
  url: 'https://rrefmatrixcalc.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://rrefmatrixcalc.com/?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

const mathSolverSchema = {
  '@context': 'https://schema.org',
  '@type': 'MathSolver',
  name: 'RREF Calculator — Reduced Row Echelon Form',
  description:
    'Computes the reduced row echelon form (RREF) of any matrix using Gauss-Jordan elimination with exact rational arithmetic. Shows every row operation step by step.',
  url: 'https://rrefmatrixcalc.com',
  potentialAction: {
    '@type': 'SolveMathAction',
    target: 'https://rrefmatrixcalc.com',
    'edu:uses': 'https://schema.org/MathSolver',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is RREF (Reduced Row Echelon Form)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RREF is a standardized form of a matrix produced by Gauss-Jordan elimination. A matrix is in RREF when: (1) all-zero rows are at the bottom, (2) each non-zero row has a leading 1 (pivot), (3) pivots step strictly right and down (staircase), and (4) every entry above and below each pivot is 0. RREF is unique for every matrix.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is this RREF calculator different from others?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most online RREF calculators use floating-point arithmetic, producing rounding errors like 0.9999999 instead of 1. This calculator uses BigInt-based exact rational arithmetic — every number is stored as a precise fraction. Results are mathematically exact, not approximations.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I enter fractions into the RREF calculator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type fractions directly: "1/2" for ½, "3/4" for ¾, "-2/3" for −⅔. Negative fractions work too. Decimals like "0.5" are also accepted and converted to exact fractions internally.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is an augmented matrix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An augmented matrix [A|b] combines the coefficient matrix A with the right-hand side vector b of a linear system. Enable the Augmented toggle to separate the last column visually. The calculator then classifies the solution as unique, infinitely many, or no solution.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does the rank of a matrix tell you?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Rank equals the number of pivot columns in RREF. It equals the number of linearly independent rows (and columns). By the rank-nullity theorem, rank + nullity = n (number of columns). Full rank means the matrix has as many pivots as columns (unique solution if augmented, invertible if square).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Gauss-Jordan elimination?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gauss-Jordan elimination is the algorithm to compute RREF. It applies three elementary row operations column by column: (1) swap rows to get a non-zero pivot, (2) scale the pivot row to make the pivot equal 1, (3) eliminate all entries above and below each pivot. The result is RREF.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between RREF and REF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Row Echelon Form (REF) zeros entries only below each pivot; entries above can be non-zero. Reduced Row Echelon Form (RREF) zeros entries both above AND below each pivot. REF is not unique; RREF is unique. RREF allows reading off the solution directly without back-substitution.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use this calculator for linear systems with infinitely many solutions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Enable Augmented mode and enter [A|b]. If the system has free variables, the calculator identifies them and shows the parametric solution with each free variable labeled. If the system is inconsistent (no solution), it detects the contradiction row [0 0 ... 0 | c≠0].',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this RREF calculator free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, completely free. No sign-up, no account, no usage limits. All calculations run in your browser.',
      },
    },
    {
      '@type': 'Question',
      name: 'What matrix sizes does this calculator support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The RREF calculator supports matrices from 1×1 to 6×6, with quick-select presets for 2×2, 2×3, 3×3, 3×4, and 4×4. Custom sizes can be set using the row and column dropdowns.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find the inverse of a matrix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the Matrix Inverse Calculator at rrefmatrixcalc.com/matrix/inverse. It applies Gauss-Jordan elimination to the augmented matrix [A|I] to find A⁻¹, showing every step. Alternatively, for a 2×2 matrix [[a,b],[c,d]], A⁻¹ = (1/(ad−bc)) · [[d,−b],[−c,a]].',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the null space of a matrix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The null space (kernel) of A is the set of all vectors x such that Ax = 0. Its dimension (nullity) equals n − rank(A) by the rank-nullity theorem. Free variable columns in RREF correspond to null space dimensions. Find a basis by solving Ax = 0 in augmented matrix form.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I export the RREF solution as LaTeX?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. After computing RREF, use the LaTeX export button to copy the full step-by-step solution in LaTeX format, suitable for pasting into academic papers, homework submissions, or LaTeX editors.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a pivot in linear algebra?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A pivot is the leading entry (first non-zero entry) in a row after row reduction. In RREF, every pivot equals exactly 1, and all other entries in its column are 0. The number of pivots equals the rank of the matrix. Pivot columns correspond to basic variables; non-pivot columns to free variables.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does a zero row in RREF mean?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In the coefficient matrix alone, a zero row means the rows are linearly dependent and the matrix has rank less than the number of rows. In an augmented matrix [A|b]: if the zero row has a 0 on the right too, it adds no information (infinitely many solutions possible). If it has a non-zero right-hand side, the system is inconsistent (no solution).',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I solve a system of equations with a matrix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Write the system as an augmented matrix [A|b] — coefficients of each variable as columns, constants as the last column. Then apply Gauss-Jordan elimination (this calculator does it for you) to reach RREF. Read the solution from the last column, or identify free variables if infinitely many solutions exist.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the RREF of a matrix unique?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every matrix has exactly one RREF, regardless of which sequence of row operations is used to reach it. This is the RREF uniqueness theorem (Theorem 1 in Lay\'s Linear Algebra, §1.2). This makes RREF a canonical form — useful for comparing matrices and verifying work.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a free variable in a linear system?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A free variable is a variable whose column has no pivot in RREF. Free variables can take any real value (they are parameters). Basic variables (pivot columns) are determined by the free variables. A system with k free variables has infinitely many solutions parameterized by k parameters.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does row reduction change the solution set of a linear system?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Elementary row operations produce row-equivalent matrices, which have exactly the same solution set. This is the fundamental theorem justifying row reduction: transforming [A|b] to RREF does not change which vectors x satisfy Ax = b.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use this calculator on my phone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The RREF calculator is fully mobile-responsive. The matrix input grid adapts to smaller screens, and the step-by-step solution panel scrolls horizontally for wide matrices. All features work on iOS and Android browsers.',
      },
    },
  ],
};

const FEATURES = [
  {
    icon: <Zap className="text-primary" size={22} />,
    title: 'Exact Rational Arithmetic',
    desc: 'BigInt-based fractions mean zero rounding errors. Where other calculators show 0.999999, we show 1.',
  },
  {
    icon: <BookOpen className="text-accent-purple" size={22} />,
    title: 'Full Step-by-Step Solutions',
    desc: 'Every row operation explained by name. Toggle verbose/terse mode. Expand or collapse individual steps.',
  },
  {
    icon: <CheckCircle className="text-accent-green" size={22} />,
    title: 'Augmented Matrix Support',
    desc: 'Classify systems as unique, infinite, or inconsistent. See parametric forms and free variables named.',
  },
  {
    icon: <Users className="text-accent-rose" size={22} />,
    title: 'Save, Share & Export',
    desc: 'Share problems via URL. Save your last 10 calculations locally. Export solutions as LaTeX.',
  },
];

const HUB_CALCULATORS = [
  { label: 'RREF / Gauss-Jordan', href: '/', desc: 'Full RREF with every step', ready: true },
  { label: 'Matrix Inverse', href: '/matrix/inverse', desc: 'Find A⁻¹ with steps', ready: true },
  { label: 'Determinant', href: '/matrix/determinant', desc: 'Cofactor expansion', ready: true },
  { label: 'Gauss-Jordan', href: '/matrix/gauss-jordan', desc: 'Full elimination steps', ready: true },
  { label: 'Matrix Multiply', href: '/matrix/multiply', desc: 'A × B with dot products', ready: true },
  { label: 'Transpose', href: '/matrix/transpose', desc: 'Compute Aᵀ instantly', ready: true },
  { label: 'Cross Product', href: '/vectors/cross-product', desc: '3D vector u × v', ready: true },
  { label: 'Dot Product', href: '/vectors/dot-product', desc: 'n-dimensional u · v', ready: true },
  { label: 'Simplify Radicals', href: '/algebra/simplify-radicals', desc: 'Simplify √n', ready: true },
];


export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(mathSolverSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero + Calculator */}
      <section className="bg-white pt-10 pb-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-3">
              RREF Calculator —{' '}
              <span className="text-primary">Reduced Row Echelon Form</span>{' '}
              with Step-by-Step Solutions
            </h1>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              Last updated: May 2026 · Reviewed for accuracy · Free, no sign-up
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Free online RREF calculator. Solve any matrix size (2×2 to 6×6), see every Gauss-Jordan elimination step explained in plain English, get exact fraction answers.{' '}
              <strong>No sign-up. Updated May 2026.</strong>{' '}
              Every calculation shows the complete Gauss-Jordan elimination process — use it as an rref calculator with steps to check your own work or understand each row operation.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {['100% Free', 'No Sign-up', 'Exact Rational Arithmetic', 'Step-by-Step Solutions', 'Mobile-Friendly', 'BigInt Precision'].map(badge => (
              <span key={badge} className="badge"><CheckCircle size={11} className="inline" /> {badge}</span>
            ))}
          </div>

          <RREFCalculator />
        </div>
      </section>

      <AdSlot id="home-after-calc" size="leaderboard" />

      {/* Feature cards */}
      <section className="bg-surface py-12 border-b border-slate-100" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map(f => (
              <div key={f.title} className="card p-5">
                <div className="mb-3">{f.icon}</div>
                <h3 className="font-semibold text-slate-800 mb-1.5 text-sm">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Facts — AI Overview / LLM optimization */}
      <section className="bg-white py-10 border-t border-slate-100" id="quick-facts">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Facts About This RREF Calculator</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            {[
              { term: 'Full name', def: 'Reduced Row Echelon Form (RREF) Calculator' },
              { term: 'Method', def: 'Gauss-Jordan elimination — zeros above AND below each pivot' },
              { term: 'Arithmetic type', def: 'Exact BigInt rational arithmetic — no floating-point error' },
              { term: 'Matrix sizes supported', def: '2×2 up to 6×6 (rows and columns independently selectable)' },
              { term: 'Augmented matrices', def: 'Yes — toggle Augmented mode to separate the b column' },
              { term: 'Step-by-step output', def: 'Every row operation named and shown (expandable per step)' },
              { term: 'Free to use', def: 'Yes — no sign-up, no account, no usage limits' },
              { term: 'Export formats', def: 'LaTeX export for homework and academic papers' },
            ].map(({ term, def }) => (
              <div key={term} className="flex gap-2 py-1.5 border-b border-slate-100">
                <dt className="font-semibold text-slate-700 shrink-0 w-44">{term}</dt>
                <dd className="text-slate-600">{def}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* What is RREF */}
      <section className="bg-white py-14" id="what-is-rref">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">What Is RREF (Reduced Row Echelon Form)?</h2>
          <div className="text-slate-600 space-y-4 text-[15px] leading-relaxed">
            <p>
              <strong>Reduced Row Echelon Form (RREF)</strong> is a standardized form of a matrix obtained through
              Gauss-Jordan elimination. Every matrix has exactly one RREF — this is the uniqueness theorem that
              makes RREF the canonical form for matrix analysis. REF (Row Echelon Form) is not unique, but RREF is.
            </p>
            <h3 className="text-base font-semibold text-slate-800 mt-5 mb-2">The Four RREF Conditions</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>All-zero rows at the bottom.</strong> Any row consisting entirely of zeros must be below all non-zero rows.</li>
              <li><strong>Leading entries are 1 (pivots).</strong> The first non-zero entry in each non-zero row is exactly 1.</li>
              <li><strong>Staircase pattern.</strong> Each pivot is strictly to the right of the pivot in the row above.</li>
              <li><strong>Zeros above and below each pivot.</strong> Every other entry in a pivot column is 0 — this is what distinguishes RREF from REF.</li>
            </ol>
            <p>
              RREF is the most useful form for solving systems of linear equations because the solution can be read off directly,
              with no back-substitution required. It also reveals the rank, null space, and linear dependence relationships of the matrix.
            </p>
            <p>
              Here is a simple example. The matrix A = [[2, 4, −2], [4, 9, −3], [−2, −3, 7]] has RREF:
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-sm overflow-x-auto">
              <pre>{`RREF(A) = [ 1  0  0 ]
          [ 0  1  0 ]
          [ 0  0  1 ]`}</pre>
            </div>
            <p>
              The RREF is the 3×3 identity matrix, which tells us A has rank 3 (full rank), is invertible, and the linear
              system Ax = b has a unique solution for every b. Use the calculator above to verify this and see every elimination step.
            </p>
            <p>
              This RREF matrix calculator and row reduced echelon form calculator supports matrix sizes from 2×2 to 6×6. Every computation uses exact BigInt rational arithmetic — no floating-point rounding errors. Whether you need an RREF calculator with steps for a homework problem or a quick rank check, enter your matrix above and click Calculate RREF. Also see the <Link href="/matrix/gauss-jordan" className="text-primary hover:underline">Gauss-Jordan elimination calculator</Link> and the <Link href="/guides/linear-algebra-basics" className="text-primary hover:underline">linear algebra basics guide</Link>.
            </p>
          </div>
        </div>
      </section>

      <AdSlot id="home-mid1" size="banner" />

      {/* How to use */}
      <section className="bg-surface py-14 border-t border-slate-100" id="tutorial">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">How to Use This RREF Calculator</h2>
          <p className="text-slate-600 mb-8 text-[15px]">Three steps to get your exact RREF solution with full step-by-step explanation. For a complete walkthrough, see our <Link href="/guides/rref-step-by-step-tutorial" className="text-primary hover:underline">step-by-step RREF tutorial</Link>.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '1', title: 'Enter Your Matrix', color: 'bg-primary',
                desc: 'Set the dimensions using the row/column selectors or click a preset (2×2, 3×3, etc.). Click any cell and type your values. Use Tab or arrow keys to navigate. Enter fractions as "1/2". Negative numbers as "-3".',
              },
              {
                step: '2', title: 'Set Options', color: 'bg-accent-purple',
                desc: 'Toggle "Augmented" on if your last column contains the constants of a linear system (the right-hand side b). Use "Load Example" to see pre-built educational matrices covering different solution types.',
              },
              {
                step: '3', title: 'Calculate & Explore', color: 'bg-accent-green',
                desc: 'Click "Calculate RREF". Gauss-Jordan steps appear below. Expand individual steps to see the full matrix state. Switch between Steps and Solution tabs. Copy LaTeX to use in your assignment.',
              },
            ].map(item => (
              <div key={item.step} className="card p-5">
                <div className={`w-8 h-8 rounded-full ${item.color} text-white font-bold text-sm flex items-center justify-center mb-4`}>
                  {item.step}
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Worked Example */}
      <section className="bg-white py-14 border-t border-slate-100" id="worked-example">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Worked Example: Finding RREF of a 3×3 Matrix</h2>
          <p className="text-slate-600 mb-6 text-[15px]">
            Let's compute the RREF of A = [[0, 2, −1], [4, 0, 3], [−2, 1, 0]] step by step.
          </p>
          <div className="space-y-4">
            {[
              { title: 'Step 0: Initial Matrix', desc: 'The first column has 0 in row 1. Swap R₁ and R₂ to bring a non-zero entry to the pivot position.',
                matrix: `[ 0   2  -1 ]\n[ 4   0   3 ]\n[-2   1   0 ]` },
              { title: 'Step 1: Swap R₁ ↔ R₂', desc: 'Now the pivot column (column 1) has entry 4 in row 1. Scale R₁ → (1/4)R₁ to make the pivot equal 1.',
                matrix: `[ 4   0   3 ]\n[ 0   2  -1 ]\n[-2   1   0 ]` },
              { title: 'Step 2: Scale R₁ → (1/4)R₁', desc: 'Eliminate below: R₃ → R₃ + (1/2)R₁.',
                matrix: `[ 1   0  3/4 ]\n[ 0   2  -1  ]\n[-2   1   0  ]` },
              { title: 'Step 3: R₃ → R₃ + 2R₁', desc: 'Move to pivot column 2. Scale R₂ → (1/2)R₂.',
                matrix: `[ 1   0  3/4 ]\n[ 0   2  -1  ]\n[ 0   1  3/2 ]` },
              { title: 'After all elimination steps:', desc: 'RREF is the 3×3 identity. Rank = 3. Matrix is invertible.',
                matrix: `[ 1   0   0 ]\n[ 0   1   0 ]\n[ 0   0   1 ]` },
            ].map((s, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-1.5 bg-primary-50 rounded-full shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 text-sm mb-1">{s.title}</h3>
                  <p className="text-xs text-slate-500 mb-2">{s.desc}</p>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                    <pre>{s.matrix}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-500 mt-6">
            Enter this matrix into the calculator above to see all intermediate steps with exact fraction arithmetic.
          </p>
        </div>
      </section>

      {/* RREF vs REF */}
      <section className="bg-surface py-14 border-t border-slate-100" id="rref-vs-ref">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">RREF vs. REF: What Is the Difference?</h2>
          <div className="text-slate-600 space-y-4 text-[15px] leading-relaxed">
            <p>
              Both Row Echelon Form (REF) and Reduced Row Echelon Form (RREF) result from applying elementary row
              operations, but they differ in how far the elimination is carried. Understanding the difference is
              essential because many textbooks only go to REF, while this calculator always computes the full RREF.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="card p-5 border-l-4 border-l-slate-400">
                <h3 className="font-semibold text-slate-800 mb-2">REF (Row Echelon Form)</h3>
                <ul className="text-sm text-slate-600 space-y-1.5 list-none">
                  <li>✓ Zero rows at the bottom</li>
                  <li>✓ Leading entries non-zero (not necessarily 1)</li>
                  <li>✓ Staircase pattern of leading entries</li>
                  <li>✗ Entries above pivots are NOT zeroed</li>
                  <li>✗ Not unique — many valid REFs for one matrix</li>
                  <li className="text-slate-400 text-xs">→ Requires back-substitution to solve</li>
                </ul>
              </div>
              <div className="card p-5 border-l-4 border-l-primary">
                <h3 className="font-semibold text-primary mb-2">RREF (Reduced Row Echelon Form)</h3>
                <ul className="text-sm text-slate-600 space-y-1.5 list-none">
                  <li>✓ Zero rows at the bottom</li>
                  <li>✓ Leading entries = 1 (pivots)</li>
                  <li>✓ Staircase pattern</li>
                  <li>✓ Zeros above AND below every pivot</li>
                  <li>✓ Unique — every matrix has exactly one RREF</li>
                  <li className="text-primary text-xs font-medium">→ Solution readable directly from last column</li>
                </ul>
              </div>
            </div>
            <p>
              The key insight: Gaussian elimination stops at REF (upper triangular form) and requires back-substitution.
              Gauss-Jordan elimination continues to RREF by also eliminating entries above each pivot. RREF takes
              more row operations but produces a unique, directly readable result.
            </p>
            <p>
              For finding matrix inverses, determinants, and null spaces, RREF is the natural endpoint.
              Our <Link href="/matrix/gauss-jordan" className="text-primary hover:underline">Gauss-Jordan calculator</Link> and
              our <Link href="/guides/gauss-jordan-vs-gaussian-elimination" className="text-primary hover:underline">comparison guide</Link> explain
              the difference in detail.
            </p>
          </div>
        </div>
      </section>

      {/* Gauss-Jordan Algorithm */}
      <section className="bg-white py-14 border-t border-slate-100" id="algorithm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">How to Compute RREF By Hand (Gauss-Jordan Algorithm)</h2>
          <p className="text-slate-600 mb-6 text-[15px]">
            The Gauss-Jordan algorithm applies these six steps in sequence, working left to right through the columns
            and top to bottom through the rows:
          </p>
          <div className="space-y-3">
            {[
              { n: 1, text: 'Identify the pivot column: the leftmost column with a non-zero entry in the current row or below.' },
              { n: 2, text: 'Row swap: if the top entry of the pivot column is zero, swap the current row with a row below that has a non-zero entry in this column.' },
              { n: 3, text: 'Scale: multiply the current row by 1/(pivot value) so the pivot becomes exactly 1.' },
              { n: 4, text: 'Eliminate below: for every row below the current row, subtract the appropriate multiple of the current row to zero out its entry in the pivot column.' },
              { n: 5, text: 'Eliminate above: for every row above the current row, subtract the appropriate multiple to zero out its entry in the pivot column. (This is what Gauss-Jordan adds over basic Gaussian elimination.)' },
              { n: 6, text: 'Advance: move to the next row down and the next unprocessed column. Repeat from step 1 until all rows are processed.' },
            ].map(step => (
              <div key={step.n} className="flex gap-4 items-start card p-4">
                <div className="w-7 h-7 rounded-full bg-primary-50 text-primary font-bold text-xs flex items-center justify-center shrink-0 border border-primary-100">
                  {step.n}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdSlot id="home-mid2" size="banner" />

      {/* Why exact arithmetic section */}
      <section className="bg-surface py-14 border-t border-slate-100" id="why-exact">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Exact Arithmetic Matters in RREF</h2>
          <div className="text-slate-600 space-y-4 text-[15px] leading-relaxed">
            <p>
              Floating-point arithmetic — the kind used by most websites and programming languages — represents numbers
              in binary. Many simple fractions (like 1/3, 1/7, or 1/10) have no exact binary representation, so they
              are rounded to the nearest representable value. In a single arithmetic operation, this rounding error
              is tiny. But in Gauss-Jordan elimination, each step uses the results of the previous step. Errors
              accumulate across dozens of operations, producing visibly wrong answers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <h3 className="font-semibold text-red-700 text-sm mb-2">Other calculators (floating-point)</h3>
                <div className="font-mono text-xs text-red-700 space-y-1">
                  <p>Row 2 pivot: 0.9999999999</p>
                  <p>Entry [2,3]: -6.93889e-18</p>
                  <p>RREF entry: 0.3333333334</p>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h3 className="font-semibold text-green-700 text-sm mb-2">This calculator (exact rational)</h3>
                <div className="font-mono text-xs text-green-700 space-y-1">
                  <p>Row 2 pivot: 1</p>
                  <p>Entry [2,3]: 0</p>
                  <p>RREF entry: 1/3</p>
                </div>
              </div>
            </div>
            <p>
              Our solution: represent every number as an exact fraction using JavaScript's{' '}
              <strong>BigInt</strong> type for arbitrarily large integers. The fraction 1/3 is stored as the pair
              (numerator=1, denominator=3) — not as the decimal 0.333... Addition, multiplication, and division
              on these fractions are performed exactly, following the standard rules for rational arithmetic.
              The result of any calculation is always another exact fraction.
            </p>
            <p>
              This approach is used in computer algebra systems (Mathematica, Maple, SymPy) for exactly this reason.
              For educational use — where students need to check their hand computation — exact answers are essential.
              See our <Link href="/guides/linear-algebra-for-students" className="text-primary hover:underline">linear algebra for students guide</Link> for more tips on checking your work.
            </p>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="bg-white py-14 border-t border-slate-100" id="applications">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Applications of RREF and Row Reduction</h2>
          <div className="text-slate-600 space-y-4 text-[15px] leading-relaxed">
            <p>
              Row reduction to RREF is not just a homework exercise — it is the foundation for dozens of practical
              computations in mathematics, science, and engineering. For a structured introduction, see our <Link href="/guides/matrix-operations-cheat-sheet" className="text-primary hover:underline">matrix operations cheat sheet</Link>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {[
                { title: 'Solving Linear Systems', desc: <>Every linear system Ax = b can be solved by reducing [A|b] to RREF. The pivot structure immediately reveals whether the solution is unique, infinite, or nonexistent. See our <Link href="/guides/solving-linear-systems" className="text-primary hover:underline">solving linear systems guide</Link>.</> },
                { title: 'Finding Matrix Rank', desc: 'The rank of A equals the number of pivots in RREF(A). Rank determines the dimension of the column space (image) and row space — fundamental in linear algebra.' },
                { title: 'Computing Matrix Inverses', desc: <>Apply Gauss-Jordan to [A|I]. If A is invertible, [A|I] reduces to [I|A⁻¹]. Use our <Link href="/matrix/inverse" className="text-primary hover:underline">matrix inverse calculator</Link> to compute A⁻¹, or the <Link href="/matrix/determinant" className="text-primary hover:underline">determinant calculator</Link> to check invertibility.</> },
                { title: 'Finding Null Space', desc: 'The null space of A is found by solving Ax = 0. RREF identifies free variables, which parameterize the null space. Nullity = n − rank (rank-nullity theorem).' },
                { title: 'Checking Linear Independence', desc: 'Arrange vectors as rows or columns of a matrix. RREF reveals whether they are linearly independent (no zero rows = independent) or dependent.' },
                { title: 'Basis for Column/Row Space', desc: 'Pivot columns of A correspond to a basis for the column space. Pivot rows of RREF(A) form a basis for the row space.' },
                { title: 'Balancing Chemical Equations', desc: 'Stoichiometry problems reduce to linear systems. For example, balancing aC₂H₆ + bO₂ → cCO₂ + dH₂O becomes Ax = 0 solved by RREF.' },
                { title: 'Computer Graphics', desc: 'Transformation matrices for 3D graphics require inversion (computed via Gauss-Jordan) and rank checking. RREF underlies the matrix math in OpenGL and DirectX.' },
              ].map(({ title, desc }) => (
                <div key={title} className="card p-4">
                  <h3 className="font-semibold text-slate-800 text-sm mb-1">{title}</h3>
                  <p className="text-sm text-slate-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hub calculators */}
      <section className="bg-surface py-12 border-t border-slate-100" id="hub">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-slate-900 mb-1">All Calculators</h2>
          <p className="text-sm text-slate-500 mb-6">9 calculators powered by the same exact rational arithmetic engine.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {HUB_CALCULATORS.map(c => (
              <Link key={c.label} href={c.href}
                className="card p-4 hover:border-primary-100 hover:bg-primary-50 transition-colors group">
                <div className="text-xs font-medium text-green-600 mb-1">✓ Live</div>
                <div className="text-sm font-semibold text-slate-800 group-hover:text-primary transition-colors">{c.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{c.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Matrix sizes */}
      <section className="bg-white py-14 border-t border-slate-100" id="matrix-sizes">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">RREF Calculator for Any Matrix Size</h2>
          <p className="text-slate-600 mb-6">
            This calculator handles every matrix size students encounter, from small 2×2 systems to larger 4×4 and 5×5 matrices. Use the size presets above the calculator for one-click switching.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { size: '2×2', desc: 'Two-equation, two-variable systems. Classic linear algebra introduction. Result is always unique solution, infinite solutions, or no solution.' },
              { size: '2×3', desc: 'Two equations, three unknowns — one free variable guaranteed. Common in parametric solution problems.' },
              { size: '3×3', desc: 'Three-variable systems. Most common in undergraduate linear algebra courses. Includes the augmented 3×4 form for solving Ax=b.' },
              { size: '3×4', desc: 'Augmented matrix for three equations and three unknowns. Enter coefficients in columns 1–3 and constants in column 4.' },
              { size: '4×4', desc: 'Four-variable systems common in upper-division courses. Our exact rational arithmetic prevents the rounding errors that plague TI-84 and Casio results.' },
              { size: 'Up to 6×6', desc: 'Custom sizes available via the row and column dropdowns. All sizes use the same BigInt exact arithmetic — no floating-point errors at any dimension.' },
            ].map(({ size, desc }) => (
              <div key={size} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <h3 className="font-semibold text-slate-800 mb-1">{size} RREF Calculator</h3>
                <p className="text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-500 mt-6">
            Wondering how this compares to using the RREF function on a TI-84 or Casio calculator?{' '}
            The TI-84 uses floating-point arithmetic internally, which can produce rounding errors on fractions — this calculator uses exact rational arithmetic, so your answers are always precise fractions, never approximations like 0.9999999.{' '}
            Learn more in our <Link href="/guides/rref-step-by-step-tutorial" className="text-primary hover:underline">RREF step-by-step tutorial</Link>.
          </p>
        </div>
      </section>

      {/* Guides */}
      <section className="bg-white py-12 border-t border-slate-100" id="guides">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-slate-900 mb-1">Educational Guides</h2>
          <p className="text-sm text-slate-500 mb-6">In-depth articles to build your linear algebra understanding.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Linear Algebra Basics', href: '/guides/linear-algebra-basics', desc: 'Scalars, vectors, matrices, RREF, rank, and more — a complete beginner primer.' },
              { title: 'Solving Linear Systems', href: '/guides/solving-linear-systems', desc: 'Substitution, elimination, Gauss-Jordan, matrix inverse — all methods compared.' },
              { title: 'Matrix Cheat Sheet', href: '/guides/matrix-operations-cheat-sheet', desc: 'Quick reference for all matrix operations, formulas, and properties.' },
              { title: 'RREF Step-by-Step Tutorial', href: '/guides/rref-step-by-step-tutorial', desc: 'Three complete worked examples: 2×2, 3×3, and augmented 3×4.' },
              { title: 'Gauss-Jordan vs. Gaussian', href: '/guides/gauss-jordan-vs-gaussian-elimination', desc: 'Which method is faster? Which gives RREF? Identical example, both methods.' },
              { title: 'Linear Algebra for Students', href: '/guides/linear-algebra-for-students', desc: 'Homework help, common mistakes, study strategies, and practice problems.' },
            ].map(g => (
              <Link key={g.href} href={g.href} className="card p-5 hover:border-primary-100 hover:bg-primary-50 transition-colors group">
                <h3 className="font-semibold text-slate-800 text-sm mb-1 group-hover:text-primary transition-colors flex items-center gap-1">
                  {g.title} <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-slate-500">{g.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AdSlot id="home-before-faq" size="banner" />

      {/* FAQ — 20 questions */}
      <section className="bg-surface py-14 border-t border-slate-100" id="faq">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Frequently Asked Questions</h2>
          <p className="text-slate-500 mb-8 text-sm">20 questions covering RREF, Gauss-Jordan, augmented matrices, and this calculator.</p>
          <div className="space-y-3">
            {faqSchema.mainEntity.map((item, i) => (
              <details key={i} className="card p-5 group">
                <summary className="font-semibold text-slate-800 cursor-pointer list-none flex items-start justify-between gap-3 text-sm">
                  <span>{item.name}</span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform shrink-0 mt-0.5 text-xs">▾</span>
                </summary>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{item.acceptedAnswer.text}</p>
                {i === 5 && <p className="mt-2 text-sm"><Link href="/matrix/gauss-jordan" className="text-primary hover:underline">Try the Gauss-Jordan elimination calculator →</Link></p>}
                {i === 10 && <p className="mt-2 text-sm"><Link href="/matrix/inverse" className="text-primary hover:underline">Try the matrix inverse calculator →</Link></p>}
                {i === 11 && <p className="mt-2 text-sm"><Link href="/guides/linear-algebra-basics" className="text-primary hover:underline">See the linear algebra basics guide →</Link></p>}
                {i === 15 && <p className="mt-2 text-sm"><Link href="/guides/solving-linear-systems" className="text-primary hover:underline">See the solving linear systems guide →</Link></p>}
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
