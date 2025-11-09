/**
 * Skeleton Loaders for smooth loading UX
 * Prevents layout shift and improves perceived performance
 */

export function ProjectCardSkeleton() {
  return (
    <div className="p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg animate-pulse">
      <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-3"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6 mb-4"></div>
      <div className="flex gap-2 mb-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-16"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-20"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-16"></div>
      </div>
      <div className="flex gap-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-12"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-12"></div>
      </div>
    </div>
  )
}

export function ExperienceCardSkeleton() {
  return (
    <div className="relative pl-8 border-l-2 border-gray-300 dark:border-gray-700 animate-pulse">
      <div className="absolute left-0 top-0 w-4 h-4 bg-gray-300 dark:bg-gray-700 rounded-full transform -translate-x-[9px]"></div>
      <div className="space-y-2">
        <div className="h-7 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
        <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
      </div>
    </div>
  )
}

export function SkillCardSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
      <div className="flex flex-wrap gap-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-8 bg-gray-200 dark:bg-gray-800 rounded-full w-20"></div>
        ))}
      </div>
    </div>
  )
}

export function ProfileSkeleton() {
  return (
    <div className="flex justify-center animate-pulse">
      <div className="w-80 h-80 md:w-96 md:h-96 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
    </div>
  )
}

export function TextSkeleton({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-2 animate-pulse ${className}`}>
      {[...Array(lines)].map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-200 dark:bg-gray-800 rounded"
          style={{ width: i === lines - 1 ? '80%' : '100%' }}
        ></div>
      ))}
    </div>
  )
}

export function CardSkeleton({ className = '' }) {
  return (
    <div className={`p-6 border border-gray-200 dark:border-gray-800 rounded-lg animate-pulse ${className}`}>
      <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-2/3 mb-3"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/5"></div>
    </div>
  )
}
