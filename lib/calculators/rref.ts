import { Rational, matrixToLatex, copyMatrix } from './rational';
import type { Matrix, Step, RREFResult, SolutionType } from './shared-types';

function describeScale(row: number, scalar: Rational): string {
  const r = `R_{${row + 1}}`;
  if (scalar.isOne()) return `${r} \\leftarrow ${r}`;
  return `${r} \\leftarrow ${scalar.toLatex()} ${r}`;
}

function describeEliminate(targetRow: number, sourceRow: number, factor: Rational): string {
  const rt = `R_{${targetRow + 1}}`;
  const rs = `R_{${sourceRow + 1}}`;
  if (factor.isOne()) {
    return `${rt} \\leftarrow ${rt} - ${rs}`;
  }
  if (factor.neg().isOne()) {
    return `${rt} \\leftarrow ${rt} + ${rs}`;
  }
  const fNeg = factor.neg();
  if (fNeg.isNeg()) {
    return `${rt} \\leftarrow ${rt} - ${factor.abs().toLatex()} ${rs}`;
  }
  return `${rt} \\leftarrow ${rt} + ${fNeg.toLatex()} ${rs}`;
}

function explainScale(row: number, scalar: Rational): string {
  if (scalar.isOne()) return `Row ${row + 1} is already scaled.`;
  return `Divide row ${row + 1} by ${scalar.toLatex()} to make the leading entry equal to 1.`;
}

function explainEliminate(targetRow: number, sourceRow: number, factor: Rational, col: number): string {
  const fStr = factor.toLatex();
  const action = factor.isNeg()
    ? `add ${factor.abs().toLatex()} × row ${sourceRow + 1} to`
    : `subtract ${factor.abs().toLatex()} × row ${sourceRow + 1} from`;
  return `${action.charAt(0).toUpperCase() + action.slice(1)} row ${targetRow + 1} to zero out column ${col + 1}.`;
}

