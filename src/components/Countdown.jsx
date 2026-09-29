import { useEffect, useState } from "react";
import { wedding } from "../config/wedding.js";
import { eventStart, splitDuration, weddingPhase } from "../utils/time.js";
import { KolamDivider } from "./Ornaments.jsx";

const target = eventStart(wedding.marriage);
const pad = (n) => String(n).padStart(2, "0");

function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    // Align ticks to the start of each second so the display never skips.
    let id;
    const tick = () => {
      setNow(new Date());
      id = setTimeout(tick, 1000 - (Date.now() % 1000));
    };
    id = setTimeout(tick, 1000 - (Date.now() % 1000));
    return () => clearTimeout(id);
  }, []);
  return now;
}

export default function Countdown() {
  const now = useNow();
  const phase = weddingPhase(now);
  const { days, hours, minutes, seconds } = splitDuration(target - now);

  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <section className="section countdown" id="countdown" aria-labelledby="countdown-title">
      <div className="container">
        <p className="eyebrow reveal">Until the wedding begins</p>
        <h2 id="countdown-title" className="section-title reveal">
          Counting the moments
        </h2>
        <p className="countdown__when reveal">
          {wedding.marriage.displayDate} · {wedding.marriage.displayTime.split("–")[0].trim()}
        </p>

        {phase === "before" ? (
          <div className="countdown__grid reveal" role="timer" aria-live="off">
            {units.map((u) => (
              <div className="countdown__unit" key={u.label}>
                <span className="countdown__value">{u.label === "Days" ? u.value : pad(u.value)}</span>
                <span className="countdown__label">{u.label}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="countdown__message reveal" role="status">
            {phase === "ongoing"
              ? wedding.countdown.begunMessage
              : wedding.countdown.continueMessage}
          </p>
        )}

        <KolamDivider className="countdown__divider" />
        <p className="tz-note">All times are in India Standard Time (IST)</p>
      </div>
    </section>
  );
}
