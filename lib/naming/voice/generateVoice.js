"use server";

import OpenAI from "openai";
import { buildVoicePrompt } from "./buildVoicePrompt";
import { normalizeVoice } from "./normalizeVoice";

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

const fallbackVoice = (personality = "Brand") => ({
  text: `${personality} stands for clarity and confidence.`,
  explanation: "Fallback voice result; set OPENAI_API_KEY for live generation.",
  keywords_used: [],
});

export async function generateVoice(options = {}) {
  const personality = options.personality || "Brand";
  const tone = options.tone || "Creative";
  const context = options.context || "Headline";
  const keywords = Array.isArray(options.keywords)
    ? options.keywords
    : `${options.keywords || ""}`.split(/[,|]/);
  const length = options.length || "short";

  const prompt = buildVoicePrompt({ personality, tone, context, keywords, length });

  if (!openai) {
    return normalizeVoice(fallbackVoice(personality));
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You write in specific brand voices." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    return normalizeVoice(parsed);
  } catch (err) {
    console.error("Voice Engine Error", err);
    return normalizeVoice(fallbackVoice(personality));
  }
}
