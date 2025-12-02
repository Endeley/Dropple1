export const muiPacksSeed = [
  {
    name: "Material Base Kit",
    category: "core",
    preview: "/seed/mui/base.png",
  },
  {
    name: "E-commerce UI Kit",
    category: "ecommerce",
    preview: "/seed/mui/ecommerce.png",
  },
];

export const muiComponentsSeed = [
  {
    title: "Button",
    category: "controls",
    preview: "/seed/mui/components/button.png",
    code: "<Button>Click me</Button>",
    props: {
      color: "primary",
      variant: "solid",
      size: "md",
    },
    packName: "Material Base Kit",
  },
  {
    title: "Card",
    category: "layout",
    preview: "/seed/mui/components/card.png",
    code: "<Card><CardContent>Hello</CardContent></Card>",
    props: {},
    packName: "Material Base Kit",
  },
];
