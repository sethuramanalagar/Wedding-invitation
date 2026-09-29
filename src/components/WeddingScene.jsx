import { wedding } from "../config/wedding.js";
import { KolamDivider, Petals, Sparkles } from "./Ornaments.jsx";

/* ── Cartoon characters (drawn with feet at 0,0; up is negative y) ── */

function Garland({ className = "", colors = ["#c8102e", "#fff8e7"] }) {
  const dots = Array.from({ length: 22 }, (_, i) => {
    const a = (i / 22) * Math.PI * 2;
    return { x: Math.cos(a) * 17, y: Math.sin(a) * 22 + 4, c: colors[i % 2], r: i % 2 ? 3.2 : 4 };
  });
  return (
    <g className={className}>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x.toFixed(1)} cy={d.y.toFixed(1)} r={d.r} fill={d.c} />
      ))}
      <circle cx="0" cy="28" r="4.5" fill="#f2b233" />
      <path d="M-3 30 L0 40 L3 30 Z" fill="#c8102e" />
    </g>
  );
}

function Groom() {
  const skin = "#a4663f";
  return (
    <g>
      {/* feet */}
      <ellipse cx="-10" cy="-2" rx="9" ry="4" fill="#5a3522" />
      <ellipse cx="10" cy="-2" rx="9" ry="4" fill="#5a3522" />
      {/* veshti */}
      <path d="M-25 -84 H25 L29 -4 H-29 Z" fill="#fbf5e6" stroke="#e4d6b8" strokeWidth="1" />
      <rect x="-29" y="-12" width="58" height="6" fill="#d4a441" />
      <path d="M7 -84 L10 -6" stroke="#d4a441" strokeWidth="3" />
      {/* arms */}
      <path d="M-26 -146 Q-40 -120 -34 -96" stroke="#f7efdc" strokeWidth="13" strokeLinecap="round" fill="none" />
      <path d="M26 -146 Q40 -120 34 -96" stroke="#f7efdc" strokeWidth="13" strokeLinecap="round" fill="none" />
      <circle cx="-34" cy="-92" r="6" fill={skin} />
      <circle cx="34" cy="-92" r="6" fill={skin} />
      {/* shirt */}
      <rect x="-26" y="-152" width="52" height="72" rx="12" fill="#fdf7ea" stroke="#e4d6b8" />
      <path d="M0 -150 V-90" stroke="#e4d6b8" />
      {/* angavastram sash */}
      <path d="M-24 -150 L-12 -152 L26 -96 L24 -84 Z" fill="#d9b25f" />
      <path d="M-20 -150 L24 -90" stroke="#8a1c2c" strokeWidth="1.5" />
      {/* neck + head */}
      <rect x="-6" y="-164" width="12" height="14" fill={skin} />
      <circle cx="-22" cy="-178" r="4.5" fill={skin} />
      <circle cx="22" cy="-178" r="4.5" fill={skin} />
      <circle cx="0" cy="-180" r="22" fill={skin} />
      {/* hair */}
      <path d="M-22 -182 Q-25 -210 0 -208 Q25 -210 22 -182 Q16 -198 2 -197 Q-14 -199 -22 -182 Z" fill="#1c1310" />
      {/* beard & moustache */}
      <path d="M-20 -176 Q-19 -156 0 -154 Q19 -156 20 -176 Q13 -163 0 -164 Q-13 -163 -20 -176 Z" fill="#241713" />
      <path d="M-9 -170 Q0 -175 9 -170 Q0 -166 -9 -170 Z" fill="#241713" />
      <path d="M-5 -165 Q0 -161 5 -165" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* eyes & brows */}
      <path d="M-12 -184 Q-8 -188 -4 -184" stroke="#1c1310" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M4 -184 Q8 -188 12 -184" stroke="#1c1310" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M-13 -191 Q-8 -194 -3 -191" stroke="#1c1310" strokeWidth="1.6" fill="none" />
      <path d="M3 -191 Q8 -194 13 -191" stroke="#1c1310" strokeWidth="1.6" fill="none" />
      <circle cx="-13" cy="-175" r="3.5" fill="#e07a6a" opacity=".35" />
      <circle cx="13" cy="-175" r="3.5" fill="#e07a6a" opacity=".35" />
      {/* tilak */}
      <ellipse cx="0" cy="-196" rx="2.6" ry="1.6" fill="#fff4e0" />
      <circle cx="0" cy="-196" r="1.3" fill="#c8102e" />
    </g>
  );
}

