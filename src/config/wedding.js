/**
 * ★ ALL wedding information lives here. Components only read from this file.
 * The site has two full versions: Tamil (ta) and English (en).
 * Guests switch with the தமிழ் / English button, or you can share a link
 * that opens straight in one language:  …/?lang=ta   or   …/?lang=en
 * Any text set to "" is hidden.
 */
export const wedding = {
  defaultLang: "ta", // language shown when the link has no ?lang=

  site: {
    title: "Sethu weds Sudha · 13 November 2026",
    description:
      "Er. A. Sethuraman & Dr. A. Ragasudha warmly invite you to their wedding on Friday, 13 November 2026 at Thandavankulam.",
    // Paste your live address here after deploying (needed for WhatsApp previews)
    url: "",
    ogImage: "/images/og-image.jpg",
  },

  // Main countdown target (India time)
  countdownTo: "2026-11-13T04:00:00+05:30",

  /* Event timing & maps (shared by both languages). Words are in content.*.events */
  events: [
    {
      id: "reception",
      scene: "evening",
      start: "2026-11-12T18:00:00+05:30",
      end: "2026-11-12T20:00:00+05:30",
      mapsQuery: "", // add when the hall is decided
      googleMapsUrl: "",
    },
    {
      id: "wedding",
      scene: "predawn",
      featured: true,
      start: "2026-11-13T04:00:00+05:30",
      end: "2026-11-13T06:00:00+05:30",
      mapsQuery: "8RC8+Q2P Madathukuppam, Tamil Nadu 609101",
      googleMapsUrl: "",
    },
    {
      id: "celebration",
      scene: "sunrise",
      start: "2026-11-13T06:00:00+05:30",
      end: "", // open-ended; calendar files use 3 hours
      mapsQuery: "ASK Sangamithirai Marriage Hall, Puthur - Pazhayar Rd, Thandavankulam, Sirkali, Tamil Nadu 609101",
      googleMapsUrl: "",
    },
  ],

  hostPhone: "+919965117848",
  showPhone: false, // true → shows a "Call" button in the family section

  /**
   * MUSIC — every file in public/music (and src/assets/music) plays
   * automatically, in name order, after the guest taps the seal.
   * Optional extras per file: title / subtitle shown in the player,
   * startAt (seconds) to skip an intro.
   * Only use songs you have the right to share publicly.
   */
  music: {
    playOnOpen: true,
    shuffle: false,
    volume: 0.85,
    tracks: [
      // { file: "01-song.mp3", title: "பாடலின் பெயர்", subtitle: "Movie name", startAt: 8 },
    ],
  },

  // Photos: every image in public/images appears in "Our Moments" (when 2+).
  galleryExclude: ["og-image.jpg", "couple.webp", "couple-sm.webp", "groom.webp", "bride.webp"],
  gallery: [{ file: "couple.jpg", alt: "Sethu & Sudha", credit: "Leaf9Studios" }],

  /* ======================================================================
     WORDS — one block per language
     ====================================================================== */
  content: {
    /* ------------------------------ தமிழ் ------------------------------ */
    ta: {
      langName: "தமிழ்",
      groom: { name: "Er. A. சேதுராமன்", degree: "B.E.", short: "சேது" },
      bride: { name: "Dr. A. ராகசுதா", degree: "BNYS., MD", short: "சுதா" },
      weds: "♥",
      house: "அரிமா இல்ல",
      heading: "விவாக சுபமுகூர்த்த அழைப்பிதழ்",

      cover: { eyebrow: "சுபமுகூர்த்த அழைப்பிதழ்", hint: "திறக்க முத்திரையைத் தொடவும்", date: "13 · 11 · 2026" },

      hero: {
        ribbon: ["வெள்ளி", "13 · 11 · 2026", "அதிகாலை 4:00"],
        dateLine: "13-11-2026, வெள்ளிக்கிழமை",
      },

      card: {
        label1: "மணமக்கள்",
        label2: "மணநாள்",
        date: "13-11-2026, வெள்ளிக்கிழமை",
        label3: "மணஇடம்",
        venue: "ஸ்ரீ கண்டமக்குடியான் காஞ்சிவனம் கருப்புசாமி ஆலயம், தாண்டவன்குளம்",
      },
      invite: {
        title: "அன்பான அழைப்பு",
        line:
          "இறைவன் அருளாலும் பெரியோர்களின் நல்லாசியுடனும் நிகழவிருக்கும் எங்கள் இல்லத் திருமண விழாவிற்குத் தாங்கள் தங்கள் குடும்பத்தினருடன் வருகை தந்து மணமக்களை வாழ்த்தியருளுமாறு அன்புடன் அழைக்கிறோம்.",
        when: "13 நவம்பர் 2026, வெள்ளிக்கிழமை\nஅதிகாலை 4:00 – 6:00 மணி சுபமுகூர்த்தத்தில்",
      },

      countdown: {
        eyebrow: "நல்ல நேரம்",
        title: "சுபமுகூர்த்தத்திற்கு இன்னும்",
        units: ["நாட்கள்", "மணி", "நிமிடம்", "விநாடி"],
        sub: "வெள்ளிக்கிழமை · 13 நவம்பர் 2026 · அதிகாலை 4:00",
        started: "திருமணம் தொடங்கிவிட்டது ❤️",
        after: "கொண்டாட்டங்கள் தொடர்கின்றன…",
      },

      ceremony: {
        eyebrow: "The Royal Wedding",
        title: "கல்யாண வைபோகம்",
        roof: "✦ சுப முகூர்த்தம் ✦",
        phases: [
          ["நல்ல நேரம்", "அதிகாலை சுபமுகூர்த்த வேளை"],
          ["மாலை மாற்றல்", "மணமக்கள் மாலை மாற்றிக்கொள்கின்றனர்"],
          ["மாங்கல்ய தாரணம்", "திருமாங்கல்யம் அணிவிக்கப்படுகிறது"],
          ["அட்சதை ஆசீர்வாதம்", "பெரியோர்களின் நல்லாசி"],
          ["சேது ❤ சுதா", "இரு மனம் இணையும் இனிய திருமணம்"],
        ],
      },

      eventsTitle: "நிகழ்ச்சி நிரல்",
      eventsEyebrow: "Wedding Events",
      events: {
        reception: { title: "வரவேற்பு", date: "வியாழக்கிழமை, 12 நவம்பர் 2026", time: "மாலை 6:00 – இரவு 8:00", venue: "", address: "" },
        wedding: {
          title: "திருமணம்",
          date: "வெள்ளிக்கிழமை, 13 நவம்பர் 2026",
          time: "அதிகாலை 4:00 – 6:00",
          venue: "ஸ்ரீ கண்டமக்குடியான் காஞ்சிவனம் கருப்புசாமி ஆலயம்",
          address: "தாண்டவன்குளம் (8RC8+Q2P, மடத்துக்குப்பம்), தமிழ்நாடு 609101",
        },
        celebration: {
          title: "சடங்குகள், கொண்டாட்டம் & விருந்து",
          date: "வெள்ளிக்கிழமை, 13 நவம்பர் 2026",
          time: "காலை 6:00 மணி முதல்",
          venue: "ASK சங்கமித்திரை திருமண மண்டபம்",
          address: "புத்தூர் - பழையார் சாலை, தாண்டவன்குளம், சீர்காழி, தமிழ்நாடு 609101",
        },
      },
      ui: {
        map: "வரைபடம்",
        directions: "வழி காட்டு",
        save: "நாட்காட்டியில் சேர்",
        showMap: "வரைபடத்தைக் காண தொடவும்",
        addAll: "எல்லா நிகழ்வுகளையும் நாட்காட்டியில் சேர்க்க",
        pending: "இடம் விரைவில் அறிவிக்கப்படும்",
        share: "பகிர்",
        copy: "இணைப்பை நகலெடு",
        copied: "நகலெடுக்கப்பட்டது",
        call: "அழைக்க",
      },

      galleryTitle: "நினைவுகள்",
      galleryEyebrow: "Our Moments",

      hosts: {
        eyebrow: "With love, invited by",
        title: "அன்புடன் அழைக்கும்",
        people: [
          { name: "A. அழகர், B.Com.", line: "ஓய்வு, தமிழ்நாடு மின் உற்பத்தி - பகிர்மான கழகம் (வருவாய் பிரிவு), சீர்காழி" },
          { name: "செல்வி அழகர்", line: "" },
        ],
        place: "தாண்டவன்குளம், சீர்காழி தாலுக்கா, மயிலாடுதுறை மாவட்டம்",
        note: "தங்கள் வருகையும் நல்லாசியுமே எங்களுக்குப் பெரும் பரிசு.",
      },

      closing: {
        line1: "தங்கள் வருகையை அன்புடன் எதிர்பார்க்கிறோம்",
        line2: "",
        fine: "13 · 11 · 2026 · தாண்டவன்குளம், சீர்காழி",
        shareText: "சேது ❤ சுதா திருமண அழைப்பிதழ் 💐\nவெள்ளிக்கிழமை, 13 நவம்பர் 2026 · தாண்டவன்குளம்",
      },
      side: ["வெள்ளிக்கிழமை", "13 · 11 · 2026", "அதிகாலை 4:00 · தாண்டவன்குளம்"],
    },

    /* ------------------------------ English ------------------------------ */
    en: {
      langName: "English",
      groom: { name: "Er. A. Sethuraman", degree: "B.E.", short: "Sethu" },
      bride: { name: "Dr. A. Ragasudha", degree: "BNYS, MD", short: "Sudha" },
      weds: "weds",
      house: "Arima Illam",
      heading: "Wedding Invitation",

      cover: { eyebrow: "Wedding Invitation", hint: "Tap the seal to open", date: "13 · 11 · 2026" },

      hero: {
        ribbon: ["Friday", "13 · 11 · 2026", "4:00 AM"],
        dateLine: "Friday, 13 November 2026",
      },

      card: {
        label1: "The Couple",
        label2: "Wedding Day",
        date: "Friday, 13 November 2026",
        label3: "Venue",
        venue: "Sri Kandamakudiyan Kanjivanam Karuppusamy Temple, Thandavankulam",
      },
      invite: {
        title: "The Invitation",
        line:
          "With the blessings of the Almighty and our elders, we joyfully request the honour of your presence, with your family, at the wedding of our children, and seek your blessings for the couple.",
        when: "Friday, the thirteenth of November, two thousand twenty-six\nat the auspicious hour of 4:00 – 6:00 AM",
      },

      countdown: {
        eyebrow: "The Auspicious Hour",
        title: "Counting down to the muhurtham",
        units: ["Days", "Hours", "Minutes", "Seconds"],
        sub: "Friday · 13 November 2026 · 4:00 AM IST",
        started: "The Wedding Has Begun ❤️",
        after: "The celebrations continue…",
      },

      ceremony: {
        eyebrow: "கல்யாண வைபோகம்",
        title: "The Royal Wedding",
        roof: "✦ SHUBHA MUHURTHAM ✦",
        phases: [
          ["The Auspicious Hour", "The muhurtham arrives at dawn"],
          ["Exchange of Garlands", "Maalai Maatral"],
          ["The Sacred Thali", "Mangalya Dharanam"],
          ["Showered with Blessings", "Akshathai from our elders"],
          ["Sethu ❤ Sudha", "Two hearts, one forever"],
        ],
      },

      eventsTitle: "Wedding Events",
      eventsEyebrow: "நிகழ்ச்சி நிரல்",
      events: {
        reception: { title: "Reception", date: "Thursday, 12 November 2026", time: "6:00 PM – 8:00 PM", venue: "", address: "" },
        wedding: {
          title: "The Wedding",
          date: "Friday, 13 November 2026",
          time: "4:00 AM – 6:00 AM",
          venue: "Sri Kandamakudiyan Kanjivanam Karuppusamy Temple",
          address: "Thandavankulam (8RC8+Q2P, Madathukuppam), Tamil Nadu 609101",
        },
        celebration: {
          title: "Rituals, Celebrations & Feast",
          date: "Friday, 13 November 2026",
          time: "From 6:00 AM",
          venue: "ASK Sangamithirai Marriage Hall",
          address: "Puthur - Pazhayar Rd, Thandavankulam, Sirkali, Tamil Nadu 609101",
        },
      },
      ui: {
        map: "Open Map",
        directions: "Directions",
        save: "Save date",
        showMap: "Tap to show map",
        addAll: "Add all events to my calendar",
        pending: "Venue to be announced",
        share: "Share",
        copy: "Copy link",
        copied: "Copied",
        call: "Call",
      },

      galleryTitle: "Our Moments",
      galleryEyebrow: "நினைவுகள்",

      hosts: {
        eyebrow: "அன்புடன் அழைக்கும்",
        title: "With Love, Invited By",
        people: [
          { name: "A. Alagar, B.Com.", line: "Retired, Tamil Nadu Generation & Distribution Corporation (Revenue Wing), Sirkazhi" },
          { name: "Selvi Alagar", line: "" },
        ],
        place: "Thandavankulam, Sirkazhi Taluk, Mayiladuthurai District",
        note: "Your presence and blessings are the greatest gift.",
      },

      closing: {
        line1: "We eagerly await your gracious presence",
        line2: "",
        fine: "13 · 11 · 2026 · Thandavankulam, Sirkazhi",
        shareText: "Sethu weds Sudha 💐\nEr. A. Sethuraman & Dr. A. Ragasudha\nFriday, 13 November 2026 · Thandavankulam",
      },
      side: ["Friday", "13 · 11 · 2026", "4:00 AM · Thandavankulam"],
    },
  },
};
