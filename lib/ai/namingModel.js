"use server";

const DEFAULT_TONES = ["Luxury", "Playful", "Minimal", "Futuristic", "Bold", "Friendly", "Earthy"];
const INDUSTRY_ADJECTIVES = {
  tech: ["Quantum", "Neon", "Pixel", "Circuit", "Data", "Lumen"],
  beauty: ["Velvet", "Glow", "Satin", "Silk", "Aura"],
  gaming: ["Blade", "Arc", "Pulse", "Rift", "Titan"],
  finance: ["Trust", "Ledger", "Mint", "Vault", "Atlas"],
  luxury: ["Velo", "Noir", "Opal", "Ciel", "Aure"],
  creative: ["Muse", "Canvas", "Story", "Verse", "Spark"],
};

const SYLLABLES = [
  "vel", "ora", "nex", "ion", "lume", "aer", "caden", "forge", "mint", "zen", "pulse", "flux", "astr",
  "nova", "mira", "alto", "vanta", "lyra", "kora", "sora", "plix", "dro", "pple", "phase", "line",
];

const FAMILY_SUFFIXES = [" X", " Pro", " Ultra", " Max", " Studio", " Prime", " Core", " Edge"];

const clampScore = (value) => Math.max(12, Math.min(100, Math.round(value)));

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const toTitle = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const normalizeKeywords = (keywords) => {
  if (Array.isArray(keywords)) return keywords.filter(Boolean).map((k) => `${k}`.trim()).filter(Boolean);
  if (!keywords) return [];
  return `${keywords}`
    .split(/[,|]/)
    .map((k) => k.trim())
    .filter(Boolean);
};

const buildMeaning = (name, tone, keywords, industry) => {
  const detail = keywords.length ? ` blending ${keywords.slice(0, 3).join(", ")}` : "";
  const industryNote = industry ? ` for ${industry}` : "";
  return `${name} channels a ${tone.toLowerCase()} tone${detail}${industryNote}.`;
};

const fallbackGenerateNames = ({
  type = "project",
  tone = "Bold",
  keywords = [],
  language = "English",
  industry = "",
  mode = "list",
  familySeed,
  count = 12,
}) => {
  const keywordList = normalizeKeywords(keywords);
  const numericCount = Number(count) || 0;
  const volume =
    mode === "burst"
      ? Math.min(Math.max(numericCount || 100, 100), 300)
      : Math.min(numericCount || 12, 80);
  const industryKey = (industry || "").toLowerCase();
  const tonalAdj = INDUSTRY_ADJECTIVES[industryKey]?.[0] || pick(DEFAULT_TONES);

  const makeBaseName = () => {
    const seed = familySeed || keywordList[0] || pick(SYLLABLES);
    const fragmentA = pick(SYLLABLES);
    const fragmentB = pick(SYLLABLES);
    const combined = `${seed}${fragmentA}${fragmentB}`.replace(/(\w)(\1{2,})/g, "$1$1");
    const cleaned = combined.length > 10 ? combined.slice(0, 10) : combined;
    return toTitle(cleaned);
  };

  const makeFileName = () => {
    const base = keywordList.length ? keywordList.join("-") : "dropple-export";
    const toneSlug = tone.toLowerCase().replace(/\s+/g, "-");
    const suffix = Math.floor(Math.random() * 8) + 2;
    return `${base}-${toneSlug}-v${suffix}.drpl`;
  };

  if (mode === "family") {
    const root = toTitle(familySeed || keywordList[0] || tonalAdj);
    const family = [root, ...FAMILY_SUFFIXES.slice(0, 4).map((s) => `${root}${s}`)];
    return family.map((name, idx) => ({
      name,
      meaning: `${name} is part of a scalable naming ladder from core to flagship.`,
      tone,
      type: "naming-system",
      memorabilityScore: clampScore(82 + idx * 2),
      lengthScore: clampScore(90 - idx * 3),
      domainAvailable: idx % 2 === 0,
      language,
    }));
  }

  if (mode === "slogan") {
    return Array.from({ length: Math.min(volume, 16) }).map((_, idx) => {
      const base = keywordList[0] || tonalAdj;
      const verb = pick(["Build", "Design", "Launch", "Craft", "Shape", "Edit"]);
      const noun = pick(["stories", "products", "brands", "templates", "scenes"]);
      const line = `${verb} ${noun} with ${base}`;
      return {
        name: line,
        meaning: "Tagline tailored by AJ for fast drop-in use.",
        tone,
        type: "slogan",
        memorabilityScore: clampScore(74 + (idx % 5)),
        lengthScore: clampScore(92 - idx),
        domainAvailable: false,
        language,
      };
    });
  }

  return Array.from({ length: volume }).map((_, idx) => {
    const name = type === "file" ? makeFileName() : makeBaseName();
    const meaning = buildMeaning(name, tone, keywordList, industry);
    return {
      name,
      meaning,
      tone,
      type,
      memorabilityScore: clampScore(70 + (idx % 15) + Math.random() * 12),
      lengthScore: clampScore(95 - name.length * 2 + Math.random() * 6),
      domainAvailable: idx % 3 === 0,
      language,
    };
  });
};

