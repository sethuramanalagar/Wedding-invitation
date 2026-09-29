import { useState } from "react";
import { Map as MapIcon, MapPin, Navigation, Route } from "lucide-react";
import { wedding } from "../config/wedding.js";
import { KolamDivider } from "./Ornaments.jsx";

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

/** Lightweight map: the Google iframe loads only when the guest asks. */
function MapEmbed({ event }) {
  const [show, setShow] = useState(false);
  const query = placeQuery(event);
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
    <button type="button" className="map-embed map-embed--idle" onClick={() => setShow(true)}>
      <MapIcon size={22} strokeWidth={1.4} aria-hidden="true" />
      <span>Tap to show map</span>
    </button>
  );
}

const VENUES = [
  { key: "reception", label: "Reception" },
  { key: "marriage", label: "The Wedding" },
  { key: "postWedding", label: "Post-Wedding" },
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
          {VENUES.map(({ key, label }) => {
            const event = wedding[key];
            return (
              <article
                className={`venue-card reveal ${key === "marriage" ? "venue-card--featured" : ""}`}
                key={key}
              >
                <p className="venue-card__label">{label}</p>
                <p className="venue-card__when">
                  {event.shortDate} · {event.displayTime}
                </p>
                <MapPin className="venue-card__pin" size={20} strokeWidth={1.4} aria-hidden="true" />
                <VenueLines event={event} />
                <MapEmbed event={event} />
                {event.venue && (
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
                )}
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
