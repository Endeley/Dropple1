"use server";

import OpenAI from "openai";
import { buildRewritePrompt } from "./buildRewritePrompt";
import { normalizeRewrite } from "./normalizeRewrite";

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

const fallbackRewrite = (text = "") => ({
  rewritten: text || "Rewrite placeholder",
  explanation: "Fallback rewrite; set OPENAI_API_KEY for live results.",
});

export async function generateRewrite(options = {}) {
  const text = options.text || "";
  const goal = options.goal || "Improve clarity";
  const tone = options.tone || "Modern";
  const personality = options.personality || "";
  const industry = options.industry || "";
  const format = options.format || "sentence";

  const prompt = buildRewritePrompt({ text, goal, tone, personality, industry, format });

  if (!openai) {
    return normalizeRewrite(fallbackRewrite(text));
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You professionally rewrite brand text." },
        { role: "user", content: prompt },
      ],
      temperature: 0.65,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    return normalizeRewrite(parsed);
  } catch (err) {
    console.error("Rewrite Error", err);
    return normalizeRewrite(fallbackRewrite(text));
  }
}
