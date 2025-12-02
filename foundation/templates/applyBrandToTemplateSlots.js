/**
 * Apply brand kit to template slots.
 *
 * Template slots look like:
 * {
 *   id: "title",
 *   type: "text.heading" | "text.body" | "color.primary" | "logo" | "image" | ...
 *   content: {}
 * }
 *
 * @returns updated slot array
 */
export function applyBrandToTemplateSlots(slots, brandKit) {
  if (!brandKit || !Array.isArray(slots)) return slots;

  return slots.map((slot) => {
    const updated = { ...slot };

    switch (slot.type) {
      case "text.heading":
        updated.content = {
          ...updated.content,
          fontFamily: brandKit.fonts.heading,
          color: brandKit.colors.textPrimary,
        };
        break;

      case "text.body":
        updated.content = {
          ...updated.content,
          fontFamily: brandKit.fonts.body,
          color: brandKit.colors.textSecondary,
        };
        break;

      case "color.primary":
        updated.content = {
          ...updated.content,
          fill: brandKit.colors.primary,
        };
        break;

      case "color.background":
        updated.content = {
          ...updated.content,
          fill: brandKit.colors.background,
        };
        break;

      case "logo":
        if (brandKit.assets.logo) {
          updated.content = {
            ...updated.content,
            src: brandKit.assets.logo,
          };
        }
        break;

      case "surface":
        updated.content = {
          ...updated.content,
          fill: brandKit.colors.surface,
          radius: brandKit.radii.card,
          shadow: brandKit.shadows.card,
        };
        break;

      default:
        break;
    }

    return updated;
  });
}
