const ENTRY_PATTERN = /^-?(\d+(\.\d*)?|\.\d+)(\/-?\d+)?$/;

/**
 * Parse pasted text into a matrix of entry strings.
 * Accepts spreadsheet cells (tabs / new lines), "1 2; 3 4", [[1,2],[3,4]] and LaTeX rows (& and \\).
 */
export function parsePastedMatrix(
  text: string,
  maxSize = 6
): { matrix: string[][] } | { error: string } {
  const cleaned = text
    .replace(/[−–—]/g, '-')
    .replace(/\\\\/g, '\n')
    .replace(/[\])}]\s*,?\s*[[({]/g, '\n')
    .replace(/[[\](){}]/g, ' ');
  const rows = cleaned
    .split(/[\n;]+/)
    .map(line => line.split(/[\s,|&]+/).filter(Boolean))
    .filter(r => r.length > 0);
  if (rows.length === 0) return { error: 'Nothing to paste yet — type or paste the rows of your matrix.' };
  if (rows.length < 2 || rows.length > maxSize) {
    return { error: `Found ${rows.length} row${rows.length === 1 ? '' : 's'}. This calculator accepts 2 to ${maxSize} rows.` };
  }
  const width = rows[0].length;
  if (rows.some(r => r.length !== width)) return { error: 'Every row needs the same number of entries.' };
  if (width < 2 || width > maxSize) {
    return { error: `Found ${width} column${width === 1 ? '' : 's'}. This calculator accepts 2 to ${maxSize} columns.` };
  }
  const bad = rows.flat().find(v => !ENTRY_PATTERN.test(v) || /\/-?0+$/.test(v));
  if (bad) return { error: `"${bad}" is not a number this calculator can read. Use integers, decimals or fractions like 3/4.` };
  return { matrix: rows };
}
