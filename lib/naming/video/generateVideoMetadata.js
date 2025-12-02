"use server";

import OpenAI from "openai";
import { buildVideoPrompt } from "./buildVideoPrompt";
import { normalizeVideoMetadata } from "./normalizeVideoMetadata";

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

const fallbackMetadata = (topic = "Your Video") =>
  normalizeVideoMetadata({
    title_options: [`${topic} — Tutorial`, `${topic} Guide`],
    description_long: "This is a placeholder description. Set OPENAI_API_KEY for full generation.",
    description_short: `${topic} in a nutshell.`,
    hook: `Learn ${topic} fast.`,
    hashtags: ["#dropple", "#design"],
    tags: ["dropple", "design"],
    chapters: [],
    cta_block: "Try Dropple free: https://dropple.com",
    affiliate_block: "Affiliate links go here.",
    notes: "Fallback output; add API key for full metadata.",
  });

export async function generateVideoMetadata(options = {}) {
  const topic = options.topic || "Your Video";
  const tone = options.tone || "Friendly, Modern";
  const platform = options.platform || "YouTube";
  const target = options.target || "General audience";
  const keywords = Array.isArray(options.keywords)
    ? options.keywords
    : `${options.keywords || ""}`.split(/[,|]/);

  const prompt = buildVideoPrompt({ topic, tone, platform, target, keywords });

  if (!openai) {
    return fallbackMetadata(topic);
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You produce SEO video descriptions and metadata." },
        { role: "user", content: prompt },
      ],
      temperature: 0.72,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    const normalized = normalizeVideoMetadata(parsed);
    const any = Object.values(normalized || {}).some((v) => (Array.isArray(v) ? v.length : v));
    if (any) return normalized;
  } catch (err) {
    console.error("Video Metadata Error:", err);
  }

  return fallbackMetadata(topic);
}
