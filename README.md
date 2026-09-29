# Wedding Invitation — Sethuraman & Ragasudha

A premium, mobile-first digital wedding invitation built with **React + Vite**.
Designed to be shared on WhatsApp and opened on phones.

**Er. A. Sethuraman, B.E. & Dr. A. Ragasudha, BNYS, MD**
Reception · Thu 12 Nov 2026 · 6:00 – 8:00 PM
Wedding · Fri 13 Nov 2026 · 4:00 – 6:00 AM · Kandamakudiyan Kanjivanam Karuppusamy Temple (8RC8+Q2P, Madathukuppam, Tamil Nadu 609101)
Post-wedding rituals, celebrations & food · from 6:00 AM · ASK Sangamithirai Marriage Hall, Puthur - Pazhayar Rd, Thandavankulam, Sirkali, Tamil Nadu 609101

---

## A. How to run

Requires Node.js 20 or newer.

```bash
npm install
npm run dev          # local development at http://localhost:5173
npm run build        # production build into /dist
npm run preview      # preview the production build
```

## B. Photos

```text
public/images/couple-cutout.webp  ← couple with the background removed (royal stage)
public/images/couple.jpg          ← original photo (used only if the cutout is missing)
public/images/groom.webp          ← round portrait, background removed
public/images/bride.webp          ← round portrait, background removed
public/images/og-image.jpg        ← WhatsApp / social preview (1200 × 630)
```

The pink studio backdrop was removed with an AI cut-out, so the couple stands
on an animated royal stage whose colours follow the chosen theme. To use a
new photo, replace the files with the same names. Use a transparent WebP or
PNG for the cutouts (remove.bg or `rembg` can make one).

## Phone view everywhere

The invitation is designed for phones. On a laptop or desktop browser, the same
phone layout is shown in a centred, framed column on a royal velvet backdrop,
with the couple's names and wedding details on the sides.

## Our Moments, The Royal Wedding & Venues

- **Our Moments**: an animated photo slideshow (auto-plays, swipe or tap the
  thumbnails). Photos are listed in `gallery` in `src/config/wedding.js`.
  Photo credit: Leaf9Studios.
- **The Royal Wedding**: an animated cartoon scene. A cartoon groom and bride
  walk into a royal mandapam, exchange garlands, hearts float up, and decorated
  temple elephants raise their trunks under royal umbrellas while flowers
  shower down (14-second loop).
- **Venues**: illustrated cards (temple at pre-dawn, hall at sunrise, evening
  reception) with date, time, address, a map that loads when scrolled to, and
  directions.

## Royal themes

Four palettes: **Maharaja Maroon** (default), **Royal Emerald**,
**Midnight Sapphire** and **Rani Pink**. Set the default in
`src/config/wedding.js`:

```js
theme: { default: "maharaja", guestCanChange: true },
```

With `guestCanChange: true`, guests get a palette button (bottom-left) to try
other themes. Their choice is remembered on their own phone only. Set it to
`false` to lock everyone to your default. The colours are defined in
`src/index.css` under `[data-theme=…]`.

## C. Music

Four **original instrumentals** (composed and synthesised for this
invitation, so there are no copyright problems) are **bundled into the build**
from `src/assets/music/`. They always ship with the site; no separate folder
needs uploading.

| Track | Instruments | Raga |
|---|---|---|
| Mangala Isai | nadaswaram-style reed, thavil, tanpura | Mohanam |
| Vidiyal Veena | veena-style plucks, mridangam, tanpura | Hamsadhwani |
| Bansuri Procession | bansuri-style flute, tabla, tanpura | Hindolam |
| Santoor Evening | santoor-style strings, tabla, tanpura | Kalyani |

- Music **starts when the guest taps "Open Invitation"**. Turn this off with
  `music.playOnOpen: false`. It never plays on page load.
- The player (bottom-right) has play / pause, previous / next, and a track list
  (tap the track name). Phones also show lock-screen controls.
- If no audio file can play (blocked network, very old phone), a **live veena
  piece is generated in the browser**, so the music button always works.

**Add your own songs** (these play first):
- Easiest: copy the MP3 into `public/music/` and list it in `src/config/wedding.js`:
  `{ title: "Our song", subtitle: "Nadaswaram", src: "/music/our-song.mp3" }`
- Or bundle it: copy it into `src/assets/music/` and add it in `src/config/music.js`.

Only use music you have the right to share.

### "Music not found" / blank page?
Browsers **do not run this site from a file on your disk**. Double-clicking
`index.html` or `dist/index.html` will not work (a notice is shown).
Always open it through a web address:
- `npm run dev` → open http://localhost:5173
- or `npm run build` then `npm run preview` → open http://localhost:4173
- or deploy it (Vercel / Netlify) and open that link.

## D. Where to change wedding information

**Everything** — names, dates, times, venues, wording, links — lives in one file:

```text
src/config/wedding.js
```

Components only read from this file; nothing is duplicated in the code.
Blank fields (`""`) are hidden gracefully.

### Adding the reception venue

```js
reception: {
  ...
  venue: "Hall name",
  address: "",          // optional street / area
  location: "Town",
  googleMapsUrl: "https://maps.app.goo.gl/...",
}
```

Until `venue` is filled, the site shows **"Venue to be announced"** and a
disabled **"Map coming soon"** button on the reception card.

### RSVP (hidden by default)

```js
rsvp: {
  enabled: true,
  phone: "+91XXXXXXXXXX",     // Call button
  whatsapp: "91XXXXXXXXXX",   // WhatsApp button (country code, digits only)
}
```

