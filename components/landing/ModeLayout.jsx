'use client';

export default function ModeLayout({ left, right, flip = false }) {
  return (
    <div className="landing-grid two-col">
      {flip ? (
        <>
          <div className="mode-right">{right}</div>
          <div className="mode-left">{left}</div>
        </>
      ) : (
        <>
          <div className="mode-left">{left}</div>
          <div className="mode-right">{right}</div>
        </>
      )}
    </div>
  );
}
