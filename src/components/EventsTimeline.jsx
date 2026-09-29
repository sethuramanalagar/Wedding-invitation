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
        <p className="eyebrow reveal">Join us</p>
        <h2 id="events-title" className="section-title reveal">
          Our Wedding Celebrations
        </h2>
        <KolamDivider className="reveal" />
      </div>

      <ol className="timeline">
        <li className="tl-stage tl-stage--evening">
          <div className="container tl-stage__inner">
            <span className="tl-line reveal" aria-hidden="true" />
            <DayMarker event={reception} />
            <EventCard eventKey="reception" mood="evening" Icon={DiyaIcon} kicker="An evening together" />
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
              kicker="The marriage ceremony"
            />
          </div>
        </li>

        <li className="tl-stage tl-stage--morning">
          <div className="container tl-stage__inner">
            <span className="tl-line reveal" aria-hidden="true" />
            <div className="tl-bridge reveal">
              <SunriseIcon className="tl-bridge__icon" />
              <p className="tl-bridge__text">Celebrations continue</p>
              <p className="tl-bridge__time">{postWedding.displayTime}</p>
            </div>
            <EventCard eventKey="postWedding" mood="morning" Icon={LeafIcon} kicker="After the wedding" />
          </div>
        </li>
      </ol>
    </section>
  );
}
