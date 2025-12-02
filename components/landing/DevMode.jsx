"use client";

import { motion } from "framer-motion";
import SectionShell, { item } from "./SectionShell";
import TemplateList from "./TemplateList";
import WorkspaceConsole from "./WorkspaceConsole";
import ModeLayout from "./ModeLayout";

const snippets = [
  "npm run dev -- --mode=live",
  "Export tokens → JSON / TS",
  "Lint accessibility: 3 issues",
];

const templates = [
    { id: 'dev1', title: 'API Docs Page', category: 'Docs', tags: ['REST', 'Clean'] },
    { id: 'dev2', title: 'Code Editor Layout', category: 'Editor', tags: ['Dark', 'Green'] },
    { id: 'dev3', title: 'Mock API Response', category: 'Mock', tags: ['JSON', 'Schema'] },
    { id: 'dev4', title: 'Component Preview', category: 'UI', tags: ['React', 'Tailwind'] },
    { id: 'dev5', title: 'Auth Flow', category: 'Auth', tags: ['Login', 'Secure'] },
    { id: 'dev6', title: 'API Playground', category: 'Testing', tags: ['Live', 'Console'] },
    { id: 'dev7', title: 'Webhook Tester', category: 'Tools', tags: ['Events', 'Payload'] },
    { id: 'dev8', title: 'Token Manager', category: 'Security', tags: ['JWT', 'Keys'] },
    { id: 'dev9', title: 'Database Schema', category: 'DB', tags: ['Tables', 'Models'] },
    { id: 'dev10', title: 'GraphQL Explorer', category: 'Tools', tags: ['Queries', 'Schema'] },
    { id: 'dev11', title: 'Error Logs', category: 'Monitoring', tags: ['Debug', 'Console'] },
    { id: 'dev12', title: 'CLI Output', category: 'Terminal', tags: ['Commands', 'Green'] },
];

const consolePanels = [
  { id: "d1", label: "Build", meta: "Watch", wiggle: 6 },
  { id: "d2", label: "Lint", meta: "3 issues" },
  { id: "d3", label: "Exports", meta: "React / Vue" },
];

export default function DevMode() {
  return (
    <SectionShell
      id="dev-mode"
      title="Dev Mode — Code Terminal Reality"
      subtitle="Matrix-black with neon green outlines. Code auto-types, terminals blink, and hovering panels emit neon strokes."
      background="bg-dev"
      accentGlow="accent-dev"
      overline="Dev Mode"
      tone="dark"
    >
      <ModeLayout
        left={
          <motion.div variants={item} className="space-y-6 mode-copy">
            <TemplateList
              title="Dev templates"
              description="Exports, audits, and perf budgets ready to run."
              items={templates}
              accent="#10b981"
            />
            <div className="space-y-3">
              {snippets.map((line, idx) => (
                <motion.div
                  key={line}
                  variants={item}
                  className="rounded-2xl border border-[#1aff7c]/25 bg-linear-to-br from-[#0a0f0f] to-[#050707] px-4 py-3 text-[#8bffb7] shadow-[0_18px_50px_rgba(0,255,171,0.2)] info-card"
                >
                  <motion.span
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.4 + idx * 0.2, repeat: Infinity, ease: "easeInOut" }}
                    className="pr-2 text-[#1aff7c]"
                  >
                    ▍
                  </motion.span>
                  {line}
                </motion.div>
              ))}
            </div>
          </motion.div>
        }
        right={
          <WorkspaceConsole
            title="Dev Console"
            subtitle="Build • Lint • Export"
            panels={consolePanels}
            accent="#10b981"
            footerTitle="Recent Export"
            footerSubtitle="Component handoff"
            footerImage="/images/dev.png"
          />
        }
      />
    </SectionShell>
  );
}
