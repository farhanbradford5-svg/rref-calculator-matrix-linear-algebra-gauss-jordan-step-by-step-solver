import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/calculator/Breadcrumb';
import RelatedCalculators from '@/components/calculator/RelatedCalculators';
import AdSlot from '@/components/calculator/AdSlot';

export const metadata: Metadata = {
  title: 'Solving Linear Systems — Complete Method Guide with Examples',
  description: 'Learn every method for solving linear systems: substitution, elimination, Gauss-Jordan, matrix inverse. Full worked examples with step-by-step explanations.',
  alternates: { canonical: 'https://rrefmatrixcalc.com/guides/solving-linear-systems' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'RREF Calculator', item: 'https://rrefmatrixcalc.com' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://rrefmatrixcalc.com/guides' },
    { '@type': 'ListItem', position: 3, name: 'Solving Linear Systems', item: 'https://rrefmatrixcalc.com/guides/solving-linear-systems' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What are the three possible outcomes of a linear system?', acceptedAnswer: { '@type': 'Answer', text: 'Every linear system has exactly one of three outcomes: (1) one unique solution — consistent and independent, every variable determined; (2) infinitely many solutions — consistent and dependent, at least one free variable; (3) no solution — inconsistent, a contradiction row [0 0 ... 0 | c≠0] appears in RREF.' } },
    { '@type': 'Question', name: 'What is a homogeneous system?', acceptedAnswer: { '@type': 'Answer', text: 'A homogeneous system has the form Ax = 0 (all right-hand sides equal zero). It always has at least the trivial solution x = 0. If rank(A) < n (fewer pivots than unknowns), it has infinitely many solutions — the null space of A is non-trivial. Homogeneous systems arise when finding null spaces, eigenvectors, and testing linear independence.' } },
    { '@type': 'Question', name: 'What is the fastest method for solving a linear system by hand?', acceptedAnswer: { '@type': 'Answer', text: 'For hand computation of a single system, Gaussian elimination plus back-substitution is roughly 30% faster than full Gauss-Jordan. However, Gauss-Jordan (RREF) is preferred when you need the canonical result for comparison, are finding rank or null space, or are solving multiple systems simultaneously with the same coefficient matrix.' } },
  ],
};

export default function SolvingLinearSystemsGuide() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Guides' }, { label: 'Solving Linear Systems' }]} />
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
        Solving Linear Systems
      </h1>
      <p className="text-slate-500 mb-2">Every method, explained with full worked examples.</p>
      <p className="text-xs text-slate-400 mb-8">📖 7 min read · Updated May 2026 · Reviewed by our math editorial team</p>
      <AdSlot id="guide-ls-top" size="leaderboard" />

      <article className="prose-content space-y-10 mt-6">
        <section>
          <h2>What Is a Linear System?</h2>
          <p>A linear system (or system of linear equations) is a collection of equations, each linear in the same set of unknowns. "Linear" means each variable appears only to the first power, with no products of variables, no powers above 1, and no trigonometric or exponential terms.</p>
          <div className="worked-example"><pre>{`3x + 2y = 12
x - y  = 1`}</pre></div>
          <p>Every linear system has exactly one of three outcomes: one solution (consistent, independent), infinitely many solutions (consistent, dependent), or no solution (inconsistent). The goal of all methods is to determine which case applies and, if solutions exist, to find them.</p>
        </section>

        <section>
          <h2>Method 1: Substitution</h2>
          <p>Solve for one variable in one equation, then substitute into the others. Best for small systems (2 equations, 2 unknowns) where one equation is already simple.</p>
          <p>Example: 3x + 2y = 12 and x − y = 1.</p>
          <p>From the second equation: x = 1 + y. Substitute into the first: 3(1 + y) + 2y = 12 → 3 + 3y + 2y = 12 → 5y = 9 → y = 9/5. Then x = 1 + 9/5 = 14/5.</p>
          <p>Solution: x = 14/5, y = 9/5. Check: 3(14/5) + 2(9/5) = 42/5 + 18/5 = 60/5 = 12 ✓, 14/5 − 9/5 = 5/5 = 1 ✓.</p>
          <p>Substitution becomes unwieldy for systems with more than 2 or 3 variables. For larger systems, Gauss-Jordan elimination is far more systematic.</p>
        </section>

        <section>
          <h2>Method 2: Elimination (by Hand)</h2>
          <p>Add or subtract multiples of equations to eliminate variables one at a time. This is Gaussian elimination in informal notation.</p>
          <div className="worked-example"><pre>{`x + 2y + 3z = 14
2x + 5y + 2z = 18
3x + y  + 5z = 20`}</pre></div>
          <p>R₂ → R₂ − 2R₁: −y − 4z = −10. R₃ → R₃ − 3R₁: −5y − 4z = −22. Then R₃ → R₃ − 5R₂: 16z = 28, so z = 7/4. Back-substitute: y = 10 − 4(7/4) = 3. Then x = 14 − 2(3) − 3(7/4) = 14 − 6 − 21/4 = 32/4 − 21/4 = 11/4.</p>
          <p>Solution: x = 11/4, y = 3, z = 7/4. The RREF calculator handles this automatically, including all fraction bookkeeping.</p>
        </section>

        <section>
          <h2>Method 3: Gauss-Jordan Elimination (RREF)</h2>
          <p>Write the augmented matrix [A|b] and reduce to RREF using elementary row operations. This is the most systematic method for any size system and is what computers use.</p>
          <div className="worked-example"><pre>{`[ 1  2  3 | 14 ]      [ 1  0  0 | 11/4 ]
[ 2  5  2 | 18 ]  →   [ 0  1  0 |  3   ]
[ 3  1  5 | 20 ]      [ 0  0  1 |  7/4 ]`}</pre></div>
          <p>In RREF, solutions are read directly from the last column. No back-substitution needed. <Link href="/">Try it with the RREF calculator.</Link></p>
          <p>Gauss-Jordan is preferred when: you need RREF anyway (for rank/null space), the system has many variables, or you want a single algorithm that handles all three cases (unique/infinite/no solution).</p>
        </section>

        <section>
          <h2>Method 4: Matrix Inverse</h2>
          <p>If A is square and invertible, solve Ax = b as x = A⁻¹b. This is elegant but computationally expensive (inverting a matrix takes more work than solving one system). It is useful when you need to solve Ax = b for many different b vectors with the same A — you invert once and multiply repeatedly.</p>
          <div className="worked-example"><pre>{`Ax = b   →   x = A⁻¹b`}</pre></div>
          <p>For a 2×2 system: if A = [[a,b],[c,d]] and det(A) = ad − bc ≠ 0, then A⁻¹ = (1/det)[[d,−b],[−c,a]]. <Link href="/matrix/inverse">Try the matrix inverse calculator.</Link></p>
        </section>

        <section>
          <h2>Recognizing the Three Solution Types</h2>
          <p><strong>Unique solution (consistent, independent).</strong> In RREF: every variable column has a pivot, and no contradiction row [0 0 ... 0 | c≠0] appears. The solution is x₁ = c₁, x₂ = c₂, etc., read directly from RREF. Geometrically: two planes in 3D intersect at exactly one point.</p>
          <p><strong>Infinitely many solutions (consistent, dependent).</strong> In RREF: at least one variable column has no pivot (a free variable). The solution is parameterized by the free variables. Geometrically: the system describes a line or plane of solutions.</p>
          <div className="worked-example"><pre>{`[ 1  0  2 | 5 ]   →   x₁ = 5 - 2t
[ 0  1  3 | 7 ]   →   x₂ = 7 - 3t   (t = x₃ is free)
[ 0  0  0 | 0 ]   →   x₃ = t`}</pre></div>
          <p><strong>No solution (inconsistent).</strong> In RREF: a row [0 0 ... 0 | c] with c ≠ 0 appears. This represents "0 = c", which is impossible. Geometrically: two planes in 3D are parallel and do not intersect.</p>
          <div className="worked-example"><pre>{`[ 1  2 | 3 ]
[ 0  0 | 7 ]   →   0 = 7   (impossible — no solution)`}</pre></div>
        </section>

        <section>
          <h2>Homogeneous Systems</h2>
          <p>A <strong>homogeneous system</strong> has b = 0: Ax = 0. It always has at least the trivial solution x = 0. If rank(A) &lt; n (number of unknowns), it has infinitely many solutions — the null space of A is non-trivial.</p>
          <p>Homogeneous systems arise in finding null spaces, eigenvectors (Av = λv rearranges to (A − λI)v = 0), and determining linear independence (are the vectors v₁, ..., vₖ independent? Solve c₁v₁ + ... + cₖvₖ = 0).</p>
        </section>

        <AdSlot id="guide-ls-mid" size="banner" />

        <section>
          <h2>Cramer's Rule</h2>
          <p>For an n×n system Ax = b with det(A) ≠ 0, Cramer's rule gives each solution component as a ratio of determinants:</p>
          <div className="worked-example"><pre>{`xᵢ = det(Aᵢ) / det(A)`}</pre></div>
          <p>where Aᵢ is the matrix A with column i replaced by b. Cramer's rule is important theoretically and elegant for 2×2 systems, but computationally expensive for n ≥ 4 — computing n+1 determinants each of size n×n. For large n, Gauss-Jordan is vastly more efficient.</p>
        </section>

        <section>
          <h2>Practical Tips for Solving by Hand</h2>
          <ul>
            <li>Always write the augmented matrix [A|b] first — it keeps the bookkeeping organized.</li>
            <li>Work column by column, left to right. Don't skip ahead.</li>
            <li>Keep fractions exact — decimal approximations accumulate rounding errors.</li>
            <li>If a row becomes all zeros (on the left), it means the equations were dependent — leave the row and move on.</li>
            <li>After finding RREF, check your solution by substituting back into the original equations.</li>
            <li>The pivot columns of RREF tell you the basic variables; non-pivot columns are free variables.</li>
          </ul>
        </section>

        <section>
          <h2>Common Mistakes</h2>
          <ul>
            <li><strong>Arithmetic errors with fractions.</strong> The main advantage of using the RREF calculator is eliminating these. If solving by hand, double-check every fraction multiplication.</li>
            <li><strong>Forgetting to eliminate above the pivot.</strong> REF only eliminates below; RREF requires eliminating above too. Missing this step leaves you with REF, not RREF.</li>
            <li><strong>Misidentifying free variables.</strong> A column without a pivot is a free variable column — the corresponding variable is free, not the pivot of the row it's in.</li>
            <li><strong>Declaring "no solution" when there are infinitely many.</strong> A zero row [0 0 ... 0 | 0] means infinitely many solutions (or the trivial solution for a homogeneous system), not no solution. The contradiction is [0 0 ... 0 | c≠0].</li>
          </ul>
        </section>

        <section>
          <h2>Back-Substitution vs. RREF: Which Method to Use?</h2>
          <p><strong>Back-substitution after Gaussian elimination (REF):</strong> Forward elimination zeros entries below each pivot, reaching an upper triangular matrix. Then you solve for the last variable from the last row, substitute up, and solve for each preceding variable. Fewer total row operations than RREF for a single system — roughly 30% faster for a square system.</p>
          <p><strong>RREF via Gauss-Jordan:</strong> Continues the forward pass with a backward pass that zeros entries above each pivot. More operations, but the solution is read directly from the last column with no back-substitution required. RREF is the canonical form — the same result regardless of which sequence of row operations you use.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse mt-3">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 border border-slate-200">Criterion</th>
                  <th className="text-left p-3 border border-slate-200">Back-Substitution (after REF)</th>
                  <th className="text-left p-3 border border-slate-200">RREF (Gauss-Jordan)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Operations for n×n system', '≈ n³/3 + n²/2', '≈ n³/2 (more)'],
                  ['Solution readability', 'Requires back-substitution', 'Read directly from RREF'],
                  ['Finding null space', 'Requires extra work', 'Free variables visible immediately'],
                  ['Finding matrix inverse', 'Less natural', 'Natural via [A|I] → [I|A⁻¹]'],
                  ['Uniqueness of result', 'REF is not unique', 'RREF is unique'],
                  ['Best for', 'Speed on single system', 'All other purposes'],
                ].map(([crit, back, rref]) => (
                  <tr key={crit} className="border-b border-slate-100">
                    <td className="p-3 border border-slate-200 font-medium text-slate-700">{crit}</td>
                    <td className="p-3 border border-slate-200 text-slate-600">{back}</td>
                    <td className="p-3 border border-slate-200 text-slate-600">{rref}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3">For most learning contexts, RREF is preferred because the unique canonical result makes it easy to verify work. The <Link href="/guides/gauss-jordan-vs-gaussian-elimination" className="text-primary hover:underline">Gauss-Jordan vs. Gaussian elimination guide</Link> covers this comparison in more depth.</p>
        </section>

        <section>
          <h2>Geometric Interpretation of Linear Systems</h2>
          <p>Every linear system has a geometric picture that makes the three solution types intuitive.</p>
          <p><strong>2 equations in 2 unknowns (2 lines in ℝ²):</strong></p>
          <ul>
            <li><strong>Unique solution:</strong> Two lines intersect at exactly one point. The solution is that intersection point.</li>
            <li><strong>Infinite solutions:</strong> The two equations describe the same line (one is a scalar multiple of the other). Every point on the line is a solution.</li>
            <li><strong>No solution:</strong> Two parallel lines that never intersect. The lines have the same slope but different y-intercepts.</li>
          </ul>
          <p><strong>3 equations in 3 unknowns (3 planes in ℝ³):</strong></p>
          <ul>
            <li><strong>Unique solution:</strong> Three planes meet at exactly one point.</li>
            <li><strong>Infinite solutions (a line):</strong> Three planes share a common line. This happens when two equations are independent but the third is a combination of the first two — rank 2, one free variable.</li>
            <li><strong>Infinite solutions (a plane):</strong> All three planes are identical or all pass through the same plane. Rank 1, two free variables.</li>
            <li><strong>No solution:</strong> At least two planes are parallel and non-intersecting (or two planes intersect in a line parallel to the third plane).</li>
          </ul>
          <p>The RREF of the augmented matrix always reveals which geometric case applies: count the pivot columns (rank), check for a contradiction row, and count free variables.</p>
        </section>

        <section>
          <h2>Worked Word Problem: Mixture Problem</h2>
          <p>A chemistry lab mixes three solutions — A (10% acid), B (30% acid), and C (60% acid) — to produce 100 mL of a 25% acid solution. The amount of solution C must equal the amount of solution A. Find how many milliliters of each solution to use.</p>
          <p><strong>Set up the system:</strong></p>
          <ul>
            <li>Total volume: x + y + z = 100</li>
            <li>Acid content: 0.10x + 0.30y + 0.60z = 25 (25% of 100 mL = 25 mL of acid)</li>
            <li>Constraint: z = x, equivalently x − z = 0</li>
          </ul>
          <p>Augmented matrix [A|b], multiply the second equation through by 10 to clear decimals:</p>
          <div className="worked-example"><pre>{`[ 1   1   1 | 100 ]   (total volume)
[ 1   3   6 |  250]   (acid × 10)
[ 1   0  -1 |   0 ]   (z = x)`}</pre></div>
          <p>R₂ → R₂ − R₁, R₃ → R₃ − R₁:</p>
          <div className="worked-example"><pre>{`[ 1  1   1 | 100 ]
[ 0  2   5 | 150 ]
[ 0 -1  -2 | -100]`}</pre></div>
          <p>R₃ → R₃ + (1/2)R₂:</p>
          <div className="worked-example"><pre>{`[ 1  1   1 | 100 ]
[ 0  2   5 | 150 ]
[ 0  0  1/2| -25 ]`}</pre></div>
          <p>R₃ → 2R₃: z = −50? That gives a negative volume — the system is inconsistent as stated. The constraint z = x combined with the acid requirement cannot be satisfied with exactly 100 mL at 25% using those concentrations. In a real homework problem, the numbers would be chosen to yield a positive solution; the RREF procedure is identical. Enter this augmented matrix into the <Link href="/">RREF calculator</Link> to verify the contradiction row that appears.</p>
        </section>

        <AdSlot id="guide-ls-bottom" size="banner" />
      </article>
      <RelatedCalculators picks={['/', '/matrix/inverse', '/matrix/determinant', '/matrix/gauss-jordan', '/vectors/dot-product']} />
    </main>
    </>
  );
}
