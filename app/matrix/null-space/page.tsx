import type { Metadata } from 'next';
import Link from 'next/link';
import NullSpaceCalculator from '@/components/calculator/NullSpaceCalculator';
import ToolPage from '@/components/calculator/ToolPage';

export const metadata: Metadata = {
  title: { absolute: 'Null Space Calculator — Basis, Rank and Nullity with Steps' },
  description: 'Free null space calculator. Find a basis for the null space (kernel) of any matrix up to 6×6, plus rank, nullity, and bases for the column space and row space. Exact fractions.',
  alternates: { canonical: 'https://rrefmatrixcalc.com/matrix/null-space/' },
};

const faqs = [
  { q: 'What is the null space of a matrix?', a: 'The null space (or kernel) of a matrix A is the set of all vectors x that satisfy Ax = 0. It is a subspace: it always contains the zero vector, and sums and multiples of solutions are again solutions.' },
  { q: 'How do you find a basis for the null space?', a: 'Row reduce A to reduced row echelon form. Identify the free variables (columns without a pivot). For each free variable, set it to 1 and the other free variables to 0, then read the pivot variables from the RREF. Each choice gives one basis vector.' },
  { q: 'What is nullity?', a: 'Nullity is the dimension of the null space, which equals the number of free variables. By the rank–nullity theorem, rank + nullity = number of columns.' },
  { q: 'What does a trivial null space mean?', a: 'A trivial null space contains only the zero vector. This happens when every column has a pivot, so the columns of A are linearly independent. For a square matrix it means A is invertible.' },
  { q: 'How do I find a basis for the column space?', a: 'Take the columns of the original matrix that correspond to pivot columns of the RREF. Use the original columns, not the columns of the reduced matrix, because row operations change the column space.' },
  { q: 'How do I find the rank of a matrix?', a: 'The rank is the number of pivots in the row echelon form. This calculator reports it together with the nullity and checks that the two add up to the number of columns.' },
  { q: 'Is the basis for the null space unique?', a: 'No. Any set of independent vectors that spans the null space is a basis. The basis produced from the RREF is the standard one taught in most courses, so it usually matches textbook answers, but a scaled or recombined set is equally valid.' },
];

export default function NullSpacePage() {
  return (
    <ToolPage
      path="/matrix/null-space/"
      name="Null Space Calculator"
      h1="Null Space Calculator"
      intro="Find a basis for the null space of a matrix, with rank and nullity. Bases for the column space and row space are included."
      schemaDescription="Finds a basis for the null space (kernel) of a matrix by row reduction, and reports rank, nullity, and bases for the column space and row space using exact rational arithmetic."
      section="Matrix Calculators"
      badges={['100% Free', 'No Sign-up', 'Basis Vectors', 'Rank & Nullity', 'Exact Fractions']}
      faqs={faqs}
      related={['/', '/matrix/row-echelon-form', '/matrix/eigenvalues', '/matrix/determinant', '/matrix/gauss-jordan', '/matrix/augmented']}
      calculator={<NullSpaceCalculator />}
    >
      <section>
        <h2>How to Use the Null Space Calculator</h2>
        <ol className="space-y-2">
          <li><strong>Enter the matrix A.</strong> Do not add a column of zeros: the calculator already solves the homogeneous system Ax = 0.</li>
          <li><strong>Click Find Null Space.</strong> The result shows the rank, the nullity and the RREF with its pivot and free columns.</li>
          <li><strong>Read the basis.</strong> Each basis vector of the null space is listed. If the null space is trivial, the calculator says so.</li>
          <li><strong>Open the steps</strong> if you need the row operations for your written solution.</li>
        </ol>
      </section>

      <section>
        <h2>How the Null Space Is Found</h2>
        <ol className="space-y-2">
          <li><strong>Row reduce A to RREF.</strong> Row operations do not change the solutions of Ax = 0.</li>
          <li><strong>Mark the free variables.</strong> Every column without a pivot gives a free variable.</li>
          <li><strong>Write the pivot variables in terms of the free ones.</strong> Each non-zero row of the RREF is one such equation.</li>
          <li><strong>Build one vector per free variable.</strong> Set that free variable to 1, the other free variables to 0, and fill in the pivot variables.</li>
        </ol>
        <p>
          The vectors from step 4 are linearly independent and span every solution, so they form a basis. The <Link href="/guides/null-space-matrix" className="text-primary hover:underline">null space guide</Link> walks through the reasoning in more detail.
        </p>
      </section>

      <section>
        <h2>Worked Example</h2>
        <p>Find the null space of</p>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
          <p>[ 1  2  3 ]</p>
          <p>[ 2  4  6 ]</p>
          <p>[ 1  1  1 ]</p>
        </div>
        <p><strong>RREF.</strong> Row reduction gives</p>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-3 font-mono text-sm overflow-x-auto space-y-1">
          <p>[ 1  0  −1 ]</p>
          <p>[ 0  1   2 ]</p>
          <p>[ 0  0   0 ]</p>
        </div>
        <p><strong>Free variable.</strong> Columns 1 and 2 have pivots, so x₃ is free. The rows say x₁ − x₃ = 0 and x₂ + 2x₃ = 0, so x₁ = x₃ and x₂ = −2x₃.</p>
        <p><strong>Basis.</strong> Setting x₃ = 1 gives the single basis vector (1, −2, 1). The null space is the line through the origin in that direction.</p>
        <p><strong>Check.</strong> Row 1 of A times the vector: 1 − 4 + 3 = 0. Row 3: 1 − 2 + 1 = 0. ✓ Rank 2 + nullity 1 = 3 columns.</p>
      </section>

      <section>
        <h2>Rank, Nullity and the Other Subspaces</h2>
        <p><strong>Rank–nullity theorem.</strong> For an m×n matrix, rank(A) + nullity(A) = n. Every column is either a pivot column (counted by the rank) or a free column (counted by the nullity).</p>
        <p><strong>Column space.</strong> The pivot columns of the original matrix form a basis. Its dimension is the rank.</p>
        <p><strong>Row space.</strong> The non-zero rows of the RREF form a basis. Its dimension is also the rank.</p>
        <p><strong>Orthogonality.</strong> Every vector in the null space is perpendicular to every row of A. You can confirm this for any pair with the <Link href="/vectors/dot-product" className="text-primary hover:underline">dot product calculator</Link>.</p>
      </section>

      <section>
        <h2>What the Null Space Tells You</h2>
        <p><strong>Linear independence.</strong> The columns of A are independent exactly when the null space is trivial. A non-zero null space vector gives the coefficients of a dependence relation among the columns.</p>
        <p><strong>Uniqueness of solutions.</strong> If Ax = b has a solution, every other solution is that one plus a null space vector. A trivial null space means the solution is unique.</p>
        <p><strong>Invertibility.</strong> A square matrix is invertible exactly when its nullity is 0, which is the same as having a non-zero <Link href="/matrix/determinant" className="text-primary hover:underline">determinant</Link>.</p>
        <p><strong>Eigenvectors.</strong> The eigenvectors of A for an eigenvalue λ are the non-zero vectors in the null space of A − λI. The <Link href="/matrix/eigenvalues" className="text-primary hover:underline">eigenvalue calculator</Link> does this for you.</p>
      </section>
    </ToolPage>
  );
}
