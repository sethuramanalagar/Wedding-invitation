import { wedding } from "../config/wedding.js";
import { Kalasam, KolamDivider, Petals } from "./Ornaments.jsx";
import { musicCredits } from "../utils/media.js";

export default function Footer() {
  const { closing, groom, bride, opening } = wedding;
  const credits = musicCredits(); // only for music files that are present
  return (
    <footer className="closing" aria-labelledby="closing-title">
      <Petals count={6} />
      <div className="sky" aria-hidden="true">
        {Array.from({ length: 9 }, (_, i) => (
          <span key={i} className="sky-lantern" style={{ "--i": i }}>
            <svg viewBox="0 0 20 28">
              <path d="M3 4 Q10 0 17 4 L15 22 Q10 25 5 22 Z" fill="#f6b25a" />
              <path d="M5 6 Q10 4 15 6 L14 20 Q10 22 6 20 Z" fill="#ffd98a" opacity=".8" />
              <ellipse cx="10" cy="23" rx="3" ry="1.5" fill="#ffefb0" />
            </svg>
          </span>
        ))}
        {[
          [18, 22, "#ffd166"],
          [78, 16, "#ff8fab"],
          [50, 8, "#9be7ff"],
          [30, 40, "#ffd166"],
          [70, 36, "#ffb4a2"],
        ].map(([x, y, c], k) => (
          <svg key={k} className="sky-fw" style={{ left: `${x}%`, top: `${y}%`, "--k": k }} viewBox="-30 -30 60 60">
            {Array.from({ length: 14 }, (_, i) => {
              const a = (i / 14) * Math.PI * 2;
              return (
                <line
                  key={i}
                  x1={(Math.cos(a) * 5).toFixed(1)}
                  y1={(Math.sin(a) * 5).toFixed(1)}
                  x2={(Math.cos(a) * 26).toFixed(1)}
                  y2={(Math.sin(a) * 26).toFixed(1)}
                  stroke={c}
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
        ))}
      </div>
      <div className="container">
        <Kalasam className="closing__kalasam reveal" />
        <h2 id="closing-title" className="closing__lines reveal">
          {closing.lines.map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </h2>
        <KolamDivider className="reveal" />
        <p className="closing__names reveal">
          <span>{groom.firstName}</span>
          <span className="closing__amp" aria-label="and">&amp;</span>
          <span>{bride.firstName}</span>
        </p>
        <p className="closing__date reveal">
          <time dateTime={wedding.marriage.date}>{opening.displayDate}</time>
        </p>
        {credits.length > 0 && (
          <p className="closing__credits">
            {wedding.text.footer.musicCredit}{" "}
            {credits.map((t, i) => (
              <span key={t.src}>
                {i > 0 && " · "}
                {t.creditUrl ? (
                  <a href={t.creditUrl} target="_blank" rel="noopener noreferrer">
                    {t.credit}
                  </a>
                ) : (
                  t.credit
                )}
              </span>
            ))}
          </p>
        )}
        <a href="#top" className="closing__top">
          {wedding.text.footer.backToTop}
        </a>
      </div>
    </footer>
  );
}
