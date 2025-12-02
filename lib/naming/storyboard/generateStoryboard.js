"use server";

import OpenAI from "openai";
import { buildStoryboardPrompt } from "./buildStoryboardPrompt";
import { normalizeStoryboard } from "./normalizeStoryboard";

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

const fallbackStoryboard = () =>
  normalizeStoryboard({
    scenes: [
      {
        scene_number: 1,
        title: "Intro",
        description: "Placeholder scene. Set OPENAI_API_KEY for full storyboard.",
        shots: [
          {
            shot_number: 1,
            shot_type: "MCU",
            camera_angle: "Eye-level",
            camera_motion: "Static",
            visual: "Host on camera",
            characters: [],
            lighting: "Soft key light",
            notes: "Fallback storyboard.",
          },
        ],
      },
    ],
    style_guide: {
      palette: [],
      line_style: "Clean",
      composition: "Centered",
      motion: "Static",
    },
  });

export async function generateStoryboard(options = {}) {
  const script = options.script || "No script provided.";
  const style = options.style || "Clean Minimal Animation";
  const aspect = options.aspect || "16:9";
  const characters = Array.isArray(options.characters)
    ? options.characters
    : `${options.characters || ""}`.split(/[,|]/).filter(Boolean);

  const prompt = buildStoryboardPrompt({ script, style, aspect, characters });

  if (!openai) {
    return fallbackStoryboard();
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You generate film-quality storyboards." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    const normalized = normalizeStoryboard(parsed);
    const any = Object.values(normalized || {}).some((v) => (Array.isArray(v) ? v.length : v));
    if (any) return normalized;
  } catch (err) {
    console.error("Storyboard Error", err);
  }

  return fallbackStoryboard();
}
