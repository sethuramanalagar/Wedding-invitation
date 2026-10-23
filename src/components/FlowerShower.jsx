import { useEffect, useState } from "react";
import { reducedMotion } from "../utils/helpers.js";

/* Full-screen shower of rose petals, marigolds and jasmine.
   Trigger it with:  window.dispatchEvent(new Event("flower-shower"))  */
const KINDS = ["rose", "marigold", "jasmine", "rose", "marigold", "petal"];

export function showerFlowers() {
  window.dispatchEvent(new Event("flower-shower"));
}

export default function FlowerShower() {
  const [waves, setWaves] = useState([]);

  useEffect(() => {
    if (reducedMotion()) return;
    const go = () => {
      const id = Date.now() + Math.random();
      const items = Array.from({ length: 56 }, (_, i) => ({
        k: i,
        kind: KINDS[i % KINDS.length],
        left: Math.random() * 100,
        delay: Math.random() * 2.6,
        dur: 4 + Math.random() * 3,
        size: 0.7 + Math.random() * 0.7,
        drift: (Math.random() - 0.5) * 120,
        rot: Math.random() * 360,
      }));
      setWaves((w) => [...w, { id, items }]);
      setTimeout(() => setWaves((w) => w.filter((x) => x.id !== id)), 8500);
    };
    window.addEventListener("flower-shower", go);
    return () => window.removeEventListener("flower-shower", go);
  }, []);

  return (
    <div className="shower" aria-hidden="true">
      {waves.map((w) =>
        w.items.map((f) => (
          <i
            key={`${w.id}-${f.k}`}
            className={`fl ${f.kind}`}
            style={{
              left: `${f.left}%`,
              animationDelay: `${f.delay}s`,
              animationDuration: `${f.dur}s`,
              "--s": f.size,
              "--dx": `${f.drift}px`,
              "--r": `${f.rot}deg`,
            }}
          />
        )),
      )}
    </div>
  );
}
