import { useMemo, useState } from "react";
import { Bus, Car, Clock, LocateFixed, MapPin, Search, TrainFront, Plane, Info } from "lucide-react";
import { wedding } from "../config/wedding.js";
import { BusGlyph, KolamDivider } from "./Ornaments.jsx";
import { mapsDirections, placeQuery } from "./Venue.jsx";

const { travel } = wedding;
const TX = wedding.text.reach;
const norm = (s = "") => s.toLowerCase().replace(/[^a-z]/g, "");
const POPULAR = ["chennai", "puducherry", "chidambaram", "mayiladuthurai", "kumbakonam", "trichy", "coimbatore", "bengaluru"];

/** Find a configured origin from free text ("pondy", "Bangalore", …). */
function matchOrigin(text) {
  const q = norm(text);
  if (q.length < 3) return null;
  return (
    travel.origins.find((o) => [o.name, o.id, ...o.aliases].some((n) => norm(n) === q)) ||
    travel.origins.find((o) => [o.name, o.id, ...o.aliases].some((n) => norm(n).startsWith(q) || q.startsWith(norm(n))))
  );
}

const DESTS = [
  { key: "marriage", label: TX.temple, sub: TX.templeSub },
  { key: "postWedding", label: TX.hall, sub: TX.hallSub },
  { key: "reception", label: TX.reception, sub: TX.receptionSub },
].filter((d) => wedding[d.key]?.venue);

/* ── Animated journey line ─────────────────────────────────── */

/** Split a long label into lines of ~24 characters at word boundaries. */
function wrap(label, max = 24) {
  const lines = [];
  let cur = "";
  for (const w of label.split(" ")) {
    if ((cur + " " + w).trim().length > max && cur) {
      lines.push(cur);
      cur = w;
    } else cur = (cur + " " + w).trim();
  }
  if (cur) lines.push(cur);
  return lines;
}
const STEP = 70;
const SEG = 0.8; // seconds per segment

function JourneyMap({ stops, animKey }) {
  const h = 30 + (stops.length - 1) * STEP + 30;
  const pts = stops.map((s, i) => ({ ...s, lines: wrap(s.label), x: i % 2 ? 58 : 38, y: 30 + i * STEP }));
  const d = pts.reduce((acc, p, i) => {
    if (i === 0) return `M${p.x} ${p.y}`;
    const prev = pts[i - 1];
    const my = (prev.y + p.y) / 2;
    return `${acc} C${prev.x} ${my} ${p.x} ${my} ${p.x} ${p.y}`;
  }, "");
  const total = SEG * (stops.length - 1);
  const reduced =
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const last = pts[pts.length - 1];

  return (
    <svg
      key={animKey}
      className="journey"
      viewBox={`0 0 320 ${h}`}
      style={{ "--total": `${total}s`, "--seg": `${SEG}s` }}
      role="img"
      aria-label={`Route: ${stops.map((s) => s.label).join(" → ")}`}
    >
      <path d={d} className="journey__track" />
      <path d={d} className="journey__line" pathLength="1" />
      {pts.map((p, i) => (
        <g key={i} className={`journey__stop journey__stop--${p.kind}`} style={{ "--d": i }}>
          <circle cx={p.x} cy={p.y} r={p.kind === "venue" || p.kind === "origin" ? 9 : 6} />
          {p.kind === "venue" && <circle cx={p.x} cy={p.y} r="15" className="journey__pulse" />}
          <text x="92" y={p.y - 3 - (p.lines.length - 1) * 8} className="journey__label">
            {p.lines.map((l, j) => (
              <tspan key={j} x="92" dy={j ? 16 : 0}>
                {l}
              </tspan>
            ))}
          </text>
          {p.note && (
            <text x="92" y={p.y + 14 + (p.lines.length - 1) * 8} className="journey__note">
              {p.note}
            </text>
          )}
        </g>
      ))}
      <g className="journey__bus">
        {reduced ? (
          <g transform={`translate(${last.x} ${last.y - 22})`}>
            <BusGlyph />
          </g>
        ) : (
          <g>
            <g transform="translate(0 -22)">
              <BusGlyph />
            </g>
            <animateMotion dur={`${total}s`} fill="freeze" path={d} calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.45 0 0.35 1" />
          </g>
        )}
      </g>
    </svg>
  );
}

