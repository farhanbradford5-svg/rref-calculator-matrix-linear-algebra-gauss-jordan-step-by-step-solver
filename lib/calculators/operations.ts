import { Rational } from './rational';
import type { Matrix } from './shared-types';

// ─── Matrix Multiply ────────────────────────────────────────────────────────

export interface MultiplyStep {
  row: number;
  col: number;
  terms: string[];
  value: Rational;
  latex: string;
}

export interface MultiplyResult {
  success: boolean;
  result?: Matrix;
  steps: MultiplyStep[];
  errorMessage?: string;
  rowsA: number;
  colsA: number;
  rowsB: number;
  colsB: number;
}

export function computeMultiply(A: Matrix, B: Matrix): MultiplyResult {
  const rowsA = A.length;
  const colsA = rowsA > 0 ? A[0].length : 0;
  const rowsB = B.length;
  const colsB = rowsB > 0 ? B[0].length : 0;

  if (colsA !== rowsB) {
    return {
      success: false,
      steps: [],
      errorMessage: `Cannot multiply: A is ${rowsA}×${colsA} and B is ${rowsB}×${colsB}. The number of columns of A must equal the number of rows of B.`,
      rowsA, colsA, rowsB, colsB,
    };
  }

  const steps: MultiplyStep[] = [];
  const result: Matrix = Array.from({ length: rowsA }, () =>
    Array(colsB).fill(Rational.ZERO)
  );

  for (let i = 0; i < rowsA; i++) {
    for (let j = 0; j < colsB; j++) {
      let sum = Rational.ZERO;
      const terms: string[] = [];
      for (let k = 0; k < colsA; k++) {
        const term = A[i][k].mul(B[k][j]);
        sum = sum.add(term);
        terms.push(`(${A[i][k].toLatex()})(${B[k][j].toLatex()})`);
      }
      result[i][j] = sum;
      const latex = `C_{${i + 1},${j + 1}} = ${terms.join(' + ')} = ${sum.toLatex()}`;
      steps.push({ row: i, col: j, terms, value: sum, latex });
    }
  }

  return { success: true, result, steps, rowsA, colsA, rowsB, colsB };
}

// ─── Matrix Transpose ────────────────────────────────────────────────────────

export interface TransposeResult {
  original: Matrix;
  transposed: Matrix;
  rows: number;
  cols: number;
}

export function computeTranspose(matrix: Matrix): TransposeResult {
  const rows = matrix.length;
  const cols = rows > 0 ? matrix[0].length : 0;
  const transposed: Matrix = Array.from({ length: cols }, (_, j) =>
    Array.from({ length: rows }, (_, i) => matrix[i][j])
  );
  return { original: matrix, transposed, rows, cols };
}

// ─── Cross Product ────────────────────────────────────────────────────────────

export interface CrossProductResult {
  u: Rational[];
  v: Rational[];
  result: Rational[];
  latex: string;
  steps: string[];
}

export function computeCrossProduct(u: Rational[], v: Rational[]): CrossProductResult | { error: string } {
  if (u.length !== 3 || v.length !== 3) {
    return { error: 'Cross product is only defined for 3-dimensional vectors.' };
  }
  const [u1, u2, u3] = u;
  const [v1, v2, v3] = v;
  const i = u2.mul(v3).sub(u3.mul(v2));
  const j = u3.mul(v1).sub(u1.mul(v3));
  const k = u1.mul(v2).sub(u2.mul(v1));
  const result = [i, j, k];

  const latex = `\\mathbf{u} \\times \\mathbf{v} = \\begin{vmatrix}\\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\ ${u1.toLatex()} & ${u2.toLatex()} & ${u3.toLatex()} \\\\ ${v1.toLatex()} & ${v2.toLatex()} & ${v3.toLatex()}\\end{vmatrix} = \\langle ${i.toLatex()},\\, ${j.toLatex()},\\, ${k.toLatex()} \\rangle`;

  const steps = [
    `i\\text{-component: } (${u2.toLatex()})(${v3.toLatex()}) - (${u3.toLatex()})(${v2.toLatex()}) = ${i.toLatex()}`,
    `j\\text{-component: } -[(${u1.toLatex()})(${v3.toLatex()}) - (${u3.toLatex()})(${v1.toLatex()})] = ${j.toLatex()}`,
    `k\\text{-component: } (${u1.toLatex()})(${v2.toLatex()}) - (${u2.toLatex()})(${v1.toLatex()}) = ${k.toLatex()}`,
  ];

  return { u, v, result, latex, steps };
}

