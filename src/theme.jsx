import { createContext, useContext, useEffect, useState } from "react";
import { Palette, X } from "lucide-react";
import { wedding } from "./config/wedding.js";
import { useLang } from "./i18n.jsx";

const ThemeCtx = createContext(null);
const IDS = wedding.themes.map((t) => t.id);

function initialTheme() {
  try {
    const q = new URLSearchParams(window.location.search).get("theme");
    if (q && IDS.includes(q)) return q;
    const saved = localStorage.getItem("wedding-theme");
    if (saved && IDS.includes(saved)) return saved;
  } catch {
    /* storage blocked */
  }
  return wedding.defaultTheme;
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(initialTheme);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    const t = wedding.themes.find((x) => x.id === theme);
    if (meta && t) meta.setAttribute("content", t.swatch[0]);
  }, [theme]);
  const setTheme = (id) => {
    setThemeState(id);
    try {
      localStorage.setItem("wedding-theme", id);
    } catch {
      /* ignore */
    }
  };
  return <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>;
}

export const useTheme = () => useContext(ThemeCtx);

/** Row of mood swatches */
export function MoodSwatches({ className = "", compact = false }) {
  const { theme, setTheme } = useTheme();
  const { lang } = useLang();
  return (
    <div className={`moods ${compact ? "compact" : ""} ${className}`} role="radiogroup" aria-label="Mood">
      {wedding.themes.map((t) => (
        <button
          key={t.id}
          role="radio"
          aria-checked={theme === t.id}
          className={theme === t.id ? "on" : ""}
          onClick={() => setTheme(t.id)}
          style={{ "--a": t.swatch[0], "--b": t.swatch[1] }}
        >
          <span className="sw">{t.emoji}</span>
          <span className="mood-name tamil">{lang === "ta" ? t.ta : t.en}</span>
        </button>
      ))}
    </div>
  );
}

/** Floating palette button + sheet */
export function MoodButton() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="mood-fab" onClick={() => setOpen(true)} aria-label={t.mood.button}>
        <Palette size={20} />
      </button>
      {open && (
        <div className="mood-sheet-wrap" onClick={() => setOpen(false)}>
          <div className="mood-sheet" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={t.mood.title}>
            <button className="mood-close" onClick={() => setOpen(false)} aria-label="Close">
              <X size={18} />
            </button>
            <p className="mood-title tamil">{t.mood.title}</p>
            <p className="mood-sub tamil">{t.mood.sub}</p>
            <MoodSwatches />
          </div>
        </div>
      )}
    </>
  );
}
