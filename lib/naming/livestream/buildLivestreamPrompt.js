export function buildLivestreamPrompt({ topic, platform, duration, style, hostType } = {}) {
  return `
You are Dropple’s Livestream Outline Engine.

Generate a complete run-of-show for a livestream.

Topic: "${topic}"
Platform: ${platform}
Duration: ${duration} minutes
Tone & Style: ${style}
Host Type: ${hostType}

Return JSON ONLY:

{
  "run_of_show": [
    {
      "start_time": "",
      "end_time": "",
      "segment_title": "",
      "talking_points": [],
      "chat_prompts": [],
      "overlay_suggestions": [],
      "notes": ""
    }
  ],
  "cta_blocks": [],
  "interaction_prompts": [],
  "technical_checklist": [],
  "sponsor_block": "",
  "closing_script": "",
  "scene_switch_list": []
}

Rules:
- Break the livestream into logical segments.
- Each segment: 3–10 minutes.
- Include talking points for each segment.
- Include chat prompts.
- Include overlay suggestions.
- Provide technical checklist for setup.
- Include CTA blocks.
- Include sponsor block (optional).
- Include full closing script.
- Include recommended scene switches (OBS style).
- Must match tone + platform.
`.trim();
}
