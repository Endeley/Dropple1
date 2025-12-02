"use server";

import OpenAI from "openai";
import { buildUIKitPrompt } from "./buildUIKitPrompt";
import { normalizeUIKit } from "./normalizeUIKit";

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

const fallbackUIKit = () =>
  normalizeUIKit({
    component_categories: {
      base: ["Button", "Badge", "Avatar"],
      forms: ["Input", "Select", "Checkbox"],
      layout: ["Card", "Modal", "Drawer"],
      navigation: ["Navbar", "Tabs", "Breadcrumbs"],
      dashboard: ["Stat Card", "Table", "Chart"],
      ai: ["Prompt Input", "AI Result Card", "Suggestion Chips"],
      media: ["Image Frame", "Video Frame", "Carousel"],
    },
    components: [
      "Button",
      "Input",
      "Select",
      "Checkbox",
      "Radio",
      "Toggle",
      "Badge",
      "Avatar",
      "Tooltip",
      "Card",
      "Modal",
      "Drawer",
      "Tabs",
      "Accordion",
      "Navbar",
      "Sidebar",
      "Breadcrumbs",
      "Pagination",
      "Table",
      "Chart",
      "Stat Widget",
      "AI Prompt Bar",
      "AI Result Card",
      "Toast",
    ],
    tokens_used: {
      colors: { primary: "violet-gradient", surface: "charcoal", accent: "teal glow" },
      radius: "16px",
      shadows: ["soft glow", "medium drop"],
      spacing: "4px scale",
    },
    component_examples: [
      "Glow Button — solid, outline, ghost",
      "Neon Input with focus gradient ring",
      "Gradient Card with floating depth",
    ],
    design_rules: [
      "Hover states increase glow radius",
      "Use gradient outlines for focusable controls",
      "Cards float with soft shadow and subtle border",
    ],
    code_export: {
      files: ["components/ui/button.jsx", "components/ui/input.jsx", "components/ui/card.jsx"],
      tokens: "tailwind.config.js + css variables",
    },
  });

export async function generateUIKit(options = {}) {
  const brand = options.brand || "Your Brand";
  const visual_style = options.visual_style || "Modern neon";
  const archetype = options.archetype || "Creator";
  const tokens = options.tokens || "Primary violet, glow shadows, rounded radius";

  const prompt = buildUIKitPrompt({ brand, visual_style, archetype, tokens });

  if (!openai) {
    return fallbackUIKit();
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You generate UI kits for design systems and code export." },
        { role: "user", content: prompt },
      ],
      temperature: 0.74,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    const normalized = normalizeUIKit(parsed);
    const any = Object.values(normalized || {}).some((v) => (Array.isArray(v) ? v.length : v));
    if (any) return normalized;
  } catch (err) {
    console.error("UI Kit Generation Error", err);
  }

  return fallbackUIKit();
}
