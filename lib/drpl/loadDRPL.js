"use server";

let zipModule = null;

async function getJSZip() {
  if (zipModule) return zipModule;
  try {
    const mod = await import("jszip");
    zipModule = mod.default || mod;
    return zipModule;
  } catch (err) {
    throw new Error("JSZip is required to load .drpl files. Please add the 'jszip' dependency.");
  }
}

const parseJSONFile = async (zip, path, fallback = {}) => {
  const file = zip.file(path);
  if (!file) return fallback;
  const raw = await file.async("string");
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
};

const guessMime = (name = "") => {
  if (name.endsWith(".png")) return "image/png";
  if (name.endsWith(".jpg") || name.endsWith(".jpeg")) return "image/jpeg";
  if (name.endsWith(".webp")) return "image/webp";
  if (name.endsWith(".svg")) return "image/svg+xml";
  if (name.endsWith(".mp4")) return "video/mp4";
  if (name.endsWith(".mp3")) return "audio/mpeg";
  if (name.endsWith(".woff2")) return "font/woff2";
  if (name.endsWith(".woff")) return "font/woff";
  return "application/octet-stream";
};

export async function loadDRPL(file) {
  const JSZip = await getJSZip();
  const zip = await JSZip.loadAsync(file);

  const document = await parseJSONFile(zip, "document.json", {});
  const layers = await parseJSONFile(zip, "layers.json", []);
  const styles = await parseJSONFile(zip, "styles.json", {});
  const themes = await parseJSONFile(zip, "themes.json", {});
  const tokens = await parseJSONFile(zip, "tokens.json", {});
  const history = await parseJSONFile(zip, "history.json", {});
  const plugins = await parseJSONFile(zip, "plugins.json", {});

  const assets = {};
  const assetsFolder = zip.folder("assets");
  if (assetsFolder) {
    const files = assetsFolder.filter(() => true);
    for (const fileEntry of files) {
      const base64 = await fileEntry.async("base64");
      const rel = fileEntry.name.replace(/^assets\//, "");
      const mime = guessMime(rel);
      assets[rel] = `data:${mime};base64,${base64}`;
    }
  }

  return { document, layers, styles, themes, tokens, history, plugins, assets };
}
