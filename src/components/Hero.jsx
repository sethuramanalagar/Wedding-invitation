import { useLang } from "../i18n.jsx";
import { wedding } from "../config/wedding.js";
import { showerFlowers } from "./FlowerShower.jsx";
import { asset } from "../utils/helpers.js";
import { Toran, Bell, ArchBorder, archMask, Divider, Diya, MonogramBadge } from "./Ornaments.jsx";

export default function Hero() {
  const { t } = useLang();
  const { groom, bride, hero } = t;
  return (
    <section className="hero" id="top">
      <div className="hero-petals" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, i) => (
          <i key={i} style={{ "--i": i, left: `${(i * 37) % 100}%`, animationDelay: `${-(i * 1.7) % 14}s`, animationDuration: `${10 + (i % 5) * 2}s` }} />
        ))}
      </div>
      <Toran />
      <Bell className="bell bell-l" />
      <Bell className="bell bell-r" />

      <p className="eyebrow tamil reveal">
        {t.house} · {t.heading}
      </p>
      <MonogramBadge className="reveal" a={wedding.monogram[0]} b={wedding.monogram[1]} onClick={showerFlowers} />
      <h1 className="hero-names reveal">
        <span className="script nick gold-foil">{groom.short}</span>
        <span className="hero-weds">{t.weds}</span>
        <span className="script nick gold-foil">{bride.short}</span>
      </h1>

      <div className="portrait reveal">
        <div className="portrait-halo" aria-hidden="true" />
        <div className="portrait-frame">
          <picture>
            <source
              type="image/webp"
              srcSet={`${asset("images/couple-sm.webp")} 682w, ${asset("images/couple.webp")} 1364w`}
              sizes="(max-width: 480px) 82vw, 360px"
            />
            <img
              src={asset("images/couple.jpg")}
              alt={`${groom.name} & ${bride.name}`}
              style={{ WebkitMaskImage: archMask, maskImage: archMask }}
              fetchPriority="high"
            />
          </picture>
          <div className="portrait-tint" aria-hidden="true" style={{ WebkitMaskImage: archMask, maskImage: archMask }} />
          <div className="portrait-shine" aria-hidden="true" style={{ WebkitMaskImage: archMask, maskImage: archMask }} />
          <ArchBorder className="arch-b1" />
          <ArchBorder className="arch-b2" />
          <ArchBorder className="arch-chase" chase />
        </div>
        <Diya className="hero-diya l" />
        <Diya className="hero-diya r" />
      </div>

      <div className="hero-full tamil reveal">
        <p>
          {groom.name}, <small>{groom.degree}</small>
        </p>
        <span className="amp">&amp;</span>
        <p>
          {bride.name}, <small>{bride.degree}</small>
        </p>
      </div>

      <Divider />

      <div className="date-ribbon tamil reveal">
        <span>{hero.ribbon[0]}</span>
        <strong>{hero.ribbon[1]}</strong>
        <span>{hero.ribbon[2]}</span>
      </div>
      <p className="tamil hero-tamil-date">{hero.dateLine}</p>

      <a href="#invitation" className="scroll-cue" aria-label="Scroll">
        <span />
      </a>
    </section>
  );
}
