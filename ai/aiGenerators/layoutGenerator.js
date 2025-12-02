export const layoutGenerator = (type = 'generic') => {
    const lowered = type.toLowerCase();

    if (lowered.includes('flyer')) {
        return {
            heading: { x: 120, y: 120, w: 520 },
            body: { x: 120, y: 320, w: 520 },
            items: [
                { x: 80, y: 100, w: 640, h: 260 },
                { x: 80, y: 380, w: 640, h: 160 },
                { x: 80, y: 560, w: 640, h: 220 },
            ],
        };
    }

    if (lowered.includes('business') || lowered.includes('presentation')) {
        return {
            heading: { x: 140, y: 140, w: 560 },
            body: { x: 140, y: 360, w: 520 },
            items: [
                { x: 100, y: 120, w: 620, h: 220 },
                { x: 100, y: 380, w: 620, h: 180 },
                { x: 100, y: 580, w: 620, h: 200 },
            ],
        };
    }

    return {
        heading: { x: 160, y: 160, w: 480 },
        body: { x: 160, y: 360, w: 420 },
        items: [
            { x: 120, y: 140, w: 560, h: 200 },
            { x: 120, y: 380, w: 560, h: 260 },
        ],
    };
};
