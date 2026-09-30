/** Extract the video id from any common YouTube link (or a bare id). */
export function youtubeId(url = "") {
  const m =
    url.match(/[?&]v=([\w-]{11})/) ||
    url.match(/youtu\.be\/([\w-]{11})/) ||
    url.match(/\/(?:embed|shorts|live)\/([\w-]{11})/) ||
    url.match(/^([\w-]{11})$/);
  return m ? m[1] : null;
}

let apiPromise = null;

/** Load the official YouTube IFrame Player API once (rejects after a timeout). */
export function loadYouTubeApi(timeout = 9000) {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      apiPromise = null;
      reject(new Error("YouTube API timed out"));
    }, timeout);
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      clearTimeout(timer);
      prev?.();
      resolve(window.YT);
    };
    const s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    s.async = true;
    s.onerror = () => {
      clearTimeout(timer);
      apiPromise = null;
      reject(new Error("YouTube API blocked"));
    };
    document.head.appendChild(s);
  });
  return apiPromise;
}
