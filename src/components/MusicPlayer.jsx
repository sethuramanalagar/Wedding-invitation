import { useCallback, useEffect, useRef, useState } from "react";
import { ListMusic, Music, Pause, Play, SkipBack, SkipForward, X, MonitorPlay as Youtube } from "lucide-react";
import { wedding } from "../config/wedding.js";
import { BUNDLED_TRACKS } from "../config/music.js";
import { asset } from "../utils/asset.js";
import { LiveRaga } from "../utils/liveMusic.js";
import { loadYouTubeApi, youtubeId } from "../utils/youtube.js";
import { folderTracks } from "../utils/media.js";

const TX = wedding.text.music;

/**
 * Playlist order: YouTube songs → your own MP3s → built-in instrumentals.
 */
function buildPlaylist() {
  const m = wedding.music || {};
  const yt = (m.youtube || [])
    .map((t) => ({ ...t, kind: "yt", id: youtubeId(t.url || t.id || "") }))
    .filter((t) => t.id);
  // Every audio file in public/music (auto-discovered at build time)
  const own = folderTracks();
  const bundled = BUNDLED_TRACKS.map((t) => ({ ...t, kind: "file", url: t.src }));
  return [...yt, ...own, ...bundled];
}
const LIVE = { title: "Live Veena", subtitle: "Raga Mohanam · played live in your browser", kind: "live" };

/**
 * Wedding music player.
 * • Never plays on page load — only after a tap ("Open Invitation" or ♪).
 * • YouTube songs play in the official YouTube player, shown in a small
 *   "Now playing" card (YouTube requires the player to stay visible).
 * • Broken / blocked items are skipped; if nothing can play, a live veena
 *   piece is generated in the browser, so music always works.
 */
