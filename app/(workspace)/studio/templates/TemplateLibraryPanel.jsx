"use client";
import TemplateCategorySection from "./TemplateCategorySection";

const TEMPLATE_CATEGORIES = [
  {
    id: "social",
    title: "Social Media",
    templates: ["social-hero-1", "social-quote-2"],
  },
  {
    id: "business",
    title: "Business",
    templates: ["business-card-1", "flyer-2"],
  },
];

export default function TemplateLibraryPanel() {
  return (
    <div className="w-64 h-full overflow-y-auto border-r border-neutral-200 dark:border-neutral-800 p-4">
      <h2 className="font-semibold text-lg mb-4">Template Library</h2>

      {TEMPLATE_CATEGORIES.map((cat) => (
        <TemplateCategorySection key={cat.id} category={cat} />
      ))}
    </div>
  );
}
