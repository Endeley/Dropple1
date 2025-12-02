export default function PerformanceSection({ title, children }) {
  return (
    <div className="border border-white/5 rounded-xl p-4 space-y-3 bg-black/20">
      <h3 className="text-sm font-semibold text-white/80">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
