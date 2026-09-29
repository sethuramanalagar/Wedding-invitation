import { wedding } from "../config/wedding.js";
import { Kalasam, KolamDivider, Petals } from "./Ornaments.jsx";

export default function Footer() {
  const { closing, groom, bride, opening } = wedding;
  return (
    <footer className="closing" aria-labelledby="closing-title">
      <Petals count={6} />
      <div className="container">
        <Kalasam className="closing__kalasam reveal" />
        <h2 id="closing-title" className="closing__lines reveal">
          {closing.lines.map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </h2>
        <KolamDivider className="reveal" />
        <p className="closing__names reveal">
          <span>{groom.firstName}</span>
          <span className="closing__amp" aria-label="and">&amp;</span>
          <span>{bride.firstName}</span>
        </p>
        <p className="closing__date reveal">
          <time dateTime={wedding.marriage.date}>{opening.displayDate}</time>
        </p>
        <a href="#top" className="closing__top">
          Back to top
        </a>
      </div>
    </footer>
  );
}
