import { motion } from 'framer-motion'
import { Download, Mail } from 'lucide-react'
import { personal } from '../data/content'
import { useTheme } from '../context/ThemeContext'
import ParticleField from './ParticleField'

const letterVariants = {
  hidden: { y: 80, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.5 + i * 0.04, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
}

const words = personal.name.split(' ')

export default function Hero() {
  const { theme } = useTheme()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Particle field */}
      <ParticleField />

      {/* Animated floating blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -40, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-[10%] w-72 h-72 rounded-full blur-[100px]"
          style={{ backgroundColor: 'rgba(46,107,255,0.18)' }}
        />
        <motion.div
          animate={{
            x: [0, -25, 35, 0],
            y: [0, 30, -25, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-[10%] w-96 h-96 rounded-full blur-[120px]"
          style={{ backgroundColor: 'rgba(6,182,212,0.14)' }}
        />
        <motion.div
          animate={{
            x: [0, 20, -15, 0],
            y: [0, -20, 30, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[150px]"
          style={{ backgroundColor: theme === 'dark' ? 'rgba(139,92,246,0.08)' : 'rgba(6,182,212,0.05)' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Profile image with rotating gradient ring */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mx-auto mb-10 relative w-60 h-60"
        >
          {/* Rotating gradient ring */}
          <div className="absolute inset-0 animate-spin-slow rounded-full">
            <div
              className="w-full h-full rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, #2E6BFF, #06B6D4, #2E6BFF)',
                padding: '3px',
              }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{
                  backgroundColor: theme === 'dark' ? '#0E0E12' : '#F7F6F2',
                }}
              />
            </div>
          </div>
          {/* Photo */}
          <img
            src="/assets/profile.jpg"
            alt={personal.name}
            className="absolute inset-[4px] w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              const parent = target.parentElement
              if (parent && !parent.querySelector('.placeholder-avatar')) {
                const div = document.createElement('div')
                div.className = 'placeholder-avatar absolute inset-[4px] w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full flex items-center justify-center font-heading font-bold text-4xl'
                div.style.backgroundColor = theme === 'dark' ? '#1A1A22' : '#e8e7e3'
                div.style.color = '#2E6BFF'
                div.textContent = 'HS'
                parent.appendChild(div)
              }
            }}
          />
        </motion.div>

        {/* Staggered name */}
        <div className="overflow-hidden mb-4">
          <div className="flex flex-wrap justify-center gap-x-4">
            {words.map((word, wi) => (
              <div key={wi} className="flex">
                {word.split('').map((letter, li) => (
                  <motion.span
                    key={li}
                    custom={wi * 5 + li}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold gradient-text inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-3 font-medium"
          style={{ color: theme === 'dark' ? '#a0a0a0' : '#555' }}
        >
          {personal.tagline}
        </motion.p>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="text-base md:text-lg max-w-xl mx-auto mb-10"
          style={{ color: theme === 'dark' ? '#777' : '#777' }}
        >
          {personal.intro}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href="/assets/resume.pdf"
            download
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: '#2E6BFF' }}
          >
            <Download size={18} />
            Download Résumé
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 border-2"
            style={{
              borderColor: '#2E6BFF',
              color: '#2E6BFF',
            }}
          >
            <Mail size={18} />
            Get in Touch
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="mt-8 flex gap-4 justify-center"
        >
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:text-blue transition-colors"
            style={{ color: theme === 'dark' ? '#888' : '#777' }}
          >
            LinkedIn ↗
          </a>
          <a
            href={`mailto:${personal.email}`}
            className="text-sm font-medium hover:text-blue transition-colors"
            style={{ color: theme === 'dark' ? '#888' : '#777' }}
          >
            Email ↗
          </a>
        </motion.div>
      </div>
    </section>
  )
}
