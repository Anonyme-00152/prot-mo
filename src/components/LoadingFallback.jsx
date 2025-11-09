import { Loader2 } from 'lucide-react'

export function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-gray-900 dark:text-white mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  )
}

export function SectionLoadingFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-8 h-8 animate-spin text-gray-900 dark:text-white" />
    </div>
  )
}

export function InlineLoadingFallback() {
  return (
    <div className="inline-flex items-center gap-2">
      <Loader2 className="w-4 h-4 animate-spin" />
      <span className="text-sm text-gray-600 dark:text-gray-400">Loading...</span>
    </div>
  )
}
