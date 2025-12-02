'use client';

export default function BackgroundMeshPanel() {
    const MESH = ["url('/mesh1.jpg')", "url('/mesh2.jpg')", "url('/mesh3.jpg')", "url('/mesh4.jpg')"];

    return (
        <div className='flex flex-col gap-6'>
            <h2 className='text-xl font-semibold'>Mesh Gradients</h2>

            <div className='grid grid-cols-2 gap-4'>
                {MESH.map((m) => (
                    <div
                        key={m}
                        className='
              h-32 rounded-xl 
              bg-cover bg-center
              border border-neutral-300 dark:border-neutral-700
              shadow-sm
            '
                        style={{ backgroundImage: m }}
                    />
                ))}
            </div>

            <p className='text-xs opacity-60 mt-2'>Supports custom mesh editors.</p>
        </div>
    );
}
