import { useEffect, useRef, useState } from "react";
import { wedding } from "./config/wedding.js";
import Opening from "./components/Opening.jsx";
import Hero from "./components/Hero.jsx";
import Invitation from "./components/Invitation.jsx";
import Countdown from "./components/Countdown.jsx";
import Ceremony from "./components/Ceremony.jsx";
import Events from "./components/Events.jsx";
import Gallery from "./components/Gallery.jsx";
import Closing from "./components/Closing.jsx";
import MusicPlayer, { music } from "./components/MusicPlayer.jsx";
import { reducedMotion } from "./utils/helpers.js";
import { LangProvider, LangSwitch, useLang } from "./i18n.jsx";

/* Fade/slide sections in as they scroll into view */
function useReveal(active) {
  useEffect(() => {
    if (!active) return;
    const els = document.querySelectorAll(".reveal, .divider");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [active]);
}

/* Tap anywhere → a small burst of petals */
function usePetalTap(active) {
  useEffect(() => {
    if (!active || reducedMotion()) return;
    const colors = ["#e0601e", "#f2a541", "#c2185b", "#ffd166"];
    const onTap = (e) => {
      if (e.target.closest("button, a, iframe, .player")) return;
      for (let i = 0; i < 9; i++) {
        const p = document.createElement("i");
        p.className = "tap-petal";
        const a = Math.random() * Math.PI * 2;
        const r = 30 + Math.random() * 50;
        p.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;background:${colors[i % 4]};--x:${Math.cos(a) * r}px;--y:${Math.sin(a) * r - 20}px;--r:${Math.random() * 360}deg`;
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 1300);
      }
    };
    window.addEventListener("pointerdown", onTap);
    return () => window.removeEventListener("pointerdown", onTap);
  }, [active]);
}

export default function App() {
  return (
    <LangProvider>
      <Invitation_ />
    </LangProvider>
  );
}

function Invitation_() {
  const { t, lang } = useLang();
  const [opened, setOpened] = useState(false);
  const [coverGone, setCoverGone] = useState(false);
  const main = useRef(null);

  useReveal(opened);
  usePetalTap(coverGone);

  useEffect(() => {
    document.body.style.overflow = coverGone ? "" : "hidden";
  }, [coverGone]);

  return (
    <div className="stage">
      <aside className="side side-l" aria-hidden="true">
        <p className="tamil">{t.house}</p>
        <p className="script nick">{t.groom.short}</p>
        <p className="side-amp">&amp;</p>
        <p className="script nick">{t.bride.short}</p>
      </aside>

      <div className="phone">
        {!coverGone && (
          <Opening
            onOpen={() => {
              setOpened(true);
              if (wedding.music.playOnOpen) music.start();
            }}
            onDone={() => {
              setCoverGone(true);
              main.current?.focus({ preventScroll: true });
            }}
          />
        )}
        <main ref={main} tabIndex={-1} className={`site ${opened ? "is-open" : ""}`}>
          <Hero />
          <Invitation />
          <Countdown />
          <Ceremony />
          <Events />
          <Gallery />
          <Closing />
        </main>
        {opened && <MusicPlayer />}
        {coverGone && <LangSwitch className="float-lang" key={lang} />}
      </div>

      <aside className="side side-r" aria-hidden="true">
        <p className="tamil">{t.side[0]}</p>
        <p className="side-date">{t.side[1]}</p>
        <p className="tamil">{t.side[2]}</p>
      </aside>
    </div>
  );
}
