import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/calculator/Breadcrumb';
import RelatedCalculators from '@/components/calculator/RelatedCalculators';
import AdSlot from '@/components/calculator/AdSlot';
import TableOfContents from '@/components/TableOfContents';

export const metadata: Metadata = {
  title: 'RREF Step-by-Step Tutorial — Complete Worked Examples',
  description: 'Master RREF with full worked examples. Learn Gauss-Jordan elimination step by step for 2×2, 3×3, and 3×4 augmented matrices. Free tutorial.',
  alternates: { canonical: 'https://rrefmatrixcalc.com/guides/rref-step-by-step-tutorial' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'RREF Calculator', item: 'https://rrefmatrixcalc.com' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://rrefmatrixcalc.com/guides' },
    { '@type': 'ListItem', position: 3, name: 'RREF Step-by-Step Tutorial', item: 'https://rrefmatrixcalc.com/guides/rref-step-by-step-tutorial' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What are the four RREF conditions?', acceptedAnswer: { '@type': 'Answer', text: 'A matrix is in RREF when all four hold: (1) all-zero rows are at the bottom, (2) the first non-zero entry in each non-zero row (the pivot) equals 1, (3) each pivot is strictly to the right of the pivot above it (staircase pattern), and (4) all entries above AND below each pivot are zero.' } },
    { '@type': 'Question', name: 'What is a free variable in RREF?', acceptedAnswer: { '@type': 'Answer', text: 'A free variable corresponds to a column in RREF that has no pivot (no leading 1). That variable can take any real value — it is a parameter. Systems with free variables have infinitely many solutions, expressed as a parametric family where pivot variables depend on the free variables.' } },
    { '@type': 'Question', name: 'What is the difference between REF and RREF?', acceptedAnswer: { '@type': 'Answer', text: 'Row Echelon Form (REF) only requires zeros below each pivot — entries above pivots can be anything. RREF additionally requires each pivot to equal 1 and all entries above each pivot to be zero. RREF is unique (one per matrix); REF is not unique.' } },
    { '@type': 'Question', name: 'When should I use a TI-84 vs. an online RREF calculator?', acceptedAnswer: { '@type': 'Answer', text: 'Use the TI-84 on time-pressured exams where a calculator is permitted and you only need the final result. Use an online calculator when you need exact fractions (TI-84 uses decimals), step-by-step explanations, or when studying — the step-by-step output shows every row operation, far more valuable for learning.' } },
  ],
};

export default function RREFTutorial() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Guides' }, { label: 'RREF Tutorial' }]} />
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
        RREF Step-by-Step Tutorial
      </h1>
      <p className="text-slate-500 mb-2">Three complete worked examples: 2×2, 3×3, and 3×4 augmented matrix. Every row operation shown.</p>
      <p className="text-xs text-slate-400 mb-6">📖 6 min read · Updated May 2026 · Reviewed by our math editorial team</p>
      <TableOfContents
        readingTimeMin={8}
        items={[
          { id: 'rref-conditions', label: 'The Four RREF Conditions' },
          { id: 'example-2x2', label: 'Example 1: 2×2 Matrix' },
          { id: 'example-3x3', label: 'Example 2: 3×3 Matrix with Fractions' },
          { id: 'example-infinite', label: 'Example 3: Infinite Solutions (2-row)' },
          { id: 'example-no-solution', label: 'Example 4: No Solution (Inconsistent)' },
          { id: 'example-3x4', label: 'Example 5: 3×4 Augmented Matrix — Free Variable' },
          { id: 'common-mistakes', label: 'Common Mistakes in Row Reduction' },
          { id: 'ti84-comparison', label: 'Using a TI-84 vs. Computing by Hand' },
          { id: 'how-to-use', label: 'How to Use the Calculator to Check Your Work' },
        ]}
      />
      <AdSlot id="tut-top" size="leaderboard" />

      <article className="prose-content space-y-10 mt-6">
        <section id="rref-conditions">
          <h2>Quick Review: The Four RREF Conditions</h2>
          <p>A matrix is in Reduced Row Echelon Form (RREF) when all four conditions hold simultaneously:</p>
          <ol>
            <li><strong>All-zero rows at the bottom.</strong> Any row of all zeros sits below all non-zero rows.</li>
            <li><strong>Pivots equal 1.</strong> The first non-zero entry in each non-zero row is exactly 1.</li>
            <li><strong>Staircase pattern.</strong> Each pivot is strictly to the right of the pivot in the row above.</li>
            <li><strong>Zeros above AND below each pivot.</strong> This is what separates RREF from REF — all entries in a pivot column except the pivot itself are zero.</li>
          </ol>
          <p>Every matrix has a unique RREF — no matter which sequence of row operations you use, you reach the same end state. (This is the uniqueness theorem for RREF, discussed in Strang's <em>Introduction to Linear Algebra</em>, §1.5.) New to the subject? The <Link href="/guides/linear-algebra-basics" className="text-primary hover:underline">linear algebra basics</Link> guide covers vectors, matrices, and the motivation for row reduction from scratch.</p>
        </section>

        <section id="example-2x2">
          <h2>Example 1: 2×2 Matrix</h2>
          <p>Find the RREF of A = [[4, 7], [2, 6]].</p>
          <p><strong>Start:</strong></p>
          <div className="worked-example"><pre>{`[ 4  7 ]
[ 2  6 ]`}</pre></div>
          <p><strong>Step 1.</strong> Pivot column is column 1. The top entry is 4 (non-zero), so no row swap needed. Scale R₁ → (1/4)R₁ to make pivot = 1:</p>
          <div className="worked-example"><pre>{`[ 1  7/4 ]
[ 2  6   ]`}</pre></div>
          <p><strong>Step 2.</strong> Eliminate below pivot: R₂ → R₂ − 2R₁:</p>
          <div className="worked-example"><pre>{`[ 1  7/4 ]
[ 0  5/2 ]`}</pre></div>
          <p><strong>Step 3.</strong> Move to next pivot: column 2, row 2. Scale R₂ → (2/5)R₂:</p>
          <div className="worked-example"><pre>{`[ 1  7/4 ]
[ 0  1   ]`}</pre></div>
          <p><strong>Step 4.</strong> Eliminate ABOVE this pivot: R₁ → R₁ − (7/4)R₂:</p>
          <div className="worked-example"><pre>{`[ 1  0 ]
[ 0  1 ]`}</pre></div>
          <p>RREF is the 2×2 identity matrix. Verification: A has full rank 2 and is invertible — the <Link href="/matrix/inverse" className="text-primary hover:underline">matrix inverse calculator</Link> can confirm A⁻¹ exists and compute it step by step.</p>
        </section>

        <AdSlot id="tut-mid1" size="banner" />

        <section id="example-3x3">
          <h2>Example 2: 3×3 Matrix with Fractions</h2>
          <p>Find RREF of B = [[0, 2, −1], [4, 0, 3], [−2, 1, 0]].</p>
          <p><strong>Start:</strong></p>
          <div className="worked-example"><pre>{`[  0  2  -1 ]
[  4  0   3 ]
[ -2  1   0 ]`}</pre></div>
          <p><strong>Step 1.</strong> Column 1: the top entry is 0. Swap R₁ ↔ R₂ (row with non-zero first entry):</p>
          <div className="worked-example"><pre>{`[  4  0   3 ]   ← R₂ moved up
[  0  2  -1 ]   ← R₁ moved down
[ -2  1   0 ]`}</pre></div>
          <p><strong>Step 2.</strong> Scale R₁ → (1/4)R₁:</p>
          <div className="worked-example"><pre>{`[  1   0   3/4 ]
[  0   2  -1   ]
[ -2   1   0   ]`}</pre></div>
          <p><strong>Step 3.</strong> Eliminate column 1 below: R₃ → R₃ + 2R₁:</p>
          <div className="worked-example"><pre>{`[  1  0   3/4 ]
[  0  2  -1   ]
[  0  1   3/2 ]`}</pre></div>
          <p><strong>Step 4.</strong> Pivot column 2, row 2. Scale R₂ → (1/2)R₂:</p>
          <div className="worked-example"><pre>{`[  1  0   3/4 ]
[  0  1  -1/2 ]
[  0  1   3/2 ]`}</pre></div>
          <p><strong>Step 5.</strong> Eliminate below: R₃ → R₃ − R₂:</p>
          <div className="worked-example"><pre>{`[  1  0   3/4 ]
[  0  1  -1/2 ]
[  0  0   2   ]`}</pre></div>
          <p><strong>Step 6.</strong> Pivot column 3, row 3. Scale R₃ → (1/2)R₃:</p>
          <div className="worked-example"><pre>{`[  1  0   3/4 ]
[  0  1  -1/2 ]
[  0  0   1   ]`}</pre></div>
          <p><strong>Step 7.</strong> Eliminate above: R₁ → R₁ − (3/4)R₃, then R₂ → R₂ + (1/2)R₃:</p>
          <div className="worked-example"><pre>{`[  1  0  0 ]
[  0  1  0 ]
[  0  0  1 ]`}</pre></div>
          <p>RREF is the 3×3 identity — B is invertible with rank 3.</p>
        </section>

        <section id="example-infinite">
          <h2>Example 3: Augmented Matrix — Infinite Solutions</h2>
          <p>Solve the system: x + 2y − z = 1, 2x + 4y − 2z = 2, 3x + 6y − 3z = 3.</p>
          <p>Augmented matrix:</p>
          <div className="worked-example"><pre>{`[ 1  2  -1 | 1 ]
[ 2  4  -2 | 2 ]
[ 3  6  -3 | 3 ]`}</pre></div>
          <p><strong>Step 1.</strong> R₂ → R₂ − 2R₁:</p>
          <div className="worked-example"><pre>{`[ 1  2  -1 | 1 ]
[ 0  0   0 | 0 ]
[ 3  6  -3 | 3 ]`}</pre></div>
          <p><strong>Step 2.</strong> R₃ → R₃ − 3R₁:</p>
          <div className="worked-example"><pre>{`[ 1  2  -1 | 1 ]
[ 0  0   0 | 0 ]
[ 0  0   0 | 0 ]`}</pre></div>
          <p>This is already in RREF. Interpretation: only one pivot (column 1). Columns 2 and 3 have no pivots — y and z are free variables. The solution is:</p>
          <div className="worked-example"><pre>{`x = 1 - 2s + t
y = s    (free parameter s)
z = t    (free parameter t)`}</pre></div>
          <p>This system has infinitely many solutions — a 2-dimensional family (plane in ℝ³). All three original equations are multiples of each other: row 2 = 2×row 1, row 3 = 3×row 1. The matrix has rank 1, nullity 2.</p>
        </section>

        <section id="example-no-solution">
          <h2>Example 4: No Solution (Inconsistent)</h2>
          <p>Augmented matrix: [[1, 2, 3 | 4], [2, 4, 6 | 9]].</p>
          <div className="worked-example"><pre>{`[ 1  2  3 | 4 ]
[ 2  4  6 | 9 ]`}</pre></div>
          <p>R₂ → R₂ − 2R₁:</p>
          <div className="worked-example"><pre>{`[ 1  2  3 | 4 ]
[ 0  0  0 | 1 ]`}</pre></div>
          <p>Row 2 reads "0 = 1", which is impossible. No solution exists. The coefficient rows are linearly dependent (row 2 = 2×row 1), but the right-hand sides are not proportionally related (9 ≠ 2·4). Geometrically: two parallel planes that don't intersect.</p>
        </section>

        <section id="example-3x4">
          <h2>Example 5: 3×4 Augmented Matrix — One Free Variable</h2>
          <p>Solve the system: x₁ + 2x₂ − x₃ = 3, 2x₁ + 5x₂ + x₃ = 9, x₁ + 3x₂ + 2x₃ = 6. This gives a 3×4 augmented matrix [A|b] with 3 equations and 3 unknowns — but the matrix has rank 2, yielding one free variable.</p>
          <p><strong>Start:</strong></p>
          <div className="worked-example"><pre>{`[ 1  2  -1 | 3 ]
[ 2  5   1 | 9 ]
[ 1  3   2 | 6 ]`}</pre></div>
          <p><strong>Step 1.</strong> Eliminate column 1 below: R₂ → R₂ − 2R₁, R₃ → R₃ − R₁:</p>
          <div className="worked-example"><pre>{`[ 1  2  -1 | 3 ]
[ 0  1   3 | 3 ]
[ 0  1   3 | 3 ]`}</pre></div>
          <p><strong>Step 2.</strong> Note R₂ = R₃ exactly. Eliminate column 2 in R₃: R₃ → R₃ − R₂:</p>
          <div className="worked-example"><pre>{`[ 1  2  -1 | 3 ]
[ 0  1   3 | 3 ]
[ 0  0   0 | 0 ]`}</pre></div>
          <p>Row 3 is all zeros — the three equations are not independent. R₁ and R₂ already give us RREF in the first two pivot columns.</p>
          <p><strong>Step 3.</strong> Back-eliminate column 2 in R₁: R₁ → R₁ − 2R₂:</p>
          <div className="worked-example"><pre>{`[ 1  0  -7 | -3 ]
[ 0  1   3 |  3 ]
[ 0  0   0 |  0 ]`}</pre></div>
          <p>This is RREF. Pivot columns: 1 and 2 (x₁ and x₂ are basic variables). Column 3 has no pivot — x₃ is a free variable. Set x₃ = t (any real number). Then:</p>
          <div className="worked-example"><pre>{`x₁ = −3 + 7t
x₂ =  3 − 3t
x₃ = t   (free parameter)`}</pre></div>
          <p>This is a line of solutions in ℝ³ (parametric form). At t = 0: (−3, 3, 0). At t = 1: (4, 0, 1). Verify each satisfies all three original equations. Rank = 2, nullity = 1 (one free variable). The <Link href="/">RREF calculator</Link> identifies free variables automatically when Augmented mode is enabled.</p>
        </section>

        <section id="common-mistakes">
          <h2>Common Mistakes in Row Reduction</h2>
          <p>These five errors account for the majority of wrong answers when computing RREF by hand. Each is fixable once you know to look for it.</p>

          <p><strong>Mistake 1: Arithmetic errors in fraction multiplication.</strong> When computing R₃ → R₃ − (5/3)R₁, you must multiply (5/3) by every entry in R₁ and subtract. Missing even one entry cascades: every subsequent step inherits the error. Fix: multiply the entire row explicitly before subtracting, and double-check each entry.</p>

          <p><strong>Mistake 2: Stopping at REF instead of RREF.</strong> After forward elimination (zeroing below each pivot), you have REF. RREF requires a backward pass that zeros above each pivot too. If your textbook teaches both Gaussian elimination (→ REF) and Gauss-Jordan (→ RREF), confirm which one the problem is asking for. When in doubt, RREF is the standard for most homework and exam problems.</p>

          <p><strong>Mistake 3: Applying the row operation to the wrong row.</strong> "R₂ → R₂ − 3R₁" means replace row 2 with (row 2 minus 3 times row 1). A common error is accidentally modifying R₁ instead. Keep R₁ untouched — only R₂ changes.</p>

          <p><strong>Mistake 4: Scaling the wrong row or by the wrong factor.</strong> To make the pivot in row k equal 1, scale row k by the reciprocal of the pivot. If the pivot is 3/4, scale by 4/3 — not by 3/4. This is the most common single-step error for students first encountering fraction pivots.</p>

          <p><strong>Mistake 5: Confusing free variables with the zero-row variable.</strong> In a system with a zero row [0 0 0 | 0], beginners sometimes think the "third variable" is 0. It is not — the zero row simply means one equation was redundant. The third variable is free (it can be anything), not zero. Only [0 0 0 | c] with c ≠ 0 means no solution.</p>
        </section>

        <AdSlot id="tut-mid2" size="banner" />

        <section id="ti84-comparison">
          <h2>Using a TI-84 to Compute RREF: Pros, Cons, and When to Use Each</h2>
          <p>The TI-84 graphing calculator has a built-in <code>rref(</code> function (found under MATRIX → MATH → rref). It computes RREF in one step. Here is an honest comparison of the TI-84 vs. computing by hand (or using this online calculator):</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left p-3 border border-slate-200 font-semibold">Feature</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold">TI-84 rref(</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold">By Hand / This Calculator</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Shows row operations', '✗ No', '✓ Yes — every step named'],
                  ['Exact fractions', '✗ Decimal approximations (e.g., 0.3333)', '✓ Exact (e.g., 1/3)'],
                  ['Max matrix size', '≤ 10×10', '2×2 to 6×6 here; unlimited by hand'],
                  ['Speed for large matrices', '✓ Fast', '✗ Slower'],
                  ['Available on exams', '✓ If calculator allowed', '✓ By hand always allowed'],
                  ['Educational value', '✗ Low — shows only the answer', '✓ High — shows the process'],
                  ['Free to use', '✗ Requires TI-84 (~$100)', '✓ Free online'],
                  ['Identifies free variables', '✗ You must read RREF manually', '✓ Labels free variables automatically'],
                ].map(([feature, ti, calc]) => (
                  <tr key={feature} className="border-b border-slate-100">
                    <td className="p-3 border border-slate-200 font-medium text-slate-700">{feature}</td>
                    <td className="p-3 border border-slate-200 text-slate-600">{ti}</td>
                    <td className="p-3 border border-slate-200 text-slate-600">{calc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4">
            <strong>Recommendation:</strong> Use the TI-84 on time-pressured exams where the calculator is allowed and you only need the final RREF. Use this calculator (or work by hand) when you need to understand the steps, check individual row operations, or study for an exam where calculators are not allowed. For learning and homework verification, the step-by-step output of this calculator is far more valuable than the single-answer output of rref( on a TI-84.
          </p>
          <p>
            The <Link href="/guides/gauss-jordan-vs-gaussian-elimination" className="text-primary hover:underline">Gauss-Jordan vs. Gaussian elimination guide</Link> explains the underlying algorithm that both the TI-84 and this calculator use.
          </p>
        </section>

        <section id="how-to-use">
          <h2>How to Use the RREF Calculator to Check Your Work</h2>
          <p>After computing RREF by hand:</p>
          <ol>
            <li>Enter your original matrix into the <Link href="/">RREF calculator</Link>.</li>
            <li>Toggle "Augmented" on if your matrix has a right-hand side column.</li>
            <li>Click "Calculate RREF" and compare your result to the calculator's RREF.</li>
            <li>If they differ, expand the steps panel and compare step-by-step to find where your row operation went wrong.</li>
          </ol>
          <p>The calculator uses exact rational arithmetic, so even complex fraction arithmetic (like 7/4 subtracted from 3/2) is handled without rounding. Have more questions about the calculator's features? See the <Link href="/faq" className="text-primary hover:underline">FAQ page</Link>.</p>
        </section>

        <AdSlot id="tut-bottom" size="banner" />
      </article>
      <RelatedCalculators picks={['/', '/matrix/inverse', '/matrix/determinant', '/matrix/gauss-jordan', '/guides/solving-linear-systems']} />
    </main>
    </>
  );
}
