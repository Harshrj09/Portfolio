import { motion } from 'framer-motion'
import { Download, Mail } from 'lucide-react'
import { asset, personal } from '../data/content'
import { useTheme } from '../context/ThemeContext'
import { useState } from 'react'

const nameVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.5, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
}

export default function Hero() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [imgError, setImgError] = useState(false)

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Profile photo — clean circle with neon glow ring */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex justify-center mb-10 mt-8 w-full"
        >
          <div className="profile-neon-ring">
            {!imgError ? (
              <img
                src={asset('assets/profile.jpg')}
                alt={personal.name}
                className="profile-img"
                loading="eager"
                onError={() => setImgError(true)}
              />
            ) : (
              <div
                className="profile-img profile-fallback"
                style={{ color: isDark ? '#00FF41' : '#00CC33' }}
              >
                HS
              </div>
            )}
          </div>
        </motion.div>

        {/* Name */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            variants={nameVariants}
            initial="hidden"
            animate="visible"
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold gradient-text"
          >
            {personal.name}
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-3 font-medium"
          style={{ color: isDark ? '#a0a0a0' : '#555' }}
        >
          {personal.tagline}
        </motion.p>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-base md:text-lg max-w-xl mx-auto mb-10"
          style={{ color: isDark ? '#9a9a9a' : '#555' }}
        >
          {personal.intro}
        </motion.p>

        {/* Buttons — primary pops, secondary ghost */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href={asset('assets/resume.pdf')}
            download
            className="btn-primary group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 relative overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
            <Download size={18} className="relative z-10" />
            <span className="relative z-10">Download Resume</span>
          </a>
          <a
            href="#contact"
            className="btn-secondary inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 border"
          >
            <Mail size={18} />
            Get in Touch
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="mt-8 flex gap-4 justify-center"
        >
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:text-blue transition-colors"
            style={{ color: isDark ? '#888' : '#777' }}
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="text-sm font-medium hover:text-blue transition-colors"
            style={{ color: isDark ? '#888' : '#777' }}
          >
            Email
          </a>
        </motion.div>
      </div>
    </section>
  )
}