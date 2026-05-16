'use client';
import { useRef, useCallback } from 'react';
import { clsx } from 'clsx';

interface MatrixInputProps {
  rows: number;
  cols: number;
  values: string[][];
  isAugmented: boolean;
  onChange: (row: number, col: number, value: string) => void;
  errors: boolean[][];
  onSubmit?: () => void;
}

export default function MatrixInput({
  rows,
  cols,
  values,
  isAugmented,
  onChange,
  errors,
  onSubmit,
}: MatrixInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[][]>(
    Array.from({ length: rows }, () => Array(cols).fill(null))
  );

  const focusCell = useCallback((row: number, col: number) => {
    const el = inputRefs.current[row]?.[col];
    if (el) {
      el.focus();
      el.select();
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, row: number, col: number) => {
      if (e.key === 'ArrowRight' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault();
        if (col + 1 < cols) focusCell(row, col + 1);
        else if (row + 1 < rows) focusCell(row + 1, 0);
      } else if (e.key === 'ArrowLeft' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault();
        if (col - 1 >= 0) focusCell(row, col - 1);
        else if (row - 1 >= 0) focusCell(row - 1, cols - 1);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (row + 1 < rows) focusCell(row + 1, col);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (row - 1 >= 0) focusCell(row - 1, col);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (row + 1 < rows) focusCell(row + 1, col);
        else if (onSubmit) onSubmit();
        else focusCell(0, 0);
      }
    },
    [rows, cols, focusCell]
  );

  const colLabels = Array.from({ length: cols }, (_, j) => {
    if (isAugmented && j === cols - 1) return 'b';
    return `x${subscript(j + 1)}`;
  });

  return (
    <div className="overflow-x-auto">
      <div className="inline-flex flex-col gap-0 min-w-max">
        <div className="flex items-center gap-1 mb-1 pl-8">
          {colLabels.map((label, j) => (
            <div
              key={j}
              className={clsx(
                'w-[52px] text-center text-xs font-medium text-slate-400 select-none',
                isAugmented && j === cols - 2 && 'mr-3'
              )}
            >
              {label}
            </div>
          ))}
        </div>

        <div className="flex items-stretch gap-0">
          <div className="flex flex-col justify-around pr-1.5 py-2">
            {Array.from({ length: rows }, (_, i) => (
              <div key={i} className="flex items-center justify-end h-[52px] text-xs font-medium text-slate-400 w-6 select-none">
                {i + 1}
              </div>
            ))}
          </div>

          <div className="flex items-center">
            <BracketLeft height={rows * 52 + (rows - 1) * 6} />
          </div>

          <div className="flex flex-col gap-1.5 px-2 py-2">
            {Array.from({ length: rows }, (_, i) => (
              <div key={i} className="flex gap-1.5 items-center">
                {Array.from({ length: cols }, (_, j) => (
                  <div key={j} className="flex items-center gap-1.5">
                    {isAugmented && j === cols - 1 && (
                      <div className="w-px h-10 bg-slate-400 mx-1" />
                    )}
                    <input
                      ref={el => {
                        if (!inputRefs.current[i]) inputRefs.current[i] = [];
                        inputRefs.current[i][j] = el;
                      }}
                      type="text"
                      inputMode="decimal"
                      className={clsx(
                        'matrix-cell w-[52px] h-[52px]',
                        errors[i]?.[j] && 'error'
                      )}
                      value={values[i]?.[j] ?? ''}
                      onChange={e => onChange(i, j, e.target.value)}
                      onKeyDown={e => handleKeyDown(e, i, j)}
                      onFocus={e => e.target.select()}
                      placeholder="0"
                      aria-label={`Row ${i + 1}, column ${j + 1}`}
                      autoComplete="off"
                      spellCheck={false}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="flex items-center">
            <BracketRight height={rows * 52 + (rows - 1) * 6} />
          </div>
        </div>
      </div>
    </div>
  );
}

function subscript(n: number): string {
  const subs = '₀₁₂₃₄₅₆₇₈₉';
  return String(n).split('').map(d => subs[Number(d)]).join('');
}

function BracketLeft({ height }: { height: number }) {
  const w = 12;
  return (
    <svg width={w} height={height} viewBox={`0 0 ${w} ${height}`} fill="none">
      <path
        d={`M ${w} 2 L 4 2 L 4 ${height - 2} L ${w} ${height - 2}`}
        stroke="#475569"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function BracketRight({ height }: { height: number }) {
  const w = 12;
  return (
    <svg width={w} height={height} viewBox={`0 0 ${w} ${height}`} fill="none">
      <path
        d={`M 0 2 L ${w - 4} 2 L ${w - 4} ${height - 2} L 0 ${height - 2}`}
        stroke="#475569"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
