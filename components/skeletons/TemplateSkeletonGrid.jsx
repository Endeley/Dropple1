export default function TemplateSkeletonGrid({ count = 12 }) {
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className='bg-gray-300/20 animate-pulse h-48 rounded-xl shadow-inner' />
            ))}
        </div>
    );
}
