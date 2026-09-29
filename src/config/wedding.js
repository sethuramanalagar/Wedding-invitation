/**
 * ─────────────────────────────────────────────────────────────
 *  WEDDING CONFIGURATION — the single source of truth
 * ─────────────────────────────────────────────────────────────
 *  Every name, date, time, venue and link on the website comes
 *  from this file. Edit here; nothing else needs to change.
 *
 *  • Dates are "YYYY-MM-DD", times are 24-hour "HH:MM".
 *  • All times are interpreted in India time (Asia/Kolkata, UTC+05:30),
 *    so the countdown and calendar files are correct for guests
 *    anywhere in the world.
 *  • Leave a field as "" when the information is not yet known —
 *    the site hides or softens that detail automatically.
 *  • Image and music paths are relative to the /public folder.
 * ─────────────────────────────────────────────────────────────
 */

export const wedding = {
  /* Used for the browser title, WhatsApp / social link previews. */
  site: {
    title: "Wedding Invitation | Sethuraman & Ragasudha",
    description:
      "With joy, we invite you to the wedding of Er. A. Sethuraman, B.E. & Dr. A. Ragasudha, BNYS, MD — Friday, 13th November 2026.",
    // Your final public address, e.g. "https://sethu-ragasudha.vercel.app"
    // (no trailing slash). Needed so WhatsApp can show the preview image.
    url: "",
    ogImage: "/images/og-image.jpg",
  },

  timezone: "Asia/Kolkata",
  utcOffset: "+05:30",

  groom: {
    firstName: "Sethuraman",
    name: "Er. A. Sethuraman",
    qualification: "B.E.",
  },

  bride: {
    firstName: "Ragasudha",
    name: "Dr. A. Ragasudha",
    qualification: "BNYS, MD",
  },

  /* Hero / opening and invitation wording */
  opening: {
    greeting: "Together with their families",
    displayDate: "13 • 11 • 2026",
  },

  invitation: {
    poem: [
      "In the melodies of our love,",
      "We celebrate the harmonious",
      "Blend of two souls,",
      "Creating a symphony that",
      "Resonates through time",
    ],
    inviteLine: "We cordially invite you to the wedding of",
    weddingDay: "Friday, 13th November 2026",
  },

  /* ── EVENTS ─────────────────────────────────────────────── */

  reception: {
    title: "Reception",
    calendarTitle: "Reception — Sethuraman & Ragasudha",
    date: "2026-11-12",
    displayDate: "Thursday, 12th November 2026",
    shortDate: "12 NOV",
    startTime: "18:00",
    endTime: "20:00",
    displayTime: "6:00 PM – 8:00 PM",
    description: "",
    // Not yet announced — fill these in when confirmed:
    venue: "",
    address: "",
    location: "",
    googleMapsUrl: "",
  },

  marriage: {
    title: "The Wedding",
    calendarTitle: "Wedding Ceremony — Sethuraman & Ragasudha",
    date: "2026-11-13",
    displayDate: "Friday, 13th November 2026",
    shortDate: "13 NOV",
    startTime: "04:00",
    endTime: "06:00",
    displayTime: "4:00 AM – 6:00 AM",
    description: "The marriage ceremony",
    venue: "Kandamakudiyan Kanjivanam Karuppusamy Temple",
    address: "",
    location: "Thandavankulam",
    googleMapsUrl: "",
  },

  postWedding: {
    title: "Post-Wedding Celebrations",
    calendarTitle: "Post-Wedding Celebrations — Sethuraman & Ragasudha",
    date: "2026-11-13",
    displayDate: "Friday, 13th November 2026",
    shortDate: "13 NOV",
    startTime: "06:00",
    endTime: "", // open-ended ("onwards")
    displayTime: "From 6:00 AM onwards",
    description: "Post-wedding rituals, celebrations & food",
    venue: "Sangomithrai Hall",
    address: "",
    location: "Thandavankulam",
    googleMapsUrl: "",
  },

  /* ── COUNTDOWN MESSAGES ─────────────────────────────────── */
  countdown: {
    // Counts down to marriage.date + marriage.startTime (India time)
    begunMessage: "The Wedding Has Begun ❤️",
    continueMessage: "The celebrations continue...",
  },

  /* ── MEDIA ──────────────────────────────────────────────── */
  coupleImage: "/images/couple.jpg",

  music: {
    enabled: true,
    source: "/music/wedding.mp3",
  },

  /* ── RSVP ───────────────────────────────────────────────── */
  rsvp: {
    enabled: false,
    phone: "", // e.g. "+919876543210"
    whatsapp: "", // digits with country code, e.g. "919876543210"
  },

  /* ── SHARING & CLOSING ──────────────────────────────────── */
  share: {
    message:
      "You are warmly invited to the wedding of Sethuraman & Ragasudha — 13 November 2026.",
  },

  closing: {
    lines: ["Two hearts.", "One beautiful beginning."],
  },
};

export default wedding;
