import TemplateSkeletonGrid from './TemplateSkeletonGrid';
import InspectorSidebarSkeleton from './InspectorSidebarSkeleton';
import CanvasSkeleton from './CanvasSkeleton';

export default function WorkspaceSkeleton() {
    return (
        <div className='flex w-full h-full'>
            <div className='w-64 border-r border-gray-200'>
                <TemplateSkeletonGrid count={6} />
            </div>

            <div className='flex-1'>
                <CanvasSkeleton />
            </div>

            <div className='w-80 border-l border-gray-200'>
                <InspectorSidebarSkeleton />
            </div>
        </div>
    );
}