export function computeRREF(
  inputMatrix: Matrix,
  isAugmented: boolean
): RREFResult {
  const rows = inputMatrix.length;
  const cols = rows > 0 ? inputMatrix[0].length : 0;

  let matrix = copyMatrix(inputMatrix);
  const steps: Step[] = [];
  const pivotColumns: number[] = [];

  let pivotRow = 0;

  const addStep = (
    operation: Step['operation'],
    description: string,
    explanation: string,
    latex: string,
    currentMatrix: Matrix,
    pRow?: number,
    pCol?: number
  ) => {
    steps.push({
      operation,
      description,
      explanation,
      latex,
      matrix: copyMatrix(currentMatrix),
      pivotRow: pRow,
      pivotCol: pCol,
    });
  };

  for (let col = 0; col < cols - (isAugmented ? 1 : 0); col++) {
    if (pivotRow >= rows) break;

    let pivotFound = -1;
    for (let r = pivotRow; r < rows; r++) {
      if (!matrix[r][col].isZero()) {
        pivotFound = r;
        break;
      }
    }

    if (pivotFound === -1) continue;

    if (pivotFound !== pivotRow) {
      const tmp = matrix[pivotFound];
      matrix[pivotFound] = matrix[pivotRow];
      matrix[pivotRow] = tmp;
      addStep(
        'swap',
        `Swap rows ${pivotRow + 1} and ${pivotFound + 1}: R_{${pivotRow + 1}} \\leftrightarrow R_{${pivotFound + 1}}`,
        `Move a non-zero entry into the pivot position in column ${col + 1}.`,
        `R_{${pivotRow + 1}} \\leftrightarrow R_{${pivotFound + 1}}`,
        matrix,
        pivotRow,
        col
      );
    }

    const pivotVal = matrix[pivotRow][col];

    if (!pivotVal.isOne()) {
      const scalar = Rational.ONE.div(pivotVal);
      matrix[pivotRow] = matrix[pivotRow].map(v => v.mul(scalar));
      addStep(
        'scale',
        describeScale(pivotRow, scalar),
        explainScale(pivotRow, pivotVal),
        describeScale(pivotRow, scalar),
        matrix,
        pivotRow,
        col
      );
    }

    pivotColumns.push(col);

    for (let r = 0; r < rows; r++) {
      if (r === pivotRow) continue;
      const factor = matrix[r][col];
      if (factor.isZero()) continue;
      matrix[r] = matrix[r].map((v, j) =>
        v.sub(factor.mul(matrix[pivotRow][j]))
      );
      addStep(
        'eliminate',
        `Eliminate column ${col + 1} in row ${r + 1}: ${describeEliminate(r, pivotRow, factor)}`,
        explainEliminate(r, pivotRow, factor, col),
        describeEliminate(r, pivotRow, factor),
        matrix,
        pivotRow,
        col
      );
    }

    pivotRow++;
  }

  const rank = pivotColumns.length;

  let solution: SolutionType | null = null;

  if (isAugmented && cols >= 2) {
    const varCount = cols - 1;
    let inconsistent = false;

    for (let r = 0; r < rows; r++) {
      const allZero = matrix[r].slice(0, varCount).every(v => v.isZero());
      const constNonZero = !matrix[r][varCount].isZero();
      if (allZero && constNonZero) {
        inconsistent = true;
        break;
      }
    }

    if (inconsistent) {
      solution = { type: 'no_solution', rank };
    } else if (rank === varCount) {
      const variables: Record<string, string> = {};
      for (let i = 0; i < varCount; i++) {
        const sub = `x_{${i + 1}}`;
        variables[sub] = matrix[i][varCount].toLatex();
      }
      solution = { type: 'unique', variables, rank };
    } else {
      const freeVarIndices = [];
      for (let j = 0; j < varCount; j++) {
        if (!pivotColumns.includes(j)) freeVarIndices.push(j);
      }
      const freeVariables = freeVarIndices.map(j => `x_{${j + 1}}`);

      const pivotToRow: Record<number, number> = {};
      for (let r = 0; r < rows; r++) {
        const p = pivotColumns.find(c => !matrix[r].slice(0, c).some(v => !v.isZero()) && !matrix[r][c].isZero());
        if (p !== undefined) pivotToRow[p] = r;
      }

      let parametricForm = '';
      for (const pCol of pivotColumns) {
        const r = pivotToRow[pCol];
        if (r === undefined) continue;
        let expr = matrix[r][varCount].isZero() ? '' : matrix[r][varCount].toLatex();
        for (const fIdx of freeVarIndices) {
          const coeff = matrix[r][fIdx].neg();
          if (coeff.isZero()) continue;
          const term = coeff.isOne()
            ? `x_{${fIdx + 1}}`
            : `${coeff.toLatex()} x_{${fIdx + 1}}`;
          expr = expr ? `${expr} + ${term}` : term;
        }
        parametricForm += `x_{${pCol + 1}} = ${expr || '0'}, \\quad `;
      }
      for (const fIdx of freeVarIndices) {
        parametricForm += `x_{${fIdx + 1}} \\text{ free}, \\quad `;
      }
      parametricForm = parametricForm.replace(/,\s*\\quad\s*$/, '');

      solution = {
        type: 'infinite',
        freeVariables,
        parametricForm,
        rank,
        nullity: freeVarIndices.length,
      };
    }
  }

  return {
    originalMatrix: copyMatrix(inputMatrix),
    rrefMatrix: matrix,
    steps,
    rank,
    solution,
    pivotColumns,
    isAugmented,
    cols,
    rows,
  };
}

export function matrixFromStrings(rows: string[][]): Matrix {
  return rows.map(row => row.map(cell => Rational.from(cell.trim() || '0')));
}

export function encodeMatrixToUrl(
  matrix: string[][],
  rows: number,
  cols: number,
  isAugmented: boolean
): string {
  const data = { m: matrix, r: rows, c: cols, a: isAugmented ? 1 : 0 };
  return btoa(JSON.stringify(data));
}

export function decodeMatrixFromUrl(encoded: string): {
  matrix: string[][];
  rows: number;
  cols: number;
  isAugmented: boolean;
} | null {
  try {
    const data = JSON.parse(atob(encoded));
    return {
      matrix: data.m,
      rows: data.r,
      cols: data.c,
      isAugmented: data.a === 1,
    };
  } catch {
    return null;
  }
}
