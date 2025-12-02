"use server";

import OpenAI from "openai";
import { buildProductPrompt } from "./buildProductPrompt";
import { normalizeProductCopy } from "./normalizeProductCopy";

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

const fallbackProduct = (product = "Your Product") =>
  normalizeProductCopy({
    title: `${product} — Modern & Premium`,
    short_description: "Experience refined quality with a clean, modern design.",
    long_description:
      "Built for those who demand style and performance, this product delivers standout aesthetics, reliable functionality, and an effortless user experience.",
    features: ["Premium build", "Modern design", "Reliable performance", "Customer-loved experience"],
    benefits: ["Feel confident in your purchase", "Own a product that looks and works beautifully"],
    seo_keywords: [`${product} modern`, `${product} premium`, `${product} description`],
    cta: ["Discover Now", "Upgrade Today"],
  });

export async function generateProductCopy(options = {}) {
  const product = options.product || "Your Product";
  const tone = options.tone || "Modern, Clean, Premium";
  const audience = options.audience || "General Consumers";
  const industry = options.industry || "E-commerce";
  const keywords = Array.isArray(options.keywords)
    ? options.keywords
    : `${options.keywords || ""}`.split(/[,|]/);

  const prompt = buildProductPrompt({ product, tone, audience, keywords, industry });

  if (!openai) {
    return fallbackProduct(product);
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "Write high-converting product descriptions." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    const normalized = normalizeProductCopy(parsed);
    const any = Object.values(normalized).some((v) => (Array.isArray(v) ? v.length : v));
    if (any) return normalized;
  } catch (err) {
    console.error("Product Engine Error", err);
  }

  return fallbackProduct(product);
}
