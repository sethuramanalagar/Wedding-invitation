/**
 * Animated illustrations for the venue cards (decorative).
 * Temple at pre-dawn · Hall at sunrise · Reception in the evening.
 */
const deco = { "aria-hidden": true, focusable: "false", preserveAspectRatio: "xMidYMid slice" };

function Stars() {
  const pts = [[20, 18], [60, 34], [96, 12], [140, 26], [230, 16], [262, 40], [288, 20], [180, 10], [40, 60], [270, 70]];
  return pts.map(([x, y], i) => (
    <circle key={i} className="va-star" style={{ "--i": i }} cx={x} cy={y} r={i % 3 ? 1.1 : 1.6} fill="#fff4d6" />
  ));
}

function Lamp({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle className="va-glow" r="14" cy="-10" fill="url(#vaLampGlow)" />
      <path d="M-7 0 Q0 6 7 0 L5 -4 H-5 Z" fill="#e7bb4f" />
      <path className="va-flame" d="M0 -16 C3 -10 3 -7 0 -4 C-3 -7 -3 -10 0 -16 Z" fill="#ffcf6a" />
    </g>
  );
}

export function TempleArt() {
  return (
    <svg viewBox="0 0 300 150" {...deco} className="venue-art">
      <defs>
        <linearGradient id="vaDawn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b1030" />
          <stop offset="0.6" stopColor="#4a1a3a" />
          <stop offset="1" stopColor="#8a3a4a" />
        </linearGradient>
        <radialGradient id="vaLampGlow">
          <stop offset="0" stopColor="#ffd98a" stopOpacity=".8" />
          <stop offset="1" stopColor="#ffd98a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height="150" fill="url(#vaDawn)" />
      <Stars />
      <circle cx="250" cy="32" r="11" fill="#fff4d6" opacity=".9" />
      <circle cx="255" cy="28" r="10" fill="#2a1336" />
      {/* gopuram */}
      <g fill="#c9a45c" stroke="#8a6732" strokeWidth="1">
        <path d="M150 12 L154 20 H146 Z" />
        <rect x="140" y="20" width="20" height="8" rx="3" />
        <path d="M128 28 H172 L176 46 H124 Z" />
        <path d="M120 46 H180 L186 66 H114 Z" />
        <path d="M110 66 H190 L196 88 H104 Z" />
        <path d="M100 88 H200 L206 112 H94 Z" />
        <rect x="88" y="112" width="124" height="38" />
      </g>
      <g stroke="#8a6732" strokeWidth="1" fill="none" opacity=".8">
        <path d="M134 37 H166 M126 56 H174 M118 77 H182 M108 100 H192" strokeDasharray="4 3" />
      </g>
      <path d="M136 150 V128 Q150 114 164 128 V150 Z" fill="#2a1336" />
      <path d="M140 150 V130 Q150 120 160 130 V150" stroke="#ffcf6a" strokeOpacity=".5" fill="none" />
      {/* temple flag */}
      <g className="va-flag">
        <path d="M176 28 V6" stroke="#8a6732" strokeWidth="1.4" />
        <path d="M176 6 L192 10 L176 14 Z" fill="#e05a1b" />
      </g>
      <Lamp x="70" y="146" />
      <Lamp x="230" y="146" />
      <Lamp x="118" y="146" />
      <Lamp x="182" y="146" />
    </svg>
  );
}

export function HallArt() {
  return (
    <svg viewBox="0 0 300 150" {...deco} className="venue-art">
      <defs>
        <linearGradient id="vaSunrise" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6c6a0" />
          <stop offset="0.7" stopColor="#fbe3c8" />
          <stop offset="1" stopColor="#fff4e2" />
        </linearGradient>
        <radialGradient id="vaSun">
          <stop offset="0" stopColor="#fff2b8" />
          <stop offset="1" stopColor="#f6a54a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height="150" fill="url(#vaSunrise)" />
      <circle className="va-sun" cx="150" cy="60" r="46" fill="url(#vaSun)" />
      {/* hall building */}
      <rect x="54" y="60" width="192" height="90" fill="#fff8ee" stroke="#c9a45c" />
      <path d="M46 62 H254 L240 46 H60 Z" fill="#9e1b32" />
      <rect x="112" y="30" width="76" height="18" rx="3" fill="#8a1c2c" stroke="#e7bb4f" />
      <text x="150" y="43" textAnchor="middle" fontFamily="Georgia, serif" fontSize="9" fill="#f3dc9a" letterSpacing="1.5">
        WELCOME
      </text>
      {[80, 124, 176, 220].map((x) => (
        <path key={x} d={`M${x - 12} 150 V104 Q${x - 12} 86 ${x} 82 Q${x + 12} 86 ${x + 12} 104 V150 Z`} fill="#f3e2c4" stroke="#c9a45c" />
      ))}
      <path d="M134 150 V100 Q134 78 150 74 Q166 78 166 100 V150 Z" fill="#8a1c2c" stroke="#e7bb4f" />
      {/* string lights */}
      <path d="M54 64 Q100 80 150 64 Q200 80 246 64" stroke="#8a6732" fill="none" strokeWidth=".8" />
      {Array.from({ length: 15 }, (_, i) => {
        const t = i / 14;
        const x = 54 + t * 192;
        const y = 64 + Math.sin(t * Math.PI * 2 - Math.PI / 2) * -8 + 8;
        return <circle key={i} className="va-bulb" style={{ "--i": i }} cx={x} cy={y} r="2.3" fill={i % 2 ? "#ffd166" : "#ff8c5a"} />;
      })}
      {/* banana trees at the entrance */}
      {[36, 264].map((x, k) => (
        <g key={x} transform={k ? `translate(${2 * x} 0) scale(-1 1)` : undefined}>
          <g className="va-banana" style={{ transformOrigin: `${x}px 150px` }}>
          <path d={`M${x} 150 V92`} stroke="#6f7d3a" strokeWidth="5" />
          <path d={`M${x} 96 Q${x - 26} 80 ${x - 30} 96 Q${x - 16} 92 ${x} 100 Z`} fill="#7d8a3a" />
          <path d={`M${x} 92 Q${x + 24} 70 ${x + 32} 84 Q${x + 16} 84 ${x} 98 Z`} fill="#8fa046" />
          <path d={`M${x} 92 Q${x - 6} 66 ${x + 4} 60 Q${x + 6} 76 ${x} 94 Z`} fill="#6f7d3a" />
          </g>
        </g>
      ))}
    </svg>
  );
}

export function ReceptionArt() {
  return (
    <svg viewBox="0 0 300 150" {...deco} className="venue-art">
      <defs>
        <linearGradient id="vaEve" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a1a3a" />
          <stop offset="0.6" stopColor="#8a3a3a" />
          <stop offset="1" stopColor="#e0a060" />
        </linearGradient>
        <radialGradient id="vaLampGlow2">
          <stop offset="0" stopColor="#ffd98a" stopOpacity=".8" />
          <stop offset="1" stopColor="#ffd98a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="300" height="150" fill="url(#vaEve)" />
      <Stars />
      {[0, 1, 2].map((r) => (
        <path
          key={r}
          d={`M0 ${20 + r * 18} Q150 ${60 + r * 18} 300 ${20 + r * 18}`}
          stroke="#8a6732"
          strokeOpacity=".5"
          fill="none"
        />
      ))}
      {Array.from({ length: 36 }, (_, i) => {
        const row = i % 3;
        const t = Math.floor(i / 3) / 11;
        const x = t * 300;
        const y = 20 + row * 18 + Math.sin(t * Math.PI) * 40;
        return <circle key={i} className="va-bulb" style={{ "--i": i }} cx={x} cy={y} r="2" fill="#ffe08a" />;
      })}
      <rect x="0" y="120" width="300" height="30" fill="#2a0f1d" opacity=".6" />
      {[40, 100, 150, 200, 260].map((x) => (
        <g key={x} transform={`translate(${x} 126)`}>
          <circle className="va-glow" r="16" cy="-8" fill="url(#vaLampGlow2)" />
          <path d="M-7 0 Q0 6 7 0 L5 -4 H-5 Z" fill="#e7bb4f" />
          <path className="va-flame" d="M0 -16 C3 -10 3 -7 0 -4 C-3 -7 -3 -10 0 -16 Z" fill="#ffcf6a" />
        </g>
      ))}
    </svg>
  );
}
