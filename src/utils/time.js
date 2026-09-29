import { wedding } from "../config/wedding.js";

/**
 * Convert a config date ("2026-11-13") + time ("04:00") into an absolute
 * instant, interpreted in the wedding's timezone (Asia/Kolkata, +05:30).
 * Because the offset is explicit, the result is identical on every device,
 * whatever the guest's own timezone is. India has no daylight saving, so a
 * fixed offset is exact.
 */
export function toInstant(date, time) {
  if (!date || !time) return null;
  return new Date(`${date}T${time}:00${wedding.utcOffset}`);
}

export function eventStart(event) {
  return toInstant(event.date, event.startTime);
}

export function eventEnd(event) {
  return toInstant(event.date, event.endTime);
}

/** Split a millisecond duration into days / hours / minutes / seconds. */
export function splitDuration(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

/**
 * Which phase of the wedding day are we in?
 *  "before"   → counting down to the ceremony
 *  "ongoing"  → ceremony in progress (start ≤ now < end)
 *  "after"    → after the ceremony ends
 */
export function weddingPhase(now = new Date()) {
  const start = eventStart(wedding.marriage);
  const end = eventEnd(wedding.marriage) ?? start;
  if (now < start) return "before";
  if (now < end) return "ongoing";
  return "after";
}
