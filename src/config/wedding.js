/**
 * ★ ALL wedding information lives here. Components only read from this file.
 * The site has two full versions: Tamil (ta) and English (en).
 * Guests switch with the தமிழ் / English button, or you can share a link
 * that opens straight in one language:  …/?lang=ta   or   …/?lang=en
 * Any text set to "" is hidden.
 */
export const wedding = {
  defaultLang: "ta", // language shown when the link has no ?lang=

  monogram: ["S", "R"], // shown on the wax seal and above the names

  site: {
    title: "Sethuraman weds Ragasudha · 13 November 2026",
    description:
      "Er. A. Sethuraman & Dr. A. Ragasudha warmly invite you to their wedding on Friday, 13 November 2026 at Thandavankulam.",
    // Paste your live address here after deploying (needed for WhatsApp previews)
    url: "",
    ogImage: "/images/og-image.jpg",
  },

  // Main countdown target (India time)
  countdownTo: "2026-11-13T04:30:00+05:30",

  /* Event timing & maps (shared by both languages). Words are in content.*.events */
  events: [
    {
      id: "reception",
      scene: "evening",
      start: "2026-11-12T18:00:00+05:30",
      end: "2026-11-12T20:00:00+05:30",
      mapsQuery: "ASK Sangamithirai Marriage Hall, Puthur - Pazhayar Rd, Thandavankulam, Sirkali, Tamil Nadu 609101",
      googleMapsUrl: "",
    },
    {
      id: "wedding",
      scene: "predawn",
      featured: true,
      start: "2026-11-13T04:30:00+05:30",
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
    /**
     * Tamil wedding songs played through YouTube's official player, used when
     * public/music is empty. Each one is an official upload that allows
     * embedding (checked Oct 2026). Add more with the video id from the
     * YouTube link (youtube.com/watch?v=THIS_PART).
     */
    youtube: [
      { id: "9rxMk64fJvk", ta: "ஆஹா கல்யாணம்", en: "Aaha Kalyanam", movie: "Petta" },
      { id: "hoFFQ0bVqZY", ta: "கல்யாண மாலை", en: "Kalyaana Maalai", movie: "Pudhu Pudhu Arthangal" },
      { id: "wkB69vKHUi8", ta: "யாரோ யாரோடி", en: "Yaaro Yaarodi", movie: "Alaipayuthey" },
      { id: "T0F_LpEjKbY", ta: "மருதாணி", en: "Marudaani", movie: "Sakkarakatti" },
      { id: "WfwCtR1iLFw", ta: "கண்ணாளனே", en: "Kannalane", movie: "Bombay" },
      { id: "rp3_FhRnIRw", ta: "முன்பே வா", en: "Munbe Vaa", movie: "Sillunu Oru Kaadhal" },
      { id: "630HSN45fKk", ta: "நெஞ்சுக்குள் பெய்திடும்", en: "Nenjukkul Peidhidum", movie: "Vaaranam Aayiram" },
      { id: "SdcAN3dobz4", ta: "உனக்கென்ன வேணும் சொல்லு", en: "Unakkenna Venum Sollu", movie: "Yennai Arindhaal" },
      { id: "U3lyojCm6jA", ta: "மறுவார்த்தை", en: "Maruvaarthai", movie: "Enai Noki Paayum Thota" },
    ],
  },

  /**
   * HOW TO REACH — route planner. Distances are approximate (worked out from
   * the temple's location); Google Maps gives exact live routes.
   * lastMile: from Sirkazhi to Thandavankulam — please check with locals.
   */
  travel: {
    temple: { lat: 11.32196, lng: 79.81508 },
    sirkazhi: { lat: 11.2386, lng: 79.7366 },
    // main-line stations with trains that stop at Sirkazhi (SY)
    towns: [
      { id: "chennai", en: "Chennai", ta: "சென்னை", lat: 13.0827, lng: 80.2707, via: ["puducherry", "cuddalore", "chidambaram"], train: true,
        busEn: "Buses to Sirkazhi / Chidambaram leave from Kilambakkam bus terminus (KCBT).",
        busTa: "கிளாம்பாக்கம் பேருந்து நிலையத்திலிருந்து (KCBT) சீர்காழி / சிதம்பரம் பேருந்துகள் உள்ளன." },
      { id: "puducherry", en: "Puducherry", ta: "புதுச்சேரி", lat: 11.9416, lng: 79.8083, via: ["cuddalore", "chidambaram"] },
      { id: "cuddalore", en: "Cuddalore", ta: "கடலூர்", lat: 11.748, lng: 79.7714, via: ["chidambaram"], train: true },
      { id: "villupuram", en: "Villupuram", ta: "விழுப்புரம்", lat: 11.9401, lng: 79.4861, via: ["chidambaram"], train: true },
      { id: "neyveli", en: "Neyveli", ta: "நெய்வேலி", lat: 11.546, lng: 79.485, via: ["chidambaram"] },
      { id: "chidambaram", en: "Chidambaram", ta: "சிதம்பரம்", lat: 11.3993, lng: 79.6936, via: [], train: true },
      { id: "mayiladuthurai", en: "Mayiladuthurai", ta: "மயிலாடுதுறை", lat: 11.1035, lng: 79.655, via: [], train: true },
      { id: "kumbakonam", en: "Kumbakonam", ta: "கும்பகோணம்", lat: 10.9617, lng: 79.3881, via: ["mayiladuthurai"], train: true },
      { id: "thanjavur", en: "Thanjavur", ta: "தஞ்சாவூர்", lat: 10.787, lng: 79.1378, via: ["kumbakonam", "mayiladuthurai"], train: true },
      { id: "tiruvarur", en: "Tiruvarur", ta: "திருவாரூர்", lat: 10.7661, lng: 79.6344, via: ["mayiladuthurai"] },
      { id: "trichy", en: "Tiruchirappalli (Trichy)", ta: "திருச்சி", lat: 10.7905, lng: 78.7047, via: ["thanjavur", "kumbakonam", "mayiladuthurai"], train: true },
      { id: "madurai", en: "Madurai", ta: "மதுரை", lat: 9.9252, lng: 78.1198, via: ["trichy", "thanjavur", "kumbakonam", "mayiladuthurai"] },
      { id: "karaikal", en: "Karaikal", ta: "காரைக்கால்", lat: 10.9254, lng: 79.838, via: [] },
      { id: "nagapattinam", en: "Nagapattinam", ta: "நாகப்பட்டினம்", lat: 10.7672, lng: 79.8449, via: ["karaikal"] },
      { id: "kanchipuram", en: "Kanchipuram", ta: "காஞ்சிபுரம்", lat: 12.8342, lng: 79.7036, hub: "villupuram" },
      { id: "vellore", en: "Vellore", ta: "வேலூர்", lat: 12.9165, lng: 79.1325, hub: "villupuram" },
      { id: "tiruvannamalai", en: "Tiruvannamalai", ta: "திருவண்ணாமலை", lat: 12.2253, lng: 79.0747, hub: "villupuram" },
      { id: "salem", en: "Salem", ta: "சேலம்", lat: 11.6643, lng: 78.146, hub: "trichy" },
      { id: "coimbatore", en: "Coimbatore", ta: "கோயம்புத்தூர்", lat: 11.0168, lng: 76.9558, hub: "trichy" },
      { id: "bengaluru", en: "Bengaluru", ta: "பெங்களூரு", lat: 12.9716, lng: 77.5946, hub: "chidambaram" },
    ],
    lastMileEn:
      "From Sirkazhi bus stand take an auto, taxi or a town bus on the Puthur – Pazhayar road to Thandavankulam (about 15–18 km).",
    lastMileTa:
      "சீர்காழி பேருந்து நிலையத்திலிருந்து ஆட்டோ, டாக்ஸி அல்லது புத்தூர் – பழையார் சாலை வழியாகச் செல்லும் நகரப் பேருந்தில் தாண்டவன்குளம் வரலாம் (சுமார் 15–18 கி.மீ).",
  },

  // Photos: every image in public/images appears in "Our Moments" (when 2+).
  galleryExclude: ["og-image.jpg", "couple.webp", "couple-sm.webp", "groom.webp", "bride.webp"],
  gallery: [{ file: "couple.jpg", alt: "Sethuraman & Ragasudha", credit: "Leaf9Studios" }],

  /* ======================================================================
     WORDS — one block per language
     ====================================================================== */
  content: {
    /* ------------------------------ தமிழ் ------------------------------ */
    ta: {
      langName: "தமிழ்",
      groom: { name: "Er. A. சேதுராமன்", degree: "B.E.", short: "சேதுராமன்" },
      bride: { name: "Dr. A. ராகசுதா", degree: "BNYS., MD", short: "ராகசுதா" },
      weds: "♥",
      house: "அரிமா இல்ல",
      heading: "விவாக சுபமுகூர்த்த அழைப்பிதழ்",

      cover: { eyebrow: "சுபமுகூர்த்த அழைப்பிதழ்", hint: "திறக்க முத்திரையைத் தொடவும்", date: "13 · 11 · 2026" },

      hero: {
        ribbon: ["வெள்ளி", "13 · 11 · 2026", "அதிகாலை 4:30"],
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
        when: "13 நவம்பர் 2026, வெள்ளிக்கிழமை\nஅதிகாலை 4:30 – 6:00 மணி சுபமுகூர்த்தத்தில்",
      },

      countdown: {
        eyebrow: "நல்ல நேரம்",
        title: "சுபமுகூர்த்தத்திற்கு இன்னும்",
        units: ["நாட்கள்", "மணி", "நிமிடம்", "விநாடி"],
        sub: "வெள்ளிக்கிழமை · 13 நவம்பர் 2026 · அதிகாலை 4:30",
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
          ["சேதுராமன் ❤ ராகசுதா", "இரு மனம் இணையும் இனிய திருமணம்"],
        ],
      },

      eventsTitle: "நிகழ்ச்சி நிரல்",
      eventsEyebrow: "Wedding Events",
      events: {
        reception: {
          title: "வரவேற்பு",
          date: "வியாழக்கிழமை, 12 நவம்பர் 2026",
          time: "மாலை 6:00 – இரவு 8:00",
          venue: "ASK சங்கமித்திரை திருமண மண்டபம்",
          address: "புத்தூர் - பழையார் சாலை, தாண்டவன்குளம், சீர்காழி, தமிழ்நாடு 609101",
        },
        wedding: {
          title: "திருமணம்",
          date: "வெள்ளிக்கிழமை, 13 நவம்பர் 2026",
          time: "அதிகாலை 4:30 – 6:00",
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

      kural: {
        eyebrow: "திருக்குறள் · 45",
        lines: ["அன்பும் அறனும் உடைத்தாயின் இல்வாழ்க்கை", "பண்பும் பயனும் அது"],
        note: "அன்பும் அறமும் நிறைந்த இல்வாழ்க்கையே பண்பும் பயனும் ஆகும்.",
      },

      songs: {
        eyebrow: "Wedding Songs",
        title: "கல்யாணப் பாடல்கள்",
        sub: "ஒரு பாடலைத் தொட்டு இயக்கவும் · பாடல்கள் தொடர்ந்து ஒலிக்கும்",
        hint: "பாடல் தானாகத் தொடங்காவிட்டால், வீடியோவில் ▶ ஐத் தொடவும்.",
        local: "எங்கள் பாடல்கள்",
      },

      travel: {
        eyebrow: "How to reach",
        title: "எப்படி வருவது?",
        sub: "உங்கள் ஊரைத் தேடுங்கள் — பேருந்து, ரயில், வழித்தடம் காண்பிக்கப்படும்",
        toTemple: "கோவில் (திருமணம்)",
        toHall: "மண்டபம் (வரவேற்பு · விருந்து)",
        placeholder: "உங்கள் ஊர் (எ.கா. சென்னை, திருச்சி)",
        search: "வழி காட்டு",
        myLocation: "என் இருப்பிடத்திலிருந்து",
        bus: "பேருந்தில்",
        train: "ரயிலில்",
        last: "கடைசி பயணம்",
        approx: "சுமார்",
        km: "கி.மீ",
        busTpl: "{from} இலிருந்து சீர்காழிக்குப் பேருந்தில் வரவும்{via}.",
        viaTpl: " ({list} வழியாக)",
        hubTpl: "{from} இலிருந்து {hub} வரை பேருந்து/ரயிலில் வந்து, அங்கிருந்து சீர்காழிப் பேருந்தில் வரவும்.",
        trainTxt: "சென்னை எழும்பூர் – மயிலாடுதுறை மெயின் லைன் ரயில்கள் சீர்காழி (SY) நிலையத்தில் நிற்கும். நேரங்களை IRCTC / NTES-இல் சரிபார்க்கவும்.",
        unknown: "இந்த ஊருக்கான நேரடி விவரம் எங்களிடம் இல்லை — கீழே உள்ள Google Maps பொத்தானில் நேரடி வழியைக் காணலாம்.",
        gmTransit: "பேருந்து / ரயில் வழி (Google Maps)",
        gmDrive: "காரில் வழி",
        between: "கோவில் → மண்டபம் வழி",
        temple: "கோவில்",
        hall: "மண்டபம்",
        sirkazhi: "சீர்காழி",
        thandavankulam: "தாண்டவன்குளம்",
        you: "நீங்கள்",
      },

      closing: {
        line1: "தங்கள் வருகையை அன்புடன் எதிர்பார்க்கிறோம்",
        line2: "",
        fine: "13 · 11 · 2026 · தாண்டவன்குளம், சீர்காழி",
        shareText: "சேதுராமன் ❤ ராகசுதா திருமண அழைப்பிதழ் 💐\nவெள்ளிக்கிழமை, 13 நவம்பர் 2026 · தாண்டவன்குளம்",
      },
      side: ["வெள்ளிக்கிழமை", "13 · 11 · 2026", "அதிகாலை 4:30 · தாண்டவன்குளம்"],
    },

    /* ------------------------------ English ------------------------------ */
    en: {
      langName: "English",
      groom: { name: "Er. A. Sethuraman", degree: "B.E.", short: "Sethuraman" },
      bride: { name: "Dr. A. Ragasudha", degree: "BNYS, MD", short: "Ragasudha" },
      weds: "weds",
      house: "Arima Illam",
      heading: "Wedding Invitation",

      cover: { eyebrow: "Wedding Invitation", hint: "Tap the seal to open", date: "13 · 11 · 2026" },

      hero: {
        ribbon: ["Friday", "13 · 11 · 2026", "4:30 AM"],
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
        when: "Friday, the thirteenth of November, two thousand twenty-six\nat the auspicious hour of 4:30 – 6:00 AM",
      },

      countdown: {
        eyebrow: "The Auspicious Hour",
        title: "Counting down to the muhurtham",
        units: ["Days", "Hours", "Minutes", "Seconds"],
        sub: "Friday · 13 November 2026 · 4:30 AM IST",
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
          ["Sethuraman ❤ Ragasudha", "Two hearts, one forever"],
        ],
      },

      eventsTitle: "Wedding Events",
      eventsEyebrow: "நிகழ்ச்சி நிரல்",
      events: {
        reception: {
          title: "Reception",
          date: "Thursday, 12 November 2026",
          time: "6:00 PM – 8:00 PM",
          venue: "ASK Sangamithirai Marriage Hall",
          address: "Puthur - Pazhayar Rd, Thandavankulam, Sirkali, Tamil Nadu 609101",
        },
        wedding: {
          title: "The Wedding",
          date: "Friday, 13 November 2026",
          time: "4:30 AM – 6:00 AM",
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

      kural: {
        eyebrow: "Thirukkural · 45",
        lines: ["அன்பும் அறனும் உடைத்தாயின் இல்வாழ்க்கை", "பண்பும் பயனும் அது"],
        note: "If love and virtue in the household reign, this is of life the perfect grace and gain.",
      },

      songs: {
        eyebrow: "கல்யாணப் பாடல்கள்",
        title: "Wedding Songs",
        sub: "Tap any song to play · the playlist keeps going",
        hint: "If the music doesn't start on its own, tap ▶ on the video.",
        local: "Our songs",
      },

      travel: {
        eyebrow: "எப்படி வருவது?",
        title: "How to Reach",
        sub: "Search your town to see the bus, train and route",
        toTemple: "Temple (wedding)",
        toHall: "Hall (reception · feast)",
        placeholder: "Your town (e.g. Chennai, Trichy)",
        search: "Show route",
        myLocation: "From my location",
        bus: "By bus",
        train: "By train",
        last: "Last stretch",
        approx: "about",
        km: "km",
        busTpl: "Take a bus from {from} to Sirkazhi{via}.",
        viaTpl: " (via {list})",
        hubTpl: "Travel from {from} to {hub}, then take a bus to Sirkazhi.",
        trainTxt: "Trains on the Chennai Egmore – Mayiladuthurai main line stop at Sirkazhi (SY). Check timings on IRCTC / NTES.",
        unknown: "We don't have details for this place yet — the Google Maps buttons below show live routes from it.",
        gmTransit: "Bus / train route (Google Maps)",
        gmDrive: "Route by car",
        between: "Temple → Hall route",
        temple: "Temple",
        hall: "Hall",
        sirkazhi: "Sirkazhi",
        thandavankulam: "Thandavankulam",
        you: "You",
      },

      closing: {
        line1: "We eagerly await your gracious presence",
        line2: "",
        fine: "13 · 11 · 2026 · Thandavankulam, Sirkazhi",
        shareText: "Sethuraman weds Ragasudha 💐\nEr. A. Sethuraman & Dr. A. Ragasudha\nFriday, 13 November 2026 · Thandavankulam",
      },
      side: ["Friday", "13 · 11 · 2026", "4:30 AM · Thandavankulam"],
    },
  },
};
