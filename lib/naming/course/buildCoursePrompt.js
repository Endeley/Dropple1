export function buildCoursePrompt({ topic, audience, level, format, modules, length } = {}) {
  return `
You are Dropple’s Course Lesson Plan Engine.

Create a complete online course.

Topic: "${topic}"
Audience: ${audience}
Level: ${level}
Format: ${format}
Modules Required: ${modules}
Course Length: ${length} hours

Return JSON ONLY:

{
  "course_title_options": [],
  "course_summary": "",
  "modules": [
    {
      "title": "",
      "lessons": [
        {
          "title": "",
          "duration": "",
          "objectives": [],
          "requirements": [],
          "script": "",
          "activities": [],
          "homework": "",
          "quiz": []
        }
      ]
    }
  ],
  "final_project": "",
  "resources": []
}

Rules:
- Modules: 3–10 depending on length.
- Lessons: 2–6 per module.
- Scripts must be actionable & conversational.
- Activities must encourage learning by doing.
- Homework must be practical.
- Quizzes: 3–6 questions per lesson.
- Final project: 1 major assignment.
- Resources: recommended links, tools, readings.
`.trim();
}
