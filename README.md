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

## All on-screen text is editable

Every heading, label and button lives in the `text` block of
`src/config/wedding.js`. Set any value to `""` to hide it. For example,
`venues.pending` (the old "Venue to be announced") is empty, so an unset
reception venue simply isn't shown. Nicknames used in the cartoon banner are
`groom.nickname` / `bride.nickname`.

## Photos: every image in the images folder is shown

Every photo in **`public/images/`** appears in the "Our Moments" slideshow
automatically (in name order). The site's own graphics are skipped (preview
image, cut-outs and portraits). Add `alt` text or a photographer credit via
`gallery` in `src/config/wedding.js`, or hide a photo with
`galleryExclude: ["file.jpg"]`.

## Phone view everywhere

The invitation is designed for phones. On a laptop or desktop browser, the same
phone layout is shown in a centred, framed column on a royal velvet backdrop,
with the couple's names and wedding details on the sides.

## Our Moments, The Royal Wedding & Venues

- **Our Moments**: an animated photo slideshow (auto-plays, swipe or tap the
  thumbnails). Photos are listed in `gallery` in `src/config/wedding.js`.
  Photo credit: Leaf9Studios.
- **Sethu weds Sudha**: an animated cartoon story (about 20 seconds, loops while
  on screen). Sethu and Sudha walk in, blink and smile at each other, raise and
  swap garlands, then Sethu ties the golden thali while the band plays faster.
  A rice-and-petal (akshathai) shower falls as the royal elephants raise their
  trunks, and they hold hands under fireworks and a swinging "Sethu weds Sudha"
  banner. Cartoon nadaswaram and thavil players perform throughout. The title,
  eyebrow and captions are in `text.scene`.
- **More animation**: kolam dividers draw themselves, countdown digits flip,
  sky lanterns and fireworks rise in the closing, and tapping anywhere
  releases a small burst of flower petals.
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

## C. Music: every file in the music folder plays

**Put any music files in `public/music/`** (MP3, M4A, OGG, WAV, …).
**All of them play automatically**, one after another, in name order. You
don't need to edit any code: rebuild or redeploy and they're in. Titles are made
from the file names (`nadaswaram-kalyanam.mp3` → "Nadaswaram Kalyanam").

Optional: to give a file a nicer title, subtitle or a licence credit, or to set
the playing order, list it in `music.tracks` in `src/config/wedding.js`
(matched by file name). Credits appear in the footer only for files that are
present.

Recommended free-to-use mangala vadhyam recordings (save into `public/music/`):
- Nadaswaram & thavil, live at a Chennai wedding (CC BY 4.0, credit already
  configured): https://cdn.freesound.org/previews/320/320245_43-hq.mp3 → save as `mangala-vadhyam-chennai.mp3`
- https://pixabay.com/music/india-south-india-nadaswaram-thavil-kappi-raga-358257/
- https://pixabay.com/music/india-raga-valachi-nadaswaram-6-8-382924/
- https://pixabay.com/music/wedding-traditional-wedding-ceremonial-vibe-with-shehna-376293/

Music starts when the guest taps **Open Invitation** (`music.playOnOpen`).
After your files, the four bundled instrumentals in `src/assets/music/` play
too (every file dropped there is included as well). If nothing can play, a live
veena piece is generated in the browser.

Only use music you have the right to share publicly.

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