// ─── Dot Product ────────────────────────────────────────────────────────────

export interface DotProductResult {
  u: Rational[];
  v: Rational[];
  value: Rational;
  terms: string[];
  latex: string;
  dimension: number;
}

export function computeDotProduct(u: Rational[], v: Rational[]): DotProductResult | { error: string } {
  if (u.length !== v.length) {
    return { error: `Vectors must have the same dimension. Got ${u.length} and ${v.length}.` };
  }
  if (u.length === 0) {
    return { error: 'Vectors must have at least one component.' };
  }

  let sum = Rational.ZERO;
  const terms: string[] = [];
  for (let i = 0; i < u.length; i++) {
    const term = u[i].mul(v[i]);
    sum = sum.add(term);
    terms.push(`(${u[i].toLatex()})(${v[i].toLatex()})`);
  }

  const latex = `\\mathbf{u} \\cdot \\mathbf{v} = ${terms.join(' + ')} = ${sum.toLatex()}`;

  return { u, v, value: sum, terms, latex, dimension: u.length };
}

// ─── Simplify Radicals ───────────────────────────────────────────────────────

export interface RadicalResult {
  input: number;
  coefficient: number;
  radicand: number;
  isNegative: boolean;
  isInteger: boolean;
  latex: string;
  steps: string[];
  errorMessage?: string;
}

function primeFactors(n: number): number[] {
  const factors: number[] = [];
  let d = 2;
  while (d * d <= n) {
    while (n % d === 0) { factors.push(d); n = Math.floor(n / d); }
    d++;
  }
  if (n > 1) factors.push(n);
  return factors;
}

export function simplifyRadical(input: number): RadicalResult {
  if (!Number.isInteger(input)) {
    return {
      input, coefficient: 1, radicand: input, isNegative: false,
      isInteger: false, latex: '', steps: [],
      errorMessage: 'Enter a positive integer.',
    };
  }

  const isNegative = input < 0;
  let n = Math.abs(input);

  if (n === 0) {
    return {
      input, coefficient: 0, radicand: 0, isNegative: false,
      isInteger: true, latex: '\\sqrt{0} = 0',
      steps: ['\\sqrt{0} = 0'],
    };
  }

  const factors = primeFactors(n);
  const factorCount: Record<number, number> = {};
  for (const f of factors) factorCount[f] = (factorCount[f] || 0) + 1;

  let coefficient = 1;
  let radicand = 1;
  const steps: string[] = [];

  const factorLatex = Object.entries(factorCount)
    .map(([p, e]) => e > 1 ? `${p}^{${e}}` : p)
    .join(' \\cdot ');
  steps.push(`${n} = ${factorLatex}`);

  for (const [prime, exp] of Object.entries(factorCount)) {
    const p = Number(prime);
    const pairs = Math.floor(exp / 2);
    const remainder = exp % 2;
    if (pairs > 0) {
      coefficient *= Math.pow(p, pairs);
      steps.push(`\\sqrt{${p}^{${exp}}} = ${p}^{${pairs}}\\sqrt{${remainder > 0 ? p : ''}}`);
    }
    if (remainder > 0) radicand *= p;
  }

  const isInteger = radicand === 1;
  let latex: string;
  const negStr = isNegative ? 'i' : '';

  if (isInteger) {
    latex = `\\sqrt{${n}} = ${coefficient}${isNegative ? 'i' : ''}`;
    steps.push(`\\sqrt{${n}} = ${coefficient}`);
  } else if (coefficient === 1) {
    latex = `\\sqrt{${n}} = \\sqrt{${radicand}}${negStr}`;
  } else {
    latex = `\\sqrt{${n}} = ${coefficient}\\sqrt{${radicand}}${negStr}`;
    steps.push(`\\sqrt{${n}} = ${coefficient}\\sqrt{${radicand}}`);
  }

  return { input, coefficient, radicand, isNegative, isInteger, latex, steps };
}
