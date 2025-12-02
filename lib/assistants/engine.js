"use server";

import OpenAI from "openai";
import { buildContext } from "./contextBuilder";
import layoutAssistant from "./assistants/layout";
import copyAssistant from "./assistants/copy";
import colorAssistant from "./assistants/color";
import namingAssistant from "./assistants/naming";
import animationAssistant from "./assistants/animation";
import brandAssistant from "./assistants/brand";
import templateAssistant from "./assistants/template";
import uikitAssistant from "./assistants/uikit";
import codeAssistant from "./assistants/code";

const assistants = [
  layoutAssistant,
  copyAssistant,
  colorAssistant,
  namingAssistant,
  animationAssistant,
  brandAssistant,
  templateAssistant,
  uikitAssistant,
  codeAssistant,
];

const assistantMap = Object.fromEntries(assistants.map((a) => [a.id, a]));

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

const fallbackActions = [
  {
    type: "activity",
    message: "Assistant could not run (no API key). Consider setting OPENAI_API_KEY.",
  },
];

export async function runAssistant(id, instruction, { document, selection, viewState } = {}) {
  const assistant = assistantMap[id];
  if (!assistant) throw new Error("Assistant not found");

  const context = buildContext({ document, selection, viewState });
  const system = assistant.system;
  const userPrompt = `
Context:
${JSON.stringify(context)}

Instruction: ${instruction}

Return ONLY a JSON array of actions. No prose.
`;

  if (!openai) {
    return fallbackActions;
  }

  try {
    const res = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
    });

    const content = res?.choices?.[0]?.message?.content;
    const parsed = safeJSON(content);
    if (parsed && Array.isArray(parsed)) return parsed;
    if (parsed && parsed.actions && Array.isArray(parsed.actions)) return parsed.actions;
  } catch (err) {
    console.error("Assistant run error", err);
  }

  return fallbackActions;
}

export function listAssistants() {
  return assistants;
}
