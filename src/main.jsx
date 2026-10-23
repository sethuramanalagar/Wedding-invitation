import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/latin-600.css";
import "@fontsource/cormorant-garamond/latin-400-italic.css";
import "@fontsource/cinzel/latin-400.css";
import "@fontsource/cinzel/latin-600.css";
import "@fontsource/pinyon-script/latin-400.css";
import "@fontsource/great-vibes/latin-400.css";
import "@fontsource/cinzel-decorative/latin-700.css";
import "@fontsource/noto-serif-tamil/tamil-400.css";
import "@fontsource/noto-serif-tamil/tamil-600.css";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
