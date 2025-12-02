'use client';

import { motion } from "framer-motion";
import SectionShell, { item } from "./SectionShell";
import TemplateList from "./TemplateList";
import WorkspaceConsole from "./WorkspaceConsole";
import ModeLayout from "./ModeLayout";

const features = [
  "Auto-layout + constraints snap into place",
  "Variants and states with responsive breakpoints",
  "Interactive prototypes with gestures and flows",
  "Design tokens synced to Dev Mode handoff",
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
  { id: "u1", label: "Components", meta: "Variants", wiggle: 6 },
  { id: "u2", label: "Breakpoints", meta: "Desktop/Tablet/Mobile" },
  { id: "u3", label: "Prototype", meta: "Gestures" },
];

export default function UiUx() {
  return (
    <SectionShell
      id="ui-ux"
      title="UI/UX — Precision Layout"
      subtitle="Clean grids, auto-layout snaps, and per-breakpoint components built to hand off cleanly to code."
      background="bg-uiux"
      accentGlow="accent-uiux"
      overline="UI / UX"
    >
      <ModeLayout
        left={
          <motion.div variants={item} className="space-y-6 mode-copy">
            <TemplateList
              title="UI/UX templates"
              description="Dashboard flows, mobile apps, and marketing landings."
              items={templates}
              accent="#4f82ff"
            />
            <div className="space-y-3">
              {features.map((feature, idx) => (
                <motion.div
                  key={feature}
                  variants={item}
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-800 shadow-[0_16px_40px_rgba(82,136,255,0.12)] transition hover:-translate-y-1 hover:border-slate-300 info-card"
                >
                  <motion.span
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2 + idx * 0.2, repeat: Infinity, ease: "easeInOut" }}
                    className="mt-1 h-2 w-2 shrink-0 rounded-full bg-linear-to-br from-[#8cb7ff] to-[#4d6bff] shadow-[0_0_12px_rgba(77,107,255,0.6)]"
                  />
                  <span className="font-semibold">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        }
        right={
          <WorkspaceConsole
            title="UI Workspace"
            subtitle="Variants • Breakpoints • Prototype"
            panels={consolePanels}
            accent="#4f82ff"
            footerTitle="Recent UI"
            footerSubtitle="Dashboard flow"
            footerImage="/images/ui.png"
          />
        }
      />
    </SectionShell>
  );
}
