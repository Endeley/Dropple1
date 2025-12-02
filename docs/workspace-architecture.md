# Workspace Architecture Blueprint (Multi-App Ready)

Goal: keep Dropple Web unified now, while making every mode easy to spin out as its own app later (web/desktop/mobile). This sketches the monorepo layout and a mode registry interface to isolate engines from mode UI.

## Monorepo Shape (proposed)

```
apps/
  web/                 # current Next app
  image/               # future standalone shells reuse modes + chrome
  video/
  ...
packages/
  core-canvas/         # fabric/PIXI adapters, selection, guides, snapping
  core-video/          # timeline, playback, encoders, transport
  core-audio/          # waveform, DSP hooks, transcription adapters
  core-vector/         # icon/vector ops, grid/snapping
  core-ai/             # AI pipelines, prompt runners
  core-brand/          # tokens, brand kits, palettes
  core-cloud/          # Convex/client SDK, types, auth/session helpers
  ui-chrome/           # shell: navbars, sidebars, inspector frame, bottom bar
  ui-widgets/          # shared controls (sliders, color pickers, timeline tracks)
  mode-registry/       # registry definitions + defaults
  mode-image/          # mode-specific panels/tools for Image
  mode-uiux/
  mode-video/
  mode-animation/
  mode-podcast/
  mode-ai/
  mode-classroom/
  mode-branding/
  mode-dev/
  mode-mui/
  mode-icons/
```

Migration note: existing `lib/`, `components/workspaces/*`, and `workspace/` assets can be moved into the corresponding `core-*`, `ui-*`, and `mode-*` packages incrementally.

## Mode Registry Interface (TS sketch)

```ts
// packages/mode-registry/src/types.ts
export type Surface =
  | "canvas"
  | "video"
  | "audio"
  | "webgl"
  | "slides"
  | "code"
  | "grid";

export interface ModeDefinition {
  id: "image" | "uiux" | "video" | "animation" | "podcast" | "ai" | "classroom" | "branding" | "dev" | "mui" | "icons";
  label: string;
  accent: string;
  surface: Surface;
  components: {
    left: React.ComponentType;
    inspector: React.ComponentType;
    bottom?: React.ComponentType;
    overlays?: React.ComponentType;
  };
  features: {
    timeline?: boolean;
    transport?: boolean;
    layers?: boolean;
    assets?: boolean;
    snapping?: boolean;
    aiAssist?: boolean;
  };
  defaults?: {
    canvasSize?: { width: number; height: number };
    theme?: "dark" | "light";
  };
}

export type ModeRegistry = Record<ModeDefinition["id"], ModeDefinition>;
```

```ts
// packages/mode-registry/src/index.ts
import { ModeRegistry } from "./types";
import { ImageLeft, ImageInspector, ImageBottom } from "mode-image";
import { UIUXLeft, UIUXInspector, UIUXBottom } from "mode-uiux";
// ...other imports

export const MODES: ModeRegistry = {
  image: {
    id: "image",
    label: "Image",
    accent: "#a855f7",
    surface: "canvas",
    components: { left: ImageLeft, inspector: ImageInspector, bottom: ImageBottom },
    features: { layers: true, assets: true, snapping: true, aiAssist: true },
  },
  uiux: {
    id: "uiux",
    label: "UI / UX",
    accent: "#3b82f6",
    surface: "canvas",
    components: { left: UIUXLeft, inspector: UIUXInspector, bottom: UIUXBottom },
    features: { layers: true, assets: true, snapping: true, aiAssist: true },
  },
  // ...add video, animation, podcast, ai, classroom, branding, dev, mui, icons
};
```

## Consumption in the Shell

```ts
// apps/web/app/workspace/page.tsx
import { MODES } from "mode-registry";
import WorkspaceShell from "ui-chrome/WorkspaceShell";

const mode = resolveModeFromRoute(searchParams);
const def = MODES[mode];

return (
  <WorkspaceShell
    mode={mode}
    left={<def.components.left />}
    inspector={<def.components.inspector />}
    bottom={def.components.bottom ? <def.components.bottom /> : null}
    surface={def.surface}
    features={def.features}
  />
);
```

## Recommended Next Steps
- Add `packages/mode-registry` with the types and a minimal `MODES` map (start with image/uiux).
- Move shared chrome (navbars, inspector frame, bottom bar) into `ui-chrome`.
- Gradually lift core logic (fabric adapter, history/selection stores, timeline, audio) into `core-*` packages.
- Point `/workspace` to the registry so adding/removing modes is config-only.
