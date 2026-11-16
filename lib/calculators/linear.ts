import { Rational } from './rational';
import { computeRREF } from './rref';
import { computeDeterminant } from './determinant';
import type { Matrix, Step } from './shared-types';

/* ------------------------------------------------------------------ */
/* Null space, column space, row space                                 */
/* ------------------------------------------------------------------ */

export interface SubspaceResult {
  rows: number;
  cols: number;
  rref: Matrix;
  steps: Step[];
  rank: number;
  nullity: number;
  pivotColumns: number[];
  freeColumns: number[];
  /** Basis vectors of Nul(A), each of length `cols`. Empty when the null space is trivial. */
  nullBasis: Rational[][];
  /** Pivot columns of the original matrix — a basis of Col(A). */
  columnBasis: Rational[][];
  /** Non-zero rows of the RREF — a basis of Row(A). */
  rowBasis: Rational[][];
}

export function computeSubspaces(A: Matrix): SubspaceResult {
  const rows = A.length;
  const cols = rows > 0 ? A[0].length : 0;
  const res = computeRREF(A, false);
  const R = res.rrefMatrix;
  const pivotColumns = res.pivotColumns;
  const freeColumns: number[] = [];
  for (let j = 0; j < cols; j++) if (!pivotColumns.includes(j)) freeColumns.push(j);

  // Pivot k always sits in row k of the RREF.
  const nullBasis = freeColumns.map(f => {
    const v: Rational[] = Array.from({ length: cols }, () => Rational.ZERO);
    v[f] = Rational.ONE;
    pivotColumns.forEach((pc, k) => {
      v[pc] = R[k][f].neg();
    });
    return v;
  });

  return {
    rows,
    cols,
    rref: R,
    steps: res.steps,
    rank: res.rank,
    nullity: freeColumns.length,
    pivotColumns,
    freeColumns,
    nullBasis,
    columnBasis: pivotColumns.map(pc => A.map(row => row[pc])),
    rowBasis: R.slice(0, res.rank).map(row => [...row]),
  };
}

export function vectorToLatex(v: Rational[]): string {
  return `\\begin{bmatrix}${v.map(x => x.toLatex()).join(' \\\\ ')}\\end{bmatrix}`;
}

/* ------------------------------------------------------------------ */
/* Cramer's rule                                                       */
/* ------------------------------------------------------------------ */

export interface CramerResult {
  n: number;
  detA: Rational;
  /** A with column i replaced by b. */
  replaced: Matrix[];
  detAi: Rational[];
  /** Present only when det(A) ≠ 0. */
  solution?: Rational[];
}

export function computeCramer(A: Matrix, b: Rational[]): CramerResult {
  const n = A.length;
  const detA = computeDeterminant(A).value ?? Rational.ZERO;
  const replacedList: Matrix[] = [];
  const detAi: Rational[] = [];
  for (let i = 0; i < n; i++) {
    const Ai = A.map((row, r) => row.map((v, c) => (c === i ? b[r] : v)));
    replacedList.push(Ai);
    detAi.push(computeDeterminant(Ai).value ?? Rational.ZERO);
  }
  return {
    n,
    detA,
    replaced: replacedList,
    detAi,
    solution: detA.isZero() ? undefined : detAi.map(d => d.div(detA)),
  };
}

/* ------------------------------------------------------------------ */
/* Eigenvalues and eigenvectors                                        */
/* ------------------------------------------------------------------ */

export interface Eigenvalue {
  kind: 'rational' | 'surd' | 'complex' | 'numeric';
  latex: string;
  re: number;
  im: number;
  multiplicity: number;
  exact?: Rational;
  /** Exact eigenvectors (rational eigenvalues only). */
  eigenvectors?: Rational[][];
  /** Decimal eigenvectors (real irrational eigenvalues). */
  numericEigenvectors?: number[][];
}

export interface EigenResult {
  n: number;
  /** Coefficients of det(λI − A): index k holds the coefficient of λ^k. */
  charPoly: Rational[];
  charPolyLatex: string;
  trace: Rational;
  det: Rational;
  eigenvalues: Eigenvalue[];
}

function identity(n: number): Matrix {
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? Rational.ONE : Rational.ZERO))
  );
}

