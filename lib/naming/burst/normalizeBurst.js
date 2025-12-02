export function normalizeBurst(data = {}) {
  if (!Array.isArray(data.names)) return { names: [] };

  const clean = data.names
    .map((n) => (n == null ? "" : `${n}`.trim()))
    .filter((n) => n.length > 1);

  const unique = [...new Set(clean)].slice(0, 600);

  return { names: unique };
}
