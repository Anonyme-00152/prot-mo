import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook for Intersection Observer
 * Detects when an element enters the viewport for scroll animations
 *
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - Percentage of element visibility (0-1)
 * @param {string} options.rootMargin - Margin around root
 * @param {boolean} options.triggerOnce - Only trigger once
 * @returns {Object} { ref, isIntersecting, hasIntersected }
 */
export function useIntersectionObserver(options = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
  } = options

  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current

    if (!node || hasIntersected && triggerOnce) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      // If user prefers reduced motion, show immediately
      setIsIntersecting(true)
      setHasIntersected(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting

        setIsIntersecting(isElementIntersecting)

        if (isElementIntersecting) {
          setHasIntersected(true)

          if (triggerOnce) {
            observer.disconnect()
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, triggerOnce, hasIntersected])

  return { ref, isIntersecting, hasIntersected }
}

/**
 * HOC for animated components
 * Wraps children with intersection observer
 */
export function AnimateOnScroll({
  children,
  className = '',
  animation = 'fade-up',
  threshold = 0.1,
  delay = 0
}) {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold, triggerOnce: true })

  const animationClasses = {
    'fade-up': 'translate-y-10 opacity-0',
    'fade-down': '-translate-y-10 opacity-0',
    'fade-left': 'translate-x-10 opacity-0',
    'fade-right': '-translate-x-10 opacity-0',
    'fade': 'opacity-0',
    'scale': 'scale-95 opacity-0',
    'zoom': 'scale-110 opacity-0',
  }

  const activeClasses = 'translate-y-0 translate-x-0 scale-100 opacity-100'

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        hasIntersected ? activeClasses : animationClasses[animation]
      } ${className}`}
      style={{
        transitionDelay: hasIntersected ? `${delay}ms` : '0ms'
      }}
    >
      {children}
    </div>
  )
}
