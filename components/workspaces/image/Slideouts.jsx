"use client";

import SlideoutContainer from "@/components/workspace/common/SlideoutContainer";
import AssetBrowser from "@/components/workspaces/image/slideouts/AssetBrowser";
import FilterBrowser from "@/components/workspaces/image/slideouts/FilterBrowser";
import EffectBrowser from "@/components/workspaces/image/slideouts/EffectBrowser";
import TemplatesBrowser from "@/components/workspaces/image/slideouts/TemplatesBrowser";
import MaskControls from "@/components/workspaces/image/slideouts/MaskControls";
import FilterSettings from "@/components/workspaces/image/slideouts/FilterSettings";
import AISettings from "@/components/workspaces/image/slideouts/AISettings";
import ProjectsBrowser from "@/components/workspaces/image/slideouts/ProjectsBrowser";
import ShapesBrowser from "@/components/workspaces/image/slideouts/ShapesBrowser";
import WorkspaceSettingsDrawer from "@/components/workspaces/image/right-slideouts/WorkspaceSettingsDrawer";

export default function Slideouts() {
  return (
    <>
      <SlideoutContainer
        side="left"
        offset={260}
        slideouts={{
          assets: AssetBrowser,
          filters: FilterBrowser,
          effects: EffectBrowser,
          templates: TemplatesBrowser,
          projects: ProjectsBrowser,
          shapes: ShapesBrowser,
        }}
      />

      <SlideoutContainer
        side="right"
        offset={320}
        slideouts={{
          mask: MaskControls,
          filterSettings: FilterSettings,
          aiSettings: AISettings,
          settings: WorkspaceSettingsDrawer,
        }}
      />
    </>
  );
}
