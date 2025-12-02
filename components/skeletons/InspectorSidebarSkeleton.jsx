import SkeletonBlock from './SkeletonBlock';
import SkeletonText from './SkeletonText';

export default function InspectorSidebarSkeleton() {
    return (
        <div className='p-4 space-y-4'>
            <SkeletonBlock h='24px' w='60%' />
            <SkeletonText lines={3} />

            <SkeletonBlock h='24px' w='50%' />
            <SkeletonBlock h='40px' />

            <SkeletonBlock h='24px' w='40%' />
            <SkeletonText lines={4} />
        </div>
    );
}
