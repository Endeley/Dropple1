export const createDefaultBrandKit = () => ({
  id: null,
  name: "Default Brand",

  colors: {
    primary: "#6366f1",
    secondary: "#a855f7",
    background: "#ffffff",
    surface: "#f5f5f5",
    textPrimary: "#111111",
    textSecondary: "#555555",
  },

  fonts: {
    heading: "Inter",
    body: "Inter",
  },

  assets: {
    logo: null,
    icon: null,
  },

  radii: {
    card: 12,
    button: 8,
  },

  shadows: {
    card: "0px 6px 20px rgba(0,0,0,0.08)",
  },
});
