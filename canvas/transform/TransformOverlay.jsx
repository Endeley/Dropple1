"use client";

import { HANDLE_DEFS } from "./handleDefs";
import { motion } from "framer-motion";

export default function TransformOverlay({ box, onHandleDown }) {
  if (!box) return null;
  const { x, y, width, height, rotation } = box;

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{}}
    >
      <div
        className="absolute border border-violet-400/70 rounded-sm pointer-events-none"
        style={{
          transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
          transformOrigin: "top left",
          width,
          height,
        }}
      >
        {Object.entries(HANDLE_DEFS).map(([id, def]) => {
          const left =
            def.x === -1 ? 0 : def.x === 1 ? width : width / 2;
          const top =
            def.y === -1 ? 0 : def.y === 1 ? height : height / 2;
          return (
            <motion.div
              key={id}
              onPointerDown={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onHandleDown?.(e, id);
              }}
              className="absolute w-3 h-3 bg-white rounded-full border border-violet-500 pointer-events-auto"
              style={{
                left: left - 6,
                top: top - 6,
                cursor: def.cursor,
              }}
              whileHover={{ scale: 1.15 }}
            />
          );
        })}
      </div>
    </div>
  );
}
