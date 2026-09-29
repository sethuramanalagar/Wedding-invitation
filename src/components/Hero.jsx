import { ChevronDown } from "lucide-react";
import { wedding } from "../config/wedding.js";
import { CornerFlourish, Kalasam, KolamDivider, Petals } from "./Ornaments.jsx";

function HeroName({ person }) {
  return (
    <p className="hero-name">
      <span className="hero-name__main">{person.name}</span>
      {person.qualification && (
        <span className="hero-name__qual">
          <span className="sr-only">, </span>
          {person.qualification}
        </span>
      )}
    </p>
  );
}

export default function Hero({ opened, opening, onOpen }) {
  const { groom, bride, opening: text } = wedding;

  return (
    <header
      className={`hero ${opening ? "is-opening" : ""} ${opened ? "is-opened" : ""}`}
      id="top"
    >
      <div className="hero__pattern" aria-hidden="true" />
      <Petals />

      <div className="hero__frame">
        <CornerFlourish className="corner corner--tl" />
        <CornerFlourish className="corner corner--tr" />
        <CornerFlourish className="corner corner--bl" />
        <CornerFlourish className="corner corner--br" />

        <div className="hero__content">
          <Kalasam className="hero__kalasam anim anim--1" />

          <p className="eyebrow anim anim--2">{text.greeting}</p>

          <h1 className="hero__names">
            <span className="anim anim--3">
              <HeroName person={groom} />
            </span>
            <span className="hero__amp anim anim--4" aria-label="and">
              &amp;
            </span>
            <span className="anim anim--5">
              <HeroName person={bride} />
            </span>
          </h1>

          <KolamDivider className="hero__divider anim anim--6" />

          <p className="hero__date anim anim--6">
            <time dateTime={wedding.marriage.date}>{text.displayDate}</time>
          </p>

          <div className="hero__action anim anim--7">
            {!opened ? (
              <button type="button" className="btn btn--seal" onClick={onOpen}>
                <span className="btn--seal__ring" aria-hidden="true" />
                Open Invitation
              </button>
            ) : (
              <a href="#couple" className="scroll-cue" aria-label="Scroll to the invitation">
                <ChevronDown size={22} strokeWidth={1.5} />
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
