"use server";

import OpenAI from "openai";
import { buildBrandDNAPrompt } from "./buildBrandDNAPrompt";
import { normalizeBrandDNA } from "./normalizeBrandDNA";

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

const fallbackDNA = (concept = "Brand") =>
  normalizeBrandDNA({
    values: ["Creativity", "Innovation", "Clarity", "Momentum"],
    personality: ["Bold", "Visionary", "Warm", "Artistic"],
    voice_principles: [
      "Speak with confident simplicity",
      "Use elegant, intentional language",
      "Blend modern minimalism with emotional depth",
    ],
    tone_rules: {
      tone: "Warm Futuristic Minimal",
      do: ["Use empowering statements", "Embrace modern design clarity", "Include subtle emotion"],
      dont: ["Over-explain the message", "Be too formal or cold", "Use cluttered metaphors"],
    },
    mission: `To empower creativity with modern tools rooted in innovation.`,
    positioning: `${concept} is a design powerhouse shaping the next generation of creativity.`,
    writing_examples: {
      headline: "Design that moves you forward.",
      sentence: "Where clarity meets momentum, your ideas become vivid reality.",
      cta: "Create with confidence",
    },
  });

export async function generateBrandDNA(options = {}) {
  const concept = options.concept || "Brand";
  const tone = options.tone || "Modern, Creative, Elegant";
  const audience = options.audience || "General";
  const keywords = Array.isArray(options.keywords)
    ? options.keywords
    : `${options.keywords || ""}`.split(/[,|]/);

  const prompt = buildBrandDNAPrompt({ concept, audience, tone, keywords });

  if (!openai) {
    return fallbackDNA(concept);
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You create brand personality & value systems." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    const normalized = normalizeBrandDNA(parsed);
    const any = Object.values(normalized || {}).some((val) => {
      if (Array.isArray(val)) return val.length;
      if (typeof val === "object" && val !== null) return Object.values(val).some((v) => (Array.isArray(v) ? v.length : v));
      return Boolean(val);
    });
    if (any) return normalized;
  } catch (err) {
    console.error("BrandDNA Error", err);
  }

  return fallbackDNA(concept);
}
