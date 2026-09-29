/**
 * Cusped (multi-lobed) palace arch — the scalloped "jharokha" outline of
 * Indian royal architecture. Returns an SVG path string.
 *
 *  x0, x1   left / right edge
 *  spring   y where the arch springs from the vertical sides
 *  apex     y of the pointed top
 *  bottom   y of the base (null = open path, only the arch + sides)
 *  lobes    scallops per side
 *  bulge    how deep each scallop is
 */
export function cuspedArch({ x0 = 0, x1 = 100, spring = 52, apex = 4, bottom = null, lobes = 5, bulge = 3.2 }) {
  const cx = (x0 + x1) / 2;
  const w = x1 - x0;
  // Left half as a cubic Bézier from springline to apex
  const P0 = [x0, spring];
  const P1 = [x0, spring - (spring - apex) * 0.55];
  const P2 = [x0 + w * 0.26, apex + (spring - apex) * 0.14];
  const P3 = [cx, apex];
  const bez = (t) => {
    const u = 1 - t;
    return [0, 1].map(
      (k) => u * u * u * P0[k] + 3 * u * u * t * P1[k] + 3 * u * t * t * P2[k] + t * t * t * P3[k],
    );
  };
  const centre = [cx, spring + (spring - apex) * 0.4];
  const lobeTo = (a, b) => {
    const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const dx = mid[0] - centre[0];
    const dy = mid[1] - centre[1];
    const len = Math.hypot(dx, dy) || 1;
    const c = [mid[0] + (dx / len) * bulge, mid[1] + (dy / len) * bulge];
    return `Q${c[0].toFixed(2)} ${c[1].toFixed(2)} ${b[0].toFixed(2)} ${b[1].toFixed(2)}`;
  };
  const left = Array.from({ length: lobes + 1 }, (_, i) => bez(i / lobes));
  const right = left.map(([x, y]) => [x0 + x1 - x, y]).reverse();

  let d = bottom != null ? `M${x0} ${bottom} L${x0} ${spring}` : `M${x0} ${spring}`;
  for (let i = 0; i < lobes; i++) d += " " + lobeTo(left[i], left[i + 1]);
  for (let i = 0; i < lobes; i++) d += " " + lobeTo(right[i], right[i + 1]);
  d += bottom != null ? ` L${x1} ${bottom} Z` : "";
  return d;
}

/** CSS mask (data URI) of a filled arch in a 100 × h box. */
export function archMask(h = 125, opts = {}) {
  const d = cuspedArch({ bottom: h, ...opts });
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 ${h}" preserveAspectRatio="none"><path d="${d}" fill="#000"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
