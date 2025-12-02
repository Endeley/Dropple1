"use server";

import OpenAI from "openai";
import { buildCreativePrompt } from "./buildCreativePrompt";
import { normalizeCreative } from "./normalizeCreative";

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

const fallbackCreative = () =>
  normalizeCreative({
    master_concept: "Placeholder creative concept. Set OPENAI_API_KEY for full generation.",
    mood_themes: ["Modern glow", "Creative futurism", "Soft neon"],
    color_environment: ["Violet/blue glow", "High contrast dark surfaces", "Directional gradients"],
    lighting_rules: ["Rim-lit edges", "Ambient neon bounce", "Soft top light"],
    composition_rules: ["Central object with radial glow", "Diagonal motion", "Floating panels"],
    motion_direction: {
      micro: ["Magnetic hover", "Glow pulse"],
      macro: ["Fade-slide transitions", "Parallax panels"],
      loops: ["Floating objects", "Pulsing icons"],
    },
    photography_style: ["Creators in action", "Neon rim light", "Purple/blue contrast"],
    illustration_style: ["Semi-3D UI objects", "Gradient-driven forms"],
    symbolism: ["Light = creativity", "Glow = intelligence", "Shapes = ideas forming"],
    do: ["Big gradients", "Smooth glows", "Depth & dimension"],
    dont: ["Flat pastels", "Harsh shadows", "Overly busy backgrounds"],
    campaign_concepts: ["Your AI Superpower", "Create What You Imagine"],
    art_direction_summary: "A modern, glowing direction with futuristic creativity cues.",
  });

export async function generateCreativeDirection(options = {}) {
  const brand = options.brand || "Your Brand";
  const archetype = options.archetype || "Creator";
  const tone = options.tone || "Futuristic, bold, expressive";
  const medium = options.medium || "Web + advertising";
  const personality = options.personality || "Modern, bold";

  const prompt = buildCreativePrompt({ brand, archetype, tone, medium, personality });

  if (!openai) {
    return fallbackCreative();
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You generate art direction for global brands, campaigns, and design systems." },
        { role: "user", content: prompt },
      ],
      temperature: 0.74,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    const normalized = normalizeCreative(parsed);
    const any = Object.values(normalized || {}).some((v) => (Array.isArray(v) ? v.length : v));
    if (any) return normalized;
  } catch (err) {
    console.error("Creative Direction Error", err);
  }

  return fallbackCreative();
}
