export const BUSINESS_CARD_1 = {
  id: "business-card-1",
  width: 1000,
  height: 600,

  slots: [
    {
      id: "background",
      type: "color.background",
      frame: { x: 0, y: 0, width: 1000, height: 600 },
      content: { fill: "#ffffff" },
    },
    {
      id: "accentBar",
      type: "color.primary",
      frame: { x: 0, y: 0, width: 1000, height: 80 },
      content: { fill: "#6366f1" },
    },
    {
      id: "logo",
      type: "logo",
      frame: { x: 60, y: 140, width: 220, height: 220 },
      content: {
        src: null,
        placeholder: true,
      },
    },
    {
      id: "fullName",
      type: "text.heading",
      frame: { x: 320, y: 150, width: 620, height: 120 },
      content: {
        text: "Full Name",
        fontFamily: "Inter",
        fontSize: 64,
        fontWeight: 600,
        lineHeight: 1.1,
        letterSpacing: 0,
        color: "#111111",
      },
    },
    {
      id: "title",
      type: "text.body",
      frame: { x: 320, y: 260, width: 620, height: 80 },
      content: {
        text: "Creative Director",
        fontFamily: "Inter",
        fontSize: 40,
        fontWeight: 400,
        lineHeight: 1.2,
        letterSpacing: 0,
        color: "#444444",
      },
    },
    {
      id: "contact",
      type: "text.body",
      frame: { x: 60, y: 400, width: 880, height: 160 },
      content: {
        text: "email@example.com\n(555) 123-4567\nwebsite.com",
        fontFamily: "Inter",
        fontSize: 36,
        fontWeight: 400,
        lineHeight: 1.3,
        letterSpacing: 0,
        color: "#444444",
        align: "left",
      },
    },
  ],
};
