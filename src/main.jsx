import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { wedding } from "./config/wedding.js";
import { applyTheme, savedTheme } from "./config/themes.js";

// Self-hosted fonts (Latin subset only) — fast, private, and reliable
// inside WhatsApp's in-app browser.
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/latin-600.css";
import "@fontsource/cormorant-garamond/latin-400-italic.css";
import "@fontsource/cormorant-garamond/latin-500-italic.css";
import "@fontsource/marcellus/latin-400.css";
import "@fontsource/pinyon-script/latin-400.css";
import "./index.css";

// Apply the royal theme before the first paint (no colour flash).
applyTheme(
  wedding.theme?.guestCanChange === false
    ? wedding.theme.default
    : savedTheme(wedding.theme?.default ?? "maharaja"),
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
