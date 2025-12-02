"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  getTemplateDefinition,
  subscribeToTemplateRegistry,
} from "@/foundation/templates/templateRegistry";

function useTemplateDefinition(templateId) {
  const [definition, setDefinition] = useState(() =>
    getTemplateDefinition(templateId)
  );

  useEffect(() => {
    const unsubscribe = subscribeToTemplateRegistry(() => {
      setDefinition(getTemplateDefinition(templateId));
    });
    return unsubscribe;
  }, [templateId]);

  return definition;
}

export default function TemplatePreviewCard({ templateId }) {
  const definition = useTemplateDefinition(templateId) || {};
  const previewSrc = definition.previewURL || "/templates/previews/placeholder.png";

  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-md p-2 bg-white dark:bg-neutral-900 shadow-sm">
      <div className="relative w-full h-24 bg-neutral-100 dark:bg-neutral-900 rounded mb-2 overflow-hidden">
        <Image src={previewSrc} alt={templateId} fill className="object-cover" />
      </div>
      <div className="text-xs opacity-70">{templateId}</div>
    </div>
  );
}
