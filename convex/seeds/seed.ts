import { api } from "../_generated/api";
import { templateCategoriesSeed } from "./categories";
import { iconPacksSeed } from "./iconPacks";
import { iconsSeed } from "./icons";
import { muiPacksSeed, muiComponentsSeed } from "./mui";
import { aiTemplatesSeed } from "./ai";
import { brandKitsSeed } from "./brandKits";
import {
  templateDefinitionsSeed,
  templateHistorySeed,
  marketplaceTemplatesSeed,
  templateInstancesSeed,
} from "./templates";

export const seed = async (client: any) => {
  console.log("🌱 Seeding Dropple data...");

  // BRAND KITS
  for (const kit of brandKitsSeed) {
    await client.mutation(api.mutations.brandkits.createBrandKit, kit);
  }

  // CATEGORIES
  const existingCategories =
    (await client.query(api.queries.templateCategories.listCategories)) || [];
  const existingSlugs = new Set(existingCategories.map((c: any) => c.slug));
  for (const c of templateCategoriesSeed) {
    if (existingSlugs.has(c.slug)) continue;
    await client.mutation(api.mutations.templateCategories.createCategory, c);
  }

  // Marketplace templates from categories (ensure minimum count per category)
  const existingMarketplace =
    (await client.query(api.queries.marketplace.listMarketplaceTemplates)) || [];
  const templatesByCategory: Record<string, any[]> = {};
  existingMarketplace.forEach((t: any) => {
    templatesByCategory[t.category] = templatesByCategory[t.category] || [];
    templatesByCategory[t.category].push(t);
  });

  const MIN_TEMPLATES_PER_CATEGORY = 12;

  for (const c of templateCategoriesSeed) {
    const existingForCat = templatesByCategory[c.slug] || [];
    if (existingForCat.length >= MIN_TEMPLATES_PER_CATEGORY) continue;

    const toCreate = MIN_TEMPLATES_PER_CATEGORY - existingForCat.length;
    for (let i = 0; i < toCreate; i++) {
      await client.mutation(api.mutations.marketplace.publishTemplate, {
        templateId: `tpl-${c.slug}-${existingForCat.length + i}`,
        title: `${c.name} Starter ${existingForCat.length + i + 1}`,
        category: c.slug,
        tags: [c.name.toLowerCase()],
        preview: "/seed/templates/placeholder.png",
        author: "Dropple Studio",
        difficulty: "easy",
      });
    }
  }

  // TEMPLATE DEFINITIONS
  for (const def of templateDefinitionsSeed) {
    await client.mutation(
      api.mutations.templateDefinitions.publishTemplateDefinition,
      def
    );
  }

  // ICON PACKS
  const createdPacks: Record<string, string> = {};
  for (const pack of iconPacksSeed) {
    const id = await client.mutation(
      api.mutations.iconPacks.createIconPack,
      pack
    );
    createdPacks[pack.name] = id;
  }

  // ICONS
  for (const icon of iconsSeed) {
    const packId = createdPacks[icon.packName];
    await client.mutation(api.mutations.icons.createIcon, {
      packId,
      title: icon.title,
      svg: icon.svg,
      category: icon.category,
      strokeWidth: icon.strokeWidth,
      tags: icon.tags,
    });
  }

  // TEMPLATE HISTORY
  for (const version of templateHistorySeed) {
    await client.mutation(api.mutations.templateHistory.saveVersion, version);
  }

  // MARKETPLACE TEMPLATES
  for (const entry of marketplaceTemplatesSeed) {
    await client.mutation(api.mutations.marketplace.publishTemplate, entry);
  }

  // TEMPLATE INSTANCES
  for (const instance of templateInstancesSeed) {
    await client.mutation(
      api.mutations.templates.createTemplateInstance,
      instance
    );
  }

  // MUI PACKS
  const muiPackIds: Record<string, string> = {};
  for (const pack of muiPacksSeed) {
    const id = await client.mutation(
      api.mutations.muiPacks.createMuiPack,
      pack
    );
    muiPackIds[pack.name] = id;
  }

  // MUI COMPONENTS
  for (const comp of muiComponentsSeed) {
    const packId = muiPackIds[comp.packName];
    await client.mutation(api.mutations.muiComponents.createMuiComponent, {
      packId,
      title: comp.title,
      props: comp.props,
      code: comp.code,
      preview: comp.preview,
      category: comp.category,
    });
  }

  // AI TEMPLATES
  for (const ai of aiTemplatesSeed) {
    await client.mutation(api.mutations.aiTemplates.createAiTemplate, ai);
  }

  console.log("✨ Seeding complete");
};
