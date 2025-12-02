export async function encodeAudio({ buffer, format = "wav", sampleRate = 48000 }) {
  // Placeholder: wire to WebAudio/AudioWorklet encoder or WASM.
  return {
    ok: false,
    note: "Audio encoder not implemented",
    format,
    sampleRate,
  };
}
