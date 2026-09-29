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

/** Google Maps search link built from a place name / address / plus code. */
const mapsSearch = (query) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

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

  /* Royal colour theme: "maharaja" (maroon), "emerald", "sapphire" or "rani" (pink).
     guestCanChange: show the palette button so guests can try other themes. */
  theme: {
    default: "maharaja",
    guestCanChange: true,
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
    mapsQuery: "",
    googleMapsUrl: "",
  },

  marriage: {
    title: "The Wedding",
    calendarTitle: "Wedding Ceremony — Sethuraman & Ragasudha",
    date: "2026-11-13",
    displayDate: "Friday, 13th November 2026",
    shortDate: "13 NOV",
    startTime: "04:30",
    endTime: "06:00",
    displayTime: "4:30 AM – 6:00 AM",
    description: "The marriage ceremony",
    venue: "Kandamakudiyan Kanjivanam Karuppusamy Temple",
    address: "8RC8+Q2P, Madathukuppam, Tamil Nadu 609101",
    location: "Thandavankulam",
    // What Google Maps searches for (directions, embedded map):
    mapsQuery:
      "Sri Kandamakudiyan Kanjivanam Karuppu Swami Temple, 8RC8+Q2P, Madathukuppam, Tamil Nadu 609101",
    googleMapsUrl: mapsSearch(
      "Sri Kandamakudiyan Kanjivanam Karuppu Swami Temple, 8RC8+Q2P, Madathukuppam, Tamil Nadu 609101",
    ),
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
    venue: "ASK Sangamithirai Marriage Hall",
    address: "Puthur - Pazhayar Rd, Thandavankulam, Sirkali, Tamil Nadu 609101",
    location: "Thandavankulam",
    mapsQuery:
      "ASK Sangamithirai Marriage Hall, Puthur - Pazhayar Rd, Thandavankulam, Sirkali, Tamil Nadu 609101",
    googleMapsUrl: mapsSearch(
      "ASK Sangamithirai Marriage Hall, Puthur - Pazhayar Rd, Thandavankulam, Sirkali, Tamil Nadu 609101",
    ),
  },

  /* ── COUNTDOWN MESSAGES ─────────────────────────────────── */
  countdown: {
    // Counts down to marriage.date + marriage.startTime (India time)
    begunMessage: "The Wedding Has Begun ❤️",
    continueMessage: "The celebrations continue...",
  },

  /* ── MEDIA ──────────────────────────────────────────────── */
  // Couple with the background removed (transparent WebP) — shown on the
  // animated royal stage. If missing, the original photo is used instead.
  coupleCutout: "/images/couple-cutout.webp",
  coupleImage: "/images/couple.jpg",
  // "Our Moments" gallery (animated slideshow). Add more photos here.
  gallery: [
    { src: "/images/couple-2.jpg", alt: "Sethuraman and Ragasudha", credit: "Leaf9Studios" },
    { src: "/images/couple.jpg", alt: "Sethuraman and Ragasudha at their engagement", credit: "" },
  ],
  groomImage: "/images/groom.webp",
  brideImage: "/images/bride.webp",

  /* Background music — never plays on page load; starts with a tap.
     Four built-in tracks are bundled automatically (src/config/music.js).
     To add your OWN songs, put MP3s in public/music/ and list them here —
     they play before the built-in ones. */
  music: {
    enabled: true,
    volume: 0.5,
    playOnOpen: true, // music starts when the guest taps "Open Invitation"
    tracks: [
      // { title: "Our song", subtitle: "Nadaswaram", src: "/music/our-song.mp3" },
    ],
  },

  /* ── HOW TO REACH ───────────────────────────────────────────
   *  Journeys are planned to Sirkazhi (Sirkali) — the nearest town,
   *  with the main bus stand and railway station — and then the
   *  short last stretch to Thandavankulam.
   *  Distances and times are APPROXIMATE. Edit freely; the site also
   *  offers live Google Maps directions from any place the guest types.
   * ──────────────────────────────────────────────────────────── */
  travel: {
    hub: "Sirkazhi (Sirkali)",
    village: "Thandavankulam",
    arriveNote:
      "The wedding begins at 4:30 AM on 13 November. Guests travelling from afar are requested to arrive by the evening of 12 November.",
    lastMile: [
      "Thandavankulam is about 17 km from Sirkazhi, on the Puthur – Pazhayar Road.",
      "Auto-rickshaws and taxis are available at Sirkazhi bus stand and railway station.",
      "Local buses run along the Puthur – Pazhayar Road — ask at Sirkazhi bus stand for a bus to Thandavankulam.",
    ],
    rail: "Sirkazhi (SY) is the main railway station, on the Chennai – Chidambaram – Mayiladuthurai – Trichy line. Kollidam (CLN) is closer to the village, but fewer trains stop there.",
    air: "Nearest airports: Puducherry (about 55 km, limited flights), Tiruchirappalli (about 160 km from Sirkazhi) and Chennai.",
    origins: [
      { id: "chennai", name: "Chennai", aliases: ["madras", "kilambakkam", "koyambedu", "tambaram", "egmore"], distance: "about 240 km", time: "5½ – 7 hrs by bus", via: ["Chidambaram"],
        bus: "Buses towards Sirkazhi, Nagapattinam, Karaikal or Velankanni via Chidambaram leave from Kilambakkam (KCBT) and Koyambedu. Private overnight buses also run to Sirkazhi. Check that your bus stops at Sirkazhi.",
        train: "Chennai Egmore → Sirkazhi (SY), on the main line via Chidambaram." },
      { id: "puducherry", name: "Puducherry", aliases: ["pondicherry", "pondy"], distance: "about 90 km", time: "2½ – 3 hrs by bus", via: ["Cuddalore", "Chidambaram"],
        bus: "Buses to Chidambaram / Sirkazhi via Cuddalore. Or take any bus to Chidambaram and change to a Sirkazhi bus.",
        train: "A few trains run from Puducherry via Villupuram — check timings." },
      { id: "cuddalore", name: "Cuddalore", aliases: ["neyveli"], distance: "about 65 km", time: "about 1½ – 2 hrs by bus", via: ["Chidambaram"],
        bus: "Frequent buses to Chidambaram and Sirkazhi.", train: "Cuddalore Port → Sirkazhi, on the main line." },
      { id: "villupuram", name: "Villupuram", aliases: ["viluppuram"], distance: "about 110 km", time: "about 3 hrs by bus", via: ["Cuddalore", "Chidambaram"],
        bus: "Buses towards Chidambaram / Sirkazhi.", train: "Villupuram Jn → Sirkazhi, on the main line." },
      { id: "chidambaram", name: "Chidambaram", aliases: ["annamalai nagar"], distance: "about 20 km", time: "about 30 – 45 min by bus", via: [],
        bus: "Very frequent buses to Sirkazhi.", train: "Chidambaram → Sirkazhi, one stop on the main line." },
      { id: "mayiladuthurai", name: "Mayiladuthurai", aliases: ["mayavaram", "mayuram"], distance: "about 24 km", time: "about 40 min – 1 hr by bus", via: [],
        bus: "Very frequent buses to Sirkazhi.", train: "Mayiladuthurai Jn → Sirkazhi." },
      { id: "kumbakonam", name: "Kumbakonam", aliases: [], distance: "about 60 km", time: "about 1½ – 2 hrs by bus", via: ["Mayiladuthurai"],
        bus: "Buses to Sirkazhi, or to Mayiladuthurai and change.", train: "Kumbakonam → Mayiladuthurai → Sirkazhi." },
      { id: "thanjavur", name: "Thanjavur", aliases: ["tanjore"], distance: "about 95 km", time: "about 2½ – 3 hrs by bus", via: ["Kumbakonam", "Mayiladuthurai"],
        bus: "Buses to Kumbakonam / Mayiladuthurai, then a Sirkazhi bus.", train: "Thanjavur → Mayiladuthurai → Sirkazhi." },
      { id: "trichy", name: "Tiruchirappalli (Trichy)", aliases: ["trichy", "tiruchirappalli", "tiruchi", "srirangam"], distance: "about 150 km", time: "about 4 hrs by bus", via: ["Thanjavur", "Kumbakonam", "Mayiladuthurai"],
        bus: "Buses to Kumbakonam / Mayiladuthurai, then a Sirkazhi bus.", train: "Tiruchirappalli Jn → Sirkazhi (daily express trains)." },
      { id: "nagapattinam", name: "Nagapattinam", aliases: ["velankanni", "nagore"], distance: "about 60 km", time: "about 1½ – 2 hrs by bus", via: [],
        bus: "Direct buses to Sirkazhi.", train: "Via Mayiladuthurai to Sirkazhi — check timings." },
      { id: "karaikal", name: "Karaikal", aliases: ["tharangambadi", "tranquebar"], distance: "about 45 km", time: "about 1½ hrs by bus", via: [],
        bus: "Direct buses to Sirkazhi.", train: "Limited — bus is easier." },
      { id: "madurai", name: "Madurai", aliases: [], distance: "about 290 km", time: "7 – 8 hrs", via: ["Tiruchirappalli", "Thanjavur", "Mayiladuthurai"],
        bus: "Bus to Trichy or Thanjavur, then connect towards Mayiladuthurai / Sirkazhi.", train: "Daily express trains from Madurai to Sirkazhi." },
      { id: "coimbatore", name: "Coimbatore", aliases: ["kovai", "tiruppur", "tirupur", "erode"], distance: "about 370 km", time: "overnight", via: ["Tiruchirappalli", "Mayiladuthurai"],
        bus: "Overnight private buses run to Sirkazhi. Or take a bus to Trichy and connect.", train: "Coimbatore → Mayiladuthurai Jn by train, then a bus to Sirkazhi (24 km)." },
      { id: "salem", name: "Salem", aliases: ["namakkal"], distance: "about 290 km", time: "7 – 8 hrs", via: ["Tiruchirappalli", "Mayiladuthurai"],
        bus: "Bus to Trichy, then connect towards Mayiladuthurai / Sirkazhi.", train: "Salem → Sirkazhi via Villupuram — check timings." },
      { id: "bengaluru", name: "Bengaluru", aliases: ["bangalore", "blr", "hosur"], distance: "about 400 km", time: "overnight", via: ["Salem", "Tiruchirappalli", "Mayiladuthurai"],
        bus: "Overnight private sleeper buses run to Sirkazhi.", train: "Trains from Bengaluru to Mayiladuthurai Jn, then a bus to Sirkazhi (24 km)." },
    ],
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
