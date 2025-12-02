"use client";
import TemplatePreviewCard from "./TemplatePreviewCard";
import { useTemplateDrag } from "./useTemplateDrag";

export default function TemplateItem({ templateId }) {
  const { beginDrag } = useTemplateDrag(templateId);

  return (
    <div
      draggable
      onDragStart={beginDrag}
      className="cursor-grab active:cursor-grabbing"
    >
      <TemplatePreviewCard templateId={templateId} />
    </div>
  );
}
