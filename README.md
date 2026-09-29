# Wedding Invitation — Sethuraman & Ragasudha

A premium, mobile-first digital wedding invitation built with **React + Vite**.
Designed to be shared on WhatsApp and opened on phones.

**Er. A. Sethuraman, B.E. & Dr. A. Ragasudha, BNYS, MD**
Reception · Thu 12 Nov 2026 · 6:00 – 8:00 PM
Wedding · Fri 13 Nov 2026 · 4:00 – 6:00 AM · Kandamakudiyan Kanjivanam Karuppusamy Temple, Thandavankulam
Post-wedding rituals, celebrations & food · from 6:00 AM · Sangomithrai Hall, Thandavankulam

---

## A. How to run

Requires Node.js 20 or newer.

```bash
npm install
npm run dev          # local development at http://localhost:5173
npm run build        # production build into /dist
npm run preview      # preview the production build
```

## B. How to add the couple photo

Put the image here:

```text
public/images/couple.jpg
```

- Portrait orientation works best (about 4:5, e.g. 1200 × 1500 px).
- Compress it to roughly 200–400 KB for fast loading on mobile data
  (https://squoosh.app works well — WebP/JPEG, quality ~75).
- Until the file exists, an ornamental "S & R" monogram is shown instead —
  never a broken image.

## C. How to add music

Put the file here:

```text
public/music/wedding.mp3
```

Music never autoplays. Guests tap the floating button (bottom-right) to turn
it on or off. If the file is missing, the button quietly disappears and the
site keeps working. To remove music entirely, set `music.enabled: false`.

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

## E. How to add Google Maps links

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

- **Opening:** full-screen invitation cover with a staggered entrance and an
  **Open Invitation** button. The page is held on the cover until the button
  is pressed.
- **Couple:** first names in script, arched photo frame with graceful fallback.
- **Invitation card:** the poem from the printed invitation, then the formal
  invitation line, names and date.
- **Live countdown** to **13 Nov 2026, 4:00 AM India time**. It is timezone-safe:
  guests abroad see the same countdown. From 4:00 AM it shows
  *"The Wedding Has Begun ❤️"*, and from 6:00 AM *"The celebrations continue..."*.
- **Timeline:** Reception (warm evening), then **The Wedding** (deep pre-dawn,
  temple arch, strongest emphasis), then post-wedding (soft sunrise).
- **Venues** with conditional Google Maps buttons.
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
