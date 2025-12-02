"use client";

export default function AuditPanel({ brand }) {
  const issues = brand.audit || [];
  return (
    <div className="rounded-lg border border-white/10 bg-black/30 p-4">
      <h3 className="text-purple-300 text-sm font-semibold">Brand Audit</h3>
      <div className="mt-2 space-y-2 text-xs">
        {issues.map((i) => (
          <div key={i.id} className="rounded-md border border-white/10 bg-white/5 px-3 py-2">
            <p className="font-semibold">{i.message || i.title || "Issue"}</p>
            <p className="text-white/50">{new Date(i.createdAt).toLocaleString()}</p>
          </div>
        ))}
        {!issues.length && <p className="text-white/50">No audit issues.</p>}
      </div>
    </div>
  );
}
