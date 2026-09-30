import { ChevronDown } from "lucide-react";
import { wedding } from "../config/wedding.js";
import { cuspedArch } from "../utils/arch.js";
import { Kalasam, KolamDivider, Lantern, Petals, Sparkles } from "./Ornaments.jsx";

function HeroName({ person }) {
  return (
    <p className="hero-name">
      <span className="hero-name__main foil">{person.name}</span>
      {person.qualification && (
        <span className="hero-name__qual">
          <span className="sr-only">, </span>
          {person.qualification}
        </span>
      )}
    </p>
  );
}

// Palace-arch outlines for the frame top (viewBox 100 × 40)
const ARCH_OUTER = cuspedArch({ x0: 0.5, x1: 99.5, spring: 39.5, apex: 1, lobes: 6, bulge: 1.6 });
const ARCH_INNER = cuspedArch({ x0: 3, x1: 97, spring: 40, apex: 4.2, lobes: 6, bulge: 1.4 });

/**
 * The visual face of the opening screen. Rendered once in the page and,
 * during the opening, twice more as the two halves of the palace doors.
 */
export function HeroFace({ opened = false, onOpen, isStatic = false }) {
  const { groom, bride, opening: text } = wedding;
  return (
    <div className={`hero__inner ${isStatic ? "is-static" : ""}`}>
      <div className="hero__velvet" aria-hidden="true" />
      {!isStatic && <Petals />}
      <Sparkles count={22} />

      <div className="hero__frame">
        <svg className="hero__arch" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
          <path d={ARCH_OUTER} />
          <path d={ARCH_INNER} className="hero__arch-inner" />
        </svg>
        <Lantern className="hero__lantern hero__lantern--l" />
        <Lantern className="hero__lantern hero__lantern--r" chain={30} />

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
              <button type="button" className="btn btn--seal" onClick={onOpen} tabIndex={isStatic ? -1 : 0}>
                <span className="btn--seal__ring" aria-hidden="true" />
                {wedding.text.hero.openButton}
              </button>
            ) : (
              <a href="#couple" className="scroll-cue" aria-label={wedding.text.hero.scrollHint}>
                <ChevronDown size={22} strokeWidth={1.5} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Two palace doors (split copies of the hero) that swing open. */
export function RoyalDoors() {
  return (
    <div className="doors" aria-hidden="true">
      <div className="doors__light" />
      <div className="door door--l">
        <div className="hero hero--door">
          <HeroFace isStatic />
        </div>
        <span className="door__edge" />
      </div>
      <div className="door door--r">
        <div className="hero hero--door">
          <HeroFace isStatic />
        </div>
        <span className="door__edge" />
      </div>
    </div>
  );
}

export default function Hero({ opened, opening, onOpen }) {
  return (
    <header className={`hero ${opening ? "is-opening" : ""} ${opened ? "is-opened" : ""}`} id="top">
      <HeroFace opened={opened} onOpen={onOpen} />
    </header>
  );
}
