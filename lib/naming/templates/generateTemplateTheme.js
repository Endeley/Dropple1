"use server";

import OpenAI from "openai";
import { buildTemplateThemePrompt } from "./buildTemplateThemePrompt";
import { normalizeTemplateTheme } from "./normalizeTemplateTheme";

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

const fallbackTheme = () =>
  normalizeTemplateTheme({
    theme_name: "Placeholder Theme",
    theme_variants: ["Light", "Dark", "Glow"],
    template_categories: {
      social: ["Social Post 1", "Story 1", "Carousel 1"],
      marketing: ["Poster 1", "Flyer 1"],
      branding: ["Business Card 1"],
      creative: ["Album Cover 1"],
      corporate: ["Resume 1"],
      ui: ["Landing Hero 1"],
      animation: ["Intro Slide 1"],
    },
    template_examples: ["Example template A", "Example template B"],
    shape_language: ["Rounded rectangles", "Orb clusters"],
    animation_hooks: ["Glow pulse", "Slide reveal"],
    color_usage_rules: ["Primary gradient for hero elements", "Secondary accents for buttons"],
    type_usage_rules: ["Display for headlines", "Sans for body"],
    special_effects: ["Soft glow", "Gradient fog"],
    naming_scheme: ["Theme_01", "Theme_02", "Theme_03"],
    export_pack: { formats: ["json", "png", "svg"] },
  });

export async function generateTemplateTheme(options = {}) {
  const brand = options.brand || "Your Brand";
  const visual_style = options.visual_style || "Modern";
  const archetype = options.archetype || "Creator";
  const concept_art = options.concept_art || "Abstract shapes";
  const categories = options.categories || "Social, Marketing, UI";

  const prompt = buildTemplateThemePrompt({ brand, visual_style, archetype, concept_art, categories });

  if (!openai) {
    return fallbackTheme();
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You generate complete template theme packs for design tools." },
        { role: "user", content: prompt },
      ],
      temperature: 0.75,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    const normalized = normalizeTemplateTheme(parsed);
    const any = Object.values(normalized || {}).some((v) => (Array.isArray(v) ? v.length : v));
    if (any) return normalized;
  } catch (err) {
    console.error("Template Theme Error", err);
  }

  return fallbackTheme();
}
