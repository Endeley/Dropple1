"use client";

import TemplateCard from "./TemplateCard";
import TemplateFilters from "./TemplateFilters";
import { useMarketplaceStore } from "../store/useMarketplaceStore";
import { TEMPLATE_METADATA } from "@/foundation/templates/templateMetadata";
import { MODE_CARDS, resolveMode } from "@/packages/mode-registry";

function resolveTemplateMode(template) {
  const explicit = resolveMode(template?.mode);
  if (explicit) return explicit;
  const category = (template?.category || "").toLowerCase();
  const slugMatch = MODE_CARDS.find((mode) => (mode.slugs || []).includes(category));
  if (slugMatch) return slugMatch.id;
  return null;
}

export default function TemplateMarketplaceHome() {
  const activeCategory = useMarketplaceStore((s) => s.activeCategory);
  const activeMode = useMarketplaceStore((s) => s.activeMode);
  const searchTerm = useMarketplaceStore((s) => s.searchTerm);

  const filtered = Object.values(TEMPLATE_METADATA).filter((template) => {
    if (activeCategory !== "all" && template.category !== activeCategory) {
      return false;
    }
    if (
      searchTerm &&
      !template.title.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    if (activeMode !== "all") {
      const templateMode = resolveTemplateMode(template);
      if (templateMode !== activeMode) return false;
    }
    return true;
  });

  return (
    <div className="flex h-full">
      <TemplateFilters />

      <div className="flex-1 p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto">
        {filtered.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
}
