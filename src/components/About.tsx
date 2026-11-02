import { motion } from 'framer-motion'
import { useRef, useEffect } from 'react'
import AnimatedCounter from './AnimatedCounter'
import SectionHeading, { gradients } from './SectionHeading'
import { asset, personal, stats } from '../data/content'
import { useTheme } from '../context/ThemeContext'

export default function About() {
  const { theme } = useTheme()
  const sectionRef = useRef<HTMLElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const ticking = useRef(false)

  useEffect(() => {
    const el = sectionRef.current
    const photo = photoRef.current
    if (!el || !photo) return

    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const rect = el.getBoundingClientRect()
          const center = rect.top + rect.height / 2
          const viewCenter = window.innerHeight / 2
          const parallax = (center - viewCenter) * 0.08
          photo.style.transform = `translateY(${parallax}px)`
          ticking.current = false
        })
        ticking.current = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-6 px-6 max-w-6xl mx-auto">
      <SectionHeading subtitle="Getting to know me" gradient={gradients[0]}>About Me</SectionHeading>

      <div className="relative mt-8">
        {/* Profile image */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hidden md:block absolute left-0 top-0 w-72 h-80 rounded-2xl overflow-hidden z-10"
          ref={photoRef}
          style={{
            boxShadow: '0 8px 32px rgba(0,200,83,0.15)',
          }}
        >
          <div className="w-full h-full relative">
            <img
              src={asset('assets/about-me-photo.jpeg')}
              alt={personal.name}
              className="w-full h-full object-cover"
              loading="lazy"
              width="288"
              height="320"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, rgba(0,191,165,0.15), transparent)' }}
            />
          </div>
        </motion.div>

        {/* Bio card */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="md:ml-80 md:relative"
        >
          <div className="bento-card p-8">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg leading-relaxed mb-8"
              style={{ color: theme === 'dark' ? '#b0b0b0' : '#444' }}
            >
              MBA candidate at Great Lakes Institute of Management (Batch 2026-27) with ~2 years of experience in B2B demand generation, market research and integrated campaign analytics across global technology markets. I enjoy translating customer and market insights into targeted strategies and measurable business outcomes.
            </motion.p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="relative group"
                >
                  <div
                    className="text-center p-5 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(0,200,83,0.08)' : 'rgba(255,255,255,0.6)',
                      borderColor: theme === 'dark' ? 'rgba(0,200,83,0.15)' : 'rgba(0,200,83,0.12)',
                      boxShadow: theme === 'dark'
                        ? '0 8px 32px rgba(0,200,83,0.1), inset 0 1px 0 rgba(255,255,255,0.05)'
                        : '0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
                    }}
                  >
                    <div
                      className="text-3xl md:text-4xl font-heading font-bold mb-2"
                      style={{
                        background: 'linear-gradient(135deg, #00C853, #00BFA5)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      <AnimatedCounter
                        target={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                      />
                    </div>
                    <div
                      className="text-xs font-semibold uppercase tracking-wider"
                      style={{ color: theme === 'dark' ? '#7DFFA8' : '#00C853' }}
                    >
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
