export async function updateBrand(id, patch) {
  const res = await fetch("/api/brand/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, patch }),
  });
  const data = await res.json();
  if (!res.ok || data.ok === false) {
    throw new Error(data?.error || "Brand update failed");
  }
  return data.brand;
}
