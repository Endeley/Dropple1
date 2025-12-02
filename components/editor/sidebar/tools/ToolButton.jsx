export default function ToolButton({ label, icon: Icon }) {
    return (
        <div
            className='
        flex items-center gap-2
        px-3 py-2
        bg-white dark:bg-neutral-800
        border-2 border-neutral-300 dark:border-neutral-700
        rounded-lg
        shadow-brutal
        hover:shadow-brutalHover
        transition-all
      '>
            <Icon className='w-4 h-4' />
            <span className='text-sm font-semibold uppercase'>{label}</span>
        </div>
    );
}