function multiply(A: Matrix, B: Matrix): Matrix {
  const n = A.length;
  const m = B[0].length;
  const k = B.length;
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: m }, (_, j) => {
      let s = Rational.ZERO;
      for (let t = 0; t < k; t++) s = s.add(A[i][t].mul(B[t][j]));
      return s;
    })
  );
}

/** Characteristic polynomial det(λI − A) by the Faddeev–LeVerrier recurrence (exact). */
export function characteristicPolynomial(A: Matrix): Rational[] {
  const n = A.length;
  const c: Rational[] = Array.from({ length: n + 1 }, () => Rational.ZERO);
  c[n] = Rational.ONE;
  let M = identity(n);
  for (let k = 1; k <= n; k++) {
    const AM = multiply(A, M);
    let tr = Rational.ZERO;
    for (let i = 0; i < n; i++) tr = tr.add(AM[i][i]);
    const coeff = tr.neg().div(new Rational(BigInt(k)));
    c[n - k] = coeff;
    M = AM.map((row, i) => row.map((v, j) => (i === j ? v.add(coeff) : v)));
  }
  return c;
}

export function polyToLatex(c: Rational[], variable = '\\lambda'): string {
  const parts: string[] = [];
  for (let k = c.length - 1; k >= 0; k--) {
    const coef = c[k];
    if (coef.isZero()) continue;
    const abs = coef.abs();
    const sign = coef.isNeg() ? '-' : '+';
    const v = k === 0 ? '' : k === 1 ? variable : `${variable}^{${k}}`;
    const body = k === 0 ? abs.toLatex() : abs.isOne() ? v : `${abs.toLatex()}${v}`;
    parts.push(parts.length === 0 ? (coef.isNeg() ? `-${body}` : body) : `${sign} ${body}`);
  }
  return parts.length ? parts.join(' ') : '0';
}

function bigAbs(x: bigint): bigint {
  return x < 0n ? -x : x;
}

function bigGcd(a: bigint, b: bigint): bigint {
  a = bigAbs(a);
  b = bigAbs(b);
  while (b !== 0n) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

const DIVISOR_LIMIT = 1_000_000_000_000n; // 1e12 — trial division stays under ~1e6 steps

function divisors(x: bigint): bigint[] | null {
  x = bigAbs(x);
  if (x === 0n || x > DIVISOR_LIMIT) return null;
  const n = Number(x);
  const out: bigint[] = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      out.push(BigInt(i));
      if (i !== n / i) out.push(BigInt(n / i));
    }
  }
  return out;
}

function evalPoly(c: Rational[], x: Rational): Rational {
  let s = Rational.ZERO;
  for (let k = c.length - 1; k >= 0; k--) s = s.mul(x).add(c[k]);
  return s;
}

/** Divide the polynomial by (λ − r); the remainder is assumed to be zero. */
function deflate(c: Rational[], r: Rational): Rational[] {
  const n = c.length - 1;
  const out: Rational[] = Array.from({ length: n }, () => Rational.ZERO);
  let carry = c[n];
  for (let k = n - 1; k >= 0; k--) {
    out[k] = carry;
    carry = c[k].add(carry.mul(r));
  }
  return out;
}

function findRationalRoot(c: Rational[]): Rational | null {
  if (c[0].isZero()) return Rational.ZERO;
  // Scale to integer coefficients.
  let lcm = 1n;
  for (const q of c) lcm = (lcm * q.d) / bigGcd(lcm, q.d);
  const ints = c.map(q => (q.n * lcm) / q.d);
  const ps = divisors(ints[0]);
  const qs = divisors(ints[ints.length - 1]);
  if (!ps || !qs) return null;
  for (const q of qs) {
    for (const p of ps) {
      if (bigGcd(p, q) !== 1n) continue;
      for (const s of [1n, -1n]) {
        const cand = new Rational(s * p, q);
        if (evalPoly(c, cand).isZero()) return cand;
      }
    }
  }
  return null;
}

