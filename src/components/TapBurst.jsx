import { useEffect, useRef } from "react";

/**
 * A small burst of petals & gold sparkles wherever the guest taps.
 * Purely decorative; ignored for form fields and when reduced motion is on.
 */
export default function TapBurst({ enabled }) {
  const layer = useRef(null);
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const colors = ["#e0324b", "#f0a02a", "#f6d365", "#ff8fab", "#fff3c9"];
    let live = 0;
    const onDown = (e) => {
      if (e.target.closest("input, textarea, select, iframe, .music__list, .theme-picker__menu")) return;
      if (live > 60) return;
      const host = layer.current;
      if (!host) return;
      const n = 9;
      for (let i = 0; i < n; i++) {
        const el = document.createElement("span");
        const a = (i / n) * Math.PI * 2 + Math.random() * 0.5;
        const dist = 40 + Math.random() * 40;
        el.className = `tap-bit ${i % 3 === 0 ? "tap-bit--spark" : ""}`;
        el.style.left = `${e.clientX}px`;
        el.style.top = `${e.clientY}px`;
        el.style.setProperty("--dx", `${Math.cos(a) * dist}px`);
        el.style.setProperty("--dy", `${Math.sin(a) * dist - 20}px`);
        el.style.setProperty("--rot", `${Math.random() * 540 - 270}deg`);
        el.style.background = colors[i % colors.length];
        host.appendChild(el);
        live++;
        el.addEventListener("animationend", () => {
          el.remove();
          live--;
        });
      }
    };
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => window.removeEventListener("pointerdown", onDown);
  }, [enabled]);
  return <div ref={layer} className="tap-layer" aria-hidden="true" />;
}
