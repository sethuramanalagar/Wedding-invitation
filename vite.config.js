import fs from "node:fs";
import path from "node:path";
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

/**
 * `virtual:media` — lists every file in public/music and public/images at
 * build time, so the site plays ALL music and shows ALL photos in those
 * folders without editing any code. In dev, adding/removing a file reloads.
 */
function mediaManifest() {
  const VID = "virtual:media";
  const RID = "\0virtual:media";
  const DIRS = {
    music: ["public/music", /\.(mp3|m4a|aac|ogg|oga|opus|wav|flac|webm)$/i],
    images: ["public/images", /\.(jpe?g|png|webp|avif|gif)$/i],
  };
  const list = ([dir, re]) => {
    try {
      return fs
        .readdirSync(path.resolve(dir))
        .filter((f) => re.test(f) && !f.startsWith("."))
        .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    } catch {
      return [];
    }
  };
  return {
    name: "wedding-media",
    resolveId(id) {
      if (id === VID) return RID;
    },
    load(id) {
      if (id !== RID) return;
      return `export const music = ${JSON.stringify(list(DIRS.music))};\nexport const images = ${JSON.stringify(list(DIRS.images))};`;
    },
    configureServer(server) {
      const dirs = Object.values(DIRS).map(([d]) => path.resolve(d));
      server.watcher.add(dirs);
      const onChange = (file) => {
        if (!dirs.some((d) => file.startsWith(d))) return;
        const mod = server.moduleGraph.getModuleById(RID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: "full-reload" });
      };
      server.watcher.on("add", onChange);
      server.watcher.on("unlink", onChange);
    },
  };
}

// base: "./" makes the build work at a domain root (Vercel/Netlify)
// and inside a sub-folder (GitHub Pages) without changes.
export default defineConfig({
  base: "./",
  plugins: [react(), weddingMeta(), mediaManifest()],
});
