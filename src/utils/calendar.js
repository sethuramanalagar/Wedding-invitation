import { wedding } from "../config/wedding.js";
import { eventStart, eventEnd } from "./time.js";

/* ── helpers ──────────────────────────────────────────────── */

/** "sethuraman-ragasudha" — used for file names and calendar UIDs. */
export const coupleSlug = `${wedding.groom.firstName}-${wedding.bride.firstName}`
  .toLowerCase()
  .replace(/[^a-z0-9-]+/g, "-");

/** 2026-11-12T12:30:00.000Z → "20261112T123000Z" (UTC, RFC 5545) */
function icsStamp(d) {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/** Escape text per RFC 5545 §3.3.11 */
function icsEscape(text = "") {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

/** Fold lines longer than 75 octets (RFC 5545 §3.1). */
function fold(line) {
  const bytes = new TextEncoder().encode(line);
  if (bytes.length <= 75) return line;
  const out = [];
  let current = "";
  let size = 0;
  for (const ch of line) {
    const len = new TextEncoder().encode(ch).length;
    if (size + len > (out.length ? 74 : 75)) {
      out.push(current);
      current = "";
      size = 0;
    }
    current += ch;
    size += len;
  }
  out.push(current);
  return out.join("\r\n ");
}

/** Venue line for an event, built only from configured values. */
export function venueText(event) {
  // The address already includes the place name; fall back to location.
  return [event.venue, event.address || event.location].filter(Boolean).join(", ");
}

function vevent(key, event) {
  const start = eventStart(event);
  const end = eventEnd(event);
  const lines = [
    "BEGIN:VEVENT",
    `UID:${key}-${event.date}@${coupleSlug}-wedding`,
    `DTSTAMP:${icsStamp(new Date())}`,
    `DTSTART:${icsStamp(start)}`,
  ];
  // Open-ended events ("onwards") have no configured end time.
  // Per RFC 5545 a DATE-TIME start without DTEND is valid.
  if (end) lines.push(`DTEND:${icsStamp(end)}`);
  lines.push(`SUMMARY:${icsEscape(event.calendarTitle)}`);

  const location = venueText(event);
  if (location) lines.push(`LOCATION:${icsEscape(location)}`);

  const desc = [event.description, event.displayTime + " (India time)"]
    .filter(Boolean)
    .join("\n");
  lines.push(`DESCRIPTION:${icsEscape(desc)}`);
  if (event.googleMapsUrl) lines.push(`URL:${event.googleMapsUrl}`);
  lines.push("END:VEVENT");
  return lines;
}

/** Build a complete .ics document for one or more event keys. */
export function buildIcs(keys) {
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${wedding.groom.firstName} & ${wedding.bride.firstName}//Wedding Invitation//EN`,
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...keys.flatMap((k) => vevent(k, wedding[k])),
    "END:VCALENDAR",
  ];
  return body.map(fold).join("\r\n") + "\r\n";
}

/** Trigger a client-side download of an .ics file (no backend needed). */
export function downloadIcs(keys, filename) {
  const ics = buildIcs(keys);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

/** Google Calendar "template" link — handy inside in-app browsers. */
export function googleCalendarUrl(key) {
  const event = wedding[key];
  const start = eventStart(event);
  // Google requires an end; for an open-ended event reuse the start.
  const end = eventEnd(event) ?? start;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.calendarTitle,
    dates: `${icsStamp(start)}/${icsStamp(end)}`,
    details: [event.description, event.displayTime + " (India time)"]
      .filter(Boolean)
      .join("\n"),
    ctz: wedding.timezone,
  });
  const location = venueText(event);
  if (location) params.set("location", location);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
