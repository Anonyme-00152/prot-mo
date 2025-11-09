import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Cloud, Container, Code, Database, Wrench, GitBranch,
  Server, Smartphone, Globe, Lock, Zap, Cpu
} from 'lucide-react'

/**
 * Interactive Tech Stack Visualization
 * Visual representation of technical skills with proficiency levels
 */

const techStack = {
  'DevOps & Cloud': {
    icon: Cloud,
    color: 'from-blue-500 to-cyan-500',
    borderColor: 'border-blue-500',
    skills: [
      { name: 'Docker', level: 95, category: 'Containers' },
      { name: 'Kubernetes', level: 90, category: 'Orchestration' },
      { name: 'AWS', level: 88, category: 'Cloud' },
      { name: 'Azure', level: 85, category: 'Cloud' },
      { name: 'Google Cloud', level: 82, category: 'Cloud' },
      { name: 'Terraform', level: 90, category: 'IaC' },
      { name: 'Ansible', level: 85, category: 'Config Mgmt' },
      { name: 'Jenkins', level: 88, category: 'CI/CD' },
      { name: 'GitLab CI', level: 92, category: 'CI/CD' },
      { name: 'GitHub Actions', level: 90, category: 'CI/CD' },
    ],
  },
  'Frontend Development': {
    icon: Smartphone,
    color: 'from-purple-500 to-pink-500',
    borderColor: 'border-purple-500',
    skills: [
      { name: 'React', level: 95, category: 'Framework' },
      { name: 'Vue.js', level: 85, category: 'Framework' },
      { name: 'Next.js', level: 88, category: 'Framework' },
      { name: 'TypeScript', level: 92, category: 'Language' },
      { name: 'JavaScript', level: 98, category: 'Language' },
      { name: 'Tailwind CSS', level: 95, category: 'Styling' },
      { name: 'HTML5/CSS3', level: 98, category: 'Markup' },
      { name: 'Framer Motion', level: 85, category: 'Animation' },
    ],
  },
  'Backend Development': {
    icon: Server,
    color: 'from-green-500 to-emerald-500',
    borderColor: 'border-green-500',
    skills: [
      { name: 'Node.js', level: 95, category: 'Runtime' },
      { name: 'Express', level: 92, category: 'Framework' },
      { name: 'NestJS', level: 85, category: 'Framework' },
      { name: 'Python', level: 88, category: 'Language' },
      { name: 'Django', level: 82, category: 'Framework' },
      { name: 'PHP', level: 85, category: 'Language' },
      { name: 'Laravel', level: 88, category: 'Framework' },
      { name: 'C#', level: 80, category: 'Language' },
      { name: 'ASP.NET', level: 78, category: 'Framework' },
    ],
  },
  'Databases': {
    icon: Database,
    color: 'from-orange-500 to-red-500',
    borderColor: 'border-orange-500',
    skills: [
      { name: 'PostgreSQL', level: 90, category: 'SQL' },
      { name: 'MySQL', level: 92, category: 'SQL' },
      { name: 'MongoDB', level: 88, category: 'NoSQL' },
      { name: 'Redis', level: 85, category: 'Cache' },
      { name: 'Elasticsearch', level: 82, category: 'Search' },
      { name: 'SQL Server', level: 85, category: 'SQL' },
      { name: 'Oracle', level: 75, category: 'SQL' },
    ],
  },
  'Monitoring & Observability': {
    icon: Zap,
    color: 'from-yellow-500 to-amber-500',
    borderColor: 'border-yellow-500',
    skills: [
      { name: 'Prometheus', level: 88, category: 'Metrics' },
      { name: 'Grafana', level: 90, category: 'Visualization' },
      { name: 'ELK Stack', level: 85, category: 'Logging' },
      { name: 'Datadog', level: 80, category: 'APM' },
      { name: 'New Relic', level: 78, category: 'APM' },
      { name: 'Sentry', level: 85, category: 'Error Tracking' },
    ],
  },
  'Tools & Workflow': {
    icon: Wrench,
    color: 'from-gray-500 to-slate-500',
    borderColor: 'border-gray-500',
    skills: [
      { name: 'Git', level: 98, category: 'Version Control' },
      { name: 'GitHub', level: 95, category: 'Platform' },
      { name: 'GitLab', level: 92, category: 'Platform' },
      { name: 'Jira', level: 90, category: 'Project Mgmt' },
      { name: 'Confluence', level: 85, category: 'Documentation' },
      { name: 'VS Code', level: 98, category: 'IDE' },
      { name: 'Figma', level: 82, category: 'Design' },
    ],
  },
}

export function TechStackVisualization({ t }) {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'

  const getProficiencyLabel = (level) => {
    if (level >= 90) return 'Expert'
    if (level >= 75) return 'Advanced'
    if (level >= 60) return 'Intermediate'
    return 'Familiar'
  }

  const getProficiencyColor = (level) => {
    if (level >= 90) return 'text-green-600 dark:text-green-400'
    if (level >= 75) return 'text-blue-600 dark:text-blue-400'
    if (level >= 60) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-gray-600 dark:text-gray-400'
  }

  const filteredStack = selectedCategory
    ? { [selectedCategory]: techStack[selectedCategory] }
    : techStack

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl font-bold">
          {t?.techStack?.title || 'Technical Expertise'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t?.techStack?.subtitle || 'Comprehensive overview of my technical skills and proficiency levels across different domains'}
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-2"
      >
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            !selectedCategory
              ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          All Categories
        </button>
        {Object.keys(techStack).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {/* View Mode Toggle */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setViewMode('grid')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            viewMode === 'grid'
              ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          Grid View
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            viewMode === 'list'
              ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        >
          List View
        </button>
      </div>

      {/* Tech Stack Display */}
      <div className="space-y-12">
        {Object.entries(filteredStack).map(([category, data], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${data.color}`}>
                <data.icon size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{category}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {data.skills.length} technologies
                </p>
              </div>
            </div>

            {/* Skills Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className={`p-4 bg-white dark:bg-gray-900 border-2 ${data.borderColor} rounded-lg hover:shadow-lg transition-all cursor-pointer`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {skill.name}
                        </h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {skill.category}
                        </span>
                      </div>
                      <span className={`text-xs font-bold ${getProficiencyColor(skill.level)}`}>
                        {getProficiencyLabel(skill.level)}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600 dark:text-gray-400">Proficiency</span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.05 }}
                          className={`h-full bg-gradient-to-r ${data.color}`}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {data.skills
                  .sort((a, b) => b.level - a.level)
                  .map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.03 }}
                      className="flex items-center gap-4 p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {skill.name}
                          </h4>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            ({skill.category})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold ${getProficiencyColor(skill.level)} min-w-[80px] text-right`}>
                          {getProficiencyLabel(skill.level)}
                        </span>
                        <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className={`h-full bg-gradient-to-r ${data.color}`}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white min-w-[45px] text-right">
                          {skill.level}%
                        </span>
                      </div>
                    </motion.div>
                  ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-100 dark:bg-gray-900 rounded-lg"
      >
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {Object.values(techStack).reduce((acc, cat) => acc + cat.skills.length, 0)}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Total Technologies
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {Object.keys(techStack).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Categories
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {Math.round(
              Object.values(techStack).reduce(
                (acc, cat) => acc + cat.skills.reduce((sum, skill) => sum + skill.level, 0) / cat.skills.length,
                0
              ) / Object.keys(techStack).length
            )}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Avg Proficiency
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            9+
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Years Experience
          </div>
        </div>
      </motion.div>
    </div>
  )
}
