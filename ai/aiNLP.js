const includesAny = (text, keywords) => keywords.some((word) => text.includes(word));

export const aiUnderstand = async (input) => {
    const lowered = input.toLowerCase();

    if (includesAny(lowered, ['center', 'align', 'middle'])) {
        if (lowered.includes('left')) return { type: 'alignment', options: { mode: 'left' } };
        if (lowered.includes('right')) return { type: 'alignment', options: { mode: 'right' } };
        if (lowered.includes('top')) return { type: 'alignment', options: { mode: 'top' } };
        if (lowered.includes('bottom')) return { type: 'alignment', options: { mode: 'bottom' } };
        return { type: 'alignment', options: { mode: 'center' } };
    }

    if (includesAny(lowered, ['layout', 'columns', 'rows', 'grid'])) {
        if (lowered.includes('row')) return { type: 'autoLayout', options: { pattern: 'rows' } };
        if (lowered.includes('grid')) return { type: 'autoLayout', options: { pattern: 'grid' } };
        return { type: 'autoLayout', options: { pattern: 'columns' } };
    }

    if (includesAny(lowered, ['replace image', 'change image', 'swap image', 'new photo'])) {
        return { type: 'replaceImage', query: input };
    }

    if (includesAny(lowered, ['bold', 'font', 'typography', 'text'])) {
        return { type: 'adjustTypography', style: input };
    }

    if (includesAny(lowered, ['color', 'palette', 'recolor'])) {
        return { type: 'fixColor' };
    }

    if (includesAny(lowered, ['spacing', 'gap', 'evenly'])) {
        const direction = lowered.includes('horizontal') ? 'horizontal' : 'vertical';
        return { type: 'fixSpacing', options: { direction } };
    }

    if (includesAny(lowered, ['template', 'flyer', 'poster', 'design'])) {
        return { type: 'template', templateType: input };
    }

    return { type: 'unknown' };
};
