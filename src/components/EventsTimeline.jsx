import { wedding } from "../config/wedding.js";
import EventCard from "./EventCard.jsx";
import { DiyaIcon, KolamDivider, LeafIcon, SunriseIcon, TempleIcon } from "./Ornaments.jsx";

function DayMarker({ event }) {
  const [day, month] = event.shortDate.split(" ");
  return (
    <div className="tl-day reveal">
      <time dateTime={event.date} className="tl-day__badge">
        <span className="tl-day__num">{day}</span>
        <span className="tl-day__month">{month}</span>
      </time>
    </div>
  );
}

/**
 * The wedding journey as a vertical timeline. Each stage carries its own
 * atmosphere: warm evening → deep pre-dawn → soft sunrise.
 */
export default function EventsTimeline() {
  const { reception, marriage, postWedding } = wedding;

  return (
    <section className="events" id="events" aria-labelledby="events-title">
      <div className="container events__head">
        <p className="eyebrow reveal">{wedding.text.events.eyebrow}</p>
        <h2 id="events-title" className="section-title reveal">
          {wedding.text.events.title}
        </h2>
        <KolamDivider className="reveal" />
      </div>

      <ol className="timeline">
        <li className="tl-stage tl-stage--evening">
          <div className="container tl-stage__inner">
            <span className="tl-line reveal" aria-hidden="true" />
            <DayMarker event={reception} />
            <EventCard eventKey="reception" mood="evening" Icon={DiyaIcon} kicker={wedding.text.events.receptionKicker} />
          </div>
        </li>

        <li className="tl-stage tl-stage--predawn">
          <div className="container tl-stage__inner">
            <span className="tl-line reveal" aria-hidden="true" />
            <DayMarker event={marriage} />
            <EventCard
              eventKey="marriage"
              mood="predawn"
              Icon={TempleIcon}
              featured
              kicker={wedding.text.events.marriageKicker}
            />
          </div>
        </li>

        <li className="tl-stage tl-stage--morning">
          <div className="container tl-stage__inner">
            <span className="tl-line reveal" aria-hidden="true" />
            <div className="tl-bridge reveal">
              <SunriseIcon className="tl-bridge__icon" />
              <p className="tl-bridge__text">{wedding.text.events.bridge}</p>
              <p className="tl-bridge__time">{postWedding.displayTime}</p>
            </div>
            <EventCard eventKey="postWedding" mood="morning" Icon={LeafIcon} kicker={wedding.text.events.postWeddingKicker} />
          </div>
        </li>
      </ol>
    </section>
  );
}
