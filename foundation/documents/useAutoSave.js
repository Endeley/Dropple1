"use client";

import { useEffect, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useDocumentStore } from "./documentStore";
import debounce from "lodash-es/debounce";

export function useAutoSave() {
  const saveMutation = useMutation(api.documents.save);
  const lastSaved = useRef(new Map());

  useEffect(() => {
    const handler = debounce(async ({ id, doc }) => {
      const snapshot = JSON.stringify(doc);
      if (lastSaved.current.get(id) === snapshot) return;
      await saveMutation({ id, data: doc });
      lastSaved.current.set(id, snapshot);
    }, 800);

    const unsubscribe = useDocumentStore.subscribe(
      (state) => ({
        id: state.currentId,
        doc: state.currentId ? state.documents[state.currentId] : null,
      }),
      (current) => {
        if (!current.id || !current.doc) return;
        handler({ id: current.id, doc: current.doc });
      }
    );

    return () => {
      unsubscribe();
      handler.cancel();
    };
  }, [saveMutation]);
}
