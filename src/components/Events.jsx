import { useState } from "react";
import { MapPin, Navigation, CalendarPlus, Map as MapIcon, Clock } from "lucide-react";
import { wedding } from "../config/wedding.js";
import { useLang } from "../i18n.jsx";
import { eventMapUrl, mapsDirections, mapsEmbed, googleCalendarUrl, downloadIcs } from "../utils/helpers.js";
import { Divider } from "./Ornaments.jsx";

const { events } = wedding;

function Scene({ type }) {
  if (type === "evening")
    return (
      <svg className="ev-scene" viewBox="0 0 320 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="sc-eve" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2a1446" />
            <stop offset=".6" stopColor="#b5476b" />
            <stop offset="1" stopColor="#f2a65a" />
          </linearGradient>
        </defs>
        <rect width="320" height="120" fill="url(#sc-eve)" />
        <circle cx="250" cy="96" r="22" fill="#ffcf7a" opacity=".85" />
        {Array.from({ length: 9 }).map((_, i) => (
          <g key={i} className="sc-lamp" style={{ animationDelay: `${i * 0.3}s` }}>
            <line x1={20 + i * 35} y1="0" x2={20 + i * 35} y2={22 + (i % 3) * 8} stroke="#e8c46e" strokeWidth=".8" />
            <ellipse cx={20 + i * 35} cy={28 + (i % 3) * 8} rx="5" ry="7" fill="#ffb347" />
          </g>
        ))}
        <path d="M0 120 V100 Q160 84 320 100 V120Z" fill="#3a0e1b" />
      </svg>
    );
  if (type === "predawn")
    return (
      <svg className="ev-scene" viewBox="0 0 320 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="sc-pre" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0b1034" />
            <stop offset=".7" stopColor="#3b2a6b" />
            <stop offset="1" stopColor="#c46b7a" />
          </linearGradient>
        </defs>
        <rect width="320" height="120" fill="url(#sc-pre)" />
        {Array.from({ length: 22 }).map((_, i) => (
          <circle key={i} className="sc-star" cx={(i * 53) % 320} cy={(i * 37) % 70} r={i % 4 ? 0.8 : 1.4} fill="#fff" style={{ animationDelay: `${(i % 5) * 0.4}s` }} />
        ))}
        <circle cx="262" cy="26" r="11" fill="#fff6d8" />
        <circle cx="267" cy="22" r="10" fill="#0f1440" />
        {/* temple gopuram silhouette */}
        <g fill="#140a22">
          <path d="M120 120 V86 H200 V120Z" />
          <path d="M126 86 L132 64 H188 L194 86Z" />
          <path d="M134 64 L139 46 H181 L186 64Z" />
          <path d="M141 46 L146 32 H174 L179 46Z" />
          <path d="M148 32 C150 20 170 20 172 32Z" />
          <path d="M0 120 V108 H120 V120Z M200 108 H320 V120 H200Z" />
        </g>
        <g fill="#ffcf6b">
          <rect x="155" y="98" width="10" height="22" rx="5" opacity=".9" />
          <circle cx="160" cy="26" r="2" />
        </g>
      </svg>
    );
  return (
    <svg className="ev-scene" viewBox="0 0 320 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="sc-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd9a0" />
          <stop offset=".7" stopColor="#ffb07a" />
          <stop offset="1" stopColor="#f4dfb8" />
        </linearGradient>
      </defs>
      <rect width="320" height="120" fill="url(#sc-sun)" />
      <g className="sc-rays" style={{ transformOrigin: "160px 100px" }}>
        {Array.from({ length: 16 }).map((_, i) => (
          <path key={i} d="M160 100 L156 10 L164 10Z" fill="#fff4d6" opacity=".45" transform={`rotate(${i * 22.5} 160 100)`} />
        ))}
      </g>
      <circle cx="160" cy="100" r="28" fill="#ff9f43" />
      {/* banana leaf feast */}
      <g transform="translate(40 96)">
        <path d="M0 10 C40 -8 200 -8 240 10 C200 24 40 24 0 10Z" fill="#3f8a35" />
        <path d="M0 10 H240" stroke="#2c6526" strokeWidth="1.2" />
        <circle cx="60" cy="8" r="7" fill="#fff8e7" />
        <circle cx="90" cy="6" r="4" fill="#f4b41a" />
        <circle cx="110" cy="9" r="4" fill="#c0392b" />
        <circle cx="140" cy="6" r="5" fill="#f6d365" />
        <circle cx="170" cy="9" r="4" fill="#6ab04c" />
      </g>
    </svg>
  );
}

function EventCard({ ev, i }) {
  const { t, lang } = useLang();
  const w = t.events[ev.id] || {};
  const other = wedding.content[lang === "ta" ? "en" : "ta"].events[ev.id]?.title;
  const [showMap, setShowMap] = useState(false);
  const mapUrl = eventMapUrl(ev);
  return (
    <article className={`event reveal ${ev.featured ? "featured" : ""}`} style={{ "--d": `${i * 0.12}s` }}>
      <div className="ev-top">
        <Scene type={ev.scene} />
        {other && <span className="ev-badge tamil">{other}</span>}
      </div>
      <div className="ev-body">
        <h3 className="ev-title tamil">{w.title}</h3>
        <p className="ev-date tamil">{w.date}</p>
        <p className="ev-time">
          <Clock size={15} aria-hidden="true" /> <span className="tamil">{w.time}</span>
        </p>
        {w.venue ? (
          <div className="ev-venue">
            <MapPin size={16} aria-hidden="true" />
            <div>
              <p className="ev-vn tamil">{w.venue}</p>
              {w.address && <p className="ev-addr tamil">{w.address}</p>}
            </div>
          </div>
        ) : (
          t.ui.pending && <p className="ev-pending tamil">{t.ui.pending}</p>
        )}

        <div className="ev-actions">
          {mapUrl && (
            <a className="btn" href={mapUrl} target="_blank" rel="noreferrer">
              <MapIcon size={15} /> {t.ui.map}
            </a>
          )}
          {ev.mapsQuery && (
            <a className="btn" href={mapsDirections(ev.mapsQuery)} target="_blank" rel="noreferrer">
              <Navigation size={15} /> {t.ui.directions}
            </a>
          )}
          <a className="btn ghost" href={googleCalendarUrl(ev, lang)} target="_blank" rel="noreferrer">
            <CalendarPlus size={15} /> {t.ui.save}
          </a>
        </div>

        {ev.mapsQuery &&
          (showMap ? (
            <iframe
              className="ev-map"
              title={`Map: ${w.venue}`}
              src={mapsEmbed(ev.mapsQuery)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <button className="map-reveal" onClick={() => setShowMap(true)}>
              {t.ui.showMap}
            </button>
          ))}
      </div>
    </article>
  );
}

export default function Events() {
  const { t, lang } = useLang();
  return (
    <section className="section events" id="events">
      <p className="eyebrow tamil">{t.eventsEyebrow}</p>
      <h2 className="section-title tamil">{t.eventsTitle}</h2>
      <Divider />
      <div className="timeline">
        {events.map((ev, i) => (
          <EventCard key={ev.id} ev={ev} i={i} />
        ))}
      </div>
      <button className="btn wide" onClick={() => downloadIcs(events, lang)}>
        <CalendarPlus size={16} /> {t.ui.addAll}
      </button>
    </section>
  );
}