/** Write a non-negative integer N as s²·r with r square-free (best effort for huge N). */
function squarePart(N: bigint): { s: bigint; r: bigint } {
  if (N === 0n) return { s: 0n, r: 1n };
  if (N > 100_000_000_000_000n) return { s: 1n, r: N };
  let n = Number(N);
  let s = 1;
  for (let f = 2; f * f <= n; f++) {
    while (n % (f * f) === 0) {
      s *= f;
      n /= f * f;
    }
  }
  return { s: BigInt(s), r: BigInt(n) };
}

function surdLatex(center: Rational, k: Rational, r: bigint, sign: 1 | -1, imaginary: boolean): string {
  const root = `\\sqrt{${r}}`;
  const unit = imaginary ? (r === 1n ? 'i' : `${root}\\,i`) : root;
  let term: string;
  if (k.isOne()) term = unit;
  else if (k.d === 1n) term = `${k.n}${unit}`;
  else if (k.n === 1n) term = `\\dfrac{${unit}}{${k.d}}`;
  else term = `\\dfrac{${k.n}${unit}}{${k.d}}`;
  const op = sign === 1 ? '+' : '-';
  if (center.isZero()) return sign === 1 ? term : `-${term}`;
  return `${center.toLatex()} ${op} ${term}`;
}

function quadraticRoots(c: Rational[]): Eigenvalue[] {
  const [c0, c1, c2] = c;
  const two = new Rational(2n);
  const D = c1.mul(c1).sub(new Rational(4n).mul(c2).mul(c0));
  const center = c1.neg().div(two.mul(c2));
  const N = bigAbs(D.n) * D.d; // sqrt(|D|) = sqrt(N) / D.d
  const { s, r } = squarePart(N);
  const k = new Rational(s, D.d).div(two.mul(c2)).abs();
  const imaginary = D.isNeg();
  const mag = k.toNumber() * Math.sqrt(Number(r));
  if (!imaginary && r === 1n) {
    // Perfect square that the divisor search could not reach: the roots are rational.
    return [center.add(k), center.sub(k)].map(x => ({
      kind: 'rational' as const,
      latex: x.toLatex(),
      re: x.toNumber(),
      im: 0,
      multiplicity: 1,
      exact: x,
    }));
  }
  return ([1, -1] as const).map(sign => ({
    kind: imaginary ? ('complex' as const) : ('surd' as const),
    latex: surdLatex(center, k, r, sign, imaginary),
    re: imaginary ? center.toNumber() : center.toNumber() + sign * mag,
    im: imaginary ? sign * mag : 0,
    multiplicity: 1,
  }));
}

/** Durand–Kerner iteration for the remaining (monic) factor of degree ≥ 3. */
function numericRoots(c: Rational[]): { re: number; im: number }[] {
  const n = c.length - 1;
  const lead = c[n].toNumber();
  const a = c.map(q => q.toNumber() / lead);
  let roots = Array.from({ length: n }, (_, k) => {
    const ang = (2 * Math.PI * k) / n + 0.4;
    const rad = 1 + Math.max(...a.slice(0, n).map(Math.abs));
    return { re: rad * Math.cos(ang) * 0.6, im: rad * Math.sin(ang) * 0.6 };
  });
  for (let iter = 0; iter < 500; iter++) {
    let delta = 0;
    roots = roots.map((z, i) => {
      // p(z) by Horner
      let pr = 1;
      let pi = 0;
      for (let k = n - 1; k >= 0; k--) {
        const nr = pr * z.re - pi * z.im + a[k];
        const ni = pr * z.im + pi * z.re;
        pr = nr;
        pi = ni;
      }
      let dr = 1;
      let di = 0;
      roots.forEach((w, j) => {
        if (j === i) return;
        const xr = z.re - w.re;
        const xi = z.im - w.im;
        const nr = dr * xr - di * xi;
        const ni = dr * xi + di * xr;
        dr = nr;
        di = ni;
      });
      const den = dr * dr + di * di || 1e-300;
      const qr = (pr * dr + pi * di) / den;
      const qi = (pi * dr - pr * di) / den;
      delta = Math.max(delta, Math.abs(qr) + Math.abs(qi));
      return { re: z.re - qr, im: z.im - qi };
    });
    if (delta < 1e-14) break;
  }
  return roots
    .map(z => ({ re: Math.abs(z.re) < 1e-10 ? 0 : z.re, im: Math.abs(z.im) < 1e-9 ? 0 : z.im }))
    .sort((p, q) => q.re - p.re || q.im - p.im);
}

