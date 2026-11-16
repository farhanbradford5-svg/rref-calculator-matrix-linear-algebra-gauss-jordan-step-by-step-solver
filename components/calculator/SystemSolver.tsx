'use client';
import { useState, useCallback } from 'react';
import { Play, RefreshCw } from 'lucide-react';
import { clsx } from 'clsx';
import MatrixDisplay, { InlineLatex } from './MatrixDisplay';
import StepList from './StepList';
import { computeRREF, matrixFromStrings } from '@/lib/calculators/rref';
import type { RREFResult } from '@/lib/calculators/shared-types';

function makeEmpty(eqs: number, vars: number): string[][] { return Array.from({ length: eqs }, () => Array(vars + 1).fill('')); }

function varNames(count: number): string[] {
  if (count === 2) return ['x', 'y'];
  if (count === 3) return ['x', 'y', 'z'];
  return Array.from({ length: count }, (_, i) => `x_{${i + 1}}`);
}
function plain(name: string): string {
  return name.replace(/_\{(\d)\}/, (_, d) => String.fromCharCode(0x2080 + Number(d)));
}

const EXAMPLES = [
  { label: '2 equations', e: 2, v: 2, m: [['2', '1', '5'], ['4', '-6', '-2']] },
  { label: '3 equations', e: 3, v: 3, m: [['1', '1', '1', '6'], ['0', '2', '5', '-4'], ['2', '5', '-1', '27']] },
  { label: 'Infinite solutions', e: 3, v: 3, m: [['1', '2', '-1', '4'], ['2', '4', '-2', '8'], ['3', '6', '-3', '12']] },
  { label: 'No solution', e: 3, v: 3, m: [['1', '2', '3', '4'], ['2', '4', '6', '9'], ['3', '6', '9', '13']] },
];

export default function SystemSolver() {
  const [eqs, setEqs] = useState(3);
  const [vars, setVars] = useState(3);
  const [values, setValues] = useState<string[][]>(makeEmpty(3, 3));
  const [result, setResult] = useState<RREFResult | null>(null);
  const [showSteps, setShowSteps] = useState(false);

  const resize = (e: number, v: number) => { setEqs(e); setVars(v); setValues(makeEmpty(e, v)); setResult(null); };
  const handleChange = useCallback((r: number, c: number, val: string) => {
    setValues(prev => { const next = prev.map(row => [...row]); next[r][c] = val; return next; });
  }, []);
  const calculate = () => { setResult(computeRREF(matrixFromStrings(values), true)); setShowSteps(false); };

  const names = varNames(vars);
  const rename = (latex: string) => latex.replace(/x_\{(\d+)\}/g, (_, d) => names[Number(d) - 1] ?? `x_{${d}}`);
  const sol = result?.solution ?? null;

  return (
    <div id="calculator" className="space-y-6">
      <div className="card p-5">
        <div className="flex flex-wrap gap-3 mb-4 items-center">
          <label className="text-sm font-medium text-slate-600" htmlFor="sys-eqs">Equations:</label>
          <select id="sys-eqs" value={eqs} onChange={e => resize(Number(e.target.value), vars)}
            className="border border-slate-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            {[2, 3, 4, 5].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
          <label className="text-sm font-medium text-slate-600" htmlFor="sys-vars">Unknowns:</label>
          <select id="sys-vars" value={vars} onChange={e => resize(eqs, Number(e.target.value))}
            className="border border-slate-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            {[2, 3, 4, 5].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
          {EXAMPLES.map(ex => (
            <button key={ex.label} onClick={() => { setEqs(ex.e); setVars(ex.v); setValues(ex.m); setResult(null); }}
              className="btn-ghost text-xs">{ex.label}</button>
          ))}
        </div>
        <p className="text-xs text-slate-400 mb-3">Type the coefficient in front of each variable and the constant after the equals sign. Leave a box empty for 0. Fractions like <code className="bg-slate-100 px-1 rounded">2/3</code> and decimals work.</p>

        <div className="space-y-2 overflow-x-auto pb-1">
          {values.map((row, r) => (
            <div key={r} className="flex items-center gap-1.5 min-w-max">
              {row.map((val, c) => (
                <span key={c} className="flex items-center gap-1.5">
                  {c === vars && <span className="text-slate-500 font-medium px-1">=</span>}
                  <input
                    type="text"
                    inputMode="decimal"
                    value={val}
                    onChange={e => handleChange(r, c, e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') calculate(); }}
                    aria-label={c === vars ? `Equation ${r + 1} constant` : `Equation ${r + 1} coefficient of ${plain(names[c])}`}
                    placeholder="0"
                    className={clsx('w-14 h-10 text-center border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary',
                      c === vars ? 'border-primary/40 bg-blue-50' : 'border-slate-200')}
                  />
                  {c < vars && (
                    <span className="text-sm text-slate-600 font-medium">
                      {plain(names[c])}{c < vars - 1 && <span className="text-slate-400 pl-1.5">+</span>}
                    </span>
                  )}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <button onClick={calculate} className="btn-primary flex items-center gap-2"><Play size={15} />Solve System</button>
          <button onClick={() => { setValues(makeEmpty(eqs, vars)); setResult(null); }} className="btn-secondary flex items-center gap-2"><RefreshCw size={14} />Clear</button>
        </div>
      </div>

      {result && sol && (
        <div className="space-y-4" aria-live="polite">
          <div className={clsx('card p-5 border-l-4',
            sol.type === 'unique' ? 'border-l-accent-green' : sol.type === 'no_solution' ? 'border-l-accent-rose' : 'border-l-amber-400')}>
            <h3 className="font-semibold text-slate-800 mb-3">
              {sol.type === 'unique' && 'One unique solution'}
              {sol.type === 'infinite' && 'Infinitely many solutions'}
              {sol.type === 'no_solution' && 'No solution (inconsistent system)'}
            </h3>
            {sol.type === 'unique' && sol.variables && (
              <div className="flex flex-wrap gap-x-8 gap-y-2 text-lg">
                {Object.entries(sol.variables).map(([k, v]) => <InlineLatex key={k} latex={`${rename(k)} = ${v}`} />)}
              </div>
            )}
            {sol.type === 'infinite' && sol.parametricForm && (
              <>
                <div className="overflow-x-auto"><InlineLatex latex={rename(sol.parametricForm)} /></div>
                <p className="text-sm text-slate-500 mt-3">
                  The system has {sol.nullity} free variable{sol.nullity === 1 ? '' : 's'}: pick any value for {sol.nullity === 1 ? 'it' : 'each'} and the formulas above give the rest.
                </p>
              </>
            )}
            {sol.type === 'no_solution' && (
              <p className="text-sm text-slate-600">Row reduction produces a row that reads 0 = (non-zero number). No values of the unknowns can satisfy every equation at once.</p>
            )}
          </div>

          <div className="card p-5">
            <h3 className="font-semibold text-slate-800 mb-3">Reduced augmented matrix</h3>
            <MatrixDisplay matrix={result.rrefMatrix} isAugmented />
            <p className="text-sm text-slate-500 mt-2">Rank {result.rank} with {vars} unknown{vars === 1 ? '' : 's'}.</p>
          </div>

          <div>
            <button onClick={() => setShowSteps(!showSteps)} className="btn-secondary text-sm">
              {showSteps ? 'Hide' : 'Show'} elimination steps ({result.steps.length})
            </button>
            {showSteps && <div className="mt-4"><StepList steps={result.steps} verbose /></div>}
          </div>
        </div>
      )}
    </div>
  );
}
