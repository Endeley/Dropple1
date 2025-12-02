export function normalizeCourse(data = {}) {
  return {
    course_title_options: Array.isArray(data.course_title_options) ? data.course_title_options : [],
    course_summary: data.course_summary || "",
    modules: Array.isArray(data.modules) ? data.modules : [],
    final_project: data.final_project || "",
    resources: Array.isArray(data.resources) ? data.resources : [],
  };
}
