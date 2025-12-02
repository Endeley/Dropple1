const loaded = new Set();

export async function lazyLoad(tag, loader) {
  if (loaded.has(tag)) return { ok: true, cached: true };
  await loader();
  loaded.add(tag);
  return { ok: true, cached: false };
}
