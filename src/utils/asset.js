/**
 * Resolve a /public path ("/images/couple.jpg") against Vite's base URL,
 * so the site works at a domain root (Vercel, Netlify) and in a
 * sub-folder (GitHub Pages) alike.
 */
export function asset(path = "") {
  if (!path) return "";
  if (/^(https?:)?\/\//.test(path)) return path;
  const base = import.meta.env.BASE_URL || "/";
  return base.replace(/\/?$/, "/") + path.replace(/^\//, "");
}

/** "Er. A. Sethuraman" + "B.E." → "Er. A. Sethuraman, B.E." */
export function fullName(person) {
  return [person.name, person.qualification].filter(Boolean).join(", ");
}
