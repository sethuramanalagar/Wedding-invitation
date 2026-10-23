import { useId } from "react";

/* Shared gold-foil gradient */
export function GoldDefs({ id }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#f7e3a1" />
        <stop offset=".28" stopColor="#d4a640" />
        <stop offset=".5" stopColor="#fff1c1" />
        <stop offset=".72" stopColor="#b8862b" />
        <stop offset="1" stopColor="#e9c46a" />
      </linearGradient>
    </defs>
  );
}

/* Ogee (palace) arch — shared by mask and border */
export const ARCH_PATH =
  "M0,300 L0,96 C0,62 28,46 60,36 C84,28 95,16 100,0 C105,16 116,28 140,36 C172,46 200,62 200,96 L200,300 Z";

export const archMask = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300' preserveAspectRatio='none'><path d='${ARCH_PATH}' fill='black'/></svg>`,
)}")`;

export function ArchBorder({ className = "", chase = false }) {
  const g = useId();
  if (chase)
    return (
      <svg className={className} viewBox="0 0 200 300" preserveAspectRatio="none" aria-hidden="true">
        <path className="chase-a" d={ARCH_PATH} fill="none" stroke="#fff3c4" strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        <path className="chase-b" d={ARCH_PATH} fill="none" stroke="#ffb347" strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
    );
  return (
    <svg className={className} viewBox="0 0 200 300" preserveAspectRatio="none" aria-hidden="true">
      <GoldDefs id={g} />
      <path d={ARCH_PATH} fill="none" stroke={`url(#${g})`} strokeWidth="3" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/* Filigree divider with a lotus in the middle; draws itself when visible */
export function Divider({ className = "" }) {
  const g = useId();
  return (
    <svg className={`divider ${className}`} viewBox="0 0 320 40" aria-hidden="true">
      <GoldDefs id={g} />
      <g fill="none" stroke={`url(#${g})`} strokeWidth="1.3" strokeLinecap="round">
        <path className="draw" d="M8 20 H112 C122 20 126 12 134 12 C140 12 142 18 138 21" />
        <path className="draw" d="M312 20 H208 C198 20 194 12 186 12 C180 12 178 18 182 21" />
        <path className="draw" d="M60 20 C70 28 84 28 92 22" />
        <path className="draw" d="M260 20 C250 28 236 28 228 22" />
      </g>
      <g fill={`url(#${g})`}>
        <path d="M160 6 C166 14 168 22 160 32 C152 22 154 14 160 6Z" />
        <path d="M160 32 C150 30 142 24 140 14 C150 16 156 22 160 32Z" opacity=".85" />
        <path d="M160 32 C170 30 178 24 180 14 C170 16 164 22 160 32Z" opacity=".85" />
        <circle cx="8" cy="20" r="2.2" />
        <circle cx="312" cy="20" r="2.2" />
      </g>
    </svg>
  );
}

/* Marigold & mango-leaf toran hanging from the top */
export function Toran({ className = "" }) {
  const strings = 9;
  return (
    <div className={`toran ${className}`} aria-hidden="true">
      <svg viewBox="0 0 360 70" preserveAspectRatio="none" className="toran-rope">
        <path d="M0 6 Q180 30 360 6" fill="none" stroke="#7a5a12" strokeWidth="1.5" />
        {Array.from({ length: 14 }).map((_, i) => {
          const x = 12 + i * 25.6;
          const y = 6 + 24 * (1 - Math.pow((x - 180) / 180, 2)) - 2;
          return (
            <path
              key={i}
              d={`M${x} ${y} q-7 14 0 26 q7 -12 0 -26z`}
              fill={i % 2 ? "#2f6b2a" : "#3f8a35"}
              stroke="#1f4a1b"
              strokeWidth=".5"
            />
          );
        })}
      </svg>
      <div className="toran-strings">
        {Array.from({ length: strings }).map((_, i) => (
          <span
            key={i}
            className="mstring"
            style={{
              "--i": i,
              marginTop: `${((6 + 24 * (1 - Math.pow(2 * (0.03 + (i / (strings - 1)) * 0.94) - 1, 2))) * 44) / 70 - 1}px`,
            }}
          >
            {Array.from({ length: 4 + (i % 3 === 1 ? 3 : i % 2) }).map((__, j) => (
              <i key={j} className={j % 2 ? "mb red" : "mb"} />
            ))}
            <b className="tassel" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* Corner filigree for cards */
export function Corner({ className = "" }) {
  const g = useId();
  return (
    <svg className={`corner ${className}`} viewBox="0 0 80 80" aria-hidden="true">
      <GoldDefs id={g} />
      <g fill="none" stroke={`url(#${g})`} strokeWidth="1.4" strokeLinecap="round">
        <path d="M4 76 V20 Q4 4 20 4 H76" />
        <path d="M12 76 V26 Q12 12 26 12 H76" opacity=".6" />
        <path d="M20 20 C30 22 34 30 30 38 C26 30 28 24 20 20Z" fill={`url(#${g})`} />
        <path d="M24 46 C34 46 40 40 42 30" />
        <path d="M46 24 C46 34 40 40 30 42" />
      </g>
      <circle cx="20" cy="20" r="2.4" fill={`url(#${g})`} />
    </svg>
  );
}

/* Brass temple bell */
export function Bell({ className = "", style }) {
  const g = useId();
  return (
    <svg className={className} style={style} viewBox="0 0 30 90" aria-hidden="true">
      <GoldDefs id={g} />
      <line x1="15" y1="0" x2="15" y2="48" stroke="#a37a22" strokeWidth="1.2" />
      <circle cx="15" cy="30" r="3" fill={`url(#${g})`} />
      <path d="M15 48 C6 48 5 60 4 74 H26 C25 60 24 48 15 48Z" fill={`url(#${g})`} stroke="#8a6416" strokeWidth=".6" />
      <rect x="2" y="73" width="26" height="4" rx="2" fill="#b8862b" />
      <circle cx="15" cy="82" r="3.2" fill="#8a6416" />
    </svg>
  );
}

/* Oil lamp (diya) with flickering flame */
export function Diya({ className = "" }) {
  const g = useId();
  return (
    <svg className={`diya ${className}`} viewBox="0 0 60 50" aria-hidden="true">
      <GoldDefs id={g} />
      <ellipse className="glow" cx="30" cy="16" rx="16" ry="16" fill="#ffcf6b" opacity=".35" />
      <path className="flame" d="M30 4 C35 12 36 18 30 24 C24 18 25 12 30 4Z" fill="#ffb627" />
      <path className="flame inner" d="M30 11 C32 15 32 19 30 22 C28 19 28 15 30 11Z" fill="#fff3c4" />
      <path d="M4 28 C10 46 50 46 56 28 C44 32 16 32 4 28Z" fill={`url(#${g})`} stroke="#8a6416" strokeWidth=".7" />
      <path d="M24 46 H36 L33 50 H27Z" fill="#a37a22" />
    </svg>
  );
}

/* Peacock feather — used as a quiet accent */
export function Feather({ className = "", style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 40 120" aria-hidden="true">
      <path d="M20 118 C20 80 19 50 20 10" stroke="#8a6d2a" strokeWidth="1" fill="none" />
      {Array.from({ length: 16 }).map((_, i) => (
        <g key={i} stroke="#3c7a4e" strokeWidth=".6" opacity=".75">
          <path d={`M20 ${110 - i * 6} q-${8 + (i % 4)} -6 -${14 - i * 0.4} -${4 + i * 0.2}`} fill="none" />
          <path d={`M20 ${110 - i * 6} q${8 + (i % 4)} -6 ${14 - i * 0.4} -${4 + i * 0.2}`} fill="none" />
        </g>
      ))}
      <ellipse cx="20" cy="22" rx="13" ry="17" fill="#2f7d5b" />
      <ellipse cx="20" cy="24" rx="9" ry="12" fill="#c9a23a" />
      <ellipse cx="20" cy="25" rx="6" ry="8.5" fill="#0f4f74" />
      <ellipse cx="20" cy="26" rx="3.2" ry="4.8" fill="#081f3a" />
    </svg>
  );
}

/* "S & R" monogram — decorative capitals with a script ampersand */
export function Monogram({ a = "S", b = "R", className = "" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true">
      <text x="27" y="64" textAnchor="middle" fontFamily="'Cinzel Decorative', serif" fontWeight="700" fontSize="36" fill="currentColor">
        {a}
      </text>
      <text x="50" y="70" textAnchor="middle" fontFamily="'Great Vibes', cursive" fontSize="34" fill="currentColor" opacity=".85">
        &amp;
      </text>
      <text x="73" y="64" textAnchor="middle" fontFamily="'Cinzel Decorative', serif" fontWeight="700" fontSize="36" fill="currentColor">
        {b}
      </text>
    </svg>
  );
}

/* Gold medallion with the monogram, glints and a turning halo */
export function MonogramBadge({ a = "S", b = "R", className = "", onClick }) {
  const g = useId();
  return (
    <button type="button" className={`mono-badge ${className}`} onClick={onClick} aria-label={`${a} & ${b}`}>
      <span className="mono-halo" aria-hidden="true" />
      <svg className="mono-ring" viewBox="0 0 120 120" aria-hidden="true">
        <GoldDefs id={g} />
        <circle cx="60" cy="60" r="56" fill="none" stroke={`url(#${g})`} strokeWidth="1.6" />
        <circle cx="60" cy="60" r="50" fill="none" stroke={`url(#${g})`} strokeWidth=".8" strokeDasharray="1 4" strokeLinecap="round" />
        {Array.from({ length: 12 }).map((_, i) => (
          <path key={i} d="M60 2 C63 7 63 9 60 12 C57 9 57 7 60 2Z" fill={`url(#${g})`} transform={`rotate(${i * 30} 60 60)`} />
        ))}
      </svg>
      <span className="mono-text" aria-hidden="true">
        <span className="mono-l">{a}</span>
        <span className="mono-amp">&amp;</span>
        <span className="mono-l">{b}</span>
      </span>
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className={`glint g${i}`} aria-hidden="true" />
      ))}
    </button>
  );
}

/* A drooping string of twinkling fairy lights */
export function FairyLights({ count = 16, className = "" }) {
  const colors = ["#ffd166", "#ff8fab", "#fff3c4", "#ffb347", "#9be7ff"];
  return (
    <div className={`fairy ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 60" preserveAspectRatio="none">
        <path d="M0 4 Q100 50 200 22 Q300 50 400 4" fill="none" stroke="#5a4a1a" strokeWidth="1.2" />
      </svg>
      {Array.from({ length: count }).map((_, i) => {
        const x = (i + 0.5) / count;
        const seg = x < 0.5 ? x * 2 : (x - 0.5) * 2;
        const y0 = x < 0.5 ? 4 : 22, y1 = x < 0.5 ? 22 : 4;
        const y = (1 - seg) ** 2 * y0 + 2 * (1 - seg) * seg * 50 + seg ** 2 * y1; // quadratic bezier
        return (
          <i
            key={i}
            style={{ left: `${x * 100}%`, top: `${(y / 60) * 100}%`, "--c": colors[i % colors.length], animationDelay: `${(i % 5) * 0.35}s` }}
          />
        );
      })}
    </div>
  );
}
