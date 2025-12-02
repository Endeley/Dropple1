export default function SkeletonText({ lines = 3 }) {
    return (
        <div className='space-y-2'>
            {Array.from({ length: lines }).map((_, index) => (
                <div key={index} className='bg-gray-300/20 animate-pulse h-3 rounded w-full' />
            ))}
        </div>
    );
}
