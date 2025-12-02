export default function CanvasSkeleton() {
    return (
        <div className='w-full h-full bg-gray-300/10 flex items-center justify-center'>
            <div className='w-3/4 h-3/4 bg-gray-300/20 animate-pulse rounded-xl shadow-inner' />
        </div>
    );
}
