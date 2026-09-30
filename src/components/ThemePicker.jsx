import { useEffect, useRef, useState } from "react";
import { Check, Palette } from "lucide-react";
import { THEMES, applyTheme } from "../config/themes.js";
import { wedding } from "../config/wedding.js";

/** Floating royal-theme switcher (bottom-left). */
export default function ThemePicker({ visible }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(() => document.documentElement.dataset.theme);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (e.type === "keydown" ? e.key === "Escape" : !ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  const choose = (id) => {
    applyTheme(id, true);
    setCurrent(id);
    setOpen(false);
  };

  return (
    <div ref={ref} className={`theme-picker ${visible ? "is-visible" : ""}`}>
      {open && (
        <div className="theme-picker__menu" role="menu" aria-label="Choose a royal theme">
          <p className="theme-picker__title">{wedding.text.theme.title}</p>
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              role="menuitemradio"
              aria-checked={current === t.id}
              className={`theme-picker__item ${current === t.id ? "is-active" : ""}`}
              onClick={() => choose(t.id)}
            >
              <span
                className="theme-picker__swatch"
                style={{ background: `linear-gradient(135deg, ${t.swatch[0]} 55%, ${t.swatch[1]} 55%)` }}
                aria-hidden="true"
              />
              {t.name}
              {current === t.id && <Check size={15} strokeWidth={2} aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}
      <button
        type="button"
        className="theme-picker__btn"
        aria-label="Change colour theme"
        aria-expanded={open}
        tabIndex={visible ? 0 : -1}
        onClick={() => setOpen((o) => !o)}
      >
        <Palette size={20} strokeWidth={1.6} aria-hidden="true" />
      </button>
    </div>
  );
}
