'use client';
import { useState, useCallback, useEffect } from 'react';
import { Play, RefreshCw, Shuffle, ChevronDown, Eye, EyeOff } from 'lucide-react';
import { clsx } from 'clsx';
import MatrixInput from './MatrixInput';
import MatrixDisplay from './MatrixDisplay';
import StepList from './StepList';
import SolutionPanel from './SolutionPanel';
import SaveShareBar from './SaveShareBar';
import type { RREFResult, HistoryEntry } from '@/lib/calculators/shared-types';
import { EXAMPLE_MATRICES } from '@/lib/calculators/shared-types';
import { computeRREF, matrixFromStrings, decodeMatrixFromUrl } from '@/lib/calculators/rref';
import { Rational } from '@/lib/calculators/rational';

const SIZE_PRESETS = [
  { label: '2×2', rows: 2, cols: 2 },
  { label: '2×3', rows: 2, cols: 3 },
  { label: '3×3', rows: 3, cols: 3 },
  { label: '3×4', rows: 3, cols: 4 },
  { label: '4×4', rows: 4, cols: 4 },
];

function makeEmpty(rows: number, cols: number): string[][] {
  return Array.from({ length: rows }, () => Array(cols).fill(''));
}

function makeErrors(rows: number, cols: number): boolean[][] {
  return Array.from({ length: rows }, () => Array(cols).fill(false));
}

function randomMatrix(rows: number, cols: number): string[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => {
      const n = Math.floor(Math.random() * 13) - 6;
      return n.toString();
    })
  );
}

