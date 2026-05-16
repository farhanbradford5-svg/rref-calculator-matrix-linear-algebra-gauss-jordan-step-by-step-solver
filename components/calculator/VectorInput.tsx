'use client';
import { useRef, useCallback } from 'react';
import { clsx } from 'clsx';

interface VectorInputProps {
  label: string;
  dim: number;
  values: string[];
  onChange: (i: number, v: string) => void;
  subscripts?: boolean;
}

const SUB = '₀₁₂₃₄₅₆₇₈₉';
function sub(n: number): string { return String(n).split('').map(d => SUB[Number(d)]).join(''); }

export default function VectorInput({ label, dim, values, onChange, subscripts = true }: VectorInputProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleKey = useCallback((e: React.KeyboardEvent, i: number) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter') { e.preventDefault(); refs.current[i + 1]?.focus(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); refs.current[i - 1]?.focus(); }
  }, []);

  return (
    <div className="inline-flex flex-col gap-1">
      <div className="text-sm font-semibold text-slate-700 mb-1">{label}</div>
      <div className="flex items-stretch gap-0">
        <svg width="10" height={dim * 54 + (dim - 1) * 6} viewBox={`0 0 10 ${dim * 54}`} fill="none" className="mr-1">
          <path d={`M 9 2 L 3 2 L 3 ${dim*54-2} L 9 ${dim*54-2}`} stroke="#475569" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        </svg>
        <div className="flex flex-col gap-1.5">
          {Array.from({ length: dim }, (_, i) => (
            <div key={i} className="flex items-center gap-1.5">
              {subscripts && <span className="text-xs text-slate-400 w-5 text-right">{sub(i+1)}</span>}
              <input
                ref={el => { refs.current[i] = el; }}
                type="text" inputMode="decimal"
                value={values[i] ?? ''}
                onChange={e => onChange(i, e.target.value)}
                onKeyDown={e => handleKey(e, i)}
                onFocus={e => e.target.select()}
                placeholder="0"
                className="matrix-cell w-[56px] h-[48px]"
                aria-label={`${label} component ${i + 1}`}
              />
            </div>
          ))}
        </div>
        <svg width="10" height={dim * 54 + (dim - 1) * 6} viewBox={`0 0 10 ${dim * 54}`} fill="none" className="ml-1">
          <path d={`M 1 2 L 7 2 L 7 ${dim*54-2} L 1 ${dim*54-2}`} stroke="#475569" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        </svg>
      </div>
    </div>
  );
}
