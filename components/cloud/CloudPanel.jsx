"use client";

import { useState } from "react";
import { storeFile, getFileMetadata } from "@/lib/cloud/storage/fileStorage";
import { createSyncChannel, connectSync, broadcast } from "@/lib/cloud/sync/realTimeSync";
import { createRenderJob, assignNodes, completeJob } from "@/lib/cloud/compute/renderFarm";
import { processAsset } from "@/lib/cloud/pipeline/assetPipeline";
import { createProject, addVersion } from "@/lib/cloud/project/projectStore";

export default function CloudPanel() {
  const [project, setProject] = useState(createProject({ name: "Cloud Demo" }));
  const [channel, setChannel] = useState(createSyncChannel({ projectId: project.id }));
  const [job, setJob] = useState(null);
  const [log, setLog] = useState([]);

  const saveFileDemo = () => {
    const file = storeFile({ path: "/scenes/demo.drpl", data: "{}" });
    setLog((l) => [...l, `Stored file ${file.id} (${file.size} bytes)`]);
    setLog((l) => [...l, `Metadata: ${JSON.stringify(getFileMetadata(file.id))}`]);
  };

  const syncDemo = () => {
    const ch = connectSync(channel, "peer_1");
    setChannel(ch);
    const res = broadcast(ch, { type: "layerUpdate", id: "layer1" });
    setLog((l) => [...l, `Sync broadcast ok: ${res.ok}`]);
  };

  const renderDemo = () => {
    let j = createRenderJob({ sceneId: "scene1", frames: 5 });
    j = assignNodes(j, 3);
    j = completeJob(j);
    setJob(j);
    setLog((l) => [...l, `Render job ${j.id} status ${j.status}`]);
  };

  const assetDemo = () => {
    const res = processAsset({ id: "asset123", type: "image" });
    setLog((l) => [...l, `Asset processed: ${JSON.stringify(res)}`]);
  };

  const versionDemo = () => {
    const p = addVersion(project, "autosave");
    setProject(p);
    setLog((l) => [...l, `Versions: ${p.versions.length}`]);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-purple-300 font-semibold">Cloud Engine</h3>
        <div className="flex gap-2">
          <button
            onClick={saveFileDemo}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Store File
          </button>
          <button
            onClick={syncDemo}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Sync
          </button>
          <button
            onClick={renderDemo}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Render
          </button>
          <button
            onClick={assetDemo}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Asset
          </button>
          <button
            onClick={versionDemo}
            className="rounded-md bg-purple-600 px-3 py-1 text-xs font-semibold hover:bg-purple-700"
            type="button"
          >
            Version
          </button>
        </div>
      </div>

      <p className="mt-2 text-xs text-white/60">Project: {project.name}</p>
      <p className="text-xs text-white/60">Channel: {channel.id} ({channel.peers.length} peers)</p>
      <p className="text-xs text-white/60">Render Job: {job ? `${job.id} - ${job.status}` : "none"}</p>

      <pre className="mt-3 max-h-64 overflow-y-auto rounded-lg bg-black/30 p-3 text-xs whitespace-pre-wrap">
        {log.join("\n")}
      </pre>
    </div>
  );
}
