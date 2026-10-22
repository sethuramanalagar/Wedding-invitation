import { useEffect, useState, useSyncExternalStore } from "react";
import { Play, Pause, SkipForward, SkipBack, Music2 } from "lucide-react";
import { wedding } from "../config/wedding.js";
import { playlist } from "../utils/helpers.js";

/* A tiny audio controller that lives outside React so that start() can run
   synchronously inside the "open" tap (browsers only allow sound after a tap). */
const tracks = playlist();
const audio = typeof Audio !== "undefined" ? new Audio() : null;
let state = { index: 0, playing: false };
const subs = new Set();
const set = (patch) => {
  state = { ...state, ...patch };
  subs.forEach((f) => f());
};
let fadeTimer;

function load(i) {
  if (!audio || !tracks.length) return;
  const t = tracks[(i + tracks.length) % tracks.length];
  set({ index: (i + tracks.length) % tracks.length });
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
  if (!audio) return;
  clearInterval(fadeTimer);
  const target = wedding.music.volume ?? 0.8;
  audio.volume = 0;
  fadeTimer = setInterval(() => {
    audio.volume = Math.min(target, audio.volume + 0.04);
    if (audio.volume >= target) clearInterval(fadeTimer);
  }, 80);
}

export const music = {
  has: tracks.length > 0,
  start() {
    if (!audio || !tracks.length) return;
    if (!audio.src) load(0);
    fadeIn();
    audio.play().then(() => set({ playing: true })).catch(() => set({ playing: false }));
  },
  toggle() {
    if (!audio) return;
    if (audio.paused) music.start();
    else {
      audio.pause();
      set({ playing: false });
    }
  },
  skip(d) {
    load(state.index + d);
    music.start();
  },
};

if (audio) {
  audio.addEventListener("ended", () => music.skip(1));
  audio.addEventListener("error", () => {
    if (tracks.length > 1) setTimeout(() => music.skip(1), 400);
    else set({ playing: false });
  });
  audio.addEventListener("pause", () => set({ playing: false }));
  audio.addEventListener("play", () => set({ playing: true }));
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

const useMusic = () =>
  useSyncExternalStore(
    (f) => (subs.add(f), () => subs.delete(f)),
    () => state,
  );

export default function MusicPlayer() {
  const { index, playing } = useMusic();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!playing) return;
    setOpen(true);
    const t = setTimeout(() => setOpen(false), 4500);
    return () => clearTimeout(t);
  }, [index, playing]);

  if (!tracks.length) return null;
  const t = tracks[index];

  return (
    <div className={`player ${open ? "open" : ""} ${playing ? "playing" : ""}`}>
      <button className="disc" onClick={() => setOpen((o) => !o)} aria-label={open ? "Hide song details" : "Show song details"}>
        <span className="disc-label">
          <Music2 size={14} />
        </span>
      </button>
      <div className="player-info" aria-live="polite">
        <span className="tamil p-title">{t.title}</span>
        {t.subtitle && <span className="p-sub">{t.subtitle}</span>}
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
