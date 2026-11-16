'use client';
import { useState, useCallback } from 'react';
import { Play, RefreshCw } from 'lucide-react';
import { clsx } from 'clsx';
import MatrixInput from './MatrixInput';
import { InlineLatex } from './MatrixDisplay';
import { matrixFromStrings } from '@/lib/calculators/rref';
import { matrixToLatex } from '@/lib/calculators/rational';
import { computeCramer } from '@/lib/calculators/linear';
import type { CramerResult } from '@/lib/calculators/linear';

function makeEmpty(n: number): string[][] { return Array.from({ length: n }, () => Array(n + 1).fill('')); }
function makeErrors(n: number): boolean[][] { return Array.from({ length: n }, () => Array(n + 1).fill(false)); }

const VARS: Record<number, string[]> = { 2: ['x', 'y'], 3: ['x', 'y', 'z'], 4: ['x_1', 'x_2', 'x_3', 'x_4'] };

const EXAMPLES = [
  { label: '2×2', n: 2, m: [['2', '1', '5'], ['4', '-6', '-2']] },
  { label: '3×3', n: 3, m: [['2', '1', '-1', '8'], ['-3', '-1', '2', '-11'], ['-2', '1', '2', '-3']] },
  { label: '3×3 Singular', n: 3, m: [['1', '2', '3', '4'], ['2', '4', '6', '8'], ['1', '1', '1', '1']] },
];

export default function CramersRuleCalculator() {
  const [n, setN] = useState(3);
  const [values, setValues] = useState<string[][]>(makeEmpty(3));
  const [result, setResult] = useState<CramerResult | null>(null);

  const resize = (next: number) => { setN(next); setValues(makeEmpty(next)); setResult(null); };
  const handleChange = useCallback((r: number, c: number, val: string) => {
    setValues(prev => { const next = prev.map(row => [...row]); next[r][c] = val; return next; });
  }, []);
  const calculate = () => {
    const aug = matrixFromStrings(values);
    setResult(computeCramer(aug.map(row => row.slice(0, n)), aug.map(row => row[n])));
  };
  const vars = VARS[n];

  return (
    <div id="calculator" className="space-y-6">
      <div className="card p-5">
        <div className="flex flex-wrap gap-2 mb-4 items-center">
          <label className="text-sm font-medium text-slate-600">System size:</label>
          {[2, 3, 4].map(s => (
            <button key={s} onClick={() => resize(s)}
              className={clsx('px-3 py-1 rounded-md text-xs font-medium border transition-colors',
                n === s ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-primary')}>
              {s} equations
            </button>
          ))}
          {EXAMPLES.map(ex => (
            <button key={ex.label} onClick={() => { setN(ex.n); setValues(ex.m); setResult(null); }}
              className="btn-ghost text-xs ml-1">{ex.label} Example</button>
          ))}
        </div>
        <p className="text-xs text-slate-400 mb-3">
          Each row is one equation: type the coefficients to the left of the bar and the constant to the right. Fractions like 1/2 are allowed.
        </p>
        <MatrixInput rows={n} cols={n + 1} values={values} isAugmented onChange={handleChange} errors={makeErrors(n)} onSubmit={calculate} />
        <div className="flex flex-wrap gap-2 mt-4">
          <button onClick={calculate} className="btn-primary flex items-center gap-2"><Play size={15} />Solve with Cramer&apos;s Rule</button>
          <button onClick={() => { setValues(makeEmpty(n)); setResult(null); }} className="btn-secondary flex items-center gap-2"><RefreshCw size={14} />Clear</button>
        </div>
      </div>

      {result && (
        <div className="space-y-4" aria-live="polite">
          <div className={clsx('card p-5 border-l-4', result.detA.isZero() ? 'border-l-amber-400' : 'border-l-primary')}>
            <h3 className="font-semibold text-slate-800 mb-3">Step 1 — Determinant of the coefficient matrix</h3>
            <div className="overflow-x-auto">
              <InlineLatex latex={`D = \\det(A) = ${result.detA.toLatex()}`} />
            </div>
            {result.detA.isZero() && (
              <p className="text-sm text-amber-700 mt-3">
                det(A) = 0, so Cramer&apos;s rule does not apply: the system has either no solution or infinitely many. Use the{' '}
                <a href="/matrix/augmented/" className="underline">augmented matrix calculator</a> to find out which.
              </p>
            )}
          </div>

          <div className="card p-5 border-l-4 border-l-accent-purple">
            <h3 className="font-semibold text-slate-800 mb-1">Step 2 — Replace one column at a time with the constants</h3>
            <p className="text-sm text-slate-500 mb-3">A<sub>i</sub> is A with column i replaced by the right-hand side b.</p>
            <div className="space-y-3">
              {result.replaced.map((Ai, i) => (
                <div key={i} className="bg-slate-50 rounded-lg p-3 border border-slate-100 overflow-x-auto">
                  <InlineLatex latex={`D_{${vars[i]}} = \\det ${matrixToLatex(Ai)} = ${result.detAi[i].toLatex()}`} />
                </div>
              ))}
            </div>
          </div>

          {result.solution && (
            <div className="card p-5 border-l-4 border-l-accent-green">
              <h3 className="font-semibold text-slate-800 mb-3">Step 3 — Divide: each variable is D<sub>i</sub> / D</h3>
              <div className="space-y-2">
                {result.solution.map((x, i) => (
                  <div key={i} className="text-lg overflow-x-auto">
                    <InlineLatex latex={`${vars[i]} = \\dfrac{D_{${vars[i]}}}{D} = \\dfrac{${result.detAi[i].toLatex()}}{${result.detA.toLatex()}} = ${x.toLatex()}`} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
