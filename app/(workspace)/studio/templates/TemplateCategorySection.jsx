"use client";
import TemplateItem from "./TemplateItem";

export default function TemplateCategorySection({ category }) {
  const { title, templates } = category;

  return (
    <div className="mb-6">
      <h3 className="font-medium text-sm mb-2">{title}</h3>

      <div className="flex flex-col gap-3">
        {templates.map((templateId) => (
          <TemplateItem key={templateId} templateId={templateId} />
        ))}
      </div>
    </div>
  );
}
