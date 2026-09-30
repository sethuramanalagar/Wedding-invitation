import { wedding } from "../config/wedding.js";
import { Kalasam, KolamDivider, Lantern } from "./Ornaments.jsx";

/** Decorative side panels shown beside the phone-width invitation on wide screens. */
export default function DesktopAside() {
  const { groom, bride, opening, marriage } = wedding;
  return (
    <>
      <aside className="desk-aside desk-aside--l" aria-hidden="true">
        <Lantern chain={30} />
        <p className="desk-aside__names">
          {groom.firstName}
          <br />
          <em className="desk-aside__amp">&amp;</em> {bride.firstName}
        </p>
        <KolamDivider />
        <p className="desk-aside__date">{opening.displayDate}</p>
      </aside>
      <aside className="desk-aside desk-aside--r" aria-hidden="true">
        <Kalasam className="desk-aside__kalasam" />
        <p className="desk-aside__big">{marriage.venue}</p>
        <p className="desk-aside__note">{marriage.displayTime}</p>
        <KolamDivider />
        <p className="desk-aside__note">{wedding.text.desktop.note}</p>
      </aside>
    </>
  );
}
