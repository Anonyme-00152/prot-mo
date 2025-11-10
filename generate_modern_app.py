#!/usr/bin/env python3
import os

# Lire les parties existantes
with open('/home/ubuntu/prot-mo/src/App_new_part1.jsx', 'r') as f:
    part1 = f.read()

with open('/home/ubuntu/prot-mo/src/App_new_part2.jsx', 'r') as f:
    part2 = f.read()

# Lire l'ancien fichier pour extraire certaines sections
with open('/home/ubuntu/prot-mo/src/App.jsx.backup', 'r') as f:
    original = f.read()

# Créer les sections manquantes avec design moderne
about_section = """
      {/* About Section with Modern Layout */}
      <section id="about" className="section-padding bg-secondary/30">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">{t.about.title}</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="card-glass p-8 md:p-12">
              <p className="text-lg text-foreground-secondary leading-relaxed">
                {t.about.content}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section with Modern Cards */}
      <section id="services" className="section-padding">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">{t.services.title}</span>
            </h2>
            <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
              {t.services.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.services.list.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="card-glass p-6 hover-glow group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
      <section id="skills" className="section-padding bg-secondary/30">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">{t.skills.title}</span>
            </h2>
            <p className="text-xl text-foreground-secondary max-w-2xl mx-auto">
              {t.skills.subtitle}
            </p>
          </motion.div>

          <TechStackVisualization />
        </div>
      </section>

      {/* Experience Section with Timeline */}
      <section id="experience" className="section-padding">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">{t.experience.title}</span>
            </h2>
          </motion.div>

          <Timeline items={t.experience.jobs} />
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section-padding bg-secondary/30">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">{t.education.title}</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {t.education.schools.map((school, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
                className="card-glass p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
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
      <section id="certifications" className="section-padding">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">{t.certifications.title}</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.certifications.list.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="card-glass p-6 text-center"
              >
                <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4">
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
      <section id="projects" className="section-padding bg-secondary/30">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">{t.projects.title}</span>
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
      <section id="contact" className="section-padding">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">{t.contact.title}</span>
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
              className="card-glass p-8 space-y-6"
            >
              <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
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
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
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
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
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
                    className="p-4 rounded-xl glass border border-border hover:border-primary hover:glow transition-all"
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
      <footer className="py-12 border-t border-border glass">
        <div className="section-container">
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
"""

# Assembler le fichier complet
full_app = part1 + part2 + about_section

# Écrire le nouveau fichier
with open('/home/ubuntu/prot-mo/src/App.jsx', 'w') as f:
    f.write(full_app)

print("✅ Fichier App.jsx moderne créé avec succès!")
print(f"📊 Taille: {len(full_app)} caractères")
