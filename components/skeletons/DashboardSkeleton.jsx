import SkeletonBlock from './SkeletonBlock';
import TemplateSkeletonGrid from './TemplateSkeletonGrid';

export default function DashboardSkeleton() {
    return (
        <div className='p-6 grid grid-cols-12 gap-6'>
            <div className='col-span-3 space-y-3'>
                <SkeletonBlock h='40px' />
                <SkeletonBlock h='40px' />
                <SkeletonBlock h='40px' />
            </div>

            <div className='col-span-9 space-y-6'>
                <SkeletonBlock h='30px' w='40%' />
                <TemplateSkeletonGrid count={8} />
            </div>
        </div>
    );
}
