import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal as TerminalIcon, ChevronRight } from 'lucide-react'

/**
 * Interactive Terminal Component
 * DevOps-themed command-line interface for portfolio
 */

// Available commands and their responses
const getCommands = (t, language) => ({
  help: {
    description: t?.terminal?.help?.description || 'Show available commands',
    response: [
      'Available commands:',
      '',
      '  whoami              - About me',
      '  skills              - Technical skills',
      '  experience          - Work experience',
      '  projects            - Featured projects',
      '  education           - Education & certifications',
      '  contact             - Contact information',
      '  github              - GitHub profile',
      '  linkedin            - LinkedIn profile',
      '  clear               - Clear terminal',
      '  lang [fr|en|tr]     - Change language',
      '  theme [light|dark]  - Toggle theme',
      '  help                - Show this help',
      '',
      'Type a command and press Enter.',
    ],
  },
  whoami: {
    description: t?.terminal?.whoami?.description || 'About me',
    response: [
      '╔════════════════════════════════════════════╗',
      '║  Ebubekir ARTI                            ║',
      '╚════════════════════════════════════════════╝',
      '',
      '🚀 DevOps Engineer & Full Stack Developer',
      '💼 CEO at Netz Informatique',
      '📍 Haguenau, Grand Est, France',
      '',
      '🎯 Expertise:',
      '  • Cloud Infrastructure (AWS, Azure, GCP)',
      '  • Container Orchestration (Docker, Kubernetes)',
      '  • CI/CD Pipeline Architecture',
      '  • Full Stack Development (React, Node.js)',
      '  • Digital Transformation & AI Solutions',
      '',
      '📊 Experience: 9+ years in IT',
      '🏆 Projects: 50+ successful deliveries',
      '👥 Clients: 30+ satisfied companies',
      '',
      'Type "contact" to get in touch!',
    ],
  },
  skills: {
    description: t?.terminal?.skills?.description || 'Show technical skills',
    response: [
      '💻 Technical Skills',
      '══════════════════════════════════════════',
      '',
      '🔧 DevOps & Cloud:',
      '  ▸ Docker, Kubernetes, Terraform',
      '  ▸ AWS, Azure, Google Cloud Platform',
      '  ▸ CI/CD: Jenkins, GitLab CI, GitHub Actions',
      '  ▸ Monitoring: Prometheus, Grafana, ELK Stack',
      '',
      '⚛️ Frontend:',
      '  ▸ React, Vue.js, Next.js',
      '  ▸ HTML5, CSS3, Tailwind CSS, Bootstrap',
      '  ▸ TypeScript, JavaScript ES6+',
      '',
      '⚙️ Backend:',
      '  ▸ Node.js, Express, NestJS',
      '  ▸ Python, Django, FastAPI',
      '  ▸ PHP, Laravel, Symfony',
      '  ▸ C#, ASP.NET Core',
      '',
      '🗄️ Databases:',
      '  ▸ PostgreSQL, MySQL, SQL Server',
      '  ▸ MongoDB, Redis, Elasticsearch',
      '  ▸ Oracle Database',
      '',
      '🛠️ Tools:',
      '  ▸ Git, Jira, Confluence',
      '  ▸ VS Code, Docker Desktop',
      '  ▸ Figma, Adobe XD',
      '',
      'Run "projects" to see what I\'ve built with these!',
    ],
  },
  experience: {
    description: t?.terminal?.experience?.description || 'Work experience',
    response: [
      '💼 Professional Experience',
      '══════════════════════════════════════════',
      '',
      '🏢 CEO & Founder | Netz Informatique',
      '   📅 2020 - Present',
      '   📍 Haguenau, France',
      '   • Leading digital transformation projects',
      '   • IT & AI Solutions consulting',
      '   • Team management & business development',
      '',
      '👨‍💻 DevOps Engineer | Full Stack Developer',
      '   📅 2015 - Present',
      '   • Designed and implemented CI/CD pipelines',
      '   • Cloud infrastructure architecture (AWS, Azure)',
      '   • Microservices deployment with Kubernetes',
      '   • Full-stack web application development',
      '',
      '🎓 Certifications:',
      '   • AWS Certified Solutions Architect',
      '   • Kubernetes Administrator (CKA)',
      '   • Docker Certified Associate',
      '   • Azure DevOps Engineer Expert',
      '',
      'Type "projects" to see my work!',
    ],
  },
  projects: {
    description: t?.terminal?.projects?.description || 'Featured projects',
    response: [
      '🚀 Featured Projects',
      '══════════════════════════════════════════',
      '',
      '1️⃣ Enterprise Cloud Migration',
      '   • Migrated 50+ services to Kubernetes',
      '   • Reduced infrastructure costs by 40%',
      '   • Tech: AWS EKS, Terraform, GitLab CI',
      '',
      '2️⃣ CI/CD Pipeline Automation',
      '   • Automated deployment for 30+ projects',
      '   • Reduced deployment time by 80%',
      '   • Tech: Jenkins, Docker, ArgoCD',
      '',
      '3️⃣ E-commerce Platform',
      '   • Full-stack application (React + Node.js)',
      '   • 100K+ monthly active users',
      '   • Tech: React, Express, MongoDB, Redis',
      '',
      '4️⃣ AI-Powered Analytics Dashboard',
      '   • Real-time data visualization',
      '   • Machine learning integration',
      '   • Tech: React, Python, TensorFlow',
      '',
      '5️⃣ Microservices Architecture',
      '   • 20+ microservices with API Gateway',
      '   • Service mesh implementation',
      '   • Tech: Node.js, Kubernetes, Istio',
      '',
      'Want to collaborate? Type "contact"!',
    ],
  },
  education: {
    description: t?.terminal?.education?.description || 'Education & certifications',
    response: [
      '🎓 Education & Certifications',
      '══════════════════════════════════════════',
      '',
      '🏛️ Education:',
      '   • Master\'s in Computer Science',
      '   • Bachelor\'s in Software Engineering',
      '',
      '🏆 Professional Certifications:',
      '   ✓ AWS Certified Solutions Architect - Professional',
      '   ✓ Certified Kubernetes Administrator (CKA)',
      '   ✓ Docker Certified Associate (DCA)',
      '   ✓ Microsoft Azure DevOps Engineer Expert',
      '   ✓ Google Cloud Professional Cloud Architect',
      '   ✓ HashiCorp Certified: Terraform Associate',
      '',
      '📚 Continuous Learning:',
      '   • DevOps best practices & methodologies',
      '   • Cloud-native architecture patterns',
      '   • AI/ML integration in DevOps',
      '   • Security & compliance automation',
      '',
      'Always learning, always growing! 🚀',
    ],
  },
  contact: {
    description: t?.terminal?.contact?.description || 'Contact information',
    response: [
      '📧 Contact Information',
      '══════════════════════════════════════════',
      '',
      '📧 Email:    ebubekirarti@icloud.com',
      '📱 Phone:    +33 6 63 90 75 27',
      '📍 Location: Haguenau, Grand Est, France',
      '',
      '🔗 Connect:',
      '   GitHub:   github.com/Anonyme-00152',
      '   LinkedIn: linkedin.com/in/ebubekir-arti',
      '   Twitter:  @ebubekir_arti',
      '',
      '💼 Company:',
      '   Netz Informatique',
      '   Website: netzinformatique.fr',
      '',
      '💬 Let\'s build something amazing together!',
      '',
      'Scroll down to the contact form to send a message.',
    ],
  },
  github: {
    description: t?.terminal?.github?.description || 'Open GitHub profile',
    response: [
      '🐙 Opening GitHub profile...',
      '',
      '➜ https://github.com/Anonyme-00152',
    ],
    action: () => window.open('https://github.com/Anonyme-00152', '_blank'),
  },
  linkedin: {
    description: t?.terminal?.linkedin?.description || 'Open LinkedIn profile',
    response: [
      '💼 Opening LinkedIn profile...',
      '',
      '➜ https://linkedin.com/in/ebubekir-arti',
    ],
    action: () => window.open('https://www.linkedin.com/in/ebubekir-arti/', '_blank'),
  },
  clear: {
    description: t?.terminal?.clear?.description || 'Clear terminal',
    response: null,
    action: 'clear',
  },
})

