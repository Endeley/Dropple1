"use server";

import OpenAI from "openai";
import { buildPairedPrompt } from "./buildPairedPrompt";
import { normalizePaired } from "./normalizePaired";

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

const fallbackPaired = (concept = "Brand") => [
  {
    name: `${concept} One`,
    meaning: `${concept} stands for clarity and creative acceleration.`,
    short_slogan: "Design the future.",
    hero_tagline: "Where modern minimalism meets creative power.",
    cta: "Create Something Timeless",
    tone: "Futuristic • Elegant • Creative",
    variants: [`${concept} X`, `${concept} Ultra`, `${concept} Core`, `${concept} Glow`],
    color_themes: ["Violet Bloom", "Neon Fade", "Midnight Prism"],
    brand_story: `${concept} represents clarity, elegance, and creative acceleration in every drop.`,
  },
];

export async function generatePaired(options = {}) {
  const concept = options.concept || "Brand";
  const tone = options.tone || "Futuristic";
  const audience = options.audience || "General";
  const keywords = Array.isArray(options.keywords)
    ? options.keywords
    : `${options.keywords || ""}`.split(/[,|]/);
  const count = Math.max(1, Math.min(options.count || 10, 50));

  const prompt = buildPairedPrompt({ concept, tone, audience, keywords, count });

  if (!openai) {
    return { systems: fallbackPaired(concept) };
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You generate brand naming systems." },
        { role: "user", content: prompt },
      ],
      temperature: 0.72,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    const normalized = normalizePaired(parsed);
    if (normalized.systems?.length) return normalized;
  } catch (err) {
    console.error("Paired Naming Error", err);
  }

  return { systems: fallbackPaired(concept) };
}
