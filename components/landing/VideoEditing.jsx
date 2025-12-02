'use client';

import { motion } from "framer-motion";
import SectionShell, { item } from "./SectionShell";
import TemplateList from "./TemplateList";
import WorkspaceConsole from "./WorkspaceConsole";
import ModeLayout from "./ModeLayout";

const tracks = [
  { name: "Video A", color: "#4fc3f7" },
  { name: "B-roll", color: "#82b1ff" },
  { name: "Audio FX", color: "#7c4dff" },
];

const templates = [
    { id: 'mui1', title: 'Button Variants', category: 'Buttons', tags: ['Primary', 'Secondary'] },
    { id: 'mui2', title: 'Input Fields', category: 'Inputs', tags: ['Filled', 'Outlined'] },
    { id: 'mui3', title: 'Card Components', category: 'Cards', tags: ['Glass', 'Shadow'] },
    { id: 'mui4', title: 'Navbar Layouts', category: 'Navigation', tags: ['Horizontal', 'Sticky'] },
    { id: 'mui5', title: 'Sidebar Menu', category: 'Navigation', tags: ['Minimal', 'Icons'] },
    { id: 'mui6', title: 'Modal Windows', category: 'Overlay', tags: ['Blurred', 'Center'] },
    { id: 'mui7', title: 'Tabs Variants', category: 'Tabs', tags: ['Underlined', 'Lifted'] },
    { id: 'mui8', title: 'Badge Types', category: 'Badges', tags: ['Counters', 'Labels'] },
    { id: 'mui9', title: 'Form Layouts', category: 'Forms', tags: ['Simple', 'Grid'] },
    { id: 'mui10', title: 'Avatar Sets', category: 'UI', tags: ['Circle', 'Square'] },
    { id: 'mui11', title: 'Button Groups', category: 'Buttons', tags: ['Grouped', 'Actions'] },
    { id: 'mui12', title: 'Data Tables', category: 'Data', tags: ['Sort', 'Filter'] },
];

const consolePanels = [
  { id: "v1", label: "Tracks", meta: "Video/Audio", wiggle: 6 },
  { id: "v2", label: "Effects", meta: "LUT + Stabilize" },
  { id: "v3", label: "Captions", meta: "Auto CC" },
];

export default function VideoEditing() {
  return (
    <SectionShell
      id="video-editing"
      title="Video Editing — Cinematic Studio"
      subtitle="Cinematic dark UI, lens flickers, and a gently scrolling timeline with blinking playhead."
      background="bg-video"
      accentGlow="accent-video"
      overline="Video Editing"
      tone="dark"
    >
      <ModeLayout
        left={
          <motion.div variants={item} className="space-y-6 text-white mode-copy">
            <TemplateList
              title="Video templates"
              description="Jump into pre-cut trailers, shorts, and demos."
              items={templates}
              accent="#4fc3f7"
            />
            <div className="space-y-2">
              {tracks.map((track) => (
                <motion.div
                  key={track.name}
                  variants={item}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 shadow-[0_18px_50px_rgba(66,107,255,0.35)] info-card"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full" style={{ background: track.color }} />
                    <span className="font-semibold">{track.name}</span>
                  </div>
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    className="text-xs text-white/60"
                  >
                    auto-scroll
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        }
        right={
          <WorkspaceConsole
            title="Video Studio"
            subtitle="Timeline synced • LUT active"
            panels={consolePanels}
            accent="#4fc3f7"
            footerTitle="Recent Cut"
            footerSubtitle="Social short"
            footerImage="/images/video.png"
          />
        }
      />
    </SectionShell>
  );
}
