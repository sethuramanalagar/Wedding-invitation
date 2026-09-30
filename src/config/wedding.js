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
    nickname: "Sethu",
    name: "Er. A. Sethuraman",
    qualification: "B.E.",
  },

  bride: {
    firstName: "Ragasudha",
    nickname: "Sudha",
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
    startTime: "04:00",
    endTime: "06:00",
    displayTime: "4:00 AM – 6:00 AM",
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
     Mangala vadhyam (nadaswaram & thavil) recordings play first, in order.
     Put each MP3 in public/music/ with the file name shown below — see
     README "Music" for the download links. A missing file is skipped
     automatically, and the built-in instrumentals are the fallback. */
  music: {
    enabled: true,
    volume: 0.6,
    playOnOpen: true, // start when the guest taps "Open Invitation"
    tracks: [
      {
        title: "Kalyana Mangala Vadhyam",
        subtitle: "Nadaswaram & thavil · live at a Chennai wedding",
        src: "/music/mangala-vadhyam-chennai.mp3",
        // CC BY 4.0 — this credit is required and is shown on the site
        credit: '"wedding-music.wav" by xserra (Freesound) · CC BY 4.0',
        creditUrl: "https://freesound.org/people/xserra/sounds/320245/",
      },
      {
        title: "Nadaswaram & Thavil · Kappi",
        subtitle: "Raga Kappi · Saseendran",
        src: "/music/nadaswaram-thavil-kappi.mp3",
        credit: "Saseendran (Pixabay)",
        creditUrl: "https://pixabay.com/music/india-south-india-nadaswaram-thavil-kappi-raga-358257/",
      },
      {
        title: "Nadaswaram · Valachi",
        subtitle: "Raga Valachi · Saseendran",
        src: "/music/nadaswaram-valachi.mp3",
        credit: "Saseendran (Pixabay)",
        creditUrl: "https://pixabay.com/music/india-raga-valachi-nadaswaram-6-8-382924/",
      },
      {
        title: "Shehnai · Wedding Ceremony",
        subtitle: "Traditional wedding ceremonial music",
        src: "/music/wedding-shehnai.mp3",
        credit: "DesiFreeMusic (Pixabay)",
        creditUrl: "https://pixabay.com/music/wedding-traditional-wedding-ceremonial-vibe-with-shehna-376293/",
      },
    ],
    // Optional: YouTube songs (played in YouTube's own visible player).
    // Left empty on purpose — add { title, subtitle, url } items to use it.
    youtube: [],
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
      "The wedding begins at 4:00 AM on 13 November. Guests travelling from afar are requested to arrive by the evening of 12 November.",
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

  /* ── ALL ON-SCREEN TEXT ─────────────────────────────────
   *  Every heading, label and button on the site. Change the wording
   *  here. An empty string ("") hides that piece of text.
   * ──────────────────────────────────────────────────────────── */
  text: {
    hero: { openButton: "Open Invitation", scrollHint: "Scroll to the invitation" },
    couple: { groomRole: "The Groom", brideRole: "The Bride" },
    gallery: { eyebrow: "Captured with love", title: "Our Moments", credit: "Photo" },
    scene: {
      eyebrow: "Our love story",
      title: "Sethu weds Sudha",
      captions: [
        "Sethu & Sudha arrive…",
        "…garlands are exchanged…",
        "…the sacred thali is tied…",
        "…showered with blessings!",
        "Sethu ❤ Sudha",
      ],
    },
    countdown: {
      eyebrow: "Until the wedding begins",
      title: "Counting the moments",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds",
      timezoneNote: "All times are in India Standard Time (IST)",
    },
    events: {
      eyebrow: "Join us",
      title: "Our Wedding Celebrations",
      receptionKicker: "An evening together",
      marriageKicker: "The marriage ceremony",
      postWeddingKicker: "After the wedding",
      bridge: "Celebrations continue",
    },
    venues: {
      eyebrow: "Where to find us",
      title: "The Venues",
      receptionLabel: "Reception",
      marriageLabel: "The Wedding · Temple",
      postWeddingLabel: "Celebrations & Feast · Hall",
      pending: "", // shown when a venue isn't set yet (e.g. "Venue to be announced")
      mapPending: "", // button shown when a venue isn't set yet (e.g. "Map coming soon")
      showMap: "Show map",
      openMaps: "Open in Google Maps",
      directions: "Get directions",
      templeToHall: "Route: Temple → Hall",
    },
    reach: {
      eyebrow: "Plan your journey",
      title: "How to reach us",
      fromLabel: "Where are you travelling from?",
      placeholder: "Type your city or town",
      showRoute: "Show route",
      byBus: "By bus to Sirkazhi",
      byTrain: "By train",
      reachHubFirst: "Reach Sirkazhi first",
      lastStretch: "Last stretch to the",
      liveRoute: "Live bus / train route",
      carRoute: "Car / taxi route",
      myLocation: "Directions from my current location",
      trainsFlights: "Trains & flights",
      disclaimer: "Distances and times are approximate. Please confirm bus and train timings before you travel.",
      temple: "Temple",
      templeSub: "Wedding · 4 AM",
      hall: "Hall",
      hallSub: "Celebrations · 6 AM",
      reception: "Reception",
      receptionSub: "12 Nov · 6 PM",
      startNote: "Your starting point",
      toHub: "to Sirkazhi",
      hubNote: "Bus stand · Railway station",
      villageNote: "Puthur – Pazhayar Road",
      noSavedRoute:
        "We don't have a saved route from “{place}”. Travel to Sirkazhi (Sirkali) by bus or train — it's the nearest town — or tap the live route below for step-by-step directions.",
    },
    calendar: { eyebrow: "Save the dates", title: "Add to your calendar", add: "Add to Calendar", google: "Google Calendar", addAll: "Add all three events" },
    share: { title: "Share the joy", text: "Pass this invitation on to family and friends.", native: "Share Invitation", whatsapp: "Share on WhatsApp", copy: "Copy Link", copied: "Link copied" },
    rsvp: { title: "Kindly confirm your presence", call: "Call", whatsapp: "WhatsApp" },
    footer: { backToTop: "Back to top", musicCredit: "Music:" },
    music: { hint: "♪ Tap for music", listTitle: "Wedding music", ownGroup: "Mangala vadhyam", bundledGroup: "Instrumentals" },
    theme: { title: "Royal theme" },
    desktop: { note: "Best enjoyed on your phone" },
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
