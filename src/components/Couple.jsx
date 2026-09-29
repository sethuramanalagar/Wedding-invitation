import { useState } from "react";
import { wedding } from "../config/wedding.js";
import { asset, fullName } from "../utils/asset.js";
import { Lotus, Medallion } from "./Ornaments.jsx";

export default function Couple() {
  const { groom, bride, coupleImage } = wedding;
  const [hasImage, setHasImage] = useState(Boolean(coupleImage));
  const [loaded, setLoaded] = useState(false);

  return (
    <section className="section couple" id="couple" aria-labelledby="couple-title">
      <div className="container">
        <h2 id="couple-title" className="couple__title reveal" tabIndex={-1}>
          <span className="script">{groom.firstName}</span>
          <span className="couple__amp" aria-label="and">&amp;</span>
          <span className="script">{bride.firstName}</span>
        </h2>

        <figure className="couple__photo reveal">
          <div className="couple__arch">
            {hasImage && (
              <img
                src={asset(coupleImage)}
                alt={`${groom.firstName} and ${bride.firstName}`}
                loading="lazy"
                decoding="async"
                className={loaded ? "is-loaded" : ""}
                onLoad={() => setLoaded(true)}
                onError={() => setHasImage(false)}
              />
            )}
            {(!hasImage || !loaded) && (
              <div className="couple__placeholder" aria-hidden="true">
                <Medallion className="couple__medallion" />
                <span className="couple__monogram">
                  {groom.firstName.charAt(0)}
                  <em>&amp;</em>
                  {bride.firstName.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </figure>

        <div className="couple__people">
          <div className="person reveal">
            <p className="person__role">The Groom</p>
            <p className="person__name">{fullName(groom)}</p>
          </div>
          <Lotus className="couple__lotus reveal" />
          <div className="person reveal">
            <p className="person__role">The Bride</p>
            <p className="person__name">{fullName(bride)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
