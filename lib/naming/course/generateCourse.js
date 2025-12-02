"use server";

import OpenAI from "openai";
import { buildCoursePrompt } from "./buildCoursePrompt";
import { normalizeCourse } from "./normalizeCourse";

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

const fallbackCourse = (topic = "Your Course") =>
  normalizeCourse({
    course_title_options: [`${topic} — Starter Course`, `${topic}: Quick Overview`],
    course_summary: "Placeholder course summary. Set OPENAI_API_KEY for full generation.",
    modules: [
      {
        title: "Module 1",
        lessons: [
          {
            title: "Lesson 1",
            duration: "10 minutes",
            objectives: ["Understand basics"],
            requirements: [],
            script: "This is a placeholder lesson script.",
            activities: ["Try the tool"],
            homework: "Reflect on what you learned.",
            quiz: ["What is the key idea?"],
          },
        ],
      },
    ],
    final_project: "Create a sample project to apply your learning.",
    resources: ["https://dropple.com"],
  });

export async function generateCourse(options = {}) {
  const topic = options.topic || "Your Course";
  const audience = options.audience || "Beginners";
  const level = options.level || "Beginner";
  const format = options.format || "Video Course";
  const modules = options.modules || 5;
  const length = options.length || 5;

  const prompt = buildCoursePrompt({ topic, audience, level, format, modules, length });

  if (!openai) {
    return fallbackCourse(topic);
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You build full course structures and lesson plans." },
        { role: "user", content: prompt },
      ],
      temperature: 0.68,
    });

    const content = response?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content) || {};
    const normalized = normalizeCourse(parsed);
    const any = Object.values(normalized || {}).some((v) => (Array.isArray(v) ? v.length : v));
    if (any) return normalized;
  } catch (err) {
    console.error("Course Engine Error", err);
  }

  return fallbackCourse(topic);
}
