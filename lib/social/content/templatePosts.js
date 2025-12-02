export function createTemplatePost(templateId, meta = {}) {
  return {
    type: "template",
    templateId,
    meta,
  };
}
