"use client";

import { useAIStudioStore } from "@/lib/state/aiStudio/useAIStudioStore";

const categories = [
  "poster",
  "flyer",
  "resume",
  "business-card",
  "thumbnail",
  "social-post",
  "logo",
  "presentation-slide",
];

export default function TemplateCategorySelector({ value, onChange }) {
  const templateCategoryState = useAIStudioStore((s) => s.templateCategory);
  const setTemplateCategoryState = useAIStudioStore((s) => s.setTemplateCategory);
  const templateCategory = value ?? templateCategoryState;
  const setTemplateCategory = onChange ?? setTemplateCategoryState;

  return (
    <div>
      <p className="text-sm text-white/80 mb-2">Template Type</p>
      <div className="grid grid-cols-2 gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setTemplateCategory(category)}
            className={`px-2 py-2 rounded-lg text-xs border transition ${
              templateCategory === category
                ? "bg-violet-600 border-violet-500"
                : "bg-white/[0.05] hover:bg-white/[0.1] border-white/10"
            }`}
          >
            {category.replace("-", " ")}
          </button>
        ))}
      </div>
    </div>
  );
}
