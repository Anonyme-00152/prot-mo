import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

/**
 * Custom Cursor Component - Ultra Modern 2025
 * Features: Smooth following, glow effects, magnetic hover
 * Only shows on desktop devices with hover support
 */
export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  // Smooth spring animations
  const cursorX = useSpring(0, { stiffness: 500, damping: 28 })
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 })

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check if device supports hover (desktop)
    const hasHover = window.matchMedia('(hover: hover)').matches
    if (!hasHover) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseOver = (e) => {
      const target = e.target
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        target.style.cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'pointer'

      setIsPointer(isClickable)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener('mousemove', updateCursor)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.body.addEventListener('mouseleave', handleMouseLeave)
    document.body.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', updateCursor)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [cursorX, cursorY])

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor dot with glow */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="relative"
          animate={{
            scale: isClicking ? 0.8 : isPointer ? 1.2 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-50 animate-glow" />
          {/* Main dot */}
          <div
            className={`relative bg-white rounded-full transition-all duration-150 ${
              isPointer ? 'w-3 h-3' : 'w-2 h-2'
            }`}
          />
        </motion.div>
      </motion.div>

      {/* Trailing ring with smooth follow */}
      <motion.div
        className="fixed pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
      >
        <motion.div
          className="border-2 border-white rounded-full"
          animate={{
            width: isPointer ? 48 : 32,
            height: isPointer ? 48 : 32,
            opacity: isPointer ? 0.8 : 0.4,
            scale: isClicking ? 0.9 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

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
 * Magnetic Cursor Effect
 * Buttons and links attract the cursor within a certain radius
 */
export function MagneticCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)

  const cursorX = useSpring(0, { stiffness: 500, damping: 28 })
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const hasHover = window.matchMedia('(hover: hover)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!hasHover || prefersReducedMotion) return

    const updateCursor = (e) => {
      const x = e.clientX
      const y = e.clientY

      // Check for magnetic elements
      const magneticElements = document.querySelectorAll('[data-magnetic]')
      let attracted = false

      magneticElements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distance = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2))
        const magneticRadius = 100

        if (distance < magneticRadius) {
          const strength = 0.3
          const offsetX = (centerX - x) * strength
          const offsetY = (centerY - y) * strength
          setMagneticOffset({ x: offsetX, y: offsetY })
          attracted = true
        }
      })

      if (!attracted) {
        setMagneticOffset({ x: 0, y: 0 })
      }

      setPosition({ x, y })
      cursorX.set(x + magneticOffset.x)
      cursorY.set(y + magneticOffset.y)
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

    window.addEventListener('mousemove', updateCursor)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', updateCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [cursorX, cursorY, magneticOffset])

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.div
        className={`bg-white rounded-full transition-all duration-200 ${
          isPointer ? 'w-12 h-12 opacity-60' : 'w-8 h-8 opacity-40'
        }`}
        animate={{
          scale: isPointer ? 1.2 : 1,
        }}
      />
    </motion.div>
  )
}

/**
 * Simple Cursor Follower (Lightweight alternative)
 */
export function SimpleCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const hasHover = window.matchMedia('(hover: hover)').matches
    if (!hasHover) return

    const updateCursor = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', updateCursor)
    document.body.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', updateCursor)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className="fixed w-2 h-2 bg-blue-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.1s ease',
      }}
    />
  )
}
