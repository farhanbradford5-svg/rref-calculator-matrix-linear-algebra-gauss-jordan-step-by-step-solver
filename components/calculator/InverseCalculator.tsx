'use client';
import { useState, useCallback } from 'react';
import { Play, RefreshCw, Shuffle, ChevronDown, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import MatrixInput from './MatrixInput';
import MatrixDisplay from './MatrixDisplay';
import { InlineLatex } from './MatrixDisplay';
import { Rational } from '@/lib/calculators/rational';
import { matrixFromStrings } from '@/lib/calculators/rref';
import { computeInverse } from '@/lib/calculators/inverse';
import type { InverseResult } from '@/lib/calculators/inverse';

function makeEmpty(n: number): string[][] {
  return Array.from({ length: n }, () => Array(n).fill(''));
}
function makeErrors(n: number): boolean[][] {
  return Array.from({ length: n }, () => Array(n).fill(false));
}
function randomSqMatrix(n: number): string[][] {
  return Array.from({ length: n }, () =>
    Array.from({ length: n }, () => String(Math.floor(Math.random() * 9) - 4))
  );
}

const EXAMPLES = [
  { label: '2×2 Invertible', n: 2, m: [['4', '7'], ['2', '6']] },
  { label: '3×3 Invertible', n: 3, m: [['1', '2', '3'], ['0', '1', '4'], ['5', '6', '0']] },
  { label: '2×2 Singular', n: 2, m: [['1', '2'], ['2', '4']] },
];

export default function InverseCalculator() {
  const [n, setN] = useState(3);
  const [values, setValues] = useState<string[][]>(makeEmpty(3));
  const [errors, setErrors] = useState<boolean[][]>(makeErrors(3));
  const [result, setResult] = useState<InverseResult | null>(null);
  const [showSteps, setShowSteps] = useState(false);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const resize = (newN: number) => {
    setN(newN);
    setValues(makeEmpty(newN));
    setErrors(makeErrors(newN));
    setResult(null);
  };

  const handleChange = useCallback((r: number, c: number, val: string) => {
    setValues(prev => { const next = prev.map(row => [...row]); next[r][c] = val; return next; });
  }, []);

  const calculate = () => {
    const matrix = matrixFromStrings(values);
    const res = computeInverse(matrix);
    setResult(res);
    setShowSteps(false);
  };

  const toggleStep = (i: number) => setExpanded(prev => {
    const next = new Set(prev);
    next.has(i) ? next.delete(i) : next.add(i);
    return next;
  });

  return (
    <div className="space-y-6">
      <div className="card p-5">
        <div className="flex flex-wrap gap-3 mb-4 items-center">
          <label className="text-sm font-medium text-slate-600">Size:</label>
          {[2, 3, 4].map(s => (
            <button key={s} onClick={() => resize(s)}
              className={clsx('px-3 py-1 rounded-md text-xs font-medium border transition-colors',
                n === s ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-primary')}>
              {s}×{s}
            </button>
          ))}
          <div className="flex gap-2 ml-auto">
            {EXAMPLES.map(ex => (
              <button key={ex.label} onClick={() => { setN(ex.n); setValues(ex.m); setErrors(makeErrors(ex.n)); setResult(null); }}
                className="btn-ghost text-xs">{ex.label}</button>
            ))}
          </div>
        </div>
        <MatrixInput rows={n} cols={n} values={values} isAugmented={false} onChange={handleChange} errors={errors} />
        <div className="flex gap-2 mt-4">
          <button onClick={calculate} className="btn-primary flex items-center gap-2"><Play size={15} />Find Inverse</button>
          <button onClick={() => { setValues(randomSqMatrix(n)); setResult(null); }} className="btn-secondary flex items-center gap-2"><Shuffle size={14} />Random</button>
          <button onClick={() => { setValues(makeEmpty(n)); setResult(null); }} className="btn-secondary flex items-center gap-2"><RefreshCw size={14} />Clear</button>
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          {result.success && result.inverseMatrix ? (
            <>
              <div className="card p-5 border-l-4 border-l-accent-green">
                <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <span className="text-accent-green">✓</span> Matrix Inverse A⁻¹
                </h3>
                <MatrixDisplay matrix={result.inverseMatrix} size="lg" />
                <p className="text-xs text-slate-400 mt-3">Verify: A · A⁻¹ = I (identity matrix)</p>
              </div>
              <div className="card p-4">
                <button onClick={() => setShowSteps(!showSteps)} className="flex items-center gap-2 text-sm font-medium text-slate-700 w-full">
                  {showSteps ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  {result.steps.length} elimination steps (on augmented [A|I])
                </button>
                {showSteps && (
                  <div className="mt-3 space-y-2">
                    {result.steps.map((step, i) => (
                      <div key={i} className="border border-slate-200 rounded-lg overflow-hidden">
                        <button onClick={() => toggleStep(i)} className="w-full text-left flex items-center gap-3 p-3 hover:bg-slate-50">
                          <span className="w-5 h-5 rounded-full bg-primary-50 text-primary text-xs flex items-center justify-center font-bold">{i+1}</span>
                          <span className="text-xs font-mono text-slate-700"><InlineLatex latex={step.latex} /></span>
                          {expanded.has(i) ? <ChevronDown size={14} className="ml-auto text-slate-400" /> : <ChevronRight size={14} className="ml-auto text-slate-400" />}
                        </button>
                        {expanded.has(i) && (
                          <div className="px-4 pb-3 pt-1">
                            <p className="text-xs text-slate-500 mb-2">{step.explanation}</p>
                            <div className="bg-white rounded border border-slate-100 p-2 overflow-x-auto">
                              <MatrixDisplay matrix={step.matrix} size="sm" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="card p-5 border-l-4 border-l-accent-rose">
              <h3 className="font-semibold text-accent-rose mb-1">No Inverse Exists</h3>
              <p className="text-sm text-slate-600">{result.errorMessage}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
