/**
 * Royal colour themes. The colours themselves live in index.css
 * (search for `[data-theme=`); this list drives the theme picker.
 * Choose the default theme in src/config/wedding.js → theme.default.
 */
export const THEMES = [
  { id: "maharaja", name: "Maharaja Maroon", swatch: ["#6b1e2e", "#c9a45c"] },
  { id: "emerald", name: "Royal Emerald", swatch: ["#0f4a3a", "#c9a45c"] },
  { id: "sapphire", name: "Midnight Sapphire", swatch: ["#1d2f5e", "#c9a45c"] },
  { id: "rani", name: "Rani Pink", swatch: ["#8a1c4e", "#c9a45c"] },
];

const KEY = "wedding-theme";

export function savedTheme(fallback) {
  try {
    const t = localStorage.getItem(KEY);
    if (t && THEMES.some((x) => x.id === t)) return t;
  } catch {
    /* storage unavailable */
  }
  return fallback;
}

export function applyTheme(id, persist = false) {
  document.documentElement.dataset.theme = id;
  const theme = THEMES.find((t) => t.id === id);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta && theme) meta.setAttribute("content", theme.swatch[0]);
  if (persist) {
    try {
      localStorage.setItem(KEY, id);
    } catch {
      /* ignore */
    }
  }
}
