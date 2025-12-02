"use server";

import OpenAI from "openai";
import { buildLongformPrompt } from "./buildLongformPrompt";
import { normalizeLongform } from "./normalizeLongform";

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

const fallbackLongform = (topic = "Your Topic") =>
  normalizeLongform({
    title_options: [`${topic} — A Deep Dive`, `${topic}: What You Need to Know`],
    outline: ["Introduction", "Key Themes", "Challenges", "Opportunities", "Conclusion"],
    article:
      "This is a placeholder long-form draft. Set OPENAI_API_KEY to enable full generation. Use this space to explore your topic with structured sections, clear arguments, and actionable insights.",
    seo_keywords: [topic, `${topic} insights`],
    meta_description: `Explore ${topic} with a structured overview and key takeaways.`,
    social_snippets: [`Learn about ${topic} in our latest deep dive.`],
  });

export async function generateLongform(options = {}) {
  const topic = options.topic || "Your Topic";
  const tone = options.tone || "Modern, Clear, Insightful";
  const audience = options.audience || "General Audience";
  const length = Number(options.length) || 1200;
  const keywords = Array.isArray(options.keywords)
    ? options.keywords
    : `${options.keywords || ""}`.split(/[,|]/);
  const format = options.format || "article";

  const prompt = buildLongformPrompt({ topic, tone, audience, length, keywords, format });

  if (!openai) {
    return fallbackLongform(topic);
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You write long-form content at a professional editorial level." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    const normalized = normalizeLongform(parsed);
    const any = Object.values(normalized || {}).some((v) => (Array.isArray(v) ? v.length : v));
    if (any) return normalized;
  } catch (err) {
    console.error("Longform Error", err);
  }

  return fallbackLongform(topic);
}
