export async function aiTagAsset(metadata) {
  // Placeholder: real impl would call AI to derive tags/description/palette.
  return {
    ...metadata,
    tags: ["auto", "placeholder"],
    description: metadata.description || "Auto-tagged asset",
  };
}
