import { useCallback, useRef } from 'react'

/**
 * Custom hook to throttle function calls
 * @param {Function} callback - Function to throttle
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Throttled function
 */
export function useThrottle(callback, delay) {
  const lastRan = useRef(Date.now())

  return useCallback(
    (...args) => {
      const now = Date.now()

      if (now - lastRan.current >= delay) {
        callback(...args)
        lastRan.current = now
      }
    },
    [callback, delay]
  )
}

/**
 * Custom hook to debounce function calls
 * @param {Function} callback - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export function useDebounce(callback, delay) {
  const timeoutRef = useRef(null)

  return useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay]
  )
}
