import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Star, GitFork, ChevronRight, ExternalLink, X, Code, TrendingUp, Github
} from 'lucide-react'
import { useTheme } from 'next-themes'

// Utiliser la même logique de l'API GitHub que dans GitHubActivity
const GITHUB_USERNAME = 'Anonyme-00152'
const GITHUB_API = 'https://api.github.com'
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Fonction utilitaire pour formater la date (copiée de GitHubActivity.jsx)
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 30) return `${diffDays}d ago`
  return date.toLocaleDateString()
}

// Fonction utilitaire pour obtenir la couleur du langage (copiée de GitHubActivity.jsx)
const getLanguageColor = (language) => {
  const colors = {
    JavaScript: 'bg-yellow-400',
    TypeScript: 'bg-blue-400',
    Python: 'bg-blue-600',
    Java: 'bg-red-500',
    Go: 'bg-cyan-400',
    Rust: 'bg-orange-500',
    PHP: 'bg-cyan-400',
    Ruby: 'bg-red-600',
    C: 'bg-gray-600',
    'C++': 'bg-cyan-500',
    HTML: 'bg-orange-600',
    CSS: 'bg-blue-500',
    Shell: 'bg-green-500',
    Dockerfile: 'bg-blue-700',
  }
  return colors[language] || 'bg-gray-400'
}

// Composant pour afficher une carte de projet
const ProjectCard = ({ project }) => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Simuler les technologies pour l'affichage (à améliorer si l'API GitHub ne les fournit pas directement)
  const technologies = project.topics && project.topics.length > 0 
    ? project.topics.slice(0, 4) 
    : (project.language ? [project.language] : ['Unknown'])

  return (
    <motion.a
      href={project.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group relative p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-gray-400 dark:hover:border-gray-600 cursor-pointer transition-all shadow-md hover:shadow-lg"
    >
      {/* Featured Tag - à implémenter si l'utilisateur veut marquer des projets */}
      {/* {project.featured && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs font-bold rounded-full">
          ⭐ Featured
        </div>
      )} */}

      <div className="space-y-4">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.name}
        </h3>

        {/* Client & Industry */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-400">
            GitHub Repository
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {project.language || 'Unknown'} • {formatDate(project.updated_at)}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Stars */}
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Star size={14} className="text-yellow-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                Stars
              </span>
            </div>
            <div className="text-lg font-bold text-yellow-500">
              {project.stargazers_count}
            </div>
          </div>
          {/* Forks */}
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <GitFork size={14} className="text-blue-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                Forks
              </span>
            </div>
            <div className="text-lg font-bold text-blue-500">
              {project.forks_count}
            </div>
          </div>
        </div>

        {/* Activity */}
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp size={14} className="text-green-500" />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              Activity
            </span>
          </div>
          <div className="text-lg font-bold text-green-500">
            Recent
          </div>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs font-medium rounded-2xl"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-3 transition-all">
          <span>View on GitHub</span>
          <ExternalLink size={16} />
        </div>
      </div>
    </motion.a>
  )
}

export function GitHubProjectsDisplay({ t }) {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all') // 'all', 'featured'

  const fetchGitHubRepos = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Check cache (simplifié pour cet exemple, idéalement on utiliserait la même logique que GitHubActivity)
      const cached = localStorage.getItem('github_repos_cache')
      if (cached) {
        const { data, timestamp } = JSON.parse(cached)
        if (Date.now() - timestamp < CACHE_DURATION) {
          setRepos(data)
          setLoading(false)
          return
        }
      }

      // Fetch repos
      const reposRes = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`)
      
      if (!reposRes.ok) {
        throw new Error(`GitHub API error: ${reposRes.statusText}`)
      }

      let reposData = await reposRes.json()

      // Fetch topics for each repo (requires separate calls, which can be slow, so we'll skip for now or use a proxy)
      // For simplicity, we'll use the language as the main tech tag for now.
      
      // Filter out forks and private repos if needed, but we'll keep all for now
      reposData = reposData.filter(repo => !repo.fork)

      // Sort by last updated date
      reposData.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))

      setRepos(reposData)
      
      // Cache the data
      localStorage.setItem('github_repos_cache', JSON.stringify({
        data: reposData,
        timestamp: Date.now(),
      }))

      setLoading(false)
    } catch (err) {
      console.error('GitHub API Error:', err)
      setError(err.message)
      setLoading(false)
      // Fallback to empty array on error
      setRepos([])
    }
  }, [])

  useEffect(() => {
    fetchGitHubRepos()
  }, [fetchGitHubRepos])

  const filteredRepos = filter === 'featured'
    ? repos.filter(repo => repo.name.includes('featured')) // Simple featured logic for now
    : repos

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto" />
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading GitHub projects...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8 text-center text-red-500">
        <p>Error loading GitHub projects: {error}</p>
        <p>Please check the console for more details.</p>
      </div>
    )
  }

  const featuredCount = repos.filter(repo => repo.name.includes('featured')).length

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
          {t?.nav?.projects || 'Projects'}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-3xl mx-auto">
          {t?.caseStudies?.subtitle || 'Real projects, real impact. See how I\'ve helped companies transform their technology and achieve their goals.'}
        </p>
      </motion.div>

      {/* Filter */}
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-6 py-2 rounded-3xl font-medium transition-colors ${
            filter === 'all'
              ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          All Projects ({repos.length})
        </button>
        <button
          onClick={() => setFilter('featured')}
          className={`px-6 py-2 rounded-3xl font-medium transition-colors ${
            filter === 'featured'
              ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Featured ({featuredCount})
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredRepos.map((repo, index) => (
          <ProjectCard key={repo.id} project={repo} />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center p-8 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-3xl"
      >
        <h3 className="text-2xl font-bold mb-4">
          Want similar results for your project?
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Let's discuss how I can help transform your technology infrastructure and achieve your business goals.
        </p>
        <a
          href="https://github.com/Anonyme-00152"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-3xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium"
        >
          <span>View All Projects on GitHub</span>
          <ExternalLink size={20} />
        </a>
      </motion.div>
    </div>
  )
}
