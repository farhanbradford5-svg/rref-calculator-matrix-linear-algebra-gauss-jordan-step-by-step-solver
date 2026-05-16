'use client';
import { useState } from 'react';
import type { Step } from '@/lib/calculators/shared-types';
import MatrixDisplay from './MatrixDisplay';
import { InlineLatex } from './MatrixDisplay';
import { ChevronDown, ChevronRight, ArrowLeftRight, Divide, Minus, Info } from 'lucide-react';
import { clsx } from 'clsx';

interface StepListProps {
  steps: Step[];
  verbose: boolean;
}

const STEP_ICONS = {
  swap: <ArrowLeftRight size={14} className="text-accent-purple shrink-0" />,
  scale: <Divide size={14} className="text-accent-green shrink-0" />,
  eliminate: <Minus size={14} className="text-primary shrink-0" />,
  info: <Info size={14} className="text-slate-400 shrink-0" />,
};

const STEP_COLORS = {
  swap: 'border-l-accent-purple bg-purple-50',
  scale: 'border-l-accent-green bg-green-50',
  eliminate: 'border-l-primary bg-blue-50',
  info: 'border-l-slate-300 bg-slate-50',
};

export default function StepList({ steps, verbose }: StepListProps) {
  const [expanded, setExpanded] = useState<Set<number>>(new Set([0]));

  const toggle = (i: number) =>
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const expandAll = () => setExpanded(new Set(steps.map((_, i) => i)));
  const collapseAll = () => setExpanded(new Set());

  if (steps.length === 0) {
    return (
      <div className="text-center py-8 text-slate-400 text-sm">
        Matrix is already in RREF — no steps needed.
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-slate-500">{steps.length} elimination step{steps.length !== 1 ? 's' : ''}</span>
        <div className="flex gap-2">
          <button onClick={expandAll} className="btn-ghost text-xs">Expand all</button>
          <button onClick={collapseAll} className="btn-ghost text-xs">Collapse all</button>
        </div>
      </div>

      <div className="space-y-2">
        {steps.map((step, i) => {
          const isOpen = expanded.has(i);
          return (
            <div
              key={i}
              className={clsx(
                'step-item border-l-4 step-enter',
                STEP_COLORS[step.operation]
              )}
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <button
                className="step-header w-full text-left"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-2 shrink-0 mt-0.5">
                  <span className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 shrink-0">
                    {i + 1}
                  </span>
                  {STEP_ICONS[step.operation]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-800 font-mono">
                    <InlineLatex latex={step.latex} />
                  </div>
                  {verbose && (
                    <div className="text-xs text-slate-500 mt-0.5">{step.explanation}</div>
                  )}
                </div>
                <div className="shrink-0 text-slate-400">
                  {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1">
                  <p className="text-sm text-slate-600 mb-3">
                    <strong>Operation:</strong>{' '}
                    <InlineLatex latex={step.description} />
                  </p>
                  {verbose && (
                    <p className="text-sm text-slate-500 mb-3">
                      <strong>Explanation:</strong> {step.explanation}
                    </p>
                  )}
                  <div className="bg-white rounded-lg border border-slate-200 p-3 overflow-x-auto">
                    <p className="text-xs text-slate-400 mb-2 font-medium uppercase tracking-wide">Resulting matrix</p>
                    <MatrixDisplay
                      matrix={step.matrix}
                      isAugmented={false}
                      size="sm"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
