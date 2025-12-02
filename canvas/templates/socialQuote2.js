export const SOCIAL_QUOTE_2 = {
  id: "social-quote-2",
  width: 1080,
  height: 1080,

  slots: [
    {
      id: "background",
      type: "color.background",
      frame: { x: 0, y: 0, width: 1080, height: 1080 },
      content: { fill: "#f7f7f7" },
    },
    {
      id: "card",
      type: "surface",
      frame: { x: 120, y: 200, width: 840, height: 680 },
      content: {
        fill: "#ffffff",
        radius: 40,
        shadow: "0px 20px 60px rgba(0,0,0,0.08)",
      },
    },
    {
      id: "quote",
      type: "text.heading",
      frame: { x: 160, y: 260, width: 760, height: 400 },
      content: {
        text: "“Design is thinking made visual.”",
        fontFamily: "Inter",
        fontSize: 72,
        fontWeight: 500,
        lineHeight: 1.2,
        letterSpacing: 0,
        color: "#111111",
        align: "center",
      },
    },
    {
      id: "author",
      type: "text.body",
      frame: { x: 160, y: 700, width: 760, height: 120 },
      content: {
        text: "— Saul Bass",
        fontFamily: "Inter",
        fontSize: 44,
        fontWeight: 400,
        lineHeight: 1.2,
        letterSpacing: 0,
        color: "#555555",
        align: "center",
      },
    },
  ],
};
