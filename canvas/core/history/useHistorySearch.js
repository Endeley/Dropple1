"use client";

import { useMemo, useState } from "react";
import { useHistoryStore } from "@/stores/useHistoryStore";

export function useHistorySearch() {
  const [query, setQuery] = useState("");
  const pastEntries = useHistoryStore((state) => state.past || []);

  const index = useMemo(
    () =>
      pastEntries.map((snapshot, index) => ({
        index,
        category: snapshot.meta?.category || "meta",
        label: snapshot.meta?.label || "Change",
        timestamp: snapshot.timestamp,
        meta: snapshot.meta || {},
        text: `${snapshot.meta?.category || ""} ${snapshot.meta?.label || ""}`.toLowerCase(),
      })),
    [pastEntries]
  );

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const needle = query.toLowerCase();
    return index.filter((entry) => entry.text.includes(needle)).sort((a, b) => b.timestamp - a.timestamp);
  }, [index, query]);

  return { query, setQuery, results };
}
