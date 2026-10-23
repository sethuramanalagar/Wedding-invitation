import { useEffect, useMemo, useRef, useState } from "react";
import { useLang } from "../i18n.jsx";
import { asset, reducedMotion } from "../utils/helpers.js";
import { GoldDefs, Bell } from "./Ornaments.jsx";
import { showerFlowers } from "./FlowerShower.jsx";

const DURATIONS = [3800, 4200, 4200, 4000, 6500];

function Mandapam({ roof }) {
  const g = "mg-gold";
  return (
    <svg className="mandapam" viewBox="0 0 400 500" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <GoldDefs id={g} />
      <defs>
        <linearGradient id="mg-pillar" x1="0" x2="1">
          <stop offset="0" stopColor="#7a1a2c" />
          <stop offset=".5" stopColor="#a8323f" />
          <stop offset="1" stopColor="#5a0f1f" />
        </linearGradient>
        <radialGradient id="mg-floor" cx=".5" cy="0" r="1">
          <stop offset="0" stopColor="#f6e7c4" />
          <stop offset="1" stopColor="#c99d5a" />
        </radialGradient>
      </defs>

      {/* floor + kolam */}
      <path d="M0 430 H400 V500 H0Z" fill="url(#mg-floor)" />
      <g fill="none" stroke="#fffaf0" strokeWidth="1.4" opacity=".9">
        <ellipse cx="200" cy="468" rx="120" ry="20" />
        <ellipse cx="200" cy="468" rx="84" ry="13" strokeDasharray="2 5" strokeLinecap="round" />
        {Array.from({ length: 12 }).map((_, i) => (
          <circle key={i} cx={200 + Math.cos((i / 12) * 6.283) * 104} cy={468 + Math.sin((i / 12) * 6.283) * 17} r="2" fill="#fffaf0" />
        ))}
      </g>

      {/* banana trees */}
      {[[54, 1], [346, -1]].map(([x, s]) => (
        <g key={x} transform={`translate(${x} 430) scale(${s} 1)`}>
          <rect x="-4" y="-120" width="8" height="120" fill="#6f8f3a" />
          {[-112, -96, -80].map((y, i) => (
            <g key={y}>
              <path d={`M0 ${y} C24 ${y - 30} 48 ${y - 18} 58 ${y + 6} C36 ${y - 4} 18 ${y - 2} 0 ${y}Z`} fill={i % 2 ? "#3f8a35" : "#4f9d3c"} />
              <path d={`M0 ${y} C-22 ${y - 28} -44 ${y - 14} -52 ${y + 8} C-32 ${y - 2} -16 ${y} 0 ${y}Z`} fill={i % 2 ? "#4f9d3c" : "#3f8a35"} />
            </g>
          ))}
          <path d="M6 -70 c10 4 12 18 4 26 c-6 -6 -8 -16 -4 -26z" fill="#e0b13a" />
        </g>
      ))}

      {/* pillars */}
      {[18, 358].map((x) => (
        <g key={x}>
          <rect x={x} y="78" width="24" height="352" fill="url(#mg-pillar)" />
          <rect x={x - 4} y="74" width="32" height="10" fill={`url(#${g})`} />
          <rect x={x - 5} y="418" width="34" height="14" fill={`url(#${g})`} />
          {[150, 230, 310].map((y) => (
            <rect key={y} x={x} y={y} width="24" height="6" fill={`url(#${g})`} opacity=".9" />
          ))}
          <path d={`M${x} 120 h24 M${x} 360 h24`} stroke="#e8c46e" strokeWidth=".8" />
        </g>
      ))}

      {/* roof */}
      <path d="M0 30 H400 V78 H0Z" fill="#6b1426" />
      <path d="M0 74 H400" stroke={`url(#${g})`} strokeWidth="5" />
      <path d="M0 34 H400" stroke={`url(#${g})`} strokeWidth="3" />
      <path
        d={`M0 78 ${Array.from({ length: 20 }).map((_, i) => `Q${i * 20 + 10} 96 ${i * 20 + 20} 78`).join(" ")}`}
        fill="#6b1426"
        stroke={`url(#${g})`}
        strokeWidth="1.5"
      />
      <text x="200" y="61" textAnchor="middle" fontFamily="'Noto Serif Tamil', 'Cinzel', serif" fontSize={/[a-z]/i.test(roof) ? 15 : 17} fontWeight="600" fill={`url(#${g})`} letterSpacing="1">
        {roof}
      </text>
      {[70, 200, 330].map((x, i) => (
        <g key={x} transform={`translate(${x} 30)`}>
          <path d={`M-${i === 1 ? 26 : 16} 0 C-${i === 1 ? 24 : 14} -${i === 1 ? 30 : 20} ${i === 1 ? 24 : 14} -${i === 1 ? 30 : 20} ${i === 1 ? 26 : 16} 0Z`} fill={`url(#${g})`} />
          <path d={`M0 -${i === 1 ? 30 : 20} v-${i === 1 ? 14 : 9}`} stroke={`url(#${g})`} strokeWidth="3" strokeLinecap="round" />
          <circle cy={-(i === 1 ? 46 : 31)} r={i === 1 ? 4 : 3} fill={`url(#${g})`} />
        </g>
      ))}

      {/* marigold drapes */}
      <path d="M42 96 Q200 176 358 96" fill="none" stroke="#f08a1c" strokeWidth="9" strokeDasharray="0 10" strokeLinecap="round" />
      <path d="M42 96 Q200 160 358 96" fill="none" stroke="#ffd23f" strokeWidth="7" strokeDasharray="0 9" strokeLinecap="round" />
      <path d="M42 96 Q120 136 200 96 Q280 136 358 96" fill="none" stroke="#d1262f" strokeWidth="7" strokeDasharray="0 9" strokeLinecap="round" />
      {[42, 358].map((x) => (
        <path key={x} d={`M${x} 96 V250`} stroke="#f08a1c" strokeWidth="8" strokeDasharray="0 10" strokeLinecap="round" />
      ))}

      {/* homam (sacred fire) */}
      <g transform="translate(200 452)">
        <path d="M-26 0 L-20 -16 H20 L26 0Z" fill="#9c4a2b" stroke="#6e2f19" strokeWidth="1" />
        <path d="M-20 -16 h40" stroke={`url(#${g})`} strokeWidth="2" />
        <g className="fire">
          <path d="M0 -60 C14 -40 16 -28 0 -16 C-16 -28 -14 -40 0 -60Z" fill="#ff8c1a" />
          <path d="M-10 -40 C-2 -30 -2 -22 -8 -16 C-16 -22 -16 -30 -10 -40Z" fill="#ffb627" />
          <path d="M10 -42 C18 -32 18 -22 10 -16 C2 -22 2 -32 10 -42Z" fill="#ffb627" />
          <path d="M0 -42 C6 -32 6 -24 0 -18 C-6 -24 -6 -32 0 -42Z" fill="#fff3c4" />
        </g>
      </g>
    </svg>
  );
}

