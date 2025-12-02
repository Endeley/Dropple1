"use server";

import OpenAI from "openai";
import { buildMessagingPrompt } from "./buildMessagingPrompt";
import { normalizeMessaging } from "./normalizeMessaging";

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

const fallbackMessaging = (brand = "Your Brand") =>
  normalizeMessaging({
    mission: `${brand} empowers creativity with simple, intelligent tools.`,
    vision: `${brand} imagines a world where anyone can create effortlessly.`,
    promise: `${brand} makes creativity easy.`,
    value_proposition: `${brand} combines smart tools with clean design so you can create faster.`,
    elevator_pitch_short: `${brand} is the modern creative platform to design anything in minutes.`,
    elevator_pitch_long: `${brand} merges AI assistance with pro-grade tools so creators at any level can design, iterate, and ship high-quality visuals faster than ever.`,
    values: ["Creativity", "Simplicity", "Innovation", "Empowerment"],
    messaging_pillars: ["Speed", "Quality", "AI Support", "Freedom", "Power"],
    personality: ["Creative", "Modern", "Bold", "Helpful", "Friendly"],
    tone_guide: { website: "clean, strong", social: "energetic, fun", docs: "clear, simple", ads: "bold, punchy", support: "calm, friendly" },
    taglines: ["Design Without Limits.", "Create Faster.", "Your AI Design Superpower."],
    audience_breakdown: { primary: ["Creators", "Designers"], secondary: ["Students", "Agencies"] },
    brand_story: "Placeholder brand story. Set OPENAI_API_KEY for full narrative.",
    origin_story: "Placeholder origin story. Set OPENAI_API_KEY for full narrative.",
    positioning: `${brand} stands apart by blending AI intelligence with accessible pro design tools.`,
    social_bios: {
      instagram: `${brand}: AI-powered design studio. Create in minutes.`,
      tiktok: `${brand} — design fast with AI.`,
      x: `${brand}: AI design for creators.`,
      linkedin: `${brand} helps teams design faster with AI-driven tools and templates.`,
    },
    message_templates: {
      website_hero: "Design anything in minutes with intelligent tools.",
      about_page: "We built ${brand} to make creativity effortless for everyone.",
      social_caption_template: "Create faster with ${brand} — your AI-powered design studio.",
      email_intro: "Hi there, meet ${brand}: the fastest way to design beautiful content.",
      product_description: "${brand} merges AI and design so you can create more, faster.",
    },
  });

export async function generateMessaging(options = {}) {
  const brand = options.brand || "Your Brand";
  const industry = options.industry || "General";
  const audience = options.audience || "General Audience";
  const tone = options.tone || "Modern, bold, inspiring";

  const prompt = buildMessagingPrompt({ brand, industry, audience, tone });

  if (!openai) {
    return fallbackMessaging(brand);
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You create complete brand messaging systems." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    const normalized = normalizeMessaging(parsed);
    const any = Object.values(normalized || {}).some((v) => (Array.isArray(v) ? v.length : v));
    if (any) return normalized;
  } catch (err) {
    console.error("Messaging Error:", err);
  }

  return fallbackMessaging(brand);
}
