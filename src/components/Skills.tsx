import { motion } from 'framer-motion'
import SectionHeading, { gradients } from './SectionHeading'
import { skills } from '../data/content'
import { useTheme } from '../context/ThemeContext'
import { memo } from 'react'
import { Database, Zap, Wrench, CheckCircle } from 'lucide-react'

const SkillChip = memo(function SkillChip({ skill, color, theme, delay, proficiency }: {
  skill: string
  color: string
  theme: string
  delay: number
  proficiency: number
}) {
  const isDark = theme === 'dark'

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.3, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
      className="px-3.5 py-1.5 rounded-full text-sm font-medium cursor-default transition-all"
      style={{
        backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
        border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`,
        color: isDark ? '#ddd' : '#444',
      }}
    >
      <span className="flex items-center gap-1.5">
        {skill}
        {/* Proficiency dots */}
        <span className="flex items-center gap-0.5 ml-1">
          {[1, 2, 3].map((level) => (
            <span
              key={level}
              className="w-1.5 h-1.5 rounded-full transition-all"
              style={{
                backgroundColor: level <= proficiency
                  ? color
                  : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                opacity: level <= proficiency ? 1 : 0.3,
              }}
            />
          ))}
        </span>
      </span>
    </motion.span>
  )
})

export default function Skills() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const groups = [
    {
      label: 'Core Competencies',
      items: skills.core,
      color: '#00C853',
      icon: Database,
      proficiency: 3,
      desc: 'Strategic demand generation & market analysis',
    },
    {
      label: 'Emerging & Tech',
      items: skills.emerging,
      color: '#65A30D',
      icon: Zap,
      proficiency: 2,
      desc: 'Exploring next-gen technologies',
    },
    {
      label: 'Tools & Platforms',
      items: skills.tools,
      color: '#00BFA5',
      icon: Wrench,
      proficiency: 3,
      desc: 'Hands-on with modern stack',
    },
  ]

  return (
    <section id="skills" className="py-6 px-6 max-w-6xl mx-auto">
      <SectionHeading subtitle="What I bring to the table" gradient={gradients[5]}>
        Skills
      </SectionHeading>

      <p
        className="text-sm mb-8 max-w-2xl"
        style={{ color: isDark ? '#999' : '#666' }}
      >
        Categorized by function — hover chips to see proficiency level (●●● Expert, ●●○ Proficient, ●○○ Familiar).
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {groups.map((group, gi) => (
          <motion.div
            key={group.label}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: gi * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="bento-card p-6 h-full"
            style={{
              borderColor: `${group.color}20`,
            }}
          >
            {/* Category header */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: `linear-gradient(135deg, ${group.color}, ${group.color}CC)`,
                  boxShadow: `0 4px 16px ${group.color}30`,
                }}
              >
                <group.icon size={20} color="#ffffff" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-base">
                  {group.label}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: isDark ? '#777' : '#999' }}>
                  {group.desc}
                </p>
              </div>
            </div>

            {/* Proficiency legend */}
            <div className="flex items-center gap-2 mb-4 text-xs" style={{ color: isDark ? '#666' : '#888' }}>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: group.color }} />
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: group.color }} />
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: group.color }} />
                Expert
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: group.color }} />
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: group.color }} />
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
                Proficient
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: group.color }} />
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
                Familiar
              </span>
            </div>

            {/* Skill chips */}
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill, si) => (
                <SkillChip
                  key={skill}
                  skill={skill}
                  color={group.color}
                  theme={theme}
                  delay={gi * 0.15 + si * 0.03}
                  proficiency={group.proficiency}
                />
              ))}
            </div>

            {/* Skill count footer */}
            <div className="mt-5 pt-4 border-t flex items-center justify-between" style={{ borderColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)' }}>
              <span className="text-xs font-medium" style={{ color: isDark ? '#666' : '#888' }}>
                {group.items.length} skills
              </span>
              <div className="flex items-center gap-1 text-xs" style={{ color: group.color }}>
                <CheckCircle size={10} />
                {group.proficiency >= 3 ? 'Expert level' : group.proficiency >= 2 ? 'Proficient' : 'Learning'}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}