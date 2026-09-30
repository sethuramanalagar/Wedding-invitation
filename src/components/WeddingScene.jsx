import { useEffect, useRef, useState } from "react";
import { wedding } from "../config/wedding.js";
import { KolamDivider, Petals, Sparkles } from "./Ornaments.jsx";

/* ════════════════════════════════════════════════════════════
   "Sethu weds Sudha" — an animated cartoon story (SVG + CSS).
   A small timeline switches the scene through its acts; CSS
   transitions move the jointed characters between poses, while
   CSS keyframes keep the ambient life going (blinks, musicians,
   elephants, fire, lights).
   ════════════════════════════════════════════════════════════ */

// Each act: [name, duration ms, flags]
const ACTS = [
  ["enter", 120, { reset: 1 }],
  ["walk", 3400, { arrived: 1, walking: 1 }],
  ["meet", 1300, { arrived: 1, meet: 1 }],
  ["lift", 1100, { arrived: 1, armsUp: 1, garlandUp: 1 }],
  ["swap", 1400, { arrived: 1, armsUp: 1, garlandUp: 1, swapped: 1 }],
  ["settle", 800, { arrived: 1, swapped: 1 }],
  ["thali", 3400, { arrived: 1, swapped: 1, thali: 1, reach: 1 }],
  ["bless", 4200, { arrived: 1, swapped: 1, thali: 1, bless: 1 }],
  ["finale", 4600, { arrived: 1, swapped: 1, thali: 1, finale: 1, hold: 1 }],
  ["fade", 900, { arrived: 1, swapped: 1, thali: 1, fade: 1 }],
];
const CAPTION_OF = { walk: 0, meet: 0, lift: 1, swap: 1, settle: 1, thali: 2, bless: 3, finale: 4 };
const FINAL = ACTS.findIndex(([n]) => n === "finale");

function useStory(ref) {
  const [act, setAct] = useState(0);
  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setAct(FINAL);
      return;
    }
    let timer;
    let i = 0;
    let running = false;
    const step = () => {
      setAct(i);
      timer = setTimeout(() => {
        i = (i + 1) % ACTS.length;
        step();
      }, ACTS[i][1]);
    };
    // Play only while the scene is on screen; restart the story each time.
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !running) {
          running = true;
          i = 0;
          step();
        } else if (!e.isIntersecting && running) {
          running = false;
          clearTimeout(timer);
        }
      },
      { threshold: 0.25 },
    );
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [ref]);
  return act;
}

/* ── Shared bits ───────────────────────────────────────────── */
function Eyes({ y = -182, gap = 8 }) {
  return (
    <g className="toon-eyes">
      {[-gap, gap].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy={y} rx="3.4" ry="4.1" fill="#fff" />
          <circle className="toon-pupil" cx={x + 0.6} cy={y + 0.6} r="2.3" fill="#1c1310" />
          <circle cx={x + 1.4} cy={y - 0.6} r=".8" fill="#fff" />
        </g>
      ))}
    </g>
  );
}

function Garland({ colors = ["#c8102e", "#fff8e7"] }) {
  const dots = Array.from({ length: 22 }, (_, i) => {
    const a = (i / 22) * Math.PI * 2;
    return { x: Math.cos(a) * 17, y: Math.sin(a) * 22 + 4, c: colors[i % 2], r: i % 2 ? 3.2 : 4 };
  });
  return (
    <g>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x.toFixed(1)} cy={d.y.toFixed(1)} r={d.r} fill={d.c} />
      ))}
      <circle cx="0" cy="28" r="4.5" fill="#f2b233" />
      <path d="M-3 30 L0 40 L3 30 Z" fill="#c8102e" />
    </g>
  );
}

/* An arm drawn from the shoulder (0,0) hanging down; CSS rotates it. */
function Arm({ className, sleeve, skin, dir = -1, bangles = false }) {
  return (
    <g className={`toon-arm ${className}`}>
      <path d={`M0 0 Q${dir * 12} 26 ${dir * 8} 50`} stroke={sleeve} strokeWidth="12" strokeLinecap="round" fill="none" />
      {bangles && <rect x={dir * 8 - 5} y="38" width="10" height="7" rx="2" fill="#e7bb4f" />}
      <circle cx={dir * 8} cy="54" r="6" fill={skin} />
    </g>
  );
}

