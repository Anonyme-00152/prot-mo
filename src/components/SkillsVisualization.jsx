import { motion } from 'framer-motion'
import { AnimateOnScroll } from '@/hooks/use-intersection-observer'

/**
 * Interactive Skills Visualization
 * Modern 2025 approach with hover effects and animations
 */
export function SkillsVisualization({ skills, t }) {
  const categories = Object.entries(skills)

  // Color schemes for different categories
  const colorSchemes = {
    languages: 'hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-500 dark:hover:border-blue-500',
    frontend: 'hover:bg-purple-50 dark:hover:bg-purple-950 hover:border-purple-500 dark:hover:border-purple-500',
    backend: 'hover:bg-green-50 dark:hover:bg-green-950 hover:border-green-500 dark:hover:border-green-500',
    databases: 'hover:bg-yellow-50 dark:hover:bg-yellow-950 hover:border-yellow-500 dark:hover:border-yellow-500',
    devops: 'hover:bg-red-50 dark:hover:bg-red-950 hover:border-red-500 dark:hover:border-red-500',
    tools: 'hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:border-indigo-500 dark:hover:border-indigo-500',
  }

  // Category icons/emojis
  const categoryIcons = {
    languages: '💻',
    frontend: '🎨',
    backend: '⚙️',
    databases: '🗄️',
    devops: '🚀',
    tools: '🛠️',
  }

  // Translate category names
  const categoryNames = {
    languages: t?.skills?.languages || 'Languages',
    frontend: t?.skills?.frontend || 'Frontend',
    backend: t?.skills?.backend || 'Backend',
    databases: t?.skills?.databases || 'Databases',
    devops: t?.skills?.devops || 'DevOps',
    tools: t?.skills?.tools || 'Tools',
  }

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          {t?.skills?.title || 'Technical Skills'}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-gray-600 dark:text-gray-400 text-lg mb-12 max-w-2xl mx-auto"
        >
          {t?.skills?.subtitle || 'Technologies and tools I work with to build exceptional digital experiences'}
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(([category, items], catIndex) => (
            <AnimateOnScroll
              key={category}
              animation="fade-up"
              delay={catIndex * 100}
              threshold={0.2}
            >
              <div className="space-y-4 group">
                {/* Category Header */}
                <div className="flex items-center gap-3">
                  <motion.span
                    className="text-3xl"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {categoryIcons[category]}
                  </motion.span>
                  <h3 className="text-xl font-bold capitalize">
                    {categoryNames[category]}
                  </h3>
                  <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800 group-hover:bg-gray-400 dark:group-hover:bg-gray-600 transition-colors"></div>
                </div>

                {/* Skills Grid */}
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIndex * 0.1 + index * 0.05 }}
                      whileHover={{
                        scale: 1.05,
                        y: -5,
                        transition: { type: 'spring', stiffness: 400 }
                      }}
                      className={`
                        px-3 py-1.5
                        bg-white dark:bg-black
                        border border-gray-200 dark:border-gray-800
                        rounded-full text-sm font-medium
                        transition-all duration-200
                        cursor-pointer
                        ${colorSchemes[category]}
                      `}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Skill Level Indicator (Optional) */}
        <AnimateOnScroll animation="fade" delay={600}>
          <div className="mt-12 p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">Pro Tip:</span>
              <span>Hover over skills to see category highlights • Total: {categories.reduce((acc, [, items]) => acc + items.length, 0)} technologies</span>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
