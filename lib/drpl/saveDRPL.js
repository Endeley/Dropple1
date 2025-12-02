"use server";

let zipModule = null;

async function getJSZip() {
  if (zipModule) return zipModule;
  try {
    const mod = await import("jszip");
    zipModule = mod.default || mod;
    return zipModule;
  } catch (err) {
    throw new Error("JSZip is required to save .drpl files. Please add the 'jszip' dependency.");
  }
}

export async function saveDRPL({
  document = {},
  layers = [],
  styles = {},
  themes = {},
  tokens = {},
  history = {},
  plugins = {},
  assets = {},
  output = "uint8array",
} = {}) {
  const JSZip = await getJSZip();
  const zip = new JSZip();

  zip.file("document.json", JSON.stringify(document, null, 2));
  zip.file("layers.json", JSON.stringify(layers, null, 2));
  zip.file("styles.json", JSON.stringify(styles, null, 2));
  zip.file("themes.json", JSON.stringify(themes, null, 2));
  zip.file("tokens.json", JSON.stringify(tokens, null, 2));
  zip.file("history.json", JSON.stringify(history, null, 2));
  zip.file("plugins.json", JSON.stringify(plugins, null, 2));

  const assetsFolder = zip.folder("assets");
  Object.entries(assets || {}).forEach(([relPath, dataUrl]) => {
    if (!assetsFolder || !relPath || !dataUrl) return;
    const base64 = `${dataUrl}`.includes(",") ? dataUrl.split(",")[1] : dataUrl;
    assetsFolder.file(relPath, base64, { base64: true });
  });

  const buffer = await zip.generateAsync({ type: output });
  return buffer;
}
