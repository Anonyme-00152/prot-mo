
      {/* Ultra Modern Hero Section with Gradient Background */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#667EEA]/10 via-transparent to-[#764BA2]/10 animate-gradient" />
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#667EEA]/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#764BA2]/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <motion.div 
          className="section-container"
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border"
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
                  <span className="gradient-text-animated">Ebubekir</span>
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
                    className="gradient-bg text-white hover:opacity-90 transition-all shadow-lg hover:shadow-xl group"
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
                    className="p-3 rounded-3xl glass border border-border hover:border-primary hover:glow transition-all group"
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
                  className="absolute top-10 -right-10 glass rounded-3xl p-4 border border-border shadow-xl"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Code className="w-8 h-8 text-primary" />
                  <p className="text-xs font-bold mt-2">Web Dev</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="absolute bottom-10 -left-10 glass rounded-3xl p-4 border border-border shadow-xl"
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
