export default function generateHTML({ layers }) {
  const body = layers
    .map((layer) => {
      if (layer.type === "text") {
        return `<p style="font-size:${layer.fontSize}px;font-weight:${layer.fontWeight};color:${
          layer.fill || "#000"
        };">${layer.text || "Lorem ipsum"}</p>`;
      }
      if (layer.type === "rect") {
        return `<div style="width:${layer.width}px;height:${layer.height}px;background:${
          layer.fill || "#eee"
        };border-radius:${layer.radius || 0}px;"></div>`;
      }
      return "";
    })
    .join("\n");

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Dropple Export</title>
  </head>
  <body style="display:flex;flex-direction:column;gap:16px;padding:24px;background:#f5f5f5;">
${body}
  </body>
</html>`;
}
