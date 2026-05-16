'use client';
import { useState } from 'react';
import { Play, RefreshCw, Plus, Minus } from 'lucide-react';
import VectorInput from './VectorInput';
import { InlineLatex } from './MatrixDisplay';
import { Rational } from '@/lib/calculators/rational';
import { computeDotProduct } from '@/lib/calculators/operations';

export default function DotProductCalculator() {
  const [dim, setDim] = useState(3);
  const [u, setU] = useState<string[]>(['', '', '']);
  const [v, setV] = useState<string[]>(['', '', '']);
  const [result, setResult] = useState<ReturnType<typeof computeDotProduct> | null>(null);

  const resize = (newDim: number) => {
    setDim(newDim);
    setU(Array(newDim).fill(''));
    setV(Array(newDim).fill(''));
    setResult(null);
  };

  const calculate = () => {
    const uR = u.map(x => Rational.from(x.trim() || '0'));
    const vR = v.map(x => Rational.from(x.trim() || '0'));
    setResult(computeDotProduct(uR, vR));
  };

  const hasError = result && 'error' in result;
  const hasResult = result && !('error' in result);

  return (
    <div className="space-y-6">
      <div className="card p-5">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium text-slate-600">Dimension:</span>
          {[2, 3, 4, 5].map(d => (
            <button key={d} onClick={() => resize(d)}
              className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${dim === d ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600 border-slate-200 hover:border-primary'}`}>
              {d}D
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-8 mb-4">
          <VectorInput label="u" dim={dim} values={u} onChange={(i, val) => setU(prev => { const n=[...prev]; n[i]=val; return n; })} />
          <VectorInput label="v" dim={dim} values={v} onChange={(i, val) => setV(prev => { const n=[...prev]; n[i]=val; return n; })} />
        </div>
        <div className="flex gap-2">
          <button onClick={calculate} className="btn-primary flex items-center gap-2"><Play size={15} />Calculate u · v</button>
          <button onClick={() => { setU(Array(dim).fill('')); setV(Array(dim).fill('')); setResult(null); }} className="btn-secondary flex items-center gap-2"><RefreshCw size={14} />Clear</button>
        </div>
      </div>

      {hasError && (
        <div className="card p-4 border-l-4 border-l-accent-rose">
          <p className="text-sm text-accent-rose">{'error' in result && result.error}</p>
        </div>
      )}

      {hasResult && !('error' in result) && (
        <div className="card p-5 border-l-4 border-l-accent-green space-y-3">
          <h3 className="font-semibold text-slate-800">u · v</h3>
          <div className="bg-slate-50 rounded-lg p-3 overflow-x-auto">
            <InlineLatex latex={result.latex} displayMode />
          </div>
          <div className="text-4xl font-bold text-primary text-center py-2 font-mono">
            <InlineLatex latex={result.value.toLatex()} />
          </div>
          {result.value.isZero() && (
            <p className="text-sm text-accent-green bg-green-50 rounded-lg p-3">
              ✓ u · v = 0 means u and v are <strong>orthogonal</strong> (perpendicular).
            </p>
          )}
        </div>
      )}
    </div>
  );
}
