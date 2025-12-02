import SkeletonBlock from './SkeletonBlock';
import SkeletonText from './SkeletonText';

export default function AISkeleton() {
    return (
        <div className='p-6 space-y-4'>
            <SkeletonBlock h='160px' rounded='xl' />
            <SkeletonText lines={4} />
        </div>
    );
}
