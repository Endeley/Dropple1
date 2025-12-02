'use client';

import { motion } from "framer-motion";
import { useState } from "react";

const tabs = [
  {
    id: "design",
    label: "Design",
    title: "Design anything, motion-ready.",
    subtitle: "Templates, artboards, effects, and brand tokens—ready to animate.",
    color: "#7c9bff",
  },
  {
    id: "video",
    label: "Video",
    title: "Cut, grade, and caption fast.",
    subtitle: "Timelines, LUTs, captions, and social cuts in one place.",
    color: "#4fc3f7",
  },
  {
    id: "ai",
    label: "AI",
    title: "Ask AI to build and enhance.",
    subtitle: "Prompt recipes, background removal, upscaling, and icon gen.",
    color: "#22d3ee",
  },
  {
    id: "dev",
    label: "Dev",
    title: "Handoff for code and docs.",
    subtitle: "Tokens, components, exports, and live API playgrounds.",
    color: "#10b981",
  },
];

const proof = [
  { label: "Teams", value: "14k+" },
  { label: "Assets created", value: "3.2M" },
  { label: "Exports/mo", value: "480k" },
];

const logos = ["Nimbus", "Northwind", "Acme", "Polygon", "Aperture"];
const consolePills = ["Templates", "AI assist", "Collab"];

export default function Hero() {
  const [active, setActive] = useState(tabs[0]);

  return (
    <section className="landing-section bg-hero text-white">
      <motion.div
        aria-hidden="true"
        className="landing-accent accent-hero"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      />

      <div className="landing-container hero-grid">
        <div className="hero-copy">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="hero-overline"
          >
            Dropple Universe
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="hero-title"
          >
            Design, animate, and ship with AI copilots.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="hero-subtitle"
          >
            One motion-first workspace for design, video, audio, code, and AI. Templates to get started, previews that move,
            and exports ready to ship.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 50px rgba(95,123,255,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="hero-btn primary"
            >
              Start free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 16px 38px rgba(255,255,255,0.15)" }}
              whileTap={{ scale: 0.97 }}
              className="hero-btn secondary"
            >
              Watch 60s tour
            </motion.button>
          </motion.div>

          <p className="hero-cta-hint">All modes included • No credit card • Press ⇧K to open command palette</p>

          <div className="hero-proof">
            {proof.map((item) => (
              <div key={item.label} className="hero-proof-item">
                <p className="hero-proof-value">{item.value}</p>
                <p className="hero-proof-label">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="hero-logos">
            <p className="hero-logos-quote">“Motion and AI in one canvas—our team stopped hopping tools.”</p>
            <div className="hero-logos-row">
              {logos.map((logo) => (
                <span key={logo} className="hero-logo-chip">
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          className="hero-preview"
        >
          <div className="hero-tabs">
            {tabs.map((tab) => {
              const activeTab = tab.id === active.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab)}
                  className={`hero-tab ${activeTab ? "active" : ""}`}
                  style={activeTab ? { borderColor: tab.color, color: tab.color } : undefined}
                >
                  <span className="hero-tab-dot" style={{ background: tab.color }} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="hero-console-toolbar">
            {consolePills.map((pill) => (
              <motion.span
                key={pill}
                whileHover={{ scale: 1.05 }}
                className="hero-console-pill"
              >
                {pill}
              </motion.span>
            ))}
          </div>

          <motion.div
            key={active.id}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="hero-console hero-visual"
          >
            <div className="hero-console-header">
              <div className="hero-console-dots">
                <span />
                <span />
                <span />
              </div>
              <div className="hero-console-title">
                <span className="hero-console-dot" style={{ background: active.color }} />
                {active.title}
              </div>
              <span className="hero-console-meta">Live preview</span>
            </div>

            <div className="hero-console-body">
              <div className="hero-console-canvas">
                <div className="hero-scrub-track">
                  <motion.div
                    className="hero-scrub-thumb"
                    animate={{ x: ["0%", "60%", "20%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
              <div className="hero-console-cards">
                {[0, 1, 2].map((idx) => (
                  <motion.div
                    key={idx}
                    className="hero-console-card"
                    animate={{ y: [0, idx % 2 === 0 ? -3 : 3, 0] }}
                    transition={{ duration: 3 + idx * 0.3, repeat: Infinity, ease: "easeInOut" }}
                    style={{ borderColor: active.color }}
                  >
                    <p className="hero-console-card-title">
                      {idx === 0 ? "Components" : idx === 1 ? "Breakpoints" : "Prototype"}
                    </p>
                    <p className="hero-console-card-sub">
                      {idx === 0
                        ? "Variants • States"
                        : idx === 1
                        ? "Desktop/Tablet/Mobile"
                        : "Gestures • Links"}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
