"use client";

import { deriveTemplateMetadata } from "./deriveTemplateMetadata";

export async function autoTemplateName(template = {}) {
  const meta = deriveTemplateMetadata(template);

  try {
    const res = await fetch("/api/naming/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "Template",
        tone: meta.tone,
        keywords: meta.keywords,
        language: meta.language || "English",
        count: 12,
      }),
    });

    const data = await res.json();
    if (Array.isArray(data?.results)) return data.results;
    return [];
  } catch (err) {
    console.error("autoTemplateName failed", err);
    return [];
  }
}
