"use server";

import OpenAI from "openai";
import { buildStorybookPrompt } from "./buildStorybookPrompt";
import { normalizeStorybook } from "./normalizeStorybook";

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

const fallbackStorybook = (concept = "Brand") =>
  normalizeStorybook({
    brand_story: `${concept} blends culture, innovation, and clarity to empower creators globally.`,
    mission: "Empower creativity with modern, accessible tools.",
    vision: "A world where bold design thinking shapes every experience.",
    values: ["Innovation", "Creativity", "Clarity", "Momentum"],
    personality: ["Bold", "Visionary", "Minimal", "Warm"],
    voice: {
      principles: ["Speak with confident simplicity", "Blend emotion with precision", "Favor clarity over fluff"],
      tone: "Warm Futuristic Minimal",
      examples: { headline: "Design the Future.", tagline: "Where vision meets action.", cta: "Create Boldly" },
    },
    messaging: {
      pillars: ["Innovation at speed", "Design clarity", "Creator empowerment"],
      positioning: `${concept} is the modern toolkit for creators moving fast with purpose.`,
      taglines: ["Build with clarity", "Momentum for creators"],
      angles: ["Speed + quality", "Cultural depth + modern polish"],
    },
    visuals: {
      color_palette: ["Violet Spark #8D4CF9", "Midnight #0F1020", "Ice Grey #DCE3F2", "Neon Coral #FF6B6B"],
      typography: ["Headline: Satoshi Bold", "Body: Inter Regular", "Accent: Space Grotesk SemiBold"],
      imagery_style: ["High-contrast lighting", "Futuristic cityscapes", "Candid creators in motion"],
      composition_rules: ["Generous whitespace", "Grid-aligned layouts", "Bold hero type with subtle gradients"],
    },
    applications: {
      ads: ["Hero statement + CTA over gradient", "Product close-up with stat overlay"],
      social: ["Bold headline, short caption, strong CTA", "Portraits with gradient overlays"],
      website: ["Hero with headline + CTA", "Feature grid with icons", "Testimonials with portraits"],
      logo_usage: ["Clearspace equal to logo height", "Avoid placing on busy backgrounds"],
      spacing_rules: "Maintain 12px/24px/48px spacing scale across components.",
    },
  });

export async function generateStorybook(options = {}) {
  const concept = options.concept || "Brand";
  const tone = options.tone || "Modern, Creative, Elegant";
  const audience = options.audience || "Global Creative Audience";
  const keywords = Array.isArray(options.keywords)
    ? options.keywords
    : `${options.keywords || ""}`.split(/[,|]/);

  const prompt = buildStorybookPrompt({ concept, keywords, tone, audience });

  if (!openai) {
    return fallbackStorybook(concept);
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You generate brand storybooks and identity guides." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    const normalized = normalizeStorybook(parsed);
    const any = Object.values(normalized || {}).some((val) => {
      if (Array.isArray(val)) return val.length;
      if (typeof val === "object" && val !== null) return Object.values(val).some((v) => (Array.isArray(v) ? v.length : v));
      return Boolean(val);
    });
    if (any) return normalized;
  } catch (err) {
    console.error("Storybook Error", err);
  }

  return fallbackStorybook(concept);
}
