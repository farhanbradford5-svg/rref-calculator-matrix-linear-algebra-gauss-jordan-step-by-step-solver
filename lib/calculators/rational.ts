function gcd(a: bigint, b: bigint): bigint {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a === 0n ? 1n : a;
}

export class Rational {
  readonly n: bigint;
  readonly d: bigint;

  constructor(n: bigint | number | string, d: bigint | number = 1n) {
    let num = typeof n === 'string' ? BigInt(n) : BigInt(n);
    let den = BigInt(d);
    if (den === 0n) throw new Error('Division by zero in Rational constructor');
    if (num === 0n) {
      this.n = 0n;
      this.d = 1n;
      return;
    }
    const sign = (num < 0n) !== (den < 0n) ? -1n : 1n;
    num = num < 0n ? -num : num;
    den = den < 0n ? -den : den;
    const g = gcd(num, den);
    this.n = sign * (num / g);
    this.d = den / g;
  }

  static from(value: string): Rational {
    const trimmed = value.trim();
    if (trimmed === '' || trimmed === '-') return new Rational(0n);

    if (trimmed.includes('/')) {
      const slash = trimmed.indexOf('/');
      const numStr = trimmed.slice(0, slash).trim();
      const denStr = trimmed.slice(slash + 1).trim();
      if (!numStr || !denStr) return new Rational(0n);
      try {
        return new Rational(BigInt(numStr), BigInt(denStr));
      } catch {
        return new Rational(0n);
      }
    }

    if (trimmed.includes('.')) {
      const isNeg = trimmed.startsWith('-');
      const abs = isNeg ? trimmed.slice(1) : trimmed;
      const dotIdx = abs.indexOf('.');
      const intStr = abs.slice(0, dotIdx) || '0';
      const decStr = abs.slice(dotIdx + 1);
      if (!decStr) {
        try { return new Rational(BigInt(isNeg ? '-' + intStr : intStr)); } catch { return new Rational(0n); }
      }
      const scale = 10n ** BigInt(decStr.length);
      try {
        const intVal = BigInt(intStr) * scale + BigInt(decStr);
        return new Rational(isNeg ? -intVal : intVal, scale);
      } catch {
        return new Rational(0n);
      }
    }

    try {
      return new Rational(BigInt(trimmed));
    } catch {
      return new Rational(0n);
    }
  }

  add(other: Rational): Rational {
    return new Rational(this.n * other.d + other.n * this.d, this.d * other.d);
  }

  sub(other: Rational): Rational {
    return new Rational(this.n * other.d - other.n * this.d, this.d * other.d);
  }

  mul(other: Rational): Rational {
    return new Rational(this.n * other.n, this.d * other.d);
  }

  div(other: Rational): Rational {
    if (other.n === 0n) throw new Error('Division by zero');
    return new Rational(this.n * other.d, this.d * other.n);
  }

  neg(): Rational {
    return new Rational(-this.n, this.d);
  }

  abs(): Rational {
    return new Rational(this.n < 0n ? -this.n : this.n, this.d);
  }

  isZero(): boolean {
    return this.n === 0n;
  }

  isOne(): boolean {
    return this.n === 1n && this.d === 1n;
  }

  isNeg(): boolean {
    return this.n < 0n;
  }

  equals(other: Rational): boolean {
    return this.n === other.n && this.d === other.d;
  }

  toString(): string {
    if (this.d === 1n) return this.n.toString();
    return `${this.n}/${this.d}`;
  }

  toLatex(): string {
    if (this.d === 1n) return this.n.toString();
    if (this.n < 0n) return `-\\dfrac{${-this.n}}{${this.d}}`;
    return `\\dfrac{${this.n}}{${this.d}}`;
  }

  toNumber(): number {
    return Number(this.n) / Number(this.d);
  }

  static ZERO = new Rational(0n);
  static ONE = new Rational(1n);
  static NEG_ONE = new Rational(-1n);
}

export function matrixToLatex(matrix: Rational[][], isAugmented: boolean = false): string {
  const rows = matrix.length;
  const cols = rows > 0 ? matrix[0].length : 0;
  if (rows === 0 || cols === 0) return '';

  const colSpec = isAugmented
    ? `${'c'.repeat(cols - 1)}|c`
    : 'c'.repeat(cols);

  const rowStrings = matrix.map(row =>
    row.map(cell => cell.toLatex()).join(' & ')
  );

  return `\\left[\\begin{array}{${colSpec}}${rowStrings.join(' \\\\ ')}\\end{array}\\right]`;
}

export function copyMatrix(m: Rational[][]): Rational[][] {
  return m.map(row => [...row]);
}
