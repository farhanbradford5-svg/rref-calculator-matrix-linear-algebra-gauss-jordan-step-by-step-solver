'use client';
import { useState, useCallback } from 'react';
import { Play, RefreshCw, Shuffle } from 'lucide-react';
import { clsx } from 'clsx';
import MatrixInput from './MatrixInput';
import { InlineLatex } from './MatrixDisplay';
import { matrixFromStrings } from '@/lib/calculators/rref';
import { computeDeterminant } from '@/lib/calculators/determinant';
import type { DeterminantResult } from '@/lib/calculators/determinant';

function makeEmpty(n: number): string[][] { return Array.from({ length: n }, () => Array(n).fill('')); }
function makeErrors(n: number): boolean[][] { return Array.from({ length: n }, () => Array(n).fill(false)); }
function randomSq(n: number): string[][] {
  return Array.from({ length: n }, () => Array.from({ length: n }, () => String(Math.floor(Math.random() * 7) - 3)));
}

const EXAMPLES = [
  { label: '2×2', n: 2, m: [['3', '-2'], ['1', '4']] },
  { label: '3×3', n: 3, m: [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']] },
  { label: '3×3 Non-zero', n: 3, m: [['2', '-1', '0'], ['3', '1', '2'], ['-1', '4', '3']] },
];

export default function DeterminantCalculator() {
  const [n, setN] = useState(3);
  const [values, setValues] = useState<string[][]>(makeEmpty(3));
  const [errors, setErrors] = useState<boolean[][]>(makeErrors(3));
  const [result, setResult] = useState<DeterminantResult | null>(null);

  const resize = (newN: number) => { setN(newN); setValues(makeEmpty(newN)); setErrors(makeErrors(newN)); setResult(null); };
  const handleChange = useCallback((r: number, c: number, val: string) => {
    setValues(prev => { const next = prev.map(row => [...row]); next[r][c] = val; return next; });
  }, []);

  const calculate = () => {
    const matrix = matrixFromStrings(values);
    setResult(computeDeterminant(matrix));
  };

  return (
    <div className="space-y-6">
      <div className="card p-5">
        <div className="flex flex-wrap gap-2 mb-4 items-center">
          <label className="text-sm font-medium text-slate-600">Matrix size:</label>
          {[2, 3, 4, 5].map(s => (
            <button key={s} onClick={() => resize(s)}
              className={clsx('px-3 py-1 rounded-md text-xs font-medium border transition-colors',
                n === s ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-primary')}>
              {s}×{s}
            </button>
          ))}
          {EXAMPLES.map(ex => (
            <button key={ex.label} onClick={() => { setN(ex.n); setValues(ex.m); setErrors(makeErrors(ex.n)); setResult(null); }}
              className="btn-ghost text-xs ml-1">{ex.label} Example</button>
          ))}
        </div>
        <MatrixInput rows={n} cols={n} values={values} isAugmented={false} onChange={handleChange} errors={errors} />
        <div className="flex gap-2 mt-4">
          <button onClick={calculate} className="btn-primary flex items-center gap-2"><Play size={15} />Calculate Determinant</button>
          <button onClick={() => { setValues(randomSq(n)); setResult(null); }} className="btn-secondary flex items-center gap-2"><Shuffle size={14} />Random</button>
          <button onClick={() => { setValues(makeEmpty(n)); setResult(null); }} className="btn-secondary flex items-center gap-2"><RefreshCw size={14} />Clear</button>
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          {result.success && result.value !== undefined ? (
            <div className={clsx('card p-5 border-l-4', result.value.isZero() ? 'border-l-amber-400' : 'border-l-accent-green')}>
              <h3 className="font-semibold text-slate-800 mb-3">Determinant Result</h3>
              <div className="text-3xl font-bold text-primary mb-2 font-mono">
                det(A) = <InlineLatex latex={result.value.toLatex()} />
              </div>
              {result.value.isZero() && (
                <p className="text-sm text-amber-600 mt-1">⚠ det = 0 means the matrix is singular — it has no inverse and its rows are linearly dependent.</p>
              )}
              <div className="mt-4 space-y-2">
                {result.steps.map((step, i) => (
                  <div key={i} className="bg-slate-50 rounded-lg p-3 text-sm border border-slate-100">
                    <p className="text-xs text-slate-500 mb-1">{step.description}</p>
                    <div className="font-mono overflow-x-auto">
                      <InlineLatex latex={step.latex} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="card p-4 border-l-4 border-l-accent-rose">
              <p className="text-sm text-accent-rose">{result.errorMessage}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
