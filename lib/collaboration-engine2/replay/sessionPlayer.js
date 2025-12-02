export function playRecording(recording = []) {
  return recording.map((e) => ({ ...e, played: true }));
}
