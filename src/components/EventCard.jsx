import { Clock } from "lucide-react";
import { wedding } from "../config/wedding.js";
import { MapsButton, VenueLines } from "./Venue.jsx";

/**
 * One stage of the wedding journey.
 * `mood` sets the atmosphere: "evening" | "predawn" | "morning".
 */
export default function EventCard({ eventKey, mood, Icon, featured = false, kicker }) {
  const event = wedding[eventKey];
  const headingId = `event-${eventKey}`;

  return (
    <article
      className={`event-card event-card--${mood} ${featured ? "event-card--featured" : ""} reveal`}
      aria-labelledby={headingId}
    >
      {featured && <div className="event-card__arch" aria-hidden="true" />}

      <div className="event-card__icon">
        <Icon />
      </div>

      {kicker && <p className="event-card__kicker">{kicker}</p>}
      <h3 id={headingId} className="event-card__title">
        {event.title}
      </h3>

      <p className="event-card__date">
        <time dateTime={event.date}>{event.displayDate}</time>
      </p>
      <p className="event-card__time">
        <Clock size={15} strokeWidth={1.6} aria-hidden="true" />
        {event.displayTime}
      </p>

      {event.description && eventKey !== "marriage" && (
        <p className="event-card__desc">{event.description}</p>
      )}

      {(event.venue || wedding.text.venues.pending) && (
        <div className="event-card__venue">
          <VenueLines event={event} />
        </div>
      )}

      <MapsButton event={event} placeholderWhenPending />
    </article>
  );
}
