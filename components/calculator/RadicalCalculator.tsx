'use client';
import { useState } from 'react';
import { Play, RefreshCw } from 'lucide-react';
import { InlineLatex } from './MatrixDisplay';
import { simplifyRadical } from '@/lib/calculators/operations';
import type { RadicalResult } from '@/lib/calculators/operations';

const EXAMPLES = [72, 50, 48, 200, 180, 12, 98, 147];

export default function RadicalCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<RadicalResult | null>(null);
  const [error, setError] = useState('');

  const calculate = (val?: number) => {
    const n = val !== undefined ? val : parseInt(input.trim(), 10);
    if (isNaN(n) || n < 0) { setError('Please enter a non-negative integer.'); return; }
    setError('');
    setResult(simplifyRadical(n));
  };

  return (
    <div className="space-y-6">
      <div className="card p-5">
        <p className="text-sm text-slate-500 mb-4">Enter a non-negative integer to simplify its square root.</p>
        <div className="flex gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl text-slate-600 font-mono">√</span>
            <input
              type="number" min="0" step="1"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && calculate()}
              placeholder="e.g. 72"
              className="border border-slate-200 rounded-lg px-4 py-2.5 text-lg font-mono w-40 focus:outline-none focus:ring-2 focus:ring-primary"
              inputMode="numeric"
            />
          </div>
          <button onClick={() => calculate()} className="btn-primary flex items-center gap-2"><Play size={15} />Simplify</button>
          <button onClick={() => { setInput(''); setResult(null); setError(''); }} className="btn-secondary flex items-center gap-2"><RefreshCw size={14} />Clear</button>
        </div>
        {error && <p className="text-sm text-accent-rose">{error}</p>}

        <div>
          <p className="text-xs text-slate-400 mb-2">Quick examples:</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map(n => (
              <button key={n} onClick={() => { setInput(String(n)); calculate(n); }}
                className="px-3 py-1 text-xs rounded-md border border-slate-200 hover:border-primary hover:text-primary transition-colors font-mono">
                √{n}
              </button>
            ))}
          </div>
        </div>
      </div>

      {result && (
        <div className="card p-5 border-l-4 border-l-accent-green space-y-4">
          <h3 className="font-semibold text-slate-800">Result</h3>
          <div className="text-3xl text-center py-3">
            <InlineLatex latex={result.latex} displayMode />
          </div>
          {result.steps.length > 0 && (
            <div>
              <p className="text-xs text-slate-500 mb-2 font-semibold uppercase tracking-wide">Steps</p>
              <div className="space-y-2">
                {result.steps.map((s, i) => (
                  <div key={i} className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 text-sm overflow-x-auto">
                    <InlineLatex latex={s} />
                  </div>
                ))}
              </div>
            </div>
          )}
          {result.isInteger && (
            <p className="text-xs text-slate-400">√{result.input} simplifies to a whole number — it is a perfect square.</p>
          )}
        </div>
      )}
    </div>
  );
}
