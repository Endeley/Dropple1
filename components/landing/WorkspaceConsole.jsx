'use client';

import { motion } from "framer-motion";

export default function WorkspaceConsole({
  title,
  subtitle,
  panels = [],
  accent = "#6366f1",
  footerTitle = "Recent template",
  footerSubtitle = "Preview",
  footerImage,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="console-shell mode-visual"
    >
      <div className="console-chrome">
        <div className="console-dots">
          <span />
          <span />
          <span />
        </div>
        <div className="console-title">
          <span className="console-dot" style={{ background: accent }} />
          {title}
        </div>
        <span className="console-subtitle">{subtitle}</span>
      </div>

      <div className="console-body">
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="console-canvas"
        >
          <div className="console-canvas-layer" />
          <div className="console-canvas-layer alt" />
        </motion.div>

        <div className="console-panels">
          {panels.map((panel, idx) => (
            <motion.div
              key={panel.id}
              className="console-panel"
              animate={{ x: [0, panel.wiggle || 6, 0] }}
              transition={{ duration: 3 + idx * 0.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="console-panel-header">
                <span>{panel.label}</span>
                <span className="console-chip" style={{ color: accent }}>
                  {panel.meta}
                </span>
              </div>
              <div className="console-panel-body">
                <div className="console-row" />
                <div className="console-row short" />
                <div className="console-row" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="console-footer">
        <div className="console-footer-meta">
          <div>
            <p className="console-footer-title">{footerTitle}</p>
            <p className="console-footer-subtitle">{footerSubtitle}</p>
          </div>
          <span className="console-chip" style={{ color: accent }}>
            View
          </span>
        </div>
        <div
          className="console-footer-visual"
          style={
            footerImage
              ? { backgroundImage: `url(${footerImage})` }
              : { backgroundImage: "linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.3))" }
          }
        />
      </div>
    </motion.div>
  );
}
