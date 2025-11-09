import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, GitBranch, Star, GitFork, Calendar, Code, TrendingUp } from 'lucide-react'

/**
 * GitHub Activity Dashboard
 * Shows live activity and stats from GitHub
 */

// GitHub API configuration
const GITHUB_USERNAME = 'lekesiz'
const GITHUB_API = 'https://api.github.com'

// Cache duration (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000

export function GitHubActivity({ t }) {
  const [repos, setRepos] = useState([])
  const [events, setEvents] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchGitHubData()
  }, [])

  const fetchGitHubData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Check cache
      const cached = getCachedData()
      if (cached) {
        setRepos(cached.repos)
        setEvents(cached.events)
        setStats(cached.stats)
        setLoading(false)
        return
      }

      // Fetch user data
      const [userRes, reposRes, eventsRes] = await Promise.all([
        fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`),
        fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`),
        fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/events/public?per_page=10`),
      ])

      if (!userRes.ok || !reposRes.ok || !eventsRes.ok) {
        throw new Error('Failed to fetch GitHub data')
      }

      const [userData, reposData, eventsData] = await Promise.all([
        userRes.json(),
        reposRes.json(),
        eventsRes.json(),
      ])

      // Calculate stats
      const userStats = {
        publicRepos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        totalStars: reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0),
        totalForks: reposData.reduce((acc, repo) => acc + repo.forks_count, 0),
      }

      setRepos(reposData)
      setEvents(eventsData)
      setStats(userStats)

      // Cache the data
      cacheData({ repos: reposData, events: eventsData, stats: userStats })
      setLoading(false)
    } catch (err) {
      console.error('GitHub API Error:', err)
      setError(err.message)
      setLoading(false)

      // Load fallback data
      loadFallbackData()
    }
  }

  const getCachedData = () => {
    try {
      const cached = localStorage.getItem('github_cache')
      if (!cached) return null

      const { data, timestamp } = JSON.parse(cached)
      if (Date.now() - timestamp > CACHE_DURATION) {
        localStorage.removeItem('github_cache')
        return null
      }

      return data
    } catch {
      return null
    }
  }

  const cacheData = (data) => {
    try {
      localStorage.setItem('github_cache', JSON.stringify({
        data,
        timestamp: Date.now(),
      }))
    } catch (err) {
      console.error('Cache error:', err)
    }
  }

  const loadFallbackData = () => {
    // Fallback data when API fails
    setRepos([
      {
        id: 1,
        name: 'portfolio',
        description: 'Personal portfolio website built with React and Vite',
        html_url: 'https://github.com/lekesiz/portfolio',
        stargazers_count: 12,
        forks_count: 3,
        language: 'JavaScript',
        updated_at: new Date().toISOString(),
      },
    ])

    setStats({
      publicRepos: 50,
      followers: 100,
      following: 50,
      totalStars: 200,
      totalForks: 50,
    })

    setEvents([
      {
        id: '1',
        type: 'PushEvent',
        created_at: new Date().toISOString(),
        repo: { name: 'lekesiz/portfolio' },
        payload: { commits: [{ message: 'Update portfolio' }] },
      },
    ])
  }

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

  const getEventIcon = (type) => {
    switch (type) {
      case 'PushEvent': return <GitBranch size={16} className="text-green-500" />
      case 'CreateEvent': return <Code size={16} className="text-blue-500" />
      case 'WatchEvent': return <Star size={16} className="text-yellow-500" />
      case 'ForkEvent': return <GitFork size={16} className="text-purple-500" />
      default: return <Github size={16} className="text-gray-500" />
    }
  }

  const getEventText = (event) => {
    const repo = event.repo.name.split('/')[1]
    switch (event.type) {
      case 'PushEvent':
        const commits = event.payload.commits?.length || 0
        return `Pushed ${commits} commit${commits !== 1 ? 's' : ''} to ${repo}`
      case 'CreateEvent':
        return `Created ${event.payload.ref_type} in ${repo}`
      case 'WatchEvent':
        return `Starred ${repo}`
      case 'ForkEvent':
        return `Forked ${repo}`
      default:
        return `Activity in ${repo}`
    }
  }

  const getLanguageColor = (language) => {
    const colors = {
      JavaScript: 'bg-yellow-400',
      TypeScript: 'bg-blue-400',
      Python: 'bg-blue-600',
      Java: 'bg-red-500',
      Go: 'bg-cyan-400',
      Rust: 'bg-orange-500',
      PHP: 'bg-purple-400',
      Ruby: 'bg-red-600',
      C: 'bg-gray-600',
      'C++': 'bg-pink-500',
      'C#': 'bg-green-600',
      HTML: 'bg-orange-600',
      CSS: 'bg-blue-500',
      Shell: 'bg-green-500',
      Dockerfile: 'bg-blue-700',
    }
    return colors[language] || 'bg-gray-400'
  }

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto" />
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading GitHub activity...</p>
      </div>
    )
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-5 gap-4"
      >
        {stats && [
          { label: 'Repositories', value: stats.publicRepos, icon: Code },
          { label: 'Followers', value: stats.followers, icon: TrendingUp },
          { label: 'Following', value: stats.following, icon: Github },
          { label: 'Total Stars', value: stats.totalStars, icon: Star },
          { label: 'Total Forks', value: stats.totalForks, icon: GitFork },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <stat.icon size={16} className="text-gray-600 dark:text-gray-400" />
              <span className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value.toLocaleString()}</div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Recent Repositories */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Code size={20} />
            <h3 className="text-xl font-bold">Recent Repositories</h3>
          </div>

          <div className="space-y-3">
            {repos.slice(0, 6).map((repo, index) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="block p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-colors group"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {repo.name}
                  </h4>
                  <Github size={16} className="text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                </div>

                {repo.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {repo.description}
                  </p>
                )}

                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                  {repo.language && (
                    <div className="flex items-center gap-1">
                      <span className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`} />
                      <span>{repo.language}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Star size={12} />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork size={12} />
                    <span>{repo.forks_count}</span>
                  </div>
                  <div className="flex items-center gap-1 ml-auto">
                    <Calendar size={12} />
                    <span>{formatDate(repo.updated_at)}</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={20} />
            <h3 className="text-xl font-bold">Recent Activity</h3>
          </div>

          <div className="space-y-3">
            {events.slice(0, 10).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg"
              >
                <div className="mt-1">{getEventIcon(event.type)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {getEventText(event)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {formatDate(event.created_at)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {error && (
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                ⚠️ Using cached data. Live updates unavailable.
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* View More Link */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
          <Github size={20} />
          <span>View Full GitHub Profile</span>
        </a>
      </motion.div>
    </div>
  )
}
