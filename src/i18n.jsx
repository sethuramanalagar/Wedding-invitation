import { createContext, useContext, useEffect, useState } from "react";
import { wedding } from "./config/wedding.js";

const LangCtx = createContext(null);
const LANGS = Object.keys(wedding.content);

function initialLang() {
  try {
    const q = new URLSearchParams(window.location.search).get("lang");
    if (q && LANGS.includes(q)) return q;
    const saved = localStorage.getItem("wedding-lang");
    if (saved && LANGS.includes(saved)) return saved;
  } catch {
    /* storage blocked */
  }
  return wedding.defaultLang;
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.lang = lang;
  }, [lang]);

  const setLang = (l) => {
    setLangState(l);
    try {
      localStorage.setItem("wedding-lang", l);
      const u = new URL(window.location.href);
      u.searchParams.set("lang", l);
      window.history.replaceState(null, "", u);
    } catch {
      /* ignore */
    }
  };

  return <LangCtx.Provider value={{ lang, setLang, t: wedding.content[lang] }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);

/** Two-button language switch */
export function LangSwitch({ className = "" }) {
  const { lang, setLang } = useLang();
  return (
    <div className={`lang-switch ${className}`} role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button key={l} className={l === lang ? "on" : ""} aria-pressed={l === lang} onClick={() => setLang(l)} lang={l}>
          {wedding.content[l].langName}
        </button>
      ))}
    </div>
  );
}
