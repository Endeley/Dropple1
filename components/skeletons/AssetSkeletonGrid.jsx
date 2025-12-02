export default function AssetSkeletonGrid({ count = 20 }) {
    return (
        <div className='grid grid-cols-4 gap-3 p-4'>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className='bg-gray-300/20 animate-pulse h-20 rounded-lg' />
            ))}
        </div>
    );
}
