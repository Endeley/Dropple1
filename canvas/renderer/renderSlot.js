"use client";

export function renderSlot(ctx, layer) {
  ctx.save();

  ctx.strokeStyle = "rgba(140, 90, 255, 0.4)";
  ctx.setLineDash([6, 4]);
  ctx.strokeRect(0, 0, layer.width, layer.height);

  if (layer.isFilled) {
    ctx.setLineDash([]);
    switch (layer.kind) {
      case "text": {
        ctx.fillStyle = "#ffffff";
        ctx.font = "14px Inter";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          layer.filledValue ?? "",
          layer.width / 2,
          layer.height / 2
        );
        break;
      }
      case "image":
      case "logo": {
        if (layer.filledValue) {
          const img = new Image();
          img.src = layer.filledValue;
          img.onload = () => {
            ctx.drawImage(img, 0, 0, layer.width, layer.height);
          };
        }
        break;
      }
      case "color": {
        ctx.fillStyle = layer.filledValue || "transparent";
        ctx.fillRect(0, 0, layer.width, layer.height);
        break;
      }
      default:
        break;
    }
    ctx.restore();
    return;
  }

  ctx.font = "12px Inter";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.fillText(
    `${(layer.kind || "SLOT").toUpperCase()} SLOT`,
    layer.width / 2,
    layer.height / 2
  );

  ctx.restore();
}
