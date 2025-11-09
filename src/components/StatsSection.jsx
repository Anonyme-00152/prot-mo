import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'
import { Briefcase, Code, Users, Award } from 'lucide-react'

/**
 * Animated Counter Component
 */
function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0)
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.5 })

  useEffect(() => {
    if (!hasIntersected) return

    let startTime = null
    const startValue = 0

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * (end - startValue) + startValue))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [hasIntersected, end, duration])

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}

/**
 * Stats Section Component
 * Showcases key metrics and achievements
 */
export function StatsSection({ t }) {
  const stats = [
    {
      icon: Briefcase,
      value: 9,
      suffix: '+',
      label: t?.stats?.yearsExperience || 'Years Experience',
      description: t?.stats?.yearsDesc || 'In DevOps & Development'
    },
    {
      icon: Code,
      value: 50,
      suffix: '+',
      label: t?.stats?.projects || 'Projects Completed',
      description: t?.stats?.projectsDesc || 'Successful Deliveries'
    },
    {
      icon: Users,
      value: 30,
      suffix: '+',
      label: t?.stats?.clients || 'Happy Clients',
      description: t?.stats?.clientsDesc || 'Satisfied Customers'
    },
    {
      icon: Award,
      value: 4,
      suffix: '+',
      label: t?.stats?.certifications || 'Certifications',
      description: t?.stats?.certificationsDesc || 'Professional Credentials'
    }
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            {t?.stats?.title || 'By The Numbers'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {t?.stats?.subtitle || 'A glimpse into my professional journey and achievements'}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg text-center hover:shadow-lg transition-shadow group"
              >
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-900 dark:group-hover:bg-white transition-colors">
                  <Icon className="text-gray-900 dark:text-white group-hover:text-white dark:group-hover:text-black transition-colors" size={24} />
                </div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  <AnimatedCounter
                    end={stat.value}
                    suffix={stat.suffix}
                    duration={2000}
                  />
                </div>
                <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-500">
                  {stat.description}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
