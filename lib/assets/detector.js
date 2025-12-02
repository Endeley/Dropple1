export function detectType(fileName = "", mime = "") {
  const name = fileName.toLowerCase();
  const m = mime.toLowerCase();
  if (m.includes("svg") || name.endsWith(".svg")) return "vector";
  if (m.includes("pdf") || name.endsWith(".pdf")) return "vector";
  if (m.includes("png") || m.includes("jpg") || m.includes("jpeg") || m.includes("webp") || name.match(/\.(png|jpg|jpeg|webp)$/))
    return "image";
  if (m.includes("mp4") || m.includes("mov") || m.includes("webm") || name.match(/\.(mp4|mov|webm)$/)) return "video";
  if (m.includes("mp3") || m.includes("wav") || name.match(/\.(mp3|wav)$/)) return "audio";
  if (m.includes("woff2") || m.includes("woff") || m.includes("ttf") || m.includes("otf") || name.match(/\.(woff2|woff|ttf|otf)$/))
    return "font";
  return "unknown";
}