/* ── Groom ─────────────────────────────────────────────────── */
function Groom() {
  const skin = "#a4663f";
  return (
    <g className="toon toon--groom">
      <g className="toon-feet">
        <ellipse className="toon-foot toon-foot--l" cx="-10" cy="-2" rx="9" ry="4" fill="#5a3522" />
        <ellipse className="toon-foot toon-foot--r" cx="10" cy="-2" rx="9" ry="4" fill="#5a3522" />
      </g>
      <g className="toon-body">
        <g className="toon-dhoti">
          <path d="M-25 -84 H25 L29 -4 H-29 Z" fill="#fbf5e6" stroke="#e4d6b8" />
          <rect x="-29" y="-12" width="58" height="6" fill="#d4a441" />
          <path d="M7 -84 L10 -6" stroke="#d4a441" strokeWidth="3" />
        </g>
        <rect x="-26" y="-152" width="52" height="72" rx="12" fill="#fdf7ea" stroke="#e4d6b8" />
        <path d="M0 -150 V-90" stroke="#e4d6b8" />
        <path d="M-24 -150 L-12 -152 L26 -96 L24 -84 Z" fill="#d9b25f" />
        <path d="M-20 -150 L24 -90" stroke="#8a1c2c" strokeWidth="1.5" />
        <g transform="translate(-24 -146)">
          <Arm className="toon-arm--l" sleeve="#f7efdc" skin={skin} dir={-1} />
        </g>
        <g transform="translate(24 -146)">
          <Arm className="toon-arm--r" sleeve="#f7efdc" skin={skin} dir={1} />
        </g>
        <g className="toon-head" style={{ transformOrigin: "0px -160px" }}>
          <rect x="-6" y="-164" width="12" height="14" fill={skin} />
          <circle cx="-22" cy="-178" r="4.5" fill={skin} />
          <circle cx="22" cy="-178" r="4.5" fill={skin} />
          <circle cx="0" cy="-180" r="22" fill={skin} />
          <path d="M-22 -182 Q-25 -210 0 -208 Q25 -210 22 -182 Q16 -198 2 -197 Q-14 -199 -22 -182 Z" fill="#1c1310" />
          <path d="M-20 -176 Q-19 -156 0 -154 Q19 -156 20 -176 Q13 -163 0 -164 Q-13 -163 -20 -176 Z" fill="#241713" />
          <path d="M-9 -170 Q0 -175 9 -170 Q0 -166 -9 -170 Z" fill="#241713" />
          <path className="toon-smile" d="M-6 -166 Q0 -159 6 -166 Z" fill="#fff" />
          <Eyes y={-183} gap={8} />
          <path d="M-13 -191 Q-8 -194 -3 -191" stroke="#1c1310" strokeWidth="1.6" fill="none" />
          <path d="M3 -191 Q8 -194 13 -191" stroke="#1c1310" strokeWidth="1.6" fill="none" />
          <circle className="toon-blush" cx="-14" cy="-174" r="3.5" fill="#e07a6a" />
          <circle className="toon-blush" cx="14" cy="-174" r="3.5" fill="#e07a6a" />
          <ellipse cx="0" cy="-197" rx="2.6" ry="1.6" fill="#fff4e0" />
          <circle cx="0" cy="-197" r="1.3" fill="#c8102e" />
        </g>
      </g>
    </g>
  );
}

