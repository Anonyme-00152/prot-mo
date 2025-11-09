import { motion } from 'framer-motion'
import {
  Briefcase, GraduationCap, Award, Rocket, Code, Users,
  TrendingUp, MapPin, Calendar
} from 'lucide-react'

/**
 * Interactive Timeline Component
 * Shows professional journey with key milestones
 */

const timelineEvents = [
  {
    id: 1,
    year: '2024-Present',
    title: 'CEO & Founder',
    organization: 'Netz Informatique',
    location: 'Haguenau, France',
    type: 'career',
    icon: Rocket,
    description: 'Leading digital transformation projects and IT & AI solutions consulting for enterprise clients.',
    highlights: [
      'Managing 30+ client projects simultaneously',
      'Team of 12+ technical professionals',
      '€2M+ in annual revenue',
      'Specialized in cloud migration and DevOps',
    ],
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 2,
    year: '2023',
    title: 'AWS Certified Solutions Architect',
    organization: 'Amazon Web Services',
    type: 'certification',
    icon: Award,
    description: 'Achieved AWS Professional certification, demonstrating expertise in cloud architecture and best practices.',
    highlights: [
      'Professional level certification',
      'Advanced cloud architecture patterns',
      'Cost optimization strategies',
      'Security and compliance',
    ],
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 3,
    year: '2020-2024',
    title: 'Senior DevOps Engineer',
    organization: 'Various Tech Companies',
    location: 'Remote & France',
    type: 'career',
    icon: Code,
    description: 'Led DevOps transformations for multiple organizations, implementing modern CI/CD practices and cloud infrastructure.',
    highlights: [
      'Migrated 50+ applications to Kubernetes',
      'Reduced deployment time by 80%',
      'Implemented infrastructure as code',
      'Mentored 20+ junior engineers',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 4,
    year: '2022',
    title: 'Certified Kubernetes Administrator',
    organization: 'Cloud Native Computing Foundation',
    type: 'certification',
    icon: Award,
    description: 'Earned CKA certification, validating expertise in Kubernetes cluster administration and orchestration.',
    highlights: [
      'Hands-on cluster management',
      'Advanced networking and security',
      'Troubleshooting and optimization',
      'Production-ready deployments',
    ],
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 5,
    year: '2018-2020',
    title: 'Full Stack Developer',
    organization: 'Digital Agency',
    location: 'Strasbourg, France',
    type: 'career',
    icon: Code,
    description: 'Developed complex web applications using modern JavaScript frameworks and cloud technologies.',
    highlights: [
      'Built 30+ production applications',
      'React, Vue.js, Node.js specialist',
      'Implemented real-time features',
      'Led frontend architecture decisions',
    ],
    color: 'from-indigo-500 to-blue-500',
  },
  {
    id: 6,
    year: '2017',
    title: 'Master\'s in Computer Science',
    organization: 'University of Strasbourg',
    location: 'Strasbourg, France',
    type: 'education',
    icon: GraduationCap,
    description: 'Graduated with honors, specializing in distributed systems and cloud computing.',
    highlights: [
      'GPA: 3.8/4.0',
      'Thesis on microservices architecture',
      'Research in cloud optimization',
      'Teaching assistant for 2 years',
    ],
    color: 'from-red-500 to-pink-500',
  },
  {
    id: 7,
    year: '2015-2018',
    title: 'Junior Developer & IT Consultant',
    organization: 'Freelance',
    location: 'France',
    type: 'career',
    icon: Briefcase,
    description: 'Started professional journey building websites and providing IT consulting for small businesses.',
    highlights: [
      'First 50+ satisfied clients',
      'WordPress, PHP, JavaScript',
      'Built personal network',
      'Learned business fundamentals',
    ],
    color: 'from-gray-500 to-slate-500',
  },
]

const getIconForType = (type) => {
  switch (type) {
    case 'career': return Briefcase
    case 'education': return GraduationCap
    case 'certification': return Award
    default: return Code
  }
}

export function Timeline({ t }) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl md:text-5xl font-bold">
          {t?.timeline?.title || 'My Journey'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          {t?.timeline?.subtitle || 'From code to cloud, here\'s how I built my expertise and grew as a technology leader.'}
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800" />

        {/* Events */}
        <div className="space-y-12">
          {timelineEvents.map((event, index) => {
            const isLeft = index % 2 === 0
            const Icon = event.icon

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:gap-8`}
              >
                {/* Content */}
                <div className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? 'md:text-right' : 'md:text-left'} mb-8 md:mb-0`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`p-6 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-xl hover:border-gray-400 dark:hover:border-gray-600 transition-all hover:shadow-xl`}
                  >
                    {/* Year Badge */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r ${event.color} text-white rounded-full text-sm font-bold mb-3`}>
                      <Calendar size={14} />
                      <span>{event.year}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {event.title}
                    </h3>

                    {/* Organization */}
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-1 justify-start md:justify-end" style={{ flexDirection: isLeft ? 'row-reverse' : 'row' }}>
                      <span className="font-semibold">{event.organization}</span>
                    </div>

                    {/* Location */}
                    {event.location && (
                      <div className={`flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mb-3 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                        <MapPin size={14} />
                        <span>{event.location}</span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {event.description}
                    </p>

                    {/* Highlights */}
                    <ul className={`space-y-2 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                      {event.highlights.map((highlight, i) => (
                        <li key={i} className={`flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                          <TrendingUp size={14} className={`mt-0.5 flex-shrink-0 text-green-600`} />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Icon (Center) */}
                <div className="absolute left-8 md:left-1/2 top-6 md:transform md:-translate-x-1/2 z-10">
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${event.color} flex items-center justify-center shadow-lg border-4 border-white dark:border-gray-900`}
                  >
                    <Icon size={28} className="text-white" />
                  </motion.div>
                </div>

                {/* Spacer */}
                <div className="hidden md:block w-[calc(50%-2rem)]" />
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl"
      >
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">9+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">50+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Projects Delivered</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">30+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Happy Clients</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">4+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Certifications</div>
        </div>
      </motion.div>
    </div>
  )
}
