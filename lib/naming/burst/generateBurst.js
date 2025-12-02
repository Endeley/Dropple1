"use server";

import OpenAI from "openai";
import { buildBurstPrompt } from "./buildBurstPrompt";
import { normalizeBurst } from "./normalizeBurst";

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

const fallbackBurst = (concept = "Creative") => {
  const seeds = [
    "Nova",
    "Arlo",
    "Lumi",
    "Kiro",
    "Quartz",
    "Arcus",
    "Miro",
    "Nima",
    "Velo",
    "Pulse",
    "Orchid",
    "Echo",
    "Prism",
    "Flux",
    "Neon",
  ];
  return { names: seeds.map((n) => `${concept} ${n}`) };
};

export async function generateBurst(options = {}) {
  const concept = options.concept || "Creative";
  const tone = options.tone || "Creative";
  const keywords = Array.isArray(options.keywords)
    ? options.keywords
    : `${options.keywords || ""}`.split(/[,|]/);
  const count = Math.max(10, Math.min(options.count || 100, 500));

  const prompt = buildBurstPrompt({ concept, tone, keywords, count });

  if (!openai) {
    return normalizeBurst(fallbackBurst(concept));
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You generate massive name lists." },
        { role: "user", content: prompt },
      ],
      temperature: 0.85,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    const normalized = normalizeBurst(parsed);
    if (normalized.names.length) return normalized;
  } catch (err) {
    console.error("Burst Engine Error", err);
  }

  return normalizeBurst(fallbackBurst(concept));
}
