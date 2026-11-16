'use client';
import { useState, useCallback } from 'react';
import { Play, RefreshCw, Shuffle } from 'lucide-react';
import { clsx } from 'clsx';
import MatrixInput from './MatrixInput';
import { InlineLatex } from './MatrixDisplay';
import { matrixFromStrings } from '@/lib/calculators/rref';
import { computeEigen, vectorToLatex, formatDecimal } from '@/lib/calculators/linear';
import type { EigenResult, Eigenvalue } from '@/lib/calculators/linear';

function makeEmpty(n: number): string[][] { return Array.from({ length: n }, () => Array(n).fill('')); }
function makeErrors(n: number): boolean[][] { return Array.from({ length: n }, () => Array(n).fill(false)); }
function randomSq(n: number): string[][] {
  return Array.from({ length: n }, () => Array.from({ length: n }, () => String(Math.floor(Math.random() * 9) - 4)));
}

const EXAMPLES = [
  { label: '2×2', n: 2, m: [['4', '1'], ['2', '3']] },
  { label: '2×2 Irrational', n: 2, m: [['1', '1'], ['1', '0']] },
  { label: '3×3 Symmetric', n: 3, m: [['6', '-2', '-1'], ['-2', '6', '-1'], ['-1', '-1', '5']] },
  { label: '2×2 Complex', n: 2, m: [['0', '-1'], ['1', '0']] },
];

const KIND_NOTE: Record<Eigenvalue['kind'], string> = {
  rational: 'Exact rational eigenvalue',
  surd: 'Exact irrational eigenvalue',
  complex: 'Complex eigenvalue',
  numeric: 'Real eigenvalue (decimal approximation)',
};

function numericVectorLatex(v: number[]): string {
  return `\\begin{bmatrix}${v.map(x => formatDecimal(x, 4)).join(' \\\\ ')}\\end{bmatrix}`;
}

