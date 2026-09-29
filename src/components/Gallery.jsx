import { useEffect, useRef, useState } from "react";
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { wedding } from "../config/wedding.js";
import { asset } from "../utils/asset.js";
import { KolamDivider, Petals, Sparkles } from "./Ornaments.jsx";

/** "Our Moments" — royal animated photo slideshow (auto-plays, swipeable). */
export default function Gallery() {
  const photos = wedding.gallery || [];
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef(null);
  const n = photos.length;

  useEffect(() => {
    if (n < 2 || paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % n), 5200);
    return () => clearInterval(id);
  }, [n, paused]);

  if (!n) return null;
  const go = (d) => {
    setPaused(true);
    setI((v) => (v + d + n) % n);
  };

  return (
    <section className="section gallery" id="moments" aria-labelledby="moments-title">
      <div className="gallery__velvet" aria-hidden="true" />
      <Sparkles count={14} />
      <div className="container">
        <p className="eyebrow reveal">Captured with love</p>
        <h2 id="moments-title" className="section-title reveal">
          <span className="script foil gallery__title">Our Moments</span>
        </h2>
        <KolamDivider className="reveal" />

        <div
          className="gallery__frame reveal"
          onPointerDown={(e) => (startX.current = e.clientX)}
          onPointerUp={(e) => {
            if (startX.current == null) return;
            const dx = e.clientX - startX.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            startX.current = null;
          }}
          role="region"
          aria-roledescription="carousel"
          aria-label="Photo gallery"
        >
          {photos.map((p, k) => (
            <figure
              key={p.src}
              className={`gallery__slide ${k === i ? "is-active" : ""}`}
              aria-hidden={k !== i}
            >
              <img src={asset(p.src)} alt={p.alt || ""} loading="lazy" decoding="async" draggable="false" />
              {p.credit && (
                <figcaption className="gallery__credit">
                  <Camera size={11} strokeWidth={1.8} aria-hidden="true" /> {p.credit}
                </figcaption>
              )}
            </figure>
          ))}
          <span className="gallery__shine" aria-hidden="true" />
          <Petals count={6} />
          <span className="gallery__corner gallery__corner--tl" aria-hidden="true" />
          <span className="gallery__corner gallery__corner--tr" aria-hidden="true" />
          <span className="gallery__corner gallery__corner--bl" aria-hidden="true" />
          <span className="gallery__corner gallery__corner--br" aria-hidden="true" />
          {n > 1 && (
            <>
              <button type="button" className="gallery__nav gallery__nav--prev" onClick={() => go(-1)} aria-label="Previous photo">
                <ChevronLeft size={20} />
              </button>
              <button type="button" className="gallery__nav gallery__nav--next" onClick={() => go(1)} aria-label="Next photo">
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {n > 1 && (
          <div className="gallery__thumbs reveal">
            {photos.map((p, k) => (
              <button
                key={p.src}
                type="button"
                className={`gallery__thumb ${k === i ? "is-active" : ""}`}
                onClick={() => {
                  setPaused(true);
                  setI(k);
                }}
                aria-label={`Show photo ${k + 1}`}
              >
                <img src={asset(p.src)} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
