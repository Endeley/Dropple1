"use server";

import OpenAI from "openai";
import { buildRepurposePrompt } from "./buildRepurposePrompt";
import { normalizeRepurposedContent } from "./normalizeRepurposedContent";

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

const fallbackRepurpose = (source = "Your content") =>
  normalizeRepurposedContent({
    short_videos: [`Clip idea from: ${source.slice(0, 80)}`],
    reels_tiktoks: ["Short hook + CTA"],
    threads: ["Thread starter → expand when API available"],
    linkedIn_posts: ["Value post placeholder"],
    facebook_posts: ["FB post placeholder"],
    carousels: ["Slide 1: Hook", "Slide 2: Pain", "Slide 3: Solution"],
    quotes: ["Quote placeholder"],
    blog_articles: ["Blog outline placeholder"],
    email_newsletters: ["Newsletter subject + intro placeholder"],
    cta_snippets: ["Try Dropple free"],
    seo_titles: ["SEO title placeholder"],
    hashtags: { trending: ["#dropple"], niche: ["#designworkflow"], mixed: ["#dropple #design"] },
    thumbnail_titles: ["Thumbnail title placeholder"],
  });

export async function generateRepurposedContent(options = {}) {
  const source = options.source || "";
  const type = options.type || "Video";
  const tone = options.tone || "Friendly, Informative";
  const audience = options.audience || "General Audience";
  const amount = options.amount || "High";

  const prompt = buildRepurposePrompt({ source, type, tone, audience, amount });

  if (!openai) {
    return fallbackRepurpose(source);
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You repurpose content for all major platforms." },
        { role: "user", content: prompt },
      ],
      temperature: 0.78,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    const normalized = normalizeRepurposedContent(parsed);
    const any = Object.values(normalized || {}).some((v) => (Array.isArray(v) ? v.length : v));
    if (any) return normalized;
  } catch (err) {
    console.error("Repurpose Error", err);
  }

  return fallbackRepurpose(source);
}
