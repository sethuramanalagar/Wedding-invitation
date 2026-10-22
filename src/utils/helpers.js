import { music as musicFiles, images as imageFiles } from "virtual:media";
import { wedding } from "../config/wedding.js";

/** Path to something in /public that works at a domain root or a sub-folder. */
export const asset = (p) => `${import.meta.env.BASE_URL}${String(p).replace(/^\//, "")}`;

export const mapsSearch = (q) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
export const mapsDirections = (q) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(q)}`;
export const mapsEmbed = (q) =>
  `https://www.google.com/maps?q=${encodeURIComponent(q)}&output=embed`;

export const eventMapUrl = (ev) => ev.googleMapsUrl || (ev.mapsQuery ? mapsSearch(ev.mapsQuery) : "");

/* ---------- calendar ---------- */
const stamp = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const endOf = (ev) => (ev.end ? new Date(ev.end) : new Date(new Date(ev.start).getTime() + 3 * 3600e3));
const EN = wedding.content.en;
const words = (ev, lang = "en") => wedding.content[lang]?.events?.[ev.id] || EN.events[ev.id] || {};
const location = (ev, lang) => [words(ev, lang).venue, words(ev, lang).address].filter(Boolean).join(", ");
const summary = (ev, lang = "en") => {
  const t = wedding.content[lang] || EN;
  return `${words(ev, lang).title} · ${t.groom.short} ${t.weds} ${t.bride.short}`;
};

export function googleCalendarUrl(ev, lang = "en") {
  const t = wedding.content[lang] || EN;
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: summary(ev, lang),
    dates: `${stamp(new Date(ev.start))}/${stamp(endOf(ev))}`,
    details: `${t.groom.name} & ${t.bride.name}${wedding.site.url ? "\n" + wedding.site.url : ""}`,
    location: location(ev, lang),
  });
  return `https://calendar.google.com/calendar/render?${p}`;
}

export function downloadIcs(events, lang = "en") {
  const esc = (s) => String(s).replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//SethuWedsSudha//EN", "CALSCALE:GREGORIAN"];
  for (const ev of events) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${ev.id}-20261113@sethu-weds-sudha`,
      `DTSTAMP:${stamp(new Date())}`,
      `DTSTART:${stamp(new Date(ev.start))}`,
      `DTEND:${stamp(endOf(ev))}`,
      `SUMMARY:${esc(summary(ev, lang))}`,
      `LOCATION:${esc(location(ev, lang))}`,
      "BEGIN:VALARM",
      "TRIGGER:-PT12H",
      "ACTION:DISPLAY",
      `DESCRIPTION:${esc(summary(ev, lang))}`,
      "END:VALARM",
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = events.length > 1 ? "sethu-weds-sudha.ics" : `${events[0].id}.ics`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => (URL.revokeObjectURL(a.href), a.remove()), 500);
}

/* ---------- music playlist ---------- */
const prettify = (f) =>
  f
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+[\s._-]*/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

// Songs bundled from src/assets/music (if you keep them there) — optional
const bundled = import.meta.glob("../assets/music/*.{mp3,MP3,m4a,M4A,aac,ogg,opus,wav,webm}", {
  eager: true,
  query: "?url",
  import: "default",
});

export function playlist() {
  const meta = Object.fromEntries((wedding.music.tracks || []).map((t) => [t.file, t]));
  const order = (wedding.music.tracks || []).map((t) => t.file);
  const srcOf = {};
  for (const f of musicFiles) srcOf[f] = asset(`music/${encodeURIComponent(f)}`);
  for (const [path, url] of Object.entries(bundled)) {
    const f = path.split("/").pop();
    if (!srcOf[f]) srcOf[f] = url;
  }
  const files = Object.keys(srcOf).sort((a, b) => {
    const ia = order.indexOf(a), ib = order.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b, undefined, { numeric: true });
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
  const list = files.map((f) => ({
    src: srcOf[f],
    title: meta[f]?.title || prettify(f),
    subtitle: meta[f]?.subtitle || "",
    startAt: meta[f]?.startAt || 0,
  }));
  if (wedding.music.shuffle) list.sort(() => Math.random() - 0.5);
  return list;
}

/* ---------- gallery ---------- */
export function galleryPhotos() {
  const meta = Object.fromEntries((wedding.gallery || []).map((g) => [g.file, g]));
  const skip = new Set(wedding.galleryExclude || []);
  return imageFiles
    .filter((f) => !skip.has(f))
    .map((f) => ({ src: asset(`images/${f}`), alt: meta[f]?.alt || "", credit: meta[f]?.credit || "" }));
}

/* ---------- time ---------- */
export function timeLeft(target) {
  const ms = new Date(target).getTime() - Date.now();
  const s = Math.max(0, Math.floor(ms / 1000));
  return { ms, d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
