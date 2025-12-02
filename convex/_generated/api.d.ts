/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as documents from "../documents.js";
import type * as index from "../index.js";
import type * as libraries from "../libraries.js";
import type * as mutations_aiSections from "../mutations/aiSections.js";
import type * as mutations_aiTemplates from "../mutations/aiTemplates.js";
import type * as mutations_animations from "../mutations/animations.js";
import type * as mutations_assets from "../mutations/assets.js";
import type * as mutations_brandkits from "../mutations/brandkits.js";
import type * as mutations_comments from "../mutations/comments.js";
import type * as mutations_cursors from "../mutations/cursors.js";
import type * as mutations_documentVersions from "../mutations/documentVersions.js";
import type * as mutations_fonts from "../mutations/fonts.js";
import type * as mutations_iconPacks from "../mutations/iconPacks.js";
import type * as mutations_icons from "../mutations/icons.js";
import type * as mutations_marketplace from "../mutations/marketplace.js";
import type * as mutations_mockups from "../mutations/mockups.js";
import type * as mutations_muiComponents from "../mutations/muiComponents.js";
import type * as mutations_muiPacks from "../mutations/muiPacks.js";
import type * as mutations_presence from "../mutations/presence.js";
import type * as mutations_previews from "../mutations/previews.js";
import type * as mutations_teamTemplates from "../mutations/teamTemplates.js";
import type * as mutations_teams from "../mutations/teams.js";
import type * as mutations_templateCategories from "../mutations/templateCategories.js";
import type * as mutations_templateDefinitions from "../mutations/templateDefinitions.js";
import type * as mutations_templateHistory from "../mutations/templateHistory.js";
import type * as mutations_templates from "../mutations/templates.js";
import type * as mutations_userProjects from "../mutations/userProjects.js";
import type * as queries_aiTemplates from "../queries/aiTemplates.js";
import type * as queries_assets from "../queries/assets.js";
import type * as queries_brandkits from "../queries/brandkits.js";
import type * as queries_cursors from "../queries/cursors.js";
import type * as queries_documentVersions from "../queries/documentVersions.js";
import type * as queries_iconPacks from "../queries/iconPacks.js";
import type * as queries_icons from "../queries/icons.js";
import type * as queries_marketplace from "../queries/marketplace.js";
import type * as queries_muiComponents from "../queries/muiComponents.js";
import type * as queries_muiPacks from "../queries/muiPacks.js";
import type * as queries_templateCategories from "../queries/templateCategories.js";
import type * as queries_templateDefinitions from "../queries/templateDefinitions.js";
import type * as queries_templateHistory from "../queries/templateHistory.js";
import type * as queries_templates from "../queries/templates.js";
import type * as queries_userProjects from "../queries/userProjects.js";
import type * as seeds_ai from "../seeds/ai.js";
import type * as seeds_brandKits from "../seeds/brandKits.js";
import type * as seeds_categories from "../seeds/categories.js";
import type * as seeds_iconPacks from "../seeds/iconPacks.js";
import type * as seeds_icons from "../seeds/icons.js";
import type * as seeds_mui from "../seeds/mui.js";
import type * as seeds_run from "../seeds/run.js";
import type * as seeds_seed from "../seeds/seed.js";
import type * as seeds_templates from "../seeds/templates.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  documents: typeof documents;
  index: typeof index;
  libraries: typeof libraries;
  "mutations/aiSections": typeof mutations_aiSections;
  "mutations/aiTemplates": typeof mutations_aiTemplates;
  "mutations/animations": typeof mutations_animations;
  "mutations/assets": typeof mutations_assets;
  "mutations/brandkits": typeof mutations_brandkits;
  "mutations/comments": typeof mutations_comments;
  "mutations/cursors": typeof mutations_cursors;
  "mutations/documentVersions": typeof mutations_documentVersions;
  "mutations/fonts": typeof mutations_fonts;
  "mutations/iconPacks": typeof mutations_iconPacks;
  "mutations/icons": typeof mutations_icons;
  "mutations/marketplace": typeof mutations_marketplace;
  "mutations/mockups": typeof mutations_mockups;
  "mutations/muiComponents": typeof mutations_muiComponents;
  "mutations/muiPacks": typeof mutations_muiPacks;
  "mutations/presence": typeof mutations_presence;
  "mutations/previews": typeof mutations_previews;
  "mutations/teamTemplates": typeof mutations_teamTemplates;
  "mutations/teams": typeof mutations_teams;
  "mutations/templateCategories": typeof mutations_templateCategories;
  "mutations/templateDefinitions": typeof mutations_templateDefinitions;
  "mutations/templateHistory": typeof mutations_templateHistory;
  "mutations/templates": typeof mutations_templates;
  "mutations/userProjects": typeof mutations_userProjects;
  "queries/aiTemplates": typeof queries_aiTemplates;
  "queries/assets": typeof queries_assets;
  "queries/brandkits": typeof queries_brandkits;
  "queries/cursors": typeof queries_cursors;
  "queries/documentVersions": typeof queries_documentVersions;
  "queries/iconPacks": typeof queries_iconPacks;
  "queries/icons": typeof queries_icons;
  "queries/marketplace": typeof queries_marketplace;
  "queries/muiComponents": typeof queries_muiComponents;
  "queries/muiPacks": typeof queries_muiPacks;
  "queries/templateCategories": typeof queries_templateCategories;
  "queries/templateDefinitions": typeof queries_templateDefinitions;
  "queries/templateHistory": typeof queries_templateHistory;
  "queries/templates": typeof queries_templates;
  "queries/userProjects": typeof queries_userProjects;
  "seeds/ai": typeof seeds_ai;
  "seeds/brandKits": typeof seeds_brandKits;
  "seeds/categories": typeof seeds_categories;
  "seeds/iconPacks": typeof seeds_iconPacks;
  "seeds/icons": typeof seeds_icons;
  "seeds/mui": typeof seeds_mui;
  "seeds/run": typeof seeds_run;
  "seeds/seed": typeof seeds_seed;
  "seeds/templates": typeof seeds_templates;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
