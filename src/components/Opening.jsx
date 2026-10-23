import { useMemo, useRef, useState } from "react";
import { useLang, LangSwitch } from "../i18n.jsx";
import { wedding } from "../config/wedding.js";
import { Monogram, Divider, Feather } from "./Ornaments.jsx";
import { reducedMotion } from "../utils/helpers.js";

export default function Opening({ onOpen, onDone }) {
  const { t } = useLang();
  const { groom, bride } = t;
  const [stage, setStage] = useState("closed"); // closed → opening → leaving
  const btn = useRef(null);

  const dust = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        left: Math.random() * 100,
        delay: -Math.random() * 12,
        dur: 9 + Math.random() * 9,
        size: 1.5 + Math.random() * 2.5,
        key: i,
      })),
    [],
  );
  const petals = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => {
        const a = (i / 36) * Math.PI * 2 + Math.random() * 0.3;
        const r = 140 + Math.random() * 260;
        return {
          key: i,
          x: Math.cos(a) * r,
          y: Math.sin(a) * r - 80,
          rot: Math.random() * 720 - 360,
          delay: Math.random() * 0.25,
          hue: ["#e0601e", "#f2a541", "#c2185b", "#ffd166", "#ffffff"][i % 5],
        };
      }),
    [],
  );

  const open = () => {
    if (stage !== "closed") return;
    onOpen?.(); // start music inside the tap (browsers require a gesture)
    if (reducedMotion()) {
      onDone?.();
      return;
    }
    setStage("opening");
    setTimeout(() => setStage("leaving"), 3000);
    setTimeout(() => onDone?.(), 4100);
  };

  return (
    <div className={`opening stage-${stage}`} role="dialog" aria-label="Wedding invitation cover">
      <div className="op-jaali" aria-hidden="true" />
      <div className="op-dust" aria-hidden="true">
        {dust.map((d) => (
          <i
            key={d.key}
            style={{ left: `${d.left}%`, animationDelay: `${d.delay}s`, animationDuration: `${d.dur}s`, width: d.size, height: d.size }}
          />
        ))}
      </div>

      <Feather className="op-feather l" />
      <Feather className="op-feather r" />

      <LangSwitch className="op-lang" />
      <header className="op-head">
        <p className="op-house tamil">{t.house}</p>
        <p className="op-eyebrow tamil">{t.cover.eyebrow}</p>
      </header>

      <div className="envelope" aria-hidden={stage !== "closed"}>
        <div className="env-back" />
        <div className="env-card">
          <div className="env-card-inner">
            <span className="script nick">{groom.short}</span>
            <span className="weds">{t.weds}</span>
            <span className="script nick">{bride.short}</span>
            <Divider className="env-div" />
            <span className="env-date">{t.cover.date}</span>
          </div>
        </div>
        <div className="env-pocket">
          <svg viewBox="0 0 100 70" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 0 L50 40 L100 0" fill="none" stroke="#e7c36a" strokeWidth=".5" vectorEffect="non-scaling-stroke" />
            <path d="M0 70 L44 36 M100 70 L56 36" fill="none" stroke="#e7c36a" strokeWidth=".35" opacity=".6" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>
        <div className="env-flap">
          <div className="env-flap-face" />
        </div>
        <button ref={btn} className="seal" onClick={open} aria-label="Open the invitation">
          <span className="seal-half l" />
          <span className="seal-half r" />
          <Monogram className="seal-mono" a={wedding.monogram[0]} b={wedding.monogram[1]} />
          <span className="seal-ring" />
        </button>
      </div>

      <p className="op-hint">{t.cover.hint}</p>

      <footer className="op-names">
        <span className="tamil">{groom.name}</span>
        <em>&amp;</em>
        <span className="tamil">{bride.name}</span>
      </footer>

      <div className="op-burst" aria-hidden="true">
        {stage !== "closed" &&
          petals.map((p) => (
            <i
              key={p.key}
              style={{ "--x": `${p.x}px`, "--y": `${p.y}px`, "--r": `${p.rot}deg`, animationDelay: `${1.1 + p.delay}s`, background: p.hue }}
            />
          ))}
      </div>
      <div className="op-flash" aria-hidden="true" />
    </div>
  );
}