## E. Google Maps & the "How to reach us" planner

The temple and hall already have Google Maps links, built from their
addresses (the temple uses its plus code `8RC8+Q2P`). Each venue card has:
**Open in Google Maps**, **Get directions** (from the guest's location) and
a **Tap to show map** preview, which loads only when tapped so the page stays
fast. There is also a **Temple → Hall** route button.

**How to reach us** section: a guest picks Temple / Hall, then types their
city (or taps Chennai, Puducherry, Trichy, Bengaluru…). An animated bus
travels the route *city → towns on the way → Sirkazhi → Thandavankulam →
venue*. Below the animation are bus and train steps, the last stretch, and
live Google Maps directions (bus/train or car). Any town not in the list
still gets live directions.

All the journey text is in `travel` inside `src/config/wedding.js`. Edit
distances, add towns, or add local bus details there.

### Adding a Maps link for the reception

1. Open the venue in Google Maps → **Share** → **Copy link**.
2. Paste it into the matching `googleMapsUrl` field in `src/config/wedding.js`
   (`reception`, `marriage` or `postWedding`).

The **Open in Google Maps** button appears automatically for any venue with a
URL, both on its event card and in the Venues section. Empty URL → no button.

## F. How to deploy (Vercel)

1. Push this folder to a GitHub repository.
2. Go to https://vercel.com → **Add New… → Project** → import the repository.
3. Vercel detects Vite automatically (build: `npm run build`, output: `dist`).
   Click **Deploy**.
4. Copy your live address (e.g. `https://sethu-ragasudha.vercel.app`) into
   `site.url` in `src/config/wedding.js`, commit and push. Vercel redeploys.

> **Step 4 matters for WhatsApp.** WhatsApp needs a full address for the
> preview image. After setting `site.url`, the link preview shows the
> invitation card image with the title and description.

**Netlify:** drag the `dist` folder onto https://app.netlify.com/drop, or
connect the repo (build `npm run build`, publish `dist`).
**GitHub Pages:** run `npm run build` and publish the `dist` folder. The build
uses relative paths, so it also works from a sub-folder.

---

## Features

- **Opening:** royal velvet cover with a scalloped palace-arch frame, swinging
  lanterns, gold dust and gold-foil names. **Open Invitation** splits it into
  two palace doors, with brass ring handles, that swing open onto the couple.
- **Royal stage:** the cut-out couple inside a lobed palace arch, with a
  marigold garland, turning light rays, a mandala, a pulsing spotlight,
  drifting petals and a shine sweep. Their portraits sit in turning gold rings.
- **Couple:** first names in script, arched photo frame with graceful fallback.
- **Invitation card:** the poem from the printed invitation, then the formal
  invitation line, names and date.
- **Live countdown** to **13 Nov 2026, 4:00 AM India time**. It is timezone-safe:
  guests abroad see the same countdown. From 4:00 AM it shows
  *"The Wedding Has Begun ❤️"*, and from 6:00 AM *"The celebrations continue..."*.
- **Timeline:** Reception (warm evening), then **The Wedding** (deep pre-dawn,
  temple arch, strongest emphasis), then post-wedding (soft sunrise).
- **Venues** with addresses, Google Maps links, directions and a tap-to-load map.
- **How to reach us:** an animated route planner from 15 cities and towns, plus live
  directions from anywhere.
- **Add to Calendar:** `.ics` files generated in the browser (per event or all
  three), plus Google Calendar links, which are handy inside WhatsApp's in-app
  browser.
- **Share:** native share sheet on phones, a WhatsApp button, and Copy Link
  everywhere.
- **Optional music** and **optional RSVP**.
- **Link previews:** title, description, Open Graph and Twitter tags are
  generated from the config at build time (`vite.config.js`). The preview
  image is `public/images/og-image.jpg` (1200 × 630).
- **Accessibility:** semantic headings, keyboard-operable, focus moves into the
  invitation on open, `prefers-reduced-motion` respected.
- **Performance:** fonts are self-hosted (Latin subset only, no Google Fonts
  request), all ornaments are inline SVG, animations are CSS-only, and the only
  runtime dependencies are React and Lucide icons.

## Project structure

```text
wedding-invitation/
├── public/
│   ├── favicon.svg
│   ├── images/
│   │   ├── og-image.jpg        ← link-preview image
│   │   └── couple.jpg          ← add your photo here
│   └── music/
│       └── wedding.mp3         ← add music here (optional)
├── src/
│   ├── components/
│   │   ├── Hero.jsx            Opening cover
│   │   ├── Couple.jsx          Names + photo
│   │   ├── Invitation.jsx      Poem & invitation card
│   │   ├── Countdown.jsx       Live IST countdown
│   │   ├── EventsTimeline.jsx  Evening → pre-dawn → sunrise journey
│   │   ├── EventCard.jsx       One event
│   │   ├── Venue.jsx           Venues + Maps button logic
│   │   ├── CalendarButton.jsx  .ics + Google Calendar
│   │   ├── ShareButton.jsx     Web Share / WhatsApp / Copy link
│   │   ├── MusicPlayer.jsx     Floating music toggle
│   │   ├── RSVP.jsx            Optional RSVP
│   │   ├── Footer.jsx          Closing
│   │   └── Ornaments.jsx       Kolam, temple, lotus SVG motifs
│   ├── config/wedding.js       ★ all wedding information
│   ├── utils/                  time (IST), calendar (.ics), asset paths
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```
