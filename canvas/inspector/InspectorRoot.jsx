"use client";

import { useEffect } from "react";
import { useLayerStore } from "@/canvas/core/layerStore";
import { LayerType } from "@/canvas/core/layerTypes";
import { getInspectorForLayer } from "./inspectorRegistry";
import LayerHeaderPanel from "./panels/LayerHeaderPanel";
import PositionPanel from "./panels/PositionPanel";
import SizePanel from "./panels/SizePanel";
import RotationPanel from "./panels/RotationPanel";
import FillPanel from "./panels/FillPanel";
import StrokePanel from "./panels/StrokePanel";
import ShadowPanel from "./panels/ShadowPanel";
import ImagePanel from "./panels/ImagePanel";
import LayoutPanel from "./panels/LayoutPanel";
import ConstraintsPanel from "./panels/ConstraintsPanel";
import ComponentOverridesPanel from "./panels/ComponentOverridesPanel";
import VariantSelectorPanel from "./panels/VariantSelectorPanel";
import ComponentStructurePanel from "./panels/ComponentStructurePanel";
import InstanceChildHeader from "./panels/InstanceChildHeader";
import TextChildPanel from "./panels/child/TextChildPanel";
import FillChildPanel from "./panels/child/FillChildPanel";
import StrokeChildPanel from "./panels/child/StrokeChildPanel";
import ShadowChildPanel from "./panels/child/ShadowChildPanel";
import ImageChildPanel from "./panels/child/ImageChildPanel";
import LayoutChildPanel from "./panels/child/LayoutChildPanel";
import { registerDefaultInspectors } from "./registerSections";
import { useLayerSelectionStore } from "@/canvas/selection/layerSelectionStore";
import { useResolvedLayerTree } from "@/canvas/components/getResolvedLayerTree";
import { OverrideProvider } from "./override/OverrideContext";
import { useEditorMode } from "@/canvas/editor/editorModeStore";
import MasterInspector from "./MasterInspector";
import { useComponentStore } from "@/canvas/components/componentStore";
import TemplateInstancePanel from "./panels/TemplateInstancePanel";
import SlotInspector from "./panels/SlotInspector";
import { resolveTemplateInstance } from "@/foundation/templates/resolveTemplateInstance";

export default function InspectorRoot() {
  useEffect(() => {
    registerDefaultInspectors();
  }, []);

  const editorMode = useEditorMode((state) => state.mode);
  const masterId = useEditorMode((state) => state.masterId);
  const master = useComponentStore((state) =>
    masterId ? state.masters[masterId] : null
  );
  if (editorMode === "component") {
    return <MasterInspector master={master} />;
  }

  const selection = useLayerSelectionStore((state) => state.selected);
  const layers = useLayerStore((state) => state.layers);

  if (!selection) {
    return (
      <div className="w-full h-full flex items-center justify-center text-neutral-500 text-sm">
        No layer selected
      </div>
    );
  }

  if (editorMode === "component") {
    const master = useComponentStore((state) =>
      masterId ? state.masters[masterId] : null
    );
    return <MasterInspector master={master} />;
  }

  if (selection.type === "instance-child") {
    const resolved = useResolvedLayerTree(selection.instanceId);
    const childLayer = resolved?.layers?.[selection.layerId];

    if (!childLayer) {
      return (
        <div className="w-full h-full flex items-center justify-center text-neutral-500 text-sm">
          Select a component layer to edit.
        </div>
      );
    }

    const panels = [];
    if (childLayer.type === LayerType.TEXT) {
      panels.push(<TextChildPanel key="text" />);
      panels.push(<FillChildPanel key="fill" />);
      panels.push(<StrokeChildPanel key="stroke" />);
    } else if (childLayer.type === LayerType.IMAGE) {
      panels.push(<ImageChildPanel key="image" />);
    } else {
      panels.push(<FillChildPanel key="fill" />);
      panels.push(<StrokeChildPanel key="stroke" />);
    }
    panels.push(<ShadowChildPanel key="shadow" />);
    panels.push(<LayoutChildPanel key="layout" />);

    return (
      <OverrideProvider
        instanceId={selection.instanceId}
        masterLayerId={selection.layerId}
      >
        <div className="p-4 space-y-4 overflow-y-auto text-white">
          <InstanceChildHeader layer={childLayer} />
          {panels}
        </div>
      </OverrideProvider>
    );
  }

  if (selection.type === "template-slot") {
    const resolvedTemplate = resolveTemplateInstance(selection.instanceId);
    const slotLayer = resolvedTemplate?.layers?.[selection.slotId];
    if (!slotLayer) {
      return (
        <div className="w-full h-full flex items-center justify-center text-neutral-500 text-sm">
          Select a slot to edit.
        </div>
      );
    }

    return (
      <div className="p-4 space-y-4 overflow-y-auto text-white">
        <SlotInspector instanceId={selection.instanceId} layer={slotLayer} />
      </div>
    );
  }

  const layer = layers[selection.id];
  if (!layer) {
    return (
      <div className="w-full h-full flex items-center justify-center text-neutral-500 text-sm">
        Layer not found
      </div>
    );
  }

  if (layer.type === LayerType.TEMPLATE_INSTANCE) {
    return (
      <div className="p-4 space-y-4 overflow-y-auto text-white">
        <LayerHeaderPanel layer={layer} />
        <TemplateInstancePanel layer={layer} />
      </div>
    );
  }

  const InspectorSection = getInspectorForLayer(layer);

  return (
    <div className="p-4 space-y-4 overflow-y-auto text-white">
      <LayerHeaderPanel layer={layer} />
      <PositionPanel layer={layer} />
      <SizePanel layer={layer} />
      <RotationPanel layer={layer} />

      {selection.type === "instance" && <ComponentStructurePanel instanceLayer={layer} />}

      {InspectorSection && (
        <div className="bg-neutral-900/60 rounded-md p-3">
          <InspectorSection layer={layer} />
        </div>
      )}

      <FillPanel layer={layer} />
      <StrokePanel layer={layer} />
      <ShadowPanel layer={layer} />
      <ImagePanel layer={layer} />
      <LayoutPanel layer={layer} />
      <ConstraintsPanel layer={layer} />

      {layer.type === LayerType.COMPONENT_INSTANCE && (
        <>
          <VariantSelectorPanel layer={layer} />
          <ComponentOverridesPanel layer={layer} />
        </>
      )}
    </div>
  );
}
