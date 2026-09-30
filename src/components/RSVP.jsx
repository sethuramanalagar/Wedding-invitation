import { MessageCircle, Phone } from "lucide-react";
import { wedding } from "../config/wedding.js";
import { KolamDivider } from "./Ornaments.jsx";

export default function RSVP() {
  const { rsvp } = wedding;
  if (!rsvp?.enabled || (!rsvp.phone && !rsvp.whatsapp)) return null;

  const waNumber = rsvp.whatsapp.replace(/\D/g, "");
  const waText = encodeURIComponent(
    `Hello! I'm writing to confirm my presence at the wedding of ${wedding.groom.firstName} & ${wedding.bride.firstName}.`,
  );

  return (
    <section className="section rsvp" id="rsvp" aria-labelledby="rsvp-title">
      <div className="container container--narrow">
        <h2 id="rsvp-title" className="section-title reveal">
          {wedding.text.rsvp.title}
        </h2>
        <KolamDivider className="reveal" />
        <div className="share__actions reveal">
          {rsvp.phone && (
            <a className="btn btn--outline" href={`tel:${rsvp.phone.replace(/[^\d+]/g, "")}`}>
              <Phone size={17} strokeWidth={1.6} aria-hidden="true" />
              {wedding.text.rsvp.call}
            </a>
          )}
          {waNumber && (
            <a
              className="btn btn--solid"
              href={`https://wa.me/${waNumber}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={17} strokeWidth={1.6} aria-hidden="true" />
              {wedding.text.rsvp.whatsapp}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