/* ── Bride ─────────────────────────────────────────────────── */
function Bride() {
  const skin = "#b27650";
  return (
    <g className="toon toon--bride">
      <g className="toon-feet">
        <ellipse className="toon-foot toon-foot--l" cx="-9" cy="-2" rx="8" ry="3.5" fill="#8a3a1f" />
        <ellipse className="toon-foot toon-foot--r" cx="9" cy="-2" rx="8" ry="3.5" fill="#8a3a1f" />
      </g>
      <g className="toon-body">
        <path className="toon-braid" d="M-18 -170 Q-30 -120 -24 -80" stroke="#1c1310" strokeWidth="9" strokeLinecap="round" fill="none" />
        <g className="toon-dhoti">
          <path d="M-26 -90 H26 L36 -4 H-36 Z" fill="url(#sareeGrad)" />
          <rect x="-36" y="-14" width="72" height="9" fill="#e7bb4f" />
          <path d="M-6 -88 L-9 -6 M0 -88 L0 -6 M6 -88 L9 -6" stroke="#e7bb4f" strokeWidth="1.6" />
        </g>
        <rect x="-22" y="-150" width="44" height="46" rx="10" fill="#9e1b32" />
        <rect x="-19" y="-106" width="38" height="18" fill={skin} />
        <path d="M-22 -150 L-6 -152 L28 -94 L26 -84 L-4 -84 Z" fill="url(#sareeGrad)" />
        <path d="M-6 -152 L28 -94" stroke="#e7bb4f" strokeWidth="4" />
        <path className="toon-pallu" d="M-22 -148 Q-40 -100 -34 -60" stroke="#d94a26" strokeWidth="12" fill="none" strokeLinecap="round" />
        <path d="M-10 -154 Q0 -142 10 -154" stroke="#f0c75e" strokeWidth="3" fill="none" />
        <path d="M-12 -152 Q0 -122 12 -152" stroke="#e7bb4f" strokeWidth="2.4" fill="none" />
        <g transform="translate(-21 -146)">
          <Arm className="toon-arm--l" sleeve={skin} skin={skin} dir={-1} bangles />
        </g>
        <g transform="translate(21 -146)">
          <Arm className="toon-arm--r" sleeve={skin} skin={skin} dir={1} bangles />
        </g>
        <path d="M-24 -144 Q-30 -134 -30 -128" stroke="#9e1b32" strokeWidth="12" strokeLinecap="round" fill="none" />
        <path d="M24 -144 Q30 -134 30 -128" stroke="#9e1b32" strokeWidth="12" strokeLinecap="round" fill="none" />
        <g className="toon-head" style={{ transformOrigin: "0px -158px" }}>
          {Array.from({ length: 11 }, (_, i) => {
            const a = Math.PI * (0.95 + (i / 10) * 1.1);
            return <circle key={i} cx={Math.cos(a) * 26} cy={-182 + Math.sin(a) * 26} r="3.4" fill="#fffdf4" stroke="#e8e0c8" strokeWidth=".5" />;
          })}
          <rect x="-5.5" y="-162" width="11" height="12" fill={skin} />
          <circle cx="0" cy="-178" r="21" fill={skin} />
          <path d="M-21 -178 Q-24 -205 0 -203 Q24 -205 21 -178 Q18 -194 2 -196 L0 -190 L-2 -196 Q-18 -194 -21 -178 Z" fill="#1c1310" />
          <path d="M0 -200 V-191" stroke="#e7bb4f" strokeWidth="1.4" />
          <circle cx="0" cy="-190" r="3" fill="#e7bb4f" />
          <circle cx="0" cy="-190" r="1.2" fill="#c8102e" />
          <circle className="toon-earring" cx="-21" cy="-170" r="3" fill="#e7bb4f" />
          <circle className="toon-earring" cx="21" cy="-170" r="3" fill="#e7bb4f" />
          <circle cx="0" cy="-184" r="1.5" fill="#c8102e" />
          <Eyes y={-178} gap={7.5} />
          <path d="M-11 -185 Q-7 -188 -3 -185" stroke="#1c1310" strokeWidth="1.2" fill="none" />
          <path d="M3 -185 Q7 -188 11 -185" stroke="#1c1310" strokeWidth="1.2" fill="none" />
          <path className="toon-smile" d="M-5 -167 Q0 -161 5 -167" stroke="#b3203a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <circle className="toon-blush" cx="-12" cy="-170" r="3.8" fill="#e8657a" />
          <circle className="toon-blush" cx="12" cy="-170" r="3.8" fill="#e8657a" />
          <circle cx="3.5" cy="-173" r="1.2" fill="#e7bb4f" />
        </g>
      </g>
    </g>
  );
}

