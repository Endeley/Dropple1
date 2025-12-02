"use client";

import { motion } from "framer-motion";
import SectionShell, { item } from "./SectionShell";
import TemplateList from "./TemplateList";
import WorkspaceConsole from "./WorkspaceConsole";
import ModeLayout from "./ModeLayout";

const states = ["Hover", "Pressed", "Disabled", "Default"];

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
  { id: "m1", label: "Components", meta: "Material v5" },
  { id: "m2", label: "Themes", meta: "Light/Dark" },
  { id: "m3", label: "States", meta: "Hover/Pressed" },
];

export default function MaterialUi() {
  return (
    <SectionShell
      id="material-ui"
      title="Material UI Mode — Component Factory"
      subtitle="Cool blue gradients with Material states. Buttons animate across states, tiles flip, and variant cards rearrange in stagger."
      background="bg-material"
      accentGlow="accent-material"
      overline="Material UI"
    >
      <ModeLayout
        left={
          <motion.div variants={item} className="space-y-6 rounded-2xl border border-[#d5e3ff] bg-white p-4 shadow-[0_18px_50px_rgba(140,176,255,0.22)] mode-copy">
            <p className="text-lg text-slate-700">
              Buttons transition through hover → pressed → disabled → default; component tiles flip and reorder with stagger.
            </p>
            <TemplateList
              title="Material templates"
              description="Dashboards, auth flows, and component kits in Material."
              items={templates}
              accent="#4f82ff"
            />
            <div className="flex flex-wrap gap-2">
              {states.map((state) => (
                <motion.button
                  key={state}
                  whileHover={{ scale: 1.05, boxShadow: "0 12px 30px rgba(79,130,255,0.35)" }}
                  whileTap={{ scale: 0.96 }}
                  className={`material-btn ${state === "Disabled" ? "disabled" : state === "Pressed" ? "pressed" : state === "Hover" ? "hovered" : "default"}`}
                  disabled={state === "Disabled"}
                >
                  {state}
                </motion.button>
              ))}
            </div>
          </motion.div>
        }
        right={
          <WorkspaceConsole
            title="Material Factory"
            subtitle="Components • Themes • States"
            panels={consolePanels}
            accent="#4f82ff"
            footerTitle="Recent UI"
            footerSubtitle="Material dashboard"
            footerImage="/images/material.png"
          />
        }
      />
    </SectionShell>
  );
}