function Bride() {
  const skin = "#b27650";
  return (
    <g>
      {/* jasmine behind head */}
      {Array.from({ length: 11 }, (_, i) => {
        const a = Math.PI * (0.95 + (i / 10) * 1.1);
        return <circle key={i} cx={Math.cos(a) * 26} cy={-182 + Math.sin(a) * 26} r="3.4" fill="#fffdf4" stroke="#e8e0c8" strokeWidth=".5" />;
      })}
      {/* braid */}
      <path d="M-18 -170 Q-30 -120 -24 -80" stroke="#1c1310" strokeWidth="9" strokeLinecap="round" fill="none" />
      {/* feet */}
      <ellipse cx="-9" cy="-2" rx="8" ry="3.5" fill="#8a3a1f" />
      <ellipse cx="9" cy="-2" rx="8" ry="3.5" fill="#8a3a1f" />
      {/* saree skirt */}
      <path d="M-26 -90 H26 L36 -4 H-36 Z" fill="url(#sareeGrad)" />
      <rect x="-36" y="-14" width="72" height="9" fill="#e7bb4f" />
      <path d="M-6 -88 L-9 -6 M0 -88 L0 -6 M6 -88 L9 -6" stroke="#e7bb4f" strokeWidth="1.6" />
      {/* arms */}
      <path d="M-22 -144 Q-36 -118 -30 -98" stroke={skin} strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M22 -144 Q36 -118 30 -98" stroke={skin} strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M-24 -144 Q-30 -134 -30 -128" stroke="#9e1b32" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M24 -144 Q30 -134 30 -128" stroke="#9e1b32" strokeWidth="12" strokeLinecap="round" fill="none" />
      <rect x="-35" y="-108" width="10" height="7" rx="2" fill="#e7bb4f" />
      <rect x="25" y="-108" width="10" height="7" rx="2" fill="#e7bb4f" />
      {/* blouse & waist */}
      <rect x="-22" y="-150" width="44" height="46" rx="10" fill="#9e1b32" />
      <rect x="-19" y="-106" width="38" height="18" fill={skin} />
      {/* pallu across the body */}
      <path d="M-22 -150 L-6 -152 L28 -94 L26 -84 L-4 -84 Z" fill="url(#sareeGrad)" />
      <path d="M-6 -152 L28 -94" stroke="#e7bb4f" strokeWidth="4" />
      <path d="M-22 -148 Q-40 -100 -34 -60" stroke="#d94a26" strokeWidth="12" fill="none" strokeLinecap="round" />
      {/* necklaces */}
      <path d="M-10 -154 Q0 -142 10 -154" stroke="#f0c75e" strokeWidth="3" fill="none" />
      <path d="M-12 -152 Q0 -122 12 -152" stroke="#e7bb4f" strokeWidth="2.4" fill="none" />
      <circle cx="0" cy="-124" r="3.5" fill="#e7bb4f" />
      {/* neck + head */}
      <rect x="-5.5" y="-162" width="11" height="12" fill={skin} />
      <circle cx="0" cy="-178" r="21" fill={skin} />
      {/* hair with centre parting */}
      <path d="M-21 -178 Q-24 -205 0 -203 Q24 -205 21 -178 Q18 -194 2 -196 L0 -190 L-2 -196 Q-18 -194 -21 -178 Z" fill="#1c1310" />
      {/* maang tikka */}
      <path d="M0 -200 V-191" stroke="#e7bb4f" strokeWidth="1.4" />
      <circle cx="0" cy="-189" r="3" fill="#e7bb4f" />
      <circle cx="0" cy="-189" r="1.2" fill="#c8102e" />
      {/* earrings */}
      <circle cx="-21" cy="-170" r="3" fill="#e7bb4f" />
      <circle cx="21" cy="-170" r="3" fill="#e7bb4f" />
      {/* face */}
      <circle cx="0" cy="-182" r="1.6" fill="#c8102e" />
      <path d="M-11 -178 Q-7 -182 -3 -178" stroke="#1c1310" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M3 -178 Q7 -182 11 -178" stroke="#1c1310" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M-5 -167 Q0 -162 5 -167" stroke="#b3203a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <circle cx="-12" cy="-171" r="3.5" fill="#e07a6a" opacity=".4" />
      <circle cx="12" cy="-171" r="3.5" fill="#e07a6a" opacity=".4" />
      <circle cx="3.5" cy="-173" r="1.2" fill="#e7bb4f" />
    </g>
  );
}