/* ── Musicians ─────────────────────────────────────────────── */
function Musician({ kind }) {
  const skin = kind === "nada" ? "#9a5c38" : "#8d5434";
  return (
    <g className={`mus mus--${kind}`}>
      <g className="mus-body">
        <ellipse cx="-9" cy="-2" rx="8" ry="3.5" fill="#4a2a1a" />
        <ellipse cx="9" cy="-2" rx="8" ry="3.5" fill="#4a2a1a" />
        <path d="M-24 -80 H24 L27 -4 H-27 Z" fill="#fbf5e6" stroke="#e4d6b8" />
        <rect x="-27" y="-11" width="54" height="5" fill={kind === "nada" ? "#b3203a" : "#2f6b4f"} />
        <rect x="-24" y="-146" width="48" height="68" rx="12" fill={skin} />
        <path d="M-22 -144 L22 -86" stroke="#f3e2c4" strokeWidth="9" />
        <path d="M-6 -146 L6 -146" stroke="#e7bb4f" strokeWidth="2" />
        <g className="mus-head" style={{ transformOrigin: "0px -154px" }}>
          <rect x="-6" y="-158" width="12" height="12" fill={skin} />
          <circle cx="0" cy="-174" r="21" fill={skin} />
          <path d="M-21 -176 Q-22 -198 0 -197 Q22 -198 21 -176 Q14 -190 0 -189 Q-14 -190 -21 -176 Z" fill="#1c1310" />
          <path d="M-8 -190 H8 M-8 -187 H8 M-8 -184 H8" stroke="#fff" strokeWidth="1.2" opacity=".85" />
          <circle cx="0" cy="-185.5" r="1.4" fill="#c8102e" />
          <Eyes y={-176} gap={7} />
          <path d="M-10 -163 Q0 -168 10 -163" stroke="#1c1310" strokeWidth="3" strokeLinecap="round" fill="none" />
          {kind === "nada" && (
            <>
              <circle className="mus-cheek" cx="-10" cy="-164" r="6" fill={skin} stroke="#7a4527" strokeWidth=".8" />
              <circle className="mus-cheek" cx="10" cy="-164" r="6" fill={skin} stroke="#7a4527" strokeWidth=".8" />
            </>
          )}
        </g>
        {kind === "nada" ? (
          <g className="mus-nada" style={{ transformOrigin: "0px -160px" }}>
            <path d="M-2 -162 L2 -162 L50 -96 L34 -88 Z" fill="#6b3a1f" stroke="#4a2612" />
            <path d="M8 -150 L12 -146 M18 -136 L22 -132 M28 -122 L32 -118" stroke="#e7bb4f" strokeWidth="2" />
            <ellipse cx="44" cy="-90" rx="14" ry="7" transform="rotate(-36 44 -90)" fill="#e7bb4f" stroke="#b8893c" />
            <circle cx="14" cy="-138" r="6" fill={skin} />
            <circle cx="28" cy="-118" r="6" fill={skin} />
          </g>
        ) : (
          <g className="mus-thavil">
            <path d="M-20 -140 L28 -100" stroke="#8a1c2c" strokeWidth="3" />
            <rect x="-30" y="-116" width="60" height="34" rx="4" fill="#8a4b25" />
            <path d="M-26 -114 L-18 -84 L-10 -114 L-2 -84 L6 -114 L14 -84 L22 -114" stroke="#f3e2c4" strokeWidth="1.3" fill="none" />
            <ellipse cx="-30" cy="-99" rx="7" ry="18" fill="#f3e2c4" stroke="#6b3a1f" strokeWidth="2" />
            <ellipse cx="30" cy="-99" rx="7" ry="18" fill="#f3e2c4" stroke="#6b3a1f" strokeWidth="2" />
            <g transform="translate(22 -140)">
              <g className="mus-hit mus-hit--r">
                <path d="M0 0 Q14 16 16 32" stroke={skin} strokeWidth="10" strokeLinecap="round" fill="none" />
                <path d="M16 34 L30 20" stroke="#5a3522" strokeWidth="3" strokeLinecap="round" />
              </g>
            </g>
            <g transform="translate(-22 -140)">
              <g className="mus-hit mus-hit--l">
                <path d="M0 0 Q-14 16 -16 34" stroke={skin} strokeWidth="10" strokeLinecap="round" fill="none" />
                <circle cx="-16" cy="38" r="6" fill="#e7bb4f" />
              </g>
            </g>
            <circle className="mus-beat mus-beat--l" cx="-38" cy="-99" r="10" fill="none" stroke="#fff3c9" strokeWidth="1.5" />
            <circle className="mus-beat mus-beat--r" cx="38" cy="-99" r="10" fill="none" stroke="#fff3c9" strokeWidth="1.5" />
          </g>
        )}
      </g>
      {/* floating music notes */}
      {[0, 1, 2].map((k) => (
        <text
          key={k}
          className="mus-note"
          style={{ "--k": k }}
          x={kind === "nada" ? 50 : 34}
          y={kind === "nada" ? -96 : -126}
          fontSize="18"
          fill="#fff3c9"
        >
          {k % 2 ? "♫" : "♪"}
        </text>
      ))}
    </g>
  );
}

