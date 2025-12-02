"use client";

import { useTemplateMasterStore } from "@/stores/useTemplateMasterStore";

export function applyPatchPreview(patchList = []) {
  const store = useTemplateMasterStore.getState();
  let root = clone(store.definition);

  patchList.forEach((patch) => {
    root = applySinglePatch(root, patch.path || [], patch.value);
  });

  useTemplateMasterStore.setState({ definition: root });
}

function applySinglePatch(root, path = [], value) {
  if (path.length === 0) {
    return clone(value);
  }

  const nextRoot = clone(root) ?? {};
  let current = nextRoot;

  for (let i = 0; i < path.length - 1; i += 1) {
    const key = path[i];
    const nextKey = path[i + 1];
    if (current[key] === undefined || current[key] === null) {
      current[key] = typeof nextKey === "number" ? [] : {};
    } else {
      current[key] = clone(current[key]);
    }
    current = current[key];
  }

  const lastKey = path[path.length - 1];
  current[lastKey] = clone(value);

  return nextRoot;
}

function clone(value) {
  if (value === undefined) return undefined;
  return JSON.parse(JSON.stringify(value));
}
