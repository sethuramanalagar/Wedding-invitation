import { useEffect, useRef } from "react";
import { Play } from "lucide-react";
import { useLang } from "../i18n.jsx";
import { music, useMusic, tracks, MODE, mountYouTube } from "./MusicPlayer.jsx";
import { Divider, FairyLights } from "./Ornaments.jsx";

export default function Songs() {
  const { t, lang } = useLang();
  const { index, playing } = useMusic();
  const host = useRef(null);

  useEffect(() => {
    mountYouTube(host.current);
  }, []);

  if (MODE === "none") return null;
  const cur = tracks[index];

  return (
    <section className="section velvet songs" id="songs">
      <div className="velvet-pattern" aria-hidden="true" />
      <FairyLights className="top" count={18} />
      <p className="eyebrow light tamil">{t.songs.eyebrow}</p>
      <h2 className="section-title light tamil">{t.songs.title}</h2>
      <p className="songs-sub tamil">{t.songs.sub}</p>

      <div className="gramophone reveal" aria-hidden="true">
        <div className={`record ${playing ? "spin" : ""}`}>
          <span className="record-label tamil">{lang === "ta" ? cur.ta : cur.en}</span>
        </div>
        <div className={`tonearm ${playing ? "on" : ""}`} />
        <div className="notes-rise">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} style={{ "--i": i }}>
              {i % 2 ? "♪" : "♫"}
            </span>
          ))}
        </div>
      </div>

      {MODE === "youtube" && (
        <>
          <div className="yt-frame reveal">
            <div ref={host} className="yt-host" />
          </div>
          <p className="songs-hint tamil">{t.songs.hint}</p>
        </>
      )}

      <Divider className="light" />

      <ol className="song-list tamil">
        {tracks.map((s, i) => {
          const on = i === index;
          return (
            <li key={s.id || s.src}>
              <button
                className={`song ${on ? "on" : ""}`}
                onClick={() => (on ? music.toggle() : (music.select(i), music.start()))}
                aria-current={on}
              >
                <span className="song-no">{String(i + 1).padStart(2, "0")}</span>
                <span className="song-text">
                  <span className="song-title">{lang === "ta" ? s.ta : s.en}</span>
                  {s.movie && <span className="song-movie">{s.movie}</span>}
                </span>
                <span className="song-icon">
                  {on && playing ? (
                    <span className="mini-eq">
                      <i />
                      <i />
                      <i />
                    </span>
                  ) : (
                    <Play size={16} />
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
