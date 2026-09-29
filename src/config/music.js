/**
 * Built-in wedding music. These files live in src/assets/music/ and are
 * BUNDLED into the build (imported below), so they always ship with the
 * site — no separate upload of a public/ folder needed.
 *
 * To add your own song:
 *   1. copy the MP3 into src/assets/music/
 *   2. add an import + an entry below (title is shown in the player)
 */
import mangalaIsai from "../assets/music/mangala-isai.mp3";
import vidiyalVeena from "../assets/music/vidiyal-veena.mp3";
import bansuriProcession from "../assets/music/bansuri-procession.mp3";
import santoorEvening from "../assets/music/santoor-evening.mp3";

export const BUNDLED_TRACKS = [
  { title: "Mangala Isai", subtitle: "Nadaswaram & thavil · Raga Mohanam", src: mangalaIsai },
  { title: "Vidiyal Veena", subtitle: "Dawn veena & mridangam · Raga Hamsadhwani", src: vidiyalVeena },
  { title: "Bansuri Procession", subtitle: "Flute & tabla · Raga Hindolam", src: bansuriProcession },
  { title: "Santoor Evening", subtitle: "Santoor & tabla · Raga Kalyani", src: santoorEvening },
].map((t) => ({ ...t, bundled: true }));
