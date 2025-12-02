export function runAIPipeline(prompt, steps = ["concept", "refine", "render"]) {
  return {
    prompt,
    steps: steps.map((s) => ({ stage: s, status: "queued" })),
  };
}
