export default function SkeletonBlock({ w = '100%', h = '20px', rounded = 'md' }) {
    return (
        <div
            className={`bg-gray-300/20 animate-pulse rounded-${rounded}`}
            style={{ width: w, height: h }}
        />
    );
}
