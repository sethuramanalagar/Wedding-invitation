/**
 * Hand-drawn SVG ornaments — temple, kolam, lotus and floral motifs.
 * All use `currentColor`, so colour is controlled from CSS.
 * Every ornament is decorative (aria-hidden).
 */

const deco = { "aria-hidden": true, focusable: "false" };

/* Kalasam — the temple finial, used as a crowning motif */
export function Kalasam({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 64 80" {...deco}>
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 3 L32 11" />
        <circle cx="32" cy="14" r="3" />
        <path d="M24 26 C24 19 28 17 32 17 C36 17 40 19 40 26" />
        <path d="M22 26 H42" />
        <path d="M20 32 C20 28 26 26 32 26 C38 26 44 28 44 32 C44 40 40 46 32 46 C24 46 20 40 20 32 Z" />
        <path d="M26 34 C28 38 36 38 38 34" />
        <path d="M24 46 H40 L42 52 H22 Z" />
        <path d="M18 52 H46" />
        <path d="M16 58 H48" />
        <path d="M22 58 L20 70 H44 L42 58" />
        <path d="M14 74 H50" />
        <path d="M10 78 H54" />
      </g>
      <g fill="currentColor">
        <circle cx="32" cy="35" r="1.4" />
        <circle cx="27" cy="64" r="1" />
        <circle cx="32" cy="64" r="1" />
        <circle cx="37" cy="64" r="1" />
      </g>
    </svg>
  );
}

/* Kolam divider — a dotted kolam knot flanked by fine lines */
export function KolamDivider({ className = "" }) {
  return (
    <svg className={`kolam-divider ${className}`} viewBox="0 0 240 28" {...deco}>
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        <path className="kd-line" d="M4 14 H92" />
        <path className="kd-line" d="M148 14 H236" />
        <path d="M92 14 L100 10 L100 18 Z" fill="currentColor" stroke="none" />
        <path d="M148 14 L140 10 L140 18 Z" fill="currentColor" stroke="none" />
        {/* interlaced loops around the dot grid */}
        <path d="M120 2 C130 2 132 12 120 14 C108 16 110 26 120 26 C130 26 132 16 120 14 C108 12 110 2 120 2 Z" />
        <path d="M106 14 C106 4 116 6 120 14 C124 22 134 24 134 14 C134 4 124 6 120 14 C116 22 106 24 106 14 Z" />
      </g>
      <g fill="currentColor">
        <circle cx="120" cy="8" r="1.3" />
        <circle cx="120" cy="20" r="1.3" />
        <circle cx="113" cy="14" r="1.3" />
        <circle cx="127" cy="14" r="1.3" />
        <circle cx="120" cy="14" r="1.6" />
      </g>
    </svg>
  );
}

/* Corner flourish — for invitation-card frames (rotate via CSS) */
export function CornerFlourish({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 80 80" {...deco}>
      <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
        <path d="M4 76 V20 C4 10 10 4 20 4 H76" />
        <path d="M10 76 V24 C10 16 16 10 24 10 H76" opacity=".55" />
        <path d="M18 30 C18 22 22 18 30 18 C40 18 42 30 34 32 C28 33 27 26 31 25" />
        <path d="M30 18 C34 12 44 12 48 16" />
        <path d="M18 30 C12 34 12 44 16 48" />
        <path d="M44 22 C50 22 54 26 54 32" opacity=".6" />
        <path d="M22 44 C22 50 26 54 32 54" opacity=".6" />
      </g>
      <g fill="currentColor">
        <circle cx="20" cy="20" r="1.8" />
        <circle cx="52" cy="10" r="1.1" />
        <circle cx="10" cy="52" r="1.1" />
        <circle cx="62" cy="10" r="0.9" />
        <circle cx="10" cy="62" r="0.9" />
      </g>
    </svg>
  );
}

/* Lotus */
export function Lotus({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 64 40" {...deco}>
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round">
        <path d="M32 4 C38 12 38 24 32 34 C26 24 26 12 32 4 Z" />
        <path d="M32 34 C28 22 20 16 12 14 C12 24 20 32 32 34 Z" />
        <path d="M32 34 C36 22 44 16 52 14 C52 24 44 32 32 34 Z" />
        <path d="M32 34 C24 30 12 28 4 30 C10 36 22 37 32 34 Z" />
        <path d="M32 34 C40 30 52 28 60 30 C54 36 42 37 32 34 Z" />
      </g>
    </svg>
  );
}