function Elephant() {
  const g = "#8e8996";
  const g2 = "#7a7582";
  return (
    <g>
      {/* royal umbrella */}
      <g className="ws-umbrella">
        <path d="M-6 -118 V-175" stroke="#8a6732" strokeWidth="2.5" />
        <path d="M-40 -172 Q-6 -206 28 -172 Z" fill="#b3203a" />
        <path d="M-40 -172 Q-6 -186 28 -172" stroke="#e7bb4f" strokeWidth="3" fill="none" />
        {[-36, -26, -16, -6, 4, 14, 24].map((x) => (
          <path key={x} d={`M${x} -172 v8`} stroke="#e7bb4f" strokeWidth="2" />
        ))}
        <circle cx="-6" cy="-194" r="3" fill="#e7bb4f" />
      </g>
      {/* legs */}
      <rect x="-52" y="-44" width="17" height="44" rx="5" fill={g2} />
      <rect x="-28" y="-40" width="17" height="40" rx="5" fill={g2} />
      <rect x="12" y="-44" width="18" height="44" rx="5" fill={g} />
      <rect x="34" y="-42" width="18" height="42" rx="5" fill={g} />
      <path d="M-66 -78 Q-78 -60 -72 -44" stroke={g2} strokeWidth="3" fill="none" />
      {/* body */}
      <ellipse cx="-8" cy="-74" rx="58" ry="44" fill={g} />
      {/* caparison */}
      <path d="M-50 -112 Q-10 -128 30 -112 L30 -62 Q20 -54 10 -62 Q0 -54 -10 -62 Q-20 -54 -30 -62 Q-40 -54 -50 -62 Z" fill="#8a1c2c" />
      <path d="M-50 -66 Q-40 -58 -30 -66 Q-20 -58 -10 -66 Q0 -58 10 -66 Q20 -58 30 -66" stroke="#e7bb4f" strokeWidth="3" fill="none" />
      <path d="M-42 -106 Q-10 -118 22 -106" stroke="#e7bb4f" strokeWidth="2" fill="none" strokeDasharray="3 3" />
      {[-44, -30, -16, -2, 12, 26].map((x) => (
        <circle key={x} cx={x + 4} cy="-54" r="2.6" fill="#e7bb4f" />
      ))}
      <circle cx="-10" cy="-88" r="9" fill="none" stroke="#e7bb4f" strokeWidth="2" />
      {/* head */}
      <circle cx="46" cy="-100" r="31" fill={g} />
      <path d="M36 -122 Q14 -112 18 -88 Q24 -70 40 -78 Z" fill={g2} />
      {/* nettipattam (golden forehead ornament) */}
      <path d="M52 -134 L74 -130 L72 -96 L62 -80 L54 -96 Z" fill="#e7bb4f" stroke="#b8893c" />
      {[[62, -124], [58, -114], [68, -114], [62, -104], [66, -94]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="2.2" fill="#fff3c9" />
      ))}
      {/* eye & tusk */}
      <circle cx="52" cy="-104" r="2.6" fill="#1c1310" />
      <path d="M48 -108 q4 -3 8 0" stroke="#1c1310" strokeWidth="1" fill="none" />
      <path d="M64 -78 Q78 -72 86 -80" stroke="#fffbee" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* trunk (raises to bless) */}
      <g className="ws-trunk">
        <path d="M66 -92 Q84 -60 80 -30 Q78 -16 88 -14" stroke={g} strokeWidth="15" strokeLinecap="round" fill="none" />
        <path d="M74 -70 h8 M76 -56 h8 M76 -42 h8" stroke={g2} strokeWidth="1.5" />
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="14s"
          repeatCount="indefinite"
          keyTimes="0;0.44;0.5;0.58;0.64;0.7;0.76;0.82;0.9;1"
          values="0 66 -88;0 66 -88;-62 66 -88;-62 66 -88;-10 66 -88;-10 66 -88;-55 66 -88;-55 66 -88;0 66 -88;0 66 -88"
        />
      </g>
    </g>
  );
}

