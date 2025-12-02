export async function generateLogo({ name = "Brand" }) {
  // Placeholder: real AI vector generation would run here.
  return {
    name,
    variants: [
      { type: "wordmark", svg: "<svg><!-- wordmark --></svg>" },
      { type: "icon", svg: "<svg><!-- icon --></svg>" },
    ],
  };
}