/* ── Elephant ──────────────────────────────────────────────── */
function Elephant() {
  const g = "#8e8996";
  const g2 = "#7a7582";
  return (
    <g className="el">
      <g className="el-umbrella">
        <path d="M-6 -118 V-175" stroke="#8a6732" strokeWidth="2.5" />
        <path d="M-40 -172 Q-6 -206 28 -172 Z" fill="#b3203a" />
        <path d="M-40 -172 Q-6 -186 28 -172" stroke="#e7bb4f" strokeWidth="3" fill="none" />
        {[-36, -26, -16, -6, 4, 14, 24].map((x) => (
          <path key={x} d={`M${x} -172 v8`} stroke="#e7bb4f" strokeWidth="2" />
        ))}
        <circle cx="-6" cy="-194" r="3" fill="#e7bb4f" />
      </g>
      <g transform="translate(-64 -80)">
        <path className="el-tail" d="M0 0 Q-12 18 -8 34" stroke={g2} strokeWidth="3" fill="none" />
      </g>
      <rect x="-52" y="-44" width="17" height="44" rx="5" fill={g2} />
      <rect x="-28" y="-40" width="17" height="40" rx="5" fill={g2} />
      <rect x="12" y="-44" width="18" height="44" rx="5" fill={g} />
      <rect x="34" y="-42" width="18" height="42" rx="5" fill={g} />
      <ellipse cx="-8" cy="-74" rx="58" ry="44" fill={g} />
      <path d="M-50 -112 Q-10 -128 30 -112 L30 -62 Q20 -54 10 -62 Q0 -54 -10 -62 Q-20 -54 -30 -62 Q-40 -54 -50 -62 Z" fill="#8a1c2c" />
      <path d="M-50 -66 Q-40 -58 -30 -66 Q-20 -58 -10 -66 Q0 -58 10 -66 Q20 -58 30 -66" stroke="#e7bb4f" strokeWidth="3" fill="none" />
      {[-44, -30, -16, -2, 12, 26].map((x) => (
        <circle key={x} cx={x + 4} cy="-54" r="2.6" fill="#e7bb4f" />
      ))}
      <circle cx="-10" cy="-88" r="9" fill="none" stroke="#e7bb4f" strokeWidth="2" />
      <circle cx="46" cy="-100" r="31" fill={g} />
      <g transform="translate(36 -100)">
        <path className="el-ear" d="M0 -22 Q-22 -12 -18 12 Q-12 30 4 22 Z" fill={g2} />
      </g>
      <path d="M52 -134 L74 -130 L72 -96 L62 -80 L54 -96 Z" fill="#e7bb4f" stroke="#b8893c" />
      {[[62, -124], [58, -114], [68, -114], [62, -104], [66, -94]].map(([x, y]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="2.2" fill="#fff3c9" />
      ))}
      <g className="el-eye" style={{ transformOrigin: "52px -104px" }}>
        <circle cx="52" cy="-104" r="2.8" fill="#1c1310" />
      </g>
      <path d="M64 -78 Q78 -72 86 -80" stroke="#fffbee" strokeWidth="5" strokeLinecap="round" fill="none" />
      <g transform="translate(66 -90)">
        <g className="el-trunk">
          <path d="M0 -2 Q18 30 14 60 Q12 74 22 76" stroke={g} strokeWidth="15" strokeLinecap="round" fill="none" />
          <path d="M8 20 h8 M10 34 h8 M10 48 h8" stroke={g2} strokeWidth="1.5" />
        </g>
      </g>
    </g>
  );
}

