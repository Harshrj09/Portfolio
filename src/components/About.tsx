import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import AnimatedCounter from './AnimatedCounter'
import SectionHeading, { gradients } from './SectionHeading'
import { stats, personal } from '../data/content'
import { useTheme } from '../context/ThemeContext'

export default function About() {
  const { theme } = useTheme()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section id="about" ref={sectionRef} className="py-10 px-6 max-w-6xl mx-auto">
      <SectionHeading subtitle="Getting to know me" gradient={gradients[0]}>About Me</SectionHeading>

      <div className="relative mt-8">
        {/* Profile image - left side */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hidden md:block absolute left-0 top-0 w-72 h-80 rounded-2xl overflow-hidden z-10"
          style={{
            y: imgY,
            boxShadow: '0 8px 32px rgba(46,107,255,0.15)',
          }}
        >
          <div className="w-full h-full relative">
            <img
              src="/assets/about-me-photo.jpeg"
              alt={personal.name}
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(6,182,212,0.15), transparent)',
              }}
            />
          </div>
        </motion.div>

        {/* Bio card - overlapping the image */}
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
              style={{ color: theme === 'dark' ? '#b0b0b0' : '#444', y }}
            >
              MBA candidate at Great Lakes Institute of Management (Batch 2026–27) with ~2 years of experience in B2B demand generation, market research and integrated campaign analytics across global technology markets. I enjoy translating customer and market insights into targeted strategies and measurable business outcomes.
            </motion.p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="text-center p-3 rounded-xl"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(6,182,212,0.06)' : 'rgba(6,182,212,0.04)',
                  }}
                >
                  <div className="text-2xl md:text-3xl font-heading font-bold gradient-text mb-1">
                    <AnimatedCounter
                      target={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div
                    className="text-xs font-medium"
                    style={{ color: theme === 'dark' ? '#888' : '#777' }}
                  >
                    {stat.label}
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
