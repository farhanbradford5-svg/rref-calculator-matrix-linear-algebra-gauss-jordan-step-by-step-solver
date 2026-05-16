import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/calculator/Breadcrumb';
import AdSlot from '@/components/calculator/AdSlot';

export const metadata: Metadata = {
  title: 'RREF Calculator FAQ — 40 Questions Answered | Linear Algebra Help',
  description:
    'Answers to 40 questions about RREF, Gauss-Jordan elimination, augmented matrices, rank, null space, determinants, matrix inverse, and how this exact-fraction calculator works.',
  alternates: { canonical: 'https://rrefmatrixcalc.com/faq' },
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
        text: 'RREF is a standardized form of a matrix obtained by Gauss-Jordan elimination. Every leading entry is 1, every leading 1 is the only non-zero entry in its column, all-zero rows are at the bottom, and each pivot sits to the right of the pivot in the row above. The RREF of a matrix is unique.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between REF and RREF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Row Echelon Form (REF) requires zeros below each pivot and pivots moving right, but pivot values can be anything non-zero. Reduced Row Echelon Form (RREF) additionally requires that each pivot is exactly 1 and is the only non-zero entry in its column — zeros both above and below. RREF is unique; REF is not.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Gauss-Jordan elimination?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Gauss-Jordan elimination is the algorithm that reduces a matrix to RREF. It uses three elementary row operations: scaling a row (multiply every entry by a non-zero constant), swapping two rows, and row replacement (add a multiple of one row to another). The standard approach sweeps down to create REF, then sweeps back up to eliminate entries above each pivot, producing RREF.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I solve a system of linear equations using RREF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Write the system as an augmented matrix [A | b] where A holds the coefficients and b holds the right-hand side constants. Apply Gauss-Jordan elimination to reach RREF. Each pivot column corresponds to a basic variable; non-pivot columns correspond to free variables. Read solutions directly from the RREF.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does it mean when a system has infinitely many solutions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Infinitely many solutions occur when the RREF of [A | b] has at least one free variable (a column without a pivot) and no inconsistency (no row of the form [0 0 … 0 | c] with c ≠ 0). Each free variable can take any value, generating a family of solutions parameterized by those free variables.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does rank mean in linear algebra?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The rank of a matrix is the number of pivot positions in its RREF (equivalently, the number of linearly independent rows or columns). A matrix A of size m×n has rank at most min(m, n). The rank determines the dimension of the column space and row space.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does this calculator use exact fractions instead of decimals?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Floating-point arithmetic introduces rounding errors that accumulate through row reduction. A calculator using JavaScript\'s built-in numbers might report 0.9999999 instead of 1, or 1.4e−16 instead of 0. This calculator stores every number as a BigInt fraction (numerator/denominator) in lowest terms, so all arithmetic is perfectly exact. The answer 1/3 stays 1/3, not 0.3333.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I enter a fraction into the matrix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type the fraction directly, e.g. "3/4" or "-1/2". The calculator parses it as an exact rational number. You can also enter integers and decimals; decimals are converted to their nearest exact fraction.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the determinant of a matrix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The determinant is a scalar value computed from a square matrix that encodes geometric and algebraic properties. Geometrically, |det(A)| is the volume scaling factor of the linear transformation. det(A) = 0 means the matrix is singular (non-invertible). For 2×2 matrices: det = ad − bc. For larger matrices, use cofactor expansion or row reduction.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does a determinant of zero mean?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A determinant of zero means the matrix is singular: it has no inverse, its rows (and columns) are linearly dependent, and the linear system Ax = b is either inconsistent or has infinitely many solutions.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find the inverse of a matrix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Form the augmented matrix [A | I] where I is the identity matrix of the same size. Apply Gauss-Jordan elimination. If A reduces to I on the left, the right half is A⁻¹. If a zero row appears on the left before the process completes, A is singular and has no inverse.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is matrix multiplication commutative?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. In general, AB ≠ BA. Matrix multiplication is associative (A(BC) = (AB)C) and distributive over addition, but it is not commutative. The product AB is only defined when the number of columns of A equals the number of rows of B.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the transpose of a matrix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The transpose of a matrix A, written Aᵀ, is formed by flipping rows and columns: the (i, j) entry of A becomes the (j, i) entry of Aᵀ. An m×n matrix becomes n×m after transposition. Key property: (AB)ᵀ = BᵀAᵀ.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a symmetric matrix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A matrix A is symmetric when A = Aᵀ, meaning the (i, j) entry equals the (j, i) entry for all i, j. Symmetric matrices must be square. They arise naturally in covariance matrices, graph adjacency matrices, and many physics applications. All eigenvalues of a real symmetric matrix are real.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a dot product?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The dot product (or inner product) of two vectors u and v of the same dimension is the sum of products of corresponding components: u·v = u₁v₁ + u₂v₂ + … + uₙvₙ. The result is a scalar. Geometrically, u·v = |u||v|cos(θ) where θ is the angle between them. When u·v = 0, the vectors are perpendicular (orthogonal).',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find the angle between two vectors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the dot product formula: cos(θ) = (u·v) / (|u| · |v|). Compute the dot product, divide by the product of the two magnitudes, then take the arccosine. The angle θ is between 0 and 180 degrees.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a cross product?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The cross product u × v is defined for two 3-dimensional vectors and produces a third 3D vector perpendicular to both. Its magnitude is |u||v|sin(θ), equal to the area of the parallelogram spanned by u and v. The direction follows the right-hand rule. The cross product is anti-commutative: u × v = −(v × u).',
      },
    },
    {
      '@type': 'Question',
      name: 'When is the cross product equal to zero?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The cross product u × v = 0 when the vectors are parallel (or anti-parallel), including when one or both vectors is the zero vector. Parallel vectors span no parallelogram, so the area (and magnitude of the cross product) is zero.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does "simplify a radical" mean?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Simplifying a radical (square root) means writing √n in the form a√b where b has no perfect square factor other than 1. For example, √72 = √(36 × 2) = 6√2. The calculator does this via prime factorization: factor n completely, group pairs of identical primes, pull each pair out as a single factor.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a linear combination?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A linear combination of vectors v₁, v₂, …, vₖ is any sum c₁v₁ + c₂v₂ + … + cₖvₖ where the cᵢ are scalar coefficients. The set of all linear combinations of a set of vectors is their span.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is linear independence?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vectors v₁, …, vₖ are linearly independent when the only way to write the zero vector as c₁v₁ + … + cₖvₖ is to set all cᵢ = 0. If any vector in the set can be written as a combination of the others, the set is linearly dependent. To test: form a matrix with the vectors as columns and find its RREF.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a null space?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The null space (or kernel) of a matrix A is the set of all vectors x such that Ax = 0. To find it: write the augmented matrix [A | 0], reduce to RREF, and express basic variables in terms of free variables. The null space is the span of those free-variable solutions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is eigenvalue decomposition?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An eigenvalue λ and eigenvector v of a square matrix A satisfy Av = λv: the matrix scales the eigenvector by λ without changing its direction. Eigenvalues are found by solving det(A − λI) = 0 (the characteristic polynomial). Eigendecomposition has applications in principal component analysis, differential equations, and Google\'s PageRank algorithm.',
      },
    },
    {
      '@type': 'Question',
      name: 'How accurate are the calculator results?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For rational inputs (integers and fractions), results are mathematically exact — there is no floating-point error. The calculator uses BigInt arithmetic throughout, so 1/3 multiplied by 3 gives exactly 1, not 0.9999999. For decimal inputs, the decimal is converted to the nearest exact fraction before computation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the calculator store my data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. All calculations run in your browser (client-side JavaScript). Your matrix entries never leave your device. Calculation history is stored in your own browser\'s localStorage only — we cannot access it.',
      },
    },
    {
      '@type': 'Question',
      name: 'What matrix sizes are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The RREF and Gauss-Jordan calculators support matrices from 2×2 up to 6×6. The determinant calculator supports up to 5×5. The matrix inverse calculator supports up to 4×4. Matrix multiply supports up to 4×4 × 4×4.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use this calculator on my phone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The calculator is fully mobile-responsive. The matrix grid, step display, and all controls work on touchscreens. You can also add the site to your home screen for quick access.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a keyboard shortcut to calculate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Press Ctrl+Enter (or ⌘+Enter on Mac) anywhere on the page to trigger the calculation. You can also press Enter in the last cell of the matrix.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I share a problem with someone?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the "Share" button below the calculator. It generates a URL that encodes the matrix entries, which you can copy and send. Anyone who opens the link will see the same matrix pre-loaded and can run the calculation themselves.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this calculator free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, completely free. No account, no sign-up, no paywall. All calculators and guides are free to use.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I use the TI-84 rref( function?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On a TI-84, press 2nd → MATRIX (or MATRX), enter your matrix under EDIT, then go to MATH and select rref(. Enter the matrix name inside rref( and press ENTER. The TI-84 shows the result as decimals, not fractions, so rounding errors can appear. For exact fraction results, use this online calculator instead.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does RREF stand for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RREF stands for Reduced Row Echelon Form. "Row echelon form" means the matrix has a staircase pattern of leading entries. "Reduced" means each leading entry is exactly 1 (a pivot) and is the only non-zero entry in its column — zeros both above and below each pivot.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find RREF of a 3×3 matrix step by step?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Step 1: Find the leftmost non-zero column. If the top entry is zero, swap rows to get a non-zero entry there. Step 2: Scale the top row so the pivot equals 1. Step 3: Eliminate all other entries in that column by adding multiples of the pivot row. Step 4: Move to the next row and next column to the right, and repeat. Step 5: After reaching REF (lower-left zeros), make a backward pass: for each pivot from bottom to top, eliminate entries above it. The result is RREF.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is an augmented matrix and how do I use it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An augmented matrix [A|b] is a matrix formed by appending the right-hand side column b of a linear system Ax = b to the coefficient matrix A. For the system 2x + y = 5, x − y = 1, the augmented matrix is [[2, 1, |, 5], [1, −1, |, 1]]. Apply row operations to the entire augmented matrix (including the b column). After reaching RREF, read the solution from the last column of each pivot row.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is RREF unique? Can two different sequences of row operations give different RREFs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No — RREF is unique. Every matrix has exactly one RREF, regardless of which sequence of elementary row operations is used to compute it. This is the RREF Uniqueness Theorem. Two different students can use different operation sequences and still arrive at the same RREF. REF (Row Echelon Form), by contrast, is not unique.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are real-life uses of RREF and linear systems?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Linear systems and RREF appear in: engineering (circuit analysis via Kirchhoff\'s laws reduces to a linear system), economics (input-output models and price equilibria), computer graphics (transformations, camera projections), data science (least-squares regression uses the normal equation XᵀXβ = Xᵀy, solved via row reduction), chemistry (balancing chemical equations), and network flow problems (traffic, supply chains).',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I find the rank of a matrix from its RREF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Count the number of pivot columns in the RREF. Each pivot column contains exactly one leading 1, with zeros everywhere else in that column. The number of pivots equals the rank. For example, if a 4×5 matrix has RREF with pivots in columns 1, 2, and 4, its rank is 3. The nullity is 5 − 3 = 2.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can RREF be applied to wide or tall (non-square) matrices?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. RREF is defined for any m×n matrix, regardless of whether m < n (more columns than rows, "wide"), m = n (square), or m > n (more rows than columns, "tall"). Wide matrices always have at least n − m free variables if m < n. Tall matrices with more equations than unknowns are overdetermined and may have no solution. The RREF algorithm works identically in all cases.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does a row of all zeros in RREF mean?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In the coefficient matrix alone, a zero row means the corresponding equation was a linear combination of others — the equations are redundant (linearly dependent). The system has fewer independent constraints than equations. In an augmented matrix [A|b]: a zero row with a 0 on the right [0 0 ... 0 | 0] is harmless — infinitely many solutions possible. A zero row with a non-zero right side [0 0 ... 0 | c] with c ≠ 0 means the system is inconsistent (no solution).',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to compute RREF for a 4×4 matrix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'By hand: a 4×4 matrix typically takes 15–25 row operations and 5–15 minutes for a careful student. The main time cost is fraction arithmetic. The online calculator completes any 4×4 matrix in under 10 milliseconds — instantly. Entering the matrix by hand (clicking cells and typing) takes 30–60 seconds. The calculator is useful primarily for verification and for seeing step-by-step operations clearly labeled.',
      },
    },
  ],
};

