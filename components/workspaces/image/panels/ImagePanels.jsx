"use client";

import AdjustmentsPanel from "./AdjustmentsPanel";
import FiltersPanel from "./FiltersPanel";
import EffectsPanel from "./EffectsPanel";
import MaskPanel from "./MaskPanel";
import CanvasSettingsPanel from "./CanvasSettingsPanel";
import TransformPanel from "./TransformPanel";
import MetadataPanel from "./MetadataPanel";

export default function ImagePanels() {
  return (
    <div className="space-y-4">
      <AdjustmentsPanel />
      <FiltersPanel />
      <EffectsPanel />
      <MaskPanel />
      <TransformPanel />
      <CanvasSettingsPanel />
      <MetadataPanel />
    </div>
  );
}