function Garland({ className }) {
  // A U-shaped marigold garland (worn around the neck)
  return (
    <svg className={`garland ${className}`} viewBox="0 0 120 100" aria-hidden="true">
      <path d="M8 6 C6 60 40 92 60 94 C80 92 114 60 112 6" fill="none" stroke="#d1262f" strokeWidth="13" strokeDasharray="0 9" strokeLinecap="round" />
      <path d="M8 6 C6 60 40 92 60 94 C80 92 114 60 112 6" fill="none" stroke="#f39c12" strokeWidth="10" strokeDasharray="0 9" strokeDashoffset="4.5" strokeLinecap="round" />
      <path d="M8 6 C6 60 40 92 60 94 C80 92 114 60 112 6" fill="none" stroke="#fff6dc" strokeWidth="3.2" strokeDasharray="0 18" strokeLinecap="round" />
      <path d="M56 92 l4 14 l4 -14z" fill="#e0b13a" />
    </svg>
  );
}

function Thali() {
  return (
    <svg className="thali" viewBox="0 0 120 120" aria-hidden="true">
      <GoldDefs id="th-gold" />
      <path d="M6 4 C10 70 40 92 60 94 C80 92 110 70 114 4" fill="none" stroke="#e8b923" strokeWidth="2.4" />
      <path d="M6 4 C10 70 40 92 60 94 C80 92 110 70 114 4" fill="none" stroke="#fff3c4" strokeWidth=".8" strokeDasharray="2 4" />
      <circle cx="60" cy="104" r="12" fill="url(#th-gold)" stroke="#8a6416" />
      <circle cx="60" cy="104" r="5" fill="#c0392b" />
      <circle cx="60" cy="104" r="17" fill="none" stroke="#fff1c1" strokeWidth=".8" className="thali-ring" />
    </svg>
  );
}

