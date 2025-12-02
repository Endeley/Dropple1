'use client';

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function TemplateList({ title, description, ctaLabel = "Explore templates", items = [], accent }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="template-list"
    >
      <div className="template-header">
        <div>
          <p className="template-overline">{title}</p>
          <p className="template-description">{description}</p>
        </div>
        <button className="template-cta">{ctaLabel}</button>
      </div>
      <div className="templates-grid">
        {items.map((tpl) => (
          <motion.div
            key={tpl.id}
            variants={item}
            whileHover={{ scale: 1.03, boxShadow: "0 24px 60px rgba(15,23,42,0.18)" }}
            className="template-card"
            style={{ borderColor: accent || "#0ea5e9" }}
          >
            <div className="template-thumb" aria-hidden />
            <div className="template-meta">
              <div>
                <p className="template-title">{tpl.title}</p>
                <p className="template-tags">{tpl.tags.join(" • ")}</p>
              </div>
              <span className="template-chip">{tpl.category}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
