"use client";

import { getSlotVisualStyles, getSlotText } from "@/canvas/renderer/utils/slotVisuals";
import CharacterTextLayer from "@/canvas/renderer/ui/CharacterTextLayer";

export default function PreviewCanvasLayer({ definition, opacity = 0.65 }) {
  if (!definition) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none z-[3100] transition-opacity duration-150"
      style={{ opacity }}
    >
      {(definition.slots || []).map((slot) => {
        const visualStyle = getSlotVisualStyles(slot);
        const textValue = getSlotText(slot);
        const slotOpacity = slot.content?.opacity ?? 1;
        const slotScale = slot.content?.scale ?? 1;
        const transform = slotScale !== 1 ? `scale(${slotScale})` : undefined;
        return (
          <div
            key={slot.id}
            className="absolute"
            style={{
              left: slot.frame?.x || 0,
              top: slot.frame?.y || 0,
              width: slot.frame?.width || 0,
              height: slot.frame?.height || 0,
              opacity: slotOpacity,
              transform,
              transformOrigin: "center center",
            }}
          >
            <div className="absolute inset-0" style={visualStyle.container}>
              {slot.content?._layout?.characters?.length ? (
                <CharacterTextLayer
                  characters={slot.content._layout.characters}
                  content={slot.content}
                />
              ) : (
                textValue && (
                  <span className="w-full" style={visualStyle.text}>
                    {textValue}
                  </span>
                )
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
