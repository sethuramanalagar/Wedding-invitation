import { CalendarPlus, CalendarHeart } from "lucide-react";
import { wedding } from "../config/wedding.js";
import { coupleSlug, downloadIcs, googleCalendarUrl } from "../utils/calendar.js";
import { KolamDivider } from "./Ornaments.jsx";

const EVENTS = [
  { key: "reception", file: `reception-${coupleSlug}.ics` },
  { key: "marriage", file: `wedding-${coupleSlug}.ics` },
  { key: "postWedding", file: `post-wedding-${coupleSlug}.ics` },
];

/** A single "Add to calendar" control for one event. */
export function CalendarButton({ eventKey, filename }) {
  const event = wedding[eventKey];
  return (
    <div className="cal-item">
      <div className="cal-item__text">
        <p className="cal-item__title">{event.title}</p>
        <p className="cal-item__when">
          {event.shortDate} · {event.displayTime}
        </p>
      </div>
      <div className="cal-item__actions">
        <button
          type="button"
          className="btn btn--solid btn--sm"
          onClick={() => downloadIcs([eventKey], filename)}
          aria-label={`Add ${event.title} to your calendar`}
        >
          <CalendarPlus size={16} strokeWidth={1.6} aria-hidden="true" />
          {wedding.text.calendar.add}
        </button>
        <a
          className="link-subtle"
          href={googleCalendarUrl(eventKey)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {wedding.text.calendar.google}
        </a>
      </div>
    </div>
  );
}

export default function CalendarSection() {
  return (
    <section className="section calendar" id="calendar" aria-labelledby="calendar-title">
      <div className="container container--narrow">
        <p className="eyebrow reveal">{wedding.text.calendar.eyebrow}</p>
        <h2 id="calendar-title" className="section-title reveal">
          {wedding.text.calendar.title}
        </h2>
        <KolamDivider className="reveal" />

        <div className="cal-list reveal">
          {EVENTS.map((e) => (
            <CalendarButton key={e.key} eventKey={e.key} filename={e.file} />
          ))}
        </div>

        <div className="cal-all reveal">
          <button
            type="button"
            className="btn btn--outline"
            onClick={() =>
              downloadIcs(
                EVENTS.map((e) => e.key),
                `${coupleSlug}-wedding.ics`,
              )
            }
          >
            <CalendarHeart size={17} strokeWidth={1.6} aria-hidden="true" />
            {wedding.text.calendar.addAll}
          </button>
        </div>
      </div>
    </section>
  );
}