export function formatDecimal(x: number, digits = 6): string {
  const r = Number(x.toFixed(digits));
  return (Object.is(r, -0) ? 0 : r).toString();
}

function numericLatex(z: { re: number; im: number }): string {
  if (z.im === 0) return `\\approx ${formatDecimal(z.re)}`;
  const sign = z.im < 0 ? '-' : '+';
  return `\\approx ${formatDecimal(z.re)} ${sign} ${formatDecimal(Math.abs(z.im))}\\,i`;
}

/** Decimal null space of (A − λI) for a real, irrational eigenvalue. */
function numericEigenvectors(A: Matrix, lambda: number): number[][] {
  const n = A.length;
  const M = A.map((row, i) => row.map((v, j) => v.toNumber() - (i === j ? lambda : 0)));
  const scale = Math.max(1, ...M.flat().map(Math.abs));
  const tol = 1e-7 * scale;
  const pivots: number[] = [];
  let r = 0;
  for (let col = 0; col < n && r < n; col++) {
    let best = r;
    for (let i = r + 1; i < n; i++) if (Math.abs(M[i][col]) > Math.abs(M[best][col])) best = i;
    if (Math.abs(M[best][col]) < tol) continue;
    [M[r], M[best]] = [M[best], M[r]];
    const p = M[r][col];
    M[r] = M[r].map(v => v / p);
    for (let i = 0; i < n; i++) {
      if (i === r) continue;
      const f = M[i][col];
      if (f !== 0) M[i] = M[i].map((v, j) => v - f * M[r][j]);
    }
    pivots.push(col);
    r++;
  }
  const free: number[] = [];
  for (let j = 0; j < n; j++) if (!pivots.includes(j)) free.push(j);
  return free.map(f => {
    const v = Array(n).fill(0);
    v[f] = 1;
    pivots.forEach((pc, k) => {
      v[pc] = -M[k][f];
    });
    return v;
  });
}

export function computeEigen(A: Matrix): EigenResult {
  const n = A.length;
  const charPoly = characteristicPolynomial(A);
  const eigenvalues: Eigenvalue[] = [];

  // 1. Peel off every rational root exactly.
  let rest = charPoly;
  while (rest.length > 1) {
    const root = findRationalRoot(rest);
    if (!root) break;
    const existing = eigenvalues.find(e => e.exact && e.exact.equals(root));
    if (existing) existing.multiplicity++;
    else eigenvalues.push({ kind: 'rational', latex: root.toLatex(), re: root.toNumber(), im: 0, multiplicity: 1, exact: root });
    rest = deflate(rest, root);
  }

  // 2. Whatever is left has no rational roots.
  const degree = rest.length - 1;
  if (degree === 2) {
    for (const ev of quadraticRoots(rest)) {
      const existing = ev.exact ? eigenvalues.find(e => e.exact && e.exact.equals(ev.exact!)) : undefined;
      if (existing) existing.multiplicity++;
      else eigenvalues.push(ev);
    }
  } else if (degree >= 3) {
    for (const z of numericRoots(rest)) {
      eigenvalues.push({ kind: z.im === 0 ? 'numeric' : 'complex', latex: numericLatex(z), re: z.re, im: z.im, multiplicity: 1 });
    }
  }

  // 3. Eigenvectors.
  for (const ev of eigenvalues) {
    if (ev.exact) {
      const shifted = A.map((row, i) => row.map((v, j) => (i === j ? v.sub(ev.exact!) : v)));
      ev.eigenvectors = computeSubspaces(shifted).nullBasis;
    } else if (ev.im === 0) {
      ev.numericEigenvectors = numericEigenvectors(A, ev.re);
    }
  }

  eigenvalues.sort((p, q) => q.re - p.re || q.im - p.im);

  return {
    n,
    charPoly,
    charPolyLatex: polyToLatex(charPoly),
    trace: charPoly[n - 1].neg(),
    det: n % 2 === 0 ? charPoly[0] : charPoly[0].neg(),
    eigenvalues,
  };
}
