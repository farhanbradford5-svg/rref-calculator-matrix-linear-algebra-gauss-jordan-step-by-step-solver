'use client';
import { useState, useCallback } from 'react';
import { Play, RefreshCw } from 'lucide-react';
import MatrixInput from './MatrixInput';
import MatrixDisplay from './MatrixDisplay';
import { InlineLatex } from './MatrixDisplay';
import { matrixFromStrings } from '@/lib/calculators/rref';
import { computeMultiply } from '@/lib/calculators/operations';
import type { MultiplyResult } from '@/lib/calculators/operations';

function makeEmpty(r: number, c: number): string[][] { return Array.from({ length: r }, () => Array(c).fill('')); }
function makeErrors(r: number, c: number): boolean[][] { return Array.from({ length: r }, () => Array(c).fill(false)); }

export default function MultiplyCalculator() {
  const [rowsA, setRowsA] = useState(2);
  const [colsA, setColsA] = useState(3);
  const [rowsB, setRowsB] = useState(3);
  const [colsB, setColsB] = useState(2);
  const [valA, setValA] = useState<string[][]>(makeEmpty(2, 3));
  const [valB, setValB] = useState<string[][]>(makeEmpty(3, 2));
  const [result, setResult] = useState<MultiplyResult | null>(null);

  const handleChangeA = useCallback((r: number, c: number, v: string) => {
    setValA(prev => { const next = prev.map(row => [...row]); next[r][c] = v; return next; });
  }, []);
  const handleChangeB = useCallback((r: number, c: number, v: string) => {
    setValB(prev => { const next = prev.map(row => [...row]); next[r][c] = v; return next; });
  }, []);

  const calculate = () => {
    const A = matrixFromStrings(valA);
    const B = matrixFromStrings(valB);
    setResult(computeMultiply(A, B));
  };

  const clear = () => { setValA(makeEmpty(rowsA, colsA)); setValB(makeEmpty(rowsB, colsB)); setResult(null); };

  return (
    <div className="space-y-6">
      <div className="card p-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-semibold text-slate-700">Matrix A</span>
              <span className="text-xs text-slate-400">
                <select value={rowsA} onChange={e => { const v=Number(e.target.value); setRowsA(v); setValA(makeEmpty(v,colsA)); setResult(null); }}
                  className="border border-slate-200 rounded px-1 text-xs">{[2,3,4,5].map(n=><option key={n}>{n}</option>)}</select>
                ×
                <select value={colsA} onChange={e => { const v=Number(e.target.value); setColsA(v); setValA(makeEmpty(rowsA,v)); setRowsB(v); setValB(makeEmpty(v,colsB)); setResult(null); }}
                  className="border border-slate-200 rounded px-1 text-xs">{[2,3,4,5].map(n=><option key={n}>{n}</option>)}</select>
              </span>
            </div>
            <MatrixInput rows={rowsA} cols={colsA} values={valA} isAugmented={false} onChange={handleChangeA} errors={makeErrors(rowsA,colsA)} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-semibold text-slate-700">Matrix B</span>
              <span className="text-xs text-slate-400">
                {rowsB}×
                <select value={colsB} onChange={e => { const v=Number(e.target.value); setColsB(v); setValB(makeEmpty(rowsB,v)); setResult(null); }}
                  className="border border-slate-200 rounded px-1 text-xs">{[2,3,4,5].map(n=><option key={n}>{n}</option>)}</select>
              </span>
              <span className="text-xs text-slate-400">(rows locked to cols of A)</span>
            </div>
            <MatrixInput rows={rowsB} cols={colsB} values={valB} isAugmented={false} onChange={handleChangeB} errors={makeErrors(rowsB,colsB)} />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button onClick={calculate} className="btn-primary flex items-center gap-2"><Play size={15} />Multiply A × B</button>
          <button onClick={clear} className="btn-secondary flex items-center gap-2"><RefreshCw size={14} />Clear</button>
        </div>
      </div>

      {result && (
        result.success && result.result ? (
          <div className="space-y-4">
            <div className="card p-5 border-l-4 border-l-accent-green">
              <h3 className="font-semibold text-slate-800 mb-3">Result: A × B ({result.rowsA}×{result.colsB})</h3>
              <MatrixDisplay matrix={result.result} size="lg" />
            </div>
            <details className="card p-4">
              <summary className="cursor-pointer text-sm font-medium text-slate-700">
                Show {result.steps.length} dot product calculations
              </summary>
              <div className="mt-3 space-y-2 max-h-80 overflow-y-auto">
                {result.steps.map((step, i) => (
                  <div key={i} className="text-xs bg-slate-50 rounded p-2 border border-slate-100 overflow-x-auto">
                    <InlineLatex latex={step.latex} />
                  </div>
                ))}
              </div>
            </details>
          </div>
        ) : (
          <div className="card p-4 border-l-4 border-l-accent-rose">
            <p className="text-sm text-accent-rose">{result.errorMessage}</p>
          </div>
        )
      )}
    </div>
  );
}
