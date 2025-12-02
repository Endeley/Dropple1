"use client";

import { getSlotVisualStyles } from "@/canvas/renderer/utils/slotVisuals";
import CharacterTextLayer from "./CharacterTextLayer";

export default function MotionTrailFrame({ state, opacity = 0.2, blur = 0, scale = 1 }) {
  if (!state) return null;

  return (
    <>
      {(state.slots || []).map((slot) => {
        const visualStyle = getSlotVisualStyles(slot);
        const slotOpacity = (slot.content?.opacity ?? 1) * opacity;
        const slotScale = (slot.content?.scale ?? 1) * scale;
        const transform = slotScale !== 1 ? `scale(${slotScale})` : undefined;

        return (
          <div
            key={`${slot.id}-trail`}
            className="absolute pointer-events-none"
            style={{
              left: slot.frame?.x || 0,
              top: slot.frame?.y || 0,
              width: slot.frame?.width || 0,
              height: slot.frame?.height || 0,
              opacity: slotOpacity,
              transform,
              transformOrigin: "center center",
              filter: blur ? `blur(${blur}px)` : undefined,
            }}
          >
            <div className="absolute inset-0" style={visualStyle.container}>
              {slot.content?._layout?.characters?.length ? (
                <CharacterTextLayer
                  characters={slot.content._layout.characters}
                  content={slot.content}
                  opacityMultiplier={opacity}
                  blur={blur}
                />
              ) : slot.content?.text ? (
                <span
                  className="absolute inset-0 flex items-center justify-start"
                  style={{
                    color: slot.content.color || "#111827",
                    fontSize: slot.content.fontSize ?? 16,
                    fontFamily: slot.content.fontFamily || "Inter, sans-serif",
                    fontWeight: slot.content.fontWeight ?? 500,
                    opacity,
                    filter: blur ? `blur(${blur}px)` : undefined,
                    padding: slot.content.padding ?? 12,
                  }}
                >
                  {slot.content.text}
                </span>
              ) : null}
            </div>
          </div>
        );
      })}
    </>
  );
}
