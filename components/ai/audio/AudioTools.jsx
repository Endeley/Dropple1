"use client";

export default function AudioTools() {
  return (
    <div className="space-y-3">
      <p className="text-sm text-white/80">Audio Tools</p>
      <button className="w-full py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1]">
        Enhance Voice
      </button>
      <button className="w-full py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1]">
        Remove Noise
      </button>
      <button className="w-full py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1]">
        Trim Audio
      </button>
    </div>
  );
}
