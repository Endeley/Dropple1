const PREVIEW_SRC = '/mnt/data/A_2D_digital_design_of_a_Template_Browser_user_int.png';

const baseFrame = (overrides = {}) => ({
    type: 'frame',
    layout: 'vertical',
    spacing: 16,
    padding: { top: 40, right: 40, bottom: 40, left: 40 },
    width: 960,
    height: 640,
    children: [],
    ...overrides,
});

export function generateLayout(sectionType = 'hero') {
    switch (sectionType) {
        case 'hero':
            return heroSectionLayout();
        case 'features':
            return featureSectionLayout();
        case 'gallery':
            return gallerySectionLayout();
        case 'pricing':
            return pricingSectionLayout();
        case 'cta':
            return ctaSectionLayout();
        default:
            return basicSectionLayout();
    }
}

function heroSectionLayout() {
    return baseFrame({
        layout: 'horizontal',
        spacing: 48,
        padding: { top: 64, right: 64, bottom: 64, left: 64 },
        children: [
            {
                type: 'frame',
                layout: 'vertical',
                spacing: 16,
                children: [
                    { type: 'heading', text: 'Design faster with Dropple' },
                    {
                        type: 'subtext',
                        text: 'Smart sections, AI layouts, and pro-grade canvases stitched together for teams.',
                    },
                    { type: 'button', text: 'Get started' },
                ],
            },
            {
                type: 'image',
                src: PREVIEW_SRC,
                width: 460,
                height: 340,
            },
        ],
    });
}

function featureSectionLayout() {
    return baseFrame({
        layout: 'vertical',
        spacing: 28,
        children: [
            { type: 'heading', text: 'Features that feel designed for you' },
            {
                type: 'frame',
                layout: 'horizontal',
                spacing: 20,
                children: [
                    featureCard('Smart layouts'),
                    featureCard('Brand kits'),
                    featureCard('Real-time collaboration'),
                ],
            },
        ],
    });
}

function featureCard(title) {
    return {
        type: 'frame',
        layout: 'vertical',
        spacing: 8,
        padding: { top: 16, right: 16, bottom: 16, left: 16 },
        children: [
            { type: 'subheading', text: title },
            {
                type: 'subtext',
                text: 'Auto-spacing, smart snapping, and adaptive grids keep everything aligned.',
            },
        ],
    };
}

function gallerySectionLayout() {
    return baseFrame({
        layout: 'vertical',
        spacing: 20,
        children: [
            { type: 'heading', text: 'Gallery' },
            {
                type: 'frame',
                layout: 'horizontal',
                spacing: 12,
                children: [
                    { type: 'image', src: PREVIEW_SRC, width: 260, height: 180 },
                    { type: 'image', src: PREVIEW_SRC, width: 260, height: 180 },
                    { type: 'image', src: PREVIEW_SRC, width: 260, height: 180 },
                ],
            },
        ],
    });
}

function pricingSectionLayout() {
    return baseFrame({
        layout: 'horizontal',
        spacing: 24,
        children: [
            pricingCard('Free', '$0', 'Get started with core editing.'),
            pricingCard('Pro', '$19', 'Smart sections, brand kits, exports.'),
            pricingCard('Teams', '$49', 'Collaboration, approvals, audits.'),
        ],
    });
}

function pricingCard(tier, price, blurb) {
    return {
        type: 'frame',
        layout: 'vertical',
        spacing: 10,
        padding: { top: 20, right: 20, bottom: 20, left: 20 },
        children: [
            { type: 'subheading', text: tier },
            { type: 'heading', text: price },
            { type: 'subtext', text: blurb },
            { type: 'button', text: 'Choose' },
        ],
    };
}

function ctaSectionLayout() {
    return baseFrame({
        layout: 'horizontal',
        spacing: 28,
        padding: { top: 48, right: 48, bottom: 48, left: 48 },
        children: [
            { type: 'heading', text: 'Ready to ship faster?' },
            { type: 'button', text: 'Launch now' },
        ],
    });
}

function basicSectionLayout() {
    return baseFrame({
        children: [
            { type: 'heading', text: 'New section' },
            { type: 'subtext', text: 'AI generated layout scaffold.' },
        ],
    });
}
