'use client';
import { useEffect, useRef } from 'react';
import type { Rational } from '@/lib/calculators/rational';
import { matrixToLatex } from '@/lib/calculators/rational';

interface MatrixDisplayProps {
  matrix: Rational[][];
  isAugmented?: boolean;
  pivotCol?: number;
  pivotRow?: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export default function MatrixDisplay({
  matrix,
  isAugmented = false,
  size = 'md',
  label,
}: MatrixDisplayProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const latex = matrixToLatex(matrix, isAugmented);
    if (!latex) return;

    import('katex').then(katex => {
      if (!ref.current) return;
      try {
        katex.default.render(latex, ref.current, {
          displayMode: true,
          throwOnError: false,
          trust: true,
        });
      } catch {
        if (ref.current) ref.current.textContent = latex;
      }
    });
  }, [matrix, isAugmented]);

  const sizeClass = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }[size];

  return (
    <div className={`${sizeClass} overflow-x-auto`}>
      {label && (
        <div className="text-xs font-medium text-slate-500 mb-1">{label}</div>
      )}
      <div ref={ref} className="min-w-max" />
    </div>
  );
}

interface InlineLatexProps {
  latex: string;
  displayMode?: boolean;
}

export function InlineLatex({ latex, displayMode = false }: InlineLatexProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current || !latex) return;
    import('katex').then(katex => {
      if (!ref.current) return;
      try {
        katex.default.render(latex, ref.current, {
          displayMode,
          throwOnError: false,
          trust: true,
        });
      } catch {
        if (ref.current) ref.current.textContent = latex;
      }
    });
  }, [latex, displayMode]);

  return <span ref={ref} className="inline-block align-middle" />;
}
