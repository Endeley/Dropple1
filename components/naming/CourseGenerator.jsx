"use client";

import { useState } from "react";

export default function CourseGenerator() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("Beginners");
  const [level, setLevel] = useState("Beginner");
  const [format, setFormat] = useState("Video Course");
  const [modules, setModules] = useState(5);
  const [length, setLength] = useState(5);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/naming/course", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          audience,
          level,
          format,
          modules: Number(modules) || 5,
          length: Number(length) || 5,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.ok === false) {
        throw new Error(data?.error || "Failed to generate course");
      }
      setResult(data);
    } catch (err) {
      setError(err?.message || "Failed to generate course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white">
      <h2 className="mb-4 text-xl text-purple-300">Course Lesson Plan Engine</h2>

      <input
        placeholder="Course Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full rounded-md border border-white/10 bg-white/5 p-2"
      />

      <input
        placeholder="Audience"
        value={audience}
        onChange={(e) => setAudience(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2"
      />

      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2"
      >
        <option>Beginner</option>
        <option>Intermediate</option>
        <option>Advanced</option>
      </select>

      <input
        placeholder="Course Format"
        value={format}
        onChange={(e) => setFormat(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2"
      />

      <input
        type="number"
        placeholder="Number of Modules"
        value={modules}
        onChange={(e) => setModules(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2"
      />

      <input
        type="number"
        placeholder="Course Length (hours)"
        value={length}
        onChange={(e) => setLength(e.target.value)}
        className="mt-3 w-full rounded-md border border-white/10 bg-white/5 p-2"
      />

      <button
        onClick={generate}
        className="mt-4 w-full rounded-md bg-purple-600 p-2 text-sm font-semibold text-white transition hover:bg-purple-700"
        type="button"
      >
        {loading ? "Generating…" : "Generate Course"}
      </button>

      {error && <p className="mt-3 text-xs font-semibold text-rose-400">{error}</p>}

      {result && (
        <div className="mt-6 max-h-[600px] space-y-6 overflow-y-scroll">
          <h3 className="text-purple-300">Course Titles</h3>
          <ul className="ml-5 list-disc">
            {result.course_title_options?.map((t, i) => (
              <li key={`title-${i}`}>{t}</li>
            ))}
          </ul>

          <h3 className="text-purple-300">Course Summary</h3>
          <p className="whitespace-pre-line">{result.course_summary}</p>

          <h3 className="text-purple-300">Modules</h3>
          {result.modules?.map((mod, i) => (
            <div key={`module-${i}`} className="rounded-md bg-white/10 p-3">
              <h4 className="font-bold text-purple-200">{mod.title}</h4>

              {mod.lessons?.map((lesson, j) => (
                <div key={`lesson-${i}-${j}`} className="mb-3 ml-4">
                  <h5 className="font-semibold">{lesson.title}</h5>
                  <p>
                    <strong>Duration:</strong> {lesson.duration}
                  </p>

                  <p className="mt-2">
                    <strong>Objectives:</strong>
                  </p>
                  <ul className="ml-5 list-disc">
                    {lesson.objectives?.map((o, k) => (
                      <li key={`obj-${i}-${j}-${k}`}>{o}</li>
                    ))}
                  </ul>

                  <p className="mt-2">
                    <strong>Script:</strong>
                  </p>
                  <pre className="whitespace-pre-wrap">{lesson.script}</pre>

                  <p className="mt-2">
                    <strong>Activities:</strong>
                  </p>
                  <ul className="ml-5 list-disc">
                    {lesson.activities?.map((a, k) => (
                      <li key={`act-${i}-${j}-${k}`}>{a}</li>
                    ))}
                  </ul>

                  <p className="mt-2">
                    <strong>Homework:</strong>
                  </p>
                  <pre className="whitespace-pre-wrap">{lesson.homework}</pre>

                  <p className="mt-2">
                    <strong>Quiz:</strong>
                  </p>
                  <ul className="ml-5 list-disc">
                    {lesson.quiz?.map((q, k) => (
                      <li key={`quiz-${i}-${j}-${k}`}>{q}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}

          <h3 className="text-purple-300">Final Project</h3>
          <pre className="whitespace-pre-wrap">{result.final_project}</pre>

          <h3 className="text-purple-300">Resources</h3>
          <ul className="ml-5 list-disc">
            {result.resources?.map((r, i) => (
              <li key={`res-${i}`}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
