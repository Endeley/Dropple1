"use client";

export default function OverlayRoot({ children }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-[10]">
      {children}
    </div>
  );
}
