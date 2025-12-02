import { useAssetsStore } from '@/stores/useAssetsStore';
import { createObjectId } from '@/utils/createObjectId';

export const uploadAsset = (file) => {
    const reader = new FileReader();

    const id = createObjectId();

    reader.onload = () => {
        useAssetsStore.getState().addAsset({
            id,
            type: 'image',
            category: 'User Uploads',
            tags: [],
            src: reader.result,
            metadata: {
                name: file.name,
                size: file.size,
                type: file.type,
            },
        });
    };

    reader.readAsDataURL(file);

    return id;
};
