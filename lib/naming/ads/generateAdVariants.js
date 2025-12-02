"use server";

import OpenAI from "openai";
import { buildAdPrompt } from "./buildAdPrompt";
import { normalizeAdVariants } from "./normalizeAdVariants";

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

const fallbackAds = (product = "Your Product") =>
  normalizeAdVariants({
    primary_text: [`${product} is here. Experience it.`, `Upgrade with ${product} today.`],
    headlines: [`${product} — Modern`, `Try ${product}`],
    descriptions: ["Premium, fast, and designed for you."],
    hooks: ["See why creators love this.", "Stop scrolling — meet this drop."],
    cta: ["Learn More", "Shop Now"],
    script_variants: ["[Hook] Meet the new drop. [Feature] Modern, fast. [CTA] Tap to try."],
  });

export async function generateAdVariants(options = {}) {
  const product = options.product || "Your Product";
  const platform = options.platform || "Meta Ads";
  const tone = options.tone || "Bold, Modern";
  const audience = options.audience || "General Buyers";
  const count = Math.max(1, Math.min(options.count || 12, 200));
  const keywords = Array.isArray(options.keywords)
    ? options.keywords
    : `${options.keywords || ""}`.split(/[,|]/);

  const prompt = buildAdPrompt({ product, platform, tone, audience, keywords, count });

  if (!openai) {
    return fallbackAds(product);
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You generate ad variants for multiple platforms." },
        { role: "user", content: prompt },
      ],
      temperature: 0.75,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    const normalized = normalizeAdVariants(parsed);
    const any = Object.values(normalized || {}).some((v) => (Array.isArray(v) ? v.length : v));
    if (any) return normalized;
  } catch (err) {
    console.error("Ad Generator Error:", err);
  }

  return fallbackAds(product);
}
