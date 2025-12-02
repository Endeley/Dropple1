import ModeWorkspaceHost from "@/components/editor/workspace/ModeWorkspaceHost";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

const MODE_MAP = {
  design: "design",
  image: "image",
  ui: "uiux",
  uiux: "uiux",
  video: "video",
  animation: "animation",
  podcast: "podcast",
  ai: "ai",
  classroom: "classroom",
  branding: "branding",
  dev: "dev",
  material: "mui",
  mui: "mui",
  icons: "icons",
};

async function getDefinitionFromConvex(templateId) {
  if (!templateId) return null;
  try {
    return await fetchQuery(api.queries.templateDefinitions.getTemplateDefinition, {
      templateId,
    });
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Failed to fetch template definition", err);
    }
    return null;
  }
}

async function getInstancesFromConvex(templateId) {
  try {
    const data = await fetchQuery(api.queries.templates.listTemplateInstances);
    if (!Array.isArray(data)) return [];
    if (!templateId) return data;
    return data.filter((inst) => inst?.templateId === templateId);
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Failed to fetch template instances", err);
    }
    return [];
  }
}

function stringifySearchParams(searchParams) {
  if (!searchParams) return "";
  try {
    const usp = new URLSearchParams(searchParams);
    return usp.toString();
  } catch {
    return "";
  }
}

export default async function WorkspaceLoaderPage({ params, searchParams }) {
  const templateId = params?.id;
  const modeParam = params?.mode?.toLowerCase?.() || "design";
  const mode = MODE_MAP[modeParam] || "design";

  const [definition, instances] = await Promise.all([
    getDefinitionFromConvex(templateId),
    getInstancesFromConvex(templateId),
  ]);

  return (
    <ModeWorkspaceHost
      mode={mode}
      templateId={templateId}
      definition={definition}
      instances={instances}
      searchParams={stringifySearchParams(searchParams)}
    />
  );
}
