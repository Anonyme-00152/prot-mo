import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Award, TrendingUp, Users, Zap, DollarSign, Clock, CheckCircle2,
  ChevronRight, ExternalLink, X
} from 'lucide-react'

/**
 * Case Studies / Success Stories Component
 * Showcases real projects with metrics and impact
 */

const caseStudies = [
  {
    id: 1,
    title: 'Enterprise Cloud Migration',
    client: 'Fortune 500 Financial Services Company',
    industry: 'Finance & Banking',
    duration: '8 months',
    team: '12 engineers',
    role: 'Lead DevOps Architect',
    challenge: 'Legacy monolithic architecture causing scalability issues, high infrastructure costs, and slow deployment cycles. System outages affecting 2M+ customers.',
    solution: [
      'Designed and implemented microservices architecture',
      'Migrated 50+ services to Kubernetes on AWS EKS',
      'Implemented automated CI/CD pipelines with GitLab CI',
      'Set up comprehensive monitoring with Prometheus & Grafana',
      'Zero-downtime migration strategy with gradual rollout',
    ],
    technologies: ['Kubernetes', 'AWS', 'Docker', 'Terraform', 'GitLab CI', 'Prometheus', 'Grafana'],
    metrics: [
      { label: 'Cost Reduction', value: '40%', icon: DollarSign, color: 'text-green-600' },
      { label: 'Deployment Speed', value: '10x', icon: Zap, color: 'text-yellow-600' },
      { label: 'System Uptime', value: '99.99%', icon: TrendingUp, color: 'text-blue-600' },
      { label: 'Team Efficiency', value: '+65%', icon: Users, color: 'text-purple-600' },
    ],
    testimonial: {
      text: 'Mikail\'s expertise in cloud architecture transformed our infrastructure. The migration was seamless, and we\'ve seen tremendous improvements in performance and cost savings.',
      author: 'CTO, Financial Services',
    },
    featured: true,
  },
  {
    id: 2,
    title: 'E-commerce Platform Scaling',
    client: 'Leading European Retail Chain',
    industry: 'Retail & E-commerce',
    duration: '6 months',
    team: '8 developers',
    role: 'Full Stack Lead & DevOps Engineer',
    challenge: 'Website crashing during peak traffic (Black Friday), poor mobile experience, slow checkout process leading to 35% cart abandonment.',
    solution: [
      'Rebuilt frontend with React for better performance',
      'Implemented Node.js microservices for scalability',
      'Set up auto-scaling infrastructure on Azure',
      'Optimized database queries and added Redis caching',
      'Implemented progressive web app (PWA) features',
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Redis', 'Azure', 'Docker', 'Nginx'],
    metrics: [
      { label: 'Traffic Handled', value: '500K', icon: Users, color: 'text-green-600' },
      { label: 'Page Load Time', value: '-70%', icon: Zap, color: 'text-yellow-600' },
      { label: 'Conversion Rate', value: '+45%', icon: TrendingUp, color: 'text-blue-600' },
      { label: 'Revenue Impact', value: '+€2.5M', icon: DollarSign, color: 'text-green-600' },
    ],
    testimonial: {
      text: 'The platform now handles Black Friday traffic effortlessly. Our conversion rates have never been better. Mikail delivered beyond expectations.',
      author: 'Head of Digital, Retail Chain',
    },
    featured: true,
  },
  {
    id: 3,
    title: 'AI-Powered Analytics Dashboard',
    client: 'Healthcare SaaS Startup',
    industry: 'Healthcare Technology',
    duration: '4 months',
    team: '5 developers',
    role: 'Full Stack Developer & AI Integration Specialist',
    challenge: 'Manual data analysis taking hours, lack of real-time insights, difficulty identifying patient trends and health risks.',
    solution: [
      'Built real-time analytics dashboard with React & D3.js',
      'Integrated machine learning models for predictive analytics',
      'Implemented Python backend with FastAPI',
      'Created automated reporting system',
      'Real-time data streaming with WebSockets',
    ],
    technologies: ['React', 'Python', 'FastAPI', 'TensorFlow', 'PostgreSQL', 'WebSockets', 'D3.js'],
    metrics: [
      { label: 'Analysis Time', value: '-95%', icon: Clock, color: 'text-green-600' },
      { label: 'Prediction Accuracy', value: '94%', icon: Award, color: 'text-purple-600' },
      { label: 'User Adoption', value: '100%', icon: Users, color: 'text-blue-600' },
      { label: 'Early Detection', value: '+80%', icon: TrendingUp, color: 'text-green-600' },
    ],
    testimonial: {
      text: 'This dashboard has transformed how we analyze patient data. The AI predictions are incredibly accurate and have helped us provide better care.',
      author: 'CEO, Healthcare SaaS',
    },
    featured: false,
  },
  {
    id: 4,
    title: 'DevOps Pipeline Automation',
    client: 'Tech Startup Portfolio (10 companies)',
    industry: 'Technology',
    duration: '12 months',
    team: '3 DevOps engineers',
    role: 'Senior DevOps Consultant',
    challenge: 'Manual deployments causing errors, inconsistent environments, no proper testing, taking 2-3 days per release.',
    solution: [
      'Implemented end-to-end CI/CD with Jenkins & ArgoCD',
      'Containerized all applications with Docker',
      'Set up Kubernetes clusters for each client',
      'Automated testing and quality gates',
      'Infrastructure as Code with Terraform',
    ],
    technologies: ['Jenkins', 'ArgoCD', 'Kubernetes', 'Docker', 'Terraform', 'Ansible', 'SonarQube'],
    metrics: [
      { label: 'Deployment Time', value: '-80%', icon: Clock, color: 'text-green-600' },
      { label: 'Error Rate', value: '-90%', icon: CheckCircle2, color: 'text-green-600' },
      { label: 'Projects Automated', value: '30+', icon: Award, color: 'text-purple-600' },
      { label: 'Time Saved/Month', value: '120h', icon: Clock, color: 'text-blue-600' },
    ],
    testimonial: {
      text: 'Mikail automated our entire deployment process. What used to take days now takes minutes. Game changer for our startup.',
      author: 'Founder, Tech Startup',
    },
    featured: false,
  },
]

export function CaseStudies({ t }) {
  const [selectedCase, setSelectedCase] = useState(null)
  const [filter, setFilter] = useState('all') // 'all', 'featured'

  const filteredCases = filter === 'featured'
    ? caseStudies.filter(c => c.featured)
    : caseStudies

  return (
    <div className="w-full max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl md:text-5xl font-bold">
          {t?.caseStudies?.title || 'Success Stories'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
          {t?.caseStudies?.subtitle || 'Real projects, real impact. See how I\'ve helped companies transform their technology and achieve their goals.'}
        </p>
      </motion.div>

      {/* Filter */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all'
              ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          All Projects ({caseStudies.length})
        </button>
        <button
          onClick={() => setFilter('featured')}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            filter === 'featured'
              ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Featured ({caseStudies.filter(c => c.featured).length})
        </button>
      </div>

      {/* Case Studies Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredCases.map((study, index) => (
          <motion.div
            key={study.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedCase(study)}
            className="group relative p-6 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 rounded-xl hover:border-gray-400 dark:hover:border-gray-600 cursor-pointer transition-all hover:shadow-xl"
          >
            {study.featured && (
              <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs font-bold rounded-full">
                ⭐ Featured
              </div>
            )}

            <div className="space-y-4">
              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {study.title}
              </h3>

              {/* Client & Industry */}
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {study.client}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {study.industry} • {study.duration}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                {study.metrics.slice(0, 4).map((metric) => (
                  <div
                    key={metric.label}
                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <metric.icon size={14} className={metric.color} />
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {metric.label}
                      </span>
                    </div>
                    <div className={`text-xl font-bold ${metric.color}`}>
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {study.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs font-medium rounded"
                  >
                    {tech}
                  </span>
                ))}
                {study.technologies.length > 4 && (
                  <span className="px-2 py-1 text-xs text-gray-600 dark:text-gray-400">
                    +{study.technologies.length - 4} more
                  </span>
                )}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all">
                <span>Read full case study</span>
                <ChevronRight size={16} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCase(null)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCase(null)}
                className="sticky top-4 right-4 float-right p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="p-8 space-y-8">
                {/* Header */}
                <div>
                  {selectedCase.featured && (
                    <div className="inline-block px-3 py-1 mb-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs font-bold rounded-full">
                      ⭐ Featured Case Study
                    </div>
                  )}
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {selectedCase.title}
                  </h2>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div><strong>Client:</strong> {selectedCase.client}</div>
                    <div><strong>Industry:</strong> {selectedCase.industry}</div>
                    <div><strong>Duration:</strong> {selectedCase.duration}</div>
                    <div><strong>Team:</strong> {selectedCase.team}</div>
                    <div><strong>Role:</strong> {selectedCase.role}</div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedCase.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center"
                    >
                      <metric.icon size={24} className={`${metric.color} mx-auto mb-2`} />
                      <div className={`text-2xl font-bold ${metric.color} mb-1`}>
                        {metric.value}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Challenge */}
                <div>
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Award size={20} />
                    The Challenge
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedCase.challenge}
                  </p>
                </div>

                {/* Solution */}
                <div>
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <CheckCircle2 size={20} />
                    The Solution
                  </h3>
                  <ul className="space-y-2">
                    {selectedCase.solution.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                        <CheckCircle2 size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h3 className="text-xl font-bold mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCase.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-sm font-medium rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 rounded-r-lg">
                  <p className="text-gray-900 dark:text-white italic mb-3">
                    "{selectedCase.testimonial.text}"
                  </p>
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    — {selectedCase.testimonial.author}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl"
      >
        <h3 className="text-2xl font-bold mb-4">
          Want similar results for your project?
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Let's discuss how I can help transform your technology infrastructure and achieve your business goals.
        </p>
        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium"
        >
          <span>Let's Work Together</span>
          <ChevronRight size={20} />
        </button>
      </motion.div>
    </div>
  )
}
