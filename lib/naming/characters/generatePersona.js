"use server";

import OpenAI from "openai";
import { buildPersonaPrompt } from "./buildPersonaPrompt";
import { normalizePersona } from "./normalizePersona";

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

const fallbackPersona = (concept = "Character") =>
  normalizePersona({
    name: concept,
    age: "Unknown",
    summary: `${concept} is a vivid persona ready for your story.`,
    personality_traits: ["Curious", "Resilient", "Creative"],
    backstory: `${concept} grew up pushing boundaries and exploring new horizons.`,
    motivation: "To find purpose and impact the world around them.",
    strengths: ["Ingenuity", "Determination"],
    weaknesses: ["Impulsive", "Stubborn"],
    speech_style: "Direct, warm, lightly witty.",
    signature_phrases: ["Let's try it.", "We can make this work."],
    dialogue_samples: ["I know it looks tough, but we'll figure it out.", "Give me a second—I've got an idea."],
    emotional_arc: "Learns to trust themselves and lead with empathy.",
    visual_style: ["Modern", "Confident posture", "Clean lines in outfits"],
    relationships: ["Trusted ally", "Occasional rival"],
  });

export async function generatePersona(options = {}) {
  const concept = options.concept || "Character";
  const tone = options.tone || "Warm, Creative";
  const role = options.role || "Main character";
  const world = options.world || "Modern";
  const keywords = Array.isArray(options.keywords)
    ? options.keywords
    : `${options.keywords || ""}`.split(/[,|]/);

  const prompt = buildPersonaPrompt({ concept, tone, role, world, keywords });

  if (!openai) {
    return fallbackPersona(concept);
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You generate character personas for stories and animation." },
        { role: "user", content: prompt },
      ],
      temperature: 0.75,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    const normalized = normalizePersona(parsed);
    const any = Object.values(normalized || {}).some((v) => (Array.isArray(v) ? v.length : v));
    if (any) return normalized;
  } catch (err) {
    console.error("Character Persona Error", err);
  }

  return fallbackPersona(concept);
}
