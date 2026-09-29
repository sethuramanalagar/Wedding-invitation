import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import Hero from "./components/Hero.jsx";
import Couple from "./components/Couple.jsx";
import Invitation from "./components/Invitation.jsx";
import Countdown from "./components/Countdown.jsx";
import EventsTimeline from "./components/EventsTimeline.jsx";
import Venue from "./components/Venue.jsx";
import CalendarSection from "./components/CalendarButton.jsx";
import ShareButton from "./components/ShareButton.jsx";
import RSVP from "./components/RSVP.jsx";
import Footer from "./components/Footer.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";

const prefersReducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

/** Reveal `.reveal` elements as they scroll into view (one shared observer). */
function useScrollReveal(active) {
  useEffect(() => {
    if (!active) return;
    const els = Array.from(document.querySelectorAll(".reveal:not(.is-visible)"));
    if (!("IntersectionObserver" in window) || prefersReducedMotion()) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [active]);
}

export default function App() {
  const [opening, setOpening] = useState(false);
  const [opened, setOpened] = useState(false);

  // Keep the page on the cover until the guest opens the invitation.
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("is-locked", !opened);
  }, [opened]);

  useScrollReveal(opened);

  const handleOpen = useCallback(() => {
    if (opening || opened) return;
    const reduced = prefersReducedMotion();
    setOpening(true);
    window.setTimeout(
      () => {
        setOpened(true);
        requestAnimationFrame(() => {
          document
            .getElementById("couple")
            ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
          // Move keyboard / screen-reader focus into the invitation.
          document.getElementById("couple-title")?.focus({ preventScroll: true });
        });
      },
      reduced ? 0 : 900,
    );
  }, [opening, opened]);

  return (
    <>
      <Hero opened={opened} opening={opening} onOpen={handleOpen} />

      <main id="main" className={`page ${opened ? "is-open" : ""}`} inert={!opened}>
        <Couple />
        <Invitation />
        <Countdown />
        <EventsTimeline />
        <Venue />
        <CalendarSection />
        <ShareButton />
        <RSVP />
      </main>

      <div inert={!opened}>
        <Footer />
      </div>
      <MusicPlayer visible={opened} />
    </>
  );
}
