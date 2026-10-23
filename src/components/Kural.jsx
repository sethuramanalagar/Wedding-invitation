import { useLang } from "../i18n.jsx";

/* A self-drawing kolam frame around Thirukkural 45 */
function Kolam() {
  const dots = [];
  for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) dots.push([40 + c * 30, 40 + r * 30]);
  return (
    <svg className="kolam" viewBox="0 0 200 200" aria-hidden="true">
      <g className="kolam-lines" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M100 10 C140 40 160 60 190 100 C160 140 140 160 100 190 C60 160 40 140 10 100 C40 60 60 40 100 10Z" />
        <path d="M100 40 C125 60 140 75 160 100 C140 125 125 140 100 160 C75 140 60 125 40 100 C60 75 75 60 100 40Z" />
        <path d="M55 55 C75 70 85 85 100 100 C115 85 125 70 145 55 M55 145 C75 130 85 115 100 100 C115 115 125 130 145 145" />
        <circle cx="100" cy="100" r="14" />
        <path d="M100 70 C110 85 110 115 100 130 C90 115 90 85 100 70Z M70 100 C85 90 115 90 130 100 C115 110 85 110 70 100Z" />
      </g>
      <g className="kolam-dots" fill="currentColor">
        {dots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.2" style={{ "--i": i }} />
        ))}
      </g>
    </svg>
  );
}

export default function Kural() {
  const { t } = useLang();
  const k = t.kural;
  return (
    <section className="section kural reveal">
      <Kolam />
      <p className="eyebrow tamil">{k.eyebrow}</p>
      <blockquote className="kural-text tamil">
        {k.lines.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </blockquote>
      <p className="kural-note tamil">{k.note}</p>
    </section>
  );
}
