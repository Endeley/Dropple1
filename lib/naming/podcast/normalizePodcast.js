export function normalizePodcast(data = {}) {
  return {
    cold_open: data.cold_open || "",
    intro: data.intro || "",
    segments: Array.isArray(data.segments) ? data.segments : [],
    cta: data.cta || "",
    outro: data.outro || "",
    show_notes: data.show_notes || "",
    timestamps: Array.isArray(data.timestamps) ? data.timestamps : [],
  };
}
