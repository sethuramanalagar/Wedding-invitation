import { wedding } from "../config/wedding.js";
import { fullName } from "../utils/asset.js";
import { CornerFlourish, KolamDivider, Lotus } from "./Ornaments.jsx";

export default function Invitation() {
  const { invitation, groom, bride } = wedding;

  return (
    <section className="section invitation" id="invitation" aria-labelledby="invitation-title">
      <div className="container">
        <article className="card-invite reveal">
          <CornerFlourish className="corner corner--tl" />
          <CornerFlourish className="corner corner--tr" />
          <CornerFlourish className="corner corner--bl" />
          <CornerFlourish className="corner corner--br" />

          <Lotus className="card-invite__lotus" />

          <h2 id="invitation-title" className="sr-only">
            Invitation
          </h2>

          <blockquote className="poem">
            {invitation.poem.map((line, i) => (
              <span className="poem__line" style={{ "--d": i }} key={i}>
                {line}
              </span>
            ))}
          </blockquote>

          <KolamDivider />

          <p className="card-invite__lead">{invitation.inviteLine}</p>

          <p className="card-invite__name">{fullName(groom)}</p>
          <p className="card-invite__amp" aria-label="and">&amp;</p>
          <p className="card-invite__name">{fullName(bride)}</p>

          <p className="card-invite__day">
            <time dateTime={wedding.marriage.date}>{invitation.weddingDay}</time>
          </p>
        </article>
      </div>
    </section>
  );
}
