export const paletteGenerator = (type = 'default') => {
    const lowered = type.toLowerCase();

    if (lowered.includes('business')) {
        return ['#0F172A', '#1E293B', '#3B82F6', '#38BDF8'];
    }

    if (lowered.includes('party') || lowered.includes('festival')) {
        return ['#EC4899', '#A855F7', '#7C3AED', '#F472B6'];
    }

    if (lowered.includes('minimal')) {
        return ['#111827', '#F3F4F6', '#9CA3AF', '#F59E0B'];
    }

    return ['#7C3AED', '#4F46E5', '#0EA5E9', '#22D3EE'];
};
