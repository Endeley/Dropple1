"use server";

import OpenAI from "openai";
import { buildSloganPrompt } from "./buildSloganPrompt";
import { normalizeSlogan } from "./normalizeSlogan";

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

const fallbackSlogans = (name = "Your Brand") => ({
  hero: [`${name}: Design Beyond Ordinary.`, "Bold visuals for bold ideas."],
  short: ["Make it modern.", "Create boldly.", "Design today."],
  cta: ["Create Now", "Start Designing", "Launch it"],
  marketing: ["Turn ideas into visuals instantly.", "Your creativity, amplified."],
  value_based: ["Built for creators who move fast.", "Inspire. Design. Deliver."],
});

export async function generateSlogan(options = {}) {
  const name = options.name || "Brand";
  const tone = options.tone || "Creative";
  const keywords = Array.isArray(options.keywords)
    ? options.keywords
    : `${options.keywords || ""}`.split(/[,|]/);
  const audience = options.audience || "General";
  const count = Math.max(3, Math.min(options.count || 12, 60));

  const prompt = buildSloganPrompt({ name, tone, keywords, audience, count });

  if (!openai) {
    return normalizeSlogan(fallbackSlogans(name));
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You generate slogans and taglines." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    const normalized = normalizeSlogan(parsed);
    const any = Object.values(normalized).some((arr) => arr?.length);
    if (any) return normalized;
  } catch (err) {
    console.error("Slogan Engine Error", err);
  }

  return normalizeSlogan(fallbackSlogans(name));
}
