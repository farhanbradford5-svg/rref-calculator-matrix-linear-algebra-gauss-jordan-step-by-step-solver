import { Rational, copyMatrix, matrixToLatex } from './rational';
import { computeRREF } from './rref';
import type { Matrix, Step } from './shared-types';

export interface InverseResult {
  success: boolean;
  originalMatrix: Matrix;
  inverseMatrix?: Matrix;
  steps: Step[];
  errorMessage?: string;
  n: number;
}

function identityMatrix(n: number): Matrix {
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? Rational.ONE : Rational.ZERO))
  );
}

export function computeInverse(inputMatrix: Matrix): InverseResult {
  const n = inputMatrix.length;

  if (n === 0 || inputMatrix.some(row => row.length !== n)) {
    return {
      success: false,
      originalMatrix: inputMatrix,
      steps: [],
      errorMessage: 'Matrix must be square (n×n) to compute an inverse.',
      n,
    };
  }

  const identity = identityMatrix(n);
  const augmented: Matrix = inputMatrix.map((row, i) => [...row, ...identity[i]]);

  const rrefResult = computeRREF(augmented, false);

  const leftHalf = rrefResult.rrefMatrix.map(row => row.slice(0, n));
  const isIdentity = leftHalf.every((row, i) =>
    row.every((val, j) => (i === j ? val.isOne() : val.isZero()))
  );

  if (!isIdentity) {
    return {
      success: false,
      originalMatrix: inputMatrix,
      steps: rrefResult.steps,
      errorMessage: 'This matrix is singular (det = 0) and has no inverse.',
      n,
    };
  }

  const inverseMatrix = rrefResult.rrefMatrix.map(row => row.slice(n));

  return {
    success: true,
    originalMatrix: copyMatrix(inputMatrix),
    inverseMatrix,
    steps: rrefResult.steps,
    n,
  };
}
