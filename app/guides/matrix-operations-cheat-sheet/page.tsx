import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/calculator/Breadcrumb';
import RelatedCalculators from '@/components/calculator/RelatedCalculators';
import AdSlot from '@/components/calculator/AdSlot';

export const metadata: Metadata = {
  title: 'Matrix Operations Cheat Sheet — Quick Reference for Linear Algebra',
  description: 'Quick reference for all matrix operations: multiplication, inverse, determinant, transpose, RREF, eigenvalues. Formulas, rules, and examples.',
  alternates: { canonical: 'https://rrefmatrixcalc.com/guides/matrix-operations-cheat-sheet' },
};

export default function MatrixCheatSheet() {
  return (
    <>
    <main className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Guides' }, { label: 'Matrix Cheat Sheet' }]} />
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">
        Matrix Operations Cheat Sheet
      </h1>
      <p className="text-slate-500 mb-2">Quick reference for every matrix operation — formulas, rules, and worked examples.</p>
      <p className="text-xs text-slate-400 mb-8">📖 6 min read · Updated May 2026 · Reviewed by our math editorial team</p>
      <AdSlot id="cheat-top" size="leaderboard" />

      <div className="space-y-8 mt-6">

        <section className="card p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Matrix Addition & Subtraction</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-1">Rule</p>
              <p className="text-sm text-slate-600">Add/subtract entry-by-entry. Matrices must be the same size (m×n).</p>
              <p className="text-sm text-slate-600 mt-1">(A + B)[i][j] = A[i][j] + B[i][j]</p>
            </div>
            <div className="worked-example"><pre className="text-xs">{`[1 2] + [5 6] = [6  8]
[3 4]   [7 8]   [10 12]`}</pre></div>
          </div>
        </section>

        <section className="card p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Scalar Multiplication</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-600">(kA)[i][j] = k · A[i][j] — multiply every entry by k.</p>
              <p className="text-sm text-slate-600 mt-1">Properties: (k+l)A = kA + lA, k(A+B) = kA + kB</p>
            </div>
            <div className="worked-example"><pre className="text-xs">{`3 · [1 2] = [3  6]
    [3 4]   [9 12]`}</pre></div>
          </div>
        </section>

        <section className="card p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Matrix Multiplication <Link href="/matrix/multiply" className="text-xs text-primary font-normal ml-2">→ Calculator</Link>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-600">C = AB: C[i][j] = Σₖ A[i][k]·B[k][j] (dot product of row i of A with column j of B)</p>
              <p className="text-sm text-slate-600 mt-1">Requires: cols(A) = rows(B). Result: (rows(A)) × (cols(B)).</p>
              <p className="text-sm text-red-500 mt-1">⚠ Not commutative: AB ≠ BA in general</p>
              <p className="text-sm text-slate-600">Associative: A(BC) = (AB)C | (AB)ᵀ = BᵀAᵀ | (AB)⁻¹ = B⁻¹A⁻¹</p>
            </div>
            <div className="worked-example"><pre className="text-xs">{`[1 2] · [5 6] = [1·5+2·7  1·6+2·8]
[3 4]   [7 8]   [3·5+4·7  3·6+4·8]
              = [19 22]
                [43 50]`}</pre></div>
          </div>
        </section>

        <section className="card p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Transpose <Link href="/matrix/transpose" className="text-xs text-primary font-normal ml-2">→ Calculator</Link>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-600">Aᵀ[i][j] = A[j][i] — swap rows and columns. m×n becomes n×m.</p>
              <p className="text-sm text-slate-600 mt-2">Properties: (Aᵀ)ᵀ = A | (AB)ᵀ = BᵀAᵀ | (A+B)ᵀ = Aᵀ+Bᵀ | det(Aᵀ)=det(A)</p>
              <p className="text-sm text-slate-600 mt-1">Symmetric: A = Aᵀ | Skew-symmetric: Aᵀ = −A | Orthogonal: Aᵀ = A⁻¹</p>
            </div>
            <div className="worked-example"><pre className="text-xs">{`A  = [1 2 3]   Aᵀ = [1 4]
     [4 5 6]        [2 5]
                    [3 6]`}</pre></div>
          </div>
        </section>

        <section className="card p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Determinant <Link href="/matrix/determinant" className="text-xs text-primary font-normal ml-2">→ Calculator</Link>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-600"><strong>2×2:</strong> det([[a,b],[c,d]]) = ad − bc</p>
              <p className="text-sm text-slate-600 mt-1"><strong>3×3:</strong> Cofactor expansion along row 1: a(ei−fh) − b(di−fg) + c(dh−eg)</p>
              <p className="text-sm text-slate-600 mt-1">Row ops: swap rows → ×(−1) | scale row → ×c | add multiple → no change</p>
              <p className="text-sm text-slate-600 mt-1">det(AB) = det(A)·det(B) | det(A⁻¹) = 1/det(A) | det(kA) = kⁿ·det(A)</p>
            </div>
            <div className="worked-example"><pre className="text-xs">{`det([3 -2]) = 3·4−(−2)·1 = 12+2 = 14
    [1  4]

Triangular matrix: det = product of diagonal`}</pre></div>
          </div>
        </section>

        <section className="card p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Matrix Inverse <Link href="/matrix/inverse" className="text-xs text-primary font-normal ml-2">→ Calculator</Link>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-600">A · A⁻¹ = A⁻¹ · A = I. Exists iff det(A) ≠ 0.</p>
              <p className="text-sm text-slate-600 mt-1"><strong>2×2 formula:</strong> A⁻¹ = (1/det) · [[d,−b],[−c,a]]</p>
              <p className="text-sm text-slate-600 mt-1"><strong>General:</strong> Gauss-Jordan on [A|I] → [I|A⁻¹]</p>
              <p className="text-sm text-slate-600 mt-1">Properties: (AB)⁻¹=B⁻¹A⁻¹ | (Aᵀ)⁻¹=(A⁻¹)ᵀ | (A⁻¹)⁻¹=A</p>
            </div>
            <div className="worked-example"><pre className="text-xs">{`A = [4 7]   det = 4·6−7·2 = 10
    [2 6]

A⁻¹ = (1/10)[6 -7] = [3/5  -7/10]
             [-2 4]   [-1/5  2/5 ]`}</pre></div>
          </div>
        </section>

        <section className="card p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            RREF and Row Operations <Link href="/" className="text-xs text-primary font-normal ml-2">→ Calculator</Link>
          </h2>
          <div className="space-y-2 text-sm text-slate-600">
            <p><strong>Elementary row operations:</strong> (1) swap rows R_i ↔ R_j, (2) scale row R_i → c·R_i (c≠0), (3) replace R_i → R_i + c·R_j</p>
            <p><strong>RREF conditions:</strong> (1) zero rows at bottom, (2) leading entries = 1 (pivots), (3) staircase pattern, (4) zeros above AND below each pivot</p>
            <p><strong>Rank:</strong> number of pivots in RREF. Rank(A) = rank(Aᵀ). For m×n: rank ≤ min(m,n).</p>
            <p><strong>Null space / Nullity:</strong> nullity = n − rank (rank-nullity theorem). Free variables correspond to null space dimensions.</p>
          </div>
        </section>

        <section className="card p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Eigenvalues & Eigenvectors</h2>
          <div className="space-y-2 text-sm text-slate-600">
            <p><strong>Definition:</strong> Av = λv, v ≠ 0. λ is the eigenvalue; v is the eigenvector.</p>
            <p><strong>Finding eigenvalues:</strong> Solve characteristic equation det(A − λI) = 0. This is a degree-n polynomial in λ.</p>
            <p><strong>Finding eigenvectors:</strong> For each eigenvalue λ, solve (A − λI)v = 0 (null space of A − λI).</p>
            <p><strong>Trace = sum of eigenvalues. Det = product of eigenvalues.</strong></p>
            <p><strong>Diagonalizable:</strong> A = PDP⁻¹ where D = diagonal matrix of eigenvalues, P = matrix of eigenvectors (columns).</p>
          </div>
        </section>

        <AdSlot id="cheat-bottom" size="banner" />

        <section className="card p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Dot & Cross Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600">
            <div>
              <p className="font-semibold text-slate-700 mb-1">Dot Product <Link href="/vectors/dot-product" className="text-xs text-primary ml-1">→</Link></p>
              <p>u · v = Σᵢ uᵢvᵢ = |u||v|cos(θ)</p>
              <p>u · v = 0 ↔ orthogonal</p>
              <p>u · u = |u|² (squared length)</p>
            </div>
            <div>
              <p className="font-semibold text-slate-700 mb-1">Cross Product (3D only) <Link href="/vectors/cross-product" className="text-xs text-primary ml-1">→</Link></p>
              <p>u × v = det([i j k; u; v])</p>
              <p>|u × v| = |u||v|sin(θ) = area of parallelogram</p>
              <p>u × v = −(v × u) (anti-commutative)</p>
            </div>
          </div>
        </section>

        <section className="card p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Special Matrices</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-slate-600">
            {[
              { name: 'Identity I', def: 'Diagonal entries = 1, all others 0. AI = IA = A.' },
              { name: 'Zero matrix 0', def: 'All entries = 0. A + 0 = A, A·0 = 0.' },
              { name: 'Diagonal', def: 'Non-zero entries only on main diagonal. Easy to invert: d⁻¹ on diagonal.' },
              { name: 'Symmetric', def: 'A = Aᵀ. Real eigenvalues, orthogonal eigenvectors (spectral theorem).' },
              { name: 'Orthogonal Q', def: 'Qᵀ = Q⁻¹, Qᵀ Q = I. Preserves lengths and angles (rotations, reflections).' },
              { name: 'Upper/Lower triangular', def: 'All entries below/above main diagonal = 0. det = product of diagonal.' },
            ].map(({ name, def }) => (
              <div key={name} className="bg-slate-50 rounded-lg p-3">
                <p className="font-semibold text-slate-800 text-xs mb-1">{name}</p>
                <p className="text-xs">{def}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="card p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Non-Commutativity: A Worked Counter-Example</h2>
          <p className="text-sm text-slate-600 mb-3">
            AB ≠ BA in general. Here is a concrete pair of matrices where both products exist but are different:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-1">AB:</p>
              <div className="worked-example"><pre className="text-xs">{`A = [1 2]   B = [0 1]
    [3 4]       [1 0]

AB = [1·0+2·1  1·1+2·0] = [2 1]
     [3·0+4·1  3·1+4·0]   [4 3]`}</pre></div>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-1">BA:</p>
              <div className="worked-example"><pre className="text-xs">{`BA = [0·1+1·3  0·2+1·4] = [3 4]
     [1·1+0·3  1·2+0·4]   [1 2]`}</pre></div>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-3">AB ≠ BA — the products have different entries. This is the general rule: matrix multiplication is non-commutative unless A and B have special structure (e.g., both are diagonal, or one is a scalar multiple of I). When solving Ax = b, never "divide by A" from the right — always left-multiply by A⁻¹.</p>
        </section>

        <section className="card p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Key Properties Summary Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-2 border border-slate-200 font-semibold">Property</th>
                  <th className="text-left p-2 border border-slate-200 font-semibold">Holds?</th>
                  <th className="text-left p-2 border border-slate-200 font-semibold">Exception / Note</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['A + B = B + A', '✓ Always', 'Addition is commutative'],
                  ['AB = BA', '✗ Usually not', 'Only if both diagonal, or special cases'],
                  ['A(BC) = (AB)C', '✓ Always', 'Multiplication is associative'],
                  ['(AB)ᵀ = BᵀAᵀ', '✓ Always', 'Order reverses on transpose'],
                  ['(AB)⁻¹ = B⁻¹A⁻¹', '✓ If both invertible', 'Order reverses on inverse'],
                  ['det(AB) = det(A)det(B)', '✓ Always', 'Multiplicativity of determinant'],
                  ['det(A + B) = det(A) + det(B)', '✗ False', 'Det is not additive'],
                  ['rank(AB) ≤ min(rank A, rank B)', '✓ Always', 'Rank can only decrease under multiplication'],
                  ['(Aᵀ)⁻¹ = (A⁻¹)ᵀ', '✓ If A invertible', 'Inverse and transpose commute'],
                ].map(([prop, holds, note]) => (
                  <tr key={prop} className="border-b border-slate-100">
                    <td className="p-2 border border-slate-200 font-mono">{prop}</td>
                    <td className="p-2 border border-slate-200">{holds}</td>
                    <td className="p-2 border border-slate-200 text-slate-500">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="card p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Connection to RREF <Link href="/" className="text-xs text-primary font-normal ml-2">→ Calculator</Link>
          </h2>
          <div className="space-y-2 text-sm text-slate-600">
            <p>RREF ties together all major matrix operations. Here is how each operation connects to row reduction:</p>
            <ul className="space-y-1 mt-2">
              <li><strong>Solving Ax = b:</strong> Form augmented matrix [A|b] and compute RREF. Read solution from last column.</li>
              <li><strong>Finding A⁻¹:</strong> Augment [A|I] and compute RREF. If left half becomes I, right half is A⁻¹.</li>
              <li><strong>Computing det(A):</strong> Row reduce to upper triangular form, tracking determinant changes: swaps multiply det by −1, scalings multiply det by c.</li>
              <li><strong>Finding rank:</strong> Compute RREF and count pivot columns. This is the most reliable method.</li>
              <li><strong>Finding null space:</strong> Compute RREF of A, identify free variables, express basic variables in terms of free variables.</li>
              <li><strong>Finding column space basis:</strong> Compute RREF, identify pivot columns, return the corresponding original columns of A (not RREF columns).</li>
              <li><strong>Testing linear independence:</strong> Form matrix with vectors as columns, compute RREF. Linearly independent ↔ every column is a pivot column.</li>
            </ul>
            <p className="mt-2">Row reduction is the universal algorithm. Every operation above reduces to RREF with the right setup. See the <Link href="/guides/linear-algebra-basics" className="text-primary hover:underline">linear algebra basics guide</Link> for the conceptual foundations.</p>
          </div>
        </section>

      </div>
    </main>
    <RelatedCalculators picks={['/', '/matrix/inverse', '/matrix/determinant', '/matrix/gauss-jordan', '/matrix/multiply', '/matrix/transpose']} />
    </>
  );
}