const SECTIONS = [
  {
    title: 'RREF & Gauss-Jordan Elimination',
    ids: [0, 1, 2, 3, 4, 5, 6, 7],
    href: '/',
  },
  {
    title: 'Matrix Operations',
    ids: [8, 9, 10, 11, 12, 13],
    href: '/matrix/determinant',
  },
  {
    title: 'Vectors',
    ids: [14, 15, 16, 17],
    href: '/vectors/dot-product',
  },
  {
    title: 'Algebra & Radicals',
    ids: [18, 19, 20, 21, 22],
    href: '/algebra/simplify-radicals',
  },
  {
    title: 'Using This Calculator',
    ids: [23, 24, 25, 26, 27, 28, 29],
    href: '/',
  },
  {
    title: 'RREF In Depth',
    ids: [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
    href: '/guides/rref-step-by-step-tutorial',
  },
];

const questions = faqSchema.mainEntity;

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-500 mb-2">
          The 30 most common questions about RREF, matrix operations, vectors, and how this
          calculator works.
        </p>
        <p className="text-xs text-slate-400 mb-8">Updated May 2026 · Reviewed by our math editorial team</p>

        <AdSlot id="faq-top" size="leaderboard" />

        <div className="mt-6 space-y-10">
          {SECTIONS.map(section => (
            <section key={section.title}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900">{section.title}</h2>
                <Link
                  href={section.href}
                  className="text-xs text-primary hover:text-primary-dark font-medium"
                >
                  Open calculator →
                </Link>
              </div>
              <div className="space-y-3">
                {section.ids.map(idx => {
                  const q = questions[idx];
                  return (
                    <details
                      key={idx}
                      className="group card p-0 overflow-hidden"
                    >
                      <summary className="flex items-start justify-between gap-3 px-5 py-4 cursor-pointer hover:bg-slate-50 list-none">
                        <span className="font-semibold text-slate-800 text-sm leading-snug">
                          {q.name}
                        </span>
                        <span className="text-slate-400 shrink-0 mt-0.5 group-open:rotate-180 transition-transform">
                          ▾
                        </span>
                      </summary>
                      <div className="px-5 pb-4 border-t border-slate-100">
                        <p className="text-sm text-slate-600 leading-relaxed mt-3">
                          {q.acceptedAnswer.text}
                        </p>
                      </div>
                    </details>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <AdSlot id="faq-bottom" size="banner" />

        <div className="mt-10 p-5 card bg-primary-50 border-primary-100">
          <h2 className="font-bold text-slate-900 mb-2">Still have a question?</h2>
          <p className="text-sm text-slate-600 mb-3">
            Can&apos;t find the answer you&apos;re looking for? Our guides cover these topics in depth,
            or you can reach out via the contact page.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link href="/guides/linear-algebra-basics" className="badge text-xs">Linear Algebra Basics Guide</Link>
            <Link href="/guides/rref-step-by-step-tutorial" className="badge text-xs">RREF Tutorial</Link>
            <Link href="/contact" className="badge text-xs">Contact Us</Link>
          </div>
        </div>
      </div>
    </>
  );
}