/* Temple / gopuram silhouette — for the wedding ceremony */
export function TempleIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" {...deco}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
        <path d="M24 3 V7" />
        <path d="M20 11 C20 8 22 7 24 7 C26 7 28 8 28 11 Z" />
        <path d="M18 11 H30 L31 17 H17 Z" />
        <path d="M15 17 H33 L34 24 H14 Z" />
        <path d="M12 24 H36 L37 32 H11 Z" />
        <path d="M8 32 H40 V45 H8 Z" />
        <path d="M20 45 V38 C20 35 22 34 24 34 C26 34 28 35 28 38 V45" />
        <path d="M5 45 H43" />
      </g>
    </svg>
  );
}

/* Diya — lamp, for the evening reception */
export function DiyaIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" {...deco}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">
        <path className="flame" d="M24 6 C28 12 28 17 24 20 C20 17 20 12 24 6 Z" />
        <path d="M6 26 C10 26 14 28 24 28 C34 28 40 25 44 22 C42 34 34 40 24 40 C14 40 8 34 6 26 Z" />
        <path d="M18 40 L16 44 H32 L30 40" />
      </g>
    </svg>
  );
}

/* Rising sun — for the post-wedding morning */
export function SunriseIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" {...deco}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 32 A12 12 0 0 1 36 32" />
        <path d="M4 32 H44" />
        <path d="M10 38 H38" opacity=".6" />
        <path d="M24 10 V15" />
        <path d="M10 18 L13.5 21.5" />
        <path d="M38 18 L34.5 21.5" />
        <path d="M4 26 H8" />
        <path d="M40 26 H44" />
      </g>
    </svg>
  );
}

/* Banana leaf — for the feast */
export function LeafIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 48 48" {...deco}>
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 40 C6 20 20 6 42 6 C42 28 28 42 6 42 Z" />
        <path d="M6 42 L36 12" />
        <path d="M14 34 L14 26" opacity=".6" />
        <path d="M20 28 L20 20" opacity=".6" />
        <path d="M14 34 L22 34" opacity=".6" />
        <path d="M20 28 L28 28" opacity=".6" />
      </g>
    </svg>
  );
}

/* Mandala medallion — used behind the monogram / photo placeholder */
export function Medallion({ className = "" }) {
  const petals = Array.from({ length: 16 }, (_, i) => i * 22.5);
  const dots = Array.from({ length: 32 }, (_, i) => i * 11.25);
  return (
    <svg className={className} viewBox="0 0 200 200" {...deco}>
      <g fill="none" stroke="currentColor" strokeWidth=".8">
        <circle cx="100" cy="100" r="96" />
        <circle cx="100" cy="100" r="90" opacity=".5" />
        <circle cx="100" cy="100" r="58" />
        <circle cx="100" cy="100" r="52" opacity=".5" />
        {petals.map((a) => (
          <path
            key={a}
            transform={`rotate(${a} 100 100)`}
            d="M100 14 C108 26 108 38 100 48 C92 38 92 26 100 14 Z"
          />
        ))}
      </g>
      <g fill="currentColor">
        {dots.map((a) => (
          <circle key={a} transform={`rotate(${a} 100 100)`} cx="100" cy="7" r="1.1" />
        ))}
      </g>
    </svg>
  );
}

