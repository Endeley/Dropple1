"use server";

import OpenAI from "openai";
import { buildSocialPrompt } from "./buildSocialPrompt";
import { normalizeSocialCopy } from "./normalizeSocialCopy";

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

const fallbackSocial = (topic = "Your topic") =>
  normalizeSocialCopy({
    hooks: [`${topic} — get ready`, `New drop: ${topic}`],
    short_caption: `Fresh update: ${topic}`,
    long_caption: `${topic}\nThis is placeholder social copy. Set OPENAI_API_KEY for AI generation.`,
    hashtags: ["#dropple", "#design"],
    cta: "Check it out",
    emoji_pack: ["✨", "🚀"],
  });

export async function generateSocialCopy(options = {}) {
  const topic = options.topic || "Your topic";
  const tone = options.tone || "Bold, Modern";
  const platform = options.platform || "Instagram";
  const target = options.target || "General Audience";
  const keywords = Array.isArray(options.keywords)
    ? options.keywords
    : `${options.keywords || ""}`.split(/[,|]/);

  const prompt = buildSocialPrompt({ topic, tone, platform, target, keywords });

  if (!openai) {
    return fallbackSocial(topic);
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You write viral-optimized social captions." },
        { role: "user", content: prompt },
      ],
      temperature: 0.78,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    const normalized = normalizeSocialCopy(parsed);
    const any = Object.values(normalized || {}).some((v) => (Array.isArray(v) ? v.length : v));
    if (any) return normalized;
  } catch (err) {
    console.error("Social Engine Error", err);
  }

  return fallbackSocial(topic);
}
