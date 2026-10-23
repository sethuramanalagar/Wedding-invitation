import { useEffect, useState, useSyncExternalStore } from "react";
import { Play, Pause, SkipForward, SkipBack, Music2 } from "lucide-react";
import { wedding } from "../config/wedding.js";
import { playlist } from "../utils/helpers.js";
import { useLang } from "../i18n.jsx";

/* ===================================================================
   Music controller (lives outside React so start() can run inside the
   "open" tap — browsers only allow sound after a tap).

   Two engines:
     local   → your own MP3s from public/music (most reliable)
     youtube → official YouTube uploads of Tamil wedding songs, played in
               YouTube's own player inside the "Wedding Songs" section
   =================================================================== */
const localTracks = playlist();
const ytTracks = wedding.music.youtube || [];
export const MODE = localTracks.length ? "local" : ytTracks.length ? "youtube" : "none";
export const tracks =
  MODE === "local"
    ? localTracks.map((t) => ({ ...t, ta: t.title, en: t.title, movie: t.subtitle }))
    : ytTracks;

let state = { index: 0, playing: false, ready: MODE === "local", blocked: false };
const subs = new Set();
const set = (patch) => {
  state = { ...state, ...patch };
  subs.forEach((f) => f());
};
export const useMusic = () =>
  useSyncExternalStore(
    (f) => (subs.add(f), () => subs.delete(f)),
    () => state,
  );

/* ---------------- local audio engine ---------------- */
const audio = MODE === "local" && typeof Audio !== "undefined" ? new Audio() : null;
let fadeTimer;
function loadLocal(i) {
  const t = tracks[i];
  audio.src = t.src;
  audio.preload = "auto";
  if (t.startAt) {
    const seek = () => {
      audio.currentTime = t.startAt;
      audio.removeEventListener("loadedmetadata", seek);
    };
    audio.addEventListener("loadedmetadata", seek);
  }
}
function fadeIn() {
  clearInterval(fadeTimer);
  const target = wedding.music.volume ?? 0.85;
  audio.volume = 0;
  fadeTimer = setInterval(() => {
    audio.volume = Math.min(target, audio.volume + 0.04);
    if (audio.volume >= target) clearInterval(fadeTimer);
  }, 80);
}
if (audio) {
  audio.addEventListener("ended", () => music.skip(1));
  audio.addEventListener("error", () => tracks.length > 1 && setTimeout(() => music.skip(1), 400));
  audio.addEventListener("pause", () => set({ playing: false }));
  audio.addEventListener("play", () => set({ playing: true, blocked: false }));
}

/* ---------------- YouTube engine ---------------- */
let yt = null;
let pendingPlay = false;
let errorsInRow = 0;
function loadYTApi() {
  if (window.YT?.Player) return Promise.resolve();
  return new Promise((res) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      res();
    };
    if (!document.getElementById("yt-api")) {
      const s = document.createElement("script");
      s.id = "yt-api";
      s.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(s);
    }
  });
}
/** Called by the Songs section with the element that hosts the video. */
export function mountYouTube(el) {
  if (MODE !== "youtube" || yt || !el) return;
  loadYTApi().then(() => {
    yt = new window.YT.Player(el, {
      videoId: tracks[state.index].id,
      width: "100%",
      height: "100%",
      playerVars: { playsinline: 1, rel: 0, modestbranding: 1 },
      events: {
        onReady: () => {
          set({ ready: true });
          yt.setVolume(Math.round((wedding.music.volume ?? 0.85) * 100));
          if (pendingPlay) {
            pendingPlay = false;
            yt.playVideo();
            setTimeout(() => !state.playing && set({ blocked: true }), 2500);
          }
        },
        onStateChange: (e) => {
          if (e.data === 1) {
            errorsInRow = 0;
            set({ playing: true, blocked: false });
          } else if (e.data === 2) set({ playing: false });
          else if (e.data === 0) music.skip(1);
        },
        onError: () => {
          errorsInRow += 1;
          if (errorsInRow < tracks.length) music.skip(1);
        },
      },
    });
  });
}

/* ---------------- public controls ---------------- */
export const music = {
  has: MODE !== "none",
  start() {
    if (MODE === "local") {
      if (!audio.src) loadLocal(state.index);
      fadeIn();
      audio.play().catch(() => set({ playing: false, blocked: true }));
    } else if (MODE === "youtube") {
      if (yt && state.ready) {
        yt.playVideo();
        setTimeout(() => !state.playing && set({ blocked: true }), 2500);
      } else pendingPlay = true;
    }
  },
  pause() {
    if (MODE === "local") audio.pause();
    else yt?.pauseVideo?.();
  },
  toggle() {
    state.playing ? music.pause() : music.start();
  },
  select(i) {
    const n = (i + tracks.length) % tracks.length;
    set({ index: n });
    if (MODE === "local") {
      loadLocal(n);
      music.start();
    } else if (yt && state.ready) {
      yt.loadVideoById(tracks[n].id);
    }
  },
  skip(d) {
    music.select(state.index + d);
  },
};

if (typeof document !== "undefined" && audio) {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && !audio.paused) {
      audio.pause();
      audio.dataset.resume = "1";
    } else if (!document.hidden && audio.dataset.resume) {
      delete audio.dataset.resume;
      music.start();
    }
  });
}

/* ---------------- floating gold disc ---------------- */
export default function MusicPlayer() {
  const { index, playing, blocked } = useMusic();
  const { lang } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!playing && !blocked) return;
    setOpen(true);
    if (blocked) return;
    const t = setTimeout(() => setOpen(false), 4500);
    return () => clearTimeout(t);
  }, [index, playing, blocked]);

  if (MODE === "none") return null;
  const t = tracks[index];
  const title = lang === "ta" ? t.ta : t.en;

  return (
    <div className={`player ${open ? "open" : ""} ${playing ? "playing" : ""} ${blocked ? "blocked" : ""}`}>
      <button
        className="disc"
        onClick={() => (blocked ? music.start() : setOpen((o) => !o))}
        aria-label={open ? "Hide song details" : "Show song details"}
      >
        <span className="disc-label">
          <Music2 size={14} />
        </span>
      </button>
      <div className="player-info" aria-live="polite">
        <span className="tamil p-title">{blocked ? (lang === "ta" ? "▶ பாடலை இயக்க தொடவும்" : "▶ Tap to play music") : title}</span>
        {!blocked && t.movie && <span className="p-sub">{t.movie}</span>}
      </div>
      <div className="player-ctrls">
        {tracks.length > 1 && (
          <button onClick={() => music.skip(-1)} aria-label="Previous song">
            <SkipBack size={16} />
          </button>
        )}
        <button className="pp" onClick={music.toggle} aria-label={playing ? "Pause music" : "Play music"}>
          {playing ? <Pause size={17} /> : <Play size={17} />}
        </button>
        {tracks.length > 1 && (
          <button onClick={() => music.skip(1)} aria-label="Next song">
            <SkipForward size={16} />
          </button>
        )}
      </div>
      <span className="eq" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}
