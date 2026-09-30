import { useEffect, useState } from "react";
import { Check, Link2, MessageCircle, Share2 } from "lucide-react";
import { wedding } from "../config/wedding.js";
import { Lotus } from "./Ornaments.jsx";

function pageUrl() {
  if (wedding.site.url) return wedding.site.url;
  const { origin, pathname } = window.location;
  return origin + pathname;
}

async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to legacy copy */
  }
  // Fallback for older / in-app browsers
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  ta.remove();
  return ok;
}

export default function ShareButton() {
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    // Phones & tablets: touch pointer, or a narrow screen as a fallback.
    const mq = window.matchMedia("(pointer: coarse), (max-width: 700px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    setCanShare(typeof navigator.share === "function");
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const url = pageUrl();
  const message = wedding.share.message;

  const onNativeShare = async () => {
    try {
      await navigator.share({ title: wedding.site.title, text: message, url });
    } catch (err) {
      // User cancelled — nothing to do. Any other failure → copy link.
      if (err && err.name !== "AbortError") onCopy();
    }
  };

  const onCopy = async () => {
    const ok = await copyText(url);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${message}\n${url}`)}`;

  return (
    <section className="section share" id="share" aria-labelledby="share-title">
      <div className="container container--narrow">
        <Lotus className="share__lotus reveal" />
        <h2 id="share-title" className="section-title reveal">
          {wedding.text.share.title}
        </h2>
        <p className="share__text reveal">
          {wedding.text.share.text}
        </p>

        <div className="share__actions reveal">
          {isMobile && canShare && (
            <button type="button" className="btn btn--solid" onClick={onNativeShare}>
              <Share2 size={17} strokeWidth={1.6} aria-hidden="true" />
              {wedding.text.share.native}
            </button>
          )}
          {isMobile && (
            <a
              className="btn btn--outline"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={17} strokeWidth={1.6} aria-hidden="true" />
              {wedding.text.share.whatsapp}
            </a>
          )}
          <button
            type="button"
            className={`btn ${isMobile ? "btn--ghost" : "btn--solid"}`}
            onClick={onCopy}
          >
            {copied ? (
              <Check size={17} strokeWidth={1.8} aria-hidden="true" />
            ) : (
              <Link2 size={17} strokeWidth={1.6} aria-hidden="true" />
            )}
            {copied ? wedding.text.share.copied : wedding.text.share.copy}
          </button>
        </div>
        <p className="sr-only" role="status" aria-live="polite">
          {copied ? "Invitation link copied to clipboard" : ""}
        </p>
      </div>
    </section>
  );
}
