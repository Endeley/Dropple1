export const SOCIAL_HERO_1 = {
  id: "social-hero-1",
  width: 1080,
  height: 1350,

  slots: [
    {
      id: "background",
      type: "color.background",
      frame: { x: 0, y: 0, width: 1080, height: 1350 },
      content: { fill: "#ffffff" },
    },
    {
      id: "header",
      type: "text.heading",
      frame: { x: 80, y: 120, width: 900, height: 200 },
      content: {
        text: "Grow Your Business Today",
        fontFamily: "Inter",
        fontWeight: 600,
        fontSize: 96,
        lineHeight: 1.1,
        letterSpacing: 0,
        color: "#111111",
        align: "left",
      },
    },
    {
      id: "subhead",
      type: "text.body",
      frame: { x: 80, y: 350, width: 800, height: 200 },
      content: {
        text: "Market smarter. Reach more customers.",
        fontFamily: "Inter",
        fontSize: 48,
        fontWeight: 400,
        lineHeight: 1.3,
        letterSpacing: 0,
        color: "#333333",
        align: "left",
      },
    },
    {
      id: "cta",
      type: "surface",
      frame: { x: 80, y: 560, width: 380, height: 120 },
      content: {
        fill: "#6366f1",
        radius: 24,
        text: "Learn More",
        textColor: "#ffffff",
        textSize: 42,
        align: "center",
      },
    },
    {
      id: "heroImage",
      type: "image",
      frame: { x: 80, y: 740, width: 920, height: 520 },
      content: {
        src: null,
        objectFit: "cover",
        placeholder: true,
      },
    },
  ],
};
