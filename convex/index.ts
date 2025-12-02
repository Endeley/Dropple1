import * as brandkits from "./mutations/brandkits";
import * as marketplace from "./mutations/marketplace";
import * as previews from "./mutations/previews";
import * as templateDefinitions from "./mutations/templateDefinitions";
import * as templateHistory from "./mutations/templateHistory";
import * as templates from "./mutations/templates";

// NEW MUTATIONS
import * as templateCategories from "./mutations/templateCategories";
import * as iconPacks from "./mutations/iconPacks";
import * as icons from "./mutations/icons";
import * as muiPacks from "./mutations/muiPacks";
import * as muiComponents from "./mutations/muiComponents";
import * as aiTemplates from "./mutations/aiTemplates";
import * as userProjects from "./mutations/userProjects";
import * as assets from "./mutations/assets";

// Queries
import * as brandkitsQueries from "./queries/brandkits";
import * as marketplaceQueries from "./queries/marketplace";
import * as templateDefinitionsQueries from "./queries/templateDefinitions";
import * as templateHistoryQueries from "./queries/templateHistory";
import * as templateInstancesQueries from "./queries/templates";

// NEW QUERIES
import * as templateCategoriesQueries from "./queries/templateCategories";
import * as iconPacksQueries from "./queries/iconPacks";
import * as iconsQueries from "./queries/icons";
import * as muiPacksQueries from "./queries/muiPacks";
import * as muiComponentsQueries from "./queries/muiComponents";
import * as aiTemplatesQueries from "./queries/aiTemplates";
import * as userProjectsQueries from "./queries/userProjects";
import * as assetsQueries from "./queries/assets";

// Core Documents + Libraries
import * as documents from "./documents";
import * as libraries from "./libraries";

export {
  brandkits,
  marketplace,
  previews,
  templateDefinitions,
  templateHistory,
  templates,
  templateCategories,
  iconPacks,
  icons,
  muiPacks,
  muiComponents,
  aiTemplates,
  userProjects,
  assets,
  brandkitsQueries,
  marketplaceQueries,
  templateDefinitionsQueries,
  templateHistoryQueries,
  templateInstancesQueries,
  templateCategoriesQueries,
  iconPacksQueries,
  iconsQueries,
  muiPacksQueries,
  muiComponentsQueries,
  aiTemplatesQueries,
  userProjectsQueries,
  assetsQueries,
  documents,
  libraries,
};

const convex = {
  brandkits,
  marketplace,
  previews,
  templateDefinitions,
  templateHistory,
  templates,

  templateCategories,
  iconPacks,
  icons,
  muiPacks,
  muiComponents,
  aiTemplates,
  userProjects,
  assets,

  brandkitsQueries,
  marketplaceQueries,
  templateDefinitionsQueries,
  templateHistoryQueries,
  templateInstancesQueries,

  templateCategoriesQueries,
  iconPacksQueries,
  iconsQueries,
  muiPacksQueries,
  muiComponentsQueries,
  aiTemplatesQueries,
  userProjectsQueries,
  assetsQueries,

  documents,
  libraries,
};

export default convex;
