import { useCallback, useEffect, useRef, useState } from "react";
import { ListMusic, Music, Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { wedding } from "../config/wedding.js";
import { BUNDLED_TRACKS } from "../config/music.js";
import { asset } from "../utils/asset.js";
import { LiveRaga } from "../utils/liveMusic.js";

/** Your own tracks (public/music, listed in wedding.js) first, then the built-in ones. */
function buildPlaylist() {
  const own = (wedding.music?.tracks || []).filter((t) => t?.src).map((t) => ({ ...t, bundled: false }));
  return [...own, ...BUNDLED_TRACKS];
}
const urlOf = (t) => (t.bundled ? t.src : asset(t.src));
const LIVE = { title: "Live Veena", subtitle: "Raga Mohanam · played live in your browser", live: true };

/**
 * Background music with a playlist.
 * • Never autoplays on page load — starts only after a tap.
 * • A track that genuinely fails to load is skipped (and logged).
 * • If no file can play at all, a live veena piece is generated in the
 *   browser instead, so the music button always works.
 */
export default function MusicPlayer({ visible }) {
  const { music = {} } = wedding;
  const tracks = useRef(buildPlaylist()).current;
  const audioRef = useRef(null);
  const liveRef = useRef(null);
  const loadedUrl = useRef("");
  const failed = useRef(new Set());
  const fadeRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [live, setLive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const target = music.volume ?? 0.5;

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const a = new Audio();
      a.preload = "auto";
      a.volume = 0;
      audioRef.current = a;
    }
    return audioRef.current;
  }, []);

  const fadeTo = useCallback((vol, ms = 1200) => {
    const a = audioRef.current;
    if (!a) return;
    clearInterval(fadeRef.current);
    const start = a.volume;
    const t0 = performance.now();
    fadeRef.current = setInterval(() => {
      const k = Math.min(1, (performance.now() - t0) / ms);
      try {
        a.volume = Math.max(0, Math.min(1, start + (vol - start) * k));
      } catch {
        /* iOS: volume is read-only — fine */
      }
      if (k === 1) clearInterval(fadeRef.current);
    }, 40);
  }, []);

  const startLive = useCallback(async () => {
    try {
      liveRef.current ??= new LiveRaga({ volume: target });
      await liveRef.current.start();
      setLive(true);
      setPlaying(true);
      setExpanded(true);
    } catch (e) {
      console.warn("[music] live fallback unavailable:", e);
    }
  }, [target]);

  const playIndex = useCallback(
    async (i) => {
      liveRef.current?.stop();
      setLive(false);
      const a = getAudio();
      const n = tracks.length;
      for (let step = 0; step < n; step++) {
        const k = (((i + step) % n) + n) % n;
        if (failed.current.has(k)) continue;
        const url = urlOf(tracks[k]);
        if (loadedUrl.current !== url) {
          a.src = url;
          loadedUrl.current = url;
          try {
            a.volume = 0;
          } catch {
            /* ignore */
          }
        }
        try {
          await a.play();
          setIndex(k);
          setPlaying(true);
          setExpanded(true);
          fadeTo(target);
          return;
        } catch (err) {
          // Tap needed first, or superseded by another tap: not a broken file.
          if (err?.name === "NotAllowedError" || err?.name === "AbortError") return;
          console.warn(`[music] could not play "${tracks[k].title}" (${url}):`, err?.name || err);
          failed.current.add(k);
          loadedUrl.current = "";
        }
      }
      // Nothing playable — generate music live instead.
      await startLive();
    },
    [tracks, getAudio, target, fadeTo, startLive],
  );

  const pause = useCallback(() => {
    if (live) {
      liveRef.current?.stop();
      setPlaying(false);
      return;
    }
    const a = audioRef.current;
    if (!a) return;
    fadeTo(0, 350);
    setTimeout(() => a.pause(), 380);
    setPlaying(false);
  }, [live, fadeTo]);

  const toggle = () => {
    if (playing) return pause();
    if (live) return startLive();
    return playIndex(index);
  };
  const next = () => playIndex(index + 1);
  const prev = () => playIndex(index - 1);

  // Auto-advance at the end of each track
  useEffect(() => {
    const a = getAudio();
    const onEnded = () => playIndex(index + 1);
    a.addEventListener("ended", onEnded);
    return () => a.removeEventListener("ended", onEnded);
  }, [index, playIndex, getAudio]);

  // Optional: start with "Open Invitation" (that tap is the user gesture)
  useEffect(() => {
    if (!music.playOnOpen) return;
    const start = () => playIndex(0);
    window.addEventListener("invitation:open", start);
    return () => window.removeEventListener("invitation:open", start);
  }, [music.playOnOpen, playIndex]);

  // Lock-screen / notification controls
  useEffect(() => {
    if (!("mediaSession" in navigator)) return;
    const t = live ? LIVE : tracks[index];
    try {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: t.title,
        artist: `${wedding.groom.firstName} & ${wedding.bride.firstName} · Wedding`,
      });
      navigator.mediaSession.setActionHandler("play", toggle);
      navigator.mediaSession.setActionHandler("pause", pause);
      navigator.mediaSession.setActionHandler("nexttrack", next);
      navigator.mediaSession.setActionHandler("previoustrack", prev);
    } catch {
      /* not supported */
    }
  });

  useEffect(
    () => () => {
      clearInterval(fadeRef.current);
      audioRef.current?.pause();
      liveRef.current?.stop();
    },
    [],
  );

  if (music.enabled === false) return null;
  const current = live ? LIVE : tracks[index] || LIVE;

  return (
    <div className={`music ${visible ? "is-visible" : ""} ${expanded ? "is-expanded" : ""}`}>
      {listOpen && (
        <div className="music__list" role="listbox" aria-label="Choose music">
          <p className="music__list-title">Wedding music</p>
          {tracks.map((t, i) =>
            failed.current.has(i) ? null : (
              <button
                key={t.title + i}
                type="button"
                role="option"
                aria-selected={!live && i === index}
                className={`music__track ${!live && i === index ? "is-current" : ""}`}
                onClick={() => {
                  setListOpen(false);
                  playIndex(i);
                }}
              >
                <span className="music__track-icon" aria-hidden="true">
                  {!live && i === index && playing ? (
                    <span className="eq">
                      <i />
                      <i />
                      <i />
                    </span>
                  ) : (
                    <Play size={14} />
                  )}
                </span>
                <span>
                  <span className="music__track-title">{t.title}</span>
                  {t.subtitle && <span className="music__track-sub">{t.subtitle}</span>}
                </span>
              </button>
            ),
          )}
          <button
            type="button"
            role="option"
            aria-selected={live}
            className={`music__track ${live ? "is-current" : ""}`}
            onClick={() => {
              setListOpen(false);
              audioRef.current?.pause();
              startLive();
            }}
          >
            <span className="music__track-icon" aria-hidden="true">
              {live && playing ? (
                <span className="eq">
                  <i />
                  <i />
                  <i />
                </span>
              ) : (
                <Play size={14} />
              )}
            </span>
            <span>
              <span className="music__track-title">{LIVE.title}</span>
              <span className="music__track-sub">{LIVE.subtitle}</span>
            </span>
          </button>
        </div>
      )}

      {expanded && (
        <div className="music__bar">
          <button type="button" className="music__mini" onClick={prev} aria-label="Previous track" tabIndex={visible ? 0 : -1}>
            <SkipBack size={15} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            className="music__now"
            onClick={() => setListOpen((o) => !o)}
            aria-expanded={listOpen}
            aria-label={`Now playing: ${current.title}. Show all music`}
            tabIndex={visible ? 0 : -1}
          >
            <span className="music__now-title">{current.title}</span>
            <ListMusic size={14} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <button type="button" className="music__mini" onClick={next} aria-label="Next track" tabIndex={visible ? 0 : -1}>
            <SkipForward size={15} strokeWidth={1.8} />
          </button>
        </div>
      )}

      <button
        type="button"
        className={`music__btn ${playing ? "is-playing" : ""}`}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Pause music" : "Play music"}
        tabIndex={visible ? 0 : -1}
      >
        {playing ? (
          <Pause size={20} strokeWidth={1.8} aria-hidden="true" />
        ) : expanded ? (
          <Play size={20} strokeWidth={1.8} aria-hidden="true" />
        ) : (
          <Music size={20} strokeWidth={1.6} aria-hidden="true" />
        )}
        <span className="music__bars" aria-hidden="true" />
      </button>
      {!expanded && (
        <span className="music__hint" aria-hidden="true">
          ♪ Tap for music
        </span>
      )}
    </div>
  );
}