// Easter eggs and fun commands
const easterEggs = {
  'sudo': ['Nice try! 😄 But you don\'t have root access here.', 'Try "help" for available commands.'],
  'exit': ['You can\'t escape that easily! 😉', 'Keep exploring, type "help" for commands.'],
  'vim': ['Ah, a person of culture! But this isn\'t vim.', '(Don\'t worry, I know how to exit vim 😄)'],
  'ls': ['This isn\'t a real terminal, but try these commands:', '"skills", "projects", "experience", "contact"'],
  'pwd': ['/home/ebubekir/portfolio', 'Current directory: Portfolio Showcase'],
  'cd': ['You\'re already in the right place! 🎯'],
  'rm -rf /': ['😱 WHOA THERE! Good thing this is just a demo!', 'No systems were harmed in this command.'],
  'hack': ['🕵️ Hacking the mainframe...', '▓▓▓▓▓▓▓▓░░ 80%', 'Just kidding! Type "help" for real commands.'],
  'coffee': ['☕ Brewing fresh coffee...', 'Perfect! Coding fuel ready.', 'Fun fact: I run on coffee and Docker containers.'],
  'joke': ['Why do programmers prefer dark mode?', '', 'Because light attracts bugs! 🐛😄'],
}

export function InteractiveTerminal({ t, language = 'en', onLanguageChange, onThemeChange, theme }) {
  const [history, setHistory] = useState([])
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef(null)
  const terminalRef = useRef(null)

  // Welcome message on mount
  useEffect(() => {
    const welcomeMsg = [
      '╔════════════════════════════════════════════════════════════╗',
      '║                                                            ║',
      "║   Welcome to Ebubekir's Interactive Terminal v1.0           ║",
      '║   DevOps Engineer | Full Stack Developer | CEO            ║',
      '║                                                            ║',
      '╚════════════════════════════════════════════════════════════╝',
      '',
      'Type "help" to see available commands.',
      'Type "whoami" to learn more about me.',
      '',
    ]
    setHistory([{ type: 'system', lines: welcomeMsg }])
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Focus input on terminal click
  const handleTerminalClick = () => {
    inputRef.current?.focus()
  }

  // Handle command execution
  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase()

    if (!trimmedCmd) return

    // Add to history
    setHistory(prev => [...prev, { type: 'command', text: cmd }])
    setCommandHistory(prev => [...prev, cmd])
    setHistoryIndex(-1)

    // Get available commands
    const commands = getCommands(t, language)

    // Check for easter eggs
    if (easterEggs[trimmedCmd]) {
      setHistory(prev => [...prev, { type: 'response', lines: easterEggs[trimmedCmd] }])
      return
    }

    // Handle clear
    if (trimmedCmd === 'clear') {
      setHistory([])
      return
    }

    // Handle language change
    if (trimmedCmd.startsWith('lang ')) {
      const newLang = trimmedCmd.split(' ')[1]
      if (['fr', 'en', 'tr'].includes(newLang)) {
        onLanguageChange?.(newLang)
        setHistory(prev => [...prev, {
          type: 'response',
          lines: [`Language changed to ${newLang.toUpperCase()} ✓`]
        }])
      } else {
        setHistory(prev => [...prev, {
          type: 'error',
          lines: [`Invalid language. Available: fr, en, tr`]
        }])
      }
      return
    }

    // Handle theme change
    if (trimmedCmd.startsWith('theme ')) {
      const newTheme = trimmedCmd.split(' ')[1]
      if (['light', 'dark'].includes(newTheme)) {
        onThemeChange?.()
        setHistory(prev => [...prev, {
          type: 'response',
          lines: [`Theme changed to ${newTheme} mode ✓`]
        }])
      } else {
        setHistory(prev => [...prev, {
          type: 'error',
          lines: [`Invalid theme. Available: light, dark`]
        }])
      }
      return
    }

    // Execute command
    const command = commands[trimmedCmd]
    if (command) {
      if (command.response) {
        setHistory(prev => [...prev, { type: 'response', lines: command.response }])
      }
      if (command.action && typeof command.action === 'function') {
        command.action()
      }
    } else {
      setHistory(prev => [...prev, {
        type: 'error',
        lines: [
          `Command not found: ${trimmedCmd}`,
          'Type "help" to see available commands.'
        ]
      }])
    }
  }

  // Handle key press
  const handleKeyDown = (e) => {
    // Arrow up - previous command
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    }

    // Arrow down - next command
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput('')
      }
    }

    // Enter - execute command
    if (e.key === 'Enter') {
      e.preventDefault()
      executeCommand(input)
      setInput('')
    }

    // Tab - autocomplete (basic)
    if (e.key === 'Tab') {
      e.preventDefault()
      const commands = getCommands(t, language)
      const matches = Object.keys(commands).filter(cmd => cmd.startsWith(input.toLowerCase()))
      if (matches.length === 1) {
        setInput(matches[0])
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Terminal Header */}
      <div className="bg-gray-800 dark:bg-gray-900 rounded-t-3xl px-4 py-3 flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex items-center gap-2 ml-4 text-gray-400 text-sm">
          <TerminalIcon size={16} />
          <span>ebubekir@portfolio:~$</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={terminalRef}
        onClick={handleTerminalClick}
        className="bg-black/95 dark:bg-black rounded-b-3xl p-4 font-mono text-sm min-h-[400px] max-h-[600px] overflow-y-auto cursor-text"
      >
        <AnimatePresence>
          {history.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="mb-2"
            >
              {entry.type === 'command' && (
                <div className="flex items-start gap-2">
                  <span className="text-green-400">➜</span>
                  <span className="text-white">{entry.text}</span>
                </div>
              )}

              {entry.type === 'response' && (
                <div className="text-gray-300 ml-4">
                  {entry.lines.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              )}

              {entry.type === 'error' && (
                <div className="text-red-400 ml-4">
                  {entry.lines.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              )}

              {entry.type === 'system' && (
                <div className="text-cyan-400">
                  {entry.lines.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Input Line */}
        <div className="flex items-start gap-2">
          <span className="text-green-400">➜</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white outline-none border-none"
            placeholder="Type 'help' for commands..."
            autoFocus
          />
          <span className="text-white animate-pulse">▊</span>
        </div>
      </div>

      {/* Hint */}
      <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>💡 Try: <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-2xl">whoami</code>, <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-2xl">skills</code>, <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-2xl">projects</code></p>
      </div>
    </motion.div>
  )
}
