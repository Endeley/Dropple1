"use client";

const TYPES = ["Brand", "Template", "Component", "Layer", "Product", "Animation", "File"];
const LANGUAGES = ["English", "Spanish", "French", "German", "Italian", "Japanese", "Korean", "Portuguese"];

export default function NamingInput({
  typeValue = "Brand",
  keywordsValue = "",
  languageValue = "English",
  onTypeChange = () => {},
  onKeywordsChange = () => {},
  onLanguageChange = () => {},
}) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm text-white/70">What are you naming?</label>
      <select
        value={typeValue}
        onChange={(e) => onTypeChange(e.target.value)}
        className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none transition focus:border-purple-400"
      >
        {TYPES.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>

      <label className="text-sm text-white/70">Keywords</label>
      <input
        type="text"
        value={keywordsValue}
        onChange={(e) => onKeywordsChange(e.target.value)}
        placeholder="e.g. purple, elegant, modern"
        className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-purple-400"
      />

      <label className="text-sm text-white/70">Language</label>
      <select
        value={languageValue}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="rounded-md border border-white/10 bg-white/5 p-2 text-sm text-white outline-none transition focus:border-purple-400"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang}>{lang}</option>
        ))}
      </select>
    </div>
  );
}
