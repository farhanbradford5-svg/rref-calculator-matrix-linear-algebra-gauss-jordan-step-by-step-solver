'use client';
import { useState, useCallback } from 'react';
import { Play, RefreshCw, Shuffle } from 'lucide-react';
import MatrixInput from './MatrixInput';
import MatrixDisplay, { InlineLatex } from './MatrixDisplay';
import StepList from './StepList';
import { matrixFromStrings } from '@/lib/calculators/rref';
import { computeSubspaces, vectorToLatex } from '@/lib/calculators/linear';
import type { SubspaceResult } from '@/lib/calculators/linear';

function makeEmpty(r: number, c: number): string[][] { return Array.from({ length: r }, () => Array(c).fill('')); }
function makeErrors(r: number, c: number): boolean[][] { return Array.from({ length: r }, () => Array(c).fill(false)); }

const EXAMPLES = [
  { label: '3×3 Rank 2', r: 3, c: 3, m: [['1', '2', '3'], ['2', '4', '6'], ['1', '1', '1']] },
  { label: '2×4', r: 2, c: 4, m: [['1', '2', '0', '1'], ['0', '0', '1', '3']] },
  { label: '3×3 Invertible', r: 3, c: 3, m: [['2', '1', '-1'], ['-3', '-1', '2'], ['-2', '1', '2']] },
];

