"use client";

import { motion } from "framer-motion";
import SectionShell, { item } from "./SectionShell";
import TemplateList from "./TemplateList";
import WorkspaceConsole from "./WorkspaceConsole";
import ModeLayout from "./ModeLayout";

const lessons = [
  { title: "Intro to motion-first design", progress: 80 },
  { title: "Building responsive flows", progress: 55 },
  { title: "AI-assisted creative ops", progress: 35 },
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
  { id: "e1", label: "Progress", meta: "72%", wiggle: 5 },
  { id: "e2", label: "Submissions", meta: "18" },
  { id: "e3", label: "Rubrics", meta: "Active" },
];

export default function Education() {
  return (
    <SectionShell
      id="education"
      title="Education & Learning — Pastel Classroom"
      subtitle="Pastel blues, oranges, and beige. Lesson cards bounce in, progress bars animate to completion, and icons slide into view."
      background="bg-education"
      accentGlow="accent-education"
      overline="Education"
    >
      <ModeLayout
        left={
          <motion.div variants={item} className="space-y-6 mode-copy">
            <TemplateList
              title="Learning templates"
              description="Lesson plans, project briefs, and peer review kits."
              items={templates}
              accent="#f59e0b"
            />
            <div className="space-y-4">
              {lessons.map((lesson, idx) => (
                <motion.div
                  key={lesson.title}
                  variants={item}
                  animate={{ y: [8, 0, 8] }}
                  transition={{ duration: 4 + idx * 0.2, repeat: Infinity, ease: "easeInOut" }}
                  className="rounded-2xl border border-[#f0dcb5] bg-white/90 px-4 py-4 text-slate-800 shadow-[0_18px_50px_rgba(255,204,128,0.25)] info-card"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{lesson.title}</span>
                    <span className="rounded-full bg-[#0f172a]/5 px-3 py-1 text-xs text-slate-600">
                      {lesson.progress}%
                    </span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lesson.progress}%` }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full bg-linear-to-r from-[#8ec5ff] via-[#ffb86b] to-[#ffd27d]"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        }
        right={
          <WorkspaceConsole
            title="Classroom Workspace"
            subtitle="Progress, submissions, rubrics"
            panels={consolePanels}
            accent="#f59e0b"
            footerTitle="Recent Lesson"
            footerSubtitle="Motion-first intro"
            footerImage="/images/education.png"
          />
        }
      />
    </SectionShell>
  );
}
