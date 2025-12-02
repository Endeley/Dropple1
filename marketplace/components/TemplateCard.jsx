"use client";
import Image from "next/image";

export default function TemplateCard({ template }) {
  const previewSrc =
    template?.preview || template?.thumbnail || "/templates/previews/placeholder.png";

  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="relative w-full h-40 bg-neutral-100 dark:bg-neutral-900">
        <Image
          src={previewSrc}
          alt={template.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover"
        />
      </div>

      <div className="p-3">
        <h4 className="font-medium text-sm">{template.title}</h4>
        <div className="text-xs opacity-60 mt-1">{template.category}</div>
      </div>
    </div>
  );
}
