"use client";

import { useCallback, useState } from "react";

export const useNamingEngine = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastOptions, setLastOptions] = useState(null);

  const generateNames = useCallback(async (options = {}) => {
    setLoading(true);
    setError(null);
    setLastOptions(options);

    try {
      const res = await fetch("/api/naming/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(options),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Unable to generate names right now.");
      }

      const nextResults = Array.isArray(data.results) ? data.results : [];
      setResults(nextResults);
      return nextResults;
    } catch (err) {
      setError(err?.message || "Failed to generate names");
      setResults([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => setResults([]), []);

  return {
    results,
    generateNames,
    loading,
    error,
    lastOptions,
    setResults,
    clearResults,
  };
};
