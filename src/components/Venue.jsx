import { MapPin } from "lucide-react";
import { wedding } from "../config/wedding.js";
import { KolamDivider } from "./Ornaments.jsx";

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

/** Venue name + place, or a graceful "to be announced". */
export function VenueLines({ event }) {
  if (!event.venue) {
    return <p className="venue-lines venue-lines--pending">Venue to be announced</p>;
  }
  return (
    <address className="venue-lines">
      <span className="venue-lines__name">{event.venue}</span>
      {event.address && <span className="venue-lines__place">{event.address}</span>}
      {event.location && <span className="venue-lines__place">{event.location}</span>}
    </address>
  );
}

const VENUES = [
  { key: "reception", label: "Reception" },
  { key: "marriage", label: "The Wedding" },
  { key: "postWedding", label: "Post-Wedding" },
];

export default function Venue() {
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
                <MapsButton event={event} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
