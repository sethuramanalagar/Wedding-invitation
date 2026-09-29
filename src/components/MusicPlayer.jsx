import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";
import { wedding } from "../config/wedding.js";
import { asset } from "../utils/asset.js";

/**
 * Optional background music. Never autoplays — starts only on a tap.
 * If the audio file is missing or cannot play, the control quietly
 * disappears and the rest of the site is unaffected.
 */
export default function MusicPlayer({ visible }) {
  const { music } = wedding;
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [note, setNote] = useState("");
  const noteTimer = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(noteTimer.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, []);

  if (!music?.enabled || !music.source || unavailable) return null;

  const fail = () => {
    setPlaying(false);
    setNote("Music unavailable");
    setTimeout(() => setUnavailable(true), 1800);
  };

  const getAudio = () => {
    if (!audioRef.current) {
      const a = new Audio();
      a.src = asset(music.source);
      a.loop = true;
      a.preload = "none";
      a.volume = 0.55;
      a.addEventListener("error", fail);
      audioRef.current = a;
    }
    return audioRef.current;
  };

  const toggle = async () => {
    const audio = getAudio();
    if (playing) {
      audio.pause();
      setPlaying(false);
      flash("Music Off");
      return;
    }
    try {
      await audio.play();
      setPlaying(true);
      flash("Music On");
    } catch {
      fail();
    }
  };

  const flash = (text) => {
    setNote(text);
    clearTimeout(noteTimer.current);
    noteTimer.current = setTimeout(() => setNote(""), 1600);
  };

  return (
    <div className={`music ${visible ? "is-visible" : ""}`}>
      {note && (
        <span className="music__note" role="status">
          {note}
        </span>
      )}
      <button
        type="button"
        className={`music__btn ${playing ? "is-playing" : ""}`}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Turn music off" : "Turn music on"}
        tabIndex={visible ? 0 : -1}
      >
        {playing ? (
          <Music size={20} strokeWidth={1.6} aria-hidden="true" />
        ) : (
          <VolumeX size={20} strokeWidth={1.6} aria-hidden="true" />
        )}
        <span className="music__bars" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </button>
    </div>
  );
}
