export function normalizeMessaging(data = {}) {
  return {
    mission: data.mission || "",
    vision: data.vision || "",
    promise: data.promise || "",
    value_proposition: data.value_proposition || "",
    elevator_pitch_short: data.elevator_pitch_short || "",
    elevator_pitch_long: data.elevator_pitch_long || "",
    values: Array.isArray(data.values) ? data.values : [],
    messaging_pillars: Array.isArray(data.messaging_pillars) ? data.messaging_pillars : [],
    personality: Array.isArray(data.personality) ? data.personality : [],
    tone_guide: data.tone_guide || {},
    taglines: Array.isArray(data.taglines) ? data.taglines : [],
    audience_breakdown: data.audience_breakdown || { primary: [], secondary: [] },
    brand_story: data.brand_story || "",
    origin_story: data.origin_story || "",
    positioning: data.positioning || "",
    social_bios: data.social_bios || {},
    message_templates: data.message_templates || {},
  };
}
