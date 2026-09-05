import { motion } from 'framer-motion'
import SectionHeading, { gradients } from './SectionHeading'
import { skills } from '../data/content'
import { useTheme } from '../context/ThemeContext'

export default function Skills() {
  const { theme } = useTheme()

  const groups = [
    { label: 'Core Competencies', items: skills.core, color: '#2E6BFF' },
    { label: 'Emerging / Tech', items: skills.emerging, color: '#FF6B4A' },
    { label: 'Tools', items: skills.tools, color: '#2E6BFF' },
  ]

  return (
    <section id="skills" className="py-10 px-6 max-w-6xl mx-auto">
      <SectionHeading subtitle="What I bring to the table" gradient={gradients[5]}>Skills</SectionHeading>

      <div className="space-y-8">
        {groups.map((group, gi) => (
          <motion.div
            key={group.label}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: gi * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h3
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: group.color }}
            >
              {group.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill, si) => (
                <motion.span
                  key={skill}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: gi * 0.15 + si * 0.03, duration: 0.3, ease: 'easeOut' }}
                  whileHover={{
                    scale: 1.08,
                    boxShadow: `0 0 20px ${group.color}30`,
                  }}
                  className="px-4 py-2 rounded-full text-sm font-medium cursor-default transition-colors"
                  style={{
                    backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                    border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                    color: theme === 'dark' ? '#ddd' : '#444',
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
