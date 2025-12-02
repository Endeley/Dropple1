"use server";

import OpenAI from "openai";
import { buildScriptPrompt } from "./buildScriptPrompt";
import { normalizeScript } from "./normalizeScript";

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

const fallbackScript = (topic = "Your Script") =>
  normalizeScript({
    title_options: [`${topic} — Script Draft`, `${topic}: Quick Script`],
    logline: `A concise walkthrough of ${topic}.`,
    hook: `Discover how ${topic} unfolds in minutes.`,
    outline: ["Intro", "Problem", "Solution", "Demo", "CTA"],
    script: "This is a placeholder script. Set OPENAI_API_KEY for full generation.",
    short_version: "Quick hook -> proof -> CTA.",
    cta: "Try now.",
    notes: "Fallback output. Add API key for full scripts.",
  });

export async function generateScript(options = {}) {
  const type = options.type || "YouTube Tutorial";
  const topic = options.topic || "Your Topic";
  const tone = options.tone || "Modern, Energetic";
  const audience = options.audience || "General viewers";
  const length = options.length || 120;
  const characters = Array.isArray(options.characters) ? options.characters : [];

  const prompt = buildScriptPrompt({ type, topic, tone, audience, length, characters });

  if (!openai) {
    return fallbackScript(topic);
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You write professional video and animation scripts." },
        { role: "user", content: prompt },
      ],
      temperature: 0.74,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    const normalized = normalizeScript(parsed);
    const any = Object.values(normalized || {}).some((v) => (Array.isArray(v) ? v.length : v));
    if (any) return normalized;
  } catch (err) {
    console.error("Script Engine Error", err);
  }

  return fallbackScript(topic);
}
