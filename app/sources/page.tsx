import type { Metadata } from 'next';
import Breadcrumb from '@/components/calculator/Breadcrumb';

export const metadata: Metadata = {
  title: 'Sources & References — RREF Calculator | Strang, Lay, MIT 18.06',
  description: 'Academic sources for RREF Calculator content: Gilbert Strang Introduction to Linear Algebra, Lay Linear Algebra and Its Applications, MIT OpenCourseWare 18.06, and KaTeX.',
  alternates: { canonical: 'https://rrefmatrixcalc.com/sources' },
};

export default function SourcesPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Sources' }]} />
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Sources & References</h1>
      <p className="text-slate-500 mb-8">The academic and pedagogical sources that inform our content.</p>

      <article className="prose-content space-y-8">
        <section>
          <h2>Primary Textbooks</h2>
          <div className="space-y-4">
            <div className="card p-5">
              <h3 className="font-bold text-slate-900">Introduction to Linear Algebra</h3>
              <p className="text-sm text-slate-600">Strang, Gilbert. 5th edition. Wellesley-Cambridge Press, 2016. ISBN: 978-0-9802327-7-6.</p>
              <p className="text-sm text-slate-600 mt-1">The standard reference for MIT's 18.06 course. Our notation for RREF, pivot, and elimination steps follows Strang's conventions. Theorems are cited by chapter and section where referenced.</p>
            </div>
            <div className="card p-5">
              <h3 className="font-bold text-slate-900">Linear Algebra and Its Applications</h3>
              <p className="text-sm text-slate-600">Lay, David C., Steven R. Lay, and Judi J. McDonald. 5th edition. Pearson, 2016. ISBN: 978-0-321-98238-4.</p>
              <p className="text-sm text-slate-600 mt-1">Our secondary reference, particularly for application examples in the guides. Lay uses the same RREF conventions as Strang and is widely used in US universities.</p>
            </div>
          </div>
        </section>

        <section>
          <h2>Online Courses</h2>
          <div className="card p-5">
            <h3 className="font-bold text-slate-900">MIT OpenCourseWare — 18.06 Linear Algebra</h3>
            <p className="text-sm text-slate-600">Gilbert Strang, Massachusetts Institute of Technology. Available at ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/.</p>
            <p className="text-sm text-slate-600 mt-1">The lecture videos and problem sets from MIT's flagship linear algebra course are freely available and serve as the pedagogical backbone for many of our explanations.</p>
          </div>
        </section>

        <section>
          <h2>Schema and Standards</h2>
          <div className="space-y-3">
            <div className="card p-4">
              <h3 className="font-semibold text-slate-800">Schema.org MathSolver</h3>
              <p className="text-sm text-slate-600">schema.org/MathSolver — Used for structured data markup on all calculator pages to signal math-solving functionality to search engines.</p>
            </div>
            <div className="card p-4">
              <h3 className="font-semibold text-slate-800">KaTeX</h3>
              <p className="text-sm text-slate-600">Khan Academy's fast math rendering library. Used for all formula and matrix rendering on this site. katex.org.</p>
            </div>
          </div>
        </section>

        <section>
          <h2>Mathematical Background</h2>
          <p>The following facts are standard results in linear algebra. We reference them without proof but can cite the specific theorem in Strang or Lay:</p>
          <ul>
            <li><strong>RREF Uniqueness Theorem:</strong> Every matrix has a unique RREF. (Strang, §1.5; Lay, §1.2 Theorem 1)</li>
            <li><strong>Rank-Nullity Theorem:</strong> rank(A) + nullity(A) = n. (Strang, §3.3; Lay, §4.6 Theorem 14)</li>
            <li><strong>Invertible Matrix Theorem:</strong> A square matrix is invertible iff det ≠ 0 iff rank = n iff RREF = I. (Lay, §2.3 Theorem 8)</li>
            <li><strong>Cofactor Expansion:</strong> det(A) = Σⱼ (−1)^(i+j) aᵢⱼ det(Mᵢⱼ). (Strang, §5.2; Lay, §3.1)</li>
            <li><strong>Cross Product as Determinant:</strong> u × v = det([i,j,k; u; v]). (Standard multivariable calculus result.)</li>
          </ul>
        </section>
      </article>
    </main>
  );
}
