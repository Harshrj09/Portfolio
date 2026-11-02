import { useState, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import SectionHeading, { gradients } from './SectionHeading'
import { experience } from '../data/content'
import { useTheme } from '../context/ThemeContext'

const ExperienceItem = memo(function ExperienceItem({ exp, index, isExpanded, onToggle, theme }: {
  exp: typeof experience[number]
  index: number
  isExpanded: boolean
  onToggle: () => void
  theme: string
}) {
  return (
    <motion.div
      initial={{ x: -40, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative pl-16"
    >
      <div
        className="absolute left-[18px] top-6 w-4 h-4 rounded-full border-2 z-10"
        style={{
          borderColor: '#00C853',
          backgroundColor: isExpanded ? '#00C853' : theme === 'dark' ? '#050805' : '#F7F6F2',
        }}
      />

      <div className="bento-card cursor-pointer" onClick={onToggle}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-heading font-bold text-xl">{exp.role}</h3>
            <p className="text-blue font-medium text-sm mt-1">{exp.company}</p>
            <p className="text-xs mt-1" style={{ color: theme === 'dark' ? '#666' : '#999' }}>
              {exp.period}
            </p>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={20} style={{ color: theme === 'dark' ? '#666' : '#999' }} />
          </motion.div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <ul className="mt-4 space-y-3">
                {exp.bullets.map((bullet, j) => (
                  <li
                    key={j}
                    className="text-sm leading-relaxed pl-4 relative"
                    style={{ color: theme === 'dark' ? '#b0b0b0' : '#555' }}
                  >
                    <span className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full bg-blue" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
})

export default function Experience() {
  const [expanded, setExpanded] = useState<number | null>(0)
  const { theme } = useTheme()

  return (
    <section id="experience" className="py-6 px-6 max-w-6xl mx-auto">
      <SectionHeading subtitle="Where I've worked and what I've delivered" gradient={gradients[1]}>Experience</SectionHeading>

      <div className="relative">
        <div
          className="absolute left-6 top-0 bottom-0 w-px"
          style={{ backgroundColor: theme === 'dark' ? 'rgba(0,191,165,0.2)' : 'rgba(0,191,165,0.15)' }}
        />

        <div className="space-y-4">
          {experience.map((exp, i) => (
            <ExperienceItem
              key={i}
              exp={exp}
              index={i}
              isExpanded={expanded === i}
              onToggle={() => setExpanded(expanded === i ? null : i)}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
