import SkeletonBlock from './SkeletonBlock';

export default function ModeSwitcherSkeleton() {
    return (
        <div className='flex gap-3 p-4'>
            {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonBlock key={index} h='36px' w='80px' rounded='full' />
            ))}
        </div>
    );
}
