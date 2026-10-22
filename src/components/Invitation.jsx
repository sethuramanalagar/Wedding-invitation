import { useLang } from "../i18n.jsx";
import { Corner, Divider } from "./Ornaments.jsx";

export default function Invitation() {
  const { t } = useLang();
  const { groom, bride, card, invite } = t;
  return (
    <section className="section invitation" id="invitation">
      <div className="paper-card tamil reveal">
        <Corner className="c-tl" />
        <Corner className="c-tr" />
        <Corner className="c-bl" />
        <Corner className="c-br" />

        <p className="inv-house">{t.house}</p>
        <h2 className="inv-heading">{t.heading}</h2>
        <Divider />

        <p className="inv-label">{card.label1}</p>
        <p className="inv-name">
          {groom.name}, <small>{groom.degree}</small>
        </p>
        <p className="inv-amp">❦</p>
        <p className="inv-name">
          {bride.name}, <small>{bride.degree}</small>
        </p>

        <p className="inv-label">{card.label2}</p>
        <p className="inv-value">{card.date}</p>
        <p className="inv-label">{card.label3}</p>
        <p className="inv-value">{card.venue}</p>
      </div>

      <div className="english tamil reveal">
        <h2 className="section-title">{invite.title}</h2>
        <p className="inv-line">{invite.line}</p>
        <p className="inv-en-name">
          {groom.name}
          <small>{groom.degree}</small>
        </p>
        <span className="script inv-with">&amp;</span>
        <p className="inv-en-name">
          {bride.name}
          <small>{bride.degree}</small>
        </p>
        <p className="inv-when">
          {invite.when.split("\n").map((l, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {l}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
