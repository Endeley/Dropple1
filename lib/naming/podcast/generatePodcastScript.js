"use server";

import OpenAI from "openai";
import { buildPodcastPrompt } from "./buildPodcastPrompt";
import { normalizePodcast } from "./normalizePodcast";

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

const fallbackPodcast = (topic = "Podcast Episode") =>
  normalizePodcast({
    cold_open: "This is a placeholder cold open. Set OPENAI_API_KEY for full generation.",
    intro: "Welcome to this episode. We'll explore the topic and share insights.",
    segments: [{ title: "Segment 1", content: "Placeholder segment content." }],
    cta: "Subscribe and share.",
    outro: "Thanks for listening.",
    show_notes: "Placeholder show notes. Add OPENAI_API_KEY for full script.",
    timestamps: ["00:00 - Cold Open", "00:30 - Intro", "02:00 - Segment 1"],
  });

export async function generatePodcastScript(options = {}) {
  const title = options.title || "Podcast Show";
  const topic = options.topic || "Your Topic";
  const tone = options.tone || "Warm, Confident";
  const type = options.type || "Solo";
  const length = options.length || 20;
  const characters = Array.isArray(options.characters) ? options.characters : [];

  const prompt = buildPodcastPrompt({ title, topic, tone, type, length, characters });

  if (!openai) {
    return fallbackPodcast(topic);
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You write professional podcast scripts." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    const normalized = normalizePodcast(parsed);
    const any = Object.values(normalized || {}).some((v) => (Array.isArray(v) ? v.length : v));
    if (any) return normalized;
  } catch (err) {
    console.error("Podcast Script Error", err);
  }

  return fallbackPodcast(topic);
}
