'use client';
import type { RREFResult } from '@/lib/calculators/shared-types';
import MatrixDisplay from './MatrixDisplay';
import { InlineLatex } from './MatrixDisplay';
import { CheckCircle, AlertCircle, Infinity, Hash } from 'lucide-react';
import { clsx } from 'clsx';

interface SolutionPanelProps {
  result: RREFResult;
}

export default function SolutionPanel({ result }: SolutionPanelProps) {
  const { solution, rrefMatrix, rank, isAugmented, cols, rows } = result;

  return (
    <div className="space-y-6">
      <div className="card p-5">
        <h3 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-primary text-white text-xs flex items-center justify-center font-bold">R</span>
          RREF Result
        </h3>
        <div className="overflow-x-auto">
          <MatrixDisplay
            matrix={rrefMatrix}
            isAugmented={isAugmented}
            size="lg"
          />
        </div>
      </div>

      <div className="card p-5">
        <h3 className="text-base font-semibold text-slate-800 mb-4">Matrix Properties</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatBadge label="Rank" value={rank.toString()} icon={<Hash size={14} />} color="blue" />
          <StatBadge label="Rows" value={rows.toString()} icon={<Hash size={14} />} color="slate" />
          <StatBadge
            label="Nullity"
            value={isAugmented ? String((cols - 1) - rank) : String(cols - rank)}
            icon={<Hash size={14} />}
            color="slate"
          />
        </div>
      </div>

      {isAugmented && solution && (
        <div className={clsx(
          'card p-5',
          solution.type === 'unique' && 'border-accent-green',
          solution.type === 'infinite' && 'border-accent-purple',
          solution.type === 'no_solution' && 'border-accent-rose',
        )}>
          <h3 className="text-base font-semibold text-slate-800 mb-4">
            Solution Interpretation
          </h3>

          {solution.type === 'no_solution' && (
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-accent-rose shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-accent-rose">No Solution (Inconsistent System)</p>
                <p className="text-sm text-slate-600 mt-1">
                  The system of equations has no solution. A row of the augmented matrix has all zeros
                  on the left but a non-zero constant on the right — this is a contradiction (0 = c ≠ 0).
                </p>
              </div>
            </div>
          )}

          {solution.type === 'unique' && solution.variables && (
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-accent-green shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-accent-green mb-3">Unique Solution</p>
                <div className="space-y-2">
                  {Object.entries(solution.variables).map(([v, val]) => (
                    <div key={v} className="flex items-center gap-2 text-sm">
                      <InlineLatex latex={`${v} = ${val}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {solution.type === 'infinite' && (
            <div className="flex items-start gap-3">
              <Infinity size={20} className="text-accent-purple shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-accent-purple mb-2">Infinitely Many Solutions</p>
                <p className="text-sm text-slate-600 mb-3">
                  The system has {solution.freeVariables?.length} free variable{solution.freeVariables?.length !== 1 ? 's' : ''}:{' '}
                  {solution.freeVariables?.map(v => (
                    <InlineLatex key={v} latex={v} />
                  ))}
                </p>
                {solution.parametricForm && (
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                    <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wide">Parametric Form</p>
                    <InlineLatex latex={solution.parametricForm} displayMode />
                  </div>
                )}
                <p className="text-xs text-slate-500 mt-2">
                  Rank = {solution.rank}, Nullity = {solution.nullity}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {!isAugmented && (
        <div className="card p-5 bg-surface">
          <h3 className="text-sm font-semibold text-slate-700 mb-2">About This Result</h3>
          <p className="text-sm text-slate-600">
            This is a non-augmented matrix reduced to RREF. The rank is {rank}, meaning there are{' '}
            {rank} linearly independent rows. To solve a system of equations, toggle{' '}
            <strong>Augmented Matrix</strong> mode and include your constants as the last column.
          </p>
        </div>
      )}
    </div>
  );
}

function StatBadge({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: 'blue' | 'slate' | 'green' | 'purple';
}) {
  const colors = {
    blue: 'bg-primary-50 border-primary-100 text-primary',
    slate: 'bg-slate-50 border-slate-200 text-slate-600',
    green: 'bg-green-50 border-green-100 text-accent-green',
    purple: 'bg-purple-50 border-purple-100 text-accent-purple',
  };

  return (
    <div className={clsx('rounded-lg border p-3', colors[color])}>
      <div className="flex items-center gap-1.5 text-xs font-medium mb-1 opacity-80">
        {icon}
        {label}
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
