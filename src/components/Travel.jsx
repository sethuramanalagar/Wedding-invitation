import { useMemo, useState } from "react";
import { Bus, TrainFront, MapPin, Search, LocateFixed, Car, Footprints } from "lucide-react";
import { wedding } from "../config/wedding.js";
import { useLang } from "../i18n.jsx";
import { Divider } from "./Ornaments.jsx";

const T = wedding.travel;
const byId = Object.fromEntries(T.towns.map((x) => [x.id, x]));
const DEST = {
  temple: wedding.events.find((e) => e.id === "wedding").mapsQuery,
  hall: wedding.events.find((e) => e.id === "celebration").mapsQuery,
};

const km = (a, b) => {
  const R = 6371,
    r = (x) => (x * Math.PI) / 180;
  const dl = r(b.lat - a.lat),
    dn = r(b.lng - a.lng);
  const x = Math.sin(dl / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(dn / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
};
// straight-line × 1.3 ≈ road distance, rounded to 5 km
const roadKm = (town) => Math.max(5, Math.round((km(town, T.temple) * 1.3) / 5) * 5);

const norm = (s) => s.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
function findTown(q) {
  const n = norm(q);
  if (!n) return null;
  if (["sirkazhi", "sirkali", "seerkazhi", "சீர்காழி"].map(norm).some((x) => x.startsWith(n) || n.startsWith(x)))
    return { id: "sirkazhi", en: "Sirkazhi", ta: "சீர்காழி", ...T.sirkazhi, via: [] };
  return (
    T.towns.find((x) => [x.id, x.en, x.ta, x.en.replace(/\(.*\)/, "")].some((k) => norm(k) === n)) ||
    T.towns.find((x) => [x.id, x.en, x.ta, ...(x.en.match(/\((.*)\)/)?.slice(1) || [])].some((k) => norm(k).startsWith(n)))
  );
}

const fill = (tpl, o) => tpl.replace(/\{(\w+)\}/g, (_, k) => o[k] ?? "");

export default function Travel() {
  const { t, lang } = useLang();
  const tr = t.travel;
  const [dest, setDest] = useState("temple");
  const [q, setQ] = useState("");
  const [query, setQuery] = useState("");

  const name = (x) => (lang === "ta" ? x.ta : x.en);
  const town = useMemo(() => (query ? findTown(query) : null), [query]);

  const route = useMemo(() => {
    if (!query) return null;
    const destName = dest === "temple" ? tr.temple : tr.hall;
    if (!town) return { unknown: true, stops: [query, tr.sirkazhi, tr.thandavankulam, destName] };
    const viaIds = town.hub ? [town.hub, ...(byId[town.hub]?.via || [])] : town.via || [];
    const via = viaIds.map((id) => byId[id]).filter(Boolean);
    const stops = [name(town), ...via.map(name)];
    if (town.id !== "sirkazhi") stops.push(tr.sirkazhi);
    stops.push(tr.thandavankulam, destName);
    let bus;
    if (town.id === "sirkazhi") bus = "";
    else if (town.hub) bus = fill(tr.hubTpl, { from: name(town), hub: name(byId[town.hub]) });
    else
      bus = fill(tr.busTpl, {
        from: name(town),
        via: via.length ? fill(tr.viaTpl, { list: via.map(name).join(", ") }) : "",
      });
    const extra = lang === "ta" ? town.busTa : town.busEn;
    return { stops, bus: [bus, extra].filter(Boolean).join(" "), train: town.train, dist: roadKm(town) };
  }, [query, town, dest, lang]);

  const origin = town ? `${town.en.replace(/\s*\(.*\)/, "")}, Tamil Nadu` : query;
  const gm = (mode, from) =>
    `https://www.google.com/maps/dir/?api=1${from ? `&origin=${encodeURIComponent(from)}` : ""}&destination=${encodeURIComponent(DEST[dest])}&travelmode=${mode}`;

  const submit = (e) => {
    e?.preventDefault();
    setQuery(q.trim());
  };
  const chips = ["chennai", "puducherry", "chidambaram", "mayiladuthurai", "kumbakonam", "trichy", "madurai", "bengaluru"];

  return (
    <section className="section travel" id="travel">
      <p className="eyebrow tamil">{tr.eyebrow}</p>
      <h2 className="section-title tamil">{tr.title}</h2>
      <Divider />
      <p className="travel-sub tamil">{tr.sub}</p>

      <div className="dest-toggle tamil" role="tablist">
        {["temple", "hall"].map((d) => (
          <button key={d} role="tab" aria-selected={dest === d} className={dest === d ? "on" : ""} onClick={() => setDest(d)}>
            {d === "temple" ? tr.toTemple : tr.toHall}
          </button>
        ))}
      </div>

      <form className="town-search tamil" onSubmit={submit}>
        <Search size={18} aria-hidden="true" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={tr.placeholder}
          list="town-list"
          aria-label={tr.placeholder}
          enterKeyHint="search"
        />
        <datalist id="town-list">
          {T.towns.map((x) => (
            <option key={x.id} value={name(x)} />
          ))}
        </datalist>
        <button type="submit" className="btn">
          {tr.search}
        </button>
      </form>

      <div className="chips tamil">
        {chips.map((id) => (
          <button
            key={id}
            className={town?.id === id ? "on" : ""}
            onClick={() => {
              setQ(name(byId[id]));
              setQuery(name(byId[id]));
            }}
          >
            {name(byId[id])}
          </button>
        ))}
      </div>

      {route && (
        <div className="route-card tamil" key={`${query}-${dest}-${lang}`}>
          {route.dist && (
            <p className="route-dist">
              {tr.approx} <strong>{route.dist}</strong> {tr.km}
            </p>
          )}
          <ol className="route-line" style={{ "--n": route.stops.length }}>
            <span className="route-bus" aria-hidden="true">
              <Bus size={18} />
            </span>
            {route.stops.map((s, i) => (
              <li key={i} className={i === 0 ? "first" : i === route.stops.length - 1 ? "last" : ""} style={{ "--i": i }}>
                <span className="dot">{i === route.stops.length - 1 ? <MapPin size={13} /> : null}</span>
                <span className="stop">{i === 0 && !town ? `${tr.you}: ${s}` : s}</span>
              </li>
            ))}
          </ol>

          {route.unknown ? (
            <p className="route-info">{tr.unknown}</p>
          ) : (
            <>
              {route.bus && (
                <div className="route-info">
                  <Bus size={18} />
                  <div>
                    <b>{tr.bus}</b>
                    <p>{route.bus}</p>
                  </div>
                </div>
              )}
              {route.train && (
                <div className="route-info">
                  <TrainFront size={18} />
                  <div>
                    <b>{tr.train}</b>
                    <p>{tr.trainTxt}</p>
                  </div>
                </div>
              )}
            </>
          )}
          <div className="route-info">
            <Footprints size={18} />
            <div>
              <b>{tr.last}</b>
              <p>{lang === "ta" ? T.lastMileTa : T.lastMileEn}</p>
            </div>
          </div>

          <div className="route-actions">
            <a className="btn" href={gm("transit", origin)} target="_blank" rel="noreferrer">
              <Bus size={15} /> {tr.gmTransit}
            </a>
            <a className="btn ghost" href={gm("driving", origin)} target="_blank" rel="noreferrer">
              <Car size={15} /> {tr.gmDrive}
            </a>
          </div>
        </div>
      )}

      <div className="travel-foot">
        <a className="btn ghost" href={gm("driving", "")} target="_blank" rel="noreferrer">
          <LocateFixed size={15} /> {tr.myLocation}
        </a>
        <a
          className="btn ghost"
          href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(DEST.temple)}&destination=${encodeURIComponent(DEST.hall)}`}
          target="_blank"
          rel="noreferrer"
        >
          <MapPin size={15} /> {tr.between}
        </a>
      </div>
    </section>
  );
}
