import Link from 'next/link';

const CALCULATORS = [
  { label: 'RREF Calculator', href: '/' },
  { label: 'Matrix Inverse', href: '/matrix/inverse' },
  { label: 'Determinant', href: '/matrix/determinant' },
  { label: 'Gauss-Jordan', href: '/matrix/gauss-jordan' },
  { label: 'Matrix Multiply', href: '/matrix/multiply' },
  { label: 'Transpose', href: '/matrix/transpose' },
  { label: 'Cross Product', href: '/vectors/cross-product' },
  { label: 'Dot Product', href: '/vectors/dot-product' },
  { label: 'Simplify Radicals', href: '/algebra/simplify-radicals' },
];

const GUIDES = [
  { label: 'Linear Algebra Basics', href: '/guides/linear-algebra-basics' },
  { label: 'Solving Linear Systems', href: '/guides/solving-linear-systems' },
  { label: 'Matrix Cheat Sheet', href: '/guides/matrix-operations-cheat-sheet' },
  { label: 'RREF Tutorial', href: '/guides/rref-step-by-step-tutorial' },
  { label: 'Gauss-Jordan vs Gaussian', href: '/guides/gauss-jordan-vs-gaussian-elimination' },
  { label: 'Linear Algebra for Students', href: '/guides/linear-algebra-for-students' },
];

const COMPANY = [
  { label: 'About', href: '/about' },
  { label: 'Editorial Policy', href: '/editorial-policy' },
  { label: 'Methodology', href: '/methodology' },
  { label: 'Sources', href: '/sources' },
  { label: 'Contact', href: '/contact' },
  { label: 'Changelog', href: '/changelog' },
];

const LEGAL = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'DMCA', href: '/dmca' },
  { label: 'Accessibility', href: '/accessibility' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-xs font-mono">M</span>
              </div>
              <span className="font-bold text-white text-sm">RREF Calculator</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The most accurate free matrix calculator hub. Exact rational arithmetic, step-by-step solutions, no sign-up.
            </p>
            <p className="text-xs text-slate-500 mt-3">© {new Date().getFullYear()} RREF Calculator</p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-wide mb-3">Calculators</h3>
            <ul className="space-y-1.5">
              {CALCULATORS.map(c => (
                <li key={c.href}>
                  <Link href={c.href} className="text-xs text-slate-400 hover:text-white transition-colors">{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-wide mb-3">Guides</h3>
            <ul className="space-y-1.5">
              {GUIDES.map(g => (
                <li key={g.href}>
                  <Link href={g.href} className="text-xs text-slate-400 hover:text-white transition-colors">{g.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-wide mb-3">Company</h3>
            <ul className="space-y-1.5">
              {COMPANY.map(c => (
                <li key={c.href}>
                  <Link href={c.href} className="text-xs text-slate-400 hover:text-white transition-colors">{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-xs uppercase tracking-wide mb-3">Legal</h3>
            <ul className="space-y-1.5">
              {LEGAL.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs text-slate-400 hover:text-white transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            Built for students worldwide. 100% free, no sign-up required. BigInt exact arithmetic — no rounding errors.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <Link href="/terms-of-service" className="hover:text-slate-300 transition-colors">Terms</Link>
            <Link href="/accessibility" className="hover:text-slate-300 transition-colors">Accessibility</Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
