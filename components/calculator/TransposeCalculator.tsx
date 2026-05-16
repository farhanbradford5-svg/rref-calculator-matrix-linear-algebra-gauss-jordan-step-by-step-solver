'use client';
import { useState, useCallback } from 'react';
import { Play, RefreshCw } from 'lucide-react';
import MatrixInput from './MatrixInput';
import MatrixDisplay from './MatrixDisplay';
import { matrixFromStrings } from '@/lib/calculators/rref';
import { computeTranspose } from '@/lib/calculators/operations';
import type { TransposeResult } from '@/lib/calculators/operations';
import { clsx } from 'clsx';

function makeEmpty(r: number, c: number): string[][] { return Array.from({ length: r }, () => Array(c).fill('')); }

export default function TransposeCalculator() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(4);
  const [values, setValues] = useState<string[][]>(makeEmpty(3, 4));
  const [result, setResult] = useState<TransposeResult | null>(null);

  const handleChange = useCallback((r: number, c: number, v: string) => {
    setValues(prev => { const next = prev.map(row => [...row]); next[r][c] = v; return next; });
  }, []);

  const calculate = () => {
    const matrix = matrixFromStrings(values);
    setResult(computeTranspose(matrix));
  };

  return (
    <div className="space-y-6">
      <div className="card p-5">
        <div className="flex flex-wrap gap-2 mb-4">
          <label className="text-sm font-medium text-slate-600 self-center">Rows:</label>
          <select value={rows} onChange={e => { const v=Number(e.target.value); setRows(v); setValues(makeEmpty(v,cols)); setResult(null); }}
            className="border border-slate-200 rounded px-2 py-1 text-sm">{[2,3,4,5,6].map(n=><option key={n}>{n}</option>)}</select>
          <label className="text-sm font-medium text-slate-600 self-center">Cols:</label>
          <select value={cols} onChange={e => { const v=Number(e.target.value); setCols(v); setValues(makeEmpty(rows,v)); setResult(null); }}
            className="border border-slate-200 rounded px-2 py-1 text-sm">{[2,3,4,5,6].map(n=><option key={n}>{n}</option>)}</select>
        </div>
        <MatrixInput rows={rows} cols={cols} values={values} isAugmented={false}
          onChange={handleChange} errors={Array.from({length:rows},()=>Array(cols).fill(false))} />
        <div className="flex gap-2 mt-4">
          <button onClick={calculate} className="btn-primary flex items-center gap-2"><Play size={15} />Transpose</button>
          <button onClick={() => { setValues(makeEmpty(rows, cols)); setResult(null); }} className="btn-secondary flex items-center gap-2"><RefreshCw size={14} />Clear</button>
        </div>
      </div>

      {result && (
        <div className="card p-5 border-l-4 border-l-accent-purple">
          <h3 className="font-semibold text-slate-800 mb-3">
            Transpose Aᵀ <span className="text-sm font-normal text-slate-400">({result.cols}×{result.rows})</span>
          </h3>
          <MatrixDisplay matrix={result.transposed} size="lg" />
          <p className="text-xs text-slate-400 mt-3">Entry (i,j) of Aᵀ equals entry (j,i) of A</p>
        </div>
      )}
    </div>
  );
}
