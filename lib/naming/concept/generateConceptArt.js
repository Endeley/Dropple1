"use server";

import OpenAI from "openai";
import { buildConceptPrompt } from "./buildConceptPrompt";
import { normalizeConcept } from "./normalizeConcept";

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

const fallbackConcept = () =>
  normalizeConcept({
    master_metaphor: "Ideas as Light guiding creation.",
    concept_categories: [
      { type: "abstract", ideas: ["Gradient storms forming order", "Floating layers of light"] },
      { type: "environment", ideas: ["Studio of Light", "Idea Nebula", "Neon Grid Forest"] },
      { type: "character", ideas: ["Light spirit guide", "Droplet companion"] },
      { type: "transformation", ideas: ["Glow burst to text reveal", "Particles to logo"] },
    ],
    symbol_library: ["Light", "Glow", "Gradient", "Droplet", "Orb", "Beam", "Ripple", "Crystal", "Geometric web"],
    composition_frameworks: ["Radial Burst", "Diagonal Energy Flow", "Layered Depth", "Orb Cluster", "Ripple Field"],
    camera_directions: ["Wide establishing neon environment", "45° energetic tilt", "Macro glow details", "Slow orbital POV"],
    materials: ["Soft neon gel", "Holographic metal", "Liquid glass", "Gradient fog", "Matte soft-touch"],
    textures: ["Bokeh particles", "Gradient mist", "Light refraction", "Smooth 3D surfaces"],
    template_concepts: ["Neon Minds pack", "Gradient Intelligence pack", "Creator's Pulse pack"],
    animation_concepts: ["Morphing shapes", "Particles revealing typography", "Glow ribbon trails"],
    visual_stories: ["Idea Awakening", "From Chaos to Creation", "AI Whisper"],
    concept_summary: "Placeholder concept art. Set OPENAI_API_KEY for full generation.",
  });

export async function generateConceptArt(options = {}) {
  const brand = options.brand || "Your Brand";
  const archetype = options.archetype || "Creator";
  const creative_direction = options.creative_direction || "Modern glow";
  const purpose = options.purpose || "Templates and campaigns";

  const prompt = buildConceptPrompt({ brand, archetype, creative_direction, purpose });

  if (!openai) {
    return fallbackConcept();
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You generate concept art directions for visuals, stories, and metaphors." },
        { role: "user", content: prompt },
      ],
      temperature: 0.76,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    const normalized = normalizeConcept(parsed);
    const any = Object.values(normalized || {}).some((v) => (Array.isArray(v) ? v.length : v));
    if (any) return normalized;
  } catch (err) {
    console.error("Concept Art Error", err);
  }

  return fallbackConcept();
}
