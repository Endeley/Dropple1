"use client";

import { LayerType } from "./layerTypes";

const defaultPadding = { top: 0, right: 0, bottom: 0, left: 0 };

export function createLayer({
  id,
  type = LayerType.FRAME,
  parentId = null,
  children = [],
  x = 0,
  y = 0,
  width = 100,
  height = 100,
  rotation = 0,
  opacity = 1,
  fills = [],
  strokes = [],
  strokeWidth = 1,
  cornerRadius = 0,
  shadows = [],
  text = "",
  fontFamily = "Inter",
  fontSize = 16,
  fontWeight = 400,
  lineHeight = 1.2,
  textAlign = "left",
  src = null,
  masterId = null,
  templateInstanceId = null,
  variant = "Default",
  overrides = {},
  layoutMode = "none",
  padding = defaultPadding,
  spacing = 0,
  layoutAlign = "start",
  layoutJustify = "start",
  constraints = {
    horizontal: "left",
    vertical: "top",
  },
  locked = false,
  visible = true,
} = {}) {
  if (!id) throw new Error("createLayer requires an id");

  return {
    id,
    type,
    parentId,
    children,

    x,
    y,
    width,
    height,
    rotation,
    opacity,

    fills,
    strokes,
    strokeWidth,
    cornerRadius,
    shadows,

    text,
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    textAlign,

    src,

    masterId,
    templateInstanceId,
    variant,
    overrides,

    layoutMode,
    padding: { ...defaultPadding, ...padding },
    spacing,
    layoutAlign,
    layoutJustify,

    constraints,

    locked,
    visible,
  };
}
