import { useState } from "react";
import { wedding } from "../config/wedding.js";
import { asset, fullName } from "../utils/asset.js";
import { archMask, cuspedArch } from "../utils/arch.js";
import { Lantern, Lotus, Medallion, Petals, Sparkles, Toran } from "./Ornaments.jsx";

/** Image that reports whether it loaded, and disappears if missing. */
function SafeImage({ src, alt, className = "", onReady, eager = false }) {
  const [ok, setOk] = useState(Boolean(src));
  const [loaded, setLoaded] = useState(false);
  if (!ok) return null;
  return (
    <img
      src={asset(src)}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={`${className} ${loaded ? "is-loaded" : ""}`}
      onLoad={() => {
        setLoaded(true);
        onReady?.(true);
      }}
      onError={() => {
        setOk(false);
        onReady?.(false);
      }}
    />
  );
}

function Portrait({ person, image, role }) {
  const [ready, setReady] = useState(false);
  return (
    <div className="person reveal">
      <div className={`portrait ${ready ? "has-photo" : ""}`}>
        <span className="portrait__ring" aria-hidden="true" />
        <div className="portrait__img">
          <SafeImage src={image} alt={person.firstName} onReady={setReady} />
          {!ready && (
            <span className="portrait__initial" aria-hidden="true">
              {person.firstName.charAt(0)}
            </span>
          )}
        </div>
      </div>
      <p className="person__role">{role}</p>
      <p className="person__name">{fullName(person)}</p>
    </div>
  );
}

const STAGE_MASK = archMask(125, { spring: 46, apex: 2, lobes: 5, bulge: 2.6 });
const FRAME_OUTER = cuspedArch({ spring: 46, apex: 2, bottom: 125, lobes: 5, bulge: 2.6 });
const FRAME_INNER = cuspedArch({ x0: 3.5, x1: 96.5, spring: 47, apex: 5.2, bottom: 121.5, lobes: 5, bulge: 2.3 });

export default function Couple() {
  const { groom, bride, coupleCutout, coupleImage, groomImage, brideImage } = wedding;
  const [cutout, setCutout] = useState(null); // null = loading, true / false
  const [photo, setPhoto] = useState(null);
  const names = `${groom.firstName} and ${bride.firstName}`;
  const showFallbackPhoto = cutout === false;
  const showMonogram = cutout === false && photo === false;

  return (
    <section className="section couple" id="couple" aria-labelledby="couple-title">
      <div className="couple__velvet" aria-hidden="true" />
      <div className="container">
        <h2 id="couple-title" className="couple__title reveal" tabIndex={-1}>
          <span className="script foil">{groom.firstName}</span>
          <span className="couple__amp" aria-label="and">&amp;</span>
          <span className="script foil">{bride.firstName}</span>
        </h2>

        <figure className="stage reveal">
          <div className="stage__rays" aria-hidden="true" />
          <Medallion className="stage__halo" />
          <Lantern className="stage__lantern stage__lantern--l" chain={60} />
          <Lantern className="stage__lantern stage__lantern--r" chain={40} />
          <Toran className="stage__toran" />

          <div className="stage__arch" style={{ WebkitMaskImage: STAGE_MASK, maskImage: STAGE_MASK }}>
            <div className="stage__backdrop" aria-hidden="true" />
            <div className="stage__spot" aria-hidden="true" />
            <Medallion className="stage__mandala" />

            {!showFallbackPhoto && (
              <SafeImage src={coupleCutout} alt={names} className="stage__couple" onReady={setCutout} eager />
            )}
            {showFallbackPhoto && (
              <SafeImage src={coupleImage} alt={names} className="stage__photo" onReady={setPhoto} />
            )}
            {showMonogram && (
              <span className="stage__monogram" aria-hidden="true">
                {groom.firstName.charAt(0)}
                <em>&amp;</em>
                {bride.firstName.charAt(0)}
              </span>
            )}

            <div className="stage__floor" aria-hidden="true" />
            <Sparkles count={16} className="stage__sparkles" />
            <Petals count={7} />
            <span className="stage__shine" aria-hidden="true" />
          </div>

          <svg className="stage__frame" viewBox="0 0 100 125" preserveAspectRatio="none" aria-hidden="true">
            <path d={FRAME_OUTER} />
            <path d={FRAME_INNER} className="stage__frame-inner" />
          </svg>
        </figure>

        <div className="couple__people">
          <Portrait person={groom} image={groomImage} role="The Groom" />
          <Lotus className="couple__lotus reveal" />
          <Portrait person={bride} image={brideImage} role="The Bride" />
        </div>
      </div>
    </section>
  );
}
