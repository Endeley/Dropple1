'use client';

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { MODE_CARDS, resolveMode } from "@/packages/mode-registry";
import "./templates.css";

const MODES = MODE_CARDS.map((mode) => ({
  id: mode.id,
  label: `${mode.label} Mode`,
  slugs: mode.slugs || [],
}));

const placeholderImage = "/seed/templates/placeholder.png";

function makePlaceholders(key, label, count = 12) {
  return Array.from({ length: count }).map((_, idx) => ({
    _id: `placeholder-${key}-${idx}`,
    title: `${label} ${idx + 1}`,
    preview: placeholderImage,
    category: key,
    tags: [label.toLowerCase()],
  }));
}

function resolveModeForTemplate(template) {
  const explicitMode = resolveMode(template?.mode);
  if (explicitMode) return explicitMode;

  const category = (template?.category || "").toLowerCase();
  const slugMatch = MODES.find((m) => m.slugs.includes(category));
  if (slugMatch) return slugMatch.id;

  return resolveMode("design") || "uiux";
}

export default function TemplateBrowserPage() {
  const categories = useQuery(api.queries.templateCategories.listCategories);
  const templates = useQuery(api.queries.marketplace.listMarketplaceTemplates);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [activeMode, setActiveMode] = useState("design");

  const sectionsRef = useRef({});

  const uniqueCategories = useMemo(() => {
    const seen = new Set();
    return (categories || []).filter((c) => {
      if (!c?.slug) return false;
      if (seen.has(c.slug)) return false;
      seen.add(c.slug);
      return true;
    });
  }, [categories]);

  const filteredTemplates = useMemo(() => {
    const term = search.trim().toLowerCase();
    return (templates || []).filter((t) => {
      const matchesCategory = category === "all" || t.category === category;
      const haystack = `${t.title || ""} ${t.category || ""} ${(t.tags || []).join(" ")}`.toLowerCase();
      const matchesSearch = term ? haystack.includes(term) : true;
      return matchesCategory && matchesSearch;
    });
  }, [templates, category, search]);

  const baseTemplates = filteredTemplates.length ? filteredTemplates : templates || [];

  const templatesByMode = useMemo(() => {
    const map = MODES.reduce((acc, mode) => {
      acc[mode.id] = [];
      return acc;
    }, {});

    baseTemplates.forEach((tpl) => {
      const modeId = resolveModeForTemplate(tpl);
      if (!map[modeId]) map[modeId] = [];
      map[modeId].push(tpl);
    });

    return Object.fromEntries(
      MODES.map((mode) => {
        const items = map[mode.id] || [];
        return [mode.id, items.length ? items : makePlaceholders(mode.id, mode.label)];
      })
    );
  }, [baseTemplates]);

  const heroItems = useMemo(() => {
    const pool = baseTemplates.length ? baseTemplates : makePlaceholders("hero", "Template", 8);
    return pool.slice(0, 8);
  }, [baseTemplates]);

  const handleScrollToMode = (modeId) => {
    setActiveMode(modeId);
    const el = sectionsRef.current[modeId];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="tpl-page">
      <header className="tpl-header">
        <div className="tpl-brand">
          <img src="/logo.png" alt="Dropple logo" className="tpl-logo" />
          <span className="tpl-name">dropple</span>
        </div>
        <h1 className="tpl-title">Browse Templates</h1>
        <div className="tpl-search">
          <input
            type="search"
            placeholder="Search templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="button">Submit</button>
        </div>
      </header>

      <div className="tpl-filters">
        <label>
          <span>All</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All</option>
            {uniqueCategories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <section className="tpl-hero">
        <div className="tpl-hero-head">
          <div>
            <p className="tpl-overline">Tags</p>
            <h2 className="tpl-hero-title">Explore everything</h2>
          </div>
        </div>
        <div className="tpl-grid hero-grid">
          {heroItems.map((tpl) => (
            <div className="tpl-card" key={tpl._id || tpl.templateId || tpl.title}>
              <div className="tpl-thumb tall">
                {tpl.preview ? (
                  <img src={tpl.preview} alt={tpl.title || "Template"} />
                ) : (
                  <div className="tpl-fallback" aria-hidden>
                    {tpl.title ? tpl.title[0] : "T"}
                  </div>
                )}
              </div>
              <p className="tpl-card-title">{tpl.title || "Template"}</p>
            </div>
          ))}
        </div>
      </section>

      <aside className="tpl-mode-sidebar">
        <ul>
          {MODES.map((mode) => (
            <li key={mode.id}>
              <button
                className={activeMode === mode.id ? "is-active" : ""}
                onClick={() => handleScrollToMode(mode.id)}
              >
                {mode.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div className="tpl-mode-sections">
        {MODES.map((mode) => (
          <section
            key={mode.id}
            className="tpl-section"
            ref={(el) => {
              sectionsRef.current[mode.id] = el;
            }}
          >
            <div className="tpl-section-head">
              <h2>{mode.label}</h2>
            </div>
            <div className="tpl-grid">
              {(templatesByMode[mode.id] || []).map((tpl) => (
                <div className="tpl-card" key={tpl._id || tpl.templateId || tpl.title}>
                  <div className="tpl-thumb">
                    {tpl.preview ? (
                      <img src={tpl.preview} alt={tpl.title || "Template"} />
                    ) : (
                      <div className="tpl-fallback" aria-hidden>
                        {tpl.title ? tpl.title[0] : "T"}
                      </div>
                    )}
              </div>
              <p className="tpl-card-title">{tpl.title || "Template"}</p>
              <div className="tpl-card-actions">
                <Link
                  className="tpl-btn ghost"
                  href={`/templates/${tpl._id || tpl.templateId || "template"}`}
                >
                  Preview Template
                </Link>
                <Link
                  className="tpl-btn primary"
                  href={`/workspace/${resolveModeForTemplate(tpl)}/${tpl.templateId || tpl._id || "template"}`}
                >
                  Use Template
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
        ))}
      </div>
    </div>
  );
}
