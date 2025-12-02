export function generatePlot({ concept = "", tone = "modern", duration = 60 }) {
  return {
    title: concept || "Untitled Story",
    synopsis: `${concept} — ${tone} tone.`,
    acts: [
      { name: "Act 1 — Setup", beats: ["Introduce characters", "Establish world", "Inciting moment"] },
      { name: "Act 2 — Confrontation", beats: ["Escalate conflict", "Raise stakes", "Reversal"] },
      { name: "Act 3 — Resolution", beats: ["Climax", "Resolution", "Aftermath"] },
    ],
    duration,
  };
}
