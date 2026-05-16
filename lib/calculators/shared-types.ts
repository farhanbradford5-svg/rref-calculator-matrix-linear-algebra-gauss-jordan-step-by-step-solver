import type { Rational } from './rational';

export type Matrix = Rational[][];

export type OperationType =
  | 'swap'
  | 'scale'
  | 'eliminate'
  | 'info';

export interface Step {
  operation: OperationType;
  description: string;
  explanation: string;
  latex: string;
  matrix: Matrix;
  pivotRow?: number;
  pivotCol?: number;
}

export interface SolutionType {
  type: 'unique' | 'infinite' | 'no_solution' | 'underdetermined';
  variables?: Record<string, string>;
  parametricForm?: string;
  freeVariables?: string[];
  rank?: number;
  nullity?: number;
}

export interface RREFResult {
  originalMatrix: Matrix;
  rrefMatrix: Matrix;
  steps: Step[];
  rank: number;
  solution: SolutionType | null;
  pivotColumns: number[];
  isAugmented: boolean;
  cols: number;
  rows: number;
}

export interface SavedProblem {
  id: string;
  name: string;
  matrix: string[][];
  rows: number;
  cols: number;
  isAugmented: boolean;
  savedAt: number;
}

export interface HistoryEntry {
  id: string;
  matrix: string[][];
  rows: number;
  cols: number;
  isAugmented: boolean;
  rank: number;
  solvedAt: number;
}

export const EXAMPLE_MATRICES: {
  label: string;
  description: string;
  matrix: string[][];
  rows: number;
  cols: number;
  isAugmented: boolean;
}[] = [
  {
    label: '2×2 Unique Solution',
    description: 'Simple system with one unique solution',
    matrix: [['2', '1', '5'], ['4', '-6', '-2']],
    rows: 2,
    cols: 3,
    isAugmented: true,
  },
  {
    label: '3×3 Identity',
    description: 'Matrix that reduces to identity',
    matrix: [['1', '2', '3'], ['0', '1', '4'], ['5', '6', '0']],
    rows: 3,
    cols: 3,
    isAugmented: false,
  },
  {
    label: '3×4 Unique Solution',
    description: 'Three equations, three unknowns with constants',
    matrix: [['1', '1', '1', '6'], ['0', '2', '5', '-4'], ['2', '5', '-1', '27']],
    rows: 3,
    cols: 4,
    isAugmented: true,
  },
  {
    label: '3×4 Infinite Solutions',
    description: 'Underdetermined system with free variable',
    matrix: [['1', '2', '-1', '4'], ['2', '4', '-2', '8'], ['3', '6', '-3', '12']],
    rows: 3,
    cols: 4,
    isAugmented: true,
  },
  {
    label: '3×4 No Solution',
    description: 'Inconsistent system with contradiction',
    matrix: [['1', '2', '3', '4'], ['2', '4', '6', '9'], ['3', '6', '9', '13']],
    rows: 3,
    cols: 4,
    isAugmented: true,
  },
  {
    label: '2×3 Fractions',
    description: 'System with fractional coefficients',
    matrix: [['1/2', '1/3', '1'], ['1/4', '1/6', '1/2']],
    rows: 2,
    cols: 3,
    isAugmented: true,
  },
  {
    label: '4×4 Square',
    description: 'Full-rank 4×4 matrix',
    matrix: [['2', '1', '-1', '8'], ['-3', '-1', '2', '-11'], ['-2', '1', '2', '-3'], ['1', '2', '-1', '-2']],
    rows: 4,
    cols: 4,
    isAugmented: false,
  },
  {
    label: '4×5 Augmented',
    description: 'Four equations, four unknowns',
    matrix: [
      ['1', '2', '0', '1', '3'],
      ['2', '1', '3', '0', '5'],
      ['0', '3', '-1', '2', '4'],
      ['1', '0', '2', '-1', '1'],
    ],
    rows: 4,
    cols: 5,
    isAugmented: true,
  },
];