export default function EigenvalueCalculator() {
  const [n, setN] = useState(2);
  const [values, setValues] = useState<string[][]>(makeEmpty(2));
  const [result, setResult] = useState<EigenResult | null>(null);

  const resize = (next: number) => { setN(next); setValues(makeEmpty(next)); setResult(null); };
  const handleChange = useCallback((r: number, c: number, val: string) => {
    setValues(prev => { const next = prev.map(row => [...row]); next[r][c] = val; return next; });
  }, []);
  const calculate = () => setResult(computeEigen(matrixFromStrings(values)));

  return (
    <div id="calculator" className="space-y-6">
      <div className="card p-5">
        <div className="flex flex-wrap gap-2 mb-4 items-center">
          <label className="text-sm font-medium text-slate-600">Matrix size:</label>
          {[2, 3, 4].map(s => (
            <button key={s} onClick={() => resize(s)}
              className={clsx('px-3 py-1 rounded-md text-xs font-medium border transition-colors',
                n === s ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-primary')}>
              {s}×{s}
            </button>
          ))}
          {EXAMPLES.map(ex => (
            <button key={ex.label} onClick={() => { setN(ex.n); setValues(ex.m); setResult(null); }}
              className="btn-ghost text-xs ml-1">{ex.label} Example</button>
          ))}
        </div>
        <p className="text-xs text-slate-400 mb-3">Enter integers, fractions like <code className="bg-slate-100 px-1 rounded">3/4</code>, or decimals. Empty cells count as 0.</p>
        <MatrixInput rows={n} cols={n} values={values} isAugmented={false} onChange={handleChange} errors={makeErrors(n)} onSubmit={calculate} />
        <div className="flex flex-wrap gap-2 mt-4">
          <button onClick={calculate} className="btn-primary flex items-center gap-2"><Play size={15} />Find Eigenvalues</button>
          <button onClick={() => { setValues(randomSq(n)); setResult(null); }} className="btn-secondary flex items-center gap-2"><Shuffle size={14} />Random</button>
          <button onClick={() => { setValues(makeEmpty(n)); setResult(null); }} className="btn-secondary flex items-center gap-2"><RefreshCw size={14} />Clear</button>
        </div>
      </div>

      {result && (
        <div className="space-y-4" aria-live="polite">
          <div className="card p-5 border-l-4 border-l-primary">
            <h3 className="font-semibold text-slate-800 mb-3">Step 1 — Characteristic polynomial</h3>
            <div className="overflow-x-auto text-lg">
              <InlineLatex latex={`p(\\lambda) = \\det(\\lambda I - A) = ${result.charPolyLatex}`} />
            </div>
            <p className="text-sm text-slate-500 mt-3">
              Check: trace(A) = <InlineLatex latex={result.trace.toLatex()} /> (sum of the eigenvalues) and det(A) = <InlineLatex latex={result.det.toLatex()} /> (their product).
            </p>
          </div>

          <div className="card p-5 border-l-4 border-l-accent-green">
            <h3 className="font-semibold text-slate-800 mb-3">Step 2 — Eigenvalues (roots of p)</h3>
            <div className="space-y-3">
              {result.eigenvalues.map((ev, i) => (
                <div key={i} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-lg font-semibold text-primary overflow-x-auto">
                      <InlineLatex latex={`\\lambda_{${i + 1}} ${ev.latex.startsWith('\\approx') ? '' : '='} ${ev.latex}`} />
                    </span>
                    {(ev.kind === 'surd' || ev.kind === 'complex') && !ev.latex.startsWith('\\approx') && (
                      <span className="text-sm text-slate-500">
                        ≈ {formatDecimal(ev.re)}{ev.im !== 0 ? ` ${ev.im < 0 ? '−' : '+'} ${formatDecimal(Math.abs(ev.im))}i` : ''}
                      </span>
                    )}
                    <span className="text-xs text-slate-400">
                      {KIND_NOTE[ev.kind]}{ev.multiplicity > 1 ? ` · algebraic multiplicity ${ev.multiplicity}` : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5 border-l-4 border-l-accent-purple">
            <h3 className="font-semibold text-slate-800 mb-1">Step 3 — Eigenvectors</h3>
            <p className="text-sm text-slate-500 mb-3">For each eigenvalue, solve (A − λI)v = 0 by row reduction. The basis of that null space is the set of eigenvectors.</p>
            <div className="space-y-3">
              {result.eigenvalues.map((ev, i) => (
                <div key={i} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                  <div className="text-sm font-medium text-slate-700 mb-2">
                    <InlineLatex latex={`\\lambda_{${i + 1}}`} />
                    {ev.eigenvectors && ev.multiplicity > 1 && (
                      <span className="text-xs text-slate-400 ml-2">
                        geometric multiplicity {ev.eigenvectors.length}{ev.eigenvectors.length < ev.multiplicity ? ' — fewer eigenvectors than the multiplicity, so A is not diagonalizable' : ''}
                      </span>
                    )}
                  </div>
                  {ev.eigenvectors && (
                    <div className="flex flex-wrap gap-4 overflow-x-auto">
                      {ev.eigenvectors.map((v, k) => <InlineLatex key={k} latex={`v = ${vectorToLatex(v)}`} />)}
                    </div>
                  )}
                  {ev.numericEigenvectors && (
                    <div className="flex flex-wrap gap-4 overflow-x-auto">
                      {ev.numericEigenvectors.map((v, k) => <InlineLatex key={k} latex={`v \\approx ${numericVectorLatex(v)}`} />)}
                    </div>
                  )}
                  {!ev.eigenvectors && !ev.numericEigenvectors && (
                    <p className="text-sm text-slate-500">This eigenvalue is complex, so its eigenvectors have complex entries. They are not computed here.</p>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-3">Any non-zero multiple of an eigenvector is also an eigenvector, so your textbook may show a scaled version of the same vector.</p>
          </div>
        </div>
      )}
    </div>
  );
}
