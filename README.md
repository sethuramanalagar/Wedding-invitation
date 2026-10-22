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
public/images/couple.jpg       ← main photo (full, uncropped original, AI-upscaled 2×)
public/images/couple.webp      ← same photo, smaller file for phones
public/images/couple-sm.webp   ← half size for small screens
public/images/groom.webp       ← round portrait used in the wedding animation
public/images/bride.webp       ← round portrait used in the wedding animation
public/images/og-image.jpg     ← WhatsApp / social preview (1200 × 630)
```

The photo is no longer cut out of its background (the cut-out was what spoiled
the ears and cropped the hands). The full original is shown inside a gold
palace arch, sharpened and gently tinted at the edges so the pink backdrop
blends with the ivory-and-gold theme. To use a new photo, replace the files
with the same names (keep a 2:3 portrait shape for `couple.jpg`).

**Our Moments** slideshow appears automatically once there are **two or more**
photos in `public/images/` (besides the files listed above). Add `alt` text or a
credit via `gallery` in `src/config/wedding.js`.

## Design

- **Royal Ivory & Gold** theme taken from the printed card: ivory paper, gold
  foil, maroon velvet, peacock accents, Tamil text in Noto Serif Tamil.
- **Opening:** a velvet envelope with a golden wax seal (S S monogram). Tapping
  the seal cracks it, the flap swings open, the "Sethu weds Sudha" card rises
  out with a burst of petals and a golden flash, then the invitation appears.
- **Hero:** marigold toran, swinging temple bells, gold-foil names, the couple in
  a double gold palace arch with a turning halo and lamps.
- **Invitation:** the Tamil wording of the printed card, then an English version.
- **The Royal Wedding animation** (≈22 s, loops while on screen; tap the dots to
  jump): a mandapam at pre-dawn (stars, moon, nadaswaram notes, sacred fire) →
  மாலை மாற்றல் (garlands fly across and swap) → மாங்கல்ய தாரணம் (the golden thali
  descends with a glow) → அட்சதை (rice and petal shower as the sun rises) →
  "Sethu ❤ Sudha" with a heartbeat and fireworks.
- **Events:** illustrated cards (evening lamps, temple at pre-dawn, sunrise feast)
  with Tamil labels, map, directions, save-the-date and a tap-to-load map.
- **Family:** the "அன்புடன் அழைக்கும்" block from the printed card.
  The phone number is stored but hidden; set `hosts.showPhone: true` to show a
  Call button.

## Tamil & English versions

The whole invitation exists in **two complete versions**: Tamil and English.
Guests switch with the **தமிழ் | English** button (on the envelope, then at the
top-right of the page). Their choice is remembered on their phone.

Share a link that opens straight in one language:

```text
https://your-site.vercel.app/?lang=ta     ← Tamil version
https://your-site.vercel.app/?lang=en     ← English version
```

Without `?lang=`, the site opens in `defaultLang` (Tamil) from
`src/config/wedding.js`. All wording for each language is in `content.ta`
and `content.en` in that file. The Share / WhatsApp buttons send the link in
the language the guest is viewing.

## C. Music: Tamil songs

> **Why no song played:** the music folder was empty. The site plays only the
> song files you add. It does not include any songs itself.

**Put your Tamil song files in `public/music/`** (MP3 or M4A). Files in
`src/assets/music/` are picked up too. Tamil names and spaces in file names are fine. They all play
automatically, one after another, starting when the guest taps the seal.
Nothing to code: rebuild or redeploy and they're in.

To show the song name in Tamil, skip a long intro, or set the order, list the
file in `music.tracks` in `src/config/wedding.js`:

```js
tracks: [
  { file: "01-song.mp3", title: "பாடலின் பெயர்", subtitle: "Movie name", startAt: 8 },
],
```

The floating gold disc (bottom-right) shows the song title, with
play/pause and next/previous. Music pauses when the guest leaves the tab and
resumes when they come back. If the folder is empty, the player is hidden.

Film songs are copyrighted, and a public website counts as sharing them. Only
add songs you have the right to use.

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

In `events` (first entry, `id: "reception"`):

```js
venue: "Hall name",
address: "Street, town",
mapsQuery: "Hall name, town, Tamil Nadu",   // used for map, directions, embedded map
googleMapsUrl: "https://maps.app.goo.gl/...", // optional exact link
```

Until `venue` is filled, the card shows **"Venue to be announced"**.

## E. Google Maps

The temple and hall have map buttons built from `mapsQuery` (the temple uses
its plus code `8RC8+Q2P`). Each card has **Open Map**, **Directions** (from
the guest's location), **Save date** (Google Calendar) and a **Tap to show
map** preview, which loads only when tapped so the page stays fast. To pin an
exact spot, paste a Google Maps share link into `googleMapsUrl`.

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

## Project structure

```text
wedding-invitation/
├── public/
│   ├── favicon.svg
│   ├── images/                 couple photo, portraits, og-image
│   └── music/                  ← put your Tamil songs here
├── src/
│   ├── components/
│   │   ├── Opening.jsx         Velvet envelope + wax seal cover
│   │   ├── Hero.jsx            Toran, names, palace-arch photo, date
│   │   ├── Invitation.jsx      Tamil card wording + English invitation
│   │   ├── Countdown.jsx       Live IST countdown with flip digits
│   │   ├── Ceremony.jsx        The animated mandapam wedding story
│   │   ├── Events.jsx          Event cards, maps, calendar
│   │   ├── Gallery.jsx         "Our Moments" slideshow (2+ photos)
│   │   ├── Closing.jsx         Family block, closing, share buttons
│   │   ├── MusicPlayer.jsx     Tamil song playlist player
│   │   └── Ornaments.jsx       Toran, arch, bells, diya, peacock feather SVGs
│   ├── config/wedding.js       ★ all wedding information
│   ├── utils/helpers.js        maps, calendar (.ics), playlist, gallery, time
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css               the whole theme
├── index.html
├── vite.config.js
└── package.json
```
