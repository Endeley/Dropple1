"use client";

import { useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useDocumentStore } from "./documentStore";

export function useLoadAllDocuments() {
  const documents = useQuery(api.documents.all, {});

  useEffect(() => {
    if (!documents) return;
    const store = useDocumentStore.getState();
    documents.forEach((doc) => {
      if (doc && doc._id && doc.data) {
        store.loadDocument(doc._id, doc.data, { setCurrent: false });
      }
    });
    if (!store.currentId && documents.length > 0) {
      store.setCurrent(documents[0]._id);
    }
  }, [documents]);
}
