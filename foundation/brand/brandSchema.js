"use client";

export function createBrandKit({
  id,
  name = "My Brand",
  logo = null,
  colors = {
    primary: null,
    secondary: null,
    accent: null,
    neutral: null,
  },
  fonts = {
    heading: null,
    body: null,
  },
  style = "rounded",
} = {}) {
  if (!id) {
    id = "brand_" + (crypto?.randomUUID ? crypto.randomUUID() : Date.now());
  }

  return {
    id,
    name,
    logo,
    colors,
    fonts,
    style,
  };
}
