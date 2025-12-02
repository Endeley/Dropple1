import { createObjectId } from '@/utils/createObjectId';

export const predefinedAssets = [
    {
        id: createObjectId(),
        type: 'shape',
        category: 'Shapes',
        src: '',
        metadata: { width: 150, height: 150, fill: '#A855F7', rx: 12 },
        tags: ['rectangle', 'shape'],
    },
    {
        id: createObjectId(),
        type: 'shape',
        category: 'Shapes',
        src: '',
        metadata: { width: 140, height: 140, fill: '#EF4444', rx: 9999 },
        tags: ['circle', 'shape'],
    },
    {
        id: createObjectId(),
        type: 'icon',
        category: 'Icons',
        src: '/icons/lucide/star.svg',
        metadata: {},
        tags: ['star', 'icon'],
    },
];
