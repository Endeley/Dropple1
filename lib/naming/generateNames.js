"use server";

import { normalizeNames } from "./normalizeNames";

let openaiClientPromise;

const getOpenAIClient = async () => {
  if (openaiClientPromise !== undefined) return openaiClientPromise;

  if (!process.env.OPENAI_API_KEY) {
    openaiClientPromise = Promise.resolve(null);
    return openaiClientPromise;
  }

  // Lazy, dynamic import keeps the dependency optional and avoids bundling failures when the SDK isn't present
  openaiClientPromise = import("openai")
    .then((mod) => {
      const OpenAI = mod.default || mod.OpenAI || mod;
      return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    })
    .catch((error) => {
      console.error("[generateNames] Failed to load OpenAI SDK", error);
      return null;
    });

  return openaiClientPromise;
};

const parseKeywords = (keywords) => {
  if (Array.isArray(keywords)) return keywords.filter(Boolean).map((k) => `${k}`.trim()).filter(Boolean);
  if (!keywords) return [];
  return `${keywords}`
    .split(/[,|]/)
    .map((k) => k.trim())
    .filter(Boolean);
};

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

const fallbackNames = ({ count = 12, tone = "Bold", type = "Brand", language = "English", keywords = [] }) => {
  const list = [
    "Veliora",
    "Auralite",
    "Drova",
    "Lumio",
    "Nexori",
    "Klyra",
    "Vantum",
    "Sorial",
    "Mioris",
    "Plixel",
  ];
  const slice = list.slice(0, Math.min(count, list.length));
  return slice.map((name, idx) => ({
    name,
    meaning: `${name} fits a ${tone.toLowerCase()} ${type.toLowerCase()} in ${language}${
      keywords.length ? ` using ${keywords.join(", ")}` : ""
    }.`,
    tone_match_score: 80 + (idx % 5),
    memorability_score: 78 + (idx % 7),
    reasoning: "Fallback sample while API is unavailable.",
    tone,
    language,
  }));
};

export async function generateNames(options = {}) {
  const openai = await getOpenAIClient();
  const type = options.type || "Brand";
  const tone = options.tone || "Bold";
  const keywords = parseKeywords(options.keywords);
  const language = options.language || "English";
  const count = Math.max(1, Math.min(options.count || 12, 150));

  // Use fallback when no API key is available
  if (!openai) {
    return normalizeNames(fallbackNames({ count, tone, type, language, keywords }));
  }

  const prompt = `
You are Dropple's AI Naming Brain. Generate ${count} concise naming ideas.

Rules:
- Names must be unique, short, and brandable.
- Tone: ${tone}
- Type: ${type}
- Language: ${language}
- Keywords: ${keywords.join(", ")}
- Provide reasoning for why each name works.

Return a JSON object with a "results" array. Each entry:
{
  "name": "string",
  "meaning": "string",
  "tone_match_score": 0-100,
  "memorability_score": 0-100,
  "reasoning": "string"
}
`;

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You are a naming expert." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    const normalized = normalizeNames(parsed.results || parsed.names || []);

    if (normalized.length) return normalized;
  } catch (error) {
    console.error("[generateNames] OpenAI error", error);
  }

  return normalizeNames(fallbackNames({ count, tone, type, language, keywords }));
}
