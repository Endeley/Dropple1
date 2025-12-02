"use server";

import OpenAI from "openai";
import { buildFamilyPrompt } from "./buildFamilyPrompt";
import { normalizeFamily } from "./normalizeFamily";

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

const fallbackFamily = (base = "Nova") => {
  const root = base || "Nova";
  return {
    base_names: [root, `${root} Core`, `${root} One`],
    series: [`${root} X`, `${root} Pro`, `${root} Ultra`],
    variants: [`${root} Max`, `${root} Edge`, `${root} Lite`],
    editions: [`${root} Winter Edition`, `${root} Neon Edition`, `${root} Aurora Edition`],
    short_codes: ["X", "XR", "UX", "L1", "L2"],
    ui_versions: [`${root} Layout`, `${root} Layout V2`, `${root} Ultra`, `${root} Dark`],
  };
};

export async function generateFamily(options = {}) {
  const base = options.base || "Nova";
  const tone = options.tone || "Modern";
  const keywords = Array.isArray(options.keywords) ? options.keywords : `${options.keywords || ""}`.split(/[,|]/);
  const language = options.language || "English";

  const prompt = buildFamilyPrompt({ base, tone, keywords, language });

  if (!openai) {
    return normalizeFamily(fallbackFamily(base));
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You create naming hierarchies." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    const normalized = normalizeFamily(parsed);
    const any = Object.values(normalized).some((arr) => arr?.length);
    if (any) return normalized;
  } catch (err) {
    console.error("Family Naming Error", err);
  }

  return normalizeFamily(fallbackFamily(base));
}
