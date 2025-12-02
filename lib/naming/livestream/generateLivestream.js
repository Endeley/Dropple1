"use server";

import OpenAI from "openai";
import { buildLivestreamPrompt } from "./buildLivestreamPrompt";
import { normalizeLivestream } from "./normalizeLivestream";

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

const fallbackLivestream = () =>
  normalizeLivestream({
    run_of_show: [
      {
        start_time: "00:00",
        end_time: "02:00",
        segment_title: "Intro",
        talking_points: ["Welcome viewers", "Topic overview"],
        chat_prompts: ["Where are you watching from?"],
        overlay_suggestions: ["Title card"],
        notes: "Fallback run of show; set OPENAI_API_KEY for full generation.",
      },
    ],
    cta_blocks: ["Subscribe for more live sessions."],
    interaction_prompts: ["Drop a ❤️ if you're ready."],
    technical_checklist: ["Mic check", "Camera on", "Internet stable"],
    sponsor_block: "This is a placeholder sponsor block.",
    closing_script: "Thanks for watching! See you next time.",
    scene_switch_list: ["Intro scene", "Main screen share", "Outro scene"],
  });

export async function generateLivestream(options = {}) {
  const topic = options.topic || "Livestream";
  const platform = options.platform || "YouTube Live";
  const duration = options.duration || 60;
  const style = options.style || "Friendly, Engaging";
  const hostType = options.hostType || "Solo";

  const prompt = buildLivestreamPrompt({ topic, platform, duration, style, hostType });

  if (!openai) {
    return fallbackLivestream();
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You produce livestream run-of-show outlines." },
        { role: "user", content: prompt },
      ],
      temperature: 0.72,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    const normalized = normalizeLivestream(parsed);
    const any = Object.values(normalized || {}).some((v) => (Array.isArray(v) ? v.length : v));
    if (any) return normalized;
  } catch (err) {
    console.error("Livestream Engine Error", err);
  }

  return fallbackLivestream();
}
