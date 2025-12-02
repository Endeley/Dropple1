"use client";

export default function CanvasChrome() {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-[#0F0F16]/80 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10 text-sm text-white/70">
      <button className="hover:text-violet-400">-</button>
      <span>100%</span>
      <button className="hover:text-violet-400">+</button>
      <span className="w-px h-4 bg-white/10" />
      <button className="hover:text-violet-400">Fit</button>
      <button className="hover:text-violet-400">Grid</button>
      <button className="hover:text-violet-400">Snap</button>
    </div>
  );
}
