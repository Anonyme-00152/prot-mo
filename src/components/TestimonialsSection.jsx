import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { AnimateOnScroll } from '@/hooks/use-intersection-observer'

/**
 * Testimonials Section Component
 * Research shows portfolios with testimonials convert 60% better
 */
export function TestimonialsSection({ t }) {
  // Sample testimonials - replace with real client feedback
  const testimonials = t?.testimonials?.list || [
    {
      name: 'Jean Dupont',
      role: 'CEO, TechStartup',
      company: 'Paris, France',
      text: 'Mikail transformed our infrastructure with his DevOps expertise. Our deployment time decreased by 70% and system stability improved dramatically.',
      rating: 5,
      image: null
    },
    {
      name: 'Sarah Martin',
      role: 'CTO, DigitalCorp',
      company: 'Strasbourg, France',
      text: 'Working with Mikail was a game-changer. His full-stack development skills and problem-solving approach delivered exactly what we needed.',
      rating: 5,
      image: null
    },
    {
      name: 'Ahmet Yılmaz',
      role: 'Product Manager',
      company: 'Istanbul, Turkey',
      text: 'Professional, reliable, and innovative. Mikail brought cutting-edge AI solutions to our platform that exceeded our expectations.',
      rating: 5,
      image: null
    }
  ]

  return (
    <section className="py-20 bg-white dark:bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            {t?.testimonials?.title || 'Client Testimonials'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {t?.testimonials?.subtitle || 'What clients say about working with me'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <AnimateOnScroll
              key={index}
              animation="fade-up"
              delay={index * 100}
              threshold={0.2}
            >
              <div className="p-6 bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-xl transition-shadow h-full flex flex-col">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="text-gray-400 dark:text-gray-600" size={32} />
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center">
                      <span className="text-white dark:text-black font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t?.testimonials?.cta || 'Want to share your experience?'}
          </p>
          <a
            href="https://www.linkedin.com/in/mikail-lekesiz/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Write a Recommendation on LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  )
}