export default function NullSpaceCalculator() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [values, setValues] = useState<string[][]>(makeEmpty(3, 3));
  const [result, setResult] = useState<SubspaceResult | null>(null);
  const [showSteps, setShowSteps] = useState(false);

  const resize = (r: number, c: number) => {
    setRows(r); setCols(c); setResult(null);
    setValues(prev => {
      const next = makeEmpty(r, c);
      for (let i = 0; i < Math.min(r, prev.length); i++)
        for (let j = 0; j < Math.min(c, prev[i].length); j++) next[i][j] = prev[i][j];
      return next;
    });
  };
  const handleChange = useCallback((r: number, c: number, val: string) => {
    setValues(prev => { const next = prev.map(row => [...row]); next[r][c] = val; return next; });
  }, []);
  const calculate = () => { setResult(computeSubspaces(matrixFromStrings(values))); setShowSteps(false); };
  const random = () => {
    setValues(Array.from({ length: rows }, () => Array.from({ length: cols }, () => String(Math.floor(Math.random() * 7) - 3))));
    setResult(null);
  };

  return (
    <div id="calculator" className="space-y-6">
      <div className="card p-5">
        <div className="flex flex-wrap gap-3 mb-4 items-center">
          <label className="text-sm font-medium text-slate-600" htmlFor="ns-rows">Rows:</label>
          <select id="ns-rows" value={rows} onChange={e => resize(Number(e.target.value), cols)}
            className="border border-slate-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            {[2, 3, 4, 5, 6].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
          <span className="text-slate-400 font-medium">×</span>
          <label className="text-sm font-medium text-slate-600" htmlFor="ns-cols">Cols:</label>
          <select id="ns-cols" value={cols} onChange={e => resize(rows, Number(e.target.value))}
            className="border border-slate-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            {[2, 3, 4, 5, 6].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
          {EXAMPLES.map(ex => (
            <button key={ex.label} onClick={() => { setRows(ex.r); setCols(ex.c); setValues(ex.m); setResult(null); }}
              className="btn-ghost text-xs">{ex.label} Example</button>
          ))}
        </div>
        <p className="text-xs text-slate-400 mb-3">Enter the matrix A (not augmented). The calculator solves Ax = 0. Fractions like <code className="bg-slate-100 px-1 rounded">1/2</code> are allowed.</p>
        <MatrixInput rows={rows} cols={cols} values={values} isAugmented={false} onChange={handleChange} errors={makeErrors(rows, cols)} onSubmit={calculate} />
        <div className="flex flex-wrap gap-2 mt-4">
          <button onClick={calculate} className="btn-primary flex items-center gap-2"><Play size={15} />Find Null Space</button>
          <button onClick={random} className="btn-secondary flex items-center gap-2"><Shuffle size={14} />Random</button>
          <button onClick={() => { setValues(makeEmpty(rows, cols)); setResult(null); }} className="btn-secondary flex items-center gap-2"><RefreshCw size={14} />Clear</button>
        </div>
      </div>

      {result && (
        <div className="space-y-4" aria-live="polite">
          <div className="card p-5 border-l-4 border-l-primary">
            <h3 className="font-semibold text-slate-800 mb-3">Rank and nullity</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { k: 'Rank', v: result.rank },
                { k: 'Nullity', v: result.nullity },
                { k: 'Columns (n)', v: result.cols },
              ].map(x => (
                <div key={x.k} className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                  <div className="text-2xl font-bold text-primary">{x.v}</div>
                  <div className="text-xs text-slate-500">{x.k}</div>
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-500 mt-3">Rank–nullity check: {result.rank} + {result.nullity} = {result.cols}.</p>
            <div className="mt-4">
              <MatrixDisplay matrix={result.rref} label="RREF of A" />
            </div>
            <p className="text-sm text-slate-500 mt-2">
              Pivot columns: {result.pivotColumns.length ? result.pivotColumns.map(c => c + 1).join(', ') : 'none'}.
              {' '}Free columns: {result.freeColumns.length ? result.freeColumns.map(c => c + 1).join(', ') : 'none'}.
            </p>
          </div>

          <div className="card p-5 border-l-4 border-l-accent-green">
            <h3 className="font-semibold text-slate-800 mb-3">Basis for the null space Nul(A)</h3>
            {result.nullBasis.length === 0 ? (
              <p className="text-sm text-slate-600">
                Every column has a pivot, so the only solution of Ax = 0 is x = 0. The null space is the trivial subspace {'{0}'} and has no basis vectors (nullity 0).
              </p>
            ) : (
              <>
                <div className="flex flex-wrap gap-4 overflow-x-auto">
                  {result.nullBasis.map((v, i) => <InlineLatex key={i} latex={`v_{${i + 1}} = ${vectorToLatex(v)}`} />)}
                </div>
                <p className="text-sm text-slate-500 mt-3">
                  Each basis vector comes from setting one free variable ({result.freeColumns.map(c => `x${c + 1}`).join(', ')}) to 1 and the other free variables to 0. Every solution of Ax = 0 is a linear combination of these vectors.
                </p>
              </>
            )}
          </div>

          <div className="card p-5 border-l-4 border-l-accent-purple">
            <h3 className="font-semibold text-slate-800 mb-3">Basis for the column space and row space</h3>
            {result.rank === 0 ? (
              <p className="text-sm text-slate-600">A is the zero matrix, so both spaces contain only the zero vector.</p>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600 mb-2">Column space Col(A) — the pivot columns of the <em>original</em> matrix:</p>
                  <div className="flex flex-wrap gap-4 overflow-x-auto">
                    {result.columnBasis.map((v, i) => <InlineLatex key={i} latex={vectorToLatex(v)} />)}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-2">Row space Row(A) — the non-zero rows of the RREF:</p>
                  <div className="space-y-1 overflow-x-auto">
                    {result.rowBasis.map((v, i) => (
                      <div key={i}><InlineLatex latex={`\\begin{bmatrix}${v.map(x => x.toLatex()).join(' & ')}\\end{bmatrix}`} /></div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <button onClick={() => setShowSteps(!showSteps)} className="btn-secondary text-sm">
              {showSteps ? 'Hide' : 'Show'} row reduction steps ({result.steps.length})
            </button>
            {showSteps && <div className="mt-4"><StepList steps={result.steps} verbose /></div>}
          </div>
        </div>
      )}
    </div>
  );
}
