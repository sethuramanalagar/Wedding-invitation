import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { wedding } from "./src/config/wedding.js";

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/**
 * Injects <title>, description, Open Graph & Twitter tags from the
 * wedding config — so link previews (WhatsApp, etc.) always match it.
 * WhatsApp needs an ABSOLUTE image URL: set `site.url` in wedding.js
 * once you know your final address.
 */
function weddingMeta() {
  return {
    name: "wedding-meta",
    transformIndexHtml(html) {
      const { title, description, url, ogImage } = wedding.site;
      const base = url ? url.replace(/\/$/, "") : "";
      const image = base ? `${base}/${ogImage.replace(/^\//, "")}` : `.${ogImage}`;
      const tags = [
        `<title>${esc(title)}</title>`,
        `<meta name="description" content="${esc(description)}" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:title" content="${esc(title)}" />`,
        `<meta property="og:description" content="${esc(description)}" />`,
        `<meta property="og:image" content="${esc(image)}" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        `<meta property="og:image:alt" content="${esc(title)}" />`,
        base ? `<meta property="og:url" content="${esc(base)}/" />` : "",
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${esc(title)}" />`,
        `<meta name="twitter:description" content="${esc(description)}" />`,
        `<meta name="twitter:image" content="${esc(image)}" />`,
      ].filter(Boolean);
      return html.replace("<!--wedding-meta-->", tags.join("\n    "));
    },
  };
}

// base: "./" makes the build work at a domain root (Vercel/Netlify)
// and inside a sub-folder (GitHub Pages) without changes.
export default defineConfig({
  base: "./",
  plugins: [react(), weddingMeta()],
});
