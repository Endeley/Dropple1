export function identity() {
  return [1, 0, 0, 1, 0, 0]; // a, b, c, d, e, f
}

export function translate(m, x, y) {
  const [a, b, c, d, e, f] = m;
  return [a, b, c, d, e + x, f + y];
}

export function scale(m, sx, sy) {
  const [a, b, c, d, e, f] = m;
  return [a * sx, b * sx, c * sy, d * sy, e, f];
}

export function rotate(m, angle) {
  const rad = angle * (Math.PI / 180);
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const [a, b, c, d, e, f] = m;
  return [
    a * cos + c * sin,
    b * cos + d * sin,
    c * cos - a * sin,
    d * cos - b * sin,
    e,
    f,
  ];
}

export function skew(m, ax, ay) {
  const [a, b, c, d, e, f] = m;
  const tanX = Math.tan(ax * (Math.PI / 180));
  const tanY = Math.tan(ay * (Math.PI / 180));
  return [
    a + c * tanX,
    b + d * tanX,
    a * tanY + c,
    b * tanY + d,
    e,
    f,
  ];
}

export function multiply(m1, m2) {
  const [a1, b1, c1, d1, e1, f1] = m1;
  const [a2, b2, c2, d2, e2, f2] = m2;
  return [
    a1 * a2 + c1 * b2,
    b1 * a2 + d1 * b2,
    a1 * c2 + c1 * d2,
    b1 * c2 + d1 * d2,
    a1 * e2 + c1 * f2 + e1,
    b1 * e2 + d1 * f2 + f1,
  ];
}
