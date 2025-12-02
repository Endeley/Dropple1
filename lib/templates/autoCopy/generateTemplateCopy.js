"use server";

import OpenAI from "openai";
import { buildCopyPrompt } from "./buildCopyPrompt";
import { normalizeTemplateCopy } from "./normalizeTemplateCopy";

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

const fallbackCopy = () => ({
  headline: "Design that stands out",
  subheadline: "Modern visuals crafted for bold ideas",
  body: "Create fast with AI-powered templates tailored to your style. Launch campaigns and content without the blank page.",
  cta: "Create Now",
  extra: {
    caption: "Bold ideas. Modern impact.",
    details: "Crafted by Dropple Auto-Copy.",
    footer: "Powered by Dropple",
  },
});

export async function generateTemplateCopy(context = {}) {
  const prompt = buildCopyPrompt(context);

  if (!openai) {
    return normalizeTemplateCopy(fallbackCopy());
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You generate template copy content." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    return normalizeTemplateCopy(parsed);
  } catch (err) {
    console.error("AutoCopy Error", err);
    return normalizeTemplateCopy(fallbackCopy());
  }
}
