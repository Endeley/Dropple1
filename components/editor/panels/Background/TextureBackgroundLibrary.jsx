'use client';

import BgTextureItem from './BgTextureItem';

const TEXTURES = ['/textures/paper1.jpg', '/textures/grain1.jpg', '/textures/concrete.jpg', '/textures/fabric.jpg', '/textures/abstract1.jpg', '/textures/paint1.jpg'];

export default function TextureBackgroundLibrary({ fabricCanvas }) {
    return (
        <div className='grid grid-cols-2 gap-4'>
            {TEXTURES.map((src, i) => (
                <BgTextureItem key={i} src={src} fabricCanvas={fabricCanvas} />
            ))}
        </div>
    );
}
