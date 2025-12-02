export function storeFile({ path, data, bucket = "hot" }) {
  return {
    id: `file_${Math.random().toString(36).slice(2, 8)}`,
    path,
    bucket,
    size: data?.length || 0,
    storedAt: Date.now(),
  };
}

export function getFileMetadata(id) {
  // Placeholder: would look up in storage.
  return { id, exists: true, note: "File metadata placeholder" };
}
