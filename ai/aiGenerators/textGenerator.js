export const textGenerator = async (prompt = '') => {
    const lowered = prompt.toLowerCase();

    if (lowered.includes('flyer')) {
        return {
            headline: 'Summer Flyer Special',
            body: 'Join us for an unforgettable experience packed with music, art, and community. Doors open at 7PM.',
        };
    }

    if (lowered.includes('business')) {
        return {
            headline: 'Elevate Your Brand',
            body: 'Professional solutions tailored for fast-moving teams. Present your next big idea with confidence.',
        };
    }

    return {
        headline: 'Design with Dropple AI',
        body: 'Let the assistant craft layouts, images, and typography instantly. Describe what you need and watch it build.',
    };
};
