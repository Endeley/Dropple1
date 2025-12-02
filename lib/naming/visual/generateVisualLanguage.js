"use server";

import OpenAI from "openai";
import { buildVisualPrompt } from "./buildVisualPrompt";
import { normalizeVisual } from "./normalizeVisual";

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

const fallbackVisual = () =>
  normalizeVisual({
    colors: {
      primary: ["#8D4CF9", "#7C3AED", "#4338CA"],
      secondary: ["#60A5FA", "#10B981", "#EC4899"],
      neutrals: ["#0F172A", "#1E293B", "#334155", "#CBD5E1", "#FFFFFF"],
      gradients: ["#8D4CF9 → #60A5FA", "#7C3AED → #EC4899"],
      semantics: { success: "#10B981", warning: "#F59E0B", error: "#EF4444", info: "#3B82F6" },
    },
    typography: {
      display: { typeface: "Space Grotesk", weights: ["700", "600"], tracking: "tight" },
      body: { typeface: "Inter", weights: ["400", "500"], tracking: "normal" },
      mono: { typeface: "JetBrains Mono", weights: ["400", "600"] },
      scale: { xs: "12px", sm: "14px", base: "16px", lg: "20px", xl: "24px", "2xl": "32px", "3xl": "40px" },
    },
    shapes: {
      radius_scale: ["8px", "12px", "16px", "24px"],
      motifs: ["Rounded cards", "Pill buttons", "Soft shadows"],
      buttons: "Pill with subtle glow",
      strokes: "2px consistent stroke",
    },
    icons: {
      style: "Rounded line icons",
      stroke_width: "2px",
      corner_radius: "2px",
      filled_variants: "Active states use filled icons",
    },
    grid: {
      spacing_scale: [4, 8, 12, 16, 20, 24, 32, 40, 48, 64],
      grid_system: "12-column responsive, 4px base",
    },
    elevation: {
      shadows: ["Glow shadow: rgba(141,76,249,0.25)", "Soft card shadow"],
      levels: ["Low", "Medium", "High"],
    },
    motion: {
      principles: ["Fast ease-out", "Magnetic hover", "Glow pulse"],
      hover: ["Scale up 1.02", "Glow accent"],
      transitions: ["Fade-slide", "Ease-out 200ms"],
    },
    imagery: {
      photo_style: ["Vibrant lighting", "Purple-blue gradients"],
      illustration_style: ["Semi-3D UI objects", "Minimal backgrounds"],
      textures: ["Subtle grain", "Gradient mesh"],
    },
    logo_rules: {
      clearspace: "Height of the logomark around all sides",
      minimum_size: "24px height digital",
      usage: ["Gradient on dark", "Flat on light", "Icon-only for favicons"],
    },
    export_tokens: {
      colors: {},
      typography: {},
      spacing: {},
      radius: {},
      shadows: {},
      motion: {},
      gradients: {},
    },
  });

export async function generateVisualLanguage(options = {}) {
  const brand = options.brand || "Your Brand";
  const industry = options.industry || "General";
  const personality = options.personality || "Modern";
  const color_type = options.color_type || "Neutral";

  const prompt = buildVisualPrompt({ brand, industry, personality, color_type });

  if (!openai) {
    return fallbackVisual();
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You generate complete visual identity systems & design tokens." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    const normalized = normalizeVisual(parsed);
    const any = Object.values(normalized || {}).some((v) => (Array.isArray(v) ? v.length : v));
    if (any) return normalized;
  } catch (err) {
    console.error("Visual Language Error:", err);
  }

  return fallbackVisual();
}
