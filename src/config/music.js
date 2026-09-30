/**
 * Built-in music: EVERY audio file in src/assets/music/ is bundled and
 * played automatically (after the files in public/music/). Drop more files
 * into either folder — no code changes needed.
 */
import { prettyName } from "../utils/media.js";

const files = import.meta.glob("../assets/music/*.{mp3,m4a,aac,ogg,oga,opus,wav,flac,webm}", {
  eager: true,
  query: "?url",
  import: "default",
});

// Optional nicer titles for the bundled originals (by file name).
const KNOWN = {
  "mangala-isai.mp3": { title: "Mangala Isai", subtitle: "Nadaswaram & thavil · Raga Mohanam" },
  "vidiyal-veena.mp3": { title: "Vidiyal Veena", subtitle: "Dawn veena & mridangam · Raga Hamsadhwani" },
  "bansuri-procession.mp3": { title: "Bansuri Procession", subtitle: "Flute & tabla · Raga Hindolam" },
  "santoor-evening.mp3": { title: "Santoor Evening", subtitle: "Santoor & tabla · Raga Kalyani" },
};

export const BUNDLED_TRACKS = Object.entries(files)
  .sort(([a], [b]) => {
    const order = Object.keys(KNOWN);
    const ia = order.indexOf(a.split("/").pop());
    const ib = order.indexOf(b.split("/").pop());
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b, undefined, { numeric: true });
  })
  .map(([p, url]) => {
    const file = p.split("/").pop();
    const meta = KNOWN[file] || {};
    return { title: meta.title || prettyName(file), subtitle: meta.subtitle || "", src: url, bundled: true };
  });
