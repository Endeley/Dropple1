export default function ToolCategoryItem({ label, onClick }) {
    return (
        <button
            onClick={onClick}
            className='
        w-full
        px-4 py-3
        text-left
        rounded-lg
        bg-white dark:bg-neutral-800
        border-2 border-neutral-300 dark:border-neutral-700
        shadow-brutal
        hover:bg-neutral-100 dark:hover:bg-neutral-700
        hover:shadow-brutalHover
        transition-all
      '>
            {label}
        </button>
    );
}
