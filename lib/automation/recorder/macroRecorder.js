const recorded = [];

export function startRecording() {
  recorded.length = 0;
  return { status: "recording" };
}

export function recordStep(step) {
  recorded.push({ ...step, ts: Date.now() });
}

export function stopRecording(name = "macro") {
  return {
    name,
    steps: [...recorded],
    createdAt: Date.now(),
  };
}
