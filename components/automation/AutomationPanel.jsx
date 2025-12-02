"use client";

import { useState } from "react";
import { startRecording, recordStep, stopRecording } from "@/lib/automation/recorder/macroRecorder";
import { parseUserActions } from "@/lib/automation/recorder/userActionParser";
import { createWorkflow, addStep } from "@/lib/automation/workflows/workflowBuilder";
import { saveWorkflow, listWorkflows, runWorkflow } from "@/lib/automation/workflows/automationManager";
import { registerTrigger, fireTrigger } from "@/lib/automation/workflows/triggerBuilder";
import { buildRenderPipeline } from "@/lib/automation/pipelines/renderPipeline";
import { runBatch } from "@/lib/automation/pipelines/batchPipeline";
import { runAIPipeline } from "@/lib/automation/pipelines/aiPipeline";
import { schedule, listTasks, clearTasks } from "@/lib/automation/scheduler/scheduledTasks";

export default function AutomationPanel() {
  const [log, setLog] = useState([]);

  const demoRecord = () => {
    startRecording();
    recordStep({ action: "align", params: { mode: "center" } });
    recordStep({ action: "applyBrand", params: { brand: "Dropple" } });
    const macro = stopRecording("Quick Align + Brand");
    const parsed = parseUserActions(macro.steps);

    const wf = createWorkflow("AutoAlign", []);
    addStep(wf, { action: "align_center" });
    addStep(wf, { action: "apply_brand" });
    const id = saveWorkflow(wf);

    const pipeline = buildRenderPipeline();
    const ai = runAIPipeline("Neon poster in Dropple style");
    const batch = runBatch([1, 2, 3], (i) => i * 2);

    setLog((l) => [
      ...l,
      `Recorded macro: ${macro.name} (${macro.steps.length} steps)`,
      `Parsed actions: ${parsed.length}`,
      `Workflow saved: ${id}`,
      `Render pipeline: ${pipeline.join(" > ")}`,
      `AI pipeline stages: ${ai.steps.length}`,
      `Batch results: ${batch.map((b) => b.result).join(", ")}`,
    ]);
  };

  const demoTriggers = () => {
    const dispose = registerTrigger("onImport", () => {
      setLog((l) => [...l, "Trigger fired: onImport"]);
    });
    fireTrigger("onImport", {});
    dispose();
  };

  const demoSchedule = () => {
    clearTasks();
    const id = schedule("nightly_render", "02:00");
    setLog((l) => [...l, `Scheduled task ${id}`, `Tasks: ${listTasks().length}`]);
  };

  const runFirstWorkflow = () => {
    const wf = listWorkflows()[0];
    if (!wf) {
      setLog((l) => [...l, "No workflow saved"]);
      return;
    }
    const res = runWorkflow(wf.id, { ctx: "demo" });
    setLog((l) => [...l, `Ran workflow ${wf.name}: ${res.ok}`]);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Automation Engine</h3>
        <div className="flex gap-2">
          <button
            onClick={demoRecord}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Demo
          </button>
          <button
            onClick={demoTriggers}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Triggers
          </button>
          <button
            onClick={runFirstWorkflow}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Run WF
          </button>
          <button
            onClick={demoSchedule}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Schedule
          </button>
        </div>
      </div>

      <pre className="mt-3 max-h-64 overflow-y-auto rounded-lg bg-black/30 p-3 text-xs whitespace-pre-wrap">
        {log.join("\n")}
      </pre>
    </div>
  );
}