export default function Ceremony() {
  const { t } = useLang();
  const { groom, bride, ceremony } = t;
  const PHASES = ceremony.phases;
  const ref = useRef(null);
  const [phase, setPhase] = useState(reducedMotion() ? 4 : -1);
  const [loop, setLoop] = useState(0);
  const [visible, setVisible] = useState(false);
  const showered = useRef(false);
  useEffect(() => {
    if (phase === 4 && visible && !showered.current) {
      showered.current = true;
      showerFlowers();
    }
  }, [phase, visible]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion() || !visible) return;
    if (phase === -1) {
      const t = setTimeout(() => setPhase(0), 300);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      if (phase >= DURATIONS.length - 1) {
        setLoop((l) => l + 1);
        setPhase(0);
      } else setPhase(phase + 1);
    }, DURATIONS[phase]);
    return () => clearTimeout(t);
  }, [phase, visible]);

  const rice = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => ({
        key: i,
        left: Math.random() * 100,
        delay: Math.random() * 2.4,
        dur: 2.2 + Math.random() * 1.6,
        petal: i % 3 === 0,
        hue: ["#f39c12", "#d1262f", "#ffd23f"][i % 3],
        rot: Math.random() * 360,
      })),
    [],
  );
  const notes = useMemo(() => Array.from({ length: 7 }, (_, i) => ({ key: i, left: 18 + i * 10, delay: i * 0.45 })), []);
  const bursts = [
    { x: 24, y: 76, d: 0.2, c: "#ffd166" },
    { x: 76, y: 72, d: 0.9, c: "#ff7aa2" },
    { x: 50, y: 4, d: 1.6, c: "#9be7ff" },
    { x: 18, y: 4, d: 2.4, c: "#ffffff" },
    { x: 82, y: 4, d: 3.1, c: "#ffb347" },
  ];

  const p = Math.max(phase, 0);
  const cls = ["ceremony", `p${p}`, phase >= 1 ? "has-garland" : "", phase >= 2 ? "closer" : "", phase === -1 ? "pre" : ""].join(" ");

  return (
    <section className="section velvet ceremony-wrap" id="ceremony">
      <div className="velvet-pattern" aria-hidden="true" />
      <p className="eyebrow light tamil">{ceremony.eyebrow}</p>
      <h2 className="section-title light tamil">{ceremony.title}</h2>

      <div ref={ref} className={cls} key={loop}>
        <div className="sky" aria-hidden="true">
          <div className="stars" />
          <div className="sun" />
          <div className="moon" />
        </div>
        <Mandapam roof={ceremony.roof} />
        <Bell className="c-bell b1" />
        <Bell className="c-bell b2" />
        <Bell className="c-bell b3" />

        <div className="notes" aria-hidden="true">
          {notes.map((n) => (
            <span key={n.key} style={{ left: `${n.left}%`, animationDelay: `${n.delay}s` }}>
              {n.key % 2 ? "♪" : "♫"}
            </span>
          ))}
        </div>

        <div className="medal m-bride">
          <div className="medal-ring" />
          <img src={asset("images/bride.webp")} alt={bride.name} loading="lazy" />
          <span className="medal-name script nick">{bride.short}</span>
        </div>
        <div className="medal m-groom">
          <div className="medal-ring" />
          <img src={asset("images/groom.webp")} alt={groom.name} loading="lazy" />
          <span className="medal-name script nick">{groom.short}</span>
        </div>

        {/* garland held by the bride goes to the groom, and vice versa */}
        <div className="g-holder g-a">
          <Garland className="ga" />
        </div>
        <div className="g-holder g-b">
          <Garland className="gb" />
        </div>

        <div className="thali-wrap">
          <Thali />
        </div>
        <div className="union-heart" aria-hidden="true">❤</div>

        <div className="rice" aria-hidden="true">
          {rice.map((r) => (
            <i
              key={r.key}
              className={r.petal ? "petal" : ""}
              style={{
                left: `${r.left}%`,
                animationDelay: `${r.delay}s`,
                animationDuration: `${r.dur}s`,
                "--rot": `${r.rot}deg`,
                background: r.petal ? r.hue : undefined,
              }}
            />
          ))}
        </div>

        <div className="fireworks" aria-hidden="true">
          {bursts.map((b, i) => (
            <div key={i} className="fw" style={{ left: `${b.x}%`, top: `${b.y}%`, animationDelay: `${b.d}s`, "--c": b.c }}>
              {Array.from({ length: 14 }).map((_, j) => (
                <i key={j} style={{ "--a": `${(j / 14) * 360}deg`, animationDelay: `${b.d}s` }} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="caption" aria-live="polite">
        <p key={`a${p}`} className={`cap-ta tamil ${p === 4 ? "script-cap" : ""}`}>
          {PHASES[p][0]}
        </p>
        <p key={`b${p}`} className="cap-en tamil">
          {PHASES[p][1]}
        </p>
      </div>
      <div className="phase-dots" role="tablist" aria-label="Wedding moments">
        {PHASES.map((ph, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === p}
            aria-label={ph[0]}
            className={i === p ? "on" : ""}
            onClick={() => setPhase(i)}
          />
        ))}
      </div>
    </section>
  );
}