export default function MusicPlayer({ visible }) {
  const { music = {} } = wedding;
  const tracks = useRef(buildPlaylist()).current;
  const audioRef = useRef(null);
  const ytRef = useRef(null); // YT.Player
  const ytHost = useRef(null);
  const liveRef = useRef(null);
  const loadedUrl = useRef("");
  const failed = useRef(new Set());
  const fadeRef = useRef(null);
  const indexRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [live, setLive] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [, force] = useState(0);
  const target = music.volume ?? 0.5;
  const current = live ? LIVE : tracks[index] || LIVE;

  /* ── helpers ─────────────────────────────────────────── */
  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const a = new Audio();
      a.preload = "auto";
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
        /* iOS: read-only volume */
      }
      if (k === 1) clearInterval(fadeRef.current);
    }, 40);
  }, []);

  const stopAll = useCallback(() => {
    liveRef.current?.stop();
    audioRef.current?.pause();
    try {
      ytRef.current?.pauseVideo?.();
    } catch {
      /* ignore */
    }
  }, []);

  const markFailed = (k, why) => {
    console.warn(`[music] skipping "${tracks[k]?.title}":`, why);
    failed.current.add(k);
    force((n) => n + 1);
  };

  const startLive = useCallback(async () => {
    stopAll();
    setCardOpen(false);
    try {
      liveRef.current ??= new LiveRaga({ volume: target });
      await liveRef.current.start();
      setLive(true);
      setPlaying(true);
      setExpanded(true);
    } catch (e) {
      console.warn("[music] live fallback unavailable:", e);
    }
  }, [stopAll, target]);

  /* ── play a YouTube track ─────────────────────────────── */
  const playYouTube = useCallback(
    async (k) => {
      const t = tracks[k];
      setCardOpen(true); // the player must be visible
      setIndex(k);
      indexRef.current = k;
      setExpanded(true);
      setLive(false);
      if (ytRef.current?.loadVideoById) {
        ytRef.current.loadVideoById(t.id);
        setPlaying(true);
        return true;
      }
      try {
        const YT = await loadYouTubeApi();
        // The API replaces its mount node, so give it one React doesn't manage.
        const mount = document.createElement("div");
        ytHost.current.replaceChildren(mount);
        let ready = false;
        await new Promise((resolve, reject) => {
          const giveUp = setTimeout(() => reject(new Error("YouTube player did not start")), 12000);
          ytRef.current = new YT.Player(mount, {
            width: 256,
            height: 200,
            videoId: t.id,
            host: "https://www.youtube-nocookie.com",
            playerVars: { autoplay: 1, playsinline: 1, rel: 0, modestbranding: 1 },
            events: {
              onReady: (e) => {
                ready = true;
                clearTimeout(giveUp);
                e.target.setVolume(Math.round(target * 100));
                e.target.playVideo();
                resolve();
              },
              onStateChange: (e) => {
                if (e.data === YT.PlayerState.PLAYING) setPlaying(true);
                if (e.data === YT.PlayerState.PAUSED) setPlaying(false);
                if (e.data === YT.PlayerState.ENDED) window.dispatchEvent(new Event("music:next"));
              },
              onError: (e) => {
                markFailed(indexRef.current, `YouTube error ${e.data}`);
                if (ready) window.dispatchEvent(new Event("music:next"));
                else {
                  clearTimeout(giveUp);
                  reject(new Error(`YouTube error ${e.data}`));
                }
              },
            },
          });
        });
        setPlaying(true);
        return true;
      } catch (e) {
        setCardOpen(false);
        if (/error \d+/.test(e.message)) return false; // just this video; try the next
        // API blocked or player failed (offline, content blocker…): skip all YouTube items.
        try {
          ytRef.current?.destroy?.();
        } catch {
          /* ignore */
        }
        ytRef.current = null;
        tracks.forEach((tr, i) => tr.kind === "yt" && markFailed(i, e.message));
        return false;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tracks, target],
  );

  /* ── play an MP3 track ─────────────────────────────────── */
  const playFile = useCallback(
    async (k) => {
      const a = getAudio();
      const url = tracks[k].url;
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
        indexRef.current = k;
        setLive(false);
        setPlaying(true);
        setExpanded(true);
        setCardOpen(false);
        fadeTo(target);
        return true;
      } catch (err) {
        if (err?.name === "NotAllowedError" || err?.name === "AbortError") return "stop";
        loadedUrl.current = "";
        markFailed(k, err?.name || err);
        return false;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tracks, getAudio, fadeTo, target],
  );

  const playIndex = useCallback(
    async (i) => {
      const n = tracks.length;
      for (let step = 0; step < n; step++) {
        const k = (((i + step) % n) + n) % n;
        if (failed.current.has(k)) continue;
        stopAll();
        const ok = tracks[k].kind === "yt" ? await playYouTube(k) : await playFile(k);
        if (ok === true || ok === "stop") return;
      }
      await startLive();
    },
    [tracks, stopAll, playYouTube, playFile, startLive],
  );

  const pause = useCallback(() => {
    if (live) liveRef.current?.stop();
    else if (current.kind === "yt") ytRef.current?.pauseVideo?.();
    else {
      fadeTo(0, 350);
      const a = audioRef.current;
      setTimeout(() => a?.pause(), 380);
    }
    setPlaying(false);
  }, [live, current.kind, fadeTo]);

  const resume = () => {
    if (live) return startLive();
    if (current.kind === "yt" && ytRef.current?.playVideo) {
      setCardOpen(true);
      ytRef.current.playVideo();
      setPlaying(true);
      return;
    }
    return playIndex(index);
  };
  const toggle = () => (playing ? pause() : resume());
  const next = () => playIndex(indexRef.current + 1);
  const prev = () => playIndex(indexRef.current - 1);

  /* ── events ────────────────────────────────────────────── */
  useEffect(() => {
    const a = getAudio();
    const onEnded = () => playIndex(indexRef.current + 1);
    const onNext = () => playIndex(indexRef.current + 1);
    a.addEventListener("ended", onEnded);
    window.addEventListener("music:next", onNext);
    return () => {
      a.removeEventListener("ended", onEnded);
      window.removeEventListener("music:next", onNext);
    };
  }, [playIndex, getAudio]);

  useEffect(() => {
    if (!music.playOnOpen) return;
    const start = () => playIndex(0);
    window.addEventListener("invitation:open", start);
    return () => window.removeEventListener("invitation:open", start);
  }, [music.playOnOpen, playIndex]);

  useEffect(() => {
    if (!("mediaSession" in navigator) || current.kind === "yt") return;
    try {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: current.title,
        artist: `${wedding.groom.firstName} & ${wedding.bride.firstName} · Wedding`,
      });
      navigator.mediaSession.setActionHandler("play", resume);
      navigator.mediaSession.setActionHandler("pause", pause);
      navigator.mediaSession.setActionHandler("nexttrack", next);
      navigator.mediaSession.setActionHandler("previoustrack", prev);
    } catch {
      /* unsupported */
    }
  });

  useEffect(
    () => () => {
      clearInterval(fadeRef.current);
      audioRef.current?.pause();
      liveRef.current?.stop();
      try {
        ytRef.current?.destroy?.();
      } catch {
        /* ignore */
      }
    },
    [],
  );

  if (music.enabled === false) return null;

  const TrackButton = ({ t, i, isLive }) => {
    const active = isLive ? live : !live && i === index;
    return (
      <button
        type="button"
        role="option"
        aria-selected={active}
        className={`music__track ${active ? "is-current" : ""}`}
        onClick={() => {
          setListOpen(false);
          if (isLive) startLive();
          else playIndex(i);
        }}
      >
        <span className={`music__track-icon ${t.kind === "yt" ? "is-yt" : ""}`} aria-hidden="true">
          {active && playing ? (
            <span className="eq">
              <i />
              <i />
              <i />
            </span>
          ) : t.kind === "yt" ? (
            <Youtube size={15} />
          ) : (
            <Play size={14} />
          )}
        </span>
        <span>
          <span className="music__track-title">{t.title}</span>
          {t.subtitle && <span className="music__track-sub">{t.subtitle}</span>}
        </span>
      </button>
    );
  };

  const groups = [
    { label: "Songs · YouTube", items: tracks.map((t, i) => [t, i]).filter(([t]) => t.kind === "yt") },
    { label: TX.ownGroup, items: tracks.map((t, i) => [t, i]).filter(([t]) => t.kind === "file" && !t.bundled) },
    { label: TX.bundledGroup, items: tracks.map((t, i) => [t, i]).filter(([t]) => t.kind === "file" && t.bundled) },
  ];

  return (
    <>
      {/* Visible YouTube player card (required by YouTube while playing) */}
      <div
        className={`yt-card ${cardOpen && visible ? "is-open" : ""}`}
        role="region"
        aria-label="Now playing on YouTube"
        aria-hidden={!cardOpen}
      >
        <div className="yt-card__head">
          <span className="yt-card__title">
            <Youtube size={14} aria-hidden="true" /> {current.kind === "yt" ? current.title : ""}
          </span>
          <button
            type="button"
            className="yt-card__close"
            onClick={() => {
              ytRef.current?.pauseVideo?.();
              setPlaying(false);
              setCardOpen(false);
            }}
            aria-label="Stop and close the video player"
            tabIndex={cardOpen ? 0 : -1}
          >
            <X size={16} />
          </button>
        </div>
        <div className="yt-card__player" ref={ytHost} />
      </div>

      <div className={`music ${visible ? "is-visible" : ""} ${expanded ? "is-expanded" : ""}`}>
        {listOpen && (
          <div className="music__list" role="listbox" aria-label="Choose music">
            {groups.map(
              (g) =>
                g.items.some(([, i]) => !failed.current.has(i)) && (
                  <div key={g.label}>
                    <p className="music__list-title">{g.label}</p>
                    {g.items.map(([t, i]) => (failed.current.has(i) ? null : <TrackButton key={i} t={t} i={i} />))}
                  </div>
                ),
            )}
            <TrackButton t={LIVE} isLive />
          </div>
        )}

        {expanded && (
          <div className="music__bar">
            <button type="button" className="music__mini" onClick={prev} aria-label="Previous song" tabIndex={visible ? 0 : -1}>
              <SkipBack size={15} strokeWidth={1.8} />
            </button>
            <button
              type="button"
              className="music__now"
              onClick={() => setListOpen((o) => !o)}
              aria-expanded={listOpen}
              aria-label={`Now playing: ${current.title}. Show all songs`}
              tabIndex={visible ? 0 : -1}
            >
              <span className="music__now-title">{current.title}</span>
              <ListMusic size={14} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <button type="button" className="music__mini" onClick={next} aria-label="Next song" tabIndex={visible ? 0 : -1}>
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
            {TX.hint}
          </span>
        )}
      </div>
    </>
  );
}
