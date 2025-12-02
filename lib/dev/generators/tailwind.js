export default function generateTailwind({ layers }) {
  const content = layers
    .map((layer) => {
      if (layer.type === "text") {
        return `<p class="text-[${layer.fontSize || 16}px] font-[${layer.fontWeight || 400}] text-[${
          layer.fill || "#111"
        }]">${layer.text || "Lorem ipsum"}</p>`;
      }
      if (layer.type === "rect") {
        return `<div class="w-[${layer.width || 100}px] h-[${
          layer.height || 100
        }px] bg-[${layer.fill || "#e5e7eb"}] rounded-[${layer.radius || 0}px]"></div>`;
      }
      return "";
    })
    .join("\n");

  return `<div class="flex flex-col gap-4 p-6 bg-white rounded-2xl shadow-xl">
${content}
</div>`;
}
