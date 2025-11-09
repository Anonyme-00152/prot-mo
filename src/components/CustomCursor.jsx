import { useEffect, useState } from 'react'

/**
 * Custom Cursor Component
 * 2025 Trend: Playful, interactive cursors that enhance user experience
 * Only shows on desktop devices
 */
export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if device supports hover (desktop)
    const hasHover = window.matchMedia('(hover: hover)').matches
    if (!hasHover) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseOver = (e) => {
      const target = e.target
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.style.cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'pointer'

      setIsPointer(isClickable)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', updateCursor)
    window.addEventListener('mouseover', handleMouseOver)
    document.body.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', updateCursor)
      window.removeEventListener('mouseover', handleMouseOver)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`bg-white rounded-full transition-all duration-150 ${
            isPointer ? 'w-3 h-3' : 'w-2 h-2'
          }`}
        />
      </div>

      {/* Trailing ring */}
      <div
        className="fixed pointer-events-none z-[9998] mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s ease, height 0.3s ease, opacity 0.3s ease',
        }}
      >
        <div
          className={`border-2 border-white rounded-full transition-all duration-300 ${
            isPointer ? 'w-12 h-12 opacity-80' : 'w-8 h-8 opacity-50'
          }`}
        />
      </div>

      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  )
}

/**
 * Cursor Follower Alternative (Smoother, more subtle)
 */
export function CursorFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const hasHover = window.matchMedia('(hover: hover)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!hasHover || prefersReducedMotion) return

    const updateTarget = (e) => {
      setTargetPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e) => {
      const target = e.target
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')

      setIsPointer(isClickable)
    }

    window.addEventListener('mousemove', updateTarget)
    window.addEventListener('mouseover', handleMouseOver)

    // Smooth follow animation
    let animationFrame
    const animate = () => {
      setPosition((prev) => ({
        x: prev.x + (targetPosition.x - prev.x) * 0.15,
        y: prev.y + (targetPosition.y - prev.y) * 0.15,
      }))
      animationFrame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', updateTarget)
      window.removeEventListener('mouseover', handleMouseOver)
      cancelAnimationFrame(animationFrame)
    }
  }, [targetPosition])

  return (
    <div
      className="fixed pointer-events-none z-[9999] mix-blend-difference"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className={`bg-white rounded-full transition-all duration-200 ${
          isPointer ? 'w-10 h-10 opacity-60' : 'w-6 h-6 opacity-40'
        }`}
      />
    </div>
  )
}
