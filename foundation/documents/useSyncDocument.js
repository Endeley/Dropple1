"use client";

import { useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useDocumentStore } from "./documentStore";

export function useSyncDocument(documentId) {
  const convexDoc = useQuery(
    api.documents.load,
    documentId ? { id: documentId } : undefined
  );

  useEffect(() => {
    if (!documentId || !convexDoc) return;
    useDocumentStore
      .getState()
      .loadDocument(convexDoc._id, convexDoc.data, { setCurrent: false });
  }, [documentId, convexDoc]);
}
