"use client";

import { motion } from "framer-motion";
import SectionShell, { item } from "./SectionShell";
import TemplateList from "./TemplateList";
import WorkspaceConsole from "./WorkspaceConsole";
import ModeLayout from "./ModeLayout";

const calls = [
  { method: "GET", path: "/api/projects", status: "200" },
  { method: "POST", path: "/api/assets", status: "201" },
  { method: "PUT", path: "/api/modes/:id", status: "202" },
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
  { id: "docp1", label: "Playground", meta: "Live", wiggle: 6 },
  { id: "docp2", label: "Collections", meta: "7 requests" },
  { id: "docp3", label: "Keys", meta: "Active" },
];

export default function DocsApis() {
  return (
    <SectionShell
      id="docs-apis"
      title="Docs & APIs — Developer Handbook"
      subtitle="Clean white and soft blue. Sidebar accordions slide open, code lines highlight on hover, and playground calls animate responses."
      background="bg-docs"
      accentGlow="accent-docs"
      overline="Docs & APIs"
    >
      <ModeLayout
        left={
          <motion.div variants={item} className="space-y-6 mode-copy">
            <TemplateList
              title="Docs templates"
              description="API onboarding, SDK quickstarts, and webhook guides."
              items={templates}
              accent="#3b82f6"
            />
            <div className="space-y-3 rounded-2xl border border-[#d9e5ff] bg-white p-4 shadow-[0_18px_50px_rgba(160,188,255,0.18)]">
              {["Authentication", "Projects", "Assets", "Webhooks"].map((section, idx) => (
                <motion.div
                  key={section}
                  variants={item}
                  className="flex items-center justify-between rounded-xl border border-[#d9e5ff] bg-[#f7f9ff] px-3 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 info-card"
                >
                  {section}
                  <motion.span
                    animate={{ rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 2.6 + idx * 0.2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-slate-500"
                  >
                    ▸
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        }
        right={
          <WorkspaceConsole
            title="API Playground"
            subtitle="Live requests • Keys ready"
            panels={consolePanels}
            accent="#3b82f6"
            footerTitle="Recent Call"
            footerSubtitle="Projects GET"
            footerImage="/images/docs.png"
          />
        }
      />
    </SectionShell>
  );
}
