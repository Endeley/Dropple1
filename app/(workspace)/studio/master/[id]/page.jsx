"use client";

import { useEffect } from "react";
import { useTemplateMasterStore } from "@/stores/useTemplateMasterStore";
import MasterTemplateEditor from "@/workspace/master/MasterTemplateEditor";
import { useConvexClient } from "@/foundation/convex/ConvexClientProvider";
import {
  loadRemoteTemplateDefinitions,
  getTemplateDefinition,
} from "@/foundation/templates/templateRegistry";

export default function MasterEditorPage({ params }) {
  const { id } = params;
  const client = useConvexClient();
  const loadTemplate = useTemplateMasterStore((s) => s.loadTemplateDefinition);
  const setClient = useTemplateMasterStore((s) => s.setClient);

  useEffect(() => {
    if (client) {
      setClient(client);
    }
  }, [client, setClient]);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      if (client) {
        await loadRemoteTemplateDefinitions(client);
      }
      const def = getTemplateDefinition(id);
      if (def && mounted) {
        loadTemplate(def);
      }
    };
    run();
    return () => {
      mounted = false;
    };
  }, [id, client, loadTemplate]);

  return <MasterTemplateEditor />;
}
