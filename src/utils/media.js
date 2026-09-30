import { music as musicFiles, images as imageFiles } from "virtual:media";
import { wedding } from "../config/wedding.js";
import { asset } from "./asset.js";

export { musicFiles, imageFiles };

/** "mangala-vadhyam_chennai (1).mp3" → "Mangala Vadhyam Chennai (1)" */
export function prettyName(file = "") {
  return file
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const base = (p = "") => decodeURIComponent(p.split("/").pop() || "");

/**
 * Every audio file in public/music. Files also listed in
 * wedding.music.tracks keep that order and their title / subtitle / credit;
 * the rest follow alphabetically with titles made from their file names.
 */
export function folderTracks() {
  const configured = wedding.music?.tracks || [];
  const byFile = new Map(configured.map((t) => [base(t.src), t]));
  const ordered = [
    ...configured.map((t) => base(t.src)).filter((f) => musicFiles.includes(f)),
    ...musicFiles.filter((f) => !byFile.has(f)),
  ];
  return ordered.map((f) => {
    const meta = byFile.get(f) || {};
    return {
      ...meta,
      title: meta.title || prettyName(f),
      subtitle: meta.subtitle || "",
      src: `/music/${f}`,
      url: asset(`/music/${encodeURIComponent(f)}`),
      kind: "file",
      bundled: false,
    };
  });
}

/** Credits for music files that are actually present. */
export function musicCredits() {
  return folderTracks().filter((t) => t.credit);
}

/**
 * Every photo in public/images, except the site's own graphics
 * (preview image, cut-outs and portraits). Photos listed in
 * wedding.gallery come first and keep their alt text and credit.
 */
export function galleryPhotos() {
  const skip = new Set(
    [wedding.site?.ogImage, wedding.coupleCutout, wedding.groomImage, wedding.brideImage, ...(wedding.galleryExclude || [])]
      .filter(Boolean)
      .map(base),
  );
  const configured = wedding.gallery || [];
  const byFile = new Map(configured.map((g) => [base(g.src), g]));
  const files = imageFiles.filter((f) => !skip.has(f));
  const ordered = [
    ...configured.map((g) => base(g.src)).filter((f) => files.includes(f)),
    ...files.filter((f) => !byFile.has(f)),
  ];
  return ordered.map((f) => {
    const meta = byFile.get(f) || {};
    return {
      ...meta,
      src: `/images/${encodeURIComponent(f)}`,
      alt: meta.alt || `${wedding.groom.firstName} and ${wedding.bride.firstName}`,
      credit: meta.credit || "",
    };
  });
}
