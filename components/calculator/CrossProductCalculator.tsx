'use client';
import { useState } from 'react';
import { Play, RefreshCw } from 'lucide-react';
import VectorInput from './VectorInput';
import { InlineLatex } from './MatrixDisplay';
import { Rational } from '@/lib/calculators/rational';
import { computeCrossProduct } from '@/lib/calculators/operations';

function emptyVec(): string[] { return ['', '', '']; }

export default function CrossProductCalculator() {
  const [u, setU] = useState<string[]>(emptyVec());
  const [v, setV] = useState<string[]>(emptyVec());
  const [result, setResult] = useState<ReturnType<typeof computeCrossProduct> | null>(null);

  const calculate = () => {
    const uR = u.map(x => Rational.from(x.trim() || '0'));
    const vR = v.map(x => Rational.from(x.trim() || '0'));
    setResult(computeCrossProduct(uR, vR));
  };

  const hasError = result && 'error' in result;
  const hasResult = result && !('error' in result);

  return (
    <div className="space-y-6">
      <div className="card p-5">
        <p className="text-sm text-slate-500 mb-4">Enter two 3-dimensional vectors.</p>
        <div className="flex flex-wrap gap-8 mb-4">
          <VectorInput label="u" dim={3} values={u} onChange={(i, v) => setU(prev => { const n=[...prev]; n[i]=v; return n; })} />
          <VectorInput label="v" dim={3} values={v} onChange={(i, val) => setV(prev => { const n=[...prev]; n[i]=val; return n; })} />
        </div>
        <div className="flex gap-2">
          <button onClick={calculate} className="btn-primary flex items-center gap-2"><Play size={15} />Calculate u × v</button>
          <button onClick={() => { setU(emptyVec()); setV(emptyVec()); setResult(null); }} className="btn-secondary flex items-center gap-2"><RefreshCw size={14} />Clear</button>
        </div>
      </div>

      {hasError && (
        <div className="card p-4 border-l-4 border-l-accent-rose">
          <p className="text-sm text-accent-rose">{'error' in result && result.error}</p>
        </div>
      )}

      {hasResult && !('error' in result) && (
        <div className="card p-5 border-l-4 border-l-accent-purple space-y-3">
          <h3 className="font-semibold text-slate-800">u × v</h3>
          <div className="bg-slate-50 rounded-lg p-3 overflow-x-auto">
            <InlineLatex latex={result.latex} displayMode />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {result.result.map((c, i) => (
              <div key={i} className="bg-white rounded-lg border border-slate-200 p-3 text-center">
                <div className="text-xs text-slate-400 mb-1">{['i', 'j', 'k'][i]}-component</div>
                <div className="text-xl font-bold text-primary font-mono"><InlineLatex latex={c.toLatex()} /></div>
              </div>
            ))}
          </div>
          <div className="space-y-1">
            {result.steps.map((s, i) => (
              <div key={i} className="text-xs bg-slate-50 rounded p-2 border border-slate-100 overflow-x-auto font-mono">
                <InlineLatex latex={s} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
