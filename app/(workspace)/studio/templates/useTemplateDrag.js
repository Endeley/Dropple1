"use client";

export function useTemplateDrag(templateId) {
  const beginDrag = (e) => {
    e.dataTransfer.setData(
      "application/x-dropple-template",
      JSON.stringify({ templateId })
    );
    e.dataTransfer.effectAllowed = "copy";
  };

  return { beginDrag };
}
