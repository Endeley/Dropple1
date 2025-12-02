const clampScore = (value) => {
  const n = Number(value);
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
};

export function normalizeNames(results = []) {
  const cleaned = [];
  const seen = new Set();

  for (const item of Array.isArray(results) ? results : []) {
    const nm = `${item?.name ?? ""}`.trim();
    if (!nm || nm.length < 2) continue;

    const key = nm.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);

    cleaned.push({
      name: nm,
      meaning: `${item?.meaning ?? item?.description ?? ""}`.trim(),
      tone_match_score: clampScore(item?.tone_match_score ?? item?.toneScore ?? item?.toneMatch),
      memorability_score: clampScore(item?.memorability_score ?? item?.memorability ?? item?.memorabilityScore),
      reasoning: `${item?.reasoning ?? item?.why ?? ""}`.trim(),
      tone: item?.tone || "",
      language: item?.language || "",
    });
  }

  return cleaned;
}
