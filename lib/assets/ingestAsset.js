import { detectType } from "./detector";
import { extractMetadata } from "./metadataExtractor";
import { aiTagAsset } from "./aiTagger";
import { storeAsset } from "./storage";

export async function ingestAsset(file) {
  const type = detectType(file.name, file.type);
  const meta = extractMetadata({
    fileName: file.name,
    mime: file.type,
    size: file.size,
    width: file.width,
    height: file.height,
  });
  const tagged = await aiTagAsset(meta);
  const stored = await storeAsset({
    ...tagged,
    type,
    originalName: file.name,
    buffer: file.buffer,
  });
  return stored;
}
