export function buildStoryboardPrompt({ script, style, aspect, characters = [] } = {}) {
  return `
You are Dropple's Storyboarding Engine.  
Turn the script below into a complete storyboard.

Script:
${script}

Art Style: ${style}
Aspect Ratio: ${aspect}
Characters: ${JSON.stringify(characters)}

Return JSON ONLY:

{
  "scenes": [
    {
      "scene_number": 1,
      "title": "",
      "description": "",
      "shots": [
        {
          "shot_number": 1,
          "shot_type": "",
          "camera_angle": "",
          "camera_motion": "",
          "visual": "",
          "characters": [],
          "lighting": "",
          "notes": ""
        }
      ]
    }
  ],
  "style_guide": {
    "palette": [],
    "line_style": "",
    "composition": "",
    "motion": ""
  }
}

Rules:
- Scene titles must be short + descriptive.
- Shots: Include shot type (CU, MCU, WS, OS, etc.)
- Camera angles: high, low, eye-level.
- Camera motion: pan, tilt, zoom, static.
- Visual: describe what is seen.
- Use characters provided.
- Style guide must match tone and genre.
- Keep JSON clean and structured.
`.trim();
}
