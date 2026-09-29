import { useEffect, useRef, useState } from "react";
import { CalendarDays, Clock, Map as MapIcon, MapPin, Navigation, Route, Sparkles as SparkIcon } from "lucide-react";
import { wedding } from "../config/wedding.js";
import { KolamDivider } from "./Ornaments.jsx";
import { HallArt, ReceptionArt, TempleArt } from "./VenueArt.jsx";

/* ── Google Maps link helpers (no API key needed) ─────────── */
export const mapsDirections = ({ origin = "", destination, mode = "" }) => {
  const p = new URLSearchParams({ api: "1", destination });
  if (origin) p.set("origin", origin);
  if (mode) p.set("travelmode", mode);
  return `https://www.google.com/maps/dir/?${p.toString()}`;
};
const mapsEmbed = (query) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;
export const placeQuery = (event) =>
  event.mapsQuery || [event.venue, event.address || event.location].filter(Boolean).join(", ");

/**
 * "Open in Google Maps" — rendered only when a URL is configured.
 * When the venue itself is still to be announced, an optional disabled
 * placeholder can be shown instead (used on the reception card).
 */
export function MapsButton({ event, placeholderWhenPending = false, className = "" }) {
  if (event.googleMapsUrl) {
    return (
      <a
        className={`btn btn--outline ${className}`}
        href={event.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${event.venue || event.title} in Google Maps (opens in a new tab)`}
      >
        <MapPin size={16} strokeWidth={1.6} aria-hidden="true" />
        Open in Google Maps
      </a>
    );
  }
  if (placeholderWhenPending && !event.venue) {
    return (
      <button type="button" className={`btn btn--outline ${className}`} disabled>
        <MapPin size={16} strokeWidth={1.6} aria-hidden="true" />
        Map coming soon
      </button>
    );
  }
  return null;
}

/** Venue name + place + address, or a graceful "to be announced". */
export function VenueLines({ event }) {
  if (!event.venue) {
    return <p className="venue-lines venue-lines--pending">Venue to be announced</p>;
  }
  return (
    <address className="venue-lines">
      <span className="venue-lines__name">{event.venue}</span>
      {event.location && <span className="venue-lines__place">{event.location}</span>}
      {event.address && <span className="venue-lines__addr">{event.address}</span>}
    </address>
  );
}

/** Map that loads automatically when scrolled near (tap fallback). */
function MapEmbed({ event }) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const query = placeQuery(event);
  useEffect(() => {
    if (!event.venue || show || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [event.venue, show]);
  if (!event.venue) return null;
  return show ? (
    <div className="map-embed">
      <iframe
        title={`Map of ${event.venue}`}
        src={mapsEmbed(query)}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  ) : (
    <button ref={ref} type="button" className="map-embed map-embed--idle" onClick={() => setShow(true)}>
      <MapIcon size={22} strokeWidth={1.4} aria-hidden="true" />
      <span>Show map</span>
    </button>
  );
}

const VENUES = [
  { key: "marriage", label: "The Wedding · Temple", Art: TempleArt },
  { key: "postWedding", label: "Celebrations & Feast · Hall", Art: HallArt },
  { key: "reception", label: "Reception", Art: ReceptionArt },
];

export default function Venue() {
  const { marriage, postWedding } = wedding;
  const templeToHall =
    marriage.venue && postWedding.venue
      ? mapsDirections({ origin: placeQuery(marriage), destination: placeQuery(postWedding) })
      : "";

  return (
    <section className="section venues" id="venues" aria-labelledby="venues-title">
      <div className="container">
        <p className="eyebrow reveal">Where to find us</p>
        <h2 id="venues-title" className="section-title reveal">
          The Venues
        </h2>
        <KolamDivider className="reveal" />

        <div className="venues__grid">
          {VENUES.map(({ key, label, Art }) => {
            const event = wedding[key];
            return (
              <article
                className={`venue-card venue-card--${key} reveal ${key === "marriage" ? "venue-card--featured" : ""}`}
                key={key}
              >
                <div className="venue-card__art">
                  <Art />
                  <p className="venue-card__label">{label}</p>
                </div>
                <div className="venue-card__body">
                  <h3 className="venue-card__name">{event.venue || "Venue to be announced"}</h3>
                  {event.location && event.venue && <p className="venue-card__place">{event.location}</p>}
                  <ul className="venue-facts">
                    <li>
                      <CalendarDays size={16} strokeWidth={1.6} aria-hidden="true" />
                      <span>{event.displayDate}</span>
                    </li>
                    <li>
                      <Clock size={16} strokeWidth={1.6} aria-hidden="true" />
                      <span>{event.displayTime}</span>
                    </li>
                    {event.address && (
                      <li>
                        <MapPin size={16} strokeWidth={1.6} aria-hidden="true" />
                        <span>{event.address}</span>
                      </li>
                    )}
                    {event.description && (
                      <li>
                        <SparkIcon size={16} strokeWidth={1.6} aria-hidden="true" />
                        <span>{event.description}</span>
                      </li>
                    )}
                  </ul>
                  <MapEmbed event={event} />
                  {event.venue ? (
                    <div className="venue-card__actions">
                      <MapsButton event={event} />
                      <a
                        className="btn btn--ghost btn--sm"
                        href={mapsDirections({ destination: placeQuery(event) })}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Navigation size={15} strokeWidth={1.6} aria-hidden="true" />
                        Get directions
                      </a>
                    </div>
                  ) : (
                    <p className="venue-card__tba">Details will be shared soon.</p>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {templeToHall && (
          <div className="venues__link reveal">
            <a className="btn btn--outline" href={templeToHall} target="_blank" rel="noopener noreferrer">
              <Route size={16} strokeWidth={1.6} aria-hidden="true" />
              Route: Temple → Hall
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
