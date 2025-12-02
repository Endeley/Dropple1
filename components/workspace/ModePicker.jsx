"use client";

import Link from "next/link";

export default function ModePicker({ modes = [] }) {
  return (
    <div className="mode-picker">
      <div className="mode-panel">
        <p className="mode-kicker">Choose a workspace</p>
        <h1 className="mode-title">What do you want to design?</h1>
        <p className="mode-subtitle">
          Pick a mode to open a workspace tailored to your task.
        </p>

        <div className="mode-grid">
          {modes.map((mode) => (
            <Link
              key={mode.id}
              href={`/workspace?mode=${mode.id}`}
              className="mode-card"
              style={{ backgroundImage: mode.gradient }}
            >
              <div className="mode-card-top">
                <span className="mode-pill">{mode.label}</span>
                <span className="mode-tag">{mode.surface}</span>
              </div>
              <p className="mode-desc">{mode.description || mode.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
