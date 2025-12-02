"use server";

import OpenAI from "openai";
import { buildIndustryPrompt } from "./buildIndustryPrompt";
import { normalizeIndustryCopy } from "./normalizeIndustryCopy";
import { industryPresets } from "./industryPresets";

const openai =
  process.env.OPENAI_API_KEY && typeof OpenAI !== "undefined"
    ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    : null;

const safeJSON = (raw) => {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    const match = `${raw}`.match(/```json([\s\S]*?)```/);
    if (match) {
      try {
        return JSON.parse(match[1]);
      } catch {
        return null;
      }
    }
    return null;
  }
};

const fallbackCopy = (industry) => ({
  copies: [
    {
      headline: "Professional, industry-ready copy",
      subheadline: `Targeted messaging for ${industry || "your brand"}`,
      body: "Modern, concise copy that speaks to your audience with clarity and confidence.",
      cta: "Get Started",
    },
  ],
});

export async function generateIndustryCopy(options = {}) {
  const preset = industryPresets[options.industry] || {};
  const tone = options.tone || preset.tone || "Professional";
  const keywords = Array.isArray(options.keywords)
    ? options.keywords
    : `${options.keywords || ""}`.split(/[,|]/);

  const prompt = buildIndustryPrompt({
    industry: options.industry || "General",
    context: options.context || "Landing Page",
    tone,
    brand_tone: options.brand_tone || preset.tone || "Modern",
    keywords: [...(preset.keywords || []), ...keywords].filter(Boolean),
    count: Math.max(1, Math.min(options.count || 5, 20)),
    language: options.language || "English",
  });

  if (!openai) {
    return normalizeIndustryCopy(fallbackCopy(options.industry));
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You write for specialized industries." },
        { role: "user", content: prompt },
      ],
      temperature: 0.72,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    const normalized = normalizeIndustryCopy(parsed);
    if (normalized.copies?.length) return normalized;
  } catch (err) {
    console.error("Industry Copy Error", err);
  }

  return normalizeIndustryCopy(fallbackCopy(options.industry));
}