export default function WeddingScene() {
  const { groom, bride } = wedding;
  return (
    <section className="section scene" id="celebration" aria-labelledby="scene-title">
      <div className="scene__velvet" aria-hidden="true" />
      <div className="container">
        <p className="eyebrow reveal">A royal celebration</p>
        <h2 id="scene-title" className="section-title reveal">
          <span className="script foil scene__title">The Royal Wedding</span>
        </h2>
        <KolamDivider className="reveal" />

        <div className="scene__stage reveal">
          <svg
            className="scene__svg"
            viewBox="0 0 400 500"
            role="img"
            aria-label={`Animated illustration: cartoon ${groom.firstName} and ${bride.firstName} exchange garlands under a royal mandapam, with decorated elephants and a shower of flowers.`}
          >
            <defs>
              <linearGradient id="sareeGrad" x1="0" x2="1">
                <stop offset="0" stopColor="#e2612c" />
                <stop offset="1" stopColor="#c23b22" />
              </linearGradient>
              <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#d9b574" />
                <stop offset="1" stopColor="#9c7438" />
              </linearGradient>
              <radialGradient id="glowGrad">
                <stop offset="0" stopColor="#ffe6a8" stopOpacity=".9" />
                <stop offset="1" stopColor="#ffe6a8" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* palace wall with three arched windows */}
            <rect className="scene__wall" x="0" y="0" width="400" height="380" />
            {[70, 200, 330].map((x) => (
              <g key={x} className="scene__window">
                <path d={`M${x - 34} 330 V170 Q${x - 34} 120 ${x} 104 Q${x + 34} 120 ${x + 34} 170 V330 Z`} />
                <path d={`M${x - 26} 325 V174 Q${x - 26} 132 ${x} 118 Q${x + 26} 132 ${x + 26} 174 V325`} fill="none" />
              </g>
            ))}
            <circle cx="200" cy="230" r="120" fill="url(#glowGrad)" className="scene__glow" />

            {/* floor */}
            <path d="M0 380 H400 V500 H0 Z" fill="url(#floorGrad)" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((k) => (
              <path key={k} d={`M${200 + (k - 4) * 30} 380 L${200 + (k - 4) * 90} 500`} stroke="#8a6732" strokeOpacity=".35" />
            ))}
            <path d="M0 420 H400 M0 465 H400" stroke="#8a6732" strokeOpacity=".3" />

            {/* mandapam */}
            <g className="scene__mandapam">
              <path d="M200 20 L214 40 H186 Z" fill="#e7bb4f" />
              <circle cx="200" cy="16" r="5" fill="#e7bb4f" />
              <path d="M150 88 L170 40 H230 L250 88 Z" fill="#b3203a" stroke="#e7bb4f" strokeWidth="2" />
              <path d="M165 64 H235" stroke="#e7bb4f" strokeWidth="2" />
              <path d="M110 128 L140 88 H260 L290 128 Z" fill="#9e1b32" stroke="#e7bb4f" strokeWidth="2" />
              <rect x="86" y="128" width="228" height="20" fill="#e7bb4f" />
              <path d="M86 148 Q98 160 110 148 Q122 160 134 148 Q146 160 158 148 Q170 160 182 148 Q194 160 206 148 Q218 160 230 148 Q242 160 254 148 Q266 160 278 148 Q290 160 302 148 Q308 156 314 148" fill="#e7bb4f" />
              {[96, 304].map((x) => (
                <g key={x}>
                  <rect x={x - 9} y="150" width="18" height="250" fill="#e7bb4f" />
                  <rect x={x - 12} y="150" width="24" height="10" fill="#c99a45" />
                  <rect x={x - 12} y="260" width="24" height="8" fill="#c99a45" />
                  <rect x={x - 13} y="392" width="26" height="12" fill="#c99a45" />
                  <path d={`M${x - 5} 170 V390`} stroke="#fff3c9" strokeWidth="2" opacity=".6" />
                </g>
              ))}
              {/* marigold swag */}
              <path d="M104 160 Q200 214 296 160" stroke="#f0a02a" strokeWidth="7" fill="none" strokeDasharray="0.1 9" strokeLinecap="round" />
              <path d="M104 164 Q200 226 296 164" stroke="#e05a1b" strokeWidth="6" fill="none" strokeDasharray="0.1 9" strokeLinecap="round" />
              {[140, 260].map((x) => (
                <g key={x} className="ws-bell" style={{ transformOrigin: `${x}px 150px` }}>
                  <path d={`M${x} 150 V176`} stroke="#8a6732" />
                  <path d={`M${x - 7} 188 Q${x - 7} 176 ${x} 176 Q${x + 7} 176 ${x + 7} 188 Z`} fill="#e7bb4f" />
                  <circle cx={x} cy="190" r="2" fill="#8a6732" />
                </g>
              ))}
            </g>

            {/* elephants */}
            <g transform="translate(34 478) scale(0.8)">
              <g className="ws-elephant ws-elephant--l">
                <Elephant />
              </g>
            </g>
            <g transform="translate(366 478) scale(-0.8 0.8)">
              <g className="ws-elephant ws-elephant--r">
                <Elephant />
              </g>
            </g>

            {/* couple */}
            <g transform="translate(152 442)">
              <g className="ws-groom">
                <Groom />
              </g>
            </g>
            <g transform="translate(248 442)">
              <g className="ws-bride">
                <Bride />
              </g>
            </g>

            {/* garlands start on their own necks, then swap */}
            <g transform="translate(152 304)">
              <Garland className="ws-garland ws-garland--a" colors={["#c8102e", "#fff8e7"]} />
            </g>
            <g transform="translate(248 304)">
              <Garland className="ws-garland ws-garland--b" colors={["#f0a02a", "#fff8e7"]} />
            </g>

            {/* hearts */}
            {[
              [200, 250, 1.9],
              [178, 262, 1.3],
              [222, 262, 1.4],
              [190, 228, 1.1],
              [212, 232, 1.2],
            ].map(([x, y, sc], k) => (
              <g key={k} transform={`translate(${x} ${y}) scale(${sc})`}>
                <path
                  className="ws-heart"
                  style={{ "--k": k }}
                  d="M0 4 C-8 -4 -4 -12 0 -6 C4 -12 8 -4 0 4 Z"
                  fill={k % 2 ? "#f06b80" : "#e0324b"}
                  stroke="#fff"
                  strokeWidth=".6"
                />
              </g>
            ))}

            {/* sacred fire */}
            <g transform="translate(200 470)">
              <path d="M-26 0 L-20 -16 H20 L26 0 Z" fill="#8a3a1f" />
              <path d="M-20 -16 H20" stroke="#e7bb4f" strokeWidth="2" />
              <g className="ws-fire">
                <path d="M0 -58 C12 -40 12 -26 0 -16 C-12 -26 -12 -40 0 -58 Z" fill="#f6a623" />
                <path d="M-10 -40 C-2 -30 -2 -22 -8 -16 C-16 -22 -16 -30 -10 -40 Z" fill="#f6c343" />
                <path d="M10 -40 C18 -30 18 -22 12 -16 C4 -22 4 -30 10 -40 Z" fill="#f6c343" />
                <path d="M0 -40 C6 -30 6 -24 0 -18 C-6 -24 -6 -30 0 -40 Z" fill="#fff1b8" />
              </g>
            </g>
          </svg>
          <Petals count={12} />
          <Sparkles count={12} />
          <div className="scene__captions" aria-hidden="true">
            <p className="scene__cap scene__cap--1">Two hearts arrive…</p>
            <p className="scene__cap scene__cap--2">…garlands are exchanged…</p>
            <p className="scene__cap scene__cap--3">…showered with blessings!</p>
          </div>
        </div>
      </div>
    </section>
  );
}
