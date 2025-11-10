import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useTheme } from 'next-themes'
import {
  Github, Linkedin, Mail, Phone, MapPin, Download,
  ChevronDown, Menu, X, ExternalLink, Twitter, Instagram, Youtube,
  Code, Server, Cloud, Shield, Sparkles, GraduationCap, Moon, Sun,
  ArrowRight, Zap, Target, Users
} from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { translations } from '@/lib/translations'
import { useThrottle } from '@/hooks/use-throttle'
import { analytics, initAnalytics } from '@/lib/analytics'
import { InteractiveTerminal } from '@/components/InteractiveTerminal'
import TypingEffect from '@/components/TypingEffect'
import { GitHubActivity } from '@/components/GitHubActivity'
import { TechStackVisualization } from '@/components/TechStackVisualization'
import { CaseStudies } from '@/components/CaseStudies'
import { Timeline } from '@/components/Timeline'
import { CustomCursor } from '@/components/CustomCursor'
const profileImage = '/ebubekir_arti.jpg'
import './App.css'

function App() {
  const [language, setLanguage] = useState('fr')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const { scrollYProgress } = useScroll()

  const t = translations[language]

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  // Optimize scroll handler with throttling
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50)

    const sections = ['home', 'about', 'services', 'skills', 'experience', 'education', 'certifications', 'projects', 'contact']
    const current = sections.find(section => {
      const element = document.getElementById(section)
      if (element) {
        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      }
      return false
    })
    if (current) setActiveSection(current)
  }, [])

  const throttledHandleScroll = useThrottle(handleScroll, 100)

  useEffect(() => {
    window.addEventListener('scroll', throttledHandleScroll, { passive: true })
    return () => window.removeEventListener('scroll', throttledHandleScroll)
  }, [throttledHandleScroll])

  // Initialize analytics on mount
  useEffect(() => {
    initAnalytics()
  }, [])

  const changeLanguage = (lang) => {
    setLanguage(lang)
    analytics.changeLanguage(lang)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    analytics.toggleTheme(newTheme)
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  const downloadCV = () => {
    const cvFiles = {
      fr: '/cv/cv-fr.pdf',
      en: '/cv/cv-en.pdf',
      tr: '/cv/cv-tr.pdf'
    }

    const cvPath = cvFiles[language] || cvFiles.fr

    fetch(cvPath, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          analytics.downloadCV(language)
          const link = document.createElement('a')
          link.href = cvPath
          link.download = `Ebubekir_ARTI_CV_${language.toUpperCase()}.pdf`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        } else {
          window.location.href = 'mailto:ebubekirarti@icloud.com?subject=CV Request&body=Hello, I would like to request your CV.'
        }
      })
      .catch(() => {
        window.location.href = 'mailto:ebubekirarti@icloud.com?subject=CV Request&body=Hello, I would like to request your CV.'
      })
  }

  const socialLinks = [
    { icon: Github, url: 'https://github.com/Anonyme-00152', label: 'GitHub' },
    { icon: Linkedin, url: '[À VENIR]', label: 'LinkedIn' },
    { icon: Twitter, url: '[À VENIR]', label: 'Twitter' },
    { icon: Instagram, url: '[À VENIR]', label: 'Instagram' },
    { icon: Youtube, url: '[À VENIR]', label: 'YouTube' }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#667EEA] to-[#764BA2] z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Modern Navigation with Glassmorphism */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? 'glass py-3' : 'bg-transparent py-4'
        }`}
      >
        <div className="section-container">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative"
            >
              <h1 className="text-2xl md:text-3xl font-bold">
                <span className="gradient-text-animated">Ebubekir</span>
                <span className="text-[#6B7280] dark:text-[#9CA3AF]"> ARTI</span>
              </h1>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {['about', 'services', 'skills', 'experience', 'projects', 'contact'].map((item, index) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(item)}
                  className="relative text-sm font-medium transition-colors hover:text-primary group"
                >
                  <span className={activeSection === item ? 'text-primary' : 'text-[#6B7280] dark:text-[#9CA3AF]'}>
                    {t.nav[item]}
                  </span>
                  {activeSection === item && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#667EEA] to-[#764BA2]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
              
              {/* Language Switcher */}
              <div className="flex gap-2 ml-4 pl-4 border-l border-border">
                {['fr', 'en', 'tr'].map((lang) => (
                  <motion.button
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      language === lang
                        ? 'gradient-bg text-white shadow-lg'
                        : 'text-[#6B7280] dark:text-[#9CA3AF] hover:text-foreground hover:bg-secondary'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </motion.button>
                ))}
              </div>

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                className="ml-2 p-2.5 rounded-lg border border-border hover:bg-secondary transition-all"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass-strong border-t border-border mt-4"
            >
              <div className="section-container py-6 space-y-4">
                {['about', 'services', 'skills', 'experience', 'projects', 'contact'].map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    whileHover={{ x: 10 }}
                    className="block w-full text-left text-[#6B7280] dark:text-[#9CA3AF] hover:text-foreground transition-colors"
                  >
                    {t.nav[item]}
                  </motion.button>
                ))}
                
                <div className="flex gap-2 pt-4 border-t border-border">
                  {['fr', 'en', 'tr'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => changeLanguage(lang)}
                      className={`px-3 py-1.5 text-sm rounded-lg ${
                        language === lang
                          ? 'gradient-bg text-white'
                          : 'text-[#6B7280] dark:text-[#9CA3AF] hover:bg-secondary'
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>

                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-3 w-full p-3 rounded-lg border border-border hover:bg-secondary transition-colors"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun size={18} />
                      <span className="text-sm">Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon size={18} />
                      <span className="text-sm">Dark Mode</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
