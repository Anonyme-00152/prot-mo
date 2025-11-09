import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import {
  Github, Linkedin, Mail, Phone, MapPin, Download,
  ChevronDown, Menu, X, ExternalLink, Twitter, Instagram, Youtube,
  Code, Server, Cloud, Shield, Sparkles, GraduationCap, Moon, Sun
} from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { translations } from '@/lib/translations'
import { useThrottle } from '@/hooks/use-throttle'
import { analytics, initAnalytics } from '@/lib/analytics'
import { InteractiveTerminal } from '@/components/InteractiveTerminal'
import { GitHubActivity } from '@/components/GitHubActivity'
import { TechStackVisualization } from '@/components/TechStackVisualization'
import { CaseStudies } from '@/components/CaseStudies'
import { Timeline } from '@/components/Timeline'
const profileImage = '/ebubekir_arti.jpg'
import './App.css'

function App() {
  const [language, setLanguage] = useState('fr')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()

  const t = translations[language]

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
    // CV dosyaları public/cv/ klasöründe olmalı
    // Örnek: public/cv/cv-fr.pdf, public/cv/cv-en.pdf, public/cv/cv-tr.pdf
    const cvFiles = {
      fr: '/cv/cv-fr.pdf',
      en: '/cv/cv-en.pdf',
      tr: '/cv/cv-tr.pdf'
    }

    const cvPath = cvFiles[language] || cvFiles.fr

    // CV dosyası mevcut değilse, email ile CV isteği gönder
    fetch(cvPath, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          // CV dosyası mevcut, indir
          analytics.downloadCV(language)
          const link = document.createElement('a')
          link.href = cvPath
          link.download = `Ebubekir ARTI_CV_${language.toUpperCase()}.pdf`
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        } else {
          // CV dosyası mevcut değil, email gönder
          window.location.href = 'mailto:ebubekirarti@icloud.com?subject=CV Request&body=Hello, I would like to request your CV.'
        }
      })
      .catch(() => {
        // Hata durumunda email gönder
        window.location.href = 'mailto:ebubekirarti@icloud.com?subject=CV Request&body=Hello, I would like to request your CV.'
      })
  }

  const skills = {
    languages: ['Python', 'HTML', 'HTML5', 'CSS', 'JavaScript', 'Bootstrap'],
    frontend: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Frontend (IA)'],
    backend: ['Python', 'Backend (IA)'],
    databases: ['À définir'],
    devops: ['Cybersécurité', 'IA pour l\'automatisation'],
    tools: ['Git', 'IA pour la génération de contenu', 'Réparation de téléphone']
  }

  const socialLinks = [
    { icon: Github, url: 'https://github.com/Anonyme-00152', label: 'GitHub' },
    { icon: Linkedin, url: '[À VENIR]', label: 'LinkedIn' },
    { icon: Twitter, url: '[À VENIR]', label: 'Twitter' },
    { icon: Instagram, url: '[À VENIR]', label: 'Instagram' },
    { icon: Youtube, url: '[À VENIR]', label: 'YouTube' }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/90 dark:bg-black/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold"
          >
            <span className="text-gray-900 dark:text-white">Ebubekir</span>
            <span className="text-gray-500 dark:text-gray-400"> ARTI</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {['about', 'services', 'skills', 'experience', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`text-sm font-medium transition-colors hover:text-gray-900 dark:hover:text-white ${
                  activeSection === item ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {t.nav[item]}
              </button>
            ))}
            
            {/* Language Switcher */}
            <div className="flex gap-2 ml-4 border-l pl-4 border-gray-300 dark:border-gray-700">
              {['fr', 'en', 'tr'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => changeLanguage(lang)}
                  className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                    language === lang
                      ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="ml-4 p-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-900 dark:text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                {['about', 'services', 'skills', 'experience', 'projects', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="text-left text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    {t.nav[item]}
                  </button>
                ))}
                <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-800">
                  {['fr', 'en', 'tr'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => changeLanguage(lang)}
                      className={`px-3 py-1 text-sm rounded ${
                        language === lang
                          ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>

                {/* Theme Toggle Mobile */}
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 p-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                  aria-label="Toggle theme"
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

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-400 text-lg">{t.hero.greeting}</p>
                <h1 className="text-5xl md:text-7xl font-bold">
                  Ebubekir <span className="text-gray-500 dark:text-gray-400">ARTI</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-medium">
                  {t.hero.title}
                </p>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                {t.hero.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg"
                  className="bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100"
                  onClick={() => scrollToSection('contact')}
                >
                  {t.hero.contact}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                  onClick={downloadCV}
                >
                  <Download className="mr-2" size={20} />
                  {t.hero.downloadCV}
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 pt-4">
                {socialLinks.map(({ icon: Icon, url, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => analytics.clickSocialLink(label)}
                    className="p-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                    aria-label={label}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right Side - Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-800 dark:to-gray-600 rounded-full blur-3xl opacity-30"></div>
                <img
                  src={profileImage}
                  alt="Ebubekir ARTI - DevOps Engineer & Full Stack Developer"
                  width="384"
                  height="384"
                  loading="lazy"
                  decoding="async"
                  className="relative w-80 h-80 md:w-96 md:h-96 object-cover rounded-full border-4 border-gray-200 dark:border-gray-800 shadow-2xl"
                />
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown size={32} className="text-gray-400" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold">{t.about.title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {t.about.content}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold">{t.services.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">{t.services.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.list.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center mb-4">
                  {index === 0 && <Server size={24} />}
                  {index === 1 && <Code size={24} />}
                  {index === 2 && <Sparkles size={24} />}
                  {index === 3 && <Shield size={24} />}
                  {index === 4 && <Cloud size={24} />}
                  {index === 5 && <GraduationCap size={24} />}
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-12"
          >
            {t.skills.title}
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, items], catIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold capitalize">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-12"
          >
            {t.experience.title}
          </motion.h2>

          <div className="max-w-4xl mx-auto space-y-8">
            {t.experience.jobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative pl-8 border-l-2 border-gray-300 dark:border-gray-700"
              >
                <div className="absolute left-0 top-0 w-4 h-4 bg-gray-900 dark:bg-white rounded-full transform -translate-x-[9px]"></div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{job.title}</h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400">{job.company}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{job.period} • {job.location}</p>
                  <p className="text-gray-600 dark:text-gray-400">{job.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-12"
          >
            {t.education.title}
          </motion.h2>

          <div className="max-w-4xl mx-auto space-y-8">
            {t.education.list.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg"
              >
                <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-1">{edu.school}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mb-3">{edu.period}</p>
                <p className="text-gray-600 dark:text-gray-400">{edu.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-12"
          >
            {t.certifications.title}
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {t.certifications.list.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-bold mb-2">{cert.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-1">{cert.issuer}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">{cert.date}</p>
                {cert.id && (
                  <p className="text-xs text-gray-400 dark:text-gray-600 mt-2">ID: {cert.id}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold">{t.projects.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">{t.projects.subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.projects.list.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg hover:shadow-lg transition-all group"
              >
                <h3 className="text-xl font-bold mb-3">{project.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-900 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => analytics.clickProjectLink(project.name, 'demo')}
                      className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                      <ExternalLink size={16} />
                      Live
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => analytics.clickProjectLink(project.name, 'github')}
                      className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    >
                      <Github size={16} />
                      Code
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Terminal Section */}
      <section id="terminal" className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <InteractiveTerminal
            t={t}
            language={language}
            onLanguageChange={changeLanguage}
            onThemeChange={toggleTheme}
            theme={theme}
          />
        </div>
      </section>

      {/* Tech Stack Visualization Section */}
      <section id="techstack" className="py-20">
        <div className="container mx-auto px-4">
          <TechStackVisualization t={t} />
        </div>
      </section>

      {/* GitHub Activity Section */}
      <section id="github" className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold">GitHub Activity</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Live updates from my GitHub profile showing recent work and contributions
            </p>
          </motion.div>
          <GitHubActivity t={t} />
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="casestudies" className="py-20">
        <div className="container mx-auto px-4">
          <CaseStudies t={t} />
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <Timeline t={t} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold">{t.contact.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">{t.contact.subtitle}</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* France Contact */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6 p-6 border border-gray-200 dark:border-gray-800 rounded-lg"
              >
                <h3 className="text-2xl font-bold mb-4">{t.contact.france}</h3>
                
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 text-gray-600 dark:text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{t.contact.email}</p>
                    <a href="mailto:ebubekirarti@icloud.com" className="text-gray-900 dark:text-white hover:underline">
                      ebubekirarti@icloud.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-1 text-gray-600 dark:text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{t.contact.phone}</p>
                    <a href="tel:+33663907527" className="text-gray-900 dark:text-white hover:underline">
                      +33 6 63 90 75 27
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 text-gray-600 dark:text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{t.contact.location}</p>
                    <p className="text-gray-900 dark:text-white">
                      2 rue des Tulipes<br />
                      67500 HAGUENAU, France
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Turkey Contact */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6 p-6 border border-gray-200 dark:border-gray-800 rounded-lg"
              >
                <h3 className="text-2xl font-bold mb-4">{t.contact.turkey}</h3>
                
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 text-gray-600 dark:text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{t.contact.email}</p>
                    <a href="mailto:mikail@lekesiz.org" className="text-gray-900 dark:text-white hover:underline">
                      mikail@lekesiz.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-1 text-gray-600 dark:text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{t.contact.phone}</p>
                    <a href="tel:+905074343253" className="text-gray-900 dark:text-white hover:underline">
                      +90 507 43 43 253
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 text-gray-600 dark:text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-500">{t.contact.location}</p>
                    <p className="text-gray-900 dark:text-white">
                      Tepeköy Mahallesi<br />
                      Çengel Çeşme Caddesi No: 44<br />
                      59800 Şarköy / Tekirdağ
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12 text-center"
            >
              <p className="text-gray-600 dark:text-gray-400 mb-4">{t.contact.followMe}</p>
              <div className="flex justify-center gap-4">
                {socialLinks.map(({ icon: Icon, url, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => analytics.clickSocialLink(label)}
                    className="p-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                    aria-label={label}
                  >
                    <Icon size={24} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>
            © 2025 Ebubekir ARTI. {t.footer.rights}.
          </p>
          <p className="mt-2 text-sm">
            {t.footer.madeWith} ❤️ {t.footer.by} Ebubekir ARTI
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