/* Thoranam — mango leaves & marigolds strung across a doorway */
export function Toran({ className = "" }) {
  // Points along a gentle sag from (10,14) to (310,14)
  const n = 13;
  const items = Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    const x = 10 + t * 300;
    const y = 14 + Math.sin(Math.PI * t) * 16;
    return { x, y, i };
  });
  return (
    <svg className={`toran ${className}`} viewBox="0 0 320 78" {...deco}>
      <path d="M6 12 Q160 46 314 12" fill="none" stroke="#8a6732" strokeWidth="1.4" />
      {items.map(({ x, y, i }) =>
        i % 2 === 0 ? (
          <g key={i} transform={`translate(${x} ${y})`}>
            <g className="toran__leaf" style={{ "--i": i }}>
              <path d="M0 0 C7 10 6 24 0 34 C-6 24 -7 10 0 0 Z" fill="#6f7d3a" />
              <path d="M0 2 V31" stroke="#9aa65a" strokeWidth=".8" />
            </g>
          </g>
        ) : (
          <g key={i} transform={`translate(${x} ${y + 6})`}>
            <g className="toran__flower" style={{ "--i": i }}>
              <circle r="7.5" fill="#d98a2b" />
              <circle r="5" fill="#e9a23b" />
              <circle r="2.2" fill="#b86a1d" />
            </g>
          </g>
        ),
      )}
      <g className="toran__bell toran__bell--l">
        <path d="M6 12 V30" stroke="#8a6732" strokeWidth="1" />
        <path d="M0 40 C0 32 3 30 6 30 C9 30 12 32 12 40 Z" fill="#b08d57" />
        <circle cx="6" cy="42" r="1.8" fill="#8a6732" />
      </g>
      <g className="toran__bell toran__bell--r">
        <path d="M314 12 V30" stroke="#8a6732" strokeWidth="1" />
        <path d="M308 40 C308 32 311 30 314 30 C317 30 320 32 320 40 Z" fill="#b08d57" />
        <circle cx="314" cy="42" r="1.8" fill="#8a6732" />
      </g>
    </svg>
  );
}

/* Hanging palace lantern with a glowing lamp */
export function Lantern({ className = "", chain = 46 }) {
  return (
    <svg className={`lantern ${className}`} viewBox={`0 0 40 ${chain + 74}`} {...deco}>
      <path d={`M20 0 V${chain}`} stroke="var(--gold)" strokeWidth="1" strokeDasharray="2 2.5" />
      <g transform={`translate(0 ${chain})`}>
        <circle className="lantern__glow" cx="20" cy="34" r="20" fill="url(#lanternGlow)" />
        <defs>
          <radialGradient id="lanternGlow">
            <stop offset="0" stopColor="#ffd98a" stopOpacity=".75" />
            <stop offset="1" stopColor="#ffd98a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d="M20 0 L26 8 H14 Z" fill="var(--gold)" />
        <path d="M11 8 H29 C31 14 31 16 29 18 H11 C9 16 9 14 11 8 Z" fill="var(--gold-deep)" />
        <path d="M12 18 H28 L30 44 C30 50 25 54 20 54 C15 54 10 50 10 44 Z" fill="none" stroke="var(--gold)" strokeWidth="1.4" />
        <path d="M16 20 V50 M20 20 V54 M24 20 V50" stroke="var(--gold)" strokeWidth=".7" opacity=".7" />
        <path className="lantern__flame" d="M20 28 C23 33 23 37 20 40 C17 37 17 33 20 28 Z" fill="#ffcf6a" />
        <path d="M16 56 H24 L20 66 Z" fill="var(--gold)" />
        <circle cx="20" cy="70" r="2.4" fill="var(--gold)" />
      </g>
    </svg>
  );
}

/* Twinkling gold dust — CSS-only particles */
export function Sparkles({ count = 18, className = "" }) {
  return (
    <div className={`sparkles ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          style={{
            "--x": `${(i * 37 + 11) % 100}%`,
            "--y": `${(i * 53 + 7) % 100}%`,
            "--s": `${2 + (i % 4)}px`,
            "--t": `${3 + (i % 5) * 0.9}s`,
            "--dl": `${-(i * 0.7)}s`,
          }}
        />
      ))}
    </div>
  );
}

/* Small bus glyph for the route animation */
export function BusGlyph() {
  return (
    <g>
      <rect x="-13" y="-9" width="26" height="16" rx="4" fill="#6b1e2e" />
      <rect x="-10" y="-6" width="8" height="5" rx="1" fill="#fbf6ec" />
      <rect x="1" y="-6" width="9" height="5" rx="1" fill="#fbf6ec" />
      <circle cx="-7" cy="8" r="2.6" fill="#2f1d16" />
      <circle cx="7" cy="8" r="2.6" fill="#2f1d16" />
      <rect x="-13" y="2" width="26" height="1.6" fill="#d6bd8a" />
    </g>
  );
}

/* Gently drifting petals — pure CSS animation, hidden for reduced motion */
export function Petals({ count = 9 }) {
  return (
    <div className="petals" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="petal" style={{ "--i": i }}>
          <svg viewBox="0 0 20 28">
            <path d="M10 1 C17 8 18 18 10 27 C2 18 3 8 10 1 Z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  );
}
