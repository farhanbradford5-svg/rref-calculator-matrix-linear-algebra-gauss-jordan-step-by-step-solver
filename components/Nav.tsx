'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const CALCULATORS = [
  { label: 'RREF / Gauss-Jordan', href: '/' },
  { label: 'Matrix Inverse', href: '/matrix/inverse' },
  { label: 'Determinant', href: '/matrix/determinant' },
  { label: 'Matrix Multiply', href: '/matrix/multiply' },
  { label: 'Transpose', href: '/matrix/transpose' },
  { label: 'Cross Product', href: '/vectors/cross-product' },
  { label: 'Dot Product', href: '/vectors/dot-product' },
  { label: 'Simplify Radicals', href: '/algebra/simplify-radicals' },
];

const GUIDES = [
  { label: 'Linear Algebra Basics', href: '/guides/linear-algebra-basics' },
  { label: 'Solving Linear Systems', href: '/guides/solving-linear-systems' },
  { label: 'Matrix Operations Cheat Sheet', href: '/guides/matrix-operations-cheat-sheet' },
  { label: 'RREF Step-by-Step Tutorial', href: '/guides/rref-step-by-step-tutorial' },
  { label: 'Gauss-Jordan vs. Gaussian Elimination', href: '/guides/gauss-jordan-vs-gaussian-elimination' },
  { label: 'Linear Algebra for Students', href: '/guides/linear-algebra-for-students' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium focus:shadow-lg"
      >
        Skip to main content
      </a>
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-slate-900 hover:text-primary transition-colors shrink-0">
            <MatrixIcon />
            <span className="text-base">RREF Calculator</span>
          </Link>

          <div className="hidden md:flex items-center gap-0.5">
            {/* Calculators dropdown */}
            <div className="relative" onMouseEnter={() => setCalcOpen(true)} onMouseLeave={() => setCalcOpen(false)}>
              <button className="nav-link px-3 py-1.5 rounded-md hover:bg-slate-50 flex items-center gap-1">
                Calculators <ChevronDown size={14} />
              </button>
              {calcOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50">
                  {CALCULATORS.map(c => (
                    <Link key={c.href} href={c.href}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-primary-50 hover:text-primary transition-colors">
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Guides dropdown */}
            <div className="relative" onMouseEnter={() => setGuideOpen(true)} onMouseLeave={() => setGuideOpen(false)}>
              <button className="nav-link px-3 py-1.5 rounded-md hover:bg-slate-50 flex items-center gap-1">
                Guides <ChevronDown size={14} />
              </button>
              {guideOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50">
                  {GUIDES.map(g => (
                    <Link key={g.href} href={g.href}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-primary-50 hover:text-primary transition-colors">
                      {g.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/faq" className="nav-link px-3 py-1.5 rounded-md hover:bg-slate-50">FAQ</Link>
            <Link href="/about" className="nav-link px-3 py-1.5 rounded-md hover:bg-slate-50">About</Link>
          </div>

          <button className="md:hidden p-2 rounded-md text-slate-600 hover:bg-slate-100"
            onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pb-4 pt-2 space-y-1 max-h-[80vh] overflow-y-auto">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide pt-2 pb-1">Calculators</p>
          {CALCULATORS.map(c => (
            <Link key={c.href} href={c.href} className="block py-1.5 text-sm text-slate-700 hover:text-primary" onClick={() => setOpen(false)}>
              {c.label}
            </Link>
          ))}
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide pt-3 pb-1">Guides</p>
          {GUIDES.map(g => (
            <Link key={g.href} href={g.href} className="block py-1.5 text-sm text-slate-700 hover:text-primary" onClick={() => setOpen(false)}>
              {g.label}
            </Link>
          ))}
          <Link href="/faq" className="block py-1.5 text-sm text-slate-700 hover:text-primary" onClick={() => setOpen(false)}>FAQ</Link>
          <Link href="/about" className="block py-1.5 text-sm text-slate-700 hover:text-primary" onClick={() => setOpen(false)}>About</Link>
        </div>
      )}
    </nav>
    </>
  );
}

function MatrixIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="6" fill="#2563EB" />
      <text x="3" y="20" fontFamily="monospace" fontSize="18" fill="white" fontWeight="bold">[</text>
      <text x="19" y="20" fontFamily="monospace" fontSize="18" fill="white" fontWeight="bold">]</text>
      <rect x="10" y="8" width="3" height="3" rx="0.5" fill="white" opacity="0.9" />
      <rect x="15" y="8" width="3" height="3" rx="0.5" fill="white" opacity="0.9" />
      <rect x="10" y="13" width="3" height="3" rx="0.5" fill="white" opacity="0.9" />
      <rect x="15" y="13" width="3" height="3" rx="0.5" fill="white" opacity="0.9" />
      <rect x="10" y="18" width="3" height="3" rx="0.5" fill="white" opacity="0.7" />
      <rect x="15" y="18" width="3" height="3" rx="0.5" fill="white" opacity="0.7" />
    </svg>
  );
}