export default function RREFCalculator() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(4);
  const [values, setValues] = useState<string[][]>(makeEmpty(3, 4));
  const [errors, setErrors] = useState<boolean[][]>(makeErrors(3, 4));
  const [isAugmented, setIsAugmented] = useState(true);
  const [result, setResult] = useState<RREFResult | null>(null);
  const [activeTab, setActiveTab] = useState<'steps' | 'solution'>('steps');
  const [verbose, setVerbose] = useState(true);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [showExamples, setShowExamples] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [verifyMode, setVerifyMode] = useState(false);
  const [showStepOps, setShowStepOps] = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      const stored = localStorage.getItem('rref_history');
      if (stored) {
        try { setHistory(JSON.parse(stored)); } catch { /* ignore */ }
      }
    } catch { /* localStorage may not be available */ }

    const params = new URLSearchParams(window.location.search);
    const encoded = params.get('m');
    if (encoded) {
      const decoded = decodeMatrixFromUrl(encoded);
      if (decoded) {
        setRows(decoded.rows);
        setCols(decoded.cols);
        setValues(decoded.matrix);
        setIsAugmented(decoded.isAugmented);
      }
    }
  }, []);

  const resizeMatrix = useCallback((newRows: number, newCols: number) => {
    setRows(newRows);
    setCols(newCols);
    setValues(prev => {
      const next = makeEmpty(newRows, newCols);
      for (let r = 0; r < Math.min(newRows, prev.length); r++) {
        for (let c = 0; c < Math.min(newCols, prev[r]?.length ?? 0); c++) {
          next[r][c] = prev[r][c];
        }
      }
      return next;
    });
    setErrors(makeErrors(newRows, newCols));
    setResult(null);
  }, []);

  const handleCellChange = useCallback((r: number, c: number, val: string) => {
    setValues(prev => {
      const next = prev.map(row => [...row]);
      next[r][c] = val;
      return next;
    });
    setErrors(prev => {
      const next = prev.map(row => [...row]);
      next[r][c] = false;
      return next;
    });
  }, []);

  const validate = (): boolean => {
    const newErrors = makeErrors(rows, cols);
    let hasError = false;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const v = values[r][c].trim();
        if (v === '' || v === '-') continue;
        try {
          const rat = Rational.from(v);
          void rat;
        } catch {
          newErrors[r][c] = true;
          hasError = true;
        }
      }
    }
    setErrors(newErrors);
    return !hasError;
  };

  const calculate = useCallback(() => {
    if (!validate()) return;
    setIsCalculating(true);
    setTimeout(() => {
      try {
        const matrix = matrixFromStrings(values);
        const res = computeRREF(matrix, isAugmented);
        setResult(res);
        setActiveTab('steps');

        const entry: HistoryEntry = {
          id: Date.now().toString(),
          matrix: values,
          rows,
          cols,
          isAugmented,
          rank: res.rank,
          solvedAt: Date.now(),
        };
        setHistory(prev => {
          const next = [entry, ...prev].slice(0, 10);
          localStorage.setItem('rref_history', JSON.stringify(next));
          return next;
        });
      } catch (e) {
        console.error(e);
      } finally {
        setIsCalculating(false);
      }
    }, 10);
  }, [values, rows, cols, isAugmented]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        calculate();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [calculate]);

  const handleRandom = () => {
    setValues(randomMatrix(rows, cols));
    setErrors(makeErrors(rows, cols));
    setResult(null);
  };

  const handleClear = () => {
    setValues(makeEmpty(rows, cols));
    setErrors(makeErrors(rows, cols));
    setResult(null);
  };

  const handleLoadExample = (idx: number) => {
    const ex = EXAMPLE_MATRICES[idx];
    setRows(ex.rows);
    setCols(ex.cols);
    setValues(ex.matrix);
    setIsAugmented(ex.isAugmented);
    setErrors(makeErrors(ex.rows, ex.cols));
    setResult(null);
    setShowExamples(false);
  };

  const handleLoadHistory = (entry: HistoryEntry) => {
    setRows(entry.rows);
    setCols(entry.cols);
    setValues(entry.matrix);
    setIsAugmented(entry.isAugmented);
    setErrors(makeErrors(entry.rows, entry.cols));
    setResult(null);
  };

  return (
    <div id="calculator" className="space-y-6">
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {result ? `RREF computed: ${result.steps.length} step${result.steps.length !== 1 ? 's' : ''}, rank ${result.rank}` : ''}
      </div>
      <div className="card p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <h2 className="text-lg font-semibold text-slate-800">Matrix Input</h2>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <span className="text-sm text-slate-600 font-medium">Augmented</span>
              <button
                role="switch"
                aria-checked={isAugmented}
                onClick={() => setIsAugmented(!isAugmented)}
                className={clsx(
                  'relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200',
                  isAugmented ? 'bg-primary' : 'bg-slate-300'
                )}
              >
                <span
                  className={clsx(
                    'inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200',
                    isAugmented ? 'translate-x-4' : 'translate-x-1'
                  )}
                />
              </button>
            </label>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-5">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-600">Rows:</label>
            <select
              value={rows}
              onChange={e => resizeMatrix(Number(e.target.value), cols)}
              className="border border-slate-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {[2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">×</span>
            <label className="text-sm font-medium text-slate-600">Cols:</label>
            <select
              value={cols}
              onChange={e => resizeMatrix(rows, Number(e.target.value))}
              className="border border-slate-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {[2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            {SIZE_PRESETS.map(p => (
              <button
                key={p.label}
                onClick={() => resizeMatrix(p.rows, p.cols)}
                className={clsx(
                  'px-2.5 py-1 rounded-md text-xs font-medium border transition-colors',
                  rows === p.rows && cols === p.cols
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary'
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <p className="text-xs text-slate-400 mb-3">
            Tab / Arrow keys to navigate cells. Enter fractions as <code className="bg-slate-100 px-1 rounded">1/2</code>. Press <kbd className="bg-slate-100 border border-slate-300 rounded px-1 font-mono">Ctrl+Enter</kbd> to calculate.
          </p>
          <MatrixInput
            rows={rows}
            cols={cols}
            values={values}
            isAugmented={isAugmented}
            onChange={handleCellChange}
            errors={errors}
            onSubmit={calculate}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={calculate}
            disabled={isCalculating}
            className="btn-primary flex items-center gap-2"
          >
            <Play size={16} />
            {isCalculating ? 'Calculating...' : 'Calculate RREF'}
          </button>

          <button onClick={handleRandom} className="btn-secondary flex items-center gap-2">
            <Shuffle size={15} />
            Random
          </button>

          <div className="relative">
            <button
              onClick={() => setShowExamples(!showExamples)}
              className="btn-secondary flex items-center gap-2"
            >
              Load Example
              <ChevronDown size={14} />
            </button>
            {showExamples && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-slate-200 rounded-xl shadow-lg z-20 overflow-hidden">
                {EXAMPLE_MATRICES.map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => handleLoadExample(i)}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                  >
                    <div className="text-sm font-medium text-slate-800">{ex.label}</div>
                    <div className="text-xs text-slate-400">{ex.description}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={handleClear} className="btn-secondary flex items-center gap-2">
            <RefreshCw size={14} />
            Clear
          </button>
        </div>

        <div className="mt-4">
          <SaveShareBar
            rawMatrix={values}
            rows={rows}
            cols={cols}
            isAugmented={isAugmented}
            result={result}
            history={history}
            onLoadHistory={handleLoadHistory}
          />
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-200">
            <button
              onClick={() => setActiveTab('steps')}
              className={clsx(
                'pb-2 px-1 text-sm font-medium border-b-2 transition-colors -mb-px',
                activeTab === 'steps'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              )}
            >
              Step-by-Step ({result.steps.length})
            </button>
            <button
              onClick={() => setActiveTab('solution')}
              className={clsx(
                'pb-2 px-1 text-sm font-medium border-b-2 transition-colors -mb-px',
                activeTab === 'solution'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              )}
            >
              Solution & Result
            </button>
            <div className="ml-auto flex items-center gap-2 pb-1">
              <button
                onClick={() => setVerbose(!verbose)}
                className="btn-ghost flex items-center gap-1.5 text-xs"
                title={verbose ? 'Switch to terse mode' : 'Switch to verbose mode'}
              >
                {verbose ? <EyeOff size={13} /> : <Eye size={13} />}
                {verbose ? 'Terse' : 'Verbose'}
              </button>
            </div>
          </div>

          <div>
            {activeTab === 'steps' ? (
              <StepList steps={result.steps} verbose={verbose} />
            ) : (
              <SolutionPanel result={result} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
