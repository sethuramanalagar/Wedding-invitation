import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "../i18n.jsx";
import { galleryPhotos } from "../utils/helpers.js";
import { Divider } from "./Ornaments.jsx";

const photos = galleryPhotos();

export default function Gallery() {
  const { t } = useLang();
  const [i, setI] = useState(0);
  const touch = useRef(null);
  const n = photos.length;

  useEffect(() => {
    if (n < 2) return;
    const id = setInterval(() => setI((x) => (x + 1) % n), 4500);
    return () => clearInterval(id);
  }, [n, i]);

  if (n < 2) return null; // the main couple photo is already shown at the top
  const go = (d) => setI((x) => (x + d + n) % n);

  return (
    <section className="section gallery" id="moments">
      <p className="eyebrow tamil">{t.galleryEyebrow}</p>
      <h2 className="section-title tamil">{t.galleryTitle}</h2>
      <Divider />
      <div
        className="gal-frame reveal"
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touch.current == null) return;
          const dx = e.changedTouches[0].clientX - touch.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touch.current = null;
        }}
      >
        {photos.map((p, k) => (
          <figure key={p.src} className={`gal-slide ${k === i ? "on" : ""}`} aria-hidden={k !== i} style={{ "--bg": `url("${p.src}")` }}>
            <img src={p.src} alt={p.alt} loading="lazy" />
            {p.credit && <figcaption>📷 {p.credit}</figcaption>}
          </figure>
        ))}
        {n > 1 && (
          <>
            <button className="gal-nav l" onClick={() => go(-1)} aria-label="Previous photo">
              <ChevronLeft />
            </button>
            <button className="gal-nav r" onClick={() => go(1)} aria-label="Next photo">
              <ChevronRight />
            </button>
          </>
        )}
      </div>
      {n > 1 && (
        <div className="gal-dots">
          {photos.map((p, k) => (
            <button key={p.src} className={k === i ? "on" : ""} onClick={() => setI(k)} aria-label={`Photo ${k + 1}`} />
          ))}
        </div>
      )}
    </section>
  );
}
