"use server";

import OpenAI from "openai";
import { buildMultiLangPrompt } from "./buildMultiLangPrompt";
import { normalizeMultiLang } from "./normalizeMultiLang";

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

const fallbackMultiLang = (text = "") => ({
  translations: [
    { language: "Spanish", text, notes: "Fallback translation; set OPENAI_API_KEY for live localization." },
  ],
});

export async function generateMultiLang(options = {}) {
  const text = options.text || "";
  const languages = Array.isArray(options.languages)
    ? options.languages
    : `${options.languages || ""}`.split(/[,|]/);
  const personality = options.personality || "Modern Creative";
  const tone = options.tone || "Minimal Elegant";

  const prompt = buildMultiLangPrompt({ text, languages, personality, tone });

  if (!openai) {
    return normalizeMultiLang(fallbackMultiLang(text));
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You translate and localize branding copy." },
        { role: "user", content: prompt },
      ],
      temperature: 0.6,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    return normalizeMultiLang(parsed);
  } catch (err) {
    console.error("MultiLang Error", err);
    return normalizeMultiLang(fallbackMultiLang(text));
  }
}
