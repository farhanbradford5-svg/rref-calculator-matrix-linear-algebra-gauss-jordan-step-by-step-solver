import type { Metadata } from 'next';
import Link from 'next/link';
import SystemSolver from '@/components/calculator/SystemSolver';
import ToolPage from '@/components/calculator/ToolPage';

export const metadata: Metadata = {
  title: { absolute: 'System of Equations Calculator with Steps (2–5 Unknowns)' },
  description: 'Free system of equations calculator. Type 2 to 5 linear equations, get exact fraction answers, see every elimination step, and find out if there is one, none or infinitely many solutions.',
  alternates: { canonical: 'https://rrefmatrixcalc.com/algebra/system-of-equations/' },
};

const faqs = [
  { q: 'How do I enter a system of equations?', a: 'Choose the number of equations and unknowns, then type the number in front of each variable and the constant after the equals sign. For 2x − y = 5, enter 2 for x, −1 for y and 5 on the right. Leave a box empty when a variable does not appear in that equation.' },
  { q: 'What kinds of systems can this calculator solve?', a: 'Any system of linear equations with 2 to 5 equations and 2 to 5 unknowns, including systems with more equations than unknowns or fewer. It does not solve non-linear systems (those with x², xy, √x and so on).' },
  { q: 'How do I know if a system has no solution?', a: 'After elimination, an inconsistent system produces a row that reads 0 = c with c not zero. The calculator reports "No solution" and shows the reduced matrix with that row so you can see where the contradiction appears.' },
  { q: 'What does "infinitely many solutions" mean?', a: 'The equations are consistent but do not pin down every unknown. At least one variable is free: it can take any value, and the other variables are given by formulas in terms of it. Geometrically, the equations describe lines or planes that overlap along a line or plane.' },
  { q: 'Which method does the calculator use?', a: 'Gauss-Jordan elimination on the augmented matrix, carried out with exact fractions. This gives the same answer as substitution, elimination or Cramer\'s rule, and it works for every system size.' },
  { q: 'Are the answers exact?', a: 'Yes. Answers are given as integers or fractions such as 7/3, never as rounded decimals. Decimal inputs are converted to exact fractions before solving.' },
];

export default function SystemOfEquationsPage() {
  return (
    <ToolPage
      path="/algebra/system-of-equations/"
      name="System of Equations Calculator"
      h1="System of Equations Calculator"
      intro="Solve a system of linear equations with 2 to 5 unknowns. Type the equations, get exact answers, and open the elimination steps when you want them."
      schemaDescription="Solves systems of 2 to 5 linear equations using Gauss-Jordan elimination with exact rational arithmetic, classifying the system as having one, none or infinitely many solutions."
      section="Algebra Calculators"
      badges={['100% Free', 'No Sign-up', '2 to 5 Unknowns', 'Exact Fractions', 'Steps Included']}
      faqs={faqs}
      related={['/matrix/augmented', '/matrix/gaussian-elimination', '/matrix/cramers-rule', '/matrix/gauss-jordan', '/matrix/inverse', '/']}
      calculator={<SystemSolver />}
    >
      <section>
        <h2>How to Solve a System of Equations with This Calculator</h2>
        <ol className="space-y-2">
          <li><strong>Line the equations up.</strong> Rewrite each equation so the variables are on the left in the same order and the constant is on the right. For example, y = 3x − 2 becomes −3x + y = −2.</li>
          <li><strong>Pick the size.</strong> Set the number of equations and the number of unknowns. They do not have to be equal.</li>
          <li><strong>Type the coefficients.</strong> A missing variable has coefficient 0. A variable written alone, like x, has coefficient 1.</li>
          <li><strong>Click Solve System.</strong> The answer appears first. Use <em>Show elimination steps</em> to see how it was found.</li>
        </ol>
      </section>

      <section>
        <h2>Worked Example: Two Equations, Two Unknowns</h2>
        <p>Solve 2x + y = 5 and 4x − 6y = −2.</p>
        <p><strong>By elimination.</strong> Multiply the first equation by 2 to get 4x + 2y = 10. Subtract the second equation: (4x + 2y) − (4x − 6y) = 10 − (−2), so 8y = 12 and y = 3/2.</p>
        <p><strong>Back-substitute.</strong> 2x + 3/2 = 5, so 2x = 7/2 and x = 7/4.</p>
        <p><strong>Check.</strong> 4(7/4) − 6(3/2) = 7 − 9 = −2. ✓</p>
        <p>The calculator returns x = 7/4, y = 3/2 for this system. Click the <em>2 equations</em> example button above to load it.</p>
      </section>

      <section>
        <h2>One Solution, No Solution, or Infinitely Many</h2>
        <p>Every linear system falls into exactly one of three cases.</p>
        <p><strong>One solution.</strong> The equations meet at a single point. In matrix terms, every unknown has a pivot after row reduction.</p>
        <p><strong>No solution.</strong> The equations contradict each other, such as x + y = 2 and x + y = 5 (parallel lines). Row reduction produces 0 = non-zero.</p>
        <p><strong>Infinitely many solutions.</strong> At least one equation repeats information already given by the others, such as x + y = 2 and 2x + 2y = 4 (the same line). Some unknown is free.</p>
        <p>
          A system can never have exactly two or three solutions. The <Link href="/guides/solving-linear-systems" className="text-primary hover:underline">solving linear systems guide</Link> explains why, with a worked example of each case.
        </p>
      </section>

      <section>
        <h2>Methods for Solving Systems of Equations</h2>
        <p><strong>Substitution.</strong> Solve one equation for one variable and substitute into the others. Good for two equations when a coefficient is 1.</p>
        <p><strong>Elimination (addition).</strong> Add multiples of equations to cancel a variable. This is what most algebra courses teach for 2×2 and 3×3 systems.</p>
        <p><strong>Gaussian and Gauss-Jordan elimination.</strong> The same elimination idea, organised as row operations on an augmented matrix. It scales to any size, which is why this calculator uses it. See the <Link href="/matrix/gaussian-elimination" className="text-primary hover:underline">Gaussian elimination calculator</Link> or the <Link href="/matrix/augmented" className="text-primary hover:underline">augmented matrix calculator</Link> if you already have the matrix.</p>
        <p><strong>Cramer&apos;s rule.</strong> A determinant formula for each unknown. It needs as many equations as unknowns and a non-zero determinant. Try the <Link href="/matrix/cramers-rule" className="text-primary hover:underline">Cramer&apos;s rule calculator</Link> to see it worked out.</p>
        <p><strong>Matrix inverse.</strong> Write the system as Ax = b and compute x = A⁻¹b with the <Link href="/matrix/inverse" className="text-primary hover:underline">inverse matrix calculator</Link>. This also needs a square, invertible coefficient matrix.</p>
      </section>

      <section>
        <h2>Common Mistakes When Entering a System</h2>
        <ul>
          <li><strong>Variables out of order.</strong> If one equation is written y + 2x = 4, enter 2 under x and 1 under y, not the other way round.</li>
          <li><strong>Dropped minus signs.</strong> In x − y = 3 the coefficient of y is −1.</li>
          <li><strong>Terms on the wrong side.</strong> Move every variable to the left and every constant to the right before entering. 3x = 2y + 1 becomes 3x − 2y = 1.</li>
          <li><strong>Blank versus zero.</strong> A blank box is treated as 0, so a variable missing from an equation can be left empty.</li>
        </ul>
      </section>
    </ToolPage>
  );
}
