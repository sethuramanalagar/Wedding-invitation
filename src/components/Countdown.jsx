import { useEffect, useState } from "react";
import { wedding } from "../config/wedding.js";
import { useLang } from "../i18n.jsx";
import { timeLeft } from "../utils/helpers.js";
import { FairyLights } from "./Ornaments.jsx";

const { countdownTo } = wedding;
const wedEnd = wedding.events.find((e) => e.id === "wedding")?.end;

function Digit({ value, label }) {
  const v = String(value).padStart(2, "0");
  return (
    <div className="cd-unit">
      <div className="cd-tile">
        <span key={v} className="cd-num">
          {v}
        </span>
      </div>
      <span className="cd-label tamil">{label}</span>
    </div>
  );
}

export default function Countdown() {
  const { t } = useLang();
  const c = t.countdown;
  const [left, setLeft] = useState(() => timeLeft(countdownTo));
  useEffect(() => {
    const id = setInterval(() => setLeft(timeLeft(countdownTo)), 1000);
    return () => clearInterval(id);
  }, []);

  const after = wedEnd && Date.now() >= new Date(wedEnd).getTime();

  return (
    <section className="section velvet countdown">
      <div className="velvet-pattern" aria-hidden="true" />
      <FairyLights className="top" />
      <p className="eyebrow light tamil">{c.eyebrow}</p>
      <h2 className="section-title light tamil">{c.title}</h2>
      {left.ms > 0 ? (
        <div className="cd-row" role="timer" aria-live="off">
          <Digit value={left.d} label={c.units[0]} />
          <Digit value={left.h} label={c.units[1]} />
          <Digit value={left.m} label={c.units[2]} />
          <Digit value={left.s} label={c.units[3]} />
        </div>
      ) : (
        <p className="cd-done tamil">{after ? c.after : c.started}</p>
      )}
      <p className="cd-sub tamil">{c.sub}</p>
    </section>
  );
}