function Firework({ x, y, color, k }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="fw" style={{ "--k": k }}>
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={(Math.cos(a) * 6).toFixed(1)}
              y1={(Math.sin(a) * 6).toFixed(1)}
              x2={(Math.cos(a) * 24).toFixed(1)}
              y2={(Math.sin(a) * 24).toFixed(1)}
              stroke={color}
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          );
        })}
        <circle r="3" fill="#fff8e1" />
      </g>
    </g>
  );
}

/* ── Scene ─────────────────────────────────────────────────── */
export default function WeddingScene() {
  const { groom, bride } = wedding;
  const tx = wedding.text.scene;
  const ref = useRef(null);
  const act = useStory(ref);
  const [name, , flags] = ACTS[act];
  const cls = Object.keys(flags)
    .map((f) => `is-${f}`)
    .join(" ");
  const banner = `${groom.nickname || groom.firstName} weds ${bride.nickname || bride.firstName}`;
  const caption = tx.captions?.[CAPTION_OF[name]];

  const rice = Array.from({ length: 34 }, (_, i) => ({
    x: 40 + ((i * 97) % 320),
    d: ((i * 37) % 23) / 10,
    petal: i % 3 === 0,
    c: ["#f0a02a", "#e0324b", "#f6d365"][i % 3],
  }));

  return (
    <section className="section scene" id="celebration" aria-labelledby="scene-title">
      <div className="scene__velvet" aria-hidden="true" />
      <div className="container">
        {tx.eyebrow && <p className="eyebrow reveal">{tx.eyebrow}</p>}
        <h2 id="scene-title" className="section-title reveal">
          <span className="script foil scene__title">{tx.title}</span>
        </h2>
        <KolamDivider className="reveal" />

        <div className="scene__stage reveal" ref={ref}>
          <svg
            className={`scene__svg story ${cls}`}
            viewBox="0 0 400 560"
            role="img"
            aria-label={`Animated cartoon: ${groom.firstName} and ${bride.firstName} walk in, exchange garlands, the thali is tied and they are showered with blessings, with nadaswaram and thavil players and royal elephants.`}
          >
            <defs>
              <linearGradient id="sareeGrad" x1="0" x2="1">
                <stop offset="0" stopColor="#e2612c" />
                <stop offset="1" stopColor="#c23b22" />
              </linearGradient>
              <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#d9b574" />
                <stop offset="1" stopColor="#8f6a33" />
              </linearGradient>
              <radialGradient id="glowGrad">
                <stop offset="0" stopColor="#ffe6a8" stopOpacity=".9" />
                <stop offset="1" stopColor="#ffe6a8" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* palace */}
            <rect className="scene__wall" x="0" y="0" width="400" height="420" />
            {[70, 200, 330].map((x) => (
              <g key={x} className="scene__window">
                <path d={`M${x - 34} 340 V170 Q${x - 34} 120 ${x} 104 Q${x + 34} 120 ${x + 34} 170 V340 Z`} />
                <path d={`M${x - 26} 335 V174 Q${x - 26} 132 ${x} 118 Q${x + 26} 132 ${x + 26} 174 V335`} fill="none" />
              </g>
            ))}
            <circle cx="200" cy="260" r="130" fill="url(#glowGrad)" className="scene__glow" />

            {/* fireworks (finale) */}
            <g className="fireworks">
              <Firework x={70} y={150} color="#ffd166" k={0} />
              <Firework x={330} y={140} color="#ff8fab" k={1} />
              <Firework x={60} y={250} color="#9be7ff" k={2} />
              <Firework x={340} y={240} color="#ffd166" k={3} />
            </g>

            {/* floor */}
            <path d="M0 420 H400 V560 H0 Z" fill="url(#floorGrad)" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((k) => (
              <path key={k} d={`M${200 + (k - 4) * 30} 420 L${200 + (k - 4) * 90} 560`} stroke="#8a6732" strokeOpacity=".35" />
            ))}
            <path d="M0 460 H400 M0 510 H400" stroke="#8a6732" strokeOpacity=".3" />

            {/* mandapam */}
            <g className="scene__mandapam">
              <path d="M200 20 L214 40 H186 Z" fill="#e7bb4f" />
              <circle cx="200" cy="16" r="5" fill="#e7bb4f" />
              <path d="M150 88 L170 40 H230 L250 88 Z" fill="#b3203a" stroke="#e7bb4f" strokeWidth="2" />
              <path d="M165 64 H235" stroke="#e7bb4f" strokeWidth="2" />
              <path d="M104 128 L140 88 H260 L296 128 Z" fill="#9e1b32" stroke="#e7bb4f" strokeWidth="2" />
              <rect x="92" y="128" width="216" height="20" fill="#e7bb4f" />
              <path d="M92 148 Q104 160 116 148 Q128 160 140 148 Q152 160 164 148 Q176 160 188 148 Q200 160 212 148 Q224 160 236 148 Q248 160 260 148 Q272 160 284 148 Q296 160 308 148" fill="#e7bb4f" />
              {[112, 288].map((x) => (
                <g key={x}>
                  <rect x={x - 9} y="150" width="18" height="290" fill="#e7bb4f" />
                  <rect x={x - 12} y="150" width="24" height="10" fill="#c99a45" />
                  <rect x={x - 12} y="290" width="24" height="8" fill="#c99a45" />
                  <rect x={x - 13} y="432" width="26" height="12" fill="#c99a45" />
                  <path d={`M${x - 5} 170 V430`} stroke="#fff3c9" strokeWidth="2" opacity=".6" />
                  {/* marigold strands on the pillars */}
                  <path d={`M${x + 11} 152 V300`} stroke="#f0a02a" strokeWidth="6" strokeDasharray="0.1 8" strokeLinecap="round" />
                  <path d={`M${x - 11} 152 V300`} stroke="#e05a1b" strokeWidth="6" strokeDasharray="0.1 8" strokeLinecap="round" />
                </g>
              ))}
              {/* hanging name banner */}
              <g className="scene__banner">
                <path d="M140 148 V160 M260 148 V160" stroke="#8a6732" strokeWidth="1.5" />
                <rect x="116" y="160" width="168" height="32" rx="7" fill="#7a1628" stroke="#e7bb4f" strokeWidth="2" />
                <rect x="121" y="165" width="158" height="22" rx="4" fill="none" stroke="#e7bb4f" strokeOpacity=".5" />
                <text x="200" y="182.5" textAnchor="middle" className="scene__banner-text">
                  {banner}
                </text>
              </g>
            </g>

            {/* elephants (behind the musicians) */}
            <g transform="translate(40 430) scale(0.64)">
              <Elephant />
            </g>
            <g transform="translate(360 430) scale(-0.64 0.64)">
              <Elephant />
            </g>

            {/* couple */}
            <g className="couple-layer">
              <g transform="translate(162 470)">
                <g className="ws-walk ws-walk--l">
                  <Groom />
                </g>
              </g>
              <g transform="translate(238 470)">
                <g className="ws-walk ws-walk--r">
                  <Bride />
                </g>
              </g>

              {/* garlands (start on their own necks, then swap) */}
              <g transform="translate(162 332)">
                <g className="ws-walk ws-walk--l">
                  <g className="ws-garland ws-garland--a">
                    <Garland colors={["#c8102e", "#fff8e7"]} />
                  </g>
                </g>
              </g>
              <g transform="translate(238 332)">
                <g className="ws-walk ws-walk--r">
                  <g className="ws-garland ws-garland--b">
                    <Garland colors={["#f0a02a", "#fff8e7"]} />
                  </g>
                </g>
              </g>

              {/* thali */}
              <g transform="translate(238 316)">
                <g className="ws-thali">
                  <path d="M-13 -6 Q0 12 13 -6" stroke="#f2c230" strokeWidth="2.6" fill="none" />
                  <path d="M0 3 L6 10 L0 17 L-6 10 Z" fill="#f3c63f" stroke="#b8893c" />
                  <circle cx="0" cy="10" r="2" fill="#c8102e" />
                  {Array.from({ length: 8 }, (_, i) => {
                    const a = (i / 8) * Math.PI * 2;
                    return (
                      <line
                        key={i}
                        className="ws-thali-spark"
                        x1={Math.cos(a) * 8}
                        y1={7 + Math.sin(a) * 8}
                        x2={Math.cos(a) * 16}
                        y2={7 + Math.sin(a) * 16}
                        stroke="#fff3c9"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    );
                  })}
                </g>
              </g>

              {/* hearts */}
              {[
                [200, 262, 1.8],
                [182, 276, 1.2],
                [218, 276, 1.3],
                [192, 244, 1],
                [210, 246, 1.1],
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
            </g>

            {/* musicians */}
            <g transform="translate(56 556) scale(0.66)">
              <Musician kind="nada" />
            </g>
            <g transform="translate(344 556) scale(0.66)">
              <Musician kind="thavil" />
            </g>

            {/* sacred fire with smoke */}
            <g transform="translate(200 540)">
              {[0, 1, 2].map((k) => (
                <circle key={k} className="ws-smoke" style={{ "--k": k }} cx="0" cy="-60" r="7" fill="#fff" />
              ))}
              <path d="M-26 0 L-20 -16 H20 L26 0 Z" fill="#8a3a1f" />
              <path d="M-20 -16 H20" stroke="#e7bb4f" strokeWidth="2" />
              <g className="ws-fire">
                <path d="M0 -58 C12 -40 12 -26 0 -16 C-12 -26 -12 -40 0 -58 Z" fill="#f6a623" />
                <path d="M-10 -40 C-2 -30 -2 -22 -8 -16 C-16 -22 -16 -30 -10 -40 Z" fill="#f6c343" />
                <path d="M10 -40 C18 -30 18 -22 12 -16 C4 -22 4 -30 10 -40 Z" fill="#f6c343" />
                <path d="M0 -40 C6 -30 6 -24 0 -18 C-6 -24 -6 -30 0 -40 Z" fill="#fff1b8" />
              </g>
            </g>

            {/* akshathai — rice & petal shower (blessings) */}
            <g className="akshathai">
              {rice.map((r, i) => (
                <g key={i} transform={`translate(${r.x} 0)`}>
                  {r.petal ? (
                    <path className="rice" style={{ "--d": `${r.d}s` }} d="M0 -6 C4 -2 4 3 0 6 C-4 3 -4 -2 0 -6 Z" fill={r.c} />
                  ) : (
                    <ellipse className="rice" style={{ "--d": `${r.d}s` }} rx="1.6" ry="3.2" fill="#f6d365" />
                  )}
                </g>
              ))}
            </g>
          </svg>
          <Petals count={10} />
          <Sparkles count={12} />
          <div className="scene__captions" aria-live="off">
            <p key={name} className="scene__cap">
              {caption || ""}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
