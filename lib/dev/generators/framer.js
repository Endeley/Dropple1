export default function generateFramer({ layers }) {
  return `import { motion } from "framer-motion";

export default function DroppleMotion() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4 p-6">
      ${layers
        .map((layer, index) => {
          if (layer.type === "text") {
            return `<motion.p key="layer-${index}" whileHover={{ scale: 1.02 }}>
        ${layer.text || "Lorem ipsum"}
      </motion.p>`;
          }
          return `<motion.div key="layer-${index}" className="w-[${layer.width || 120}px] h-[${
            layer.height || 120
          }px] bg-[${layer.fill || "#e5e7eb"}]" />`;
        })
        .join("\n      ")}
    </motion.div>
  );
}`;
}
