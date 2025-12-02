'use client';

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.08 },
  },
};

export const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function SectionShell({
  id,
  title,
  subtitle,
  background = "",
  accentGlow,
  overline = "Dropple Mode",
  tone = "light",
  children,
}) {
  const isDark = tone === "dark";

  return (
    <section id={id} className={`landing-section ${background}`}>
      {accentGlow && <div aria-hidden="true" className={`landing-accent ${accentGlow}`} />}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="landing-container"
      >
        <div className={`landing-header ${isDark ? "dark" : ""}`}>
          <motion.p variants={item} className={`landing-overline ${isDark ? "dark" : ""}`}>
            {overline}
          </motion.p>
          <motion.h2 variants={item} className={`landing-title ${isDark ? "dark" : ""}`}>
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p variants={item} className={`landing-subtitle ${isDark ? "dark" : ""}`}>
              {subtitle}
            </motion.p>
          )}
        </div>
        <div className="relative">{children}</div>
      </motion.div>
    </section>
  );
}
