// --- TOP LEVEL PANELS ---
import DesignPanel from './Design/DesignPanel';
import ElementsPanel from './Element/ElementsPanel';
import TextPanel from './Text/TextPanel';
import UploadsPanel from './Uploads/UploadsPanel';
import PhotosPanel from './Photos/PhotosPanel';
import BackgroundPanel from './Background/BackgroundPanel';
import AiToolsPanel from './Ai/AiToolsPanel';

// --- DESIGN SUBPANELS ---
import DesignTemplatesPanel from './Design/DesignTemplatesPanel';
import DesignStylesPanel from './Design/DesignStylesPanel';
import DesignLayoutsPanel from './Design/DesignLayoutsPanel';
import DesignPalettesPanel from './Design/DesignPalettesPanel';
import DesignTypographyPanel from './Design/DesignTypographyPanel';
import DesignBrandKitsPanel from './Design/DesignBrandKitsPanel';
import DesignThemesPanel from './Design/DesignThemesPanel';

// --- ELEMENTS SUBPANELS ---
import BasicShapesPanel from './Element/BasicShapesPanel';
import ComplexShapesPanel from './Element/ComplexShapesPanel';
import IconsPanel from './Element/IconsPanel';
import StickersPanel from './Element/StickersPanel';
import IllustrationsPanel from './Element/IllustrationsPanel';
import GradientsPanel from './Element/GradientsPanel';
import PatternsPanel from './Element/PatternsPanel';
import TexturesPanel from './Element/TexturesPanel';
import UIElementsPanel from './Element/UIElementsPanel';
import EffectsPanel from './Element/EffectsPanel';

// --- TEXT SUBPANELS ---
import TextHeadingsPanel from './Text/TextHeadingsPanel';
import TextPresetsPanel from './Text/TextPresetsPanel';
import TextFontsPanel from './Text/TextFontsPanel';
import TextEffectsPanel from './Text/TextEffectsPanel';

// --- PHOTOS SUBPANELS ---
import PhotosStockPanel from './Photos/PhotosStockPanel';
import PhotosAIPanel from './Photos/PhotosAIPanel';
import PhotosCollectionsPanel from './Photos/PhotosCollectionsPanel';
import PhotosCutoutsPanel from './Photos/PhotosCutoutsPanel';

// --- AI SUBPANELS ---
import AiErasePanel from './Ai/AiErasePanel';
import AiFillPanel from './Ai/AiFillPanel';
import AiReplaceBgPanel from './Ai/AiReplaceBgPanel';
import AiUpscalePanel from './Ai/AiUpscalePanel';
import AiGeneratePanel from './Ai/AiGeneratePanel';
import AiStyleTransferPanel from './Ai/AiStyleTransferPanel';
import AiOutpaintPanel from './Ai/AiOutpaintPanel';

// --- BACKGROUND SUBPANELS ---
import BackgroundSolidPanel from './Background/BackgroundSolidPanel';
import BackgroundGradientsPanel from './Background/BackgroundGradientsPanel';
import BackgroundMeshPanel from './Background/BackgroundMeshPanel';
import BackgroundTexturesPanel from './Background/BackgroundTexturesPanel';
import BackgroundAIPanel from './Background/BackgroundAIPanel';

export {
    DesignTemplatesPanel,
    DesignStylesPanel,
    DesignLayoutsPanel,
    DesignPalettesPanel,
    DesignTypographyPanel,
    DesignBrandKitsPanel,
    DesignThemesPanel,
    BasicShapesPanel,
    ComplexShapesPanel,
    IconsPanel,
    StickersPanel,
    IllustrationsPanel,
    GradientsPanel,
    PatternsPanel,
    TexturesPanel,
    UIElementsPanel,
    EffectsPanel,
    TextHeadingsPanel,
    TextPresetsPanel,
    TextFontsPanel,
    TextEffectsPanel,
    PhotosStockPanel,
    PhotosAIPanel,
    PhotosCollectionsPanel,
    PhotosCutoutsPanel,
    AiErasePanel,
    AiFillPanel,
    AiReplaceBgPanel,
    AiUpscalePanel,
    AiGeneratePanel,
    AiStyleTransferPanel,
    AiOutpaintPanel,
    BackgroundSolidPanel,
    BackgroundGradientsPanel,
    BackgroundMeshPanel,
    BackgroundTexturesPanel,
    BackgroundAIPanel,
};

// --- FINAL PANEL REGISTRY OBJECT ---
export const PANEL_COMPONENTS = {
    // Top-Level Panels
    design: DesignPanel,
    elements: ElementsPanel,
    text: TextPanel,
    uploads: UploadsPanel,
    photos: PhotosPanel,
    background: BackgroundPanel,
    ai: AiToolsPanel,

    // Design Subpanels
    'design-templates': DesignTemplatesPanel,
    'design-styles': DesignStylesPanel,
    'design-layouts': DesignLayoutsPanel,
    'design-palettes': DesignPalettesPanel,
    'design-typography': DesignTypographyPanel,
    'design-brandkits': DesignBrandKitsPanel,
    'design-themes': DesignThemesPanel,

    // Elements Subpanels
    'elements-shapes-basic': BasicShapesPanel,
    'elements-shapes-complex': ComplexShapesPanel,
    'elements-icons': IconsPanel,
    'elements-stickers': StickersPanel,
    'elements-illustrations': IllustrationsPanel,
    'elements-gradients': GradientsPanel,
    'elements-patterns': PatternsPanel,
    'elements-textures': TexturesPanel,
    'elements-ui': UIElementsPanel,
    'elements-effects': EffectsPanel,

    // Text Subpanels
    'text-headings': TextHeadingsPanel,
    'text-presets': TextPresetsPanel,
    'text-fonts': TextFontsPanel,
    'text-effects': TextEffectsPanel,

    // Photos Subpanels
    'photos-stock': PhotosStockPanel,
    'photos-ai': PhotosAIPanel,
    'photos-collections': PhotosCollectionsPanel,
    'photos-cutouts': PhotosCutoutsPanel,

    // AI Subpanels
    'ai-erase': AiErasePanel,
    'ai-fill': AiFillPanel,
    'ai-replace-bg': AiReplaceBgPanel,
    'ai-upscale': AiUpscalePanel,
    'ai-generate': AiGeneratePanel,
    'ai-style': AiStyleTransferPanel,
    'ai-outpaint': AiOutpaintPanel,

    // Background Subpanels
    'background-solid': BackgroundSolidPanel,
    'background-gradients': BackgroundGradientsPanel,
    'background-mesh': BackgroundMeshPanel,
    'background-textures': BackgroundTexturesPanel,
    'background-ai': BackgroundAIPanel,
};
