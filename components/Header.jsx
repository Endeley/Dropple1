"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const navLinks = [
  { id: "graphic-design", label: "Design" },
  { id: "ui-ux", label: "UI/UX" },
  { id: "cartoon-animation", label: "Animation" },
  { id: "video-editing", label: "Video" },
  { id: "ai-studio", label: "AI" },
  { id: "podcast-studio", label: "Podcast" },
  { id: "branding", label: "Branding" },
  { id: "education", label: "Education" },
  { id: "dev-mode", label: "Dev" },
  { id: "docs-apis", label: "Docs/APIs" },
  { id: "icon-mode", label: "Icons" },
  { id: "material-ui", label: "Material UI" },
];

export default function Header() {
  const [active, setActive] = useState(navLinks[0]?.id || "");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const sections = navLinks.map((m) => document.getElementById(m.id));
      let current = active;

      sections.forEach((sec) => {
        if (!sec) return;
        const rect = sec.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 200) current = sec.id;
      });

      setActive(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [active]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/80 border-b border-gray-200 dark:bg-black/40">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="font-bold text-2xl bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent"
          >
            Dropple
          </motion.div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 font-medium">
          {navLinks.map((m) => (
            <button
              key={m.id}
              onClick={() => scrollTo(m.id)}
              className={`transition ${
                active === m.id ? "text-violet-600 font-semibold" : "text-gray-700"
              }`}
            >
              {m.label}
            </button>
          ))}
          <Link href="/pricing" className="text-gray-700">
            Pricing
          </Link>
          <Link href="/docs" className="text-gray-700">
            Docs
          </Link>
        </nav>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-black border-t border-gray-200">
          <nav className="flex flex-col p-4 gap-4">
            {navLinks.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  scrollTo(m.id);
                  setMenuOpen(false);
                }}
                className="text-left text-gray-800 dark:text-gray-200"
              >
                {m.label}
              </button>
            ))}
            <Link href="/pricing" className="text-gray-800 dark:text-gray-200">
              Pricing
            </Link>
            <Link href="/docs" className="text-gray-800 dark:text-gray-200">
              Docs
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
