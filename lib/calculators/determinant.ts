import { Rational, copyMatrix } from './rational';
import type { Matrix } from './shared-types';

export interface DetStep {
  description: string;
  latex: string;
  subMatrix?: Matrix;
  sign?: number;
  value?: Rational;
}

export interface DeterminantResult {
  success: boolean;
  n: number;
  value?: Rational;
  steps: DetStep[];
  errorMessage?: string;
}

function getMinor(matrix: Matrix, row: number, col: number): Matrix {
  return matrix
    .filter((_, r) => r !== row)
    .map(r => r.filter((_, c) => c !== col));
}

function cofactorExpansion(matrix: Matrix, depth: number): {
  value: Rational;
  steps: DetStep[];
} {
  const n = matrix.length;
  if (n === 1) return { value: matrix[0][0], steps: [] };

  if (n === 2) {
    const val = matrix[0][0].mul(matrix[1][1]).sub(matrix[0][1].mul(matrix[1][0]));
    const steps: DetStep[] = [
      {
        description: '2×2 determinant formula',
        latex: `\\det\\begin{pmatrix}${matrix[0][0].toLatex()} & ${matrix[0][1].toLatex()} \\\\ ${matrix[1][0].toLatex()} & ${matrix[1][1].toLatex()}\\end{pmatrix} = (${matrix[0][0].toLatex()})(${matrix[1][1].toLatex()}) - (${matrix[0][1].toLatex()})(${matrix[1][0].toLatex()}) = ${val.toLatex()}`,
        value: val,
      },
    ];
    return { value: val, steps };
  }

  const steps: DetStep[] = [];
  let det = Rational.ZERO;
  const expansionTerms: string[] = [];

  for (let j = 0; j < n; j++) {
    const entry = matrix[0][j];
    const sign = j % 2 === 0 ? 1 : -1;
    const signRat = sign === 1 ? Rational.ONE : Rational.NEG_ONE;
    const minor = getMinor(matrix, 0, j);
    const { value: minorDet, steps: subSteps } = cofactorExpansion(minor, depth + 1);
    const cofactor = signRat.mul(minorDet);
    const term = entry.mul(cofactor);
    det = det.add(term);

    const signStr = sign === 1 ? '+' : '-';
    expansionTerms.push(`${signStr}${entry.toLatex()} \\cdot M_{1,${j + 1}}`);

    if (depth < 2) {
      steps.push({
        description: `Cofactor C₁,${j + 1} = ${signStr === '+' ? '' : '-'}det(M₁,${j + 1})`,
        latex: `C_{1,${j + 1}} = ${signStr === '+' ? '' : '-'}\\det(M_{1,${j + 1}}) = ${cofactor.toLatex()}`,
        subMatrix: minor,
        sign,
        value: cofactor,
      });
    }
  }

  steps.unshift({
    description: `Cofactor expansion along row 1`,
    latex: `\\det(A) = ${expansionTerms.join(' ')} = ${det.toLatex()}`,
    value: det,
  });

  return { value: det, steps };
}

export function computeDeterminant(inputMatrix: Matrix): DeterminantResult {
  const n = inputMatrix.length;

  if (n === 0 || inputMatrix.some(row => row.length !== n)) {
    return {
      success: false,
      n,
      steps: [],
      errorMessage: 'Determinant requires a square (n×n) matrix.',
    };
  }

  const { value, steps } = cofactorExpansion(inputMatrix, 0);

  return {
    success: true,
    n,
    value,
    steps,
  };
}
