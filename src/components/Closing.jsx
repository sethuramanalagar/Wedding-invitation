import { useMemo, useState } from "react";
import { Share2, Link2, Phone, Check } from "lucide-react";
import { wedding } from "../config/wedding.js";
import { useLang } from "../i18n.jsx";
import { Divider, Diya } from "./Ornaments.jsx";

const { site } = wedding;

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}

export default function Closing() {
  const { t, lang } = useLang();
  const { hosts, closing, ui, groom, bride } = t;
  const [copied, setCopied] = useState(false);

  const base = typeof window !== "undefined" ? site.url || window.location.href.split(/[?#]/)[0] : site.url;
  const url = `${base}?lang=${lang}`;
  const msg = `${closing.shareText}\n${url}`;

  const lanterns = useMemo(
    () => Array.from({ length: 9 }, (_, i) => ({ key: i, left: 6 + i * 11 + Math.random() * 4, delay: -Math.random() * 14, dur: 12 + Math.random() * 8 })),
    [],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: site.title, text: closing.shareText, url });
      } catch {
        /* cancelled */
      }
    } else copy();
  };

  return (
    <>
      <section className="section hosts">
        <p className="eyebrow tamil">{hosts.eyebrow}</p>
        <h2 className="section-title tamil">{hosts.title}</h2>
        <Divider />
        <div className="host-list tamil reveal">
          {hosts.people.map((h) => (
            <div key={h.name} className="host">
              <p className="host-name">{h.name}</p>
              {h.line && <p className="host-line">{h.line}</p>}
            </div>
          ))}
          {hosts.place && <p className="host-place">{hosts.place}</p>}
          {wedding.showPhone && wedding.hostPhone && (
            <a className="btn" href={`tel:${wedding.hostPhone}`}>
              <Phone size={15} /> {ui.call}
            </a>
          )}
        </div>
        <p className="hosts-note tamil">{hosts.note}</p>
      </section>

      <footer className="section velvet closing">
        <div className="velvet-pattern" aria-hidden="true" />
        <div className="lanterns" aria-hidden="true">
          {lanterns.map((l) => (
            <span key={l.key} style={{ left: `${l.left}%`, animationDelay: `${l.delay}s`, animationDuration: `${l.dur}s` }} />
          ))}
        </div>
        <Diya className="close-diya" />
        <p className="tamil close-ta">{closing.line1}</p>
        {closing.line2 && <p className="close-en tamil">{closing.line2}</p>}
        <p className="close-names">
          <span className="script nick gold-foil">{groom.short}</span>
          <span className="close-amp">&amp;</span>
          <span className="script nick gold-foil">{bride.short}</span>
        </p>
        <Divider className="light" />
        <div className="share-row tamil">
          <button className="btn gold" onClick={share}>
            <Share2 size={15} /> {ui.share}
          </button>
          <a className="btn gold" href={`https://wa.me/?text=${encodeURIComponent(msg)}`} target="_blank" rel="noreferrer">
            <WhatsAppIcon /> WhatsApp
          </a>
          <button className="btn gold" onClick={copy}>
            {copied ? <Check size={15} /> : <Link2 size={15} />} {copied ? ui.copied : ui.copy}
          </button>
        </div>
        <p className="fine tamil">{closing.fine}</p>
      </footer>
    </>
  );
}
