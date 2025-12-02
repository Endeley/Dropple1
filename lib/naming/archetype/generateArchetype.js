"use server";

import OpenAI from "openai";
import { buildArchetypePrompt } from "./buildArchetypePrompt";
import { normalizeArchetype } from "./normalizeArchetype";

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

const fallbackArchetype = (brand = "Your Brand") =>
  normalizeArchetype({
    primary_archetype: { name: "Creator", rationale: `${brand} inspires creativity.` },
    secondary_archetype: { name: "Magician", rationale: `${brand} delivers transformative moments.` },
    tertiary_archetype: { name: "Sage", rationale: `${brand} teaches and clarifies.` },
    brand_drivers: ["Innovation", "Expression", "Clarity"],
    emotional_triggers: ["Unlock creativity", "Transform your ideas", "Feel confident to create"],
    voice: {
      tone: "Bold, inspirational, helpful, visionary",
      patterns: ["Encourage", "Uplift", "Clarify", "Create aha moments"],
      do: ["Inspire", "Show transformation", "Teach simply"],
      dont: ["Overwhelm with jargon", "Sound elitist", "Feel cold"],
    },
    visual_alignment: {
      colors: ["Bold contrasts", "Vibrant gradients"],
      shapes: ["Expressive, rounded"],
      textures: ["Subtle glow"],
      motion: ["Smooth, magical transitions"],
    },
    story_themes: ["Unlocking creativity", "Tools as mentors", "Turning chaos into clarity"],
    taglines: ["Unleash Your Imagination.", "Where Ideas Become Real.", "Create With Intelligence."],
    archetype_summary: `${brand} blends Creator, Magician, and Sage to empower imagination, deliver magic, and provide clarity.`,
  });

export async function generateArchetype(options = {}) {
  const brand = options.brand || "Your Brand";
  const industry = options.industry || "General";
  const personality = options.personality || "Modern, Creative";

  const prompt = buildArchetypePrompt({ brand, industry, personality });

  if (!openai) {
    return fallbackArchetype(brand);
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You generate brand archetype systems." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    const normalized = normalizeArchetype(parsed);
    const any = Object.values(normalized || {}).some((v) => (Array.isArray(v) ? v.length : v));
    if (any) return normalized;
  } catch (err) {
    console.error("Archetype Engine Error", err);
  }

  return fallbackArchetype(brand);
}
