export default function generateEmail({ layers }) {
  const body = layers
    .map((layer) => {
      if (layer.type === "text") {
        return `<p style="margin:0 0 12px 0;font-size:${layer.fontSize || 16}px;">${layer.text ||
          "Lorem ipsum"}</p>`;
      }
      if (layer.type === "rect") {
        return `<table width="100%" cellpadding="0" cellspacing="0" role="presentation">
  <tr><td height="${layer.height || 40}" style="background:${layer.fill || "#e5e7eb"};border-radius:${
          layer.radius || 0
        }px"></td></tr>
</table>`;
      }
      return "";
    })
    .join("\n");

  return `<!DOCTYPE html>
<html><body style="margin:0;padding:24px;font-family:Arial,sans-serif;">
${body}
</body></html>`;
}