export default function RoutePlanner() {
  const [dest, setDest] = useState(DESTS[0]?.key ?? "marriage");
  const [text, setText] = useState("");
  const [from, setFrom] = useState(null); // { origin } | { custom: "…" }

  const event = wedding[dest];
  const destQuery = placeQuery(event);
  const destLabel = DESTS.find((d) => d.key === dest)?.label ?? "Venue";

  const choose = (value) => {
    const t = value.trim();
    if (!t) return;
    const o = matchOrigin(t);
    setText(o ? o.name : t);
    setFrom(o ? { origin: o } : { custom: t });
  };

  const stops = useMemo(() => {
    if (!from) return [];
    const o = from.origin;
    const originName = o ? o.name : from.custom;
    const list = [{ label: originName, kind: "origin", note: o ? `${o.distance} ${TX.toHub}` : TX.startNote }];
    (o?.via ?? []).forEach((v) => list.push({ label: v, kind: "via" }));
    if (norm(originName) !== norm(travel.hub)) {
      list.push({ label: travel.hub, kind: "hub", note: TX.hubNote });
    }
    list.push({ label: travel.village, kind: "via", note: TX.villageNote });
    list.push({ label: event.venue, kind: "venue", note: event.displayTime });
    return list;
  }, [from, event, destLabel]);

  const originForMaps = from ? (from.origin ? `${from.origin.name.replace(/\s*\(.*\)/, "")}, India` : from.custom) : "";

  return (
    <section className="section reach" id="reach" aria-labelledby="reach-title">
      <div className="container container--narrow">
        <p className="eyebrow reveal">{TX.eyebrow}</p>
        <h2 id="reach-title" className="section-title reveal">
          {TX.title}
        </h2>
        <KolamDivider className="reveal" />

        <p className="reach__note reveal">
          <Info size={16} strokeWidth={1.6} aria-hidden="true" />
          {travel.arriveNote}
        </p>

        <div className="reach__panel reveal">
          <div className="dest-tabs" role="radiogroup" aria-label="Destination">
            {DESTS.map((d) => (
              <button
                key={d.key}
                type="button"
                role="radio"
                aria-checked={dest === d.key}
                className={`dest-tab ${dest === d.key ? "is-active" : ""}`}
                onClick={() => setDest(d.key)}
              >
                <span className="dest-tab__label">{d.label}</span>
                <span className="dest-tab__sub">{d.sub}</span>
              </button>
            ))}
          </div>

          <form
            className="reach__form"
            onSubmit={(e) => {
              e.preventDefault();
              choose(text);
            }}
          >
            <label htmlFor="from-input" className="reach__label">
              {TX.fromLabel}
            </label>
            <div className="reach__inputrow">
              <Search size={18} strokeWidth={1.6} aria-hidden="true" className="reach__searchicon" />
              <input
                id="from-input"
                list="origin-list"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={TX.placeholder}
                autoComplete="off"
                enterKeyHint="go"
              />
              <button type="submit" className="btn btn--solid btn--sm">
                {TX.showRoute}
              </button>
            </div>
            <datalist id="origin-list">
              {travel.origins.map((o) => (
                <option key={o.id} value={o.name} />
              ))}
            </datalist>
          </form>

          <div className="reach__chips" aria-label="Popular starting points">
            {POPULAR.map((id) => {
              const o = travel.origins.find((x) => x.id === id);
              if (!o) return null;
              const active = from?.origin?.id === id;
              return (
                <button
                  key={id}
                  type="button"
                  className={`chip ${active ? "is-active" : ""}`}
                  onClick={() => {
                    setText(o.name);
                    setFrom({ origin: o });
                  }}
                >
                  {o.name.replace(/\s*\(.*\)/, "")}
                </button>
              );
            })}
          </div>
        </div>

        <div className="reach__result" aria-live="polite">
          {from && (
            <div className="route-card" key={(from.origin?.id || from.custom) + dest}>
              <h3 className="route-card__title">
                {from.origin ? from.origin.name : from.custom} <span aria-hidden="true">→</span> {destLabel}
              </h3>
              {from.origin && (
                <div className="route-card__facts">
                  <span>
                    <MapPin size={14} strokeWidth={1.6} aria-hidden="true" /> {from.origin.distance} to Sirkazhi
                  </span>
                  <span>
                    <Clock size={14} strokeWidth={1.6} aria-hidden="true" /> {from.origin.time}
                  </span>
                </div>
              )}

              <JourneyMap stops={stops} animKey={(from.origin?.id || from.custom) + dest} />

              <ol className="route-steps">
                {from.origin ? (
                  <>
                    <li className="route-step" style={{ "--d": 0 }}>
                      <span className="route-step__icon"><Bus size={18} strokeWidth={1.6} /></span>
                      <div>
                        <p className="route-step__title">{TX.byBus}</p>
                        <p>{from.origin.bus}</p>
                      </div>
                    </li>
                    <li className="route-step" style={{ "--d": 1 }}>
                      <span className="route-step__icon"><TrainFront size={18} strokeWidth={1.6} /></span>
                      <div>
                        <p className="route-step__title">{TX.byTrain}</p>
                        <p>{from.origin.train}</p>
                      </div>
                    </li>
                  </>
                ) : (
                  <li className="route-step" style={{ "--d": 0 }}>
                    <span className="route-step__icon"><Bus size={18} strokeWidth={1.6} /></span>
                    <div>
                      <p className="route-step__title">{TX.reachHubFirst}</p>
                      <p>{TX.noSavedRoute.replace("{place}", from.custom)}</p>
                    </div>
                  </li>
                )}
                <li className="route-step" style={{ "--d": 2 }}>
                  <span className="route-step__icon"><Car size={18} strokeWidth={1.6} /></span>
                  <div>
                    <p className="route-step__title">{TX.lastStretch} {destLabel.toLowerCase()}</p>
                    {travel.lastMile.map((l, i) => (
                      <p key={i}>{l}</p>
                    ))}
                    <p className="route-step__addr">
                      <strong>{event.venue}</strong>
                      {event.address ? ` — ${event.address}` : ""}
                    </p>
                  </div>
                </li>
              </ol>

              <div className="route-card__actions">
                <a
                  className="btn btn--solid"
                  href={mapsDirections({ origin: originForMaps, destination: destQuery, mode: "transit" })}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Bus size={17} strokeWidth={1.6} aria-hidden="true" />
                  {TX.liveRoute}
                </a>
                <a
                  className="btn btn--outline"
                  href={mapsDirections({ origin: originForMaps, destination: destQuery, mode: "driving" })}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Car size={17} strokeWidth={1.6} aria-hidden="true" />
                  {TX.carRoute}
                </a>
              </div>
              <p className="route-card__disclaimer">
                {TX.disclaimer}
              </p>
            </div>
          )}
        </div>

        <div className="reach__extra reveal">
          <a
            className="btn btn--ghost"
            href={mapsDirections({ destination: destQuery })}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LocateFixed size={17} strokeWidth={1.6} aria-hidden="true" />
            {TX.myLocation}
          </a>
          <details className="reach__details">
            <summary>{TX.trainsFlights}</summary>
            <p>
              <TrainFront size={15} strokeWidth={1.6} aria-hidden="true" /> {travel.rail}
            </p>
            <p>
              <Plane size={15} strokeWidth={1.6} aria-hidden="true" /> {travel.air}
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}
