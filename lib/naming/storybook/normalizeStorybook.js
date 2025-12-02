export function normalizeStorybook(data = {}) {
  return {
    brand_story: data.brand_story || "",
    mission: data.mission || "",
    vision: data.vision || "",
    values: Array.isArray(data.values) ? data.values : [],
    personality: Array.isArray(data.personality) ? data.personality : [],
    voice: data.voice || {},
    messaging: data.messaging || {},
    visuals: data.visuals || {},
    applications: data.applications || {},
  };
}
