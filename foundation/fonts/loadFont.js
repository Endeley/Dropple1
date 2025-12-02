export function loadFont(fontFamily, weights = [400]) {
  if (typeof document === "undefined") return;
  const existing = document.querySelector(`link[data-font="${fontFamily}"]`);
  if (existing) return;
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    fontFamily
  )}:wght@${weights.join(";")}&display=swap`;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  link.dataset.font = fontFamily;
  document.head.appendChild(link);
}