const parseJSONContent = (raw) => {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (err) {
    const match = raw.match(/```json([\s\S]*?)```/);
    if (match) {
      try {
        return JSON.parse(match[1]);
      } catch (err2) {
        return null;
      }
    }
    return null;
  }
};

const sanitizeResult = (item = {}) => {
  const name = item.name || item.title || item.label;
  if (!name) return null;
  return {
    name,
    meaning: item.meaning || item.reason || item.explanation || "",
    tone: item.tone || item.style || pick(DEFAULT_TONES),
    type: item.type || "name",
    memorabilityScore: clampScore(Number(item.memorabilityScore ?? item.memorable ?? 78)),
    lengthScore: clampScore(Number(item.lengthScore ?? item.readability ?? 82)),
    domainAvailable: Boolean(item.domainAvailable ?? item.domain ?? false),
    language: item.language || "English",
  };
};

const callOpenAI = async (payload) => {
  const { type, tone, keywords, language, industry, mode, count, familySeed } = payload;
  const prompt = [
    `You are AJ, Dropple's naming assistant. Generate concise options for "${type}".`,
    `Tone: ${tone}. Language: ${language}.`,
    keywords?.length ? `Keywords: ${keywords.join(", ")}.` : "",
    industry ? `Industry: ${industry}.` : "",
    mode === "family"
      ? `Produce a naming ladder starting from "${familySeed || keywords?.[0] || "Core"}" with progressive variants like X, Pro, Ultra.`
      : "",
    mode === "slogan" ? "Return short slogans/taglines instead of names." : "",
    mode === "file" ? "Return descriptive, hyphenated filenames with version suffixes and extensions." : "",
    `Return a JSON array with up to ${Math.min(count, mode === "burst" ? 120 : 24)} items.`,
    `Each item should include: name, meaning, tone, memorabilityScore (0-100), lengthScore (0-100), domainAvailable (boolean).`,
  ]
    .filter(Boolean)
    .join(" ");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are AJ, a crisp, practical naming strategist for Dropple." },
        { role: "user", content: prompt },
      ],
      temperature: mode === "burst" ? 0.9 : 0.7,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "OpenAI call failed");
  }

  const json = await res.json();
  const content = json?.choices?.[0]?.message?.content || "";
  const parsed = parseJSONContent(content);
  if (!Array.isArray(parsed)) return null;
  return parsed.map(sanitizeResult).filter(Boolean);
};

export const namingModel = {
  async generate(options = {}) {
    const payload = {
      type: options.type || "project",
      tone: options.tone || "Bold",
      keywords: normalizeKeywords(options.keywords),
      language: options.language || "English",
      industry: options.industry || "",
      mode: options.mode || "list",
      familySeed: options.familySeed,
      count: options.count || options.volume || 12,
    };

    if (!process.env.OPENAI_API_KEY) {
      return fallbackGenerateNames(payload);
    }

    try {
      const aiResults = await callOpenAI(payload);
      if (Array.isArray(aiResults) && aiResults.length) {
        const capped = payload.mode === "burst" ? Math.min(aiResults.length, 150) : aiResults.length;
        return aiResults.slice(0, capped);
      }
    } catch (err) {
      console.error("[namingModel] Falling back due to error:", err);
    }

    return fallbackGenerateNames(payload);
  },
};
