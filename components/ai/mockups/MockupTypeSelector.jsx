"use client";

import { useAIStudioStore } from "@/lib/state/aiStudio/useAIStudioStore";

const types = [
  { id: "tshirt-front", label: "T-shirt (Front)" },
  { id: "tshirt-back", label: "T-shirt (Back)" },
  { id: "hoodie-front", label: "Hoodie" },
  { id: "poster", label: "Poster" },
  { id: "business-card", label: "Business Card" },
  { id: "phone", label: "Phone" },
  { id: "box", label: "Product Box" },
  { id: "bottle", label: "Bottle" },
];

export default function MockupTypeSelector() {
  const mockupType = useAIStudioStore((s) => s.mockupType);
  const setMockupType = useAIStudioStore((s) => s.setMockupType);

  return (
    <div>
      <p className="text-sm text-white/80 mb-2">Mockup Type</p>
      <div className="grid grid-cols-2 gap-2">
        {types.map((type) => (
          <button
            key={type.id}
            onClick={() => setMockupType(type.id)}
            className={`px-2 py-2 rounded-lg text-xs border transition ${
              mockupType === type.id
                ? "bg-violet-600 border-violet-500"
                : "bg-white/[0.05] hover:bg-white/[0.1] border-white/10"
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>
    </div>
  );
}
