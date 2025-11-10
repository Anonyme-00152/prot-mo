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
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Isoler l'utilisation de useTheme pour éviter les erreurs d'hydratation
  const themeContext = isClient ? useTheme() : { theme: 'system', setTheme: () => {} }
  const { theme, setTheme } = themeContext
  const { scrollYProgress } = useScroll()

  const t = translations[language]

  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  // Optimize scroll handler with throttling
  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') return

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
    if (typeof window === 'undefined') return

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
      {isClient && <CustomCursor />}

      {/* Progress Bar */}
      {isClient && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#667EEA] to-[#764BA2] z-50 origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      )}

      {/* Modern Navigation with Glassmorphism */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? 'bg-[var(--glass-bg)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)_saturate(180%)] border border-[var(--glass-border)] py-3' : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative"
            >
              <h1 className="text-2xl md:text-3xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)] animate-gradient">Ebubekir</span>
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
                    className={`px-3 py-1.5 text-xs font-bold rounded-3xl transition-all ${
                      language === lang
                        ? 'bg-gradient-to-r from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)] text-white shadow-lg'
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
                className="ml-2 p-2.5 rounded-3xl border border-border hover:bg-secondary transition-all"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 rounded-3xl hover:bg-secondary transition-colors"
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
              className="md:hidden bg-[var(--glass-bg)] backdrop-blur-[20px] [-webkit-backdrop-filter:blur(20px)_saturate(200%)] border-t border-border mt-4"
            >
              <div className="container mx-auto px-4 max-w-6xl py-6 space-y-4">
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
                      className={`px-3 py-1.5 text-sm rounded-3xl ${
                        language === lang
                          ? 'bg-gradient-to-r from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)] text-white'
                          : 'text-[#6B7280] dark:text-[#9CA3AF] hover:bg-secondary'
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>

                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-3 w-full p-3 rounded-3xl border border-border hover:bg-secondary transition-colors"
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

      {/* Ultra Modern Hero Section with Gradient Background */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#667EEA]/10 via-transparent to-[#764BA2]/10 animate-gradient" />
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#667EEA]/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#764BA2]/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <motion.div 
          className="container mx-auto px-4 max-w-6xl"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-8"
            >
              {/* Greeting Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--glass-bg)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)_saturate(180%)] border border-[var(--glass-border)] border-border"
              >
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-sm font-medium text-foreground-secondary">{t.hero.greeting}</span>
              </motion.div>

              {/* Main Title */}
              <div className="space-y-4">
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)] animate-gradient">Ebubekir</span>
                  <br />
                  <span className="text-foreground">ARTI</span>
                </motion.h1>
                
                {/* Typing Effect Subtitle */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl md:text-2xl text-foreground-secondary font-medium"
                >
                  <TypingEffect phrases={t.hero.typingTitles} />
                </motion.div>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-foreground-secondary leading-relaxed max-w-xl"
              >
                {t.hero.description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-magnetic
                >
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)] text-white hover:opacity-90 transition-all shadow-lg hover:shadow-xl group"
                    onClick={() => scrollToSection('contact')}
                  >
                    {t.hero.contact}
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-magnetic
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all group"
                    onClick={downloadCV}
                  >
                    <Download className="mr-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
                    {t.hero.downloadCV}
                  </Button>
                </motion.div>
              </motion.div>

              {/* Social Links with Hover Effects */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex gap-4 pt-4"
              >
                {socialLinks.map(({ icon: Icon, url, label }, index) => (
                  <motion.a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => analytics.clickSocialLink(label)}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-3xl bg-[var(--bg-[var(--glass-bg)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)_saturate(180%)] border border-[var(--glass-border)]-bg)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)_saturate(180%)] border border-[var(--bg-[var(--glass-bg)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)_saturate(180%)] border border-[var(--glass-border)]-border)] border-border hover:border-primary hover:glow transition-all group"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5 text-foreground-secondary group-hover:text-primary transition-colors" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Profile Image with Modern Effects */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex justify-center relative"
            >
              <div className="relative group">
                {/* Glow Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#667EEA] to-[#764BA2] rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse" />
                
                {/* Rotating Border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#667EEA] via-[#764BA2] to-[#667EEA] animate-gradient p-1">
                  <div className="w-full h-full rounded-full bg-background" />
                </div>
                
                {/* Profile Image */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <img
                    src={profileImage}
                    alt="Ebubekir ARTI - Développeur Web & Cybersécurité"
                    width="384"
                    height="384"
                    loading="eager"
                    decoding="async"
                    className="relative w-80 h-80 md:w-96 md:h-96 object-cover rounded-full border-4 border-background shadow-2xl"
                  />
                </motion.div>

                {/* Floating Badges */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute top-10 -right-10 bg-[var(--glass-bg)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)_saturate(180%)] border border-[var(--glass-border)] rounded-3xl p-4 border border-border shadow-xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Code className="w-8 h-8 text-primary" />
                  <p className="text-xs font-bold mt-2">Web Dev</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute bottom-10 -left-10 bg-[var(--glass-bg)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)_saturate(180%)] border border-[var(--glass-border)] rounded-3xl p-4 border border-border shadow-xl"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                >
                  <Shield className="w-8 h-8 text-primary" />
                  <p className="text-xs font-bold mt-2">Security</p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-foreground-secondary"
            >
              <span className="text-sm font-medium">Scroll</span>
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section with Modern Layout */}
      <section id="about" className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)]">{t.about.title}</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-[var(--bg-[var(--glass-bg)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)_saturate(180%)] border border-[var(--glass-border)]-bg)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)_saturate(180%)] border border-[var(--bg-[var(--glass-bg)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)_saturate(180%)] border border-[var(--glass-border)]-border)] rounded-3xl p-8 md:p-12">
              <p className="text-lg text-foreground-secondary leading-relaxed">
                {t.about.content}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section with Modern Cards */}
      <section id="services" className="py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)]">{t.services.title}</span>
            </h2>
            <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
              {t.services.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.list?.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-[var(--bg-[var(--glass-bg)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)_saturate(180%)] border border-[var(--glass-border)]-bg)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)_saturate(180%)] border border-[var(--bg-[var(--glass-bg)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)_saturate(180%)] border border-[var(--glass-border)]-border)] rounded-3xl p-6 hover:shadow-[var(--shadow-glow)] group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-3xl bg-gradient-to-r from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {index === 0 && <Code className="w-6 h-6 text-white" />}
                  {index === 1 && <Shield className="w-6 h-6 text-white" />}
                  {index === 2 && <Sparkles className="w-6 h-6 text-white" />}
                  {index === 3 && <Cloud className="w-6 h-6 text-white" />}
                  {index === 4 && <Server className="w-6 h-6 text-white" />}
                  {index === 5 && <Target className="w-6 h-6 text-white" />}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-foreground-secondary">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section with Modern Visualization */}
      <section id="skills" className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)]">{t.skills.title}</span>
            </h2>
            <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
              {t.skills.subtitle}
            </p>
          </motion.div>

          <TechStackVisualization />
        </div>
      </section>

      {/* Experience Section with Timeline */}
      <section id="experience" className="py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)]">{t.experience.title}</span>
            </h2>
          </motion.div>

          <Timeline items={t.experience.jobs} />
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)]">{t.education.title}</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {t.education.schools?.map((school, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
                className="bg-[var(--bg-[var(--glass-bg)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)_saturate(180%)] border border-[var(--glass-border)]-bg)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)_saturate(180%)] border border-[var(--bg-[var(--glass-bg)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)_saturate(180%)] border border-[var(--glass-border)]-border)] rounded-3xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-3xl bg-gradient-to-r from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)] flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{school.degree}</h3>
                    <p className="text-foreground-secondary mb-1">{school.school}</p>
                    <p className="text-sm text-foreground-secondary">{school.period}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)]">{t.certifications.title}</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.certifications.list?.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-[var(--bg-[var(--glass-bg)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)_saturate(180%)] border border-[var(--glass-border)]-bg)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)_saturate(180%)] border border-[var(--bg-[var(--glass-bg)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)_saturate(180%)] border border-[var(--glass-border)]-border)] rounded-3xl p-6 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)] flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">{cert.name}</h3>
                <p className="text-sm text-foreground-secondary mb-1">{cert.issuer}</p>
                <p className="text-xs text-foreground-secondary">{cert.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)]">{t.projects.title}</span>
            </h2>
            <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
              {t.projects.subtitle}
            </p>
          </motion.div>

          <CaseStudies />
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <GitHubActivity username="Anonyme-00152" />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)]">{t.contact.title}</span>
            </h2>
            <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[var(--bg-[var(--glass-bg)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)_saturate(180%)] border border-[var(--glass-border)]-bg)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)_saturate(180%)] border border-[var(--bg-[var(--glass-bg)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)_saturate(180%)] border border-[var(--glass-border)]-border)] rounded-3xl p-8 space-y-6"
            >
              <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform">
                <div className="w-12 h-12 rounded-3xl bg-gradient-to-r from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)] flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary mb-1">{t.contact.email}</p>
                  <a href="mailto:ebubekirarti@icloud.com" className="text-lg font-medium hover:text-primary transition-colors">
                    ebubekirarti@icloud.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform">
                <div className="w-12 h-12 rounded-3xl bg-gradient-to-r from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary mb-1">{t.contact.phone}</p>
                  <a href="tel:+905074343253" className="text-lg font-medium hover:text-primary transition-colors">
                    +90 507 43 43 253
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform">
                <div className="w-12 h-12 rounded-3xl bg-gradient-to-r from-[var(--primary-gradient-start)] to-[var(--primary-gradient-end)] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-foreground-secondary mb-1">{t.contact.location}</p>
                  <p className="text-lg font-medium">
                    Tepeköy Mahallesi<br />
                    Çengel Çeşme Caddesi No: 44<br />
                    59800 Şarköy / Tekirdağ
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <p className="text-foreground-secondary mb-6">{t.contact.followMe}</p>
              <div className="flex justify-center gap-4">
                {socialLinks.map(({ icon: Icon, url, label }) => (
                  <motion.a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => analytics.clickSocialLink(label)}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 rounded-3xl bg-[var(--bg-[var(--glass-bg)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)_saturate(180%)] border border-[var(--glass-border)]-bg)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)_saturate(180%)] border border-[var(--bg-[var(--glass-bg)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)_saturate(180%)] border border-[var(--glass-border)]-border)] border-border hover:border-primary hover:glow transition-all"
                    aria-label={label}
                  >
                    <Icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="py-12 border-t border-border bg-[var(--glass-bg)] backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)_saturate(180%)] border border-[var(--glass-border)]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center space-y-4">
            <p className="text-foreground-secondary">
              © 2025 Ebubekir ARTI. {t.footer.rights}.
            </p>
            <p className="text-sm text-foreground-secondary">
              {t.footer.madeWith} <span className="text-red-500 animate-pulse">❤️</span> {t.footer.by} Ebubekir ARTI
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
