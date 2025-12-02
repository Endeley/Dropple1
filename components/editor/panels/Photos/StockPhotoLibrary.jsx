'use client';

import StockPhotoItem from './StockPhotoItem';

const STOCK_PHOTOS = ['/photos/nature1.jpg', '/photos/nature2.jpg', '/photos/tech1.jpg', '/photos/city1.jpg', '/photos/person1.jpg', '/photos/abstract1.jpg', '/photos/mountain1.jpg', '/photos/colorful1.jpg'];

export default function StockPhotoLibrary() {
    return (
        <div className='grid grid-cols-2 gap-4'>
            {STOCK_PHOTOS.map((src, i) => (
                <StockPhotoItem key={i} src={src} />
            ))}
        </div>
    );
}
